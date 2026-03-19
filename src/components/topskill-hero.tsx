import Link from "next/link";

export function TopSkillHero() {
  return (
    <div className="mx-4 my-1 overflow-hidden rounded-lg border border-[var(--accent)]/20 bg-[var(--dark-bg)]">
      <div className="flex flex-col lg:flex-row">
        {/* Main content */}
        <div className="flex-1 p-7">
          <div className="mb-4 inline-flex items-center gap-2 rounded border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-[var(--accent)]">
              Meta Skill
            </span>
          </div>

          <h2 className="text-[22px] font-black tracking-tight text-white">
            topskill
            <span className="ml-2.5 font-mono text-[13px] font-normal text-[var(--dark-subtle)]">
              by SkillBench
            </span>
          </h2>
          <p className="mt-2 max-w-[440px] text-[13px] leading-[1.65] text-[var(--dark-muted)]">
            A meta-skill that scans your project, maps your needs to evidence-backed
            categories, and recommends the best agent skills from our live rankings.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded border border-[var(--dark-border)] bg-[var(--dark-surface)] px-4 py-2.5 font-mono text-[13px]">
              <span className="text-emerald-500">$</span>
              <span className="select-all text-white">npx skills add skillbench/topskill</span>
            </div>
            <Link
              href="/skills/topskill"
              className="inline-flex items-center gap-1.5 rounded bg-[var(--accent)] px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[var(--accent)]/90"
            >
              View skill →
            </Link>
          </div>
        </div>

        {/* Right: How it works */}
        <div className="border-t border-[var(--dark-border)] p-7 lg:w-64 lg:border-l lg:border-t-0">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[1.5px] text-[var(--dark-subtle)]">
            What it does
          </p>
          <div className="space-y-3">
            {[
              "Reads your project structure",
              "Maps needs to ranked categories",
              "Fetches live SkillBench scores",
              "Installs the best-matched skills",
            ].map((step, i) => (
              <div key={step} className="flex items-start gap-3">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-[var(--dark-surface)] font-mono text-[10px] text-[var(--dark-subtle)]">
                  {i + 1}
                </span>
                <p className="text-[12px] leading-5 text-[var(--dark-muted)]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
