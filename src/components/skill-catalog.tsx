"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { SkillRow } from "./skill-row";

import type { SkillRowData } from "./skill-row";

const TABS = [
  { id: "trending", label: "Trending", desc: "Fastest star growth this period" },
  { id: "new", label: "New", desc: "Added or updated in the last 30 days" },
  { id: "all", label: "All", desc: "Every skill in the catalog" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type SortKey = "trust" | "tier" | "complexity" | "updated" | "installs" | null;
type SortDir = "asc" | "desc";

const TIER_ORDER = { Atomic: 1, Composite: 2, Orchestrator: 3, Pack: 4 };

const PAGE_SIZE = 20;

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: null, label: "SKILL" },
  { key: "tier", label: "TIER" },
  { key: "trust", label: "TRUST" },
  { key: "complexity", label: "COMPLEXITY" },
  { key: "updated", label: "UPDATED" },
  { key: "installs", label: "INSTALLS" },
  { key: null, label: "" },
];

export function SkillCatalog({
  skills,
  activeCategoryName,
}: {
  skills: SkillRowData[];
  activeCategoryName?: string;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showCount, setShowCount] = useState(PAGE_SIZE);
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (!key) return;
    if (sortKey === key) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setShowCount(PAGE_SIZE);
  };

  const filteredSkills = useMemo(() => {
    let list = [...skills];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();

      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.tags?.some((t) => t.includes(q)) ?? false) ||
          (s.repo?.toLowerCase().includes(q) ?? false) ||
          (s.skillType?.toLowerCase().includes(q) ?? false),
      );
    }

    // Tab filtering
    switch (activeTab) {
      case "trending":
        list = list
          .filter((s) => s.weekGrowth != null && s.weekGrowth > 0);
        break;
      case "new":
        list = list
          .filter((s) => (s.daysOld != null && s.daysOld <= 30) || (s.freshnessDays != null && s.freshnessDays <= 30));
        break;
    }

    // Column sort (overrides tab default sort)
    if (sortKey) {
      const dir = sortDir === "desc" ? -1 : 1;

      list.sort((a, b) => {
        let av: number, bv: number;

        switch (sortKey) {
          case "trust":
            av = a.trustScore ?? 0; bv = b.trustScore ?? 0; break;
          case "tier":
            av = TIER_ORDER[a.skillTier as keyof typeof TIER_ORDER] ?? 0;
            bv = TIER_ORDER[b.skillTier as keyof typeof TIER_ORDER] ?? 0; break;
          case "complexity":
            av = a.complexity ?? 0; bv = b.complexity ?? 0; break;
          case "updated":
            av = a.freshnessDays ?? 9999; bv = b.freshnessDays ?? 9999;
            return (av - bv) * dir; // lower = fresher, so invert
          case "installs":
            av = a.installs ?? 0; bv = b.installs ?? 0; break;
          default:
            return 0;
        }
        return (bv - av) * dir;
      });
    } else {
      // Default tab sort
      switch (activeTab) {
        case "trending":
          list.sort((a, b) => (b.weekGrowth ?? 0) - (a.weekGrowth ?? 0)); break;
        case "new":
          list.sort((a, b) => (a.freshnessDays ?? a.daysOld ?? 999) - (b.freshnessDays ?? b.daysOld ?? 999)); break;
        default:
          list.sort((a, b) => (b.trustScore ?? 0) - (a.trustScore ?? 0));
      }
    }

    return list;
  }, [skills, activeTab, searchQuery, sortKey, sortDir]);

  const visibleSkills = filteredSkills.slice(0, showCount);
  const hasMore = showCount < filteredSkills.length;

  return (
    <div className="px-8 pb-16 pt-5">
      {/* Header + search + publish */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-mono text-[14px] font-bold uppercase tracking-[1.5px] text-gray-900">
          {activeCategoryName ?? "All Skills"}
          <span className="ml-2 font-normal text-gray-400">
            {filteredSkills.length}
          </span>
        </h2>
        <div className="flex items-center gap-2.5">
          {/* Search */}
          <div
            className={`flex w-60 items-center gap-1.5 border px-2.5 py-1.5 transition-colors ${
              searchFocused ? "border-gray-900" : "border-[var(--border)]"
            }`}
          >
            <span className="text-[11px] text-gray-400">⌕</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowCount(PAGE_SIZE);
              }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="flex-1 border-none bg-transparent text-[12px] text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
            {searchQuery && (
              <span
                onClick={() => setSearchQuery("")}
                className="cursor-pointer font-mono text-[10px] text-gray-400"
              >
                ✕
              </span>
            )}
          </div>
          {/* Publish button */}
          <Link
            href="/publish"
            className="flex items-center gap-1 bg-gray-900 px-3.5 py-1.5 font-mono text-[10px] font-bold text-white transition-colors hover:bg-gray-800"
          >
            <span className="text-[12px] leading-none">+</span> PUBLISH
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-[var(--border)]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveTab(tab.id);
              setSortKey(null);
              setShowCount(PAGE_SIZE);
            }}
            className={`-mb-px cursor-pointer border-b-2 px-3.5 py-2 font-mono text-[11px] transition-all ${
              activeTab === tab.id
                ? "border-gray-900 font-bold text-gray-900"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab description */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5">
        <span className="font-mono text-[10px] text-gray-500">
          {TABS.find((t) => t.id === activeTab)?.desc}
        </span>
        <span className="font-mono text-[10px] text-gray-400">
          {filteredSkills.length} skill{filteredSkills.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Column headers — sortable */}
      <div
        className="grid items-center gap-2 border-b border-[var(--border)] px-3.5 py-1.5"
        style={{
          gridTemplateColumns:
            "minmax(160px, 1.6fr) 56px 52px 72px 52px 58px 56px",
        }}
      >
        {COLUMNS.map((col) => (
          <span
            key={col.label || "_empty"}
            onClick={() => handleSort(col.key)}
            className={`font-mono text-[9px] font-bold tracking-wider select-none ${
              col.key
                ? "cursor-pointer transition-colors hover:text-gray-700"
                : ""
            } ${sortKey === col.key ? "text-gray-900" : "text-gray-400"}`}
          >
            {col.label}
            {sortKey === col.key && (
              <span className="ml-0.5">{sortDir === "desc" ? "↑" : "↓"}</span>
            )}
          </span>
        ))}
      </div>

      {/* Rows */}
      {visibleSkills.map((skill) => (
        <SkillRow key={skill.slug} skill={skill} />
      ))}

      {/* Load more */}
      {hasMore && (
        <button
          type="button"
          onClick={() => setShowCount((prev) => prev + PAGE_SIZE)}
          className="w-full cursor-pointer border-b border-[var(--border)] py-4 text-center"
        >
          <span className="font-mono text-[12px] font-bold text-[var(--accent)]">
            Show more — {filteredSkills.length - showCount} remaining
          </span>
        </button>
      )}

      {/* Empty state */}
      {filteredSkills.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-[14px] text-gray-400">No skills match that filter</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActiveTab("all");
              setSortKey(null);
            }}
            className="mt-2 cursor-pointer font-mono text-[12px] font-semibold text-[var(--accent)]"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Bottom publish CTA */}
      {!hasMore && filteredSkills.length > 0 && (
        <div className="mt-8 flex items-center justify-between bg-[var(--dark-bg)] p-6 text-white">
          <div>
            <p className="text-[14px] font-black">
              Built a skill? Share it with the community.
            </p>
            <p className="mt-1 text-[12px] text-gray-500">
              Every skill gets rated, retention-tracked, and ranked the moment
              it&apos;s published.
            </p>
          </div>
          <Link
            href="/publish"
            className="shrink-0 bg-[var(--accent)] px-6 py-2.5 font-mono text-[12px] font-bold tracking-wider text-white transition-colors hover:bg-[var(--accent)]/90"
          >
            PUBLISH YOUR SKILL →
          </Link>
        </div>
      )}
    </div>
  );
}
