import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReadmePeek } from "@/components/readme-peek";
import { SiteFooter } from "@/components/site-footer";
import { bundleList, getSkill, jobList, skillList } from "@/lib/catalog";
import { fetchGitHubReadme } from "@/lib/github-readme";

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

  const [owner, repo] = skill.repo.split("/");
  const readme = await fetchGitHubReadme({
    owner,
    repo,
    branch: skill.readmeBranch,
  });

  const relatedJobs = jobList.filter((job) => skill.relatedJobs.includes(job.slug));
  const relatedBundles = bundleList.filter((b) => b.skills.includes(skill.slug));

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="border-b border-black/5 pb-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-semibold tracking-[-0.06em] text-zinc-950 sm:text-6xl">
                {skill.name}
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600">{skill.summary}</p>
            </div>
            {skill.previewImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={skill.previewImage}
                alt={skill.name}
                className="h-52 w-full max-w-md border border-black/10 object-cover object-top"
              />
            ) : null}
          </div>
        </div>

        <section className="grid gap-12 border-b border-black/5 py-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Editorial verdict
            </p>
            <p className="mt-5 text-base leading-8 text-zinc-700">{skill.verdict}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Source
            </p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-700">
              <p>
                GitHub:{" "}
                <a
                  href={skill.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-black/20 underline-offset-4"
                >
                  {skill.repo}
                </a>
              </p>
              {skill.docsUrl ? (
                <p>
                  Docs:{" "}
                  <a
                    href={skill.docsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-black/20 underline-offset-4"
                  >
                    {skill.docsUrl}
                  </a>
                </p>
              ) : null}
              {skill.githubStars ? (
                <p>Stars: {skill.githubStars}</p>
              ) : null}
              <p>Official: {skill.official ? "Yes" : "No"}</p>
              <p>Status: {skill.status}</p>
            </div>
          </div>
        </section>

        {skill.evidence.length > 0 ? (
          <section className="border-b border-black/5 py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Public evidence
            </p>
            <div className="mt-6 space-y-6">
              {skill.evidence.map((item) => (
                <article key={item.url} className="border border-black/10 px-5 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block rounded-sm px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] ${
                            item.quality === "strong"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {item.quality}
                        </span>
                        {item.selfReported ? (
                          <span className="inline-block rounded-sm bg-zinc-100 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
                            Self-reported
                          </span>
                        ) : null}
                        <span className="font-mono text-[10px] text-zinc-400">
                          {item.date}
                        </span>
                      </div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-sm font-semibold leading-6 text-zinc-950 underline decoration-black/20 underline-offset-4 hover:decoration-black/50"
                      >
                        {item.title}
                      </a>
                      <p className="mt-2 text-sm leading-7 text-zinc-600">
                        {item.gist}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] text-zinc-400">
                        <span>{item.engagement}</span>
                        <span>{item.who}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="grid gap-12 border-b border-black/5 py-16 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Where it wins
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-8 text-zinc-700">
              {skill.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Where to be skeptical
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-8 text-zinc-700">
              {skill.weaknesses.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-black/5 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Ranking in related categories
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedJobs.map((job) => {
              const entry = job.ranking.find((r) => r.skillSlug === skill.slug);
              return (
                <Link
                  key={job.slug}
                  href={`/categories/${job.slug}`}
                  className="group border border-black/10 px-5 py-4 transition-colors hover:border-black/25"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-400">
                    {job.name}
                  </p>
                  {entry ? (
                    <div className="mt-2">
                      <span className="font-mono text-2xl font-semibold text-zinc-950">
                        #{entry.rank}
                      </span>
                      <span className="ml-2 text-sm text-zinc-500">
                        of {job.ranking.length}
                      </span>
                      <p className="mt-1 text-xs leading-5 text-zinc-500">
                        {entry.bestFor}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-zinc-500">Related but not ranked</p>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        {relatedBundles.length > 0 ? (
          <section className="border-b border-black/5 py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Featured in bundles
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {relatedBundles.map((bundle) => (
                <Link
                  key={bundle.slug}
                  href={`/bundles/${bundle.slug}`}
                  className="group border border-black/10 px-5 py-4 transition-colors hover:border-black/25"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-400">
                    {bundle.persona}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-zinc-950 group-hover:underline">
                    {bundle.name}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    {bundle.skills.length} skills &middot; {bundle.date}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Raw GitHub source
          </p>
          <div className="mt-6">
            {readme ? (
              <ReadmePeek source={readme.source} githubUrl={readme.githubUrl} />
            ) : (
              <p className="text-base leading-8 text-zinc-700">
                GitHub README could not be fetched right now.
              </p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
