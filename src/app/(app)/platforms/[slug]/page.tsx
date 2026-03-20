import Link from "next/link";
import { notFound } from "next/navigation";

import { DarkCTA } from "@/components/dark-cta";
import { DarkPageHeader } from "@/components/dark-page-header";
import { categoryList, getPlatform, getSkill, platformList } from "@/lib/catalog";

import type { Metadata } from "next";

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

  const relatedCategories = categoryList.filter((j) => platform.relatedCategories.includes(j.slug));
  const relatedSkills = platform.relatedSkills
    .map((s) => getSkill(s))
    .filter(Boolean);

  return (
      <>
      <DarkPageHeader
        backLink={{ href: "/platforms", label: "All platforms" }}
        title={platform.name}
        subtitle={platform.summary}
        stats={[
          { label: "Skills", value: String(relatedSkills.length) },
          { label: "Categories", value: String(relatedCategories.length) },
        ]}
      />
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        <section className="border-t border-[var(--border)] py-14">
          <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
            Native agent support
          </p>
          <p className="mt-5 max-w-3xl text-[15px] leading-7 text-gray-700">
            {platform.nativeSupport}
          </p>
        </section>

        <section className="border-t border-[var(--border)] py-14">
          <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
            Skills on this platform
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedSkills.map((skill) => {
              if (!skill) return null;
              return (
                <Link
                  key={skill.slug}
                  href={`/skills/${skill.slug}`}
                  className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--accent)]/20 hover:bg-[var(--surface-2)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[15px] font-semibold text-gray-900 transition-colors group-hover:text-[var(--accent)]">{skill.name}</p>
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[13px] uppercase tracking-wider ${
                        skill.status === "active"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {skill.status}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-gray-500">
                    {skill.verdict}
                  </p>
                  <p className="mt-2 font-mono text-[12px] text-gray-500">
                    {skill.official ? "Official" : "Community"} · {skill.repo}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <DarkCTA
          title="See how these skills rank."
          subtitle="Category-level rankings with evidence and head-to-head comparisons."
          buttonText="VIEW CATEGORIES →"
          buttonHref="/categories"
          variant="primary"
        />

        <section className="border-t border-[var(--border)] py-14">
          <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
            Related categories
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {relatedCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--accent)]/20 hover:bg-[var(--surface-2)]"
              >
                <p className="text-base font-semibold text-gray-900">{category.name}</p>
                <p className="mt-2 line-clamp-2 text-[15px] leading-6 text-gray-500">
                  {category.deck}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      </>
  );
}
