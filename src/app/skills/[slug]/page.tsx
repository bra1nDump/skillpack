import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SkillMetricsChart } from "@/components/charts/metrics-chart";
import { DarkCTA } from "@/components/dark-cta";
import { DarkPageHeader } from "@/components/dark-page-header";
import { ReadmePeek } from "@/components/readme-peek";
import { TrustBadge } from "@/components/trust-badge";
import { VideoEmbed } from "@/components/video-embed";
import { bundleList, categoryList, getSkill, skillList } from "@/lib/catalog";
import { formatTimeAgo } from "@/lib/format-time";
import { fetchGitHubReadme } from "@/lib/github-readme";
import { getScreenshotUrl } from "@/lib/screenshots";
import { computeTrend } from "@/lib/trend";
import { computeTrustScore } from "@/lib/trust-score";

import type { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return skillList.map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);

  if (!skill) return {};
  return {
    title: `${skill.name} — Skillbench`,
    description: skill.summary,
  };
}

export default async function SkillPage({ params }: PageProps) {
  const { slug } = await params;
  const skill = getSkill(slug);

  if (!skill) {
    notFound();
  }

  const [owner, repo] = skill.repo ? skill.repo.split("/") : [undefined, undefined];
  const readme = owner && repo ? await fetchGitHubReadme({
    owner,
    repo,
    branch: skill.readmeBranch,
  }) : null;

  const relatedCategories = categoryList.filter((category) => skill.relatedCategories.includes(category.slug));
  const relatedBundles = bundleList.filter((b) => b.skills.includes(skill.slug));
  const trustScore = computeTrustScore(skill);
  const starsTrend = computeTrend(skill.metrics?.stars);
  const dlTrend = computeTrend(skill.metrics?.downloads);

  return (
      <>
      <DarkPageHeader
        backLink={{ href: "/skills", label: "All skills" }}
        title={skill.name}
        subtitle={skill.summary}
        badge={{ text: skill.status, variant: skill.status }}
        stats={[
          { label: "Trust", value: `${trustScore}/100` },
          ...(skill.githubStars ? [{ label: "Stars", value: `${skill.githubStars}${starsTrend && starsTrend.direction !== "flat" ? ` ${starsTrend.direction === "up" ? "↑" : "↓"}${starsTrend.pct}%` : ""}` }] : []),
          { label: "Evidence", value: String(skill.evidence.length) },
          ...(skill.packageSize ? [{ label: "Repo size", value: skill.packageSize.repoSizeKb >= 1024 ? `${(skill.packageSize.repoSizeKb / 1024).toFixed(1)} MB` : `${skill.packageSize.repoSizeKb} KB` }] : []),
        ]}
      />
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        {/* Product screenshot */}
        {(() => {
          const screenshotUrl = getScreenshotUrl(skill.slug);

          return screenshotUrl ? (
            <section className="border-t border-[var(--border)] py-14">
              <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
                Product screenshot
              </p>
              <div className="mt-6 overflow-hidden rounded-lg border border-[var(--border)]">
                <Image
                  src={screenshotUrl}
                  alt={`${skill.name} in action`}
                  width={1280}
                  height={800}
                  className="w-full"
                />
              </div>
            </section>
          ) : null;
        })()
        }

        {/* Videos */}
        {skill.videos && skill.videos.length > 0 && (
          <section className="border-t border-[var(--border)] py-14">
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              Videos
            </p>
            <p className="mt-2 text-[15px] text-gray-500">
              Reviews, tutorials, and comparisons from the community.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skill.videos.map((video) => (
                <VideoEmbed
                  key={video.youtubeId}
                  youtubeId={video.youtubeId}
                  title={video.title}
                  channel={video.channel}
                  date={video.date}
                />
              ))}
            </div>
          </section>
        )}

        {/* Repo health */}
        {skill.repoHealth && (
          <section className="border-t border-[var(--border)] py-14">
            <div className="flex items-center gap-3">
              <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
                Repo health
              </p>
              <TrustBadge score={trustScore} size="md" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                <p className={`text-lg font-bold ${skill.repoHealth.lastPushDays < 30 ? "text-emerald-600" : skill.repoHealth.lastPushDays < 90 ? "text-amber-600" : "text-red-500"}`}>
                  {formatTimeAgo(skill.repoHealth.lastPushAt)}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-gray-500">Last push</p>
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                <p className="text-lg font-bold text-gray-900">{skill.repoHealth.openIssues.toLocaleString()}</p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-gray-500">Open issues</p>
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                <p className="text-lg font-bold text-gray-900">{skill.repoHealth.forks.toLocaleString()}</p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-gray-500">Forks</p>
              </div>
              {skill.repoHealth.contributors && (
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                  <p className="text-lg font-bold text-gray-900">{skill.repoHealth.contributors.toLocaleString()}</p>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-gray-500">Contributors</p>
                </div>
              )}
            </div>
            {skill.repoHealth.archived && (
              <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600">
                This repository is archived and no longer maintained.
              </div>
            )}
          </section>
        )}

        {/* Verdict + source */}
        <section className="grid gap-8 border-t border-[var(--border)] py-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              Editorial verdict
            </p>
            <p className="mt-5 text-[15px] leading-7 text-gray-700">{skill.verdict}</p>
          </div>
          <div>
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              Source
            </p>
            <div className="mt-5 space-y-3 text-[15px] text-gray-500">
              {skill.repo && skill.repoUrl && (
              <p>
                GitHub:{" "}
                <a href={skill.repoUrl} target="_blank" rel="noreferrer" className="text-gray-800 transition-colors hover:text-[var(--accent)]">
                  {skill.repo}
                </a>
              </p>
              )}
              {skill.docsUrl ? (
                <p>
                  Docs:{" "}
                  <a href={skill.docsUrl} target="_blank" rel="noreferrer" className="text-gray-800 transition-colors hover:text-[var(--accent)]">
                    {new URL(skill.docsUrl).hostname}
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        </section>

        {/* Evidence */}
        {skill.evidence.length > 0 ? (
          <section className="border-t border-[var(--border)] py-14">
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              Public evidence
            </p>
            <div className="mt-6 space-y-3">
              {skill.evidence.map((item) => (
                <article key={item.url} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[13px] font-bold uppercase tracking-wider ${
                        item.quality === "strong"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {item.quality}
                    </span>
                    {item.selfReported ? (
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[13px] uppercase tracking-wider text-gray-500">
                        Self-reported
                      </span>
                    ) : null}
                    <span className="font-mono text-[12px] text-gray-500">
                      {item.date}
                    </span>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-[15px] font-medium text-gray-800 transition-colors hover:text-gray-900"
                  >
                    {item.title}
                  </a>
                  <p className="mt-2 text-[15px] leading-6 text-gray-500">
                    {item.gist}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[12px] text-gray-500">
                    <span>{item.engagement}</span>
                    <span>{item.who}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <DarkCTA
          title="How does this compare?"
          subtitle="See side-by-side metrics against other skills in the same category."
          buttonText="COMPARE SKILLS →"
          buttonHref={`/compare?skills=${skill.slug}`}
          variant="primary"
        />

        {/* Growth metrics */}
        {skill.metrics?.stars && skill.metrics.stars.length >= 2 && (
          <section className="border-t border-[var(--border)] py-14">
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              Growth
            </p>
            <p className="mt-2 text-[15px] text-gray-500">
              GitHub stars over time.
            </p>
            <div className="mt-6">
              <SkillMetricsChart data={skill.metrics.stars} label="GitHub Stars" />
            </div>
          </section>
        )}

        {/* Downloads */}
        {skill.metrics?.downloads && skill.metrics.downloads.length >= 2 && (
          <section className="border-t border-[var(--border)] py-14">
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              Downloads
            </p>
            <p className="mt-2 text-[15px] text-gray-500">
              Weekly package downloads over time.
            </p>
            <div className="mt-6">
              <SkillMetricsChart data={skill.metrics.downloads} label="Weekly Downloads" />
            </div>
          </section>
        )}

        {/* Strengths / Weaknesses */}
        <section className="grid gap-8 border-t border-[var(--border)] py-14 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[13px] uppercase tracking-widest text-emerald-600">
              Where it wins
            </p>
            <div className="mt-5 space-y-2">
              {skill.strengths.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  <p className="text-[15px] leading-6 text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[13px] uppercase tracking-widest text-amber-600">
              Where to be skeptical
            </p>
            <div className="mt-5 space-y-2">
              {skill.weaknesses.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                  <p className="text-[15px] leading-6 text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related categories */}
        <section className="border-t border-[var(--border)] py-14">
          <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
            Ranking in categories
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {relatedCategories.map((category) => {
              const entry = category.ranking.find((r) => r.skillSlug === skill.slug);

              return (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--accent)]/20 hover:bg-[var(--surface-2)]"
                >
                  <p className="font-mono text-[12px] uppercase tracking-wider text-gray-500">
                    {category.name}
                  </p>
                  {entry ? (
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-bold text-gray-900">
                        #{entry.rank}
                      </span>
                      <span className="text-[15px] text-gray-500">
                        of {category.ranking.length}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-2 text-[15px] text-gray-500">Related but not ranked</p>
                  )}
                  {entry ? (
                    <p className="mt-1 text-[13px] text-gray-500">{entry.bestFor}</p>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Bundles */}
        {relatedBundles.length > 0 ? (
          <section className="border-t border-[var(--border)] py-14">
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              Featured in bundles
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {relatedBundles.map((bundle) => (
                <Link
                  key={bundle.slug}
                  href={`/bundles/${bundle.slug}`}
                  className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface-2)]"
                >
                  <p className="font-mono text-[12px] uppercase tracking-wider text-gray-500">
                    {bundle.persona}
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-gray-900">
                    {bundle.name}
                  </p>
                  <p className="mt-1 text-[13px] text-gray-500">
                    {bundle.skills.length} skills · {bundle.date}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <DarkCTA
          title="Know a better alternative?"
          subtitle="Submit evidence and we'll run the full pipeline."
          buttonText="SUBMIT →"
          buttonHref="/docs/agents"
          variant="ghost"
        />

        {/* Similar skills */}
        {(() => {
          const similar = skillList
            .filter(
              (s) =>
                s.slug !== skill.slug &&
                s.relatedCategories.some((c) => skill.relatedCategories.includes(c)),
            )
            .map((s) => ({ skill: s, score: computeTrustScore(s), screenshot: getScreenshotUrl(s.slug) }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 4);

          return similar.length > 0 ? (
            <section className="border-t border-[var(--border)] py-14">
              <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
                Similar skills
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {similar.map(({ skill: s, score, screenshot }) => (
                  <Link
                    key={s.slug}
                    href={`/skills/${s.slug}`}
                    className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface-2)]"
                  >
                    {screenshot && (
                      <div className="mb-3 h-20 overflow-hidden rounded border border-[var(--border)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={screenshot}
                          alt=""
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <p className="flex-1 truncate text-[14px] font-semibold text-gray-900 transition-colors group-hover:text-[var(--accent)]">
                        {s.name}
                      </p>
                      <TrustBadge score={score} />
                    </div>
                    <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-gray-500">
                      {s.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null;
        })()}

        {/* README */}
        <section className="border-t border-[var(--border)] py-14">
          <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
            Raw GitHub source
          </p>
          <div className="mt-6">
            {readme ? (
              <ReadmePeek source={readme.source} githubUrl={readme.githubUrl} />
            ) : (
              <p className="text-[15px] text-gray-500">
                GitHub README could not be fetched right now.
              </p>
            )}
          </div>
        </section>
      </main>
      </>
  );
}
