import { Redis } from "@upstash/redis";

import type { SkillMeta } from "./blob-storage";

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

export type CommunitySkill = SkillMeta & {
  authorEmail: string;
};

export async function listAllCommunitySkills(): Promise<CommunitySkill[]> {
  const redis = getRedis();

  // Scan for all user skill keys
  // Collect all user keys from Redis
  const keys: string[] = [];
  let cursor = 0;
  do {
    const result = await redis.scan(cursor, {
      match: "skills:*",
      count: 100,
    });
    cursor = Number(result[0]);
    keys.push(...(result[1] as string[]));
  } while (cursor !== 0);

  if (keys.length === 0) return [];

  // Fetch all in parallel
  const results = await Promise.all(
    keys.map(async (key) => {
      const email = key.replace("skills:", "");
      const skills = await redis.get<SkillMeta[]>(key);
      return (skills ?? []).map((s) => ({ ...s, authorEmail: email }));
    }),
  );

  // Flatten and sort by newest first
  return results
    .flat()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
