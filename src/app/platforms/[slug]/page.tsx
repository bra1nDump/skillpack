import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { getPlatform, getSkill, jobList, platformList } from "@/lib/catalog";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return platformList.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) return {};
  return {
    title: `${platform.name} — Skillbench`,
    description: platform.summary,
  };
}

export default async function PlatformPage({ params }: PageProps) {
  const { slug } = await params;
  const platform = getPlatform(slug);

  if (!platform) {
    notFound();
  }

  const relatedJobs = jobList.filter((j) => platform.relatedJobs.includes(j.slug));
  const relatedSkills = platform.relatedSkills
    .map((s) => getSkill(s))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="border-b border-black/5 pb-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            <Link href="/" className="hover:text-black">
              Skillbench
            </Link>
            <span className="px-2 text-zinc-400">/</span>
            <Link href="/platforms" className="hover:text-black">
              Platform
            </Link>
          </div>
          <h1 className="mt-8 text-4xl font-semibold tracking-[-0.06em] text-zinc-950 sm:text-6xl">
            {platform.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            {platform.summary}
          </p>
        </div>

        <section className="border-b border-black/5 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Native agent support
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-700">
            {platform.nativeSupport}
          </p>
        </section>

        <section className="border-b border-black/5 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Skills on this platform
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedSkills.map((skill) => {
              if (!skill) return null;
              return (
                <Link
                  key={skill.slug}
                  href={`/skills/${skill.slug}`}
                  className="group border border-black/10 px-5 py-5 transition-colors hover:border-black/25"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-zinc-950">{skill.name}</p>
                    <span
                      className={`shrink-0 rounded-sm px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] ${
                        skill.status === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {skill.status}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-500">
                    {skill.verdict}
                  </p>
                  <p className="mt-2 text-xs text-zinc-400">
                    {skill.official ? "Official" : "Community"} · {skill.repo}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Related categories
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedJobs.map((job) => (
              <Link
                key={job.slug}
                href={`/jobs/${job.slug}`}
                className="border border-black/10 px-5 py-4 transition-colors hover:border-black/25"
              >
                <p className="text-base font-semibold text-zinc-950">{job.name}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-7 text-zinc-600">
                  {job.deck}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
