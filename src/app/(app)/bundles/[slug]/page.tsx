import Link from "next/link";
import { notFound } from "next/navigation";

import { DarkCTA } from "@/components/dark-cta";
import { DarkPageHeader } from "@/components/dark-page-header";
import { bundleList, getBundle, getSkill } from "@/lib/catalog";

import type { Metadata } from "next";

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
      <>
      <DarkPageHeader
        backLink={{ href: "/bundles", label: "All bundles" }}
        title={bundle.name}
        subtitle={bundle.summary}
        stats={[
          { label: "Skills", value: String(bundle.skills.length) },
          { label: "Verified", value: bundle.date },
        ]}
      />
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        {/* Persona */}
        <section className="border-t border-[var(--border)] py-14">
          <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
            Persona
          </p>
          <div className="mt-4">
            <span className="text-base font-semibold text-gray-900">{bundle.persona}</span>{" "}
            <a
              href={bundle.personaUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[15px] text-[var(--accent)] transition-colors hover:text-[var(--accent)]"
            >
              {bundle.personaHandle}
            </a>
          </div>
        </section>

        {/* Skills */}
        <section className="border-t border-[var(--border)] py-14">
          <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
            Skills in this bundle
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {skills.map((skill) =>
              skill ? (
                <Link
                  key={skill.slug}
                  href={`/skills/${skill.slug}`}
                  className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--accent)]/20 hover:bg-[var(--surface-2)]"
                >
                  <p className="text-[15px] font-semibold text-gray-900 transition-colors group-hover:text-[var(--accent)]">
                    {skill.name}
                  </p>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-gray-500">
                    {skill.summary}
                  </p>
                  {skill.githubStars ? (
                    <p className="mt-2 font-mono text-[12px] text-gray-500">
                      ★ {skill.githubStars}
                    </p>
                  ) : null}
                </Link>
              ) : null,
            )}
          </div>
        </section>

        <DarkCTA
          title="Build your own stack."
          subtitle="See all ranked skills and find the best fit for your workflow."
          buttonText="BROWSE SKILLS →"
          buttonHref="/skills"
          variant="primary"
        />

        {/* Source */}
        <section className="border-t border-[var(--border)] py-14">
          <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
            Source
          </p>
          <div className="mt-4 space-y-3 text-[15px] text-gray-500">
            <p>{bundle.source}</p>
            <a
              href={bundle.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-[15px] font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent)]"
            >
              View source →
            </a>
            <p className="font-mono text-[12px] text-gray-500">
              Last verified: {bundle.date}
            </p>
          </div>
        </section>
      </main>
      </>
  );
}
