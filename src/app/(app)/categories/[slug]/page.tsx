import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import { CategorySkillsChart } from "@/components/charts/category-skills-chart";
import { MultiMetricsChart } from "@/components/charts/metrics-chart";
import { DarkCTA } from "@/components/dark-cta";
import { DarkPageHeader } from "@/components/dark-page-header";
import { TrendArrow } from "@/components/trend-arrow";
import { TrustBadge } from "@/components/trust-badge";
import { categoryList, getCategory, getSkill } from "@/lib/catalog";
import { parseStars } from "@/lib/parse-stars";
import { computeTrend } from "@/lib/trend";
import { computeTrustScore } from "@/lib/trust-score";

import type { CategorySkillData } from "@/components/charts/category-skills-chart";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return categoryList.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) return {};
  return {
    title: `${category.name} — Skillbench`,
    description: category.deck,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  return (
      <>
      <DarkPageHeader
        backLink={{ href: "/categories", label: "All categories" }}
        title={category.name}
        subtitle={category.deck}
        stats={[
          { label: "Ranked", value: String(category.ranking.length) },
          { label: "Signals", value: String(category.liveSignals.length) },
        ]}
      />
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        {/* Verdict and Deeper Read hidden — go straight to ranking */}

        {/* Ranking */}
        <section className="border-t border-[var(--border)] py-14">
          <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
            Current ranking
          </p>
          <div className="mt-6 space-y-3">
            {category.ranking.map((item, idx) => {
              const skill = item.skillSlug ? getSkill(item.skillSlug) : null;
              const href = skill ? `/skills/${skill.slug}` : item.externalUrl;
              const external = Boolean(item.externalUrl && !skill);
              const prevItem = idx > 0 ? category.ranking[idx - 1] : null;
              const showCutLine = item.belowCutLine && !prevItem?.belowCutLine;

              return (
                <Fragment key={item.rank}>
                  {showCutLine ? (
                    <div className="flex items-center gap-3 py-2">
                      <div className="h-px flex-1 bg-amber-100" />
                      <span className="font-mono text-[12px] uppercase tracking-wider text-amber-600">
                        Below the cut line
                      </span>
                      <div className="h-px flex-1 bg-amber-100" />
                    </div>
                  ) : null}
                  <div className={`flex gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--border-hover)]${item.belowCutLine ? " opacity-50" : ""}`}>
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50 font-mono text-lg font-bold text-gray-500">
                      {item.rank}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {href ? (
                          external ? (
                            <a href={href} target="_blank" rel="noreferrer" className="text-base font-semibold text-gray-900 transition-colors hover:text-[var(--accent)]">
                              {item.contender}
                            </a>
                          ) : (
                            <Link href={href} className="text-base font-semibold text-gray-900 transition-colors hover:text-[var(--accent)]">
                              {item.contender}
                            </Link>
                          )
                        ) : (
                          <span className="text-base font-semibold text-gray-900">{item.contender}</span>
                        )}
                        {skill?.official ? (
                          <span className="rounded bg-[var(--accent)]/10 px-1.5 py-0.5 font-mono text-[13px] uppercase tracking-wider text-[var(--accent)]">
                            Official
                          </span>
                        ) : null}
                        {skill?.githubStars ? (
                          <span className="inline-flex items-center gap-1 font-mono text-[12px] text-gray-500">
                            ★ {skill.githubStars} <TrendArrow trend={computeTrend(skill.metrics?.stars)} />
                          </span>
                        ) : null}
                        {skill && <TrustBadge score={computeTrustScore(skill)} />}
                      </div>
                      <p className="mt-1 text-[15px] text-gray-500">
                        <span className="font-medium text-gray-500">Best for:</span> {item.bestFor}
                      </p>
                      <p className="mt-1 text-[13px] leading-5 text-gray-500">{item.why}</p>
                      {item.watch ? (
                        <p className="mt-2 text-[13px] text-amber-600">
                          ⚡ {item.watch}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </section>

        <DarkCTA
          title="See the full comparison."
          subtitle="Stars, downloads, evidence — all skills side by side."
          buttonText="COMPARE →"
          buttonHref={`/compare?skills=${category.ranking.slice(0, 3).map((r) => r.skillSlug).filter(Boolean).join(",")}`}
          variant="primary"
        />

        {/* Skills comparison chart */}
        {(() => {
          const chartData: CategorySkillData[] = category.ranking
            .map((item) => {
              const skill = item.skillSlug ? getSkill(item.skillSlug) : null;

              return {
                name: item.contender,
                stars: skill ? parseStars(skill.githubStars) : 0,
                evidence: skill ? skill.evidence.length : 0,
                strongEvidence: skill ? skill.evidence.filter((e) => e.quality === "strong").length : 0,
                rank: item.rank,
              };
            })
            .filter((d) => d.stars > 0 || d.evidence > 0);

          const top10 = chartData.slice(0, 10);
          const remaining = chartData.length - top10.length;

          return top10.length > 1 ? (
            <section className="border-t border-[var(--border)] py-14">
              <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
                Skills comparison
              </p>
              <p className="mt-2 text-[15px] text-gray-500">
                GitHub stars and evidence count for top ranked skills.
              </p>
              <div className="mt-6">
                <CategorySkillsChart data={top10} />
              </div>
              {remaining > 0 && (
                <p className="mt-3 text-center text-[13px] text-gray-500">
                  +{remaining} more not shown
                </p>
              )}
            </section>
          ) : null;
        })()}

        {/* Star growth over time */}
        {(() => {
          const LINE_COLORS = ["#E63946", "#34d399", "#fbbf24", "#f472b6", "#38bdf8", "#a78bfa"];
          const lines = category.ranking
            .slice(0, 6)
            .map((item, i) => {
              const skill = item.skillSlug ? getSkill(item.skillSlug) : null;

              if (!skill?.metrics?.stars || skill.metrics.stars.length < 2) return null;
              return {
                name: item.contender,
                color: LINE_COLORS[i % LINE_COLORS.length],
                data: skill.metrics.stars,
              };
            })
            .filter((l): l is NonNullable<typeof l> => l !== null);

          return lines.length > 0 ? (
            <section className="border-t border-[var(--border)] py-14">
              <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
                Star growth over time
              </p>
              <p className="mt-2 text-[15px] text-gray-500">
                GitHub stars trajectory for top skills in this category.
              </p>
              <div className="mt-6">
                <MultiMetricsChart lines={lines} label="GitHub Stars" />
              </div>
            </section>
          ) : null;
        })()}

        {/* Social mentions */}
        {(() => {
          const LINE_COLORS = ["#E63946", "#34d399", "#fbbf24", "#f472b6", "#38bdf8", "#a78bfa"];
          const lines = category.ranking
            .slice(0, 6)
            .map((item, i) => {
              const skill = item.skillSlug ? getSkill(item.skillSlug) : null;

              if (!skill?.metrics?.mentionsPositive || skill.metrics.mentionsPositive.length < 2) return null;
              return {
                name: item.contender,
                color: LINE_COLORS[i % LINE_COLORS.length],
                data: skill.metrics.mentionsPositive,
              };
            })
            .filter((l): l is NonNullable<typeof l> => l !== null);

          return lines.length > 0 ? (
            <section className="border-t border-[var(--border)] py-14">
              <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
                Social mentions
              </p>
              <p className="mt-2 text-[15px] text-gray-500">
                HN mentions over time for top skills in this category.
              </p>
              <div className="mt-6">
                <MultiMetricsChart lines={lines} label="Social Mentions (HN)" />
              </div>
            </section>
          ) : null;
        })()}

        {/* Head to head */}
        {category.headToHead.length > 0 ? (
          <section className="border-t border-[var(--border)] py-14">
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              Head to head
            </p>
            <div className="mt-6 grid gap-3 lg:grid-cols-3">
              {category.headToHead.map((pair) => (
                <article key={`${pair.left}-${pair.right}`} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-gray-900">{pair.left}</span>
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[12px] font-medium text-gray-500">vs</span>
                    <span className="text-[15px] font-semibold text-gray-900">{pair.right}</span>
                  </div>
                  <p className="mt-3 text-[15px] leading-6 text-gray-500">
                    {pair.gist}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <DarkCTA
          title="Missing a contender?"
          subtitle="If there's a skill we haven't ranked, submit it."
          buttonText="SUBMIT A SKILL →"
          buttonHref="/docs/agents"
          variant="ghost"
        />

        {/* Public signals */}
        {category.liveSignals.length > 0 ? (
          <section className="border-t border-[var(--border)] py-14">
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              Public signals
            </p>
            <div className="mt-6 space-y-3">
              {category.liveSignals.map((signal) => (
                <article key={signal.title} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[13px] uppercase tracking-wider text-gray-500">
                      {signal.label}
                    </span>
                    <span className="font-mono text-[12px] text-gray-500">{signal.date}</span>
                  </div>
                  <a
                    href={signal.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-[15px] font-medium text-gray-800 transition-colors hover:text-gray-900"
                  >
                    {signal.title}
                  </a>
                  <p className="mt-2 max-w-3xl text-[15px] leading-6 text-gray-500">
                    {signal.note}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* What changes this */}
        <section className="border-t border-[var(--border)] py-14">
          <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
            What changes this
          </p>
          <div className="mt-5 space-y-3">
            {category.whatChangesThis.map((paragraph) => (
              <div key={paragraph} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500/40" />
                <p className="text-[15px] leading-6 text-gray-500">{paragraph}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      </>
  );
}
