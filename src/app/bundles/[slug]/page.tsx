import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { bundleList, getBundle, getSkill } from "@/lib/catalog";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return bundleList.map((bundle) => ({ slug: bundle.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const bundle = getBundle(slug);
  if (!bundle) return {};
  return {
    title: `${bundle.name} — Skillbench`,
    description: bundle.summary,
  };
}

export default async function BundlePage({ params }: PageProps) {
  const { slug } = await params;
  const bundle = getBundle(slug);

  if (!bundle) {
    notFound();
  }

  const skills = bundle.skills.map((s) => getSkill(s)).filter(Boolean);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="border-b border-black/5 pb-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            <Link href="/" className="hover:text-black">
              Skillbench
            </Link>
            <span className="px-2 text-zinc-400">/</span>
            <Link href="/bundles" className="hover:text-black">
              Bundles
            </Link>
            <span className="px-2 text-zinc-400">/</span>
            <span>{bundle.persona}</span>
          </div>
          <h1 className="mt-8 text-4xl font-semibold tracking-[-0.06em] text-zinc-950 sm:text-6xl">
            {bundle.name}
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600">{bundle.summary}</p>
        </div>

        <section className="border-b border-black/5 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Persona
          </p>
          <div className="mt-5 text-base leading-8 text-zinc-700">
            <p>
              <span className="font-semibold text-zinc-950">{bundle.persona}</span>{" "}
              <a
                href={bundle.personaUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm text-zinc-500 underline decoration-black/20 underline-offset-4 hover:text-black"
              >
                {bundle.personaHandle}
              </a>
            </p>
          </div>
        </section>

        <section className="border-b border-black/5 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Skills in this bundle
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {skills.map((skill) =>
              skill ? (
                <Link
                  key={skill.slug}
                  href={`/skills/${skill.slug}`}
                  className="group border border-black/10 px-5 py-4 transition-colors hover:border-black/25"
                >
                  <p className="text-sm font-semibold text-zinc-950 underline decoration-black/20 underline-offset-4 group-hover:decoration-black/50">
                    {skill.name}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-500">
                    {skill.summary}
                  </p>
                  {skill.githubStars ? (
                    <p className="mt-2 font-mono text-[10px] text-zinc-400">
                      {skill.githubStars} stars
                    </p>
                  ) : null}
                </Link>
              ) : null
            )}
          </div>
        </section>

        <section className="py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Source
          </p>
          <div className="mt-5 space-y-3 text-sm leading-7 text-zinc-700">
            <p>{bundle.source}</p>
            <a
              href={bundle.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-sm font-semibold text-zinc-950 underline decoration-black/20 underline-offset-4 hover:decoration-black/50"
            >
              View source →
            </a>
            <p className="font-mono text-[10px] text-zinc-400">
              Last verified: {bundle.date}
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
