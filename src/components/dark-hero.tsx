export function DarkHero() {
  return (
    <div className="bg-[var(--dark-bg)] px-8 py-7 text-white">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-10 lg:flex-row lg:items-start">
        {/* Left: value prop */}
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex gap-2">
            <span className="rounded bg-[var(--accent)] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
              The Product
            </span>
            <span className="rounded border border-[var(--dark-border)] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-gray-400">
              One Install
            </span>
          </div>
          <h1 className="text-[28px] font-black leading-[1.15] tracking-[-0.5px]">
            SkillPack is a skill.
            <br />
            <span className="text-gray-400">
              It reads your project. Picks the best skills. Installs them.
            </span>
          </h1>
          <p className="mt-2 max-w-[420px] text-[12.5px] leading-[1.55] text-[var(--dark-muted)]">
            One skill that analyzes your codebase — framework, dependencies,
            structure — then selects the highest-rated skills from the catalog,
            resolves conflicts, and installs everything.
          </p>
        </div>

        {/* Right: CLI demo */}
        <div className="min-w-[380px] flex-shrink-0 rounded border border-[var(--dark-border)] bg-[var(--dark-surface)] p-4 font-mono text-[12px] leading-[1.85] text-gray-400">
          <span className="text-gray-400"># One command. That&apos;s it.</span>
          <br />
          <span className="text-[var(--accent)]">$</span> claude plugin install{" "}
          <span className="font-semibold text-white">skillpack</span>
          <br />
          <br />
          <span className="text-gray-400">▸ Analyzing project...</span>
          <br />
          <span className="text-gray-400">
            ▸ Detected Next.js 15 + Prisma + Vitest
          </span>
          <br />
          <span className="text-gray-400">
            ▸ Selecting 7 skills, avg ★4.7
          </span>
          <br />
          <span className="text-gray-400">▸ No conflicts found</span>
          <br />
          <span className="text-emerald-500">
            ✓ Installed: Full-Stack Next.js (7 skills)
          </span>
        </div>
      </div>
    </div>
  );
}
