export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getSkillContent, getSkillFiles, listSkills } from "@/lib/blob-storage";

import { DeleteSkillButton } from "../delete-button";
import { CopyLinkButton } from "./copy-link";
import { DownloadButton } from "./download-button";

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.email) redirect("/sign-in");

  const { id } = await params;
  const skills = await listSkills(session.user.email);
  const skill = skills.find((s) => s.id === id);
  if (!skill) notFound();

  const [content, files] = await Promise.all([
    getSkillContent(session.user.email, id),
    getSkillFiles(session.user.email, id),
  ]);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-8">
      {/* Back */}
      <div className="mb-6">
        <Link
          href="/publish"
          className="font-mono text-xs text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          &larr; Back to skills
        </Link>
      </div>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-mono text-xl font-bold text-[var(--foreground)]">
            {skill.title}
          </h1>
          <p className="mt-1 font-mono text-[11px] text-[var(--muted)]">
            {skill.repoUrl && (
              <>
                <a
                  href={skill.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  {skill.repoUrl.replace("https://github.com/", "")}
                </a>
                {skill.filePath && <> &middot; {skill.filePath}</>}
                {" "}&middot;{" "}
              </>
            )}
            {(skill.totalSize / 1024).toFixed(1)} KB &middot;{" "}
            {new Date(skill.createdAt).toLocaleDateString()}
          </p>
        </div>
        <DeleteSkillButton skillId={skill.id} redirectTo="/publish" />
      </div>

      {/* Install command */}
      {skill.installCommand && (
        <div className="mb-6 border border-[var(--border)] bg-[var(--dark-bg)] px-5 py-4">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--dark-muted)]">
            Install
          </p>
          <div className="flex items-center justify-between gap-3">
            <code className="font-mono text-sm text-white">
              {skill.installCommand}
            </code>
            <CopyLinkButton text={skill.installCommand} label="COPY" />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mb-8 flex flex-wrap gap-2">
        {content && <DownloadButton content={content} filename={`${skill.title}.md`} />}
      </div>

      {/* Content preview */}
      {content && (
        <div className="mb-6">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
            Content
          </p>
          <pre className="max-h-[60vh] overflow-auto border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm leading-relaxed text-[var(--foreground)]">
            {content}
          </pre>
        </div>
      )}

      {/* Files list */}
      {files.length > 0 && (
        <div>
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
            Files
          </p>
          <div className="divide-y divide-[var(--border)] border border-[var(--border)]">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between px-4 py-2.5"
              >
                <span className="font-mono text-xs text-[var(--foreground)]">
                  {file.name}
                </span>
                <span className="font-mono text-[10px] text-[var(--muted)]">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
