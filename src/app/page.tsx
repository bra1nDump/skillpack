import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { SiteFooter } from "@/components/site-footer";
import {
  coreJobs,
  documentEditingUiUx,
  mission,
  rankingSignals,
} from "@/lib/site-data";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-8 sm:px-8 lg:px-10">
        <section className="rounded-[2rem] border border-black/10 bg-white px-6 py-8 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:px-8 sm:py-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-3xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                  Skillbench
                </p>
                <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-balance text-zinc-950 sm:text-6xl">
                  Find the best skill or platform for the job.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
                  {mission}
                </p>
              </div>
              <CopyButton
                label="Copy mission"
                text={`${mission}\n\nCurrent live category: ${documentEditingUiUx.title}.`}
                className="self-start"
              />
            </div>

            <div className="grid gap-4 border-t border-black/5 pt-6 md:grid-cols-[1.7fr_1fr]">
              <Link
                href="/jobs/document-editing-ui-ux"
                className="rounded-[1.5rem] border border-black/10 bg-zinc-50 p-5 transition hover:border-black/20 hover:bg-white"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                    Live ranking
                  </p>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    Updated {documentEditingUiUx.updatedAt}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-zinc-950">
                  {documentEditingUiUx.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
                  {documentEditingUiUx.shortVerdict}
                </p>
              </Link>

              <div className="rounded-[1.5rem] border border-black/10 bg-zinc-950 p-5 text-zinc-50">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">
                  Best right now
                </p>
                <p className="mt-4 text-sm leading-6 text-zinc-300">
                  <span className="font-semibold text-white">
                    {documentEditingUiUx.topLine.skillWinner}
                  </span>{" "}
                  wins the first category because the evidence is strongest for
                  design fidelity, official backing, and real roundtrip support.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-zinc-400">Platform</p>
                    <p className="mt-1 font-semibold">
                      {documentEditingUiUx.topLine.platformWinner}
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-400">Write-back</p>
                    <p className="mt-1 font-semibold">
                      {documentEditingUiUx.topLine.writeBackWinner}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {coreJobs.map((job) => (
            <article
              key={job.name}
              className="rounded-[1.5rem] border border-black/10 bg-white p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                  Core job
                </p>
                <span className="rounded-full border border-black/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                  {job.status}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-zinc-950">
                {job.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {job.summary}
              </p>
              <div className="mt-5">
                {job.href === "#" ? (
                  <span className="text-sm font-semibold text-zinc-400">
                    Research queued
                  </span>
                ) : (
                  <Link
                    href={job.href}
                    className="text-sm font-semibold text-zinc-950 hover:text-zinc-700"
                  >
                    Open ranking
                  </Link>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
          <article className="rounded-[1.5rem] border border-black/10 bg-white p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
              Ranking rules
            </p>
            <div className="mt-5 space-y-4">
              {rankingSignals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-2xl border border-black/5 bg-zinc-50 px-4 py-3 text-sm leading-6 text-zinc-700"
                >
                  {signal}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.5rem] border border-black/10 bg-white p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
              Copy into an agent
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-zinc-950">
              Start with the job, not the skill.
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              The site should answer narrow prompts like “what is the best
              document editing skill right now?” instead of making people browse
              giant registries.
            </p>
            <CopyButton
              label="Copy starter prompt"
              text="Find the best skill or platform for this narrow agent job. Rank the top contenders, explain why the top option wins, show the best alternatives, and cite official or credible public sources."
              className="mt-5"
            />
          </article>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
