"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useMemo, useState } from "react";

import { CompareEvidenceChart, CompareStarsChart } from "@/components/charts/compare-chart";
import { SiteFooter } from "@/components/site-footer";
import { compareSkills } from "@/lib/compare-data";

import type { CompareSkill } from "@/lib/compare-data";

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filterText, setFilterText] = useState("");

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

  const toggleSkill = useCallback(
    (slug: string) => {
      const next = selectedSlugs.includes(slug)
        ? selectedSlugs.filter((s) => s !== slug)
        : [...selectedSlugs, slug];
      const params = new URLSearchParams();

      if (next.length > 0) params.set("skills", next.join(","));
      router.replace(`/compare${next.length > 0 ? `?${params}` : ""}`, { scroll: false });
    },
    [selectedSlugs, router],
  );

  const filteredSkills = useMemo(() => {
    if (!filterText) return compareSkills;
    const lower = filterText.toLowerCase();

    return compareSkills.filter((s) => s.name.toLowerCase().includes(lower));
  }, [filterText]);

  // Collect all unique categories from selected skills
  const allCategories = useMemo(() => {
    const map = new Map<string, string>();

    for (const skill of selected) {
      for (const cat of skill.categories) {
        map.set(cat.slug, cat.name);
      }
    }
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, [selected]);

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        <Link href="/" className="mb-4 inline-flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-zinc-300">
          ← Home
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Compare skills
        </h1>
        <p className="mt-4 text-base text-zinc-400">
          Select skills to compare side by side.
        </p>

        {/* Skill selector */}
        <section className="mt-8 rounded-xl border border-white/[0.06] bg-[var(--surface)] p-5">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter skills..."
            className="mb-4 w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-indigo-500/40"
          />
          <div className="flex flex-wrap gap-2">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSlugs.includes(skill.slug);

              return (
                <button
                  key={skill.slug}
                  type="button"
                  onClick={() => toggleSkill(skill.slug)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                    isSelected
                      ? "border border-indigo-500/40 bg-indigo-500/15 text-indigo-300"
                      : "border border-white/[0.06] text-zinc-400 hover:border-white/[0.12] hover:text-zinc-200"
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
              onClick={() => router.replace("/compare", { scroll: false })}
              className="mt-3 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Clear all
            </button>
          )}
        </section>

        {/* Comparison */}
        {selected.length >= 2 ? (
          <>
            <section className="mt-10">
              <CompareStarsChart skills={selected} />
            </section>

            <section className="mt-6">
              <CompareEvidenceChart skills={selected} />
            </section>

            {/* Rank matrix */}
            <section className="mt-6 overflow-x-auto rounded-xl border border-white/[0.06] bg-[var(--surface)] p-5">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                Category rankings
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="pb-3 pr-4 text-left font-mono text-[10px] uppercase tracking-wider text-zinc-500">Category</th>
                    {selected.map((s) => (
                      <th key={s.slug} className="pb-3 px-3 text-center font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        {s.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allCategories.map((cat) => (
                    <tr key={cat.slug} className="border-b border-white/[0.04]">
                      <td className="py-3 pr-4 text-zinc-300">{cat.name}</td>
                      {selected.map((skill) => {
                        const catEntry = skill.categories.find((c) => c.slug === cat.slug);

                        return (
                          <td key={skill.slug} className="px-3 py-3 text-center">
                            {catEntry ? (
                              <span className={`font-mono font-bold ${catEntry.rank === 1 ? "text-emerald-400" : "text-zinc-300"}`}>
                                #{catEntry.rank}
                                <span className="ml-1 text-[10px] font-normal text-zinc-600">/{catEntry.total}</span>
                              </span>
                            ) : (
                              <span className="text-zinc-700">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Quick stats table */}
            <section className="mt-6 overflow-x-auto rounded-xl border border-white/[0.06] bg-[var(--surface)] p-5">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                Quick stats
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="pb-3 pr-4 text-left font-mono text-[10px] uppercase tracking-wider text-zinc-500">Metric</th>
                    {selected.map((s) => (
                      <th key={s.slug} className="pb-3 px-3 text-center font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        {s.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-zinc-400">Stars</td>
                    {selected.map((s) => (
                      <td key={s.slug} className="px-3 py-3 text-center font-mono text-zinc-300">{s.starsDisplay}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-zinc-400">Evidence</td>
                    {selected.map((s) => (
                      <td key={s.slug} className="px-3 py-3 text-center font-mono text-zinc-300">{s.evidenceCount}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-zinc-400">Strong evidence</td>
                    {selected.map((s) => (
                      <td key={s.slug} className="px-3 py-3 text-center font-mono text-emerald-400">{s.strongEvidence}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-zinc-400">Official</td>
                    {selected.map((s) => (
                      <td key={s.slug} className="px-3 py-3 text-center">
                        {s.official ? (
                          <span className="text-emerald-400">Yes</span>
                        ) : (
                          <span className="text-zinc-600">No</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-zinc-400">Status</td>
                    {selected.map((s) => (
                      <td key={s.slug} className="px-3 py-3 text-center">
                        <span className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase ${
                          s.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
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
        ) : selected.length === 1 ? (
          <p className="mt-10 text-center text-sm text-zinc-500">
            Select at least one more skill to compare.
          </p>
        ) : (
          <p className="mt-10 text-center text-sm text-zinc-500">
            Select two or more skills above to start comparing.
          </p>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-zinc-500">Loading...</p>
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
