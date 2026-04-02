import Link from "next/link";

import { CtaBanner } from "./cta-banner";

export function DarkHero() {
  return (
    <div className="bg-[var(--dark-bg)] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-8 xl:flex-row xl:items-start xl:gap-10">
        {/* Left: value prop */}
        <div className="min-w-0 flex-1">
          <h1 className="text-[22px] font-black leading-[1.15] tracking-[-0.5px] sm:text-[28px]">
            SkillPack reads your project.
            <br />
            <span className="text-gray-400">
              Picks the best solutions. Installs them.
            </span>
          </h1>
          <p className="mt-2 max-w-[420px] text-[12.5px] leading-[1.55] text-[var(--dark-muted)]">
            One command that analyzes your codebase — framework, dependencies,
            structure — then selects the highest-rated solutions from the leaderboard,
            resolves conflicts, and installs everything.
          </p>
          <Link
            href="/skillpack"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wide text-[var(--accent)] transition-colors hover:text-white"
          >
            LEARN MORE →
          </Link>
        </div>

        {/* Right: CLI demo — real output */}
        <div className="w-full overflow-x-auto rounded border border-[var(--dark-border)] bg-[var(--dark-surface)] p-4 font-mono text-[11px] leading-[1.7] text-gray-400 sm:text-[12px] xl:w-[380px] xl:shrink-0">
          <span className="text-[var(--accent)]">$</span>{" "}
          <span className="font-semibold text-white">/skillpack</span>
          <br />
          <br />
          <span className="text-white">● Analyzing your project...</span>
          <br />
          <span className="text-gray-500">  Next.js 16 + Tailwind v4 + TypeScript</span>
          <br />
          <br />
          <span className="text-white">● Recommended for your stack:</span>
          <br />
          <br />
          <span className="text-gray-500">  Coding</span>
          <br />
          <span className="text-white">  tailwind-design-system</span>
          <span className="ml-2 text-gray-600">24.8K installs · Trust 82</span>
          <br />
          <span className="text-white">  webapp-testing</span>
          <span className="ml-2 text-gray-600">34.3K installs · Trust 76</span>
          <br />
          <br />
          <span className="text-gray-500">  SEO</span>
          <br />
          <span className="text-white">  seo-audit</span>
          <span className="ml-2 text-gray-600">56.9K installs · Trust 71</span>
          <br />
          <br />
          <span className="text-emerald-500">
            3 skills matched — ranked by evidence
          </span>
        </div>
      </div>

      {/* CTA: Install + Star + Subscribe — part of hero */}
      <div className="mx-auto mt-12 max-w-[1100px]">
        <CtaBanner variant={5} />
      </div>
    </div>
  );
}
