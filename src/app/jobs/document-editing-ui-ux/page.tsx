import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { SiteFooter } from "@/components/site-footer";

const ranking = [
  {
    rank: "01",
    contender: "Figma MCP + Codex",
    bestFor: "Design-to-code and code-to-design roundtrips",
    why: "Strongest official trust signal and the clearest public roundtrip story right now.",
    watch: "Still dependent on Figma auth and MCP setup discipline.",
  },
  {
    rank: "02",
    contender: "Figma MCP + Claude Code",
    bestFor: "Teams already standardized on Claude Code",
    why: "Very strong official path with good design context, just not as strong publicly as the Codex partnership story.",
    watch: "Community reports still mention some auth and fidelity friction.",
  },
  {
    rank: "03",
    contender: "Paper MCP",
    bestFor: "Direct write-back into the design document itself",
    why: "The clearest contender for live canvas mutation and in-document editing.",
    watch: "Smaller ecosystem and weaker broad public trust than Figma.",
  },
  {
    rank: "04",
    contender: "Raw Claude Code",
    bestFor: "Fast no-connector fallback for critique, copy, and frontend drafts",
    why: "Best fallback when you need a strong general agent and do not yet have design MCP connected.",
    watch: "Loses structured design context immediately.",
  },
  {
    rank: "05",
    contender: "Raw Codex",
    bestFor: "Implementation-heavy tasks after the design is already understood",
    why: "Strong coding agent, but much less differentiated in this category without Figma or Paper attached.",
    watch: "Not competitive with the connected workflows for design-aware work.",
  },
];

const quotes = [
  {
    quote: "turn code prompts directly into polished designs with Codex",
    speaker: "OpenAI x Figma partnership",
    url: "https://openai.com/index/figma-partnership/",
  },
  {
    quote: "Desktop server is selection-based",
    speaker: "Figma MCP docs",
    url: "https://help.figma.com/hc/en-us/articles/35281385065751-Figma-MCP-collection-Compare-Figma-s-remote-and-desktop-MCP-servers",
  },
  {
    quote: "read and write information from the currently open Paper file",
    speaker: "Paper MCP docs",
    url: "https://paper.design/docs/mcp",
  },
  {
    quote: "lets Claude use external tools and services",
    speaker: "Claude Code MCP docs",
    url: "https://code.claude.com/docs/en/mcp",
  },
];

const runOutputs = [
  {
    name: "Discover run",
    path: "agent-runs/2026-03-09_04-22_discover_ui-ux-design/findings.md",
    summary:
      "The key discovery was that editability and roundtrip trust now matter more than isolated model demos in this category.",
  },
  {
    name: "Deep-dive run",
    path: "agent-runs/2026-03-09_04-25_deep-dive_ui-ux-design/findings.md",
    summary:
      "The deep-dive separated Figma's ecosystem trust from Paper's write-back wedge and made the workflow-shape split explicit.",
  },
  {
    name: "Rank run",
    path: "agent-runs/2026-03-09_04-29_rank_ui-ux-design/findings.md",
    summary:
      "The final rank kept Figma on top overall while explicitly elevating Paper for the narrower direct-editing subcase.",
  },
];

export default function DocumentEditingUiUxPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="border-b border-black/5 pb-8">
          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              <Link href="/" className="hover:text-black">
                Skillbench
              </Link>
              <span className="px-2 text-zinc-400">/</span>
              <span>Report</span>
            </div>
            <CopyButton
              label="Copy link"
              text="http://127.0.0.1:3000/jobs/document-editing-ui-ux"
            />
          </div>
          <h1 className="mt-8 text-4xl font-semibold tracking-[-0.06em] text-balance text-zinc-950 sm:text-6xl">
            Document Editing & UI/UX Design
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            The current meta is not “which model can make the prettiest mockup.”
            It is “which workflow produces something editable, trusted, and
            worth keeping inside the real design tool.”
          </p>
        </div>

        <section className="border-b border-black/5 py-16">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-700">
            Verdict
          </p>
          <div className="mt-5 space-y-5 text-base leading-8 text-zinc-700">
            <p>
              For the broad job of UI/UX design plus document-aware generation,{" "}
              <span className="font-semibold text-zinc-950">
                Figma MCP + Codex
              </span>{" "}
              is the best current default. The combination has the strongest
              official public trust signal and the clearest story around
              roundtripping between code and editable design.
            </p>
            <p>
              <span className="font-semibold text-zinc-950">Paper MCP</span> is
              the real exception. If the narrow job is direct write-back into
              the design document or canvas itself, Paper jumps above the raw
              agents and can even beat Figma for that subcase.
            </p>
            <p>
              <span className="font-semibold text-zinc-950">Raw Claude Code</span>{" "}
              and <span className="font-semibold text-zinc-950">raw Codex</span>{" "}
              remain useful only as fallbacks. Once design context stops being
              structured, public trust and repeatability both fall off.
            </p>
          </div>
        </section>

        <section className="border-b border-black/5 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Current ranking
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-black/5 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  <th className="py-3 pr-4 font-medium">Rank</th>
                  <th className="py-3 pr-4 font-medium">Contender</th>
                  <th className="py-3 pr-4 font-medium">Best for</th>
                  <th className="py-3 pr-4 font-medium">Why it ranks here</th>
                  <th className="py-3 font-medium">Watch for</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((item) => (
                  <tr key={item.rank} className="border-b border-black/5 align-top">
                    <td className="py-4 pr-4 font-mono text-sm text-zinc-500">
                      {item.rank}
                    </td>
                    <td className="py-4 pr-4 text-sm font-semibold text-zinc-950">
                      {item.contender}
                    </td>
                    <td className="py-4 pr-4 text-sm leading-7 text-zinc-700">
                      {item.bestFor}
                    </td>
                    <td className="py-4 pr-4 text-sm leading-7 text-zinc-700">
                      {item.why}
                    </td>
                    <td className="py-4 text-sm leading-7 text-zinc-600">
                      {item.watch}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="border-b border-black/5 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Public trust and quotes
          </p>
          <div className="mt-6 space-y-6">
            {quotes.map((item) => (
              <blockquote
                key={item.quote}
                className="border-l border-black/15 pl-5 text-base leading-8 text-zinc-700"
              >
                <p className="text-zinc-950">&ldquo;{item.quote}&rdquo;</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm text-zinc-500 underline decoration-black/20 underline-offset-4 hover:text-black"
                >
                  {item.speaker}
                </a>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="border-b border-black/5 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Real agent outputs
          </p>
          <div className="mt-6 space-y-6">
            {runOutputs.map((run) => (
              <article key={run.name} className="border-t border-black/5 pt-4">
                <p className="text-sm font-semibold text-zinc-950">{run.name}</p>
                <p className="mt-3 text-sm leading-7 text-zinc-700">
                  {run.summary}
                </p>
                <p className="mt-3 font-mono text-[11px] text-zinc-500">
                  {run.path}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            What changes this
          </p>
          <div className="mt-5 space-y-4 text-base leading-8 text-zinc-700">
            <p>
              Paper can move up if its public trust and ecosystem widen without
              losing the direct write-back edge.
            </p>
            <p>
              Claude Code can challenge the top spot if it develops a clearer
              public design roundtrip story than the one OpenAI and Figma are
              currently telling together.
            </p>
            <p>
              Raw agents only move up if public demonstrability starts to matter
              less than today, which does not look like the current meta.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
