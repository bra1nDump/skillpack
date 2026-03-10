import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { bundleList, getSkill } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "All Bundles — Skillbench",
  description:
    "Full setups and stacks from known builders and personas — see what the best people actually ship with.",
};

export default function BundlesIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="border-b border-black/5 pb-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            <Link href="/" className="hover:text-black">
              Skillbench
            </Link>
            <span className="px-2 text-zinc-400">/</span>
            <span>Bundles</span>
          </div>
          <h1 className="mt-8 text-4xl font-semibold tracking-[-0.06em] text-zinc-950 sm:text-5xl">
            Bundles
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            Full setups from known builders. What do the people actually shipping
            with agents use day to day? {bundleList.length} stacks tracked.
          </p>
        </div>

        <section className="py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            {bundleList.map((bundle) => {
              const skills = bundle.skills
                .map((s) => getSkill(s))
                .filter(Boolean);

              return (
                <Link
                  key={bundle.slug}
                  href={`/bundles/${bundle.slug}`}
                  className="group border border-black/10 px-6 py-6 transition-colors hover:border-black/25"
                >
                  <div className="flex items-center gap-3">
                    <p className="text-xl font-semibold tracking-[-0.04em] text-zinc-950">
                      {bundle.name}
                    </p>
                  </div>
                  <p className="mt-1 font-mono text-[10px] text-zinc-400">
                    {bundle.persona}{" "}
                    <span className="text-zinc-300">{bundle.personaHandle}</span>
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-700">
                    {bundle.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skills.map((skill) =>
                      skill ? (
                        <span
                          key={skill.slug}
                          className="rounded-sm bg-zinc-900 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-100"
                        >
                          {skill.name}
                        </span>
                      ) : null
                    )}
                  </div>
                  <p className="mt-3 font-mono text-[10px] text-zinc-400">
                    {bundle.date} · {bundle.source}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
