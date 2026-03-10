import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReadmePeek } from "@/components/readme-peek";
import { SiteFooter } from "@/components/site-footer";
import { getSkill, jobList, skillList } from "@/lib/catalog";
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

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="border-b border-black/5 pb-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            <Link href="/" className="hover:text-black">
              Skillbench
            </Link>
            <span className="px-2 text-zinc-400">/</span>
            <span>Skill</span>
          </div>
          <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
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
              <p>Official: {skill.official ? "Yes" : "No"}</p>
              <p>Status: {skill.status}</p>
            </div>
          </div>
        </section>

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
            Related jobs
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {relatedJobs.map((job) => (
              <Link
                key={job.slug}
                href={`/jobs/${job.slug}`}
                className="border border-black/10 px-4 py-3 text-sm text-zinc-700 hover:border-black/25 hover:text-black"
              >
                {job.name}
              </Link>
            ))}
          </div>
        </section>

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
