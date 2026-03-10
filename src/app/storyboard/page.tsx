import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";

export default function StoryboardPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="border-b border-black/5 pb-8">
          <h1 className="text-4xl font-semibold tracking-[-0.06em] text-zinc-950 sm:text-6xl">
            Storyboard
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            A minimal preview page for the current Skillbench visual system:
            typography, tables, quote blocks, screenshots, and metadata.
          </p>
        </div>

        <section className="grid gap-14 border-b border-black/5 py-16 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Type scale
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-zinc-950">
              Premium, spare, and technical.
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-700">
              Skillbench should read like a buyer&apos;s guide written by a
              technically opinionated team, not a component marketplace or a
              landing-page generator.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Quote style
            </p>
            <blockquote className="mt-5 border-l border-black/15 pl-5 text-base leading-8 text-zinc-700">
              <p className="text-zinc-950">
                “The revision is a massive improvement.”
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Gemini review of the multi-page screenshot pass
              </p>
            </blockquote>
          </div>
        </section>

        <section className="border-b border-black/5 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Table style
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-black/5 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  <th className="py-3 pr-4 font-medium">Rank</th>
                  <th className="py-3 pr-4 font-medium">Contender</th>
                  <th className="py-3 pr-4 font-medium">Trust note</th>
                  <th className="py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black/5 align-top">
                  <td className="py-4 pr-4 font-mono text-sm text-zinc-500">01</td>
                  <td className="py-4 pr-4 text-sm font-semibold text-zinc-950">
                    Figma MCP + Codex
                  </td>
                  <td className="py-4 pr-4 text-sm leading-7 text-zinc-700">
                    Official Figma and OpenAI backing with the strongest public
                    roundtrip story.
                  </td>
                  <td className="py-4 text-sm text-zinc-600">Leader</td>
                </tr>
                <tr className="border-b border-black/5 align-top">
                  <td className="py-4 pr-4 font-mono text-sm text-zinc-500">WIP</td>
                  <td className="py-4 pr-4 text-sm font-semibold text-zinc-950">
                    Storyboard / component preview
                  </td>
                  <td className="py-4 pr-4 text-sm leading-7 text-zinc-700">
                    Internal page for checking layout rhythm across the product.
                  </td>
                  <td className="py-4 text-sm text-zinc-600">Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Screenshot style
          </p>
          <p className="mt-4 text-base leading-8 text-zinc-700">
            No screenshots available yet. When real product screenshots are captured,
            they should show the tool actually in use — terminal output, running UI,
            real workflow output. Not repo pages, HN threads, or marketing homepages.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
