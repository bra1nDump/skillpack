import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BoldText, InlineMarkdown } from "@/components/bold-text";
import { DarkPageHeader } from "@/components/dark-page-header";
import { ReadmePeek } from "@/components/readme-peek";
import { TrackSolutionView } from "@/components/track-view";
import { TrackedLink } from "@/components/tracked-link";
import { TrustBadge } from "@/components/trust-badge";
import { VideoEmbed } from "@/components/video-embed";
import { categoryList, getSkill, skillList } from "@/lib/catalog";
import { getRecentChangesForSolution } from "@/lib/changelog";
import { fetchGitHubReadme } from "@/lib/github-readme";
import { getScoreLabels } from "@/lib/score-labels";
import { getScreenshotUrl } from "@/lib/screenshots";
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
    title: `${skill.name} — SkillPack`,
    description: skill.summary,
  };
}

export default async function SolutionPage({ params }: PageProps) {
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
  const screenshotUrl = getScreenshotUrl(skill.slug);
  const labels = getScoreLabels(skill);
  const recentChanges = getRecentChangesForSolution(skill.slug);

  return (
      <>
      <TrackSolutionView slug={skill.slug} name={skill.name} score={computeTrustScore(skill)} />
      <DarkPageHeader
        backLink={{ href: "/solutions", label: "All solutions" }}
        title={skill.name}
        subtitle={skill.summary}
        badge={{ text: skill.status, variant: skill.status }}
        labels={labels}
        aside={screenshotUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={screenshotUrl}
            alt={`${skill.name} in action`}
            className="h-full w-full object-cover object-top"
          />
        ) : undefined}
      />
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        {/* Shipped last month */}
        {recentChanges.length > 0 && (
          <section className="border-t border-[var(--border)] py-14">
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              Shipped last month
            </p>
            <div className="mt-5 space-y-2">
              {recentChanges.map((change) => (
                <div key={`${change.date}-${change.title}`} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <div className="min-w-0">
                    <p className="text-[15px] leading-6 text-gray-700">
                      {change.title}
                    </p>
                    <p className="mt-0.5 text-[12px] text-gray-400">
                      {change.detail} · {change.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {skill.repoUrl && (
              <a
                href={`${skill.repoUrl}/releases`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] font-bold tracking-wide text-[var(--accent)] transition-colors hover:text-gray-900"
              >
                ALL RELEASES →
              </a>
            )}
          </section>
        )}

        {/* Where it wins / Where to be skeptical */}
        <section className="grid gap-8 border-t border-[var(--border)] py-14 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[13px] uppercase tracking-widest text-emerald-600">
              Where it wins
            </p>
            <div className="mt-5 space-y-2">
              {skill.strengths.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  <p className="text-[15px] leading-6 text-gray-700">
                    <BoldText text={item} />
                  </p>
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
                  <p className="text-[15px] leading-6 text-gray-700">
                    <BoldText text={item} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verdict + Getting started */}
        <section className="grid gap-8 border-t border-[var(--border)] py-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div>
              <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
                Editorial verdict
              </p>
              <p className="mt-5 text-[15px] leading-7 text-gray-700">
                <BoldText text={skill.verdict} />
              </p>
            </div>
            {skill.gettingStarted && (
              <div>
                <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
                  How to get started
                </p>
                <p className="mt-5 text-[15px] leading-7 text-gray-700">
                  <InlineMarkdown text={skill.gettingStarted} />
                </p>
              </div>
            )}
          </div>
          <div>
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              Source
            </p>
            <div className="mt-5 space-y-3 text-[15px] text-gray-500">
              {skill.repo && skill.repoUrl && (
              <p>
                GitHub:{" "}
                <TrackedLink href={skill.repoUrl} linkType="github" skillSlug={skill.slug} className="text-gray-800 transition-colors hover:text-[var(--accent)]">
                  {skill.repo}
                </TrackedLink>
              </p>
              )}
              {skill.docsUrl ? (
                <p>
                  Docs:{" "}
                  <TrackedLink href={skill.docsUrl} linkType="docs" skillSlug={skill.slug} className="text-gray-800 transition-colors hover:text-[var(--accent)]">
                    {new URL(skill.docsUrl).hostname}
                  </TrackedLink>
                </p>
              ) : null}
              <p className="mt-4 border-t border-[var(--border)] pt-4">
                <TrackedLink
                  href="https://github.com/bra1nDump/skillpack/"
                  linkType="github"
                  className="font-mono text-[11px] text-[#737373] transition-colors hover:text-[var(--accent)]"
                >
                  Found via SkillPack? ★ Star us on GitHub
                </TrackedLink>
              </p>
            </div>
          </div>
        </section>

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

        {/* Related — problems + similar solutions */}
        <section className="border-t border-[var(--border)] py-14">
          <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
            Related
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {relatedCategories.map((category) => {
              const entry = category.ranking.find((r) => r.skillSlug === skill.slug);

              return (
                <Link
                  key={category.slug}
                  href={`/problems/${category.slug}`}
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

          {/* Similar solutions */}
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
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {similar.map(({ skill: s, score, screenshot }) => (
                  <Link
                    key={s.slug}
                    href={`/solutions/${s.slug}`}
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
            ) : null;
          })()}
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
                  <TrackedLink
                    href={item.url}
                    linkType="evidence"
                    skillSlug={skill.slug}
                    className="mt-3 inline-block text-[15px] font-medium text-gray-800 transition-colors hover:text-gray-900"
                  >
                    {item.title}
                  </TrackedLink>
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
