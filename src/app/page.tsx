import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { SiteFooter } from "@/components/site-footer";
import { mission } from "@/lib/site-data";

const pipelineRuns = [
  {
    name: "Discover",
    summary:
      "Found that the current UI/UX design meta is shifting toward direct design-tool roundtrips and editable outputs, not screenshot demos.",
    path: "agent-runs/2026-03-09_04-22_discover_ui-ux-design/findings.md",
  },
  {
    name: "Deep-dive",
    summary:
      "Separated Figma's roundtrip strength from Paper's direct write-back strength and pulled the key trust-building quotes.",
    path: "agent-runs/2026-03-09_04-25_deep-dive_ui-ux-design/findings.md",
  },
  {
    name: "Rank",
    summary:
      "Ranked Figma MCP + Codex first overall, while explicitly elevating Paper MCP for the narrower write-back subcase.",
    path: "agent-runs/2026-03-09_04-29_rank_ui-ux-design/findings.md",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="border-b border-black/5 pb-8">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Skillbench
            </p>
            <CopyButton label="Copy link" text="http://127.0.0.1:3000/" />
          </div>
          <h1 className="mt-8 max-w-5xl text-4xl font-semibold tracking-[-0.06em] text-balance text-zinc-950 sm:text-6xl">
            Find the actual meta for agent skills before it gets stale.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            {mission}
          </p>
        </div>

        <section className="grid gap-14 border-b border-black/5 py-16 lg:grid-cols-[1.5fr_0.9fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Live now
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">
              Document Editing & UI/UX Design
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-700">
              The first live report is an editorial ranking, not a registry grid.
              It is built from official Figma, OpenAI, Paper, and Claude docs,
              plus public community evidence around editable output and
              roundtrip trust.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-zinc-600">
              <span>
                <span className="font-semibold text-zinc-950">#1</span> Figma
                MCP + Codex
              </span>
              <span>
                <span className="font-semibold text-zinc-950">Write-back subcase</span>{" "}
                Paper MCP
              </span>
              <span>
                <span className="font-semibold text-zinc-950">Trust basis</span>{" "}
                official docs + public discussion
              </span>
            </div>
            <div className="mt-8">
              <Link
                href="/jobs/document-editing-ui-ux"
                className="text-sm font-semibold text-zinc-950 underline decoration-black/20 underline-offset-4 hover:decoration-black/50"
              >
                Open the full report →
              </Link>
            </div>
          </div>

          <div className="pt-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              What we optimize for
            </p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-zinc-700">
              <p>Demonstrable outputs over generic capability claims.</p>
              <p>Public trust over registry volume.</p>
              <p>Pairwise comparisons over isolated praise.</p>
              <p>Workflow shape over fake universal scores.</p>
            </div>
          </div>
        </section>

        <section className="border-b border-black/5 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Pipeline outputs
          </p>
          <div className="mt-6 grid gap-8 lg:grid-cols-3">
            {pipelineRuns.map((run) => (
              <article key={run.name} className="border-t border-black/5 pt-4">
                <p className="text-sm font-semibold text-zinc-950">{run.name}</p>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  {run.summary}
                </p>
                <p className="mt-4 font-mono text-[11px] text-zinc-500">
                  {run.path}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-14 py-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Next categories
            </p>
            <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700">
              <p>Web browsing</p>
              <p>Coding CLIs</p>
              <p>Task tracking</p>
              <p>Google Docs and Notion reading</p>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Process docs
            </p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-700">
              <p>
                Agent prompts live in <code>agents.md</code>.
              </p>
              <p>
                Run structure lives in <code>agent-runs/agents.md</code>.
              </p>
              <p>
                The site should increasingly feel like a buyer&apos;s guide with
                receipts, not a theme-heavy directory.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
