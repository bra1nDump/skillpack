import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { SiteFooter } from "@/components/site-footer";
import { documentEditingUiUx } from "@/lib/site-data";

export default function DocumentEditingUiUxPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-8 sm:px-8 lg:px-10">
        <section className="rounded-[2rem] border border-black/10 bg-white px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/"
                className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500 hover:text-black"
              >
                Skillbench / Jobs
              </Link>
              <CopyButton
                label="Copy ranking prompt"
                text={documentEditingUiUx.pageCopy}
              />
            </div>

            <div className="max-w-4xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                {documentEditingUiUx.kicker}
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-balance text-zinc-950 sm:text-6xl">
                {documentEditingUiUx.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 sm:text-lg">
                {documentEditingUiUx.shortVerdict}
              </p>
            </div>

            <div className="grid gap-4 border-t border-black/5 pt-6 md:grid-cols-4">
              <MetricCard
                label="Platform winner"
                value={documentEditingUiUx.topLine.platformWinner}
              />
              <MetricCard
                label="Skill winner"
                value={documentEditingUiUx.topLine.skillWinner}
              />
              <MetricCard
                label="Write-back winner"
                value={documentEditingUiUx.topLine.writeBackWinner}
              />
              <MetricCard
                label="Confidence"
                value={documentEditingUiUx.topLine.confidence}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {documentEditingUiUx.prompts.map((prompt) => (
            <article
              key={prompt.title}
              className="rounded-[1.5rem] border border-black/10 bg-white p-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                {prompt.title}
              </p>
              <p className="mt-4 text-sm leading-6 text-zinc-600">
                {prompt.description}
              </p>
              <pre className="mt-5 overflow-x-auto rounded-2xl bg-zinc-950 px-4 py-4 text-sm leading-6 text-zinc-100">
                <code>{prompt.text}</code>
              </pre>
              <CopyButton
                label="Copy prompt"
                text={prompt.text}
                className="mt-4"
              />
            </article>
          ))}
        </section>

        <section className="rounded-[1.5rem] border border-black/10 bg-white p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                Ranking
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-zinc-950">
                Ranked contenders
              </h2>
            </div>
            <p className="text-sm text-zinc-500">
              Updated {documentEditingUiUx.updatedAt}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {documentEditingUiUx.contenders.map((contender) => (
              <article
                key={contender.name}
                className="rounded-[1.5rem] border border-black/10 bg-zinc-50 p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-black/10 bg-white px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600">
                        #{contender.rank}
                      </span>
                      <span className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                        {contender.label}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-zinc-950">
                      {contender.name}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-700">
                      {contender.verdict}
                    </p>
                  </div>
                  <CopyButton label="Copy verdict" text={contender.copyText} />
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                  <DetailCard label="Best for" value={contender.bestFor} />
                  <DetailCard
                    label="Design context"
                    value={contender.designContext}
                  />
                  <DetailCard label="Write-back" value={contender.writeBack} />
                  <DetailCard label="Setup" value={contender.setup} />
                  <DetailCard label="Signal" value={contender.signal} />
                </div>

                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                  <span className="font-semibold">Watch for:</span>{" "}
                  {contender.caveat}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.5rem] border border-black/10 bg-white p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
              Comparison matrix
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
                <thead className="text-zinc-500">
                  <tr>
                    <th className="px-3 py-2 font-medium">Contender</th>
                    <th className="px-3 py-2 font-medium">Official</th>
                    <th className="px-3 py-2 font-medium">Auth</th>
                    <th className="px-3 py-2 font-medium">Context model</th>
                    <th className="px-3 py-2 font-medium">Strongest move</th>
                  </tr>
                </thead>
                <tbody>
                  {documentEditingUiUx.matrix.map((row) => (
                    <tr key={row.contender} className="rounded-2xl bg-zinc-50">
                      <td className="rounded-l-2xl px-3 py-3 font-semibold text-zinc-950">
                        {row.contender}
                      </td>
                      <td className="px-3 py-3 text-zinc-600">{row.official}</td>
                      <td className="px-3 py-3 text-zinc-600">{row.auth}</td>
                      <td className="px-3 py-3 text-zinc-600">
                        {row.contextModel}
                      </td>
                      <td className="rounded-r-2xl px-3 py-3 text-zinc-600">
                        {row.strongestMove}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-[1.5rem] border border-black/10 bg-white p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
              Decision rule
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-zinc-950">
              Pick the tool by workflow shape.
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-6 text-zinc-700">
              <p>
                <span className="font-semibold text-zinc-950">
                  Need design fidelity and roundtrip parity?
                </span>{" "}
                Start with Figma MCP, ideally on Codex today.
              </p>
              <p>
                <span className="font-semibold text-zinc-950">
                  Need to write directly into the design document?
                </span>{" "}
                Paper MCP jumps above the raw agents and may beat Figma for that
                narrower job.
              </p>
              <p>
                <span className="font-semibold text-zinc-950">
                  Need speed with no connector setup?
                </span>{" "}
                Raw Claude Code is the better fallback than raw Codex for this
                category because the public evidence for frontend and
                design-adjacent work is stronger.
              </p>
            </div>
          </article>
        </section>

        <section className="rounded-[1.5rem] border border-black/10 bg-white p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
            Evidence log
          </p>
          <div className="mt-5 space-y-4">
            {documentEditingUiUx.sources.map((source) => (
              <article
                key={source.title}
                className="rounded-[1.25rem] border border-black/10 bg-zinc-50 p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                        {source.type}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                        {source.date}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-zinc-950">
                      {source.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      {source.note}
                    </p>
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-zinc-950 hover:text-zinc-700"
                  >
                    Open source
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-black/10 bg-zinc-50 p-4">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-zinc-950">
        {value}
      </p>
    </div>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-black/10 bg-white px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-zinc-700">{value}</p>
    </div>
  );
}
