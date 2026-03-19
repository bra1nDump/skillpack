import Link from "next/link";

import { DarkHero } from "@/components/dark-hero";
import { SkillsList } from "@/components/skills-list";
import { TopSkillHero } from "@/components/topskill-hero";
import { TrendingSkills } from "@/components/trending-skills";
import { TrustBadge } from "@/components/trust-badge";
import { bundleList, categoryList, getSkill, platformList, skillList } from "@/lib/catalog";
import { getTopMovers } from "@/lib/changelog";
import { parseStars } from "@/lib/parse-stars";
import { getScreenshotUrl } from "@/lib/screenshots";
import { computeTrend } from "@/lib/trend";
import { computeTrustScore } from "@/lib/trust-score";

import type { TrendingSkillItem } from "@/components/trending-skills";

const pipeline = [
  {
    name: "Discover",
    icon: "1",
    summary:
      "Search the last 7–30 days across launches, registries, X, Reddit, HN, and pairwise language like 'vs', 'replaced', 'better than'.",
    href: "/docs/agents",
  },
  {
    name: "Deep-dive",
    icon: "2",
    summary:
      "Pull the strongest trust-building sources, quotes, screenshots, and workflow differences. Proof, not volume.",
    href: "/docs/agents",
  },
  {
    name: "Rank",
    icon: "3",
    summary:
      "Turn evidence into category-level recommendations. Workflow fit and public trust over raw chatter.",
    href: "/docs/agents",
  },
  {
    name: "QA",
    icon: "4",
    summary:
      "Fail the build on broken links, dead assets, stale citations. Browser spot-check anything suspicious.",
    href: "/docs/agents/qa",
  },
];

const rawTopMovers = getTopMovers(12);
const trendingSkills: TrendingSkillItem[] = rawTopMovers.map((m) => ({
  slug: m.slug,
  name: m.name,
  detail: m.detail,
  trustScore: m.trustScore,
  screenshotUrl: getScreenshotUrl(m.slug),
}));

// Recently active: skills pushed most recently (smallest lastPushDays)
const recentlyActive = skillList
  .filter((s) => s.repoHealth?.lastPushDays != null && s.repoHealth.lastPushDays < 30)
  .sort((a, b) => (a.repoHealth!.lastPushDays) - (b.repoHealth!.lastPushDays))
  .slice(0, 6);

// Full registry items sorted by trust score desc
const registryItems = skillList
  .map((skill) => ({
    slug: skill.slug,
    name: skill.name,
    repo: skill.repo,
    status: skill.status,
    official: skill.official,
    githubStars: skill.githubStars,
    evidenceCount: skill.evidence.length,
    verdict: skill.verdict,
    trustScore: computeTrustScore(skill),
    starsTrend: computeTrend(skill.metrics?.stars),
    screenshotUrl: getScreenshotUrl(skill.slug),
    categories: categoryList
      .filter((j) => skill.relatedCategories.includes(j.slug))
      .map((j) => ({ slug: j.slug, name: j.name })),
  }))
  .sort((a, b) => b.trustScore - a.trustScore);

const searchItems = [
  ...categoryList.map((category) => ({
    label: "Category",
    name: category.name,
    href: `/categories/${category.slug}`,
    summary: category.deck,
    image: undefined as string | undefined,
  })),
  ...skillList.map((skill) => ({
    label: "Skill",
    name: skill.name,
    href: `/skills/${skill.slug}`,
    summary: skill.summary,
    image: getScreenshotUrl(skill.slug) ?? undefined,
  })),
  ...platformList.map((platform) => ({
    label: "Platform",
    name: platform.name,
    href: `/platforms/${platform.slug}`,
    summary: platform.summary,
    image: undefined as string | undefined,
  })),
  ...bundleList.map((bundle) => ({
    label: "Bundle",
    name: bundle.name,
    href: `/bundles/${bundle.slug}`,
    summary: `${bundle.persona} — ${bundle.summary}`,
    image: undefined as string | undefined,
  })),
];

const totalStars = skillList.reduce((sum, s) => sum + parseStars(s.githubStars), 0);
const totalDownloads = skillList.reduce((sum, s) => {
  const dl = s.metrics?.downloads;

  return sum + (dl && dl.length > 0 ? dl[dl.length - 1].value : 0);
}, 0);

function formatBigNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K+`;
  return String(n);
}

// Aggregate trends
const allStarsData = skillList.flatMap((s) => s.metrics?.stars ?? []);
const starsByMonth = new Map<string, number>();

for (const p of allStarsData) {
  starsByMonth.set(p.date, (starsByMonth.get(p.date) ?? 0) + p.value);
}
const starsSorted = [...starsByMonth.entries()].sort();
const totalStarsTrend =
  starsSorted.length >= 2
    ? computeTrend([
      {
        date: starsSorted[starsSorted.length - 2][0],
        value: starsSorted[starsSorted.length - 2][1],
      },
      {
        date: starsSorted[starsSorted.length - 1][0],
        value: starsSorted[starsSorted.length - 1][1],
      },
    ])
    : null;

const starsTrendStr =
  totalStarsTrend && totalStarsTrend.direction !== "flat"
    ? ` ${totalStarsTrend.direction === "up" ? "↑" : "↓"}${totalStarsTrend.pct}%`
    : "";

const heroStats = [
  { label: "categories", value: String(categoryList.length) },
  { label: "skills ranked", value: String(skillList.length) },
  { label: "total stars", value: `${formatBigNumber(totalStars)}${starsTrendStr}`, color: "#E63946" },
  { label: "downloads/wk", value: formatBigNumber(totalDownloads), color: "#059669" },
];

const bestRightNow = categoryList.map((category) => ({
  categoryName: category.name,
  categorySlug: category.slug,
  topPick: category.ranking[0]?.contender ?? "TBD",
  skillSlug: category.ranking[0]?.skillSlug,
  why: category.ranking[0]?.why ?? "",
  rank: category.ranking.length,
}));

export default function Home() {
  return (
    <>
      {/* Dark Hero */}
      <DarkHero searchItems={searchItems} stats={heroStats} />

      {/* Meta Skill: topskill */}
      <TopSkillHero />

      <div className="px-6 sm:px-8">

        {/* Trending this week */}
        {trendingSkills.length > 0 && (
          <section className="border-t border-[var(--border)] py-12">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
                  Trending this week
                </p>
                <p className="mt-1 text-[14px] text-gray-500">
                  Biggest star growth since last data collection.
                </p>
              </div>
              <Link
                href="/skills"
                className="group inline-flex items-center gap-1 text-[13px] font-medium text-gray-500 transition-colors hover:text-gray-900"
              >
                All skills <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
            <TrendingSkills skills={trendingSkills} />
          </section>
        )}

        {/* Recently active */}
        {recentlyActive.length > 0 && (
          <section className="border-t border-[var(--border)] py-12">
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              Recently active
            </p>
            <p className="mt-1 mb-6 text-[14px] text-gray-500">
              Skills with repository activity in the last 30 days.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {recentlyActive.map((skill) => {
                const score = computeTrustScore(skill);

                return (
                  <Link
                    key={skill.slug}
                    href={`/skills/${skill.slug}`}
                    className="group flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface-2)]"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-[14px] font-semibold text-gray-900 transition-colors group-hover:text-[var(--accent)]">
                          {skill.name}
                        </p>
                        <TrustBadge score={score} />
                      </div>
                      <p className="mt-0.5 font-mono text-[11px] text-gray-500">
                        {skill.repoHealth?.lastPushDays === 0
                          ? "today"
                          : `${skill.repoHealth?.lastPushDays}d ago`}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Top picks per category */}
        <section className="border-t border-[var(--border)] py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
                Best right now
              </p>
              <p className="mt-1 text-[14px] text-gray-500">
                Top pick per category, ranked by evidence weight and workflow fit.
              </p>
            </div>
            <Link
              href="/categories"
              className="group inline-flex w-fit items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-1.5 text-[13px] font-medium text-gray-500 transition-all hover:border-[var(--border-hover)] hover:bg-gray-50 hover:text-gray-900"
            >
              All categories <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {bestRightNow.map((item) => (
              <Link
                key={item.categorySlug}
                href={`/categories/${item.categorySlug}`}
                className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface-2)]"
              >
                <p className="font-mono text-[12px] uppercase tracking-wider text-gray-500">
                  {item.categoryName}
                </p>
                <p className="mt-3 text-lg font-semibold tracking-tight text-gray-900">
                  {item.topPick}
                </p>
                <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-gray-500">
                  {item.why}
                </p>
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="inline-flex items-center rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[13px] font-medium text-emerald-600">
                    #1
                  </span>
                  <span className="text-[12px] text-gray-500">of {item.rank} ranked</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Full Skill Registry */}
      <div className="border-t border-[var(--border)] bg-[var(--surface)] px-6 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
                Skill registry
              </p>
              <p className="mt-1 text-[14px] text-gray-500">
                {skillList.length} skills ranked by trust score. Each backed by public evidence.
              </p>
            </div>
            <Link
              href="/skills"
              className="group inline-flex w-fit items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-1.5 text-[13px] font-medium text-gray-500 transition-all hover:border-[var(--border-hover)] hover:bg-white hover:text-gray-900"
            >
              Full page view <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
          <SkillsList skills={registryItems} />
        </div>
      </div>

      {/* Publish your own skill — prominent CTA */}
      <div className="mx-4 my-1 overflow-hidden rounded-lg border-2 border-[var(--accent)]/40 bg-[var(--dark-bg)]">
        <div className="flex flex-col gap-6 p-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[1.5px] text-[var(--accent)]">
              Open registry
            </p>
            <h2 className="mt-2 text-[22px] font-black tracking-tight text-white">
              Built a skill worth sharing?
            </h2>
            <p className="mt-2 max-w-[440px] text-[13px] leading-relaxed text-[var(--dark-muted)]">
              Submit it. We run the full 4-stage research pipeline — discover, deep-dive, rank,
              QA — and publish the evidence. Every skill on this registry earned its spot.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded border border-[var(--dark-border)] bg-[var(--dark-surface)] px-4 py-2.5 font-mono text-[13px]">
              <span className="text-emerald-500">$</span>
              <span className="text-white">npx skills publish</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:items-end lg:text-right">
            <Link
              href="/docs/agents"
              className="inline-flex items-center justify-center gap-2 rounded bg-[var(--accent)] px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[var(--accent)]/90"
            >
              Submit a skill →
            </Link>
            <p className="text-[11px] text-[var(--dark-subtle)]">
              We review every submission
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8">
        {/* Categories */}
        <section className="border-t border-[var(--border)] py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
                Categories
              </p>
              <p className="mt-2 text-[15px] text-gray-500">
                Each answers a narrow question, backed by visible public proof.
              </p>
            </div>
            <Link
              href="/categories"
              className="group inline-flex w-fit items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-1.5 text-[13px] font-medium text-gray-500 transition-all hover:border-[var(--border-hover)] hover:bg-gray-50 hover:text-gray-900"
            >
              View all <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryList.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--accent)]/20 hover:bg-[var(--surface-2)]"
              >
                <p className="text-lg font-semibold tracking-tight text-gray-900">
                  {category.name}
                </p>
                <p className="mt-3 line-clamp-2 text-[15px] leading-6 text-gray-500">
                  {category.deck}
                </p>
                <div className="mt-5 border-t border-[var(--border)] pt-4">
                  <p className="font-mono text-[13px] uppercase tracking-wider text-gray-500">
                    Top 3
                  </p>
                  <div className="mt-2 space-y-1">
                    {category.ranking.slice(0, 3).map((item) => (
                      <div key={item.rank} className="flex items-center gap-2 text-[15px]">
                        <span className="w-5 font-mono text-[13px] text-gray-500">{item.rank}</span>
                        <span className="font-medium text-gray-700">{item.contender}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-[13px] font-medium text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
                  Open report →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Bundles */}
        {bundleList.length > 0 ? (
          <section className="border-t border-[var(--border)] py-14">
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              Bundles
            </p>
            <p className="mt-2 text-[15px] text-gray-500">
              What known builders actually ship with. Full setups from people with public track records.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {bundleList.map((bundle) => {
                const bundleSkills = bundle.skills.map((s) => getSkill(s)).filter(Boolean);

                return (
                  <Link
                    key={bundle.slug}
                    href={`/bundles/${bundle.slug}`}
                    className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface-2)]"
                  >
                    <p className="font-mono text-[12px] uppercase tracking-wider text-gray-500">
                      {bundle.personaHandle}
                    </p>
                    <p className="mt-2 text-base font-semibold tracking-tight text-gray-900">
                      {bundle.name}
                    </p>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-gray-500">
                      {bundle.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {bundleSkills.map((skill) =>
                        skill ? (
                          <span
                            key={skill.slug}
                            className="rounded bg-[var(--accent)]/10 px-2 py-0.5 font-mono text-[13px] text-[var(--accent)]"
                          >
                            {skill.name}
                          </span>
                        ) : null,
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        {/* Pipeline + Values */}
        <section className="grid gap-14 border-t border-[var(--border)] py-14 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              How we rank
            </p>
            <p className="mt-2 text-[15px] text-gray-500">
              Every recommendation goes through a 4-step research pipeline.
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {pipeline.map((step, i) => (
                <Link
                  key={step.name}
                  href={step.href}
                  className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--border-hover)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 font-mono text-[13px] text-gray-500">
                      {i + 1}
                    </span>
                    <p className="text-[15px] font-semibold text-gray-900">{step.name}</p>
                  </div>
                  <p className="mt-3 text-[13px] leading-5 text-gray-500">{step.summary}</p>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              What we optimize for
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Demonstrable outputs over generic capability claims.",
                "Public trust over registry volume.",
                "Pairwise comparisons over isolated praise.",
                "Workflow shape over fake universal scores.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]/50" />
                  <p className="text-[15px] leading-6 text-gray-500">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
