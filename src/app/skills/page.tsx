import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { jobList, skillList } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "All Skills — Skillbench",
  description:
    "Browse all tracked agent skills with editorial verdicts, source links, and related categories.",
};

export default function SkillsIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="border-b border-black/5 pb-8">
          <h1 className="text-4xl font-semibold tracking-[-0.06em] text-zinc-950 sm:text-5xl">
            All Skills
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            {skillList.length} skills tracked across {jobList.length} categories.
            Each skill has an editorial verdict, source links, and evidence-backed strengths and weaknesses.
          </p>
        </div>

        <section className="py-16">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-black/5 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  <th className="py-3 pr-4 font-medium">Skill</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium">Official</th>
                  <th className="py-3 pr-4 font-medium">Categories</th>
                  <th className="py-3 font-medium">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {skillList.map((skill) => {
                  const relatedJobs = jobList.filter((j) =>
                    skill.relatedJobs.includes(j.slug)
                  );
                  return (
                    <tr key={skill.slug} className="border-b border-black/5 align-top">
                      <td className="py-4 pr-4">
                        <Link
                          href={`/skills/${skill.slug}`}
                          className="text-sm font-semibold text-zinc-950 underline decoration-black/20 underline-offset-4 hover:decoration-black/50"
                        >
                          {skill.name}
                        </Link>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="font-mono text-[10px] text-zinc-400">
                            {skill.repo}
                          </span>
                          {skill.githubStars ? (
                            <span className="font-mono text-[10px] text-zinc-400">
                              {skill.githubStars}
                            </span>
                          ) : null}
                        </div>
                        {skill.evidence.length > 0 ? (
                          <span className="mt-1 inline-block font-mono text-[9px] text-emerald-600">
                            {skill.evidence.length} evidence item{skill.evidence.length !== 1 ? "s" : ""}
                          </span>
                        ) : null}
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={`inline-block rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
                            skill.status === "active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {skill.status}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-sm text-zinc-600">
                        {skill.official ? "Yes" : "No"}
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex flex-wrap gap-1">
                          {relatedJobs.map((j) => (
                            <Link
                              key={j.slug}
                              href={`/categories/${j.slug}`}
                              className="text-xs text-zinc-500 underline decoration-black/10 underline-offset-2 hover:text-black"
                            >
                              {j.name}
                            </Link>
                          ))}
                        </div>
                      </td>
                      <td className="max-w-xs py-4 text-sm leading-6 text-zinc-600">
                        {skill.verdict}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
