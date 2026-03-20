"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useMemo, useState } from "react";

import { CompareEvidenceChart, CompareStarsChart } from "@/components/charts/compare-chart";
import { DarkCTA } from "@/components/dark-cta";
import { DarkPageHeader } from "@/components/dark-page-header";
import { compareSkills } from "@/lib/compare-data";

import type { CompareSkill } from "@/lib/compare-data";

// Extract unique categories from all skills
const allCategories = (() => {
  const map = new Map<string, string>();
  for (const s of compareSkills) {
    for (const c of s.categories) {
      map.set(c.slug, c.name);
    }
  }
  return Array.from(map, ([slug, name]) => ({ slug, name }));
})();

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filterText, setFilterText] = useState("");

  const selectedCategory = searchParams.get("category") ?? "";

  const selectedSlugs = useMemo(() => {
    const raw = searchParams.get("skills") ?? "";
    return raw ? raw.split(",").filter(Boolean) : [];
  }, [searchParams]);

  const selected = useMemo(
    () => selectedSlugs
      .map((s) => compareSkills.find((sk) => sk.slug === s))
      .filter((s): s is CompareSkill => s !== null),
    [selectedSlugs],
  );

  // Skills filtered by selected category
  const availableSkills = useMemo(() => {
    if (!selectedCategory) return [];
    return compareSkills.filter((s) =>
      s.categories.some((c) => c.slug === selectedCategory),
    );
  }, [selectedCategory]);

  const filteredSkills = useMemo(() => {
    if (!filterText) return availableSkills;
    const lower = filterText.toLowerCase();
    return availableSkills.filter((s) => s.name.toLowerCase().includes(lower));
  }, [availableSkills, filterText]);

  const updateUrl = useCallback(
    (category: string, skills: string[]) => {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (skills.length > 0) params.set("skills", skills.join(","));
      const qs = params.toString();
      router.replace(`/compare${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router],
  );

  const selectCategory = useCallback(
    (slug: string) => {
      setFilterText("");
      updateUrl(slug, []);
    },
    [updateUrl],
  );

  const toggleSkill = useCallback(
    (slug: string) => {
      const next = selectedSlugs.includes(slug)
        ? selectedSlugs.filter((s) => s !== slug)
        : [...selectedSlugs, slug];
      updateUrl(selectedCategory, next);
    },
    [selectedSlugs, selectedCategory, updateUrl],
  );

  return (
    <>
    <DarkPageHeader
      backLink={{ href: "/", label: "Home" }}
      title="Compare Skills"
      subtitle="Pick a category, then compare skills within it."
    />
    <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        {/* Step 1: Category selector */}
        <section>
          <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
            1. Choose a category
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => selectCategory(cat.slug)}
                className={`rounded-lg px-4 py-2 text-[13px] font-medium transition-all ${
                  selectedCategory === cat.slug
                    ? "border border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "border border-[var(--border)] text-gray-500 hover:border-[var(--border-hover)] hover:text-gray-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Skill selector (only after category is chosen) */}
        {selectedCategory && (
          <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="mb-3 font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              2. Select skills to compare
            </p>
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Filter skills..."
              className="mb-4 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[15px] text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[var(--accent)]/40"
            />
            <div className="flex flex-wrap gap-2">
              {filteredSkills.map((skill) => {
                const isSelected = selectedSlugs.includes(skill.slug);
                return (
                  <button
                    key={skill.slug}
                    type="button"
                    onClick={() => toggleSkill(skill.slug)}
                    className={`rounded-lg px-3 py-1.5 font-mono text-[13px] transition-all ${
                      isSelected
                        ? "border border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                        : "border border-[var(--border)] text-gray-500 hover:border-[var(--border-hover)] hover:text-gray-800"
                    }`}
                  >
                    {skill.name}
                  </button>
                );
              })}
            </div>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={() => updateUrl(selectedCategory, [])}
                className="mt-3 text-[13px] text-gray-500 transition-colors hover:text-gray-700"
              >
                Clear selection
              </button>
            )}
          </section>
        )}

        {/* Comparison results */}
        {selected.length >= 2 ? (
          <>
            <section className="mt-10">
              <CompareStarsChart skills={selected} />
            </section>

            <section className="mt-6">
              <CompareEvidenceChart skills={selected} />
            </section>

            {/* Quick stats table with trust score */}
            <section className="mt-6 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
              <p className="mb-4 font-mono text-[13px] uppercase tracking-widest text-gray-500">
                Quick stats
              </p>
              <table className="w-full text-[15px]" style={{ tableLayout: "fixed" }}>
                <colgroup>
                  <col className="w-[140px]" />
                  {selected.map((s) => (
                    <col key={s.slug} />
                  ))}
                </colgroup>
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="pb-3 pr-4 text-left font-mono text-[12px] uppercase tracking-wider text-gray-500">Metric</th>
                    {selected.map((s) => (
                      <th key={s.slug} className="break-words px-3 pb-3 text-center font-mono text-[12px] uppercase tracking-wider text-gray-500">
                        <Link href={`/skills/${s.slug}`} className="transition-colors hover:text-[var(--accent)]">
                          {s.name}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 pr-4 text-gray-500">Trust Score</td>
                    {selected.map((s) => (
                      <td key={s.slug} className="px-3 py-3 text-center">
                        <span className={`inline-block rounded px-2 py-0.5 font-mono text-[13px] font-bold ${
                          s.trustScore >= 80 ? "bg-emerald-50 text-emerald-700" : s.trustScore >= 50 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"
                        }`}>
                          {s.trustScore}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 pr-4 text-gray-500">Stars</td>
                    {selected.map((s) => (
                      <td key={s.slug} className="px-3 py-3 text-center font-mono text-gray-700">{s.starsDisplay}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 pr-4 text-gray-500">Evidence</td>
                    {selected.map((s) => (
                      <td key={s.slug} className="px-3 py-3 text-center font-mono text-gray-700">{s.evidenceCount}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 pr-4 text-gray-500">Strong evidence</td>
                    {selected.map((s) => (
                      <td key={s.slug} className="px-3 py-3 text-center font-mono text-emerald-600">{s.strongEvidence}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 pr-4 text-gray-500">Official</td>
                    {selected.map((s) => (
                      <td key={s.slug} className="px-3 py-3 text-center">
                        {s.official ? (
                          <span className="text-emerald-600">Yes</span>
                        ) : (
                          <span className="text-gray-500">No</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-500">Status</td>
                    {selected.map((s) => (
                      <td key={s.slug} className="px-3 py-3 text-center">
                        <span className={`rounded px-2 py-0.5 font-mono text-[12px] uppercase ${
                          s.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                        }`}>
                          {s.status}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </section>
          </>
        ) : selectedCategory && selected.length === 1 ? (
          <p className="mt-10 text-center text-[15px] text-gray-500">
            Select at least one more skill to compare.
          </p>
        ) : selectedCategory ? (
          <p className="mt-10 text-center text-[15px] text-gray-500">
            Select two or more skills above to start comparing.
          </p>
        ) : (
          <p className="mt-10 text-center text-[15px] text-gray-500">
            Choose a category to see available skills for comparison.
          </p>
        )}
    </main>
    <DarkCTA
      title="Need a curated stack?"
      subtitle="See what known builders actually ship with."
      buttonText="VIEW BUNDLES →"
      buttonHref="/bundles"
      variant="ghost"
    />
    </>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[15px] text-gray-500">Loading...</p>
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
