import { Redis } from "@upstash/redis";
import { del, list, put } from "@vercel/blob";

const MAX_SKILLS_PER_USER = 20;
const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10 MB

let _redis: Redis | null = null;
function getRedis(): Redis {
  if (!_redis) {
    _redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return _redis;
}

export type SkillMeta = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  type: "text" | "folder";
  totalSize: number;
  repoUrl?: string;
  filePath?: string;
  installCommand?: string;
};

// Redis key per user
function redisKey(email: string) {
  return `skills:${email.toLowerCase()}`;
}

function blobPrefix(email: string) {
  return `skills/${email.toLowerCase().replace(/[^a-z0-9@._-]/g, "_")}`;
}

function skillContentPath(email: string, skillId: string) {
  return `${blobPrefix(email)}/${skillId}/SKILL.md`;
}

function skillFilePath(email: string, skillId: string, filename: string) {
  return `${blobPrefix(email)}/${skillId}/files/${filename}`;
}

async function fetchBlob(url: string): Promise<Response> {
  return fetch(url, {
    headers: { authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
    cache: "no-store",
  });
}

// ---------- Index (Redis) ----------

async function getSkills(email: string): Promise<SkillMeta[]> {
  const data = await getRedis().get<SkillMeta[]>(redisKey(email));
  return data ?? [];
}

async function setSkills(email: string, skills: SkillMeta[]): Promise<void> {
  await getRedis().set(redisKey(email), skills);
}

// ---------- Public API ----------

export async function listSkills(email: string): Promise<SkillMeta[]> {
  return getSkills(email);
}

export async function createTextSkill(
  email: string,
  title: string,
  content: string,
  repoUrl?: string,
  filePath?: string,
  installCommand?: string,
): Promise<SkillMeta> {
  const skills = await getSkills(email);

  if (skills.length >= MAX_SKILLS_PER_USER) {
    throw new Error(`Limit of ${MAX_SKILLS_PER_USER} skills reached`);
  }

  const contentSize = new Blob([content]).size;
  if (contentSize > MAX_UPLOAD_SIZE) {
    throw new Error(`Content exceeds ${MAX_UPLOAD_SIZE / 1024 / 1024}MB limit`);
  }

  const id = crypto.randomUUID().slice(0, 8);
  const now = new Date().toISOString();

  await put(skillContentPath(email, id), content, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "text/markdown",
  });

  const meta: SkillMeta = {
    id,
    title,
    createdAt: now,
    updatedAt: now,
    type: "text",
    totalSize: contentSize,
    ...(repoUrl && { repoUrl }),
    ...(filePath && { filePath }),
    ...(installCommand && { installCommand }),
  };

  skills.push(meta);
  await setSkills(email, skills);

  return meta;
}

export async function uploadFolderSkill(
  email: string,
  title: string,
  files: { name: string; data: Buffer; size: number }[],
): Promise<SkillMeta> {
  const skills = await getSkills(email);

  if (skills.length >= MAX_SKILLS_PER_USER) {
    throw new Error(`Limit of ${MAX_SKILLS_PER_USER} skills reached`);
  }

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  if (totalSize > MAX_UPLOAD_SIZE) {
    throw new Error(`Upload exceeds ${MAX_UPLOAD_SIZE / 1024 / 1024}MB limit`);
  }

  const id = crypto.randomUUID().slice(0, 8);
  const now = new Date().toISOString();

  await Promise.all(
    files.map((file) =>
      put(skillFilePath(email, id, file.name), file.data, {
        access: "private",
        addRandomSuffix: false,
        allowOverwrite: true,
      }),
    ),
  );

  const meta: SkillMeta = {
    id,
    title,
    createdAt: now,
    updatedAt: now,
    type: "folder",
    totalSize,
  };

  skills.push(meta);
  await setSkills(email, skills);

  return meta;
}

export async function deleteSkill(
  email: string,
  skillId: string,
): Promise<void> {
  const skills = await getSkills(email);
  const prefix = `${blobPrefix(email)}/${skillId}/`;

  // Delete blobs
  const blobs = await list({ prefix });
  if (blobs.blobs.length > 0) {
    await del(blobs.blobs.map((b) => b.url));
  }

  // Update Redis index
  await setSkills(email, skills.filter((s) => s.id !== skillId));
}

export async function getSkillContent(
  email: string,
  skillId: string,
): Promise<string | null> {
  try {
    const result = await list({ prefix: skillContentPath(email, skillId), limit: 1 });
    if (result.blobs.length === 0) return null;
    const res = await fetchBlob(result.blobs[0].url);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export async function getSkillFiles(
  email: string,
  skillId: string,
): Promise<{ name: string; url: string; size: number }[]> {
  const prefix = `${blobPrefix(email)}/${skillId}/files/`;
  const result = await list({ prefix });
  return result.blobs.map((b) => ({
    name: b.pathname.replace(prefix, ""),
    url: b.downloadUrl,
    size: b.size,
  }));
}
