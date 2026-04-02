"use client";

import { useMemo, useState } from "react";

import { captureEvent, captureSearchDebounced } from "@/lib/analytics";
import { EVENTS } from "@/lib/analytics-events";

import { SkillRow } from "./skill-row";

import type { SkillRowData } from "./skill-row";

const PAGE_SIZE = 20;

type CategoryOption = { slug: string; name: string };

export function SkillCatalog({
  skills,
  activeCategoryName,
  categories,
}: {
  skills: SkillRowData[];
  activeCategoryName?: string;
  categories?: CategoryOption[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showCount, setShowCount] = useState(PAGE_SIZE);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

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
          (s.bestFor?.toLowerCase().includes(q) ?? false),
      );
    }

    // Category filter
    if (categoryFilter) {
      list = list.filter((s) => s.relatedCategories?.includes(categoryFilter));
    }

    // Sort by SkillPack score descending
    list.sort((a, b) => (b.trustScore ?? 0) - (a.trustScore ?? 0));

    return list;
  }, [skills, searchQuery, categoryFilter]);

  const visibleSkills = filteredSkills.slice(0, showCount);
  const hasMore = showCount < filteredSkills.length;

  return (
    <div className="px-4 pb-16 pt-5 sm:px-8">
      {/* Header + filters */}
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-mono text-[14px] font-bold uppercase tracking-[1.5px] text-gray-900">
          {activeCategoryName ?? "Leaderboard"}
          <span className="ml-2 font-normal text-gray-400">
            {filteredSkills.length}
          </span>
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2.5">
          {/* Problem filter */}
          {categories && categories.length > 0 && (
            <select
              value={categoryFilter ?? ""}
              onChange={(e) => {
                const value = e.target.value || null;
                setCategoryFilter(value);
                setShowCount(PAGE_SIZE);
                if (value) {
                  captureEvent(EVENTS.FILTER_APPLIED, { filterType: "category", value });
                }
              }}
              className="cursor-pointer rounded border border-[var(--border)] bg-white px-2 py-1.5 font-mono text-[10px] text-gray-600 hover:border-gray-400 focus:border-gray-500 focus:outline-none"
            >
              <option value="">All problems</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          )}
          {/* Search */}
          <div
            className={`flex w-full items-center gap-1.5 border px-2.5 py-1.5 transition-colors sm:w-60 ${
              searchFocused ? "border-gray-900" : "border-[var(--border)]"
            }`}
          >
            <span className="text-[11px] text-gray-400">⌕</span>
            <input
              type="text"
              placeholder="Search solutions..."
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                setShowCount(PAGE_SIZE);
                if (value.length >= 2) {
                  captureSearchDebounced(value, filteredSkills.length, "catalog");
                }
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
        </div>
      </div>

      {/* Column headers */}
      <div
        className="hidden items-center gap-4 border-b border-[var(--border)] px-3.5 py-1.5 sm:grid"
        style={{
          gridTemplateColumns: "minmax(140px, 0.9fr) minmax(120px, 1fr) 52px",
        }}
      >
        <span className="font-mono text-[9px] font-bold tracking-wider text-gray-400">
          SOLUTION
        </span>
        <span className="font-mono text-[9px] font-bold tracking-wider text-gray-400">
          WHY USE THIS
        </span>
        <span className="font-mono text-[9px] font-bold tracking-wider text-gray-400 text-right">
          SCORE
        </span>
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
          <p className="text-[14px] text-gray-400">No solutions match that filter</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter(null);
            }}
            className="mt-2 cursor-pointer font-mono text-[12px] font-semibold text-[var(--accent)]"
          >
            Clear filters
          </button>
        </div>
      )}

    </div>
  );
}
