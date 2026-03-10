import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { getSkill, jobList, platformList } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "All Platforms — Skillbench",
  description:
    "Browse platforms that agent skills build on top of — Figma, Google Workspace, browsers, terminals, and more.",
};

export default function PlatformsIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="border-b border-black/5 pb-8">
          <h1 className="text-4xl font-semibold tracking-[-0.06em] text-zinc-950 sm:text-5xl">
            All Platforms
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            {platformList.length} platforms tracked. A platform is the underlying product or
            environment that skills build on top of. Some platforms solve the job natively
            without a separate skill.
          </p>
        </div>

        <section className="py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            {platformList.map((platform) => {
              const relatedJobs = jobList.filter((j) =>
                platform.relatedJobs.includes(j.slug)
              );
              const relatedSkills = platform.relatedSkills
                .map((s) => getSkill(s))
                .filter(Boolean);

              return (
                <Link
                  key={platform.slug}
                  href={`/platforms/${platform.slug}`}
                  className="group border border-black/10 px-6 py-6 transition-colors hover:border-black/25"
                >
                  <p className="text-xl font-semibold tracking-[-0.04em] text-zinc-950">
                    {platform.name}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-700">
                    {platform.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {relatedJobs.map((j) => (
                      <span
                        key={j.slug}
                        className="rounded-sm bg-zinc-100 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500"
                      >
                        {j.name}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-zinc-400">
                    {relatedSkills.length} skill{relatedSkills.length !== 1 ? "s" : ""}
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
