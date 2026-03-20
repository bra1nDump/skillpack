"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* ─── transform rows data ─── */
const TRANSFORMS = [
  {
    task: "Build a SaaS with Next.js and Stripe",
    skills: ["next-app-router", "prisma-migrate", "stripe-integration", "auth-patterns", "vitest-gen", "zod-api"],
    result: "Full-Stack Engineer",
    color: "#2563EB",
  },
  {
    task: "Audit codebase for security vulnerabilities",
    skills: ["semgrep-scan", "secret-scanner", "dep-audit", "owasp-check", "fix-suggest"],
    result: "Security Expert",
    color: "#E63946",
  },
  {
    task: "Launch a product — page, emails, ad copy",
    skills: ["landing-page-copy", "email-sequence", "seo-optimizer", "ad-copy-variants"],
    result: "Marketing Expert",
    color: "#D97706",
  },
  {
    task: "Build a component library from Figma specs",
    skills: ["tailwind-system", "design-system-gen", "figma-to-code", "a11y-auditor"],
    result: "UI/Design Expert",
    color: "#7C3AED",
  },
];

const AGENTS = [
  { id: "codex", label: "OpenAI Codex", sub: "ChatGPT Plus / Pro", dl: "https://developers.openai.com/codex/app", dlWin: "https://apps.microsoft.com/detail/9plm9xgg6vks", npm: "npm install -g @openai/codex", dlLabel: "developers.openai.com", dlWinLabel: "Microsoft Store", cmd: "codex", tip: "Sign in with your ChatGPT account. The desktop app includes everything." },
  { id: "claude", label: "Claude Code", sub: "Claude Pro / Max", dl: "https://claude.com/download", dlWin: "https://claude.com/download", npm: "npm install -g @anthropic-ai/claude-code", dlLabel: "claude.com/download", dlWinLabel: "claude.com/download", cmd: "claude", tip: "Sign in with your Claude account. Click the Code tab to start." },
] as const;

export function LandingContent() {
  const [anim, setAnim] = useState(false);
  const [agent, setAgent] = useState<"codex" | "claude">("codex");

  useEffect(() => setAnim(true), []);

  const a = AGENTS.find((x) => x.id === agent)!;

  const fadeIn = (d: number) =>
    anim
      ? { opacity: 0, animation: `fadeUp .5s ease ${d}s forwards` } as const
      : { opacity: 0 } as const;

  return (
    <>
      {/* keyframes */}
      <style>{"@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}"}</style>

      <div className="min-h-screen bg-[#F5F5F5] font-sans">
        {/* ═══ NAV ═══ */}
        <nav className="sticky top-0 z-50 flex items-center justify-between bg-black px-10 py-3.5">
          <Link href="/" className="font-mono text-[15px] font-bold text-white">
            skill<span className="text-[#E63946]">pack</span>
            <span className="text-[#737373]">.co</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <Link href="/" className="font-mono text-[12px] text-[#A3A3A3]">
              Marketplace
            </Link>
            <span className="rounded bg-[#059669] px-2.5 py-1 font-mono text-[10px] font-bold text-white">
              FREE
            </span>
            <a
              href="#start"
              className="rounded bg-[#E63946] px-4.5 py-1.5 font-mono text-[12px] font-bold text-white"
            >
              Get Started
            </a>
          </div>
        </nav>

        {/* ═══ HERO — formula on dark ═══ */}
        <section className="bg-black px-8 py-12" style={fadeIn(0.05)}>
          <div className="mx-auto max-w-[900px]">
            <div className="mb-9 text-center">
              <p className="mb-2.5 font-mono text-[12px] tracking-[1.5px] text-[#737373]">
                A CODING AGENT WRITES CODE, RUNS COMMANDS, MANAGES FILES ON YOUR MACHINE
              </p>
              <h1 className="text-[28px] font-black leading-[1.3] text-[#A3A3A3]">
                But it doesn&apos;t know{" "}
                <span className="text-white">your workflows and best practices</span>.
              </h1>
            </div>

            {/* 3 cards: Agent + SkillPack = Expert */}
            <div className="flex items-stretch justify-center gap-4">
              {/* Card 1 — Coding Agent */}
              <div className="flex w-[250px] flex-col items-center rounded-xl border border-[#262626] bg-[#171717] p-7 text-center">
                <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#262626]">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <rect x="3" y="5" width="14" height="10" rx="2" fill="none" stroke="#A3A3A3" strokeWidth="1.6" />
                    <line x1="6" y1="9" x2="10" y2="9" stroke="#737373" strokeWidth="1.3" strokeLinecap="round" />
                    <line x1="6" y1="12" x2="13" y2="12" stroke="#525252" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="mb-0.5 text-[18px] font-black text-white">Coding Agent</div>
                <div className="font-mono text-[11px] text-[#737373]">Codex · Claude Code</div>
                <div className="mt-2.5 text-[11px] text-[#737373]">Powerful, but generic</div>
              </div>

              {/* Plus sign */}
              <div className="flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <line x1="12" y1="5" x2="12" y2="19" stroke="#525252" strokeWidth="2" strokeLinecap="round" />
                  <line x1="5" y1="12" x2="19" y2="12" stroke="#525252" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Card 2 — SkillPack */}
              <div className="flex w-[250px] flex-col items-center rounded-xl border border-[#E6394644] bg-[#E6394615] p-7 text-center">
                <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#E6394625]">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <rect x="2" y="2" width="7" height="7" rx="1.5" fill="#E63946" opacity=".8" />
                    <rect x="11" y="2" width="7" height="7" rx="1.5" fill="#E63946" opacity=".55" />
                    <rect x="2" y="11" width="7" height="7" rx="1.5" fill="#E63946" opacity=".55" />
                    <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#E63946" opacity=".35" />
                  </svg>
                </div>
                <div className="text-[18px] font-black text-white">
                  skill<span className="text-[#E63946]">pack</span>
                </div>
                <div className="font-mono text-[11px] font-semibold text-[#059669]">
                  free — 847+ skills
                </div>
                <div className="mt-2.5 text-[11px] text-[#A3A3A3]">
                  Picks the right skills<br />for your project
                </div>
              </div>

              {/* Equals sign */}
              <div className="flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <line x1="5" y1="9" x2="19" y2="9" stroke="#525252" strokeWidth="2" strokeLinecap="round" />
                  <line x1="5" y1="15" x2="19" y2="15" stroke="#525252" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Card 3 — Expert */}
              <div className="flex w-[250px] flex-col items-center rounded-xl border border-[#05966944] bg-[#05966912] p-7 text-center">
                <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#05966922]">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path d="M10 1 L18 5.5 L18 14.5 L10 19 L2 14.5 L2 5.5 Z" fill="none" stroke="#059669" strokeWidth="1.6" strokeLinejoin="round" />
                    <polyline points="6,10 9,13 14,7" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-[18px] font-black text-[#059669]">Expert</div>
                <div className="font-mono text-[11px] text-[#A3A3A3]">in whatever you need</div>
                <div className="mt-2.5 text-[11px] text-[#A3A3A3]">Knows the right workflows</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TRANSFORMATIONS ═══ */}
        <section className="border-b border-[#E5E5E5] bg-white px-8 py-10" style={fadeIn(0.2)}>
          <div className="mx-auto max-w-[900px]">
            <h2 className="mb-7 text-center font-mono text-[12px] font-bold tracking-[1.5px] text-[#A3A3A3]">
              DESCRIBE YOUR TASK — SKILLPACK BUILDS THE EXPERT
            </h2>
            <div className="flex flex-col gap-2.5">
              {TRANSFORMS.map((d) => (
                <div
                  key={d.task}
                  className="grid items-center gap-0 rounded-[10px] border border-[#E5E5E5] bg-[#FAFAFA] p-1.5"
                  style={{ gridTemplateColumns: "200px 16px 1fr 36px 170px" }}
                >
                  {/* Task */}
                  <div className="flex h-full items-center rounded-lg bg-white p-4">
                    <span className="text-[13px] font-bold leading-snug text-black">
                      &ldquo;{d.task}&rdquo;
                    </span>
                  </div>
                  {/* Dot */}
                  <div className="flex justify-center">
                    <div className="h-0.5 w-0.5 rounded-full bg-[#D4D4D4]" />
                  </div>
                  {/* Skills */}
                  <div className="rounded-lg bg-black p-3">
                    <div className="mb-2 flex items-center gap-1.5">
                      <span className="font-mono text-[11px] font-bold text-white">
                        skill<span className="text-[#E63946]">pack</span>
                      </span>
                      <span className="font-mono text-[9px] text-[#737373]">
                        selects {d.skills.length} skills
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {d.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded bg-[#262626] px-2 py-0.5 font-mono text-[9.5px] text-[#D4D4D4]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="flex justify-center">
                    <svg width="24" height="12" viewBox="0 0 24 12">
                      <line x1="0" y1="6" x2="18" y2="6" stroke={d.color} strokeWidth="2" />
                      <polygon points="18,2 24,6 18,10" fill={d.color} />
                    </svg>
                  </div>
                  {/* Result */}
                  <div
                    className="flex h-full items-center justify-center rounded-lg"
                    style={{
                      background: d.color + "0C",
                      border: `1.5px solid ${d.color}30`,
                    }}
                  >
                    <span className="text-[14px] font-black" style={{ color: d.color }}>
                      {d.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW SKILLPACK PICKS ═══ */}
        <section className="bg-black px-8 py-11" style={fadeIn(0.3)}>
          <div className="mx-auto max-w-[800px]">
            <div className="mb-8 text-center">
              <div className="mb-2 font-mono text-[10px] font-bold tracking-[2px] text-[#E63946]">
                NOT RANDOM — VETTED
              </div>
              <h2 className="text-[22px] font-black leading-[1.3] text-white">
                SkillPack doesn&apos;t just grab skills.
                <br />
                <span className="text-[#A3A3A3]">
                  It picks the best ones from a curated marketplace.
                </span>
              </h2>
            </div>

            <div className="mb-7 grid grid-cols-3 gap-3">
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18">
                      <path d="M9 1 l2.2 4.5 5 .7-3.6 3.5.8 5L9 12.5 4.6 14.7l.8-5L1.8 6.2l5-.7Z" fill="#D97706" />
                    </svg>
                  ),
                  title: "Community Rated",
                  desc: "Every skill is rated by real developers. Stars, reviews, and written feedback — not bot scores.",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18">
                      <circle cx="9" cy="9" r="7" fill="none" stroke="#059669" strokeWidth="1.5" />
                      <path d="M5.5 9.5 L8 12 L13 6" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: "Retention Tracked",
                  desc: "We measure how many developers keep a skill installed after 30 days. High retention = actually useful.",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18">
                      <rect x="2" y="8" width="3" height="8" rx="1" fill="#2563EB" opacity=".4" />
                      <rect x="7.5" y="5" width="3" height="11" rx="1" fill="#2563EB" opacity=".65" />
                      <rect x="13" y="2" width="3" height="14" rx="1" fill="#2563EB" opacity=".9" />
                    </svg>
                  ),
                  title: "Ranked by Signal",
                  desc: "Skills are ranked by a composite of rating, retention, freshness, and community adoption — not just downloads.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[10px] border border-[#262626] bg-[#171717] px-5 py-5.5"
                >
                  <div className="mb-3">{item.icon}</div>
                  <div className="mb-1.5 text-[14px] font-black text-white">{item.title}</div>
                  <div className="text-[12px] leading-[1.5] text-[#A3A3A3]">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* CTA bar */}
            <div className="flex items-center gap-5 rounded-[10px] border border-[#262626] bg-[#171717] p-5">
              <div className="flex-1">
                <div className="mb-1 text-[13px] font-bold text-white">
                  When you run{" "}
                  <span className="font-mono text-[#E63946]">npx skillpack init</span>, here&apos;s
                  what happens:
                </div>
                <div className="text-[12px] leading-[1.7] text-[#A3A3A3]">
                  SkillPack scans your project — framework, dependencies, file structure. Then it
                  queries the skillpack.co catalog, filters by compatibility, ranks by community
                  score, checks for conflicts between skills, and installs only the top-rated
                  combination for your exact stack.
                </div>
              </div>
              <Link
                href="/"
                className="shrink-0 rounded-md bg-[#E63946] px-6 py-3 font-mono text-[12px] font-bold text-white"
              >
                Browse the catalog →
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ PRICING ═══ */}
        <section className="border-b border-[#E5E5E5] bg-white px-8 py-10" style={fadeIn(0.4)}>
          <div className="mx-auto max-w-[700px]">
            <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-[#E5E5E5] shadow-sm">
              {/* Left — The agent */}
              <div className="border-r border-[#E5E5E5] bg-white p-7">
                <div className="mb-3.5 font-mono text-[10px] font-bold tracking-[1.5px] text-[#A3A3A3]">
                  THE CODING AGENT
                </div>
                <div className="mb-1 text-[17px] font-black leading-snug text-black">
                  You{" "}
                  <span className="underline decoration-[#E63946] decoration-2 underline-offset-[3px]">
                    already pay
                  </span>{" "}
                  for this.
                </div>
                <p className="mb-1 text-[12.5px] leading-[1.5] text-[#737373]">
                  ChatGPT Plus and Claude Pro both include a full coding agent in your existing
                  subscription.
                </p>
                <p className="mb-4.5 text-[12px] italic leading-[1.5] text-[#A3A3A3]">
                  Don&apos;t have a subscription? Both offer free tiers to try it out — no credit
                  card needed.
                </p>
                <div className="flex gap-2">
                  {[
                    { n: "Codex", s: "ChatGPT Plus" },
                    { n: "Claude Code", s: "Claude Pro" },
                  ].map((x) => (
                    <div
                      key={x.n}
                      className="flex-1 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-3 text-center"
                    >
                      <div className="text-[13px] font-bold">{x.n}</div>
                      <div className="mt-0.5 font-mono text-[10px] text-[#A3A3A3]">{x.s}</div>
                      <div className="mt-1.5 text-[20px] font-black">
                        $20<span className="text-[11px] font-normal text-[#A3A3A3]">/mo</span>
                      </div>
                      <div className="mt-1 font-mono text-[10px] font-semibold text-[#059669]">
                        included in your plan
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right — SkillPack */}
              <div className="flex flex-col items-center justify-center bg-[#05966908] p-7 text-center">
                <div className="mb-3.5 font-mono text-[10px] font-bold tracking-[1.5px] text-[#059669]">
                  SKILLPACK
                </div>
                <div className="font-mono text-[52px] font-black leading-none text-[#059669]">
                  $0
                </div>
                <div className="mt-2 text-[14px] font-bold text-[#059669]">
                  Free. Open standard.
                </div>
                <div className="mt-2 text-[12px] text-[#737373]">847+ community-rated skills</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ GET STARTED ═══ */}
        <section id="start" className="bg-white px-8 pb-14 pt-11" style={fadeIn(0.5)}>
          <div className="mx-auto max-w-[640px]">
            <div className="mb-7 text-center">
              <h2 className="text-[24px] font-black">Get started in 2 minutes</h2>
              <p className="mt-1 text-[13px] text-[#737373]">
                Pick your agent, download it, then add SkillPack.
              </p>
            </div>

            {/* Agent toggle */}
            <div className="mb-8 flex justify-center">
              {AGENTS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setAgent(o.id)}
                  className={`cursor-pointer border px-9 py-3 text-center transition-all ${
                    agent === o.id
                      ? "border-black bg-black text-white"
                      : "border-[#E5E5E5] bg-[#FAFAFA] text-[#737373]"
                  } ${o.id === "codex" ? "rounded-l-lg" : "rounded-r-lg"}`}
                >
                  <div className="text-[14px] font-bold">{o.label}</div>
                  <div className="mt-0.5 font-mono text-[10px] opacity-50">{o.sub}</div>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-7">
              {/* Step 1 — Download */}
              <div>
                <div className="mb-3.5 flex items-center gap-3">
                  <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-black font-mono text-[14px] font-black text-white">
                    1
                  </div>
                  <div className="text-[16px] font-bold">
                    Download {agent === "codex" ? "Codex" : "Claude"}
                  </div>
                </div>
                <div className="ml-[42px]">
                  <div className="mb-2.5 flex gap-2">
                    <a
                      href={a.dl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-4 text-center"
                    >
                      <div className="text-[14px] font-bold">macOS</div>
                      <div className="mt-0.5 font-mono text-[10px] text-[#A3A3A3]">{a.dlLabel}</div>
                    </a>
                    <a
                      href={a.dlWin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-4 text-center"
                    >
                      <div className="text-[14px] font-bold">Windows</div>
                      <div className="mt-0.5 font-mono text-[10px] text-[#A3A3A3]">
                        {a.dlWinLabel}
                      </div>
                    </a>
                  </div>
                  <p className="text-[11px] text-[#A3A3A3]">{a.tip}</p>
                  <div className="mt-2.5 rounded-md border border-[#E5E5E5] bg-[#FAFAFA] px-3.5 py-2.5">
                    <div className="mb-0.5 font-mono text-[9px] tracking-[1px] text-[#A3A3A3]">
                      PREFER THE TERMINAL?
                    </div>
                    <div className="font-mono text-[12px] text-[#525252]">
                      <span className="text-[#E63946]">$</span> {a.npm}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 — Add SkillPack */}
              <div>
                <div className="mb-3.5 flex items-center gap-3">
                  <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-black font-mono text-[14px] font-black text-white">
                    2
                  </div>
                  <div className="text-[16px] font-bold">
                    Add SkillPack
                    <span className="ml-2 rounded bg-[#D1FAE5] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#059669]">
                      free
                    </span>
                  </div>
                </div>
                <div className="ml-[42px]">
                  <div className="rounded-[10px] border border-[#05966933] bg-[#0D1117] p-4.5 font-mono text-[13px] leading-[1.9] text-[#C9D1D9]">
                    <span className="text-[#6E7681]"># open your project folder, then run:</span>
                    <br />
                    <span className="text-[#E63946]">$</span> npx skillpack init
                    <br />
                    <br />
                    <span className="text-[#7EE787]">→</span> Detected:{" "}
                    <span className="text-[#79C0FF]">Next.js 15 + Prisma + Tailwind</span>
                    <br />
                    <span className="text-[#7EE787]">→</span> Agent:{" "}
                    <span className="text-[#79C0FF]">
                      {agent === "codex" ? "OpenAI Codex" : "Claude Code"}
                    </span>
                    <br />
                    <span className="text-[#7EE787]">→</span> Installing 6 skills (avg ★4.7)...
                    <br />
                    <span className="font-semibold text-[#7EE787]">
                      ✓ Done — your agent is now an expert
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 3 — Code */}
              <div>
                <div className="mb-3.5 flex items-center gap-3">
                  <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-black font-mono text-[14px] font-black text-white">
                    3
                  </div>
                  <div className="text-[16px] font-bold">
                    Code. Your agent knows the right patterns now.
                  </div>
                </div>
                <div className="ml-[42px]">
                  <div className="rounded-[10px] bg-[#0D1117] px-5 py-3.5 font-mono text-[13px] text-[#C9D1D9]">
                    <span className="text-[#E63946]">$</span> {a.cmd}{" "}
                    <span className="text-[#A5D6FF]">
                      &quot;Build the user dashboard with auth&quot;
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-8">
              <Link
                href="/"
                className="block rounded-lg bg-black py-4 text-center font-mono text-[14px] font-bold text-white"
              >
                Browse 847+ skills on skillpack.co →
              </Link>
            </div>

            {/* Also works with */}
            <div className="mt-7 text-center">
              <div className="mb-2 font-mono text-[10px] tracking-[1px] text-[#A3A3A3]">
                ALSO WORKS WITH
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {["Gemini CLI", "Cursor", "Windsurf", "Copilot", "Aider", "OpenCode", "Augment"].map(
                  (n) => (
                    <span
                      key={n}
                      className="rounded bg-[#F5F5F5] px-2.5 py-1 font-mono text-[10px] font-semibold text-[#737373]"
                    >
                      {n}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="flex items-center justify-between bg-black px-10 py-4.5">
          <span className="font-mono text-[12px] font-bold text-white">
            skill<span className="text-[#E63946]">pack</span>
            <span className="text-[#737373]">.co</span>
            <span className="ml-3 font-normal text-[#737373]">
              Free skills for coding agents
            </span>
          </span>
          <div className="flex gap-3.5 font-mono text-[11px] text-[#737373]">
            <Link href="/" className="hover:text-[#A3A3A3]">
              Marketplace
            </Link>
            <Link href="/docs/methodology" className="hover:text-[#A3A3A3]">
              Docs
            </Link>
            <a
              href="https://github.com/bra1nDump/skillbench/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#A3A3A3]"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
