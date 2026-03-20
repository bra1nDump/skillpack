import Link from "next/link";

import { DarkPageHeader } from "@/components/dark-page-header";
import { categoryList } from "@/lib/catalog";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Categories — Skillbench",
  description:
    "Browse all agent skill categories with ranked contenders, evidence-backed verdicts, and comparison tables.",
};

export default function CategoriesIndexPage() {
  return (
    <>
      <DarkPageHeader
        title="All Categories"
        subtitle={`${categoryList.length} categories, each with ranked contenders and public evidence. A category is the narrow thing the agent needs to do.`}
        stats={[{ label: "Categories", value: String(categoryList.length) }]}
      />
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          {categoryList.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--accent)]/20 hover:bg-[var(--surface-2)]"
            >
              <p className="text-xl font-semibold tracking-tight text-gray-900">
                {category.name}
              </p>
              <p className="mt-3 text-[15px] leading-6 text-gray-500">{category.deck}</p>
              <div className="mt-5 border-t border-[var(--border)] pt-4">
                <p className="font-mono text-[13px] uppercase tracking-wider text-gray-500">
                  Ranking
                </p>
                <div className="mt-2 space-y-1">
                  {category.ranking.slice(0, 3).map((item) => (
                    <div key={item.rank} className="flex items-baseline gap-2 text-[15px]">
                      <span className="w-5 font-mono text-[13px] text-gray-500">{item.rank}</span>
                      <span className="font-medium text-gray-700">{item.contender}</span>
                      <span className="text-gray-500">—</span>
                      <span className="text-[13px] text-gray-500">{item.bestFor}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-[13px] font-medium text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
                Open full report →
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
