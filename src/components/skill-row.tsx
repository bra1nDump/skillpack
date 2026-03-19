"use client";

import Link from "next/link";
import { useState } from "react";

import { ComplexityDots } from "./complexity-dots";
import { TierPips } from "./tier-pips";
import { TypeBadge } from "./type-badge";

import type { SkillTier, SkillType } from "@/lib/catalog";

export type SkillRowData = {
  slug: string;
  name: string;
  repo?: string;
  skillType?: SkillType;
  skillTier?: SkillTier;
  complexity?: number;
  freshnessDays?: number;
  installs?: number;
  daysOld?: number;
  weekGrowth?: number;
  tags?: string[];
  trustScore?: number;
  // Future (needs backend): rating, reviewCount, retention, usage
};

function formatInstalls(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function freshLabel(days: number | undefined): { text: string; color: string } {
  if (days == null) return { text: "—", color: "text-gray-400" };
  if (days === 0) return { text: "today", color: "text-emerald-500" };
  if (days <= 7) return { text: `${days}d ago`, color: "text-emerald-500" };
  if (days <= 30) return { text: `${Math.round(days / 7)}w ago`, color: "text-gray-500" };
  return { text: `${Math.round(days / 30)}mo ago`, color: "text-gray-400" };
}

export function SkillRow({ skill }: { skill: SkillRowData }) {
  const [hov, setHov] = useState(false);
  const fresh = freshLabel(skill.freshnessDays);

  const trustColor =
    (skill.trustScore ?? 0) >= 80
      ? "text-emerald-500"
      : (skill.trustScore ?? 0) >= 50
        ? "text-amber-500"
        : "text-red-400";

  return (
    <Link
      href={`/skills/${skill.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`grid items-center gap-2 border-b border-[var(--border)] px-3.5 py-2.5 transition-colors ${
        hov ? "bg-[var(--surface-2)]" : ""
      }`}
      style={{
        gridTemplateColumns: "minmax(160px, 1.6fr) 56px 52px 72px 52px 58px 56px",
      }}
    >
      {/* Name + type + tags */}
      <div className="min-w-0">
        <div className="mb-0.5 flex items-center gap-1.5">
          <span className="truncate text-[13px] font-bold text-gray-900">
            {skill.name}
          </span>
          {skill.skillType && <TypeBadge type={skill.skillType} />}
          {skill.daysOld != null && skill.daysOld <= 30 && (
            <span className="rounded bg-[var(--accent)] px-1.5 py-0.5 font-mono text-[8px] font-bold text-white">
              NEW
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {skill.repo && (
            <span className="font-mono text-[10px] text-gray-400">
              {skill.repo.split("/").pop()}
            </span>
          )}
          {skill.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-100 px-1 font-mono text-[9px] text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tier */}
      <div>
        {skill.skillTier ? (
          <TierPips tier={skill.skillTier} />
        ) : (
          <span className="text-[10px] text-gray-300">—</span>
        )}
      </div>

      {/* Trust Score */}
      <div>
        {skill.trustScore != null ? (
          <span className={`font-mono text-[12px] font-bold ${trustColor}`}>
            {skill.trustScore}
          </span>
        ) : (
          <span className="text-[10px] text-gray-300">—</span>
        )}
      </div>

      {/* Complexity */}
      <div>
        {skill.complexity != null ? (
          <ComplexityDots level={skill.complexity} />
        ) : (
          <span className="text-[10px] text-gray-300">—</span>
        )}
      </div>

      {/* Freshness */}
      <span className={`font-mono text-[10px] ${fresh.color}`}>{fresh.text}</span>

      {/* Installs */}
      <span className="font-mono text-[10px] text-gray-500">
        {skill.installs != null ? formatInstalls(skill.installs) : "—"}
      </span>

      {/* GET button */}
      <span
        className={`inline-flex items-center justify-center rounded border px-3 py-1 font-mono text-[10px] font-bold transition-all ${
          hov
            ? "border-gray-900 bg-gray-900 text-white"
            : "border-gray-200 text-gray-500"
        }`}
      >
        GET
      </span>
    </Link>
  );
}
