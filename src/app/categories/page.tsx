import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { categoryList } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "All Categories — Skillbench",
  description:
    "Browse all agent skill categories with ranked contenders, evidence-backed verdicts, and comparison tables.",
};

export default function JobsIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="border-b border-black/5 pb-8">
          <h1 className="text-4xl font-semibold tracking-[-0.06em] text-zinc-950 sm:text-5xl">
            All Categories
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            {categoryList.length} categories, each with ranked contenders and public evidence.
            A category is the narrow thing the agent needs to do.
          </p>
        </div>

        <section className="py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            {categoryList.map((category) => (
              <article
                key={category.slug}
                className="border border-black/10 px-6 py-6 transition-colors hover:border-black/25"
              >
                <p className="text-2xl font-semibold tracking-[-0.04em] text-zinc-950">
                  {category.name}
                </p>
                <p className="mt-4 text-sm leading-7 text-zinc-700">{category.deck}</p>
                <div className="mt-6 border-t border-black/5 pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                    Ranking
                  </p>
                  <div className="mt-3 space-y-1">
                    {category.ranking.slice(0, 3).map((item) => (
                      <p key={item.rank} className="text-sm text-zinc-700">
                        <span className="font-mono text-zinc-400">{item.rank}</span>{" "}
                        <span className="font-semibold text-zinc-950">{item.contender}</span>
                        <span className="text-zinc-400"> — </span>
                        {item.bestFor}
                      </p>
                    ))}
                  </div>
                </div>
                <Link
                  href={`/categories/${category.slug}`}
                  className="mt-6 inline-block text-sm font-semibold text-zinc-950 underline decoration-black/20 underline-offset-4 hover:decoration-black/50"
                >
                  Open full report →
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
