import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SkillPack — The Skill That Installs Skills",
  description:
    "One command to analyze your project, pick the highest-rated skills from the catalog, resolve conflicts, and install everything.",
};

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[var(--border)] py-14">
      <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--accent)]">
        {label}
      </p>
      <h2 className="mt-2 text-[22px] font-bold tracking-tight text-gray-900">
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[15px] leading-7 text-gray-500">{children}</p>;
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-[var(--dark-border)] bg-[var(--dark-bg)] p-5 font-mono text-[13px] leading-7 text-gray-300">
      {children}
    </div>
  );
}

function Step({
  num,
  title,
  children,
  last,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 font-mono text-[12px] font-bold text-white">
          {num}
        </div>
        {!last && <div className="w-px flex-1 bg-gray-200" />}
      </div>
      <div className="pb-8">
        <span className="text-[14px] font-bold text-gray-800">{title}</span>
        {children}
      </div>
    </div>
  );
}

export default function SkillPackPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-8">
      {/* Hero */}
      <div className="pb-10">
        <div className="mb-4 flex gap-2">
          <span className="rounded bg-[var(--accent)] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
            The Product
          </span>
          <span className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-gray-400">
            Open Source
          </span>
          <span className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-gray-400">
            One Install
          </span>
        </div>
        <h1 className="text-[36px] font-black leading-[1.1] tracking-[-1px] text-gray-900">
          SkillPack
        </h1>
        <p className="mt-1 text-[20px] font-medium text-gray-400">
          The skill that installs skills.
        </p>
        <p className="mt-4 max-w-2xl text-[16px] leading-7 text-gray-500">
          One command analyzes your codebase — framework, dependencies,
          structure — then selects the highest-rated skills from the{" "}
          <Link href="/" className="text-[var(--accent)] hover:underline">
            SkillPack catalog
          </Link>
          , resolves conflicts, and installs everything. No manual browsing, no
          guesswork.
        </p>

        {/* Quick install */}
        <div className="mt-6 inline-flex items-center gap-3 rounded-lg border border-[var(--dark-border)] bg-[var(--dark-bg)] px-5 py-3">
          <span className="font-mono text-[14px] text-gray-400">$</span>
          <code className="font-mono text-[14px] font-semibold text-white">
            npx skills add skillpack
          </code>
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
            READY
          </span>
        </div>
      </div>

      {/* How it works */}
      <Section id="how-it-works" label="How It Works" title="From zero to fully equipped in one command">
        <div className="mt-8 space-y-0">
          <Step num="1" title="Analyze your project">
            <P>
              SkillPack reads your project structure — <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.92em] text-gray-700">package.json</code>,{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.92em] text-gray-700">requirements.txt</code>,
              framework configs, directory layout. It identifies your tech stack,
              what you&apos;re building, and what gaps exist.
            </P>
          </Step>
          <Step num="2" title="Match needs to the catalog">
            <P>
              Your project profile is matched against SkillPack&apos;s ranked
              catalog across{" "}
              <Link href="/categories/coding-clis" className="text-[var(--accent)] hover:underline">
                15 categories
              </Link>
              . Only skills above the cut line — those with real evidence, strong
              trust scores, and active maintenance — are considered.
            </P>
          </Step>
          <Step num="3" title="Resolve conflicts">
            <P>
              If two skills overlap (e.g., two coding CLIs), SkillPack picks the
              one with higher trust score and better fit for your specific stack.
              No duplicates, no wasted context.
            </P>
          </Step>
          <Step num="4" title="Install everything" last>
            <P>
              Selected skills are installed with a single confirmation. You get a
              summary of what was installed, why each skill was chosen, and links
              to the full rankings.
            </P>
          </Step>
        </div>

        <CodeBlock>
          <span className="text-gray-500"># Example output</span>
          <br />
          <span className="text-[var(--accent)]">$</span> claude <span className="text-white">skillpack</span>
          <br />
          <br />
          <span className="text-gray-500">▸ Analyzing project...</span>
          <br />
          <span className="text-gray-500">▸ Detected: </span>
          <span className="text-white">Next.js 15</span>
          <span className="text-gray-500"> + </span>
          <span className="text-white">Prisma</span>
          <span className="text-gray-500"> + </span>
          <span className="text-white">Vitest</span>
          <br />
          <span className="text-gray-500">▸ Matched 4 categories, selecting best skills...</span>
          <br />
          <br />
          <span className="text-white">  Coding CLI    </span>
          <span className="text-gray-500">→ </span>
          <span className="text-emerald-400">Claude Code</span>
          <span className="text-gray-500">      Trust: 87  ★ 40K+</span>
          <br />
          <span className="text-white">  Web Browsing  </span>
          <span className="text-gray-500">→ </span>
          <span className="text-emerald-400">Playwright MCP</span>
          <span className="text-gray-500">   Trust: 74  ★ 8K+</span>
          <br />
          <span className="text-white">  UX & Design   </span>
          <span className="text-gray-500">→ </span>
          <span className="text-emerald-400">Framelink</span>
          <span className="text-gray-500">        Trust: 71  ★ 2K+</span>
          <br />
          <span className="text-white">  Documentation </span>
          <span className="text-gray-500">→ </span>
          <span className="text-emerald-400">Context7</span>
          <span className="text-gray-500">         Trust: 68  ★ 5K+</span>
          <br />
          <br />
          <span className="text-gray-500">▸ No conflicts found</span>
          <br />
          <span className="text-emerald-400">✓ Installed 4 skills</span>
          <span className="text-gray-500"> — avg Trust: 75</span>
        </CodeBlock>
      </Section>

      {/* Installation */}
      <Section id="install" label="Installation" title="Get started in 30 seconds">
        <h3 className="mt-8 text-[15px] font-bold text-gray-800">
          Option 1: Via the skills CLI
        </h3>
        <CodeBlock>
          <span className="text-[var(--accent)]">$</span> npx skills add skillpack -g -y
        </CodeBlock>
        <P>
          This installs SkillPack globally so it&apos;s available in any project.
          The <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.92em] text-gray-700">-y</code> flag
          skips confirmation prompts.
        </P>

        <h3 className="mt-8 text-[15px] font-bold text-gray-800">
          Option 2: Manual SKILL.md
        </h3>
        <P>
          If you prefer manual setup, create a <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.92em] text-gray-700">.agents/skills/skillpack/SKILL.md</code> file
          in your project root and paste the skill definition from the{" "}
          <a
            href="https://github.com/nicholasoxford/skills"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            skills registry
          </a>
          .
        </P>

        <h3 className="mt-8 text-[15px] font-bold text-gray-800">
          Option 3: Search and install
        </h3>
        <CodeBlock>
          <span className="text-gray-500"># Find skills for your needs</span>
          <br />
          <span className="text-[var(--accent)]">$</span> npx skills find react
          <br />
          <span className="text-[var(--accent)]">$</span> npx skills find testing
          <br />
          <span className="text-[var(--accent)]">$</span> npx skills find figma
          <br />
          <br />
          <span className="text-gray-500"># Install specific skills</span>
          <br />
          <span className="text-[var(--accent)]">$</span> npx skills add {"<owner/repo@skill>"} -g -y
        </CodeBlock>
      </Section>

      {/* What it looks at */}
      <Section id="analysis" label="Analysis" title="What SkillPack reads from your project">
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            {
              file: "package.json",
              desc: "Framework, dependencies, scripts, dev tools",
            },
            {
              file: "requirements.txt / pyproject.toml",
              desc: "Python stack, ML libraries, CLI tools",
            },
            {
              file: "tsconfig / next.config / vite.config",
              desc: "Build system, framework version, plugins",
            },
            {
              file: "Directory structure",
              desc: "App router vs pages, monorepo layout, test directories",
            },
            {
              file: ".env / docker-compose",
              desc: "Infrastructure, databases, external services",
            },
            {
              file: "Existing skills",
              desc: "Already installed skills to avoid duplicates",
            },
          ].map((item) => (
            <div
              key={item.file}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <p className="font-mono text-[12px] font-bold text-gray-800">
                {item.file}
              </p>
              <p className="mt-1 text-[13px] text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Quality standards */}
      <Section id="quality" label="Quality" title="Only skills that earn their place">
        <P>
          SkillPack doesn&apos;t just grab popular tools. Every recommended skill
          must pass the same quality gates used in the{" "}
          <Link
            href="/docs/methodology"
            className="text-[var(--accent)] hover:underline"
          >
            SkillPack methodology
          </Link>
          :
        </P>
        <ul className="mt-5 space-y-3">
          {[
            {
              check: "Trust Score ≥ 50",
              desc: "Composite of freshness, community growth, adoption, and evidence quality",
            },
            {
              check: "Above the cut line",
              desc: "Editorially reviewed and recommended in its category",
            },
            {
              check: "Active maintenance",
              desc: "Repository pushed within the last 90 days",
            },
            {
              check: "Real evidence",
              desc: "Independent artifacts — not just self-reported claims",
            },
          ].map((item) => (
            <li
              key={item.check}
              className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <span className="mt-0.5 text-emerald-500">✓</span>
              <div>
                <p className="text-[13px] font-bold text-gray-800">
                  {item.check}
                </p>
                <p className="mt-0.5 text-[13px] text-gray-500">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Category mapping */}
      <Section id="categories" label="Categories" title="What needs map to what skills">
        <P>
          SkillPack matches your project&apos;s needs to categories in the catalog.
          Each category has a ranked list of skills with an editorial cut line.
        </P>
        <div className="mt-5 overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface)]">
                <th className="px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  You need
                </th>
                <th className="px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Writing / editing code", "Coding CLIs"],
                ["Browser automation / scraping", "Web Browsing"],
                ["Research / finding info", "Search & News"],
                ["Design / UI work", "UX & UI"],
                ["Multi-agent coordination", "Teams of Agents"],
                ["CI/CD / build systems", "Software Factories"],
                ["CRM / analytics / PM tools", "Product & Business"],
                ["SEO / copy / ads", "Marketing"],
                ["Security / auditing", "Security"],
                ["Docs / READMEs", "Documentation"],
                ["Data / ML / charts", "Data & Analytics"],
                ["Bots / workflow automation", "Automation"],
              ].map(([need, cat]) => (
                <tr
                  key={need}
                  className="border-b border-[var(--border)] last:border-0"
                >
                  <td className="px-4 py-2 text-gray-600">{need}</td>
                  <td className="px-4 py-2">
                    <Link
                      href={`/categories/${cat.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                      className="text-[var(--accent)] hover:underline"
                    >
                      {cat}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* About */}
      <Section id="about" label="About" title="Why we built this">
        <P>
          Most developers discover AI skills by word of mouth, Twitter threads,
          or trial and error. SkillPack replaces that with evidence-backed
          selection. Every skill in the catalog earns its ranking through public
          proof — GitHub stars, adoption data, independent benchmarks, and
          community signals. No self-promotion counted.
        </P>
        <P>
          The catalog is maintained by an automated research pipeline that runs
          daily, collecting fresh data from GitHub, npm, PyPI, and Hacker News.
          Rankings are updated when evidence warrants it.{" "}
          <Link
            href="/docs/methodology"
            className="text-[var(--accent)] hover:underline"
          >
            Read the full methodology →
          </Link>
        </P>
      </Section>

      {/* Bottom CTA */}
      <div className="mt-10 flex items-center justify-between rounded-lg bg-[var(--dark-bg)] p-6 text-white">
        <div>
          <p className="text-[16px] font-black">Ready to try it?</p>
          <p className="mt-1 text-[13px] text-gray-400">
            One command. Picks the best skills for your project.
          </p>
        </div>
        <div className="shrink-0 rounded border border-[var(--dark-border)] bg-[var(--dark-surface)] px-5 py-2.5 font-mono text-[13px]">
          <span className="text-gray-500">$ </span>
          <span className="font-semibold text-white">npx skills add skillpack</span>
        </div>
      </div>
    </main>
  );
}
