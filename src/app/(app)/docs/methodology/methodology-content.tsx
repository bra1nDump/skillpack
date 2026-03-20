"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Table of Contents sections
// ---------------------------------------------------------------------------
const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "trust-score", label: "Trust Score" },
  { id: "tier", label: "Tier" },
  { id: "skill-type", label: "Skill Type" },
  { id: "complexity", label: "Complexity" },
  { id: "evidence", label: "Evidence Quality" },
  { id: "ranking", label: "Rankings & Cut Line" },
  { id: "stars", label: "GitHub Stars" },
  { id: "downloads", label: "Downloads" },
  { id: "mentions", label: "Social Mentions" },
  { id: "trends", label: "Trends" },
  { id: "freshness", label: "Freshness" },
  { id: "pipeline", label: "Research Pipeline" },
] as const;

// ---------------------------------------------------------------------------
// Reusable atoms
// ---------------------------------------------------------------------------
function SectionAnchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-24" />;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-2 text-[22px] font-bold tracking-tight text-gray-900">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[15px] leading-7 text-gray-500">{children}</p>
  );
}

function FormulaBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-4 font-mono text-[13px] leading-7 text-gray-700">
      {children}
    </div>
  );
}

function ThresholdTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--surface)]">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-[var(--border)] last:border-0"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-gray-600">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pill({
  color,
  children,
}: {
  color: "green" | "amber" | "red" | "gray" | "blue";
  children: React.ReactNode;
}) {
  const classes: Record<string, string> = {
    green: "bg-emerald-500/10 text-emerald-600",
    amber: "bg-amber-500/10 text-amber-600",
    red: "bg-red-500/10 text-red-500",
    gray: "bg-gray-100 text-gray-600",
    blue: "bg-sky-500/10 text-sky-600",
  };

  return (
    <span
      className={`inline-block rounded px-2 py-0.5 font-mono text-[11px] font-bold ${classes[color]}`}
    >
      {children}
    </span>
  );
}

function WeightBar({
  label,
  pct,
  color,
}: {
  label: string;
  pct: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-right font-mono text-[12px] text-gray-500">
        {label}
      </span>
      <div className="h-2 flex-1 rounded-full bg-gray-100">
        <div
          className="h-2 rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="w-10 font-mono text-[12px] font-bold text-gray-600">
        {pct}%
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function MethodologyContent() {
  const [activeId, setActiveId] = useState<string>("overview");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    ) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    for (const el of els) observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl gap-10 px-6 py-10 sm:px-8">
      {/* Sticky sidebar TOC */}
      <nav className="sticky top-24 hidden h-fit w-48 shrink-0 lg:block">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400">
          On this page
        </p>
        <ul className="mt-3 space-y-0.5 border-l border-[var(--border)]">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => scrollTo(s.id)}
                className={`-ml-px block w-full cursor-pointer border-l-2 py-1.5 pl-3.5 text-left text-[12px] transition-all ${
                  activeId === s.id
                    ? "border-[var(--accent)] font-semibold text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-5 border-t border-[var(--border)] pt-4">
          <Link
            href="/"
            className="text-[12px] text-gray-400 transition-colors hover:text-gray-600"
          >
            ← Back to catalog
          </Link>
        </div>
      </nav>

      {/* Content */}
      <article className="min-w-0 flex-1">
        {/* Header */}
        <div className="border-b border-[var(--border)] pb-8">
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--accent)]">
            Documentation
          </p>
          <h1 className="mt-3 text-[32px] font-black tracking-tight text-gray-900">
            Methodology
          </h1>
          <p className="mt-3 max-w-2xl text-[16px] leading-7 text-gray-500">
            How SkillPack measures, scores, and ranks every AI skill in the
            catalog. All metrics are computed from public data — GitHub APIs,
            package registries, and community signals.
          </p>
        </div>

        {/* ---- OVERVIEW ---- */}
        <section className="border-b border-[var(--border)] py-12">
          <SectionAnchor id="overview" />
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--accent)]">
            Overview
          </p>
          <SectionTitle>What we measure and why</SectionTitle>
          <P>
            Every skill in the SkillPack catalog is evaluated across multiple
            dimensions: trust, complexity, tier, type, evidence quality, and
            community traction. The goal is to give developers a fast, honest
            signal about whether a skill is worth adopting — backed by verifiable
            public data, not marketing claims.
          </P>
          <P>
            We collect data from GitHub (stars, push activity, languages,
            contributors), package registries (npm, PyPI weekly downloads),
            and social platforms (Hacker News mentions). On top of raw data,
            our research pipeline produces editorial evidence and rankings
            reviewed by human editors.
          </P>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Trust Score", range: "0–100", src: "Computed" },
              { label: "Tier", range: "4 levels", src: "LLM-classified" },
              { label: "Complexity", range: "1–5", src: "Repo analysis" },
              { label: "Evidence", range: "Strong / Moderate", src: "Editorial" },
              { label: "Stars & Downloads", range: "Absolute", src: "API" },
              { label: "Mentions", range: "7-day window", src: "HN Algolia" },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
              >
                <p className="text-[13px] font-bold text-gray-800">
                  {m.label}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-gray-400">
                  {m.range} · {m.src}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- TRUST SCORE ---- */}
        <section className="border-b border-[var(--border)] py-12">
          <SectionAnchor id="trust-score" />
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--accent)]">
            Trust Score
          </p>
          <SectionTitle>Composite health signal (0–100)</SectionTitle>
          <P>
            The trust score is a weighted composite of four sub-scores, each
            normalized to 0–100. It&apos;s computed at display-time from the
            latest data — never cached or stale.
          </P>

          <FormulaBlock>
            score = (freshness × 0.30) + (community × 0.25) + (adoption × 0.25)
            + (evidence × 0.20)
          </FormulaBlock>

          <div className="mt-6 space-y-2">
            <WeightBar label="Freshness" pct={30} color="#059669" />
            <WeightBar label="Community" pct={25} color="#3b82f6" />
            <WeightBar label="Adoption" pct={25} color="#8b5cf6" />
            <WeightBar label="Evidence" pct={20} color="#E63946" />
          </div>

          <h3 className="mt-8 text-[15px] font-bold text-gray-800">
            Freshness component
          </h3>
          <P>
            Based on how recently the repository received a push. Actively
            maintained projects score highest.
          </P>
          <ThresholdTable
            headers={["Last push", "Score"]}
            rows={[
              ["< 7 days", "100"],
              ["< 30 days", "80"],
              ["< 90 days", "50"],
              ["< 180 days", "20"],
              ["≥ 180 days", "0"],
              ["No data", "50 (neutral)"],
            ]}
          />

          <h3 className="mt-8 text-[15px] font-bold text-gray-800">
            Community component
          </h3>
          <P>
            Measures star velocity — the growth rate between the two most recent
            data points. Falls back to absolute star count when insufficient
            history.
          </P>
          <ThresholdTable
            headers={["Growth %", "Score"]}
            rows={[
              ["≥ 20%", "100"],
              ["≥ 10%", "85"],
              ["≥ 5%", "70"],
              ["≥ 1%", "55"],
              ["≥ 0% (flat)", "40"],
              ["Declining", "20"],
            ]}
          />
          <P>
            <strong className="text-gray-700">Fallback</strong> (fewer than 2
            data points): ≥50K stars → 100, ≥10K → 80, ≥1K → 60, ≥100 → 40,
            &lt;100 → 20.
          </P>

          <h3 className="mt-8 text-[15px] font-bold text-gray-800">
            Adoption component
          </h3>
          <P>
            Weekly download count from npm or PyPI, scored on a log scale.
          </P>
          <ThresholdTable
            headers={["Weekly downloads", "Score"]}
            rows={[
              ["≥ 100,000", "100"],
              ["≥ 10,000", "80"],
              ["≥ 1,000", "60"],
              ["≥ 100", "40"],
              ["< 100", "20"],
              ["No data", "30"],
            ]}
          />

          <h3 className="mt-8 text-[15px] font-bold text-gray-800">
            Evidence component
          </h3>
          <P>
            Ratio of strong evidence to total evidence items collected by our
            research pipeline.
          </P>
          <FormulaBlock>
            evidence_score = (strong_count / total_count) × 100
          </FormulaBlock>
          <P>
            If a skill has zero evidence items, this component scores 0.
          </P>

          <h3 className="mt-8 text-[15px] font-bold text-gray-800">
            Hard caps
          </h3>
          <P>
            Regardless of sub-scores, the final trust score is capped in
            certain conditions:
          </P>
          <div className="mt-4 space-y-2">
            <div className="flex items-start gap-3 rounded-lg border border-red-100 bg-red-50/50 px-4 py-3">
              <Pill color="red">CAP ≤ 10</Pill>
              <span className="text-[13px] text-gray-600">
                Repository is archived on GitHub
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-50/50 px-4 py-3">
              <Pill color="amber">CAP ≤ 30</Pill>
              <span className="text-[13px] text-gray-600">
                Last push was more than 365 days ago
              </span>
            </div>
          </div>

          <h3 className="mt-8 text-[15px] font-bold text-gray-800">
            Display colors
          </h3>
          <div className="mt-3 flex gap-3">
            <Pill color="green">≥ 80 Healthy</Pill>
            <Pill color="amber">50–79 Caution</Pill>
            <Pill color="red">&lt; 50 At Risk</Pill>
          </div>
        </section>

        {/* ---- TIER ---- */}
        <section className="border-b border-[var(--border)] py-12">
          <SectionAnchor id="tier" />
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--accent)]">
            Tier
          </p>
          <SectionTitle>How many moving parts</SectionTitle>
          <P>
            Tier measures the architectural scope of a skill — from a single
            focused capability to a bundle of coordinated skills. Classification
            is performed by an LLM analyzing each skill&apos;s name and summary.
          </P>
          <div className="mt-6 space-y-3">
            {[
              {
                tier: "Atomic",
                pips: 1,
                desc: "Single focused capability. Does one thing well.",
                ex: "A linter rule, a single MCP tool, a formatting script",
              },
              {
                tier: "Composite",
                pips: 2,
                desc: "Multi-step workflow combining several operations.",
                ex: "Code review bot, test generator with coverage analysis",
              },
              {
                tier: "Orchestrator",
                pips: 3,
                desc: "Coordinates multiple tools with decision logic.",
                ex: "Coding CLI that plans, edits, tests, and iterates autonomously",
              },
              {
                tier: "Pack",
                pips: 4,
                desc: "Bundle of multiple skills working as a suite.",
                ex: "Full development environment with linting, testing, deploy, and monitoring",
              },
            ].map((t) => (
              <div
                key={t.tier}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-[4px] w-[14px] rounded-[1px] ${
                          i < t.pips ? "bg-gray-800" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[13px] font-bold text-gray-800">
                    {t.tier}
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-6 text-gray-500">
                  {t.desc}
                </p>
                <p className="mt-1 text-[12px] text-gray-400">
                  Example: {t.ex}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- SKILL TYPE ---- */}
        <section className="border-b border-[var(--border)] py-12">
          <SectionAnchor id="skill-type" />
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--accent)]">
            Skill Type
          </p>
          <SectionTitle>What the skill does</SectionTitle>
          <P>
            Each skill is classified into one of four functional types by an LLM
            analyzing its name, summary, and description.
          </P>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              {
                type: "Expertise",
                color: "bg-violet-500/10 text-violet-600",
                desc: "Adds domain knowledge — patterns, conventions, best practices. Teaches the agent how to think about a domain.",
              },
              {
                type: "Generator",
                color: "bg-sky-500/10 text-sky-600",
                desc: "Produces output — code, files, content, scaffolding. The agent creates something tangible.",
              },
              {
                type: "Guardian",
                color: "bg-emerald-500/10 text-emerald-600",
                desc: "Prevents mistakes — scanning, linting, auditing, enforcement. The safety net.",
              },
              {
                type: "Connector",
                color: "bg-amber-500/10 text-amber-600",
                desc: "Bridges to external services — MCP servers, APIs, CLI tools. Extends what the agent can reach.",
              },
            ].map((t) => (
              <div
                key={t.type}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <span
                  className={`inline-block rounded px-2 py-0.5 font-mono text-[11px] font-bold ${t.color}`}
                >
                  {t.type}
                </span>
                <p className="mt-2 text-[13px] leading-6 text-gray-500">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- COMPLEXITY ---- */}
        <section className="border-b border-[var(--border)] py-12">
          <SectionAnchor id="complexity" />
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--accent)]">
            Complexity
          </p>
          <SectionTitle>Setup & expertise required (1–5)</SectionTitle>
          <P>
            Complexity is derived from the repository&apos;s codebase size
            (total bytes across all languages) and the number of programming
            languages used. It approximates how much effort is needed to
            understand, configure, and run the skill.
          </P>
          <FormulaBlock>
            complexity = f(total_code_bytes, language_count)
          </FormulaBlock>
          <ThresholdTable
            headers={["Level", "Condition", "Visual"]}
            rows={[
              ["5", "> 500 KB + 4+ languages", "●●●●●"],
              ["4", "> 200 KB + 3+ languages", "●●●●○"],
              ["3", "> 50 KB + 2+ languages", "●●●○○"],
              ["2", "> 10 KB", "●●○○○"],
              ["1", "≤ 10 KB", "●○○○○"],
            ]}
          />
          <P>
            Data is collected from the GitHub Languages API, which returns a
            byte count per language for each repository.
          </P>
        </section>

        {/* ---- EVIDENCE ---- */}
        <section className="border-b border-[var(--border)] py-12">
          <SectionAnchor id="evidence" />
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--accent)]">
            Evidence Quality
          </p>
          <SectionTitle>Strong vs. moderate sources</SectionTitle>
          <P>
            Every skill&apos;s assessment is backed by collected evidence — URLs
            to public artifacts like HN threads, GitHub issues, blog posts, and
            benchmark reports. Each evidence item is tagged with a quality level.
          </P>
          <div className="mt-6 space-y-3">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
              <div className="flex items-center gap-2">
                <Pill color="green">Strong</Pill>
                <span className="text-[13px] font-semibold text-gray-700">
                  Independent, verifiable artifacts
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-6 text-gray-500">
                HN threads with high engagement (100+ points), published
                third-party benchmarks, public GitHub issues showing real
                adoption, independent reviews from recognized publications.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
              <div className="flex items-center gap-2">
                <Pill color="amber">Moderate</Pill>
                <span className="text-[13px] font-semibold text-gray-700">
                  Secondary or self-reported sources
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-6 text-gray-500">
                Company blog posts, press releases, forum discussions with
                limited engagement, conference talks by the skill&apos;s own
                team. These may carry bias but still contribute useful signal.
              </p>
            </div>
          </div>
          <P>
            Evidence is collected during the{" "}
            <a
              href="#pipeline"
              className="text-[var(--accent)] hover:underline"
            >
              research pipeline
            </a>
            &apos;s Deep-Dive stage. Each item records the source URL, date,
            engagement level, author, and a one-line gist.
          </P>
        </section>

        {/* ---- RANKING ---- */}
        <section className="border-b border-[var(--border)] py-12">
          <SectionAnchor id="ranking" />
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--accent)]">
            Rankings & Cut Line
          </p>
          <SectionTitle>Editorial ranking per category</SectionTitle>
          <P>
            Within each category, skills are ranked by an editorial process
            that weighs evidence quality, real-world usage, recency, and direct
            workflow fit. The ranking is opinionated — it reflects our assessment
            of which tools actually deliver value.
          </P>
          <h3 className="mt-8 text-[15px] font-bold text-gray-800">
            Ranking criteria
          </h3>
          <ul className="mt-4 list-none space-y-2 text-[14px] leading-7 text-gray-500">
            {[
              "Official vendor support and active maintenance",
              "Workflow fit — does it solve a real problem in its category?",
              "Public trust signals — community adoption, independent reviews",
              "Recency — recent releases and active development",
              "Demonstrability — can the skill be shown working in practice?",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]/40" />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-[15px] font-bold text-gray-800">
            The cut line
          </h3>
          <P>
            Skills that don&apos;t meet the quality threshold are placed{" "}
            <em>below the cut line</em>. These are still tracked and displayed
            (at reduced opacity) but are not recommended for adoption. A skill
            can move above the cut line when new evidence or traction warrants
            it.
          </P>
          <div className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3 rounded bg-white px-3 py-2 text-[13px] font-semibold text-gray-800 shadow-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded bg-gray-50 font-mono text-[12px] font-bold text-gray-500">
                  3
                </span>
                Recommended skill
              </div>
              <div className="flex items-center gap-3 py-2">
                <div className="h-px flex-1 bg-amber-200" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-amber-500">
                  Below the cut line
                </span>
                <div className="h-px flex-1 bg-amber-200" />
              </div>
              <div className="flex items-center gap-3 rounded bg-white px-3 py-2 text-[13px] text-gray-400 opacity-50 shadow-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded bg-gray-50 font-mono text-[12px] text-gray-400">
                  4
                </span>
                Not recommended yet
              </div>
            </div>
          </div>
        </section>

        {/* ---- STARS ---- */}
        <section className="border-b border-[var(--border)] py-12">
          <SectionAnchor id="stars" />
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--accent)]">
            GitHub Stars
          </p>
          <SectionTitle>Community interest signal</SectionTitle>
          <P>
            Star counts are fetched from the GitHub REST API
            (<code className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.92em] text-gray-700">
              GET /repos/&#123;owner&#125;/&#123;repo&#125;
            </code>) and stored as monthly snapshots. The absolute count is displayed
            alongside a{" "}
            <a
              href="#trends"
              className="text-[var(--accent)] hover:underline"
            >
              trend arrow
            </a>{" "}
            showing growth direction.
          </P>
          <P>
            Stars are a useful but imperfect signal. They indicate awareness,
            not adoption. That&apos;s why stars are just one component of the
            trust score — weighted alongside downloads and evidence.
          </P>
        </section>

        {/* ---- DOWNLOADS ---- */}
        <section className="border-b border-[var(--border)] py-12">
          <SectionAnchor id="downloads" />
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--accent)]">
            Downloads
          </p>
          <SectionTitle>Weekly install counts</SectionTitle>
          <P>
            We collect weekly download counts from two package registries:
          </P>
          <div className="mt-5 space-y-2">
            <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
              <Pill color="red">npm</Pill>
              <span className="font-mono text-[12px] text-gray-500">
                api.npmjs.org/downloads/point/last-week/&#123;package&#125;
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
              <Pill color="blue">PyPI</Pill>
              <span className="font-mono text-[12px] text-gray-500">
                pypistats.org/api/packages/&#123;package&#125;/recent
              </span>
            </div>
          </div>
          <P>
            Download data is stored as monthly snapshots and feeds into both the
            trust score&apos;s adoption component and the trend calculation.
          </P>
        </section>

        {/* ---- MENTIONS ---- */}
        <section className="border-b border-[var(--border)] py-12">
          <SectionAnchor id="mentions" />
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--accent)]">
            Social Mentions
          </p>
          <SectionTitle>Hacker News signal</SectionTitle>
          <P>
            We track how often a skill is mentioned on Hacker News using the
            Algolia Search API. Only stories (not comments) with more than 5
            points in the last 7 days are counted — this filters out noise and
            self-promotion.
          </P>
          <FormulaBlock>
            HN Algolia → tags=story, points &gt; 5, created within last 7 days
          </FormulaBlock>
          <P>
            Mention counts are stored as monthly snapshots and displayed as
            time-series charts on category pages.
          </P>
        </section>

        {/* ---- TRENDS ---- */}
        <section className="border-b border-[var(--border)] py-12">
          <SectionAnchor id="trends" />
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--accent)]">
            Trends
          </p>
          <SectionTitle>Direction arrows (↑ ↓ —)</SectionTitle>
          <P>
            Trend arrows show the growth direction between the two most recent
            data points in any time-series metric (stars, downloads, mentions).
          </P>
          <FormulaBlock>
            pct = ((latest - previous) / previous) × 100
          </FormulaBlock>
          <ThresholdTable
            headers={["Change", "Direction", "Arrow"]}
            rows={[
              ["≥ +5%", "Up", "↑ (green)"],
              ["-5% to +5%", "Flat", "— (gray)"],
              ["≤ -5%", "Down", "↓ (red)"],
            ]}
          />
          <P>
            If fewer than 2 data points exist or the previous value is zero,
            no trend is shown.
          </P>
        </section>

        {/* ---- FRESHNESS ---- */}
        <section className="border-b border-[var(--border)] py-12">
          <SectionAnchor id="freshness" />
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--accent)]">
            Freshness
          </p>
          <SectionTitle>Last push activity</SectionTitle>
          <P>
            Freshness is simply the number of days since the repository&apos;s
            last push, fetched from the GitHub API&apos;s{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.92em] text-gray-700">
              pushed_at
            </code>{" "}
            field.
          </P>
          <ThresholdTable
            headers={["Days since push", "Display"]}
            rows={[
              ["0", '"today" (green)'],
              ["1–7", '"Nd ago" (green)'],
              ["8–30", '"Nw ago" (gray)'],
              ["31+", '"Nmo ago" (dim)'],
            ]}
          />
          <P>
            Freshness is the heaviest-weighted component (30%) of the trust
            score because an abandoned repository is the single strongest
            negative signal for a skill&apos;s reliability.
          </P>
        </section>

        {/* ---- PIPELINE ---- */}
        <section className="py-12">
          <SectionAnchor id="pipeline" />
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--accent)]">
            Research Pipeline
          </p>
          <SectionTitle>How data is collected</SectionTitle>
          <P>
            All research is orchestrated by <strong className="text-gray-700">Ralph</strong> — our
            automated pipeline that runs per-category through six stages. Each
            stage spawns a dedicated AI agent with specific tools and
            constraints.
          </P>
          <div className="mt-6 space-y-0">
            {[
              {
                num: "1",
                name: "Discover",
                time: "~5 min",
                desc: "Web search, HN Algolia, GitHub trending, registry checks. Finds all serious contenders and new signals.",
              },
              {
                num: "2",
                name: "Deep-Dive",
                time: "~15–25 min",
                desc: "Builds measurable evidence for every contender. Collects engagement metrics, official artifacts, and usage evidence. Hard quality gates.",
              },
              {
                num: "3",
                name: "Rank",
                time: "~5 min",
                desc: "Editorial ranking per category. Top skills recommended, rest placed below the cut line. Evidence-first, opinionated.",
              },
              {
                num: "4",
                name: "Catalog Update",
                time: "~5 min",
                desc: "Reads rank findings and updates the catalog — evidence, rankings, verdicts, and signals.",
              },
              {
                num: "5",
                name: "Metrics",
                time: "~1 min",
                desc: "Collects GitHub stars, npm/PyPI downloads, and HN mentions via APIs. No AI needed.",
              },
              {
                num: "6",
                name: "QA",
                time: "~2 min",
                desc: "Builds the project and runs link checks. Catches broken TypeScript or dead URLs before deploy.",
              },
            ].map((stage, i) => (
              <div key={stage.num} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 font-mono text-[12px] font-bold text-white">
                    {stage.num}
                  </div>
                  {i < 5 && (
                    <div className="w-px flex-1 bg-gray-200" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-gray-800">
                      {stage.name}
                    </span>
                    <span className="font-mono text-[11px] text-gray-400">
                      {stage.time}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-6 text-gray-500">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <P>
            The pipeline can run all categories in parallel with configurable
            concurrency. A full sweep across all categories takes roughly 2–5
            hours depending on parallelism.
          </P>
        </section>
      </article>
    </main>
  );
}
