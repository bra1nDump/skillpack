"use client";

import Link from "next/link";

import { TrustBadge } from "@/components/trust-badge";

export type TrendingSkillItem = {
  slug: string;
  name: string;
  detail: string;
  trustScore: number;
  screenshotUrl: string | null;
};

export function TrendingSkills({ skills }: { skills: TrendingSkillItem[] }) {
  if (skills.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
        <Link
          key={skill.slug}
          href={`/skills/${skill.slug}`}
          className="group flex items-center gap-3 rounded-lg border border-(--border) bg-(--surface) p-3 transition-all hover:border-(--border-hover) hover:bg-(--surface-2)"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-[14px] font-semibold text-gray-900 transition-colors group-hover:text-(--accent)">
                {skill.name}
              </p>
              <TrustBadge score={skill.trustScore} />
            </div>
            <p className="mt-0.5 font-mono text-[11px] text-gray-500">{skill.detail}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
