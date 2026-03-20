"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { FilterInput } from "@/components/filter-input";

import type { CommunitySkill } from "@/lib/community-skills";

export function CommunityList({ skills }: { skills: CommunitySkill[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (query.length < 1) return skills;
    const q = query.toLowerCase();
    return skills.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        (s.installCommand?.toLowerCase().includes(q) ?? false) ||
        (s.repoUrl?.toLowerCase().includes(q) ?? false) ||
        s.authorEmail.toLowerCase().includes(q),
    );
  }, [skills, query]);

  return (
    <>
      <div className="pb-6">
        <FilterInput
          value={query}
          onChange={setQuery}
          placeholder="Filter by name, install command, repo, author..."
          count={filtered.length}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((skill) => (
          <div
            key={skill.id}
            className="group flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface-2)] sm:flex-row sm:items-start"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5">
                <p className="text-base font-semibold text-gray-900">
                  {skill.title}
                </p>
                <span className="rounded bg-blue-50 px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-blue-600">
                  Community
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-3">
                {skill.repoUrl && (
                  <a
                    href={skill.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[13px] text-gray-500 transition-colors hover:text-[var(--accent)]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {skill.repoUrl.replace("https://github.com/", "")}
                  </a>
                )}
                {skill.filePath && (
                  <span className="font-mono text-[12px] text-gray-400">
                    {skill.filePath}
                  </span>
                )}
                <span className="font-mono text-[12px] text-gray-400">
                  by {skill.authorEmail.split("@")[0]}
                </span>
                <span className="font-mono text-[12px] text-gray-400">
                  {new Date(skill.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Install command */}
              {skill.installCommand && (
                <div className="mt-3 inline-flex items-center gap-2 bg-[var(--dark-bg)] px-3 py-1.5">
                  <code className="font-mono text-[13px] text-white">
                    {skill.installCommand}
                  </code>
                </div>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className="font-mono text-[11px] text-gray-400">
                {(skill.totalSize / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="border border-dashed border-[var(--border)] px-6 py-16 text-center">
            <p className="text-[15px] text-gray-500">
              {skills.length === 0
                ? "No community skills published yet. Be the first!"
                : "No skills match your search."}
            </p>
            {skills.length === 0 && (
              <Link
                href="/publish"
                className="mt-4 inline-block bg-[var(--accent)] px-5 py-2.5 font-mono text-xs font-bold text-white transition-colors hover:bg-[#c5303b]"
              >
                PUBLISH A SKILL
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
