export default function StoryboardPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        <div className="pb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Storyboard
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-6 text-gray-500">
            A preview page for the current Skillbench visual system:
            typography, tables, quote blocks, screenshots, and metadata.
          </p>
        </div>

        <section className="grid gap-14 border-t border-[var(--border)] py-14 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              Type scale
            </p>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
              Premium, spare, and technical.
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-gray-500">
              Skillbench should read like a buyer&apos;s guide written by a
              technically opinionated team, not a component marketplace or a
              landing-page generator.
            </p>
          </div>
          <div>
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
              Quote style
            </p>
            <blockquote className="mt-5 border-l-2 border-[var(--accent)]/30 pl-5 text-[15px] leading-7">
              <p className="text-gray-800">
                &ldquo;The revision is a massive improvement.&rdquo;
              </p>
              <p className="mt-2 text-[13px] text-gray-500">
                Gemini review of the multi-page screenshot pass
              </p>
            </blockquote>
          </div>
        </section>

        <section className="border-t border-[var(--border)] py-14">
          <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
            Table style
          </p>
          <div className="mt-6 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--border)] text-[12px] uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-3 font-medium">Rank</th>
                  <th className="px-5 py-3 font-medium">Contender</th>
                  <th className="px-5 py-3 font-medium">Trust note</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--border)] align-top">
                  <td className="px-5 py-4 font-mono text-[15px] text-gray-500">01</td>
                  <td className="px-5 py-4 text-[15px] font-semibold text-gray-900">
                    Figma MCP + Codex
                  </td>
                  <td className="px-5 py-4 text-[15px] leading-6 text-gray-500">
                    Official Figma and OpenAI backing with the strongest public roundtrip story.
                  </td>
                  <td className="px-5 py-4 text-[15px] text-gray-500">Leader</td>
                </tr>
                <tr className="align-top">
                  <td className="px-5 py-4 font-mono text-[15px] text-gray-500">WIP</td>
                  <td className="px-5 py-4 text-[15px] font-semibold text-gray-900">
                    Storyboard / component preview
                  </td>
                  <td className="px-5 py-4 text-[15px] leading-6 text-gray-500">
                    Internal page for checking layout rhythm across the product.
                  </td>
                  <td className="px-5 py-4 text-[15px] text-gray-500">Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="border-t border-[var(--border)] py-14">
          <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--accent)]">
            Screenshot style
          </p>
          <p className="mt-4 text-[15px] leading-7 text-gray-500">
            No screenshots available yet. When real product screenshots are captured,
            they should show the tool actually in use — terminal output, running UI,
            real workflow output. Not repo pages, HN threads, or marketing homepages.
          </p>
        </section>
    </main>
  );
}
