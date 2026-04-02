import Link from "next/link";

import type { ScoreLabel } from "@/lib/score-labels";
import { labelClassName } from "@/lib/score-labels";

interface DarkPageHeaderProps {
  backLink?: { href: string; label: string };
  title: string;
  subtitle?: string;
  badge?: { text: string; variant: "active" | "watch" | "stale" };
  stats?: { label: string; value: string }[];
  labels?: ScoreLabel[];
  aside?: React.ReactNode;
  children?: React.ReactNode;
}

export function DarkPageHeader({
  backLink,
  title,
  subtitle,
  badge,
  stats,
  labels,
  aside,
  children,
}: DarkPageHeaderProps) {
  return (
    <div className="m-4 mb-0 rounded-lg bg-[#171717] p-7 text-white">
      {backLink && (
        <Link
          href={backLink.href}
          className="mb-4 inline-flex items-center gap-1 text-[13px] text-[#737373] transition-colors hover:text-white"
        >
          ← {backLink.label}
        </Link>
      )}

      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h1>
            {badge && (
              <span
                className={`rounded px-2 py-0.5 font-mono text-[12px] uppercase tracking-wider ${
                  badge.variant === "active"
                    ? "bg-emerald-900/40 text-emerald-400"
                    : "bg-amber-900/40 text-amber-400"
                }`}
              >
                {badge.text}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-2.5 max-w-2xl text-[13px] leading-[1.6] text-[#737373]">
              {subtitle}
            </p>
          )}

          {/* Score labels */}
          {labels && labels.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {labels.map((label) => (
                <span
                  key={label.text}
                  className={`rounded px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider ${labelClassName(label.color)}`}
                >
                  {label.text}
                </span>
              ))}
            </div>
          )}

          {children}
        </div>

        {/* Right side: aside (screenshot) or stats */}
        {aside ? (
          <div className="max-h-40 w-full shrink-0 overflow-hidden rounded-lg border border-[#262626] sm:max-h-55 sm:max-w-[360px]">
            {aside}
          </div>
        ) : stats && stats.length > 0 ? (
          <div className="flex flex-wrap gap-3 xl:flex-shrink-0">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-md border border-[#262626] bg-[#0a0a0a] px-4 py-2.5 text-center"
              >
                <p className="text-lg font-bold">{s.value}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#525252]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
