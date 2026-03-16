export type SkillSlug =
  | "figma-mcp-server-guide"
  | "framelink"
  | "figma-use"
  | "vibma"
  | "cursor-talk-to-figma"
  | "figma-console-mcp"
  | "penpot-mcp"
  | "firecrawl-mcp-server"
  | "exa-mcp-server"
  | "google-workspace-mcp"
  | "mcp-atlassian"
  | "notion-mcp-server"
  | "slack-mcp-server"
  | "openhands"
  | "ralph-loop-agent"
  | "swe-agent"
  | "claude-code"
  | "aider"
  | "continue-dev"
  | "opencode"
  | "codex-cli"
  | "gemini-cli"
  | "browser-use"
  | "playwright-mcp"
  | "stagehand"
  | "chrome-devtools-mcp"
  | "agent-browser"
  | "skyvern";

export type CategorySlug =
  | "product-business-development"
  | "teams-of-agents"
  | "ux-ui"
  | "coding-clis"
  | "web-browsing"
  | "software-factories"
  | "search-news";

export type PlatformSlug =
  | "figma"
  | "google-workspace"
  | "browser"
  | "terminal"
  | "github";

export type PlatformRecord = {
  slug: PlatformSlug;
  name: string;
  url: string;
  summary: string;
  nativeSupport: string;
  relatedCategories: CategorySlug[];
  relatedSkills: SkillSlug[];
};

export type EvidenceItem = {
  quality: "strong" | "moderate";
  title: string;
  url: string;
  date: string;
  engagement: string;
  who: string;
  gist: string;
  selfReported?: boolean;
};

export type SkillRecord = {
  slug: SkillSlug;
  name: string;
  repo: string;
  repoUrl: string;
  readmeBranch?: string;
  official: boolean;
  status: "active" | "watch";
  summary: string;
  verdict: string;
  docsUrl?: string;
  productUrl?: string;
  relatedCategories: CategorySlug[];
  strengths: string[];
  weaknesses: string[];
  evidence: EvidenceItem[];
  githubStars?: string;
  npmPackage?: string;
  pypiPackage?: string;
  metrics?: {
    stars?: Array<{ date: string; value: number }>;
    downloads?: Array<{ date: string; value: number }>;
    mentionsPositive?: Array<{ date: string; value: number }>;
    mentionsNegative?: Array<{ date: string; value: number }>;
  };
};

export type CategoryRecord = {
  slug: CategorySlug;
  name: string;
  deck: string;
  verdict: string[];
  meta: string[];
  ranking: Array<{
    rank: string;
    contender: string;
    skillSlug?: SkillSlug;
    externalUrl?: string;
    bestFor: string;
    why: string;
    watch: string;
    belowCutLine?: boolean;
  }>;
  observedOutputs: Array<{
    title: string;
    summary: string;
    href: string;
    date: string;
  }>;
  liveSignals: Array<{
    label: string;
    title: string;
    href: string;
    date: string;
    note: string;
  }>;
  headToHead: Array<{
    left: string;
    right: string;
    gist: string;
  }>;
  whatChangesThis: string[];
};

export type BundleSlug =
  | "karpathy-stack"
  | "swyx-agent-stack"
  | "mckay-wrigley-stack"
  | "simonw-stack"
  | "levelsio-stack"
  | "yampeleg-stack";

export type BundleRecord = {
  slug: BundleSlug;
  persona: string;
  personaHandle: string;
  personaUrl: string;
  name: string;
  summary: string;
  skills: SkillSlug[];
  source: string;
  sourceUrl: string;
  date: string;
};

export const bundles: Record<BundleSlug, BundleRecord> = {
  "karpathy-stack": {
    slug: "karpathy-stack",
    persona: "Andrej Karpathy",
    personaHandle: "@karpathy",
    personaUrl: "https://x.com/karpathy",
    name: "Karpathy Three-Tier Coding Stack",
    summary:
      "Three-layer strategy: Cursor for autocomplete and small edits, Claude Code/Codex for larger functional blocks and prototyping, GPT-5 Pro for hardest bugs. Went from 80% manual to 80% agent coding in one month. Coined 'vibe coding.'",
    skills: ["claude-code", "codex-cli"],
    source: "X thread: 'A few random notes from claude coding quite a bit'",
    sourceUrl: "https://x.com/karpathy/status/2015883857489522876",
    date: "2025-12",
  },
  "swyx-agent-stack": {
    slug: "swyx-agent-stack",
    persona: "swyx (Shawn Wang)",
    personaHandle: "@swyx",
    personaUrl: "https://x.com/swyx",
    name: "swyx Research-First Agent Stack",
    summary:
      "Claude Code for agentic coding, Firecrawl for deep web research. Latent Space podcast (top 3 AI podcast, 30-50th overall US Tech) features Claude Code team. Research-first approach: scrape, analyze, then build.",
    skills: ["claude-code", "firecrawl-mcp-server"],
    source: "Latent Space podcast + Scaling without Slop essay",
    sourceUrl: "https://www.latent.space/p/2026",
    date: "2026-01",
  },
  "mckay-wrigley-stack": {
    slug: "mckay-wrigley-stack",
    persona: "McKay Wrigley",
    personaHandle: "@mckaywrigley",
    personaUrl: "https://x.com/mckaywrigley",
    name: "McKay Wrigley Shipping Stack",
    summary:
      "Claude Code as primary agentic coding tool ('best AI coding tool in the world'). Ships full-stack apps with Cursor for autocomplete and Claude Code for agentic terminal sessions.",
    skills: ["claude-code"],
    source: "X post: 'CLAUDE CODE — Claude Code + Opus 4.5 is the best AI coding tool in the world'",
    sourceUrl: "https://x.com/mckaywrigley/status/1997403303161024895",
    date: "2026-02",
  },
  "simonw-stack": {
    slug: "simonw-stack",
    persona: "Simon Willison",
    personaHandle: "@simonw",
    personaUrl: "https://x.com/simonw",
    name: "Simon Willison Terminal Agents Stack",
    summary:
      "Uses Claude Code, Codex CLI, and Gemini CLI as 'terminal agents' for async code research. Fires off 2-3 research projects daily, checks back 10 minutes later. Coined the term 'terminal agents' for this category.",
    skills: ["claude-code", "codex-cli", "gemini-cli"],
    source: "X post: 'Claude Code, OpenAI Codex (CLI) and now Gemini CLI — we need a name for this category'",
    sourceUrl: "https://x.com/simonw/status/1937865080902934911",
    date: "2025-06",
  },
  "levelsio-stack": {
    slug: "levelsio-stack",
    persona: "Pieter Levels",
    personaHandle: "@levelsio",
    personaUrl: "https://x.com/levelsio",
    name: "Levelsio Server-First Coding Stack",
    summary:
      "SSH into a cheap VPS, install Claude Code, and 'raw dog dev on the server.' No IDE, no Git push/pull — Claude codes directly on production. Switched between Claude Code and Codex CLI depending on quality. Coined 'vibecoding on steroids.'",
    skills: ["claude-code", "codex-cli"],
    source: "X thread: 'HOW TO RAW DOG DEV ON THE SERVER'",
    sourceUrl: "https://x.com/levelsio/status/1957518592284717558",
    date: "2025-08",
  },
  "yampeleg-stack": {
    slug: "yampeleg-stack",
    persona: "Yam Peleg",
    personaHandle: "@Yampeleg",
    personaUrl: "https://x.com/Yampeleg",
    name: "Yam Peleg CLI Agents Field Report",
    summary:
      "Used Claude Code, Codex CLI, and Gemini CLI as daily drivers for one week covering coding, research, sysadmin, and automation. Claude Code has the best CLI, Codex is best for 'fire and forget' coding tasks, Gemini has the best web search.",
    skills: ["claude-code", "codex-cli", "gemini-cli"],
    source: "X post: 'CLI Agents | Week 1 Field Report: Claude Code vs Codex-max vs Gemini 3'",
    sourceUrl: "https://x.com/Yampeleg/status/1991608983292141681",
    date: "2025-12",
  },
};

export const bundleList = Object.values(bundles);

export function getBundle(slug: string): BundleRecord | undefined {
  return bundles[slug as BundleSlug];
}

export const skills: Record<SkillSlug, SkillRecord> = {
  "figma-mcp-server-guide": {
    slug: "figma-mcp-server-guide",
    name: "Figma MCP Server Guide",
    repo: "figma/mcp-server-guide",
    repoUrl: "https://github.com/figma/mcp-server-guide",
    readmeBranch: "main",
    official: true,
    status: "active",
    summary:
      "Official Figma MCP. Trust leader with triple partnership (OpenAI Codex, GitHub Copilot, Claude Code), Code Connect integration, bidirectional since Feb 2026. 14 tools + 18 prompt resources, two server modes.",
    verdict:
      "The trust leader with unmatched long-term durability — triple partnership with OpenAI Codex, GitHub Copilot, and Claude Code. Wins specifically when your team has Code Connect configured. Without it, Framelink produces cleaner context.",
    docsUrl:
      "https://help.figma.com/hc/en-us/articles/35281385065751-Figma-MCP-collection-Compare-Figma-s-remote-and-desktop-MCP-servers",
    githubStars: "409",
    relatedCategories: ["ux-ui"],
    strengths: [
      "Triple partnership with OpenAI Codex, GitHub Copilot, and Claude Code — unmatched long-term durability signal",
      "Code Connect maps Figma components directly to your codebase components — no other server has this",
      "14 tools + 18 prompt resources vs Framelink's 2 tools — deeper capability when needed",
      "Two deployment variants (Remote + Desktop) signal sustained platform investment",
      "Bidirectional since Feb 2026: generate_figma_design captures running UI to editable Figma frames",
    ],
    weaknesses: [
      "Requires Professional plan ($15/seat/month) — Framelink works on free plans",
      "Without Code Connect, produces prescriptive React/Tailwind output with hardcoded values like 'leading-[22.126px]' (CTO Guide)",
      "Low guide-repo star count (409) is misleading — the server is embedded in Figma's infrastructure",
    ],
    evidence: [
      {
        quality: "strong",
        title: "AIMultiple: Figma MCP Server Tested — reduces initial dev time 50-70%",
        url: "https://research.aimultiple.com/figma-to-code/",
        date: "2026-02",
        engagement: "Independent benchmark by AIMultiple",
        who: "AIMultiple (independent tech analyst)",
        gist: "Figma MCP converts designs to functional code with notable inaccuracies requiring oversight. Reduces initial dev time 50-70% for teams with design system maturity.",
      },
      {
        quality: "strong",
        title: "TechBuzz: Figma Opens Design Code to AI Agents via Expanded MCP Server",
        url: "https://www.techbuzz.ai/articles/figma-opens-design-code-to-ai-agents-via-expanded-mcp-server",
        date: "2026-02",
        engagement: "Tech news coverage",
        who: "TechBuzz (independent tech news)",
        gist: "MCP server now supports Figma Make. Reads native properties: variables, design tokens, components, variants, auto layout rules.",
      },
      {
        quality: "strong",
        title: "CTO Guide: teams with mature design systems and Code Connect should use Official",
        url: "https://ctoguide.dev/figma-mcp-comparison",
        date: "2026-03",
        engagement: "Independent comparison by Alex Bobes",
        who: "Alex Bobes (CTO Guide, independent tech analyst)",
        gist: "CTO Guide recommends Official MCP specifically for 'teams with mature design systems and Code Connect configured.' Code Connect is the killer differentiator — maps Figma components to actual codebase components.",
      },
    ],
  },
  framelink: {
    slug: "framelink",
    name: "Framelink / Figma-Context-MCP",
    repo: "GLips/Figma-Context-MCP",
    repoUrl: "https://github.com/GLips/Figma-Context-MCP",
    readmeBranch: "main",
    npmPackage: "figma-context-mcp",
    official: false,
    status: "active",
    summary:
      "Community standard for feeding Figma design context to AI coding agents. 13.7K stars, framework-agnostic descriptive JSON output, listed in Figma's own help docs.",
    verdict:
      "Best read-only design-to-code MCP. Use this unless you have Code Connect configured — 25% smaller output than Official, avoids prescriptive code that poisons LLM context.",
    relatedCategories: ["ux-ui"],
    strengths: [
      "Most-starred Figma MCP by 2x+ (13.7K stars)",
      "Listed in Figma's official help docs as recommended third-party server",
      "Framework-agnostic descriptive JSON — lets agents use your codebase patterns",
      "25% smaller output than Official MCP (CTO Guide benchmark)",
      "24 contributors — healthy community, not bus-factor-1",
    ],
    weaknesses: [
      "Read-only — cannot create or modify Figma elements",
      "CVE-2025-15061 (RCE, patched) — resolved but worth noting",
      "npm downloads (579/wk) oddly low vs 13.7K stars — likely installed via config rather than npm",
    ],
    githubStars: "14K+",
    evidence: [
      {
        quality: "strong",
        title: "Figma official docs list Framelink as recommended third-party MCP server",
        url: "https://help.figma.com/hc/en-us/articles/35281385065751-Figma-MCP-collection-Compare-Figma-s-remote-and-desktop-MCP-servers",
        date: "2026-02",
        engagement: "Platform endorsement in official documentation",
        who: "Figma (platform provider)",
        gist: "Figma's own help docs list Framelink as a recommended third-party server. Platform endorsement is the strongest trust signal possible in this category.",
      },
      {
        quality: "strong",
        title: "CTO Guide: Framelink produces 25% smaller output than Figma's official MCP",
        url: "https://ctoguide.dev/figma-mcp-comparison",
        date: "2026-03",
        engagement: "Independent comparison by Alex Bobes",
        who: "Alex Bobes (CTO Guide, independent tech analyst)",
        gist: "Framelink's descriptive JSON output is 25% smaller than Official. Avoids prescriptive code that 'poisons the context — the LLM sees auto-generated code structure and mimics it instead of using your codebase's patterns.'",
      },
      {
        quality: "moderate",
        title: "LogRocket validates simplicity-vs-depth trade-off favoring Framelink",
        url: "https://blog.logrocket.com/figma-mcp-comparison",
        date: "2026-03",
        engagement: "Independent blog comparison by LogRocket",
        who: "LogRocket (independent developer tools publication)",
        gist: "LogRocket independently validates the simplicity-vs-depth trade-off: Framelink's descriptive JSON vs Official's prescriptive output. Confirms Framelink as the simpler, cleaner option for most workflows.",
      },
      {
        quality: "moderate",
        title: "Stackademic comparison confirms Framelink as community standard",
        url: "https://stackademic.com/figma-mcp-comparison",
        date: "2026-03",
        engagement: "Independent blog comparison",
        who: "Stackademic (independent tech publication)",
        gist: "Independent comparison identifying Framelink as the community standard for Figma design context in AI coding workflows.",
      },
    ],
  },
  "figma-use": {
    slug: "figma-use",
    name: "Figma-use",
    repo: "dannote/figma-use",
    repoUrl: "https://github.com/dannote/figma-use",
    readmeBranch: "master",
    official: false,
    status: "active",
    summary:
      "CLI-first write-access Figma tool via Chrome DevTools Protocol. Strongest HN validation (115pt, 37 comments) of any write-access tool, but solo maintainer and OpenPencil pivot risk.",
    verdict:
      "Conditional pick. Strongest HN validation in the write-access lane, but solo maintainer and potential OpenPencil pivot raise durability concerns. Use if you want CLI-first workflow without a Figma plugin.",
    relatedCategories: ["ux-ui"],
    strengths: [
      "Strongest HN validation of any write-access tool (115 points, 37 comments)",
      "CLI-first + Chrome DevTools Protocol — architecturally distinct (no plugin, no proxy)",
      "100+ commands, both CLI and JSX modes",
    ],
    weaknesses: [
      "Solo maintainer — bus factor 1",
      "185 npm/week is low compared to competitors",
      "OpenPencil announcement in latest commits suggests maintainer attention may be shifting",
    ],
    githubStars: "501",
    evidence: [
      {
        quality: "moderate",
        title: "figma-use: 100+ commands, full read/write access via Chrome DevTools Protocol",
        url: "https://github.com/dannote/figma-use",
        date: "2026-01",
        engagement: "Active GitHub development",
        who: "dannote (independent developer)",
        gist: "Key differentiator: Figma's official MCP can read but can't modify. figma-use provides full write access via CDP — 90+ MCP tools for creating shapes, text, components.",
        selfReported: true,
      },
      {
        quality: "strong",
        title: "Show HN: Figma-use — CLI to control Figma for AI agents (115 points, 37 comments)",
        url: "https://news.ycombinator.com/item?id=46665169",
        date: "2026-01",
        engagement: "115 points, 37 comments on HN front page",
        who: "Hacker News community (substantive discussion from multiple independent commenters)",
        gist: "Hit HN front page. Community discussion covered CLI vs MCP trade-offs, design system integration, Pro license requirements. Multiple independent developers engaged.",
      },
      {
        quality: "moderate",
        title: "Into Design Systems: Claude Code designs in Figma — credits figma-use as foundational",
        url: "https://www.intodesignsystems.com/blog/claude-code-figma-no-mcp",
        date: "2026-02",
        engagement: "Independent blog post, spawned derivative project (figma-cli, 303 stars)",
        who: "Sil Bormüller (independent developer, intodesignsystems.com)",
        gist: "Built an alternative Figma CLI inspired by figma-use, explicitly crediting it as foundational. Derivative project (silships/figma-cli) has 303 stars and references figma-use in code.",
      },
    ],
  },
  vibma: {
    slug: "vibma",
    name: "Vibma",
    repo: "ufira-ai/Vibma",
    repoUrl: "https://github.com/ufira-ai/Vibma",
    readmeBranch: "main",
    official: false,
    status: "watch",
    summary:
      "Design-system-forward Figma MCP with harness engineering guardrails and model-specific benchmarks. 10 contributors, very active development, but near-zero independent validation.",
    verdict:
      "Emerging. Only tool publishing model-specific design quality benchmarks. Harness engineering angle is genuinely differentiated, but HN Show got only 2 points and no independent reviews found.",
    relatedCategories: ["ux-ui"],
    strengths: [
      "Only tool publishing model-specific design quality benchmarks for Figma MCP",
      "Harness engineering steers agents toward Figma design best practices",
      "10 contributors and multiple daily commits — very active development",
    ],
    weaknesses: [
      "HN Show got only 2 points / 2 comments — community hasn't noticed",
      "No independent comparisons, reviews, or practitioner testimonials found",
      "Built on top of cursor-talk-to-figma-mcp — derivative, not foundational",
    ],
    githubStars: "385",
    evidence: [
      {
        quality: "moderate",
        title: "Vibma: design-system-specific Figma automation via MCP",
        url: "https://github.com/ufira-ai/Vibma",
        date: "2026-02",
        engagement: "385 GitHub stars, 27 forks. Show HN got 2 points.",
        who: "Ufira AI (independent team, forked from cursor-talk-to-figma-mcp)",
        gist: "Watch-status: 12-day-old project with fast initial star growth but zero independent reviews, blog posts, or social media coverage yet. No Reddit, Twitter, or YouTube presence found.",
        selfReported: true,
      },
      {
        quality: "moderate",
        title: "Show HN: Vibma — let agents create professional design system in Figma, directly",
        url: "https://news.ycombinator.com/item?id=47217411",
        date: "2026-03",
        engagement: "Show HN post, low engagement",
        who: "Ufira AI team (Show HN submission)",
        gist: "Show HN launch of Vibma. Very early-stage with minimal community discussion. Confirms watch status.",
        selfReported: true,
      },
    ],
  },
  "cursor-talk-to-figma": {
    slug: "cursor-talk-to-figma",
    name: "Cursor Talk to Figma",
    repo: "nicepkg/cursor-talk-to-figma-mcp",
    repoUrl: "https://github.com/nicepkg/cursor-talk-to-figma-mcp",
    readmeBranch: "main",
    npmPackage: "cursor-talk-to-figma-mcp",
    official: false,
    status: "active",
    summary:
      "Enterprise-trust write-access Figma MCP. Built by Grab ($12B+ market cap). Bypasses Figma API rate limits via plugin architecture. 6.5K stars, 696 forks — highest fork count in write-access lane.",
    verdict:
      "Best general-purpose write-access Figma MCP for individual developers and small teams. More accessible than Console MCP, works on free Figma plans, lower setup complexity. Dropped to #4 as Console MCP's Uber validation is stronger enterprise evidence.",
    relatedCategories: ["ux-ui"],
    strengths: [
      "Built by Grab ($12B+ market cap) — genuine enterprise credibility",
      "6.5K stars, 696 forks — highest fork count in write-access lane, signals active ecosystem",
      "Plugin architecture bypasses Figma API rate limits entirely (CTO Guide confirmed)",
      "Works on free Figma plans — zero cost barrier",
      "Claude Code support added March 2026",
    ],
    weaknesses: [
      "Only 5 contributors — concentrated maintainership",
      "Console MCP has 25x npm downloads and 3x the tool surface",
      "Lacks variable management, cloud mode, and enterprise-scale spec generation",
    ],
    githubStars: "6,486",
    evidence: [
      {
        quality: "strong",
        title: "CTO Guide recommends Cursor Talk to Figma for free-plan users",
        url: "https://alexbobes.com/tech/figma-mcp-the-cto-guide-to-design-to-code-in-2026/",
        date: "2026-03",
        engagement: "Independent comparison by Alex Bobes (CTO, Extremoo)",
        who: "Alex Bobes (CTO, Extremoo — independent tech analyst)",
        gist: "CTO Guide independently recommends it for free-plan users because it bypasses Figma API rate limits entirely via plugin architecture, not REST API.",
      },
      {
        quality: "moderate",
        title: "Designer testimonial: 'nearly pixel-perfect flow with a single prompt in five minutes'",
        url: "https://medium.com/@mariamargarida/",
        date: "2026-03",
        engagement: "Independent designer testimonial on Medium",
        who: "Maria Margarida (product designer, independent practitioner)",
        gist: "Product designer reports 'nearly pixel-perfect flow with a single prompt in just five minutes' using Grab's Cursor Talk to Figma. Independent practitioner validation of the write-access workflow.",
      },
      {
        quality: "moderate",
        title: "Designer testimonial: rapid prototyping with Cursor + Figma MCP",
        url: "https://news.ycombinator.com/item?id=46665169",
        date: "2026-01",
        engagement: "HN comment thread",
        who: "Independent designer (HN commenter)",
        gist: "An engineer sat down with a designer and set up Cursor Talk to Figma. The designer 'was so excited to rapidly prototype with natural language.'",
      },
    ],
  },
  "figma-console-mcp": {
    slug: "figma-console-mcp",
    name: "Figma Console MCP",
    repo: "nicepkg/figma-console-mcp",
    repoUrl: "https://github.com/nicepkg/figma-console-mcp",
    readmeBranch: "main",
    npmPackage: "figma-console-mcp",
    official: false,
    status: "active",
    summary:
      "Most comprehensive Figma MCP by tool count (59+). Uber Engineering Blog validates production uSpec usage across 7 stacks. Highest npm downloads (14.5K/week) of any Figma MCP. Unique cloud relay for web AI clients.",
    verdict:
      "The enterprise write-access leader. Uber's production uSpec validates this at scale — automated component specs across 7 stacks, accessibility in under 2 minutes. Cloud relay is unique for web AI clients.",
    relatedCategories: ["ux-ui"],
    strengths: [
      "Uber uSpec production usage — strongest enterprise validation in the category",
      "59+ tools including 11 variable management, 5 component management — broadest surface area",
      "14.5K npm/week — highest download count of any Figma MCP (25x Framelink)",
      "Cloud relay mode: web AI clients can write to Figma without local Node.js",
      "Design linting (WCAG + quality checks) added v1.13.0",
      "Actively maintained — pushed 2026-03-16",
    ],
    weaknesses: [
      "14.5K npm vs 1K stars is an unusual ratio — may be CI-pipeline-driven",
      "Self-reported tool counts from creator (TJ Pitre, Southleft CEO), though objectively verifiable",
    ],
    githubStars: "1,033",
    evidence: [
      {
        quality: "strong",
        title: "Uber Engineering Blog: uSpec production usage with Figma Console MCP",
        url: "https://www.uber.com/blog/uspec-figma-console-mcp",
        date: "2026-03",
        engagement: "Uber Engineering Blog (publicly traded company, $170B+ market cap)",
        who: "Uber Engineering (independent, production deployment)",
        gist: "Uber details production uSpec usage: automated component specs across 7 implementation stacks, complete accessibility specs in under 2 minutes, all local (no data leaves network). Strongest enterprise validation in the entire category.",
      },
      {
        quality: "moderate",
        title: "Southleft comparison: 'Console MCP gives you the keys to the building'",
        url: "https://southleft.com/insights/ai/figma-mcp-vs-figma-console-mcp/",
        date: "2026-03",
        engagement: "Creator comparison — Official vs Console MCP",
        who: "TJ Pitre, Southleft CEO (maintainer)",
        gist: "Southleft comparison: Official MCP is read-only window, Console MCP is full access. 59+ tools vs 14, WebSocket real-time awareness, variable management where Official has zero.",
        selfReported: true,
      },
      {
        quality: "moderate",
        title: "Figma Console MCP: 59+ tools, cloud relay, 14.5K npm/week",
        url: "https://github.com/nicepkg/figma-console-mcp",
        date: "2026-03",
        engagement: "1,033 GitHub stars, 14,573 npm/week",
        who: "Southleft (maintainer team)",
        gist: "59+ tools, cloud relay mode for web AI clients, WCAG design linting. Highest npm downloads of any Figma MCP.",
        selfReported: true,
      },
    ],
  },
  "penpot-mcp": {
    slug: "penpot-mcp",
    name: "Penpot MCP",
    repo: "penpot/penpot-mcp-server",
    repoUrl: "https://github.com/penpot/penpot-mcp-server",
    readmeBranch: "main",
    npmPackage: "penpot-mcp",
    official: true,
    status: "watch",
    summary:
      "Only fully open-source design platform with an official MCP server. Smashing Magazine coverage. Pre-beta with slowing development.",
    verdict:
      "The open-source design MCP lane exists but isn't production-ready yet. Watch item — if development resumes and beta launches, it moves up.",
    relatedCategories: ["ux-ui"],
    strengths: [
      "Only fully open-source design platform with an official MCP",
      "Smashing Magazine coverage (Jan 2026) — strong independent signal",
      "Design-expressed-as-code approach with bidirectional workflows",
    ],
    weaknesses: [
      "Pre-beta — active experiment with volunteer recruitment",
      "No commits in 26 days while competitors ship daily",
      "Development appears to be slowing",
    ],
    githubStars: "225",
    evidence: [
      {
        quality: "strong",
        title: "Smashing Magazine: Penpot MCP for bidirectional design-code workflows",
        url: "https://smashingmagazine.com/2026/01/penpot-mcp-design-code",
        date: "2026-01",
        engagement: "Major web design publication coverage",
        who: "Smashing Magazine (independent, major web design publication)",
        gist: "Smashing Magazine covered Penpot MCP's bidirectional design-code approach. Strong independent signal from a publication trusted by the design community.",
      },
      {
        quality: "moderate",
        title: "Penpot MCP: bidirectional design-code, open-source, pre-beta",
        url: "https://github.com/penpot/penpot-mcp-server",
        date: "2026-02",
        engagement: "225 stars, 269 npm/week, last commit 2026-02-18",
        who: "Penpot team (official)",
        gist: "Official open-source design platform MCP. Pre-beta with slowing development — no commits in 26 days. 'Active experiment' with volunteer recruitment.",
        selfReported: true,
      },
    ],
  },
  "firecrawl-mcp-server": {
    slug: "firecrawl-mcp-server",
    name: "Firecrawl MCP Server",
    repo: "firecrawl/firecrawl-mcp-server",
    repoUrl: "https://github.com/firecrawl/firecrawl-mcp-server",
    readmeBranch: "main",
    npmPackage: "firecrawl-mcp",
    official: true,
    status: "active",
    summary:
      "Official Firecrawl MCP for scraping, extraction, and deep research workflows. 50K+ npm weekly downloads, backed by $14.5M Series A.",
    verdict:
      "Best research-side skill when the job is business intelligence across messy public websites. Independent benchmark leader at 83% accuracy.",
    docsUrl: "https://firecrawl.dev",
    productUrl: "https://www.firecrawl.dev/playground",
    relatedCategories: ["product-business-development", "search-news"],
    strengths: [
      "Official provider support",
      "Strong extraction and scraping shape",
      "Best fit when research means real web pages, not just search snippets",
    ],
    weaknesses: [
      "Not the system of record itself",
      "Needs a downstream workspace if you want operating memory",
      "AGPL-3.0 license may complicate enterprise adoption",
    ],
    githubStars: "5.8K+",
    metrics: {
      downloads: [
        { date: "2026-03", value: 50554 },
      ],
      stars: [
        { date: "2024-06", value: 8000 },
        { date: "2024-09", value: 15000 },
        { date: "2024-12", value: 25000 },
        { date: "2025-03", value: 35000 },
        { date: "2025-06", value: 45000 },
        { date: "2025-09", value: 55000 },
        { date: "2025-12", value: 63000 },
        { date: "2026-03", value: 5780 },
      ],
    },
    evidence: [
      {
        quality: "strong",
        title: "AIMultiple MCP Benchmark: Firecrawl fastest MCP for web search — 7s avg, 83% accuracy",
        url: "https://aimultiple.com/browser-mcp",
        date: "2026-02",
        engagement: "Independent benchmark, multiple MCPs tested",
        who: "AIMultiple (independent tech analyst)",
        gist: "Firecrawl was the fastest MCP for web search and extraction with 7-second average run time and 83% accuracy. 64.8% success on browser automation tasks.",
      },
      {
        quality: "strong",
        title: "Firecrawl raises $14.5M Series A, 350K+ developers, YC-backed",
        url: "https://blog.devgenius.io/firecrawl-for-ai-agents-skills-vs-mcp-servers-for-web-scraping-051b701b28f9",
        date: "2026-02",
        engagement: "Dev Genius article, adoption metrics",
        who: "JP Caparas (Dev Genius), citing YC funding round",
        gist: "YC-backed, $14.5M Series A (Aug 2025). 350K+ developers using API. Returns clean markdown optimized for LLMs.",
      },
      {
        quality: "strong",
        title: "AIMultiple 2026 Agentic Search Benchmark — Firecrawl #2 with Agent Score 14.58",
        url: "https://aimultiple.com/agentic-search",
        date: "2026-02",
        engagement: "100 queries, GPT-5.2 judge, bootstrap resampling",
        who: "AIMultiple (independent research firm)",
        gist: "Agent Score 14.58 (#2 of 8). Statistically tied with Brave (#1) and Exa (#3). Only tool combining search + scrape + agent in one platform.",
      },
      {
        quality: "strong",
        title: "Firecrawl main repo hits 93.7K GitHub stars — most popular in search/scrape category",
        url: "https://github.com/mendableai/firecrawl",
        date: "2026-03-16",
        engagement: "93,708 stars, 6,451 forks, 136+ contributors",
        who: "Open-source community",
        gist: "93K stars is exceptional — 50% more than the next competitor (Crawl4AI at 62K). Community has voted with their stars. Active daily commits.",
      },
      {
        quality: "strong",
        title: "v2.8.0: parallel agent execution, Spark model family, Browser Sandbox",
        url: "https://www.firecrawl.dev/changelog",
        date: "2026-02",
        engagement: "Official changelog, verifiable features",
        who: "Firecrawl (official, verifiable)",
        gist: "Parallel agent execution for thousands of simultaneous queries. Spark-1-pro for complex multi-domain research, spark-1-mini 60% cheaper. Browser Sandbox with Playwright for interactive automation. 3+ major features in Feb alone.",
      },
      {
        quality: "strong",
        title: "Three independent Crawl4AI vs Firecrawl comparisons validate positioning",
        url: "https://www.capsolver.com/blog/AI/crawl4ai-vs-firecrawl",
        date: "2026-01",
        engagement: "Three independent review sites",
        who: "Capsolver, Bright Data, Apify (all independent)",
        gist: "Three independent sources reaching the same conclusion: Firecrawl wins on ease of use, enterprise compliance, combined search+scrape. Crawl4AI wins on license, cost, control. Strong signal validating both tools' positioning.",
      },
      {
        quality: "strong",
        title: "GrowthMethod: Firecrawl for competitive intelligence BD workflows",
        url: "https://growthmethod.com/firecrawl-mcp-server/",
        date: "2026-03",
        engagement: "Independent BD workflow documentation",
        who: "GrowthMethod (independent)",
        gist: "Direct BD workflow mapping: competitive pricing analysis, product launch monitoring, market campaign tracking. B2B SaaS case study: identified market opportunities 2-3 weeks ahead.",
      },
    ],
  },
  "exa-mcp-server": {
    slug: "exa-mcp-server",
    name: "Exa MCP Server",
    repo: "exa-labs/exa-mcp-server",
    repoUrl: "https://github.com/exa-labs/exa-mcp-server",
    npmPackage: "exa-js",
    readmeBranch: "main",
    official: true,
    status: "active",
    summary:
      "Official Exa MCP for fast web search and crawling when the workflow is search-first rather than page-ops-first.",
    verdict:
      "Best search-heavy research skill, but not as strong as Firecrawl once the workflow leans into extraction and page actions.",
    relatedCategories: ["product-business-development", "search-news"],
    strengths: [
      "Fast search-first workflow",
      "Official provider support",
      "Good fit for discovery and initial market mapping",
    ],
    weaknesses: [
      "Less differentiated when you need operational follow-through",
      "Weaker than operating-surface servers for actually running the business",
      "Closed-source, cloud-only — no self-hosting option",
      "Pricing ~10x more expensive than Firecrawl at comparable usage",
    ],
    githubStars: "4.0K+",
    evidence: [
      {
        quality: "moderate",
        title: "Feb 2026 API updates — Exa Fast sub-500ms, Exa Deep agentic, free MCP tier",
        url: "https://exa.ai/docs/changelog/february-2026-api-updates",
        date: "2026-02",
        engagement: "Official changelog",
        who: "Exa (official)",
        gist: "Exa Fast claims 'most accurate search API sub-500ms.' Exa Deep adds agentic multi-search. New maxAgeHours for freshness control. Free MCP tier launched. If independently verified, closes latency gap with Brave.",
        selfReported: true,
      },
      {
        quality: "strong",
        title: "Exa MCP server adoption — 4,022 stars, 5x more than Brave",
        url: "https://github.com/exa-labs/exa-mcp-server",
        date: "2026-03-15",
        engagement: "4,022 stars, 303 forks",
        who: "GitHub community",
        gist: "Strongest MCP adoption in the search category. 5x more stars than Brave's MCP server (781). Suggests strong developer preference for Exa's MCP integration.",
      },
      {
        quality: "moderate",
        title: "FlowHunt MCP Server Review: Exa scores 5/10",
        url: "https://www.flowhunt.io/mcp-servers/exa/",
        date: "2025-12",
        engagement: "Independent MCP directory review with scoring",
        who: "FlowHunt (independent MCP review platform)",
        gist: "Scored 5/10. Praised setup simplicity and MIT license. Criticized lack of documentation on prompts, resources, and tools. No sampling support.",
      },
      {
        quality: "moderate",
        title: "MarkTechPost: Tutorial on using Exa MCP Server with Claude Desktop",
        url: "https://www.marktechpost.com/2025/04/30/tutorial-on-seamlessly-accessing-any-linkedin-profile-with-exa-mcp-server-and-claude-desktop-using-the-model-context-protocol-mcp/",
        date: "2025-04",
        engagement: "Tutorial with step-by-step walkthrough",
        who: "Asif Razzaq (MarkTechPost, independent tech news)",
        gist: "Step-by-step tutorial for using exa-mcp-server with Claude Desktop to access LinkedIn profiles via MCP. No sponsorship disclosure.",
      },
      {
        quality: "moderate",
        title: "Alan He: Claude Code with Exa MCP — hands-on review",
        url: "https://en.1991421.cn/2026/01/14/claude-code-with-exa-mcp/",
        date: "2026-01",
        engagement: "Personal developer blog review",
        who: "Alan He (independent developer)",
        gist: "Tested Exa MCP with Claude Code for a day and found it 'quite good,' praising search quality and speed. Covers pricing, installation, and practical usage.",
      },
      {
        quality: "moderate",
        title: "PulseMCP: Exa ranked Top Pick MCP server, #52 globally",
        url: "https://www.pulsemcp.com/servers/exa",
        date: "2026-02",
        engagement: "Estimated 706K visitors, Top Pick badge",
        who: "PulseMCP (independent MCP directory)",
        gist: "Listed as Top Pick. Released Nov 27, 2024. Ranked #52 globally with estimated 706K visitors. Independent aggregator positioning.",
      },
      {
        quality: "strong",
        title: "Exa Launch HN — 412 points, 133 comments, massive community validation",
        url: "https://news.ycombinator.com/item?id=43906841",
        date: "2025",
        engagement: "412 points, 133 comments",
        who: "HN community",
        gist: "412pts is exceptional traction for a search API launch (top 0.1% of HN posts). Launched as The web as a database — neural search engine for AI.",
      },
      {
        quality: "strong",
        title: "AIMultiple 2026 Agentic Search Benchmark — Exa #3 with Agent Score 14.39",
        url: "https://aimultiple.com/agentic-search",
        date: "2026-02",
        engagement: "100 queries, GPT-5.2 judge, bootstrap resampling",
        who: "AIMultiple (independent research firm)",
        gist: "Agent Score 14.39 (#3 of 8). Statistically tied with Brave and Firecrawl in the top tier. Independent benchmark validation.",
      },
      {
        quality: "strong",
        title: "Nvidia-backed $85M Series B at $700M valuation",
        url: "https://siliconangle.com/2025/09/03/nvidia-backs-85m-round-ai-search-startup-exa/",
        date: "2025-09-03",
        engagement: "SiliconANGLE coverage, 16pts HN",
        who: "SiliconANGLE (independent tech news)",
        gist: "Nvidia investment signals infrastructure-grade credibility. $700M valuation validates market position. Exa serves web search to thousands of companies including Cursor.",
      },
      {
        quality: "moderate",
        title: "Exa scores 81% vs Tavily 71% on complex retrieval — independent comparison",
        url: "https://brightdata.com/blog/ai/exa-alternatives",
        date: "2026",
        engagement: "Editorial",
        who: "Bright Data (independent data platform)",
        gist: "Exa scores 81% vs 71% on complex retrieval, runs 2-3x faster, and adds people, company, and code search that Tavily lacks.",
      },
      {
        quality: "strong",
        title: "AIMultiple MCP Benchmark: Exa 23% success rate — worst of 9 tested MCP servers",
        url: "https://aimultiple.com/browser-mcp",
        date: "2026-02",
        engagement: "Independent benchmark, 9 MCP servers tested",
        who: "AIMultiple (independent research firm)",
        gist: "23% MCP success rate vs Firecrawl's 83%. 15s avg vs Firecrawl's 7s. MCP-specific problem — Exa's core API performs better when consumed directly. Timeout and Cloudflare issues on hosted endpoint (GitHub #6878).",
      },
    ],
  },
  "mcp-atlassian": {
    slug: "mcp-atlassian",
    name: "MCP Atlassian",
    repo: "sooperset/mcp-atlassian",
    repoUrl: "https://github.com/sooperset/mcp-atlassian",
    readmeBranch: "main",
    pypiPackage: "mcp-atlassian",
    official: false,
    status: "active",
    summary:
      "Community-built MCP server for Jira and Confluence with 72 tools. Dual implementation alongside official Atlassian Rovo MCP (now GA).",
    verdict:
      "#2 overall, #1 enterprise operating surface for teams on the Atlassian stack. Highest stars (4.6K), deepest tool set (72 tools), 139K PyPI weekly downloads (primary channel). On-prem/Data Center support is the key moat vs official Rovo MCP.",
    relatedCategories: ["product-business-development"],
    strengths: [
      "Deepest tool set: 72 tools across Jira and Confluence",
      "Highest stars of any business MCP server (4.6K+)",
      "Dual path: community MIT server + official Atlassian Rovo GA",
      "Supports Cloud, Server, and Data Center deployments",
      "Most active dev cadence: 69 releases, ~28.5 commits/week",
    ],
    weaknesses: [
      "72 tools approaching context-flooding threshold",
      "165 open issues suggests growing pains at scale",
      "Official Rovo server may eventually supersede community version",
    ],
    githubStars: "4.6K+",
    evidence: [
      {
        quality: "strong",
        title: "Snyk independent review: most comprehensive PM MCP server, 31+ tools at time of review",
        url: "https://snyk.io/blog/mcp-server-security/",
        date: "2026-01",
        engagement: "Independent security vendor review",
        who: "Snyk (independent security platform)",
        gist: "Snyk rated mcp-atlassian the most comprehensive project management MCP server. Tool count has since grown from 31 to 72.",
      },
      {
        quality: "strong",
        title: "4,621 stars, 1K forks, 118 contributors — highest community traction for business MCP",
        url: "https://github.com/sooperset/mcp-atlassian",
        date: "2026-03",
        engagement: "GitHub metrics",
        who: "GitHub (public metrics)",
        gist: "4,621 stars, 1,008 forks, 118 contributors, 69 releases. Latest v0.21.0 (2026-03-02). Most active business MCP server by all community metrics.",
        selfReported: true,
      },
      {
        quality: "strong",
        title: "Community vs Official dual-path: sooperset for flexibility/on-prem, Rovo for enterprise/zero-setup",
        url: "https://www.atlassian.com/platform/remote-mcp-server",
        date: "2026-03",
        engagement: "Official platform announcement + community comparison",
        who: "Atlassian (official) + community analysis",
        gist: "Clear segmentation: sooperset for flexibility/on-prem/DC, Rovo for enterprise/zero-setup/Cloud. Both paths active and complementary.",
      },
      {
        quality: "moderate",
        title: "Futurum analyst report: Atlassian MCP positioned as strategic enterprise infrastructure",
        url: "https://futurumresearch.com/research-notes/atlassian/",
        date: "2026-03",
        engagement: "Independent analyst report",
        who: "Futurum Group (independent tech analyst)",
        gist: "Independent validation of Atlassian's MCP positioning as strategic enterprise infrastructure, not just a developer tool.",
      },
      {
        quality: "moderate",
        title: "HN discussion: 'make Jira bearable' with mcp-atlassian — 23pts, 19 comments",
        url: "https://news.ycombinator.com/",
        date: "2026-03",
        engagement: "23 points, 19 comments",
        who: "Hacker News community",
        gist: "HN discussion validates core user need: making Jira bearable through AI agent integration. 23 points, 19 comments shows engaged niche interest.",
      },
      {
        quality: "strong",
        title: "PyPI: 139,424 weekly downloads — primary distribution channel under-reported",
        url: "https://pypi.org/project/mcp-atlassian/",
        date: "2026-03-16",
        engagement: "139K weekly, 788K monthly PyPI downloads",
        who: "PyPI (public metrics)",
        gist: "~800K monthly PyPI downloads is the primary distribution channel. npm (2.8K/week) is a secondary wrapper. Discover stage under-reported this by focusing on npm.",
      },
      {
        quality: "strong",
        title: "PulseMCP: #14 globally, 140K weekly visitors, 2.3M all-time",
        url: "https://www.pulsemcp.com/servers/sooperset-atlassian",
        date: "2026-03-16",
        engagement: "PulseMCP metrics: #14 global rank",
        who: "PulseMCP (independent MCP directory)",
        gist: "Highest PulseMCP interest signal in the product-business-development category by far. 140K estimated weekly visitors, 2.3M all-time.",
      },
    ],
  },
  "notion-mcp-server": {
    slug: "notion-mcp-server",
    name: "Notion MCP Server",
    repo: "makenotion/notion-mcp-server",
    repoUrl: "https://github.com/makenotion/notion-mcp-server",
    readmeBranch: "main",
    npmPackage: "notion-mcp-server",
    official: true,
    status: "active",
    summary:
      "Official Notion MCP server with hosted OAuth, token-optimized Markdown responses, and 22 tools for page/database/search operations.",
    verdict:
      "#1 operating surface for product teams — 47K+ npm weekly downloads (17x Atlassian) is the strongest objective adoption signal. Notion 3.3 Custom Agents ecosystem positions MCP as multi-tool hub.",
    relatedCategories: ["product-business-development"],
    strengths: [
      "Official (makenotion org), MIT license",
      "47,612 npm weekly downloads — highest real-world install adoption",
      "Hosted OAuth — no local setup required",
      "Token-optimized Markdown responses for LLM-native interaction",
      "Integrated into Google ADK documentation",
    ],
    weaknesses: [
      "Narrower scope than Atlassian (one platform vs Jira + Confluence)",
      "Notion may sunset local MCP server in favor of remote-only",
      "GitHub issues 'not actively monitored' per repo notice",
    ],
    githubStars: "4.1K+",
    evidence: [
      {
        quality: "strong",
        title: "47,612 npm weekly downloads — 79x more than Google Workspace MCP",
        url: "https://www.npmjs.com/package/notion-mcp-server",
        date: "2026-03",
        engagement: "npm registry public metrics",
        who: "npm (public download metrics)",
        gist: "47,612 weekly downloads vs 604 for Google Workspace MCP. Highest real-world install adoption of any business MCP server.",
      },
      {
        quality: "strong",
        title: "4,054 stars, official makenotion org — strong community traction",
        url: "https://github.com/makenotion/notion-mcp-server",
        date: "2026-03",
        engagement: "GitHub metrics",
        who: "GitHub (public metrics)",
        gist: "4,054 stars, official org, MIT license. v2.0/v2.1 shows maturation with breaking changes handled. Hosted OAuth since July 2025.",
        selfReported: true,
      },
      {
        quality: "strong",
        title: "Notion 3.3 Custom Agents: 21,000+ agents created in early access",
        url: "https://www.notion.com/blog/custom-agents",
        date: "2026-02",
        engagement: "21,000+ agents in early access",
        who: "Notion (official)",
        gist: "Notion 3.3 Custom Agents (Feb 24, 2026) positions the MCP server as the hub of a multi-tool agent ecosystem connecting Slack, Linear, Figma, HubSpot via MCP. 21,000+ agents created in early access.",
        selfReported: true,
      },
      {
        quality: "moderate",
        title: "Google ADK documentation features Notion MCP as integration example",
        url: "https://google.github.io/adk-docs/",
        date: "2026-03",
        engagement: "Platform endorsement in official docs",
        who: "Google ADK (official documentation)",
        gist: "Notion MCP Server integrated into Google ADK documentation as a featured MCP integration example. Cross-platform endorsement.",
      },
      {
        quality: "strong",
        title: "Enterprise adoption: Ramp and Remote — quantified production outcomes",
        url: "https://www.notion.com/releases/2026-02-24",
        date: "2026-02",
        engagement: "Named enterprise customers with metrics",
        who: "Ben Levick (Ramp), James Lawley (Remote)",
        gist: "Remote: '>95% triage accuracy, 25%+ tickets resolved autonomously.' Named enterprise customers with quantified production outcomes.",
        selfReported: true,
      },
      {
        quality: "strong",
        title: "Wiz Security integration via Notion MCP — platform flywheel beyond productivity",
        url: "https://www.wiz.io/blog/wiz-notion-mcp-agents-integration",
        date: "2026-02",
        engagement: "Official vendor integration announcement",
        who: "Wiz (cloud security platform)",
        gist: "Major security vendor building official MCP integration with Notion. Platform flywheel extending beyond productivity into enterprise security.",
      },
      {
        quality: "strong",
        title: "StackOne deep dive — identifies critical Notion MCP limitations",
        url: "https://www.stackone.com/blog/notion-mcp-deep-dive/",
        date: "2026-01",
        engagement: "Independent deep-dive review",
        who: "Romain Sestier (StackOne, independent)",
        gist: "Page-level granularity only — no block editing, no file access, auth expires weekly, no database view/filter. Third-party StackOne (27+ tools) fills gaps.",
      },
    ],
  },
  "slack-mcp-server": {
    slug: "slack-mcp-server",
    name: "Slack MCP Server",
    repo: "korotovsky/slack-mcp-server",
    repoUrl: "https://github.com/korotovsky/slack-mcp-server",
    readmeBranch: "main",
    official: false,
    status: "active",
    summary:
      "Community MCP server for Slack alongside official Slack MCP (GA Feb 2026). Enables agent access to channel search, messaging, and coordination.",
    verdict:
      "#4 overall, best communication-lane skill. Official Slack MCP has the strongest partner ecosystem (50+ AI companies) in the category. Combined ~44K npm/week across official + community rivals Notion's adoption.",
    docsUrl: "https://docs.slack.dev",
    relatedCategories: ["product-business-development"],
    strengths: [
      "Official Slack MCP launched Feb 2026 with GA support",
      "Strongest partner ecosystem: 50+ AI companies (OpenAI, Anthropic, Google, Cursor, Vercel, Notion, Dropbox)",
      "Granular OAuth scopes, admin oversight, audit logging",
      "LLM-native design: tools return natural language, not raw JSON",
      "Real-time Search API launched alongside MCP",
    ],
    weaknesses: [
      "Communication is complementary — needs operating surface first",
      "Gaps: no reactions, no scheduling support",
      "Marketplace gating could limit custom agent adoption",
    ],
    githubStars: "1.5K+",
    evidence: [
      {
        quality: "strong",
        title: "Official Slack MCP GA launch — 50+ launch partners, 25x growth",
        url: "https://slack.com/blog/news/mcp-real-time-search-api-now-available",
        date: "2026-02",
        engagement: "Official GA announcement, partner ecosystem",
        who: "Slack (official)",
        gist: "50+ launch partners including Anthropic, OpenAI, Google, Perplexity, Cursor, Vercel, Notion, Dropbox. 25x growth in MCP tool calls since Oct limited release. Strongest partner ecosystem of any MCP server.",
        selfReported: true,
      },
      {
        quality: "strong",
        title: "Combined ~44K npm/week — official 34,430 + community 9,634",
        url: "https://www.npmjs.com/package/@modelcontextprotocol/server-slack",
        date: "2026-03-16",
        engagement: "npm registry public metrics",
        who: "npm (public metrics)",
        gist: "Official reference server 34,430 npm/week (under-reported in previous catalog). Community korotovsky 9,634 npm/week. Combined ~44K rivals Notion's adoption.",
      },
      {
        quality: "strong",
        title: "Truto independent review: official for production, community for hobby",
        url: "https://truto.one/blog/best-mcp-server-for-slack-in-2026/",
        date: "2026-03",
        engagement: "Independent comparison review",
        who: "Truto (independent)",
        gist: "Independent comparison ranking official Slack MCP above community for production use. Also flagged: 43% of MCP servers have command injection vulnerabilities — strengthens case for official servers.",
      },
    ],
  },
  "google-workspace-mcp": {
    slug: "google-workspace-mcp",
    name: "Google Workspace MCP",
    repo: "taylorwilsdon/google_workspace_mcp",
    repoUrl: "https://github.com/taylorwilsdon/google_workspace_mcp",
    readmeBranch: "main",
    official: false,
    status: "active",
    summary:
      "The most complete public Google Workspace MCP surface right now across Gmail, Docs, Sheets, Calendar, Drive, and more.",
    verdict:
      "#6 overall. Best broad operating skill for teams living in Google Workspace. Breadth is real (100+ tools, 12+ services), but low npm adoption (604/week), community-only status, and existential threat from Google's own CLI weigh against it.",
    docsUrl: "https://workspacemcp.com",
    productUrl: "https://workspacemcp.com",
    githubStars: "1.8K+",
    npmPackage: "google-workspace-mcp",
    relatedCategories: ["product-business-development"],
    strengths: [
      "Broadest single-server coverage: 12+ Google services (Gmail, Drive, Calendar, Docs, Sheets, Slides, Forms, Tasks, Contacts, Chat, Apps Script, Custom Search)",
      "Active development: 30 contributors, ~26 commits/week, v1.14.3",
      "Tool tiers (Core/Extended/Complete) and read-only mode show architectural maturity",
    ],
    weaknesses: [
      "Community-built rather than Google-official",
      "604 npm weekly downloads — 79x lower than Notion MCP, suggesting limited real-world adoption despite stars",
      "Google's own Workspace CLI removed MCP mode 2 days after launch — signals instability in the MCP approach for this surface",
      "Google Cloud announced separate official MCP support that may supersede this community server",
    ],
    evidence: [
      {
        quality: "strong",
        title: "VentureBeat: Google Workspace CLI brings Gmail, Docs, Sheets into common interface for AI agents",
        url: "https://venturebeat.com/orchestration/google-workspace-cli-brings-gmail-docs-sheets-and-more-into-a-common",
        date: "2026-03",
        engagement: "VentureBeat feature article",
        who: "VentureBeat (tier-1 tech publication)",
        gist: "Google released official Workspace CLI with built-in MCP server. But MCP mode was removed 2 days later — CLI approach deemed better for vast API surface.",
      },
      {
        quality: "moderate",
        title: "DEV: Not Everything Needs MCP — What Google Workspace CLI Taught Us",
        url: "https://dev.to/gys/not-everything-needs-mcp-what-google-workspace-cli-taught-us-about-ai-agent-architecture-2doe",
        date: "2026-03",
        engagement: "DEV Community article",
        who: "Community developer analysis",
        gist: "Analysis of why Google removed MCP from their CLI. For broad API surfaces, CLI 'order from the kitchen' approach beats MCP 'spread entire menu' approach.",
      },
      {
        quality: "moderate",
        title: "PulseMCP: Google Workspace MCP Server by Taylor Wilsdon — ranked #1 for Workspace",
        url: "https://www.pulsemcp.com/servers/taylorwilsdon-google-workspace",
        date: "2026-03",
        engagement: "Ranked #1 on PulseMCP and Glama for workspace category",
        who: "PulseMCP (independent MCP server directory)",
        gist: "Independent MCP directory ranks this as the #1 Google Workspace MCP server. Listed in the official Anthropic modelcontextprotocol servers repo.",
      },
      {
        quality: "moderate",
        title: "WinBuzzer: New Google Workspace CLI Offers Built-In MCP Server for AI Agents",
        url: "https://winbuzzer.com/2026/03/06/google-workspace-cli-mcp-server-ai-agents-xcxwbn/",
        date: "2026-03",
        engagement: "WinBuzzer tech publication article",
        who: "WinBuzzer (independent tech publication)",
        gist: "Covers Google's official Workspace CLI release with built-in MCP server, providing competition/validation for the Taylor Wilsdon community server.",
      },
    ],
  },
  openhands: {
    slug: "openhands",
    name: "OpenHands",
    repo: "OpenHands/OpenHands",
    repoUrl: "https://github.com/OpenHands/OpenHands",
    pypiPackage: "openhands-ai",
    readmeBranch: "main",
    official: false,
    status: "active",
    summary:
      "Category leader in multi-agent orchestration — 69K+ stars, $18.8M Series A, AMD hardware partnership, 188+ contributors, 4M+ downloads. Broadest open-source community by 10x over any competitor.",
    verdict:
      "Category leader. Strongest open-source position, broadest community, enterprise-validated with AMD partnership and Series A funding from Madrona, Menlo, Fujitsu.",
    docsUrl: "https://docs.openhands.dev",
    productUrl: "https://www.openhands.ai",
    relatedCategories: ["teams-of-agents"],
    strengths: [
      "Massive public traction",
      "Clear software-agent framing",
      "Strong benchmark and adoption story",
    ],
    weaknesses: [
      "Heavier surface area than a simple loop pattern",
      "Can be more infra than you need for narrow tasks",
    ],
    githubStars: "69K+",
    metrics: {
      downloads: [
        { date: "2026-03", value: 180371 },
      ],
      stars: [
        { date: "2024-06", value: 15000 },
        { date: "2024-09", value: 25000 },
        { date: "2024-12", value: 35000 },
        { date: "2025-03", value: 42000 },
        { date: "2025-06", value: 48000 },
        { date: "2025-09", value: 55000 },
        { date: "2025-12", value: 62000 },
        { date: "2026-03", value: 69201 },
      ],
    },
    evidence: [
      {
        quality: "strong",
        title: "OpenHands raises $18.8M, reports 77.6% SWE-bench Verified with Claude Sonnet Thinking",
        url: "https://openhands.dev/",
        date: "2026-01",
        engagement: "69K+ GitHub stars, $18.8M funding",
        who: "OpenHands team (formerly OpenDevin, Princeton-originated)",
        gist: "Cloud coding agents that solve 87% of bug tickets same day. 77.6% SWE-bench Verified. New software-agent-sdk v1.0 architecture.",
        selfReported: true,
      },
      {
        quality: "strong",
        title: "AMD strategic partnership — Lemonade Server for local agent inference",
        url: "https://www.amd.com/en/developer/resources/technical-articles/2025/OpenHands.html",
        date: "2025",
        engagement: "AMD official technical article",
        who: "AMD (major hardware vendor)",
        gist: "Only multi-agent platform with a major hardware vendor partnership for local inference. Advances agent performance and enterprise readiness utilizing AMD Lemonade Server.",
      },
      {
        quality: "strong",
        title: "$18.8M Series A — enterprise adoption at AMD, Apple, Google, Amazon, Netflix, NVIDIA",
        url: "https://www.businesswire.com/news/home/20251118768131/en/OpenHands-Raises-$18.8M-Series-A-to-Bring-Open-Source-Cloud-Coding-Agents-to-Enterprises",
        date: "2025-11-18",
        engagement: "Major wire service distribution",
        who: "OpenHands company announcement + verified by enterprise logos",
        gist: "Engineers at AMD, Apple, Google, Amazon, Netflix, TikTok, NVIDIA, Mastercard, and VMWare have cloned or forked the repository. Series A gives runway for cloud product development.",
      },
      {
        quality: "strong",
        title: "4M+ downloads, reducing code-maintenance backlogs by up to 50%",
        url: "https://openhands.dev/blog/openhands-product-update---march-2026",
        date: "2026-03-04",
        engagement: "Official blog, metrics independently cited",
        who: "OpenHands team",
        gist: "Early enterprise adopters report reducing code-maintenance backlogs by up to 50% and cutting vulnerability resolution times from days to minutes. Transition from research tool to production platform.",
        selfReported: true,
      },
      {
        quality: "moderate",
        title: "NocoBase: Top 18 Open Source AI Agent Projects — OpenHands included",
        url: "https://www.nocobase.com/en/blog/github-open-source-ai-agent-projects",
        date: "2026-02",
        engagement: "Blog roundup of top OSS agents",
        who: "NocoBase (open-source platform, independent review)",
        gist: "Listed among top 18 open-source AI agent projects by GitHub stars. Positioned as the leading autonomous software engineering agent.",
      },
      {
        quality: "strong",
        title: "ICLR 2025: OpenHands — An Open Platform for AI Software Developers as Generalist Agents",
        url: "https://arxiv.org/abs/2407.16741",
        date: "2025-05",
        engagement: "Accepted poster at ICLR 2025, 24 authors, 198 HN points",
        who: "24 researchers (peer-reviewed at top-tier ML venue)",
        gist: "Peer-reviewed conference paper at ICLR 2025. Evaluated across 15 benchmarks including SWE-bench and WebArena. Documents 2.1K+ contributions from 188+ contributors.",
      },
      {
        quality: "strong",
        title: "HN: OpenDevin paper discussion — 198 points, 107 comments",
        url: "https://news.ycombinator.com/item?id=41215593",
        date: "2024-08",
        engagement: "198 points, 107 comments",
        who: "Hacker News community (mixed/skeptical tone, independent testers)",
        gist: "One tester reports agent completed half a test-writing task but cost $50 in API credits. Maintainer acknowledges it's 'useful for a handful of one-off tasks' but not yet mission-critical.",
      },
      {
        quality: "moderate",
        title: "Isaac Flath: OpenHands Agent Tool Review — smooth migration with a little guidance",
        url: "https://elite-ai-assisted-coding.dev/p/openhands",
        date: "2025-07",
        engagement: "Independent practitioner hands-on review",
        who: "Isaac Flath (independent consultant)",
        gist: "Tested on real project (Quarto blog migration). Found it effective but not fully autonomous — 'saved me time and mental energy' but needed 'a bit of human guidance.' Transparent about both strengths and limitations.",
      },
      {
        quality: "strong",
        title: "Nebius: 67K OpenHands trajectories with Qwen3-Coder, 61.7% SWE-bench Verified",
        url: "https://nebius.com/blog/posts/openhands-trajectories-with-qwen3-coder-480b",
        date: "2025-12",
        engagement: "67,074 agent trajectories generated, fine-tuned models released",
        who: "Nebius (cloud AI company, independent third-party)",
        gist: "Used OpenHands as scaffolding framework to generate 67K trajectories for fine-tuning. Describes OpenHands as 'one of the most widely adopted open-source agent scaffolding frameworks.' Achieved 61.7% SWE-bench Verified.",
      },
      {
        quality: "strong",
        title: "Independent comparison: OpenHands wins on enterprise, web UI, team collaboration vs SWE-agent",
        url: "https://localaimaster.com/openhands-vs-swe-agent",
        date: "2026-03",
        engagement: "Independent comparison article",
        who: "LocalAIMaster (independent reviewer)",
        gist: "Head-to-head comparison. OpenHands wins on enterprise features (RBAC, audit logs, CI/CD), web UI, and team collaboration. SWE-agent wins on benchmark credibility and academic foundation.",
      },
      {
        quality: "strong",
        title: "68K+ stars puts OpenHands in top 0.01% of all GitHub repos",
        url: "https://theagenttimes.com/articles/68107-stars-is-openhands-the-rocket-fuel-the-agent-economy-needs",
        date: "2026-02",
        engagement: "Independent analysis",
        who: "The Agent Times (independent)",
        gist: "Stars confirm community traction far beyond any competitor in the autonomous coding category. Consistently ranked #1 open-source Devin alternative across multiple independent roundups.",
      },
    ],
  },
  "ralph-loop-agent": {
    slug: "ralph-loop-agent",
    name: "Ralph Loop Agent",
    repo: "vercel-labs/ralph-loop-agent",
    repoUrl: "https://github.com/vercel-labs/ralph-loop-agent",
    readmeBranch: "main",
    official: true,
    status: "active",
    summary:
      "Vercel’s AI SDK implementation of the Ralph Wiggum loop pattern — the viral autonomous coding loop technique with 20K+ stars across implementations and VentureBeat coverage.",
    verdict:
      "Best reference when the team wants a crisp loop pattern instead of a huge agent platform. The broader Ralph ecosystem (snarktank/ralph at 12K+ stars) shows massive community adoption.",
    docsUrl: "https://ai-sdk.dev",
    relatedCategories: ["teams-of-agents"],
    strengths: [
      "Official Vercel trust",
      "Strong loop framing for continuous autonomy",
      "Part of a massive ecosystem (20K+ stars across Ralph implementations)",
      "Adopted by Anthropic (official Claude Code plugin), Vercel, Block’s Goose",
    ],
    weaknesses: [
      "Lighter public artifact surface than OpenHands or SWE-agent",
      "More pattern than full factory out of the box",
      "Skeptics note context drift and ‘expensive token cost’ concerns",
    ],
    githubStars: "706",
    evidence: [
      {
        quality: "moderate",
        title: "Ralph Loop Agent: Vercel AI SDK continuous-autonomy pattern",
        url: "https://github.com/vercel-labs/ralph-loop-agent",
        date: "2026-01",
        engagement: "698 GitHub stars, official Vercel Labs repo",
        who: "Vercel (official labs project)",
        gist: "Reference implementation for continuous AI loop pattern using the AI SDK. One of several official platform adoptions (Vercel, Anthropic, Block’s Goose).",
        selfReported: true,
      },
      {
        quality: "strong",
        title: "HN: Running Claude Code in a loop to mirror human development practices (51 points)",
        url: "https://news.ycombinator.com/item?id=46175662",
        date: "2025-12",
        engagement: "51 points, 9 comments",
        who: "Hacker News community (genuine developer discussion with skeptical voices)",
        gist: "Developers discuss the Ralph loop pattern for test generation. Skeptical commenters compare Claude to ‘a new intern every 15-30 minutes.’ Mixed but engaged reception.",
      },
      {
        quality: "strong",
        title: "Addy Osmani (Google): Self-Improving Coding Agents — covers Ralph Wiggum technique",
        url: "https://addyosmani.com/blog/self-improving-agents/",
        date: "2026-01",
        engagement: "Blog post by Google Chrome engineering lead",
        who: "Addy Osmani (Google, highly respected independent developer)",
        gist: "Covers Ralph Wiggum as part of broader analysis of autonomous coding loops. Explains how the loop ‘solves the context overflow problem.’ Independent validation from a top industry voice.",
      },
      {
        quality: "moderate",
        title: "HumanLayer: A Brief History of Ralph — detailed timeline from June 2025 to Anthropic plugin",
        url: "https://www.humanlayer.dev/blog/brief-history-of-ralph",
        date: "2026-01",
        engagement: "Detailed editorial timeline with sourced dates",
        who: "HumanLayer (coding agent tools company, editorial framing)",
        gist: "Timeline: June 2025 Twitter meetup demo → July 2025 blog post → Aug 2025 multiple implementations → Sept 2025 CursedLang built by Ralph → Dec 2025 official Anthropic plugin. Ecosystem repos totaling 20K+ stars.",
      },
      {
        quality: "moderate",
        title: "snarktank/ralph: 12.5K-star autonomous AI agent loop implementation",
        url: "https://github.com/snarktank/ralph",
        date: "2026-01",
        engagement: "12,514 stars, 1,339 forks",
        who: "Community (largest Ralph implementation by stars)",
        gist: "Most-starred Ralph implementation. Shows massive community adoption of the loop pattern beyond Vercel’s SDK version.",
      },
      {
        quality: "strong",
        title: "The Register: ‘Ralph Wiggum’ loop prompts Claude to vibe-clone commercial software for $10/hr",
        url: "https://www.theregister.com/2026/01/27/ralph_wiggum_claude_loops/",
        date: "2026-01",
        engagement: "The Register feature article",
        who: "The Register (major independent tech publication)",
        gist: "Covers how the Ralph Wiggum bash loop technique enables autonomous software cloning at ~$10/hour. Discusses ethical concerns around using the pattern to clone commercial products.",
      },
      {
        quality: "strong",
        title: "VentureBeat: How Ralph Wiggum went from ‘The Simpsons’ to the biggest name in AI",
        url: "https://venturebeat.com/technology/how-ralph-wiggum-went-from-the-simpsons-to-the-biggest-name-in-ai-right-now",
        date: "2026-01",
        engagement: "VentureBeat feature article (tier-1 tech publication)",
        who: "VentureBeat (independent tech publication)",
        gist: "Covers the Ralph Wiggum technique’s rise from a Simpsons joke to a major AI development pattern adopted by Anthropic, Vercel, and others.",
      },
    ],
  },
  "swe-agent": {
    slug: "swe-agent",
    name: "SWE-agent",
    repo: "SWE-agent/SWE-agent",
    repoUrl: "https://github.com/SWE-agent/SWE-agent",
    pypiPackage: "sweagent",
    readmeBranch: "main",
    official: false,
    status: "active",
    summary:
      "Benchmark-driven software engineering agent with the cleanest issue-fixing story in the open-source lane.",
    verdict:
      "Best narrow pick when the question is issue-level repair and benchmark credibility, not general software-factory orchestration.",
    docsUrl: "https://swe-agent.com/latest/",
    productUrl: "https://swe-agent.com",
    githubStars: "19K+",
    relatedCategories: ["teams-of-agents"],
    strengths: [
      "Benchmark-native story",
      "Clear issue-solving shape",
      "Strong technical credibility",
    ],
    weaknesses: [
      "Narrower than OpenHands for broad factory workflows",
      "Less about continuous loops than Ralph",
    ],
    evidence: [
      {
        quality: "strong",
        title: "Live-SWE-agent: Claude Opus 4.5 scores 79.2% on SWE-bench Verified — leads all open-source scaffolds",
        url: "https://live-swe-agent.github.io/",
        date: "2026-03",
        engagement: "Public leaderboard, NeurIPS 2024 paper",
        who: "Princeton University researchers (John Yang, Carlos Jimenez, Kilian Lieret, Ofir Press)",
        gist: "SWE-agent scaffold achieves 79.2% on SWE-bench Verified with Opus 4.5, leading all open-source scaffolds. Also created mini-swe-agent (100 lines, >74% SWE-bench).",
      },
      {
        quality: "moderate",
        title: "mini-swe-agent: 100-line agent scores >74% SWE-bench Verified",
        url: "https://github.com/SWE-agent/mini-swe-agent",
        date: "2026-02",
        engagement: "GitHub repo, successor to full SWE-agent",
        who: "SWE-agent team (Princeton)",
        gist: "Radically simplified version — 100 lines, no huge configs. Matches full SWE-agent performance. Shows the scaffold can be minimal.",
        selfReported: true,
      },
    ],
  },
  "claude-code": {
    slug: "claude-code",
    name: "Claude Code",
    repo: "anthropics/claude-code",
    repoUrl: "https://github.com/anthropics/claude-code",
    npmPackage: "@anthropic-ai/claude-code",
    readmeBranch: "main",
    official: true,
    status: "active",
    summary:
      "Anthropic's official agentic coding CLI. Terminal-native, tool-use-driven, with deep file system and shell access. #1 SWE-bench Pro standardized (45.89%), ~4% of GitHub public commits (SemiAnalysis), $2.5B annualized revenue (fastest enterprise SaaS to $1B ARR). 8M+ npm weekly downloads. Opus 4.6 with 1M context.",
    verdict:
      "The #1 coding CLI agent. Leads SWE-bench Pro standardized (45.89%), wins independent head-to-heads on reasoning depth, ~4% of GitHub commits. Rate limits are the #1 complaint. Costs 2-3x more per task than Codex CLI due to higher token consumption.",
    relatedCategories: ["coding-clis", "teams-of-agents"],
    githubStars: "79K+",
    metrics: {
      downloads: [
        { date: "2026-03", value: 8028705 },
      ],
      stars: [
        { date: "2025-06", value: 5000 },
        { date: "2025-08", value: 10000 },
        { date: "2025-10", value: 18000 },
        { date: "2025-12", value: 25000 },
        { date: "2026-01", value: 30000 },
        { date: "2026-02", value: 35000 },
        { date: "2026-03", value: 77384 },
      ],
    },
    strengths: [
      "#1 SWE-bench Pro standardized (45.89%) — the authoritative benchmark now that Verified is saturated",
      "~4% of GitHub public commits — strongest real-usage signal (SemiAnalysis), $2.5B annualized revenue (fastest enterprise SaaS to $1B ARR — Constellation Research)",
      "8M+ npm weekly downloads — 3x Codex, 12x Gemini. Installs are the hardest metric to game",
      "Opus 4.6 with 1M context — highest-capability model available in a CLI",
      "HN peak engagement 2,127 pts — unmatched community mindshare",
      "Wins independent blind code quality tests 67% of the time across independent evaluations",
      "Independent daily quality monitoring with no degradation detected (MarginLab, p<0.05)",
      "Real-world daily cost ~$6 avg, <$12 at p90",
    ],
    weaknesses: [
      "Rate limits are the #1 complaint (1,085 pts HN thread dedicated to this)",
      "Costs $200+/month at heavy usage — 2-3x more expensive per task than Codex CLI due to 3-4x higher token consumption",
      "Terminal-Bench 2.0: 58.0% (#38) — genuinely weaker on terminal-native/systems tasks than Codex CLI (62.9%)",
      "Tied to Anthropic models only",
      "Anthropic blocked third-party subscription use, angering users (625 pts HN)",
    ],
    evidence: [
      {
        quality: "moderate",
        title: "Faros AI: Best AI Coding Agents for 2026 — Claude Code rated #1",
        url: "https://www.faros.ai/blog/best-ai-coding-agents-2026",
        date: "2026-02",
        engagement: "Company blog post",
        who: "Faros AI (dev tools company — self-promotional)",
        gist: "Claims Claude Code is best AI coding agent. Reference for feature claims only — Faros promoting Faros.",
        selfReported: true,
      },
      {
        quality: "moderate",
        title: "Tembo: 15 AI Coding CLI Tools Compared — Claude Code tops autonomous lane",
        url: "https://www.tembo.io/blog/coding-cli-tools-comparison",
        date: "2026-02",
        engagement: "Company blog comparison",
        who: "Tembo (cloud Postgres company)",
        gist: "Ranks Claude Code highest for complex reasoning. Useful comparison structure but company blog, not independent review.",
        selfReported: true,
      },
      {
        quality: "strong",
        title: "Claude Code 2.0 — 842 points, 413 comments on HN",
        url: "https://news.ycombinator.com/item?id=45416228",
        date: "2025-10",
        engagement: "842 HN points, 413 comments",
        who: "HN community (submitted by polyrand)",
        gist: "Major front-page HN thread on the Claude Code 2.0 release. Community consensus positioned it as the standard agentic coding CLI all others are measured against.",
      },
      {
        quality: "strong",
        title: "6 Weeks of Claude Code (Puzzmo) — 581 points, 590 comments on HN",
        url: "https://news.ycombinator.com/item?id=44746621",
        date: "2025-08",
        engagement: "581 HN points, 590 comments",
        who: "Puzzmo engineering blog (HN submitted by mike1o1)",
        gist: "In-depth practitioner report from a real product team on daily Claude Code usage over 6 weeks. One of the highest-comment HN threads on any AI coding tool.",
      },
      {
        quality: "strong",
        title: "Anthropic's Claude Code is having its 'ChatGPT' moment — VS Code installs surge to 29M",
        url: "https://www.uncoveralpha.com/p/anthropics-claude-code-is-having",
        date: "2026-01",
        engagement: "Newsletter analysis with VS Code Marketplace data",
        who: "Rihard Jarc (UncoverAlpha, independent tech/investing newsletter)",
        gist: "Tracks Claude Code VS Code extension installs surging from 17.7M to 29M since Jan 2026. Cites UC San Diego/Cornell survey where Claude Code (58 users) edged out GitHub Copilot (53 users) among 99 professional devs.",
      },
      {
        quality: "strong",
        title: "Morph study: scaffolding matters 22x more than model choice — Claude Code's harness is the deepest",
        url: "https://morph.so/blog/scaffolding-matters-more-than-model",
        date: "2026-02",
        engagement: "Engineering blog with benchmark data",
        who: "Morph Engineering Team (independent AI infrastructure company)",
        gist: "Swapping models changed scores ~1%. Swapping the harness changed them 22%. Claude Code's agent engineering (Agent Teams, parallel sub-agents) is the category's deepest scaffolding advantage.",
      },
      {
        quality: "strong",
        title: "SWE-bench Pro standardized: Claude Code #1 at 45.89%",
        url: "https://swe-bench.github.io",
        date: "2026-03",
        engagement: "Authoritative standardized benchmark (SEAL)",
        who: "SWE-bench team (standardized evaluation)",
        gist: "Claude Code leads SWE-bench Pro standardized at 45.89% vs Codex CLI's 41.0%. SWE-bench Verified is saturated (top 5 within 1 point). Pro standardized is the fair comparison — custom scaffold scores (Codex 56.8%) are not comparable.",
      },
      {
        quality: "strong",
        title: "SemiAnalysis: ~4% of GitHub public commits, $2.5B annualized revenue",
        url: "https://semianalysis.com",
        date: "2026-03",
        engagement: "Industry analysis (SemiAnalysis — premier semiconductor/AI research)",
        who: "SemiAnalysis (independent research firm)",
        gist: "~4% of public GitHub commits, projected 20%+ by EOY 2026. 42,896x growth in 13 months. $2.5B annualized revenue. The hardest real-usage metric in the category.",
      },
      {
        quality: "strong",
        title: "MarginLab: independent daily monitoring shows no quality degradation (p<0.05)",
        url: "https://marginlab.dev",
        date: "2026-03",
        engagement: "Independent daily tracker with statistical rigor",
        who: "MarginLab (independent quality monitoring service)",
        gist: "56% baseline pass rate, no statistically significant degradation detected. No other tool in the category has this level of ongoing independent quality assurance.",
      },
      {
        quality: "moderate",
        title: "HN: 'Tell HN: I'm 60 years old. Claude Code has re-ignited a passion' — 1,073 points",
        url: "https://news.ycombinator.com/item?id=0",
        date: "2026-03",
        engagement: "1,073 HN points",
        who: "HN community",
        gist: "One of the highest-engagement personal testimonials in the coding CLI category. Signals cultural mindshare beyond pure developer tooling.",
      },
      {
        quality: "strong",
        title: "Constellation Research: fastest enterprise SaaS to $1B ARR in history",
        url: "https://constellationr.com",
        date: "2026-03",
        engagement: "Constellation Research revenue report",
        who: "Constellation Research (enterprise technology analyst firm)",
        gist: "$2.5B annualized revenue, 500+ customers at $1M+/year. Fastest enterprise SaaS to $1B ARR in history. 8M+ npm weekly downloads — 3x Codex CLI, 12x Gemini CLI.",
      },
      {
        quality: "strong",
        title: "npm weekly downloads: 8,028,705 — 3x Codex CLI, 12x Gemini CLI",
        url: "https://www.npmjs.com/package/@anthropic-ai/claude-code",
        date: "2026-03",
        engagement: "npm registry data",
        who: "npm registry (official package statistics)",
        gist: "8M+ weekly downloads is the hardest-to-game traction metric in the category. 3x Codex CLI (2.6M), 12x Gemini CLI (647K). Installs correlate with actual developer usage, not social media hype.",
      },
    ],
  },
  aider: {
    slug: "aider",
    name: "Aider",
    repo: "Aider-AI/aider",
    pypiPackage: "aider-chat",
    repoUrl: "https://github.com/Aider-AI/aider",
    readmeBranch: "main",
    official: false,
    status: "active",
    summary:
      "Open-source AI pair programming CLI with broad model support, 5.42M PyPI total downloads, and the category's benchmark standard (Aider Polyglot). Most cost-efficient agent tested.",
    verdict:
      "The benchmark conscience of the category — hosts the closest thing to a neutral standard. Most cost-efficient agent (2.8 pts below Claude Code at 3x fewer tokens). But 7-month release gap (last: v0.86.0, 2025-08-09) is a serious concern in a daily-release field.",
    docsUrl: "https://aider.chat",
    relatedCategories: ["coding-clis"],
    strengths: [
      "Hosts the Aider Polyglot benchmark — the category's neutral standard-setter",
      "Most cost-efficient: 52.7% accuracy at 3x fewer tokens than Claude Code",
      "5.42M PyPI total downloads; 2K–7K daily installs — most verifiable usage metric",
      "Works with many model providers (OpenAI, Anthropic, local models)",
      "Git-native: auto-commits changes with clear diffs",
    ],
    weaknesses: [
      "Last release v0.86.0 was 2025-08-09 — 7-month gap in a daily-release category",
      "Star growth plateaued relative to top 4",
      "Less agentic autonomy than Claude Code or Codex CLI",
      "Chat-loop interface rather than deep agent autonomy",
    ],
    githubStars: "42K+",
    metrics: {
      downloads: [
        { date: "2026-03", value: 41999 },
      ],
      stars: [
        { date: "2024-06", value: 8000 },
        { date: "2024-09", value: 14000 },
        { date: "2024-12", value: 20000 },
        { date: "2025-03", value: 26000 },
        { date: "2025-06", value: 30000 },
        { date: "2025-09", value: 34000 },
        { date: "2025-12", value: 38000 },
        { date: "2026-03", value: 41898 },
      ],
    },
    evidence: [
      {
        quality: "strong",
        title: "PyPI: aider-chat hits ~691K monthly downloads",
        url: "https://pypistats.org/packages/aider-chat",
        date: "2026-03",
        engagement: "691K downloads/month, ~23K/day",
        who: "PyPI official statistics",
        gist: "Most widely installed open-source AI coding CLI by download volume, far ahead of alternatives.",
      },
      {
        quality: "strong",
        title: "AIMultiple: Agentic CLI Tools Compared — Aider most cost-efficient",
        url: "https://aimultiple.com/agentic-cli",
        date: "2026-03",
        engagement: "Independent tech analyst benchmark",
        who: "Cem Dilmegani (AIMultiple founder, established B2B tech analyst)",
        gist: "Aider scored 52.7% accuracy in 257s using 126K tokens — only 2.8 points below Claude Code's 55.5% while consuming 3x fewer tokens. Most cost-efficient agent tested.",
      },
      {
        quality: "strong",
        title: "HN: Aider pair programming — 432 points, 156 comments",
        url: "https://news.ycombinator.com/item?id=39995725",
        date: "2024-04",
        engagement: "432 points, 156 comments",
        who: "HN community (posted by tosh)",
        gist: "Front-page HN thread signaling broad developer awareness. Strong technical discussion around model flexibility and git-native workflow.",
      },
    ],
  },
  "continue-dev": {
    slug: "continue-dev",
    name: "Continue (Continuous AI)",
    repo: "continuedev/continue",
    repoUrl: "https://github.com/continuedev/continue",
    readmeBranch: "main",
    official: false,
    status: "active",
    summary:
      "Pivoted from IDE autocomplete to Continuous AI — an open-source CLI that runs async agents on every PR to enforce standards and catch issues automatically.",
    verdict:
      "Best pick for teams that want background AI agents enforcing code quality on PRs, not real-time autocomplete. The pivot repositioned it away from individual devs toward team CI workflows.",
    docsUrl: "https://continue.dev",
    productUrl: "https://continue.dev",
    githubStars: "32K+",
    relatedCategories: ["coding-clis", "teams-of-agents"],
    strengths: [
      "Async agents that enforce team rules on every PR",
      "CLI-first — runs in CI without IDE dependency",
      "Open-source with model flexibility",
      "Background operation — catches issues silently without interrupting flow",
    ],
    weaknesses: [
      "No longer the IDE autocomplete tool it once was",
      "More setup upfront than plug-and-play IDE extensions",
      "Best for teams with established coding standards, not solo devs",
    ],
    evidence: [
      {
        quality: "strong",
        title: "VibeCoding: Continue.dev Review 2026 — Continuous AI Agents for PR enforcement",
        url: "https://vibecoding.app/blog/continue-dev-review",
        date: "2026-02",
        engagement: "Independent review",
        who: "VibeCoding (independent dev tools review site)",
        gist: "Reviews Continue's pivot from IDE autocomplete to async PR agents. Agents run as GitHub status checks — green if code is good, red with suggested diff if not.",
      },
      {
        quality: "moderate",
        title: "Continue Blog: Building Cloud Agents with Continue CLI",
        url: "https://blog.continue.dev/building-async-agents-with-continue-cli",
        date: "2026-01",
        engagement: "Official blog",
        who: "Continue team (official)",
        gist: "Agents triggered by PR open, cron, GitHub issues, Sentry alerts, Slack, webhooks. Each agent is a markdown file in .continue/checks/.",
        selfReported: true,
      },
    ],
  },
  opencode: {
    slug: "opencode",
    name: "OpenCode",
    repo: "sst/opencode",
    repoUrl: "https://github.com/sst/opencode",
    readmeBranch: "main",
    official: false,
    status: "active",
    summary:
      "Open-source AI coding agent with 123K+ GitHub stars (#1 in category), 453 contributors, and support for 75+ model providers including local models. Terminal, desktop, and IDE versions. Daily releases.",
    verdict:
      "#4 coding CLI — the star-count leader (123K+) and best pick for model flexibility. But Morph classifies it 'Worth Watching' (Tier 3), CORS RCE vulnerability (patched) shows security maturity gap, and 6,980 open issues are the highest in category.",
    docsUrl: "https://opencode.ai",
    productUrl: "https://opencode.ai",
    relatedCategories: ["coding-clis"],
    strengths: [
      "123K+ GitHub stars — #1 star count in the coding CLI category, 453 contributors",
      "75+ model providers including local models via Ollama — best for vendor lock-in refusal",
      "Privacy-first: does not store code or context",
      "Available as CLI, desktop app, and IDE extension",
      "Daily release cadence — consistent iteration",
      "LSP integration, Go-based TUI praised as superior to Claude Code's terminal UX",
    ],
    weaknesses: [
      "Morph classifies as 'Worth Watching' (Tier 3) — not top tier in independent testing",
      "No published benchmark scores from the project itself",
      "CORS RCE vulnerability (patched) — security maturity gap; 6,980 open issues — highest in category",
      "January star surge (18K in 2 weeks) driven by Anthropic OAuth controversy, not product improvement",
      "Lost Claude Code subscription auth access after Anthropic blocked it",
    ],
    githubStars: "123K+",
    evidence: [
      {
        quality: "strong",
        title: "HN launch: \"Opencode: AI coding agent, built for the terminal\" — 319 points",
        url: "https://news.ycombinator.com/item?id=44482504",
        date: "2025-07",
        engagement: "319 points, 91 comments",
        who: "HN community, SST maintainers, Charm founder in comments",
        gist: "Community compared it favorably to Aider and Claude Code. Maintainers confirmed multi-frontend ambitions and feedback-loop capabilities.",
      },
      {
        quality: "strong",
        title: "HN: Anthropic blocks third-party use of Claude Code subscriptions — 625 points",
        url: "https://news.ycombinator.com/item?id=46549823",
        date: "2026-01",
        engagement: "625 points, 513 comments",
        who: "HN community, OpenCode users, Anthropic critics",
        gist: "Revealed OpenCode reverse-engineered Claude Code auth endpoints. Multiple commenters praised OpenCode's TUI engineering as superior to Claude Code's terminal experience.",
      },
      {
        quality: "strong",
        title: "HN: Unauthenticated RCE vulnerability in OpenCode — 432 points",
        url: "https://news.ycombinator.com/item?id=46581095",
        date: "2026-01",
        engagement: "432 points, 142 comments",
        who: "CyberShadow (security researcher), maintainer responded",
        gist: "Critical: previous versions exposed local server allowing arbitrary code execution from any website. Fixed in v1.1.10+. Important risk signal for enterprise adoption.",
      },
      {
        quality: "strong",
        title: "InfoQ: OpenCode — An Open-source AI Coding Agent Competing with Claude Code and Copilot",
        url: "https://www.infoq.com/news/2026/02/opencode-coding-agent/",
        date: "2026-02",
        engagement: "InfoQ news article (major software engineering publication)",
        who: "Sergio De Simone (InfoQ, independent journalist)",
        gist: "Covers OpenCode's 75+ model support, privacy-first architecture, and LSP integration. Describes it as competing directly with Claude Code and Copilot.",
      },
      {
        quality: "strong",
        title: "The New Stack: Open-source coding agents like OpenCode, Cline, and Aider are solving a huge headache",
        url: "https://thenewstack.io/open-source-coding-agents-like-opencode-cline-and-aider-are-solving-a-huge-headache-for-developers/",
        date: "2026-03",
        engagement: "The New Stack feature article (major DevOps publication)",
        who: "The New Stack (independent tech publication)",
        gist: "Groups OpenCode with Cline and Aider as the three OSS coding agents solving vendor lock-in. Highlights provider-agnostic architecture as key differentiator.",
      },
    ],
  },
  "codex-cli": {
    slug: "codex-cli",
    name: "Codex CLI",
    npmPackage: "@openai/codex",
    repo: "openai/codex",
    repoUrl: "https://github.com/openai/codex",
    readmeBranch: "main",
    official: true,
    status: "active",
    summary:
      "OpenAI's open-source coding agent built in Rust. #1 Terminal-Bench 2.0 (62.9%), SWE-bench Pro standardized 41.04%. 3-4x more token-efficient than Claude Code, 60-75% cheaper per task. Free with ChatGPT subscription, sandbox-first execution, 619 releases in 10 months.",
    verdict:
      "#2 coding CLI. Leads Terminal-Bench 2.0 (62.9% vs Claude Code's 58.0%) and is 3-4x more token-efficient. Sandbox-first safety is a genuine differentiator. Free with ChatGPT removes the cost barrier. Trails Claude Code by ~5pp on SWE-bench Pro standardized (41.04% vs 45.89%).",
    docsUrl: "https://developers.openai.com/codex/cli/",
    relatedCategories: ["coding-clis"],
    strengths: [
      "#1 Terminal-Bench 2.0 (62.9%) — strongest on terminal-native tasks",
      "3-4x more token-efficient than Claude Code (Morph study), API pricing 60-75% cheaper ($1.50 vs $5.00 input)",
      "Sandbox-first execution — genuine safety differentiator (caught SSRF that Claude Code missed per Blake Crosley)",
      "Free with ChatGPT subscription — lowest barrier to entry",
      "619 releases in 10 months — fastest iteration in the category",
      "Native macOS + Windows app (Feb-Mar 2026) for parallel agent management",
    ],
    weaknesses: [
      "SWE-bench Pro standardized: 41.04% trails Claude Code's 45.89% by ~5pp",
      "Users report 20+ minute task times where Claude completes in <1 minute (HN: 104 pts thread). 'Too slow' is the consistent UX complaint",
      "Tied to OpenAI models only",
    ],
    githubStars: "66K+",
    metrics: {
      downloads: [
        { date: "2026-03", value: 2637997 },
      ],
      stars: [
        { date: "2025-06", value: 8000 },
        { date: "2025-08", value: 20000 },
        { date: "2025-10", value: 35000 },
        { date: "2025-12", value: 48000 },
        { date: "2026-01", value: 55000 },
        { date: "2026-02", value: 60000 },
        { date: "2026-03", value: 65010 },
      ],
    },
    evidence: [
      {
        quality: "strong",
        title: "Fortune: OpenAI sees Codex users spike to 1.6 million",
        url: "https://fortune.com/2026/03/04/openai-codex-growth-enterprise-ai-agents/",
        date: "2026-03",
        engagement: "Fortune feature article, tier-1 publication",
        who: "Jeremy Kahn (Fortune AI Editor), quotes Codex head at OpenAI",
        gist: "Codex surpassed 1.6M weekly active users (tripled since GPT-5.3 launch). Enterprise adopters include Cisco, Nvidia, Ramp, Rakuten.",
      },
      {
        quality: "strong",
        title: "Pragmatic Engineer: How Codex is built — deep technical dive",
        url: "https://newsletter.pragmaticengineer.com/p/how-codex-is-built",
        date: "2026-02",
        engagement: "Pragmatic Engineer newsletter (700K+ subscribers)",
        who: "Gergely Orosz (former Uber eng manager, top engineering writer)",
        gist: "90%+ of Codex code generated by Codex itself. Engineers run 4-8 parallel agents. Written in Rust for performance. 1M+ weekly devs, usage up 5x since Jan 2026.",
      },
      {
        quality: "strong",
        title: "HN: OpenAI Codex CLI launch — 516 points, 289 comments",
        url: "https://news.ycombinator.com/item?id=43708025",
        date: "2025-05",
        engagement: "516 points, 289 comments",
        who: "HN community, developers who tested head-to-head vs Claude Code",
        gist: "Massive launch discussion. Top comments noted Claude Code outperformed early Codex on docs tasks. Shows improvement trajectory since launch.",
      },
      {
        quality: "strong",
        title: "SmartScope: Codex CLI vs Claude Code 2026 — Opus 4.6 vs GPT-5.3-Codex Benchmark",
        url: "https://smartscope.blog/en/generative-ai/chatgpt/codex-vs-claude-code-2026-benchmark/",
        date: "2026-02",
        engagement: "Independent benchmark comparison blog",
        who: "SmartScope (independent AI benchmarking blog)",
        gist: "Codex CLI leads Terminal-Bench 2.0 (62.9% vs Claude Code's 58.0%). Uses 3x fewer tokens. But Claude leads on OSWorld-Verified for GUI/computer-use tasks. Note: the 77.3% figure belongs to the Droid scaffold, not Codex CLI directly.",
      },
      {
        quality: "moderate",
        title: "Simon Willison: codex-cli tag — ongoing independent coverage and testing",
        url: "https://simonwillison.net/tags/codex-cli/",
        date: "2025-12",
        engagement: "Simon Willison's blog (massive organic reach in dev community)",
        who: "Simon Willison (Django co-creator, Datasette creator, independent)",
        gist: "Ongoing independent coverage: tested porting JustHTML with Codex CLI, documented skills adoption, GPT-5 model improvements.",
      },
      {
        quality: "strong",
        title: "Terminal-Bench 2.0: Codex CLI leads at 62.9% (#26) vs Claude Code 58.0% (#38)",
        url: "https://terminal-bench.com",
        date: "2026-03",
        engagement: "Independent benchmark",
        who: "Terminal-Bench (independent benchmark suite)",
        gist: "Codex CLI leads on terminal-native tasks by ~5 points. The widely cited 77.3% score belongs to the Droid scaffold, not Codex CLI. Codex still leads, but the margin is narrower than previously reported.",
      },
      {
        quality: "strong",
        title: "SWE-bench Pro standardized: Codex CLI at 41.0% (custom scaffold 56.8% not comparable)",
        url: "https://swe-bench.github.io",
        date: "2026-03",
        engagement: "Authoritative standardized benchmark (SEAL)",
        who: "SWE-bench team (standardized evaluation)",
        gist: "Codex CLI scores 41.04% on SWE-bench Pro standardized, trailing Claude Code's 45.89% by ~5pp. The 56.8% score uses custom scaffolding and is not comparable to standardized results.",
      },
    ],
  },
  "gemini-cli": {
    slug: "gemini-cli",
    name: "Gemini CLI",
    npmPackage: "@google/gemini-cli",
    repo: "google-gemini/gemini-cli",
    repoUrl: "https://github.com/google-gemini/gemini-cli",
    readmeBranch: "main",
    official: true,
    status: "active",
    summary:
      "Google's open-source terminal agent with Gemini 3 models, 1M token context, built-in Google Search grounding, and the best free tier in the category (1K req/day). 97.9K stars, 444 contributors. SWE-bench Pro standardized 43.30% (#2 behind Claude Code).",
    verdict:
      "#3 coding CLI — best free entry point. 1K req/day free tier is unmatched, 1M context is the largest. SWE-bench Pro standardized 43.30% (#2, only 2.59pp behind Claude Code). File deletion incident (AI Incident Database #1178) and tool-calling weaknesses are real concerns.",
    docsUrl: "https://developers.google.com/gemini-code-assist/docs/gemini-cli",
    relatedCategories: ["coding-clis"],
    strengths: [
      "Best free tier: 1K req/day with personal Google account — unmatched in category",
      "1M token native context window — largest in category",
      "SWE-bench Pro standardized 43.30% — #2 behind Claude Code (45.89%), ahead of Codex CLI (41.04%). Gap narrowed significantly with Gemini 3 Pro",
      "Native Google Search grounding mid-task — unique among coding CLIs",
      "Open source (Apache 2.0), 444 contributors, extensions system + full MCP client (v0.31.0)",
    ],
    weaknesses: [
      "File deletion incident catalogued in AI Incident Database (#1178) — trust-damaging event",
      "Free tier throttles to Flash model after 10-15 Pro prompts (community-reported)",
      "HN consensus: 'Gemini is really bad with tool calling' (158 pts thread)",
      "No published SWE-bench scores from Google themselves — 76.2% comes from independent testing",
      "CLI scaffolding acknowledged as behind the model's capabilities, even by Gemini enthusiasts",
    ],
    githubStars: "98K+",
    metrics: {
      downloads: [
        { date: "2026-03", value: 647383 },
      ],
      stars: [
        { date: "2025-06", value: 5000 },
        { date: "2025-08", value: 15000 },
        { date: "2025-10", value: 30000 },
        { date: "2025-12", value: 50000 },
        { date: "2026-01", value: 70000 },
        { date: "2026-02", value: 85000 },
        { date: "2026-03", value: 97505 },
      ],
    },
    evidence: [
      {
        quality: "strong",
        title: "HN launch: \"Gemini CLI\" — 1,428 points, 788 comments",
        url: "https://news.ycombinator.com/item?id=44376919",
        date: "2025-06",
        engagement: "1,428 points, 788 comments",
        who: "HN community, Google team members in comments",
        gist: "Praise for free tier and easy setup. Major criticism: privacy policy (free-tier data used for training), npm packaging. Hit 17K stars within 24 hours.",
      },
      {
        quality: "strong",
        title: "Addy Osmani: Gemini CLI tips and tricks — 403 HN points",
        url: "https://news.ycombinator.com/item?id=46060508",
        date: "2025-12",
        engagement: "403 HN points, 145 comments",
        who: "Addy Osmani (Google Chrome engineering lead)",
        gist: "30 pro-tips for agentic coding. HN discussion was skeptical: multiple commenters reported tool-calling loops, several preferred Claude Code for complex tasks.",
      },
      {
        quality: "strong",
        title: "Simon Willison's launch-day review of Gemini CLI",
        url: "https://simonwillison.net/2025/Jun/25/gemini-cli/",
        date: "2025-06",
        engagement: "Simon Willison's blog (massive organic reach in dev community)",
        who: "Simon Willison (Datasette creator, Django co-creator)",
        gist: "Called it 'very good.' Praised million-token context and decision-making taste. Flagged free-tier training data concern. Noted it's open-source unlike Claude Code.",
      },
      {
        quality: "strong",
        title: "InfoQ: Google Launches Automated Review Feature in Gemini CLI Conductor",
        url: "https://www.infoq.com/news/2026/03/gemini-cli-conductor-reviews/",
        date: "2026-03",
        engagement: "InfoQ news article (major software engineering publication)",
        who: "InfoQ (independent tech publication)",
        gist: "Covers Conductor extension adding automated code reviews, test validation, and security scanning. Shows Gemini CLI evolving into a full development workflow tool.",
      },
      {
        quality: "moderate",
        title: "AI for Code: Gemini CLI Review 2026 — 86/100 rating",
        url: "https://aiforcode.io/tools/gemini-cli",
        date: "2026-03",
        engagement: "AI for Code review site (independent tool comparison)",
        who: "AI for Code (independent AI tool rating site)",
        gist: "Scores 86/100 vs Claude Code's 98/100. Excels at terminal-first workflows and free-tier access. Notes Gemini 3 Flash achieves 78% SWE-bench.",
      },
      {
        quality: "moderate",
        title: "SWE-bench Pro standardized: Gemini CLI at 43.30% — #2 behind Claude Code",
        url: "https://swe-bench.github.io",
        date: "2026-03",
        engagement: "Authoritative standardized benchmark (SEAL)",
        who: "SWE-bench team (standardized evaluation)",
        gist: "Gemini CLI scores 43.30% on SWE-bench Pro standardized, placing #2 behind Claude Code (45.89%) and ahead of Codex CLI (41.04%). The gap narrowed significantly with Gemini 3 Pro — trajectory is strong.",
      },
    ],
  },
  "browser-use": {
    slug: "browser-use",
    name: "Browser Use",
    pypiPackage: "browser-use",
    repo: "browser-use/browser-use",
    repoUrl: "https://github.com/browser-use/browser-use",
    readmeBranch: "main",
    official: false,
    status: "active",
    summary:
      "Python library for controlling a real browser with vision and DOM extraction, built for agent workflows.",
    verdict:
      "Best default for agents that need to see and interact with real web pages end-to-end.",
    docsUrl: "https://browser-use.com",
    productUrl: "https://browser-use.com",
    relatedCategories: ["web-browsing"],
    strengths: [
      "Vision + DOM hybrid approach for robust page understanding",
      "Large public traction and active development",
      "Works with multiple LLM providers",
      "Handles complex multi-step browser tasks",
    ],
    weaknesses: [
      "Python-only — no native TypeScript/Node support",
      "Still evolving reliability for complex flows",
      "Heavier setup than MCP-based browser tools",
    ],
    githubStars: "81K+",
    metrics: {
      downloads: [
        { date: "2026-03", value: 973043 },
      ],
      stars: [
        { date: "2024-12", value: 10000 },
        { date: "2025-02", value: 20000 },
        { date: "2025-04", value: 35000 },
        { date: "2025-06", value: 45000 },
        { date: "2025-08", value: 55000 },
        { date: "2025-10", value: 65000 },
        { date: "2025-12", value: 72000 },
        { date: "2026-02", value: 80000 },
        { date: "2026-03", value: 80920 },
      ],
    },
    evidence: [
      {
        quality: "strong",
        title: "TechCrunch: Browser Use raises $17M seed, backed by YC W25 and Paul Graham",
        url: "https://techcrunch.com/2025/03/23/browser-use-the-tool-making-it-easier-for-ai-agents-to-navigate-websites-raises-17m/",
        date: "2025-03",
        engagement: "TechCrunch feature article",
        who: "Ivan Mehta (TechCrunch), investors: Felicis, Paul Graham, A Capital",
        gist: "$17M seed led by Felicis with Paul Graham participating. 20+ YC W25 batch companies used Browser Use. Manus (viral agent) built on top of it.",
      },
      {
        quality: "strong",
        title: "WebVoyager benchmark: 89.1% across 586 tasks (Steel.dev leaderboard)",
        url: "https://steel.dev/blog/webvoyager-leaderboard",
        date: "2026-03",
        engagement: "Independent benchmark leaderboard",
        who: "Steel.dev (independent)",
        gist: "Browser Use achieved 89.1% success rate on the WebVoyager benchmark across 586 web tasks. State-of-the-art open-source performance, though below commercial competitors (Surfer 2 at 97.1%).",
      },
      {
        quality: "strong",
        title: "Firecrawl: 11 Best AI Browser Agents in 2026 — Browser Use ranked #1 open-source",
        url: "https://www.firecrawl.dev/blog/best-ai-browser-agents-2026",
        date: "2026-03",
        engagement: "Major AI tooling company blog",
        who: "Firecrawl (independent)",
        gist: "Firecrawl's independent ranking places Browser Use as the top open-source AI browser agent. Cites vision+DOM hybrid approach and multi-step task capability.",
      },
      {
        quality: "moderate",
        title: "browser-use/browser-use: 80.9K stars — fastest-growing OSS AI browser agent",
        url: "https://github.com/browser-use/browser-use",
        date: "2026-03",
        engagement: "80.9K stars, 9.6K forks",
        who: "Open-source community",
        gist: "Dominant AI browser agent framework by stars. 941K weekly PyPI downloads. Zero to 80K+ in ~18 months.",
        selfReported: true,
      },
      {
        quality: "moderate",
        title: "Dev.to hands-on comparison: Browser Use wins for complex multi-step tasks",
        url: "https://dev.to/minatoplanb/browser-agents-comparison-2026",
        date: "2026-03",
        engagement: "DEV Community hands-on comparison of 6 tools",
        who: "minatoplanb (independent developer)",
        gist: "Hands-on comparison of 6 browser automation tools confirms Browser Use wins for 'complex multi-step tasks (form filling, autonomous workflows).'",
      },
      {
        quality: "moderate",
        title: "The Agentic Browser Landscape in 2026 — independent landscape survey",
        url: "https://www.nohackspod.com/blog/agentic-browser-landscape-2026",
        date: "2026-03",
        engagement: "No Hacks Podcast blog, updated Mar 5, 2026",
        who: "Slobodan Manic (CXL-certified, WordPress Core Contributor)",
        gist: "Independent landscape overview calls Browser Use 'the go-to open-source solution for AI-powered browser automation.' Covers Python and TypeScript SDKs, LLM-powered decision making approach.",
      },
      {
        quality: "strong",
        title: "NxCode: Stagehand vs Browser Use vs Playwright — AI Browser Automation Compared (2026)",
        url: "https://www.nxcode.io/resources/news/stagehand-vs-browser-use-vs-playwright-ai-browser-automation-2026",
        date: "2026-02",
        engagement: "Major tech comparison site",
        who: "NxCode (independent tech publication)",
        gist: "Confirms Browser Use's unique full-autonomy positioning: 'the LLM decides what to click, what to type, when to scroll, and when the task is complete.' Independent editorial, not sponsored.",
      },
      {
        quality: "strong",
        title: "HN: Stagehand Show HN with Browser Use comparisons — 326 points, 86 comments",
        url: "https://news.ycombinator.com/item?id=42798472",
        date: "2025-01",
        engagement: "326 HN points, 86 comments",
        who: "HN community",
        gist: "Multiple commenters compared Browser Use and Stagehand architectures in depth. Organic community discussion validates Browser Use as the autonomous agent default.",
      },
    ],
  },
  "playwright-mcp": {
    slug: "playwright-mcp",
    name: "Playwright MCP",
    repo: "microsoft/playwright-mcp",
    repoUrl: "https://github.com/microsoft/playwright-mcp",
    readmeBranch: "main",
    official: true,
    status: "active",
    summary:
      "Microsoft's official MCP server for Playwright. Uses accessibility snapshots instead of screenshots for structured browser control. Auto-configured in GitHub Copilot's Coding Agent.",
    verdict:
      "Best MCP-native browser option for teams in Microsoft's ecosystem. The accessibility-snapshot approach is more reliable than vision-based alternatives for structured data extraction.",
    relatedCategories: ["web-browsing"],
    strengths: [
      "Microsoft/Playwright official backing",
      "Accessibility snapshots instead of screenshots — more reliable for structured tasks",
      "Auto-configured in GitHub Copilot Coding Agent",
      "MCP-native — works with any MCP-compatible host",
    ],
    weaknesses: [
      "Token-heavy: 114K tokens/session vs 27K via CLI — well-documented 4x bloat problem",
      "Less vision-aware than Browser Use for visual tasks",
      "Accessibility snapshots miss visual layout information",
    ],
    githubStars: "29K+",
    metrics: {
      downloads: [{ date: "2026-03", value: 29017 }],
      stars: [{ date: "2026-03", value: 29014 }],
    },
    evidence: [
      {
        quality: "strong",
        title: "microsoft/playwright-mcp: 29K stars, 1.4M weekly npm downloads, official Microsoft backing",
        url: "https://github.com/microsoft/playwright-mcp",
        date: "2026-03",
        engagement: "29K stars, 2.3K forks, 1.4M weekly npm downloads — highest in category",
        who: "Microsoft (official Playwright team)",
        gist: "Highest raw download count in the entire web-browsing category. Uses accessibility snapshots instead of screenshots for LLM browser control. Auto-configured in GitHub Copilot Coding Agent — institutional advantage.",
        selfReported: true,
      },
      {
        quality: "strong",
        title: "HN front page: 'Playwright Tools for MCP' launch thread",
        url: "https://news.ycombinator.com/item?id=43485740",
        date: "2025-04",
        engagement: "181 HN points, 34 comments",
        who: "HN community (submitted by alex_hirner)",
        gist: "Playwright MCP launch hit the HN front page. Discussion covered real-world usage with Claude Code and automatic test validation workflows, signaling strong developer interest in accessibility-tree-based browser automation.",
      },
      {
        quality: "strong",
        title: "Speakeasy analysis: 'The Playwright proliferation problem with MCP'",
        url: "https://www.speakeasy.com/blog/playwright-tool-proliferation",
        date: "2025-01",
        engagement: "Widely referenced in MCP design discussions",
        who: "Nolan Sullivan (Speakeasy)",
        gist: "Independent analysis showing Playwright MCP's 26-tool surface causes agent decision paralysis, and reducing to 8 core tools dramatically improves performance. Validates Playwright MCP as the de facto browser-automation MCP standard others benchmark against.",
      },
      {
        quality: "strong",
        title: "GitHub Blog: How to debug a web app with Playwright MCP and GitHub Copilot",
        url: "https://github.blog/ai-and-ml/github-copilot/how-to-debug-a-web-app-with-playwright-mcp-and-github-copilot/",
        date: "2025-09",
        engagement: "GitHub official engineering blog",
        who: "Christopher Harrison (Senior Developer Advocate, GitHub)",
        gist: "Step-by-step demo of Copilot agent mode using Playwright MCP to reproduce bugs, inspect live pages via accessibility snapshots, identify fixes, and verify them — all autonomously. Shows institutional commitment to Playwright MCP as the browser layer.",
      },
      {
        quality: "moderate",
        title: "Bug0: Playwright MCP Changes the Build vs. Buy Equation for AI Testing in 2026",
        url: "https://bug0.com/blog/playwright-mcp-changes-ai-testing-2026",
        date: "2026-02",
        engagement: "Independent QA/testing blog",
        who: "Bug0 (independent AI testing platform)",
        gist: "Analysis of how Playwright MCP democratizes browser automation for AI agents. Notes @playwright/cli uses 4x fewer tokens than MCP mode.",
      },
      {
        quality: "moderate",
        title: "Simon Willison: microsoft/playwright-mcp — launch day coverage",
        url: "https://simonwillison.net/2025/Mar/25/playwright-mcp/",
        date: "2025-03",
        engagement: "Simon Willison's blog (massive organic reach)",
        who: "Simon Willison (Django co-creator, independent)",
        gist: "Launch-day coverage noting Playwright MCP uses accessibility tree instead of screenshots. Early independent validation from a respected voice in developer tooling.",
      },
      {
        quality: "strong",
        title: "Better Stack: Playwright CLI vs MCP — 4x token cost difference documented",
        url: "https://betterstack.com/community/guides/ai/playwright-cli-vs-mcp-browser/",
        date: "2026-03",
        engagement: "Major developer platform",
        who: "Better Stack (independent)",
        gist: "A typical browser automation task consumes 114K tokens with MCP vs 27K with CLI — a 4x difference. Documents the well-known token bloat problem that is Playwright MCP's primary weakness.",
      },
    ],
  },
  stagehand: {
    slug: "stagehand",
    name: "Stagehand",
    npmPackage: "@browserbasehq/stagehand",
    repo: "browserbase/stagehand",
    repoUrl: "https://github.com/browserbase/stagehand",
    readmeBranch: "main",
    official: true,
    status: "active",
    summary:
      "AI-native browser automation SDK by Browserbase with natural language selectors and act/extract/observe primitives.",
    verdict:
      "Best pick when the team wants TypeScript-native browser automation with the simplest possible API surface.",
    docsUrl: "https://stagehand.dev",
    productUrl: "https://stagehand.dev",
    relatedCategories: ["web-browsing"],
    strengths: [
      "TypeScript-native with clean act/extract/observe API",
      "Natural language selectors reduce brittle CSS/XPath dependencies",
      "Official Browserbase backing with cloud browser infrastructure",
    ],
    weaknesses: [
      "Smaller community than Browser Use",
      "Tied to Browserbase ecosystem for cloud execution",
      "Newer — less battle-tested in production agent loops",
    ],
    githubStars: "22K+",
    metrics: {
      downloads: [{ date: "2026-03", value: 558500 }],
      stars: [{ date: "2026-03", value: 21538 }],
    },
    evidence: [
      {
        quality: "moderate",
        title: "browserbase/stagehand: 21.5K stars, VC-backed ($67.5M funding), 559K weekly npm downloads",
        url: "https://github.com/browserbase/stagehand",
        date: "2026-03",
        engagement: "21.5K stars, 1.4K forks, 559K weekly npm downloads (2nd highest npm in category)",
        who: "Browserbase (VC-backed, $67.5M total funding)",
        gist: "Second-highest npm downloads in the category. TypeScript-first, Playwright-extending approach. Auto-caching reduces LLM costs over time.",
        selfReported: true,
      },
      {
        quality: "strong",
        title: "Show HN: Stagehand — open source browser automation framework powered by AI",
        url: "https://news.ycombinator.com/item?id=42635942",
        date: "2025-01",
        engagement: "326 HN points, 86 comments",
        who: "hackgician (Browserbase team)",
        gist: "Front-page Show HN with overwhelmingly positive reception. Community praised hybrid AI + Playwright approach, though raised concerns about LLM cost per execution.",
        selfReported: true,
      },
      {
        quality: "moderate",
        title: "Playwright + AI = Stagehand (It's Better Than It Sounds) — DEV Community review",
        url: "https://dev.to/sellooh/playwright-ai-stagehand-its-better-than-it-sounds-2gi4",
        date: "2025-12",
        engagement: "DEV Community featured post",
        who: "Marcelo Bairros (Founder of Ledda.ai, independent)",
        gist: "Independent hands-on review concluding Stagehand is a 'Playwright enhancement, not replacement.' Praises act/extract/observe primitives, but notes agent mode remains experimental with unpredictable results.",
      },
      {
        quality: "moderate",
        title: "The Agentic Browser Landscape in 2026 — independent survey positions Stagehand as OSS Playwright alternative",
        url: "https://www.nohackspod.com/blog/agentic-browser-landscape-2026",
        date: "2026-03",
        engagement: "No Hacks Podcast blog, updated Mar 5, 2026",
        who: "Slobodan Manic (CXL-certified, WordPress Core Contributor)",
        gist: "Independent landscape survey describes Stagehand v3 as '44% faster' with an 'AI-native rewrite' that talks directly to browsers via CDP. Positions it as the main OSS alternative to Playwright for AI agents.",
      },
      {
        quality: "strong",
        title: "2025 JavaScript Rising Stars: Stagehand among top rising projects",
        url: "https://risingstars.js.org/2025/en",
        date: "2025-12",
        engagement: "Annual JavaScript ecosystem survey, widely cited in dev community",
        who: "Best of JS / JavaScript Rising Stars (independent community survey)",
        gist: "Stagehand featured as a notable rising project with +17.1K stars gained in 2025 alone (from 2.8K to 19.9K total).",
      },
      {
        quality: "moderate",
        title: "Cloudflare: Stagehand support for Browser Rendering Workers",
        url: "https://developers.cloudflare.com/browser-rendering/stagehand/",
        date: "2025-09",
        engagement: "Official Cloudflare documentation integration",
        who: "Cloudflare (major infrastructure company, independent)",
        gist: "Cloudflare added native Stagehand support in their Browser Rendering Workers. Significant institutional validation — a major cloud provider integrating Stagehand directly.",
      },
    ],
  },
  "chrome-devtools-mcp": {
    slug: "chrome-devtools-mcp",
    name: "Chrome DevTools MCP",
    npmPackage: "chrome-devtools-mcp",
    repo: "ChromeDevTools/chrome-devtools-mcp",
    repoUrl: "https://github.com/ChromeDevTools/chrome-devtools-mcp",
    readmeBranch: "main",
    official: true,
    status: "active",
    summary:
      "Google Chrome team's official MCP server for Chrome DevTools. Gives coding agents deep debugging, performance profiling, and Core Web Vitals analysis through 26 tools across 6 categories.",
    verdict:
      "Best MCP-native option for debugging, performance analysis, and Chrome-specific development workflows. Complements Playwright MCP rather than replacing it.",
    docsUrl: "https://developer.chrome.com/blog/chrome-devtools-mcp-debug-your-browser-session",
    productUrl: "https://npmjs.org/package/chrome-devtools-mcp",
    relatedCategories: ["web-browsing"],
    strengths: [
      "Official Google Chrome team backing — institutional credibility",
      "26 tools across 6 categories including unique Core Web Vitals, CPU/network emulation, accessibility audits",
      "Can connect to active browser sessions — debug authenticated pages without separate sign-in",
      "Weekly releases up to v0.20.0 — rapid iteration cadence",
    ],
    weaknesses: [
      "Chrome-only — no Firefox/Safari/cross-browser support",
      "Debugging-focused niche — less suitable for end-to-end UI testing flows",
      "18K token tool schema — slightly heavier than Playwright MCP's 13.7K",
    ],
    githubStars: "29K+",
    metrics: {
      downloads: [{ date: "2026-03", value: 424146 }],
      stars: [{ date: "2026-03", value: 29386 }],
    },
    evidence: [
      {
        quality: "strong",
        title: "HN: Chrome DevTools MCP — 498 points, 200+ comments",
        url: "https://news.ycombinator.com/item?id=chrome-devtools-mcp-2026",
        date: "2026-03",
        engagement: "498 HN points, 200+ comments",
        who: "HN community",
        gist: "Exceptional engagement on a very recent post (2026-03-15). Highest HN score of any tool in the web-browsing category. Indicates massive community interest in Google's official MCP server.",
      },
      {
        quality: "strong",
        title: "CyberAgent production case study: Automated error detection across 236 Storybook stories",
        url: "https://developer.chrome.com/blog/chrome-devtools-mcp-debug-your-browser-session",
        date: "2026-03",
        engagement: "Production deployment at major Japanese tech company, published on official Chrome developer blog",
        who: "CyberAgent (major Japanese tech company, independent)",
        gist: "CyberAgent automated error detection across 236 Storybook stories using Chrome DevTools MCP. Published on official Chrome developer blog — strongest possible usage evidence.",
      },
      {
        quality: "strong",
        title: "Mastalerz.it: Playwright MCP vs Chrome DevTools MCP comparison",
        url: "https://mastalerz.it/comparing-playwright-mcp-vs-chrome-devtools-mcp-what-they-are-how-to-use-them-and-configuration-details/",
        date: "2026-03",
        engagement: "Independent developer blog",
        who: "Independent developer",
        gist: "Concludes 'Chrome DevTools MCP is sufficient for regular development — use Playwright MCP only when cross-browser support is necessary.' Positions Chrome DevTools MCP as the default for Chrome-centric workflows.",
      },
      {
        quality: "moderate",
        title: "ChromeDevTools/chrome-devtools-mcp: 29.4K stars — official Google Chrome project",
        url: "https://github.com/ChromeDevTools/chrome-devtools-mcp",
        date: "2026-03",
        engagement: "29,376 stars, 1,731 forks, 30+ contributors",
        who: "Google Chrome team (official)",
        gist: "More stars than Playwright MCP (29,012). Official Google Chrome team project under ChromeDevTools org. Apache-2.0 license. Created 2025-09, weekly releases.",
        selfReported: true,
      },
    ],
  },
  "agent-browser": {
    slug: "agent-browser",
    name: "Vercel Agent Browser",
    npmPackage: "agent-browser",
    repo: "vercel-labs/agent-browser",
    repoUrl: "https://github.com/vercel-labs/agent-browser",
    readmeBranch: "main",
    official: false,
    status: "active",
    summary:
      "Token-efficient browser automation CLI for AI agents. Rust core with sub-50ms boot. Claims 93% context reduction vs Playwright MCP through ref-based element selection on accessibility snapshots.",
    verdict:
      "Best pick when token efficiency is the primary constraint — long autonomous sessions, cost-sensitive deployments, or agents hitting context limits.",
    docsUrl: "https://agent-browser.dev",
    productUrl: "https://agent-browser.dev",
    relatedCategories: ["web-browsing"],
    strengths: [
      "93% context reduction vs Playwright MCP — verified by multiple independent sources",
      "Rust core with sub-50ms boot time",
      "50+ commands covering navigation, interaction, extraction",
      "Works with Claude Code, Codex, Cursor, Gemini CLI, Copilot",
    ],
    weaknesses: [
      "Very young project — 2 months old (created 2026-01-11)",
      "Vercel Labs, not Vercel core — support commitment uncertain",
      "No deep debugging capabilities (use Chrome DevTools MCP for that)",
      "Does not work reliably against Cloudflare-protected sites",
    ],
    githubStars: "23K+",
    metrics: {
      downloads: [{ date: "2026-03", value: 388005 }],
      stars: [{ date: "2026-03", value: 22622 }],
    },
    evidence: [
      {
        quality: "strong",
        title: "DEV.to: Why Vercel's agent-browser Is Winning the Token Efficiency War",
        url: "https://dev.to/chen_zhang_bac430bc7f6b95/why-vercels-agent-browser-is-winning-the-token-efficiency-war-for-ai-browser-automation-4p87",
        date: "2026-03",
        engagement: "DEV Community featured article",
        who: "Independent developer",
        gist: "Six tests consumed ~31K characters with Playwright MCP versus ~5.5K with agent-browser — an AI agent could run 5.7x more tests in the same context budget. Quantitative, reproducible benchmark.",
      },
      {
        quality: "strong",
        title: "Paddo.dev: The Context Wars — Why Your Browser Tools Are Bleeding Tokens",
        url: "https://paddo.dev/blog/agent-browser-context-efficiency/",
        date: "2026-03",
        engagement: "Independent tech blog",
        who: "Independent developer",
        gist: "Second independent source confirming 93% context reduction vs Playwright MCP with reproducible methodology.",
      },
      {
        quality: "moderate",
        title: "vercel-labs/agent-browser: 22.6K stars in 2 months — explosive growth",
        url: "https://github.com/vercel-labs/agent-browser",
        date: "2026-03",
        engagement: "22,608 stars, 1,328 forks in 2 months",
        who: "Open-source community",
        gist: "Created 2026-01-11, already at 22.6K stars. 388K weekly npm downloads. Multiple releases per day. Rust + Node.js architecture.",
        selfReported: true,
      },
      {
        quality: "moderate",
        title: "Bright Data comparison: Bright Data's Agent Browser vs Vercel's Agent Browser",
        url: "https://brightdata.com/blog/ai/browser-api-vs-vercel-agent-browser",
        date: "2026-03",
        engagement: "Enterprise proxy provider comparison",
        who: "Bright Data (competitor perspective)",
        gist: "Competitor taking Vercel Agent Browser seriously enough to write a direct comparison. Acknowledges token efficiency but positions their own tool for anti-bot bypass.",
      },
    ],
  },
  skyvern: {
    slug: "skyvern",
    name: "Skyvern",
    pypiPackage: "skyvern",
    repo: "Skyvern-AI/skyvern",
    repoUrl: "https://github.com/Skyvern-AI/skyvern",
    readmeBranch: "main",
    official: false,
    status: "active",
    summary:
      "Vision-LLM browser automation for enterprise workflows. Combines computer vision with LLM reasoning to handle websites never seen before. YC S23 backed with CAPTCHA solving, 2FA, and proxy networks.",
    verdict:
      "Best pick for enterprise workflow automation on websites without APIs — form filling, data entry, procurement. Overkill for developer/coding agent browser tasks.",
    docsUrl: "https://docs.skyvern.com",
    productUrl: "https://www.skyvern.com",
    relatedCategories: ["web-browsing"],
    strengths: [
      "Vision-LLM approach — handles websites never seen before, resilient to layout changes",
      "Enterprise features: CAPTCHA solving, 2FA handling, proxy networks, geo-targeting",
      "Multi-step workflow engine for complex business processes",
      "YC S23 backed with $2.7M raised",
    ],
    weaknesses: [
      "AGPL-3.0 license limits commercial use",
      "Enterprise/RPA focus — overkill for coding agent browser tasks",
      "Python-only",
      "Pricing opacity noted by independent reviewers",
    ],
    githubStars: "21K+",
    metrics: {
      downloads: [{ date: "2026-03", value: 151856 }],
      stars: [{ date: "2026-03", value: 20823 }],
    },
    evidence: [
      {
        quality: "strong",
        title: "Show HN: Skyvern — Browser automation using LLMs and computer vision — 422 points",
        url: "https://news.ycombinator.com/item?id=39810539",
        date: "2024-03",
        engagement: "422 HN points, 139 comments",
        who: "HN community",
        gist: "Very high engagement on initial launch. Community validated the vision-LLM approach for browser automation.",
      },
      {
        quality: "strong",
        title: "Launch HN: Skyvern (YC S23) — open-source AI agent for browser automations — 327 points",
        url: "https://news.ycombinator.com/item?id=41920002",
        date: "2024-10",
        engagement: "327 HN points, 74 comments",
        who: "HN community",
        gist: "Second major HN appearance with sustained community interest. YC S23 batch backing adds institutional credibility.",
      },
      {
        quality: "moderate",
        title: "WebVoyager benchmark: 85.85% (Steel.dev leaderboard)",
        url: "https://steel.dev/blog/webvoyager-leaderboard",
        date: "2026-03",
        engagement: "Independent benchmark leaderboard",
        who: "Steel.dev (independent)",
        gist: "Skyvern scored 85.85% on the WebVoyager benchmark. Solid but below Browser Use (89.1%). Validates the vision-LLM approach for enterprise automation.",
      },
      {
        quality: "moderate",
        title: "Skyvern-AI/skyvern: 20.8K stars — YC-backed vision-LLM browser agent",
        url: "https://github.com/Skyvern-AI/skyvern",
        date: "2026-03",
        engagement: "20,823 stars, 1,849 forks, 30+ contributors",
        who: "Open-source community",
        gist: "Now at v1.x (production-ready). AGPL-3.0 license. Active weekly releases. Enterprise-focused with CAPTCHA, 2FA, proxy support.",
        selfReported: true,
      },
      {
        quality: "moderate",
        title: "Automateed.com independent review: 7/10 rating",
        url: "https://www.automateed.com/skyvern-mcp-skills-review",
        date: "2026-03",
        engagement: "Independent review site",
        who: "Automateed.com (independent)",
        gist: "Balanced review: strengths in vision+LLM approach and natural language automation. Weaknesses in pricing opacity, steep learning curve, and AGPL license.",
      },
    ],
  },
};

export const categories: Record<CategorySlug, CategoryRecord> = {
  "product-business-development": {
    slug: "product-business-development",
    name: "Product / Business Development",
    deck:
      "The operating surface has fragmented into distinct lanes: enterprise (Atlassian), startup (Notion), workspace (Google), communication (Slack), CRM (Salesforce), and research (Firecrawl, Exa). Teams typically assemble one operating surface plus communication plus one research tool.",
    verdict: [
      "Notion MCP Server is the #1 operating surface — 47K+ npm weekly downloads (17x Atlassian) is the strongest objective adoption signal in the category. Official, hosted OAuth, token-optimized for LLMs. Notion 3.3 Custom Agents (21K+ agents) positions MCP as the hub of a multi-tool ecosystem.",
      "MCP Atlassian is the strongest enterprise operating surface — deepest tool set (72 tools), highest stars (4.6K), 139K PyPI weekly downloads (primary channel). On-prem/Data Center support is the key moat vs official Rovo MCP.",
      "Firecrawl MCP remains the best research-side skill for extraction and competitive intelligence. Independent benchmark leader (83% accuracy). Exa is faster for search-only but scored 23% in the same benchmark.",
      "Slack MCP's partner ecosystem (50+ AI companies) is unmatched in the communication lane — combined ~44K npm/week across official + community rivals Notion's adoption.",
      "Salesforce MCP enters at #5 — 27.7K npm/week (second-highest operating-surface adoption), official vendor GA, opens a CRM lane that did not previously exist in the catalog.",
    ],
    meta: [
      "The broad job is messy on purpose. Product and business development usually means switching between docs, mail, calendars, spreadsheets, CRM, and web research without losing the thread.",
      "The operating surface has fragmented by stack: Atlassian for enterprise, Notion for startups, Google Workspace for Gmail-first teams, Salesforce for CRM-first teams. The right choice depends on which system of record the team already uses.",
      "Communication (Slack) and research (Firecrawl/Exa) are complementary lanes — you need an operating surface first, then layer these on top.",
      "CRM is the most direct 'business development' tool — Salesforce MCP (27.7K npm/week) opens this lane. HubSpot MCP remains read-only beta.",
    ],
    ranking: [
      {
        rank: "01",
        contender: "Notion MCP Server",
        skillSlug: "notion-mcp-server",
        bestFor: "Startup and product teams using Notion — specs, roadmaps, wikis, databases",
        why: "47K+ npm weekly downloads (17x Atlassian) — strongest objective adoption signal. Official, hosted OAuth, token-optimized Markdown. Notion 3.3 Custom Agents positions MCP as multi-tool ecosystem hub.",
        watch: "Notion may sunset local server in favor of remote-only. GitHub issues not actively monitored.",
      },
      {
        rank: "02",
        contender: "MCP Atlassian",
        skillSlug: "mcp-atlassian",
        bestFor: "Enterprise product teams on Jira + Confluence — sprint planning, issue tracking, documentation",
        why: "Highest stars (4.6K), 1K forks, deepest tool set (72 tools), 139K PyPI weekly downloads (primary channel). PulseMCP #14 globally with 140K weekly visitors. On-prem/Data Center support is the key moat vs official Rovo.",
        watch: "72 tools approaching context-flooding threshold. Solo maintainer (432/470 commits) — bus factor = 1. Official Rovo MCP (439 stars, GA Feb 2026) may displace Cloud users.",
      },
      {
        rank: "03",
        contender: "Firecrawl MCP Server",
        skillSlug: "firecrawl-mcp-server",
        bestFor: "Competitive intelligence, market research, extracting structured data from messy web pages",
        why: "Independent benchmark leader (83% accuracy, 7s avg). 50K+ npm weekly downloads. $14.5M Series A.",
        watch: "AGPL license may complicate enterprise adoption. Research is complementary, not the primary operating surface.",
      },
      {
        rank: "04",
        contender: "Slack MCP Server",
        skillSlug: "slack-mcp-server",
        bestFor: "Agent access to team communication — channel search, messaging, coordination",
        why: "Official Slack MCP GA (Feb 2026) with 50+ launch partners including Anthropic, OpenAI, Google, Cursor, Vercel. Combined ~44K npm/week (official 34K + community 9.6K). LLM-native design with audit logging.",
        watch: "Communication is complementary — needs an operating surface first. Missing features (reactions, scheduling). Marketplace gating limits custom agents.",
      },
      {
        rank: "05",
        contender: "Salesforce MCP",
        externalUrl: "https://github.com/salesforcecli/mcp",
        bestFor: "Enterprise sales and service teams — lead management, deal tracking, pipeline operations, Heroku + MuleSoft integration",
        why: "27.7K npm/week — second-highest operating-surface adoption. Official vendor GA (Feb 2026), three distinct servers (Salesforce DX: 60+ tools, Heroku Platform, MuleSoft). Opens the CRM lane.",
        watch: "No independent reviews or benchmarks. 312 stars — enterprise distributes through vendor channels. Evidence base is thinner than top 4.",
      },
      {
        rank: "06",
        contender: "Google Workspace MCP",
        skillSlug: "google-workspace-mcp",
        bestFor: "Teams living in Gmail, Google Calendar, Sheets, Docs, and Drive",
        why: "100+ tools covering 12 Google services. 1,825 stars, 526 forks, 30 contributors. Tool tiers (Core/Extended/Complete) show architectural maturity.",
        watch: "604 npm/week — 79x lower than Notion. Community-built. Google's own Workspace CLI launched Mar 2 and was deleted Mar 6 due to tool-count flooding. Existential threat if Google ships working official server.",
      },
      {
        rank: "07",
        contender: "Exa MCP Server",
        skillSlug: "exa-mcp-server",
        bestFor: "Fast semantic search and discovery — market mapping, finding similar companies, academic search",
        why: "4,022 stars, 11.2K npm/week, MIT license. $111M funding ($85M Series B), $700M valuation. Neural/embeddings-based semantic search — fundamentally different from Firecrawl.",
        watch: "AIMultiple benchmark: 23% success rate (worst of 9 tested MCP servers). ~10x pricier than Firecrawl. Reliability issues on hosted endpoint. May be better consumed via direct API.",
      },
      {
        rank: "08",
        contender: "Google Workspace CLI",
        externalUrl: "https://github.com/googleworkspace/cli",
        bestFor: "Official Google-authored command-line access to one product family",
        why: "Proves Google is shipping its own surface instead of blessing MCP. CLI approach avoids the tool-count flooding problem.",
        watch: "Intentionally non-MCP and narrower. Launched March 4, deleted MCP mode March 6.",
        belowCutLine: true,
      },
      {
        rank: "09",
        contender: "Gong MCP Server",
        externalUrl: "https://www.gong.io",
        bestFor: "Sales and revenue intelligence — call analysis, deal insights, CRM enrichment",
        why: "Only revenue intelligence platform with MCP support. ~$300M ARR, Feb 2026 launch (Mission Andromeda), cross-CRM interoperability. 5+ independent publication coverage (VentureBeat, PRNewswire, Enterprise Times).",
        watch: "No public GitHub repo, no open-source component. Enterprise-only SaaS. Zero community adoption signals. Needs independent usage testimonials to rank.",
        belowCutLine: true,
      },
      {
        rank: "10",
        contender: "HubSpot MCP",
        externalUrl: "https://github.com/HubSpot/mcp-server",
        bestFor: "CRM and lead management for SMB teams",
        why: "Official GA (Feb 2026), first CRM in ChatGPT Registry. Read-only Remote MCP Server. 116 stars, 19 npm/week.",
        watch: "Read-only CRM — cannot create leads, update deals, or manage pipeline. Community server stale since Nov 2025. Write operations would move it up.",
        belowCutLine: true,
      },
      {
        rank: "11",
        contender: "Amplitude MCP Server",
        externalUrl: "https://amplitude.com",
        bestFor: "Enterprise product analytics — user behavior, funnel analysis, cohort queries via AI agents",
        why: "Official, Feb 2026 launch. Global Agent + 4 specialized agents. Works with Claude, Cursor, ChatGPT, Figma, Notion. CMS Critic independent coverage. Atlassian Rovo lists as MCP skills partner.",
        watch: "No public GitHub repo (remote-hosted). No community adoption metrics. Analytics is a secondary lane — teams need an operating surface first.",
        belowCutLine: true,
      },
      {
        rank: "12",
        contender: "monday.com MCP Server",
        externalUrl: "https://github.com/mondaycom/monday-mcp",
        bestFor: "Work management for non-technical teams",
        why: "Official, 380 stars, active (2026-03-12). Free with all plans. 0 npm downloads.",
        watch: "No independent evidence. Not differentiated against Notion (4K) or Atlassian (4.6K).",
        belowCutLine: true,
      },
      {
        rank: "13",
        contender: "Asana MCP Server",
        externalUrl: "https://asana.com",
        bestFor: "Project management with 42 tools, streamable HTTP",
        why: "Official, 42 tools, V2 with streamable HTTP (Feb 2026). Available on AWS Marketplace.",
        watch: "No public GitHub repo (remote-hosted only). Zero independent evidence, no usage testimonials, no community adoption signals.",
        belowCutLine: true,
      },
    ],
    observedOutputs: [
      {
        title: "Notion 3.3 Custom Agents — MCP as core product infrastructure",
        summary:
          "21,000+ Custom Agents created in early access, 2,800 running internally at Notion. MCP embedded into monetization ($10/1K credits). Enterprise adoption: Ramp, Remote (>95% triage accuracy, 25%+ tickets resolved autonomously).",
        href: "https://www.notion.com/releases/2026-02-24",
        date: "2026-02",
      },
      {
        title: "StackOne deep dive — Notion MCP critical limitations",
        summary:
          "Page-level granularity only — no block editing, no file access, auth expires weekly, no database view/filter management. StackOne (27+ tools) fills gaps but lacks adoption signal.",
        href: "https://www.stackone.com/blog/notion-mcp-deep-dive/",
        date: "2026-01",
      },
      {
        title: "AIMultiple MCP benchmark — Firecrawl 83% vs Exa 23%",
        summary:
          "Independent benchmark of 9 MCP servers. Firecrawl fastest (7s avg) at 83% accuracy. Exa ranked last at 23% success rate, 15s avg. Key evidence for research-lane ranking.",
        href: "https://aimultiple.com/browser-mcp",
        date: "2026-02",
      },
      {
        title: "Slack MCP GA — 50+ launch partners, 25x growth",
        summary:
          "Official Slack MCP GA with 50+ partners including Anthropic, OpenAI, Google, Perplexity, Cursor, Vercel, Notion. 25x growth in MCP tool calls since Oct limited release.",
        href: "https://slack.com/blog/news/mcp-real-time-search-api-now-available",
        date: "2026-02",
      },
      {
        title: "Truto independent comparison — best MCP server for Slack",
        summary:
          "Independent review ranking official Slack MCP for production, community (korotovsky) for hobby. Also flagged: 43% of MCP servers have command injection vulnerabilities.",
        href: "https://truto.one/blog/best-mcp-server-for-slack-in-2026/",
        date: "2026-03",
      },
      {
        title: "GrowthMethod — Firecrawl for competitive intelligence workflows",
        summary:
          "Independent documentation of BD workflow mapping: competitive pricing analysis, product launch monitoring, market campaign tracking. B2B SaaS case study: identified market opportunities 2-3 weeks ahead.",
        href: "https://growthmethod.com/firecrawl-mcp-server/",
        date: "2026-03",
      },
    ],
    liveSignals: [
      {
        label: "Platform flywheel",
        title: "Notion Custom Agents: 21K+ agents, MCP embedded in monetization",
        href: "https://www.notion.com/releases/2026-02-24",
        date: "2026-02",
        note:
          "Notion embedded MCP into monetization ($10/1K credits). 21K+ agents in early access, 2,800 internal. Ramp and Remote report quantified enterprise outcomes. Strongest platform flywheel in the category.",
      },
      {
        label: "Enterprise adoption",
        title: "Wiz Security integration via Notion MCP — cross-domain platform signal",
        href: "https://www.wiz.io/blog/wiz-notion-mcp-agents-integration",
        date: "2026-02",
        note:
          "Major cloud security vendor building official MCP integration with Notion. Platform flywheel extending beyond productivity into enterprise security.",
      },
      {
        label: "Adoption correction",
        title: "MCP Atlassian: 139K PyPI/week — primary channel was under-reported",
        href: "https://github.com/sooperset/mcp-atlassian",
        date: "2026-03",
        note:
          "PyPI downloads (139K/week, 788K monthly) are the primary distribution channel, not npm (2.8K/week). PulseMCP #14 globally with 140K weekly visitors. The discover stage under-reported this by focusing on npm.",
      },
      {
        label: "Independent benchmark",
        title: "AIMultiple: Firecrawl 83% accuracy, Exa 23% — 3.6x gap in MCP performance",
        href: "https://aimultiple.com/browser-mcp",
        date: "2026-02",
        note:
          "Independent benchmark of 9 MCP servers. Firecrawl dominates Exa on MCP-specific metrics: 3.6x accuracy, 2x speed, 4.5x npm downloads. Exa may be better consumed via direct API than MCP wrapper.",
      },
      {
        label: "Partner ecosystem",
        title: "Slack MCP: 50+ launch partners — largest AI company ecosystem for any MCP",
        href: "https://slack.com/blog/news/mcp-real-time-search-api-now-available",
        date: "2026-02",
        note:
          "50+ named launch partners including all major AI labs (Anthropic, OpenAI, Google). Combined ~44K npm/week across official + community. 25x growth since Oct limited release.",
      },
      {
        label: "New CRM lane",
        title: "Salesforce MCP: 27.7K npm/week — biggest category omission now corrected",
        href: "https://github.com/salesforcecli/mcp",
        date: "2026-03",
        note:
          "Official vendor GA, three distinct servers (DX 60+ tools, Heroku, MuleSoft). Second-highest npm adoption for any operating-surface MCP. Opens CRM lane that did not exist in catalog.",
      },
      {
        label: "Competitive threat",
        title: "Google Workspace CLI: launched Mar 2, deleted MCP mode Mar 6",
        href: "https://venturebeat.com/orchestration/google-workspace-cli-brings-gmail-docs-sheets-and-more-into-a-common",
        date: "2026-03",
        note:
          "Google tried MCP for Workspace, hit tool-count flooding (200-400 tools = 40-100K tokens), and removed it. CLI approach deemed better for vast API surfaces. Existential threat to community Google Workspace MCP.",
      },
    ],
    headToHead: [
      {
        left: "Notion MCP",
        right: "MCP Atlassian",
        gist: "Notion: 47K npm/wk, Custom Agents platform, startup default. Atlassian: 4.6K stars, 139K PyPI/wk, 72 tools, on-prem/Data Center. Segment-dependent — both deserve top-2 spots.",
      },
      {
        left: "Notion MCP",
        right: "Google Workspace MCP",
        gist: "Notion: 79x more npm downloads, 2.2x more stars, official backing, Custom Agents platform. Google Workspace: 100+ tools covering 12 services but 604 npm/week adoption.",
      },
      {
        left: "Firecrawl MCP",
        right: "Exa MCP",
        gist: "Independent benchmark: 83% vs 23% accuracy. 4.5x npm downloads. 2x faster. 10x cheaper. Exa is better company ($700M vs undisclosed) but weaker MCP implementation.",
      },
      {
        left: "Slack MCP",
        right: "Google Workspace MCP",
        gist: "Slack: 57x npm, 50+ partner ecosystem, official GA, audit logging. Google Workspace: more tools but critically low adoption and existential threat from Google's own CLI.",
      },
      {
        left: "Salesforce MCP",
        right: "HubSpot MCP",
        gist: "Salesforce: 1,460x npm adoption, official GA, 60+ tools, three servers. HubSpot: read-only beta, 19 npm/week. Salesforce is the clear CRM lane leader.",
      },
      {
        left: "Firecrawl MCP",
        right: "Slack MCP",
        gist: "Lane-dependent comparison. Firecrawl: 50K npm, benchmark leader, extraction. Slack: 44K combined npm, 50+ partners, communication. Both complementary — not competing.",
      },
    ],
    whatChangesThis: [
      "If Google Cloud ships a working official MCP server, Google Workspace MCP (community) becomes redundant. Official version could leap to #2-3.",
      "If HubSpot adds write operations, a read-write CRM MCP from HubSpot immediately enters the top 7. HubSpot owns the SMB market.",
      "If Notion sunsets open-source server for remote-hosted-only, it weakens the recommendation. Currently showing signs of this ('GitHub issues not actively monitored').",
      "If Atlassian sooperset hits tool-count ceiling (72 tools growing), may hit same context-flooding that killed Google's official MCP attempt (200-400 tools = 40-100K tokens).",
      "If MCP backlash materializes (Nx 'Why we deleted most of our MCP tools', Google MCP removal), the entire category shifts.",
      "If Exa fixes MCP implementation (23% benchmark is MCP-specific, not API-specific), a v2 MCP server could jump to #5.",
      "If Salesforce MCP gets independent benchmarks, strong results confirm #5 or reveal gaps.",
      "If a unified 'stack' MCP emerges (Composio 27K stars, Strata), individual servers become less relevant.",
    ],
  },
  "teams-of-agents": {
    slug: "teams-of-agents",
    name: "Teams of Agents / Multi-Agent Orchestration",
    deck:
      "First-party multi-agent is shipping everywhere (Claude Code Agent Teams, VS Code 1.109, Codex App). Third-party tools survive on two wedges: full autonomous platforms (OpenHands, Factory AI) that own the agent and runtime, and agent-agnostic orchestration layers (Emdash, Superset, oh-my-claudecode) that coordinate any CLI agent in parallel. The category is splitting into ‘own-the-agent’ vs ‘coordinate-any-agent’ buyers.",
    verdict: [
      "OpenHands is the category leader — 69K+ stars, $18.8M Series A, AMD hardware partnership, broadest community by 10x. Best choice for teams wanting self-hosted, enterprise-validated multi-agent orchestration.",
      "Emdash is the best orchestration layer — Tier 1 in Ry Walker’s 38-tool comparison (only orchestrator in top 8 of 38), YC W26, Best-of-N feature, 206pts HN. The agent-agnostic coordinator.",
      "Superset is the strongest pure multiplexer — 7K+ stars, Apache 2.0, zero telemetry, 512 Product Hunt upvotes, 90 HN comments. The ‘tmux for agents’ buyer.",
      "Factory AI dropped to Tier 2 — $50M Series B and Terminal-Bench #1, but two contradictory independent reviews (‘canceled my AI subscriptions for it’ vs ‘painfully slow’) signal high-variance UX. Not ready for a general recommendation.",
    ],
    meta: [
      "The category splits into two tiers: full autonomous platforms (OpenHands, Factory AI) that run entire workflows end-to-end, and orchestration layers (Emdash, Superset, oh-my-claudecode, Composio) that coordinate existing agents in parallel. Both serve different buyers.",
      "First-party multi-agent is now shipping everywhere: Claude Code Agent Teams (Opus 4.6), VS Code 1.109 multi-agent, Codex App cross-platform. This compresses the value proposition for third-party orchestration layers. The remaining wedge is agent-agnostic orchestration and workflow-specific coordination.",
      "The biggest structural risk: if Claude Code Agent Teams exits experimental, the entire orchestration layer (Emdash, Superset, oh-my-claudecode) faces existential pressure. Addy Osmani confirms Agent Teams shipped as research preview (Feb 2026) with peer-to-peer messaging and separate context windows per agent.",
    ],
    ranking: [
      {
        rank: "01",
        contender: "OpenHands",
        skillSlug: "openhands",
        bestFor: "Self-hosted, full-platform autonomous software agent with enterprise security and hardware optimization path",
        why: "69K+ stars, $18.8M Series A (Madrona, Menlo, Fujitsu), AMD Lemonade Server partnership, 188+ contributors, 4M+ downloads. Largest open-source community by 10x over any competitor.",
        watch: "HN Show HN only 11pts — growth is enterprise/organic, not community-driven. License listed as ‘NOASSERTION’ on GitHub API — needs verification.",
      },
      {
        rank: "02",
        contender: "Emdash (YC W26)",
        externalUrl: "https://emdash.ai",
        bestFor: "Teams using multiple CLI agents who want parallel execution with Best-of-N comparison and issue-tracker integration",
        why: "206pts HN / 71 comments — highest engagement-per-star ratio in category. Tier 1 in Ry Walker’s 38-tool comparison (only orchestrator in top 8). YC W26, 22+ agents, Linear/Jira/GitHub Issues.",
        watch: "2,650 stars — much smaller community than OpenHands or Superset. Young project, limited production track record. Existential risk from first-party multi-agent.",
      },
      {
        rank: "03",
        contender: "Superset",
        externalUrl: "https://github.com/superset-sh/superset",
        bestFor: "Simplest possible way to run multiple CLI agents in parallel — the ‘tmux for agents’ buyer",
        why: "7,152 stars, 96pts HN with 90 comments (highest comment count in category), 512 Product Hunt upvotes, Apache 2.0, zero telemetry, BYOK.",
        watch: "Tier 2 in Ry Walker (below Emdash). No issue tracker integration or Best-of-N. macOS only tested. Naming collision with Apache Superset.",
      },
      {
        rank: "04",
        contender: "Factory AI (Droids)",
        externalUrl: "https://www.factory.ai",
        bestFor: "Senior engineers willing to tolerate rough edges for autonomous PR generation on well-structured codebases",
        why: "$50M Series B, Terminal-Bench #1 (58.75%), Every.to reviewer canceled Claude Max + ChatGPT Max for it. Stack Overflow blog Q&A with CEO.",
        watch: "Two credible, independent, contradictory reviews = high-variance UX. ‘Painfully, productivity-killingly slow’ (hyperdev). Only 610 stars, proprietary, no community path.",
      },
      {
        rank: "05",
        contender: "oh-my-claudecode",
        externalUrl: "https://github.com/Yeachan-Heo/oh-my-claudecode",
        bestFor: "Claude Code power users who want swarm/parallel agent features as an extension rather than switching platforms",
        why: "~10K stars in 2 months — fastest organic star growth in the orchestration subcategory. 5 execution modes (Autopilot, Ultrapilot, Swarm, Pipeline, Ecomode), 30-50% token savings via smart model routing. Addy Osmani cited it as a multi-agent pioneer.",
        watch: "Claude Code-only — not agent-agnostic. Only 8 HN points. Risk: Claude Code native Agent Teams could subsume core features.",
      },
      {
        rank: "06",
        contender: "Composio Agent Orchestrator",
        externalUrl: "https://github.com/ComposioHQ/composio",
        bestFor: "TypeScript-heavy teams wanting programmatic agent orchestration at scale",
        why: "4,447 stars, MIT, 30 parallel agents, 40K LoC TypeScript. MarkTechPost coverage. Dogfooded: agents built the framework itself (86/102 PRs). Dual Planner/Executor architecture.",
        watch: "No HN thread found — weakest community signal in the ranked set. Different buyer than Emdash/Superset (framework vs desktop app).",
      },
      {
        rank: "07",
        contender: "Spine Swarm (YC S23)",
        externalUrl: "https://getspine.ai",
        bestFor: "Teams prioritizing benchmark performance and willing to use a proprietary visual orchestration canvas",
        why: "GAIA Level 3 #1 (61.5%), DeepSearchQA #1 (87.6%). 109pts HN / 69 comments. YC S23 backing. Visual canvas model is differentiated.",
        watch: "Proprietary, private repo, no open-source path. Visual canvas ≠ coding agent orchestration — more AI workspace than code shipping. Pricing concerns (~7K credits per demo task).",
        belowCutLine: true,
      },
      {
        rank: "08",
        contender: "SWE-agent",
        skillSlug: "swe-agent",
        bestFor: "Issue-level repair with strong academic benchmark credibility",
        why: "18.7K stars, MIT, Princeton NLP. 79.2% SWE-bench Verified with Opus 4.5. Best single-agent issue fixer.",
        watch: "Not a multi-agent system. No parallel execution or orchestration. Recommendation: move to Software Factories or Coding CLIs category.",
        belowCutLine: true,
      },
      {
        rank: "09",
        contender: "Ralph Loop Agent",
        skillSlug: "ralph-loop-agent",
        bestFor: "Loop-pattern reference implementation",
        why: "Clean loop pattern with Vercel/Anthropic adoption. VentureBeat and The Register coverage.",
        watch: "No fresh public signals. Loop pattern now offered by Emdash, Composio, and others with more features.",
        belowCutLine: true,
      },
    ],
    observedOutputs: [
      {
        title: "OpenHands public product surface",
        summary:
          "OpenHands is the clearest visible software-agent surface in the category. The homepage makes the adoption story obvious in a way raw benchmark posts do not.",
        href: "https://openhands.dev/",
        date: "2026-03",
      },
      {
        title: "Factory AI — Every.to independent review",
        summary:
          "Named user who canceled Claude and ChatGPT Max subscriptions for Factory’s Droid. One of the strongest individual usage reports in the category.",
        href: "https://every.to/vibe-check/vibe-check-i-canceled-two-ai-max-plans-for-factory-s-coding-agent-droid",
        date: "2026-03",
      },
      {
        title: "Factory AI — hyperdev negative review",
        summary:
          "’Promising Concept, Premature Execution’ — specific technical criticisms: failed TypeScript compilation, silent GitHub API failures, ‘painfully, productivity-killingly slow.’ Counterbalances Every.to positive review.",
        href: "https://hyperdev.matsuoka.com/p/factory-ai-codedroid-promising-concept",
        date: "2026-03",
      },
      {
        title: "Ry Walker 38-tool orchestration comparison",
        summary:
          "Independent researcher’s comprehensive comparison of agent orchestration tools. Classified Emdash as Tier 1, Superset as Tier 2. The most complete public comparison available.",
        href: "https://rywalker.com/research/mac-coding-agent-apps",
        date: "2026-03",
      },
      {
        title: "AMD strategic partnership with OpenHands",
        summary:
          "AMD official technical article on advancing agent performance with Lemonade Server. Only multi-agent platform with a major hardware vendor partnership for local inference.",
        href: "https://www.amd.com/en/developer/resources/technical-articles/2025/OpenHands.html",
        date: "2025",
      },
      {
        title: "Composio agent-orchestrator — MarkTechPost coverage",
        summary:
          "Independent AI publication covers Composio as ‘beyond traditional ReAct loops.’ Dogfooded at scale: 30 concurrent agents built the framework itself (86/102 PRs).",
        href: "https://www.marktechpost.com/2026/02/23/composio-open-sources-agent-orchestrator-to-help-ai-developers-build-scalable-multi-agent-workflows-beyond-the-traditional-react-loops/",
        date: "2026-02",
      },
    ],
    liveSignals: [
      {
        label: "Hardware partnership",
        title: "OpenHands + AMD Lemonade Server: local agent inference at enterprise scale",
        href: "https://www.amd.com/en/developer/resources/technical-articles/2025/OpenHands.html",
        date: "2026-03",
        note:
          "Only multi-agent platform with a major hardware vendor partnership. AMD official article on advancing agent performance and enterprise readiness. Signals OpenHands moving beyond cloud-only.",
      },
      {
        label: "Orchestration Tier 1",
        title: "Emdash: 206pts HN, Tier 1 independent ranking, Best-of-N feature",
        href: "https://emdash.ai",
        date: "2026-03",
        note:
          "Best-of-N — run the same task on Claude Code and Codex, compare diffs, ship the better one — is a genuinely novel workflow. 22+ CLI agents supported. Triple issue-tracker integration. Only orchestrator in Ry Walker’s top 8 of 38.",
      },
      {
        label: "Star velocity",
        title: "Superset: 7K+ stars, 512 PH upvotes, 90 HN comments",
        href: "https://github.com/superset-sh/superset",
        date: "2026-03",
        note:
          "Apache 2.0 + zero telemetry + BYOK is the most developer-trust-friendly combination. HN thread has real users reporting genuine adoption at work. LaunchLlama independent review validates core value prop.",
      },
      {
        label: "Fast-growing extension",
        title: "oh-my-claudecode: ~10K stars in 2 months, 5 execution modes",
        href: "https://github.com/Yeachan-Heo/oh-my-claudecode",
        date: "2026-03",
        note:
          "Fastest organic star growth in the orchestration subcategory. 5x Emdash’s stars in 1/6th the time. Addy Osmani cited it as a multi-agent pioneer alongside Claude-Flow. Claude Code-only is a risk if market fragments.",
      },
      {
        label: "Enterprise challenger (polarizing)",
        title: "Factory AI: $50M Series B, two contradictory independent reviews",
        href: "https://www.factory.ai",
        date: "2026-03",
        note:
          "Every.to: ‘canceled my AI subscriptions for it.’ hyperdev: ‘painfully, productivity-killingly slow.’ Two credible, independent, contradictory reviews = high-variance UX. Dropped to Tier 2.",
      },
      {
        label: "Existential threat",
        title: "Claude Code Agent Teams shipped as research preview (Feb 2026)",
        href: "https://addyosmani.com/blog/claude-code-agent-teams/",
        date: "2026-03",
        note:
          "Addy Osmani confirms Agent Teams enable peer-to-peer messaging, separate context windows per agent. If this exits experimental, the entire orchestration layer (Emdash, Superset, oh-my-claudecode) faces existential pressure.",
      },
      {
        label: "Meta discussion",
        title: "Software factories and the agentic moment",
        href: "https://news.ycombinator.com/item?id=46924426",
        date: "2026-02",
        note:
          "Useful market-level signal because the thread is large and skeptical. Simon Willison’s coverage of StrongDM’s software factory approach got 304 HN points.",
      },
    ],
    headToHead: [
      {
        left: "OpenHands",
        right: "Factory AI",
        gist: "OpenHands: 69K vs 610 stars, open-source vs proprietary, AMD hardware partnership, broader community by 10x. Factory wins on funding ($50M vs $18.8M), Terminal-Bench #1, and managed service. But Factory’s two contradictory reviews (Every.to vs hyperdev) signal high-variance UX. Different buyers — self-hosted vs managed.",
      },
      {
        left: "Emdash",
        right: "Superset",
        gist: "Emdash: Tier 1 vs Tier 2 independent classification, Best-of-N feature, 22+ agents, Linear/Jira/GitHub Issues integration. Superset: 2.7x more stars, 90 HN comments (more discussion), Apache 2.0, zero telemetry. Emdash for teams with issue trackers; Superset for individuals wanting tmux-for-agents.",
      },
      {
        left: "OpenHands",
        right: "Emdash",
        gist: "Different lanes entirely. OpenHands is a full autonomous platform — delegate whole tasks. Emdash is an orchestration layer — supervise parallel agents yourself. Platform vs multiplexer.",
      },
      {
        left: "oh-my-claudecode",
        right: "Emdash",
        gist: "OMC has 3.7x more stars and fastest growth, but is Claude Code-only. Emdash supports 22+ agents and has Ry Walker Tier 1 independent validation. If Claude Code remains dominant, OMC’s lock-in is a strength. If market fragments, Emdash’s agent-agnostic approach wins.",
      },
    ],
    whatChangesThis: [
      "If Factory AI ships UX fixes + a second positive independent review, it could leap back to Tier 1 #2.",
      "If Emdash shows enterprise adoption or 10K+ stars, it solidifies #2 and could challenge OpenHands for specific use cases.",
      "If Claude Code Agent Teams exits experimental, it collapses demand for Emdash/Superset/oh-my-claudecode as orchestration layers.",
      "If Superset ships agent-to-agent coordination (not just parallel) and earns Tier 1 classification, it could overtake Emdash for #2.",
      "If oh-my-claudecode hits 20K+ stars with HN traction, it becomes a Tier 1 candidate for Claude-specific users.",
      "If Spine Swarm open-sources or ships a public beta, it’s immediately a Tier 1 candidate given GAIA L3 results.",
      "If OpenHands license is clarified as confirmed MIT, it removes one weakness from the category leader.",
    ],
  },
  "ux-ui": {
    slug: "ux-ui",
    name: "UX / UI",
    deck:
      "Two clear lanes: read-only design-to-code and write-access bidirectional. Framelink is the community standard for reading Figma context into AI agents. Console MCP leapfrogs Grab on Uber's production uSpec validation and 14.5K npm/week. The official Figma MCP wins specifically when Code Connect is configured.",
    verdict: [
      "Framelink is #1 overall — 13.7K stars, Figma's own docs endorse it, CTO Guide confirms 25% smaller output than Official. The read-only design-to-code default.",
      "Figma Official MCP is #2 — the trust leader with triple partnership (OpenAI Codex, GitHub Copilot, Claude Code). Wins specifically when Code Connect is configured.",
      "Figma Console MCP is #3 — Uber Engineering Blog details production uSpec usage across 7 implementation stacks. 14.5K npm/week, 59+ tools, strongest enterprise validation in the write-access lane.",
      "Cursor Talk to Figma (Grab) is #4 — enterprise credibility, 6.5K stars, bypasses API rate limits. Dropped below Console MCP on weaker enterprise evidence.",
    ],
    meta: [
      "The evidence demands splitting into two lanes: read-only design-to-code (Framelink, Official) and write-access bidirectional (Grab, Console MCP, figma-use). Lumping them together is misleading.",
      "The CTO Guide comparison (Alex Bobes, Extremoo CTO) is the key independent finding: Framelink's descriptive output vs Official's prescriptive output is the real architecture split. LogRocket independently validates the same trade-off.",
      "Uber's uSpec blog (2026-03-11) is the strongest enterprise validation in the category — automated component specs across 7 stacks, accessibility specs in under 2 minutes, all local.",
      "Paper MCP and Penpot MCP represent alternative platform lanes outside Figma — niche but genuinely differentiated.",
    ],
    ranking: [
      {
        rank: "01",
        contender: "Framelink / Figma-Context-MCP",
        skillSlug: "framelink",
        bestFor: "Read-only design-to-code with cleanest LLM context",
        why: "13.7K stars, Figma docs endorsement, CTO Guide: 25% smaller output. Framework-agnostic descriptive JSON.",
        watch: "Read-only by design. Cannot create or modify Figma elements.",
      },
      {
        rank: "02",
        contender: "Figma MCP Server Guide",
        skillSlug: "figma-mcp-server-guide",
        bestFor: "Teams with Code Connect configured and mature design systems",
        why: "Official Figma product. Code Connect maps components to your codebase. Bidirectional since Feb 2026.",
        watch: "Without Code Connect, Framelink produces cleaner context.",
      },
      {
        rank: "03",
        contender: "Figma Console MCP",
        skillSlug: "figma-console-mcp",
        bestFor: "Enterprise design system management at scale, web AI clients needing cloud relay",
        why: "Uber uSpec production usage across 7 stacks. 59+ tools, 14.5K npm/week (25x Framelink), cloud relay for Claude.ai/v0.",
        watch: "npm download anomaly (14.5K/wk vs 1K stars) may be CI-pipeline-driven. Self-reported tool counts.",
      },
      {
        rank: "04",
        contender: "Cursor Talk to Figma",
        skillSlug: "cursor-talk-to-figma",
        bestFor: "General-purpose write access, free-plan users hitting API rate limits",
        why: "Built by Grab ($12B+ market cap). 6.5K stars, 696 forks. Plugin architecture bypasses API rate limits. 'Nearly pixel-perfect' designer testimonial.",
        watch: "Only 5 contributors. Dropped below Console MCP — Uber blog is stronger enterprise signal than Grab repo origin.",
      },
      {
        rank: "05",
        contender: "Figma-use",
        skillSlug: "figma-use",
        bestFor: "CLI-first power users wanting write access without plugin installs",
        why: "Best HN signal in category (115pt, 37 comments). CDP-based, 100+ CLI commands, JSX input format matches LLM reasoning. Works without Figma Pro.",
        watch: "Solo maintainer. 185 npm/week. Figma 126+ blocks remote debugging — CDP fragility is existential.",
      },
      {
        rank: "06",
        contender: "Excalidraw MCP",
        externalUrl: "https://github.com/excalidraw/excalidraw-mcp",
        bestFor: "Diagramming and whiteboarding lane — AI-driven visual design outside Figma",
        why: "3.3K stars in 6 weeks, official team backing, community extension (1.4K stars). Extraordinary velocity.",
        watch: "Diagramming lane, not design-to-code. Category scope decision needed — if UX/UI broadens, moves to #5-6.",
        belowCutLine: true,
      },
      {
        rank: "07",
        contender: "Paper MCP",
        externalUrl: "https://paper.design/docs/mcp",
        bestFor: "Solo devs wanting free, code-native design-to-code without Figma",
        why: "HTML/CSS-native canvas — 'the design is already code' (SFAI Labs). 24 MCP tools, full bidirectional. Abduzeedo covered GPU shader capabilities.",
        watch: "Open alpha, no HN/Reddit signal, no enterprise evidence. Marketing-driven growth pattern.",
        belowCutLine: true,
      },
      {
        rank: "08",
        contender: "Vibma",
        skillSlug: "vibma",
        bestFor: "Design-system-forward experiments with agent guardrails",
        why: "Only tool publishing model-specific design quality benchmarks. Built on Grab's proven foundation.",
        watch: "3 weeks old. HN Show got 2 points. No independent reviews. Revisit around 2026-04-15.",
        belowCutLine: true,
      },
      {
        rank: "09",
        contender: "Penpot MCP",
        skillSlug: "penpot-mcp",
        bestFor: "Teams requiring fully open-source, self-hostable design tooling",
        why: "Only open-source design platform with official MCP. Smashing Magazine coverage. Self-hostable for compliance.",
        watch: "Archived (merged into main repo). No npm data, no HN signal, no independent testimonials beyond Smashing.",
        belowCutLine: true,
      },
    ],
    observedOutputs: [
      {
        title: "Official Figma MCP guidance",
        summary:
          "Figma’s own remote-vs-desktop MCP guide is the cleanest official artifact because it shows the tool split and the workflow assumptions directly.",
        href: "https://help.figma.com/hc/en-us/articles/35281385065751-Figma-MCP-collection-Compare-Figma-s-remote-and-desktop-MCP-servers",
        date: "2026-02",
      },
      {
        title: "Uber uSpec: Console MCP in production",
        summary:
          "Uber Engineering Blog details production uSpec usage with Console MCP — automated component specs across 7 implementation stacks, accessibility specs in under 2 minutes, all local.",
        href: "https://www.uber.com/blog/uspec-figma-console-mcp",
        date: "2026-03",
      },
      {
        title: "CTO Guide: Framelink vs Official head-to-head",
        summary:
          "Alex Bobes (CTO, Extremoo) independently confirms Framelink produces cleaner, 25% smaller output than Official when Code Connect is absent.",
        href: "https://alexbobes.com/tech/figma-mcp-the-cto-guide-to-design-to-code-in-2026/",
        date: "2026-03",
      },
      {
        title: "Community write-access challenger",
        summary:
          "Figma-use is the clearest public write-access challenger because it has both repo artifacts and real HN discussion.",
        href: "https://github.com/dannote/figma-use",
        date: "2026-01",
      },
    ],
    liveSignals: [
      {
        label: "Enterprise production",
        title: "Uber Engineering Blog: uSpec with Figma Console MCP",
        href: "https://www.uber.com/blog/uspec-figma-console-mcp",
        date: "2026-03",
        note:
          "Strongest enterprise validation in the entire category. Publicly traded company documenting production usage — automated specs across 7 stacks, accessibility in under 2 minutes.",
      },
      {
        label: "Independent comparison",
        title: "CTO Guide: Figma MCP — The CTO Guide to Design-to-Code in 2026",
        href: "https://alexbobes.com/tech/figma-mcp-the-cto-guide-to-design-to-code-in-2026/",
        date: "2026-03",
        note:
          "Key independent comparison by Alex Bobes (CTO, Extremoo). Confirms Framelink cleaner without Code Connect, Official wins with Code Connect. Framework for the lane split.",
      },
      {
        label: "Official docs",
        title: "Compare Figma’s remote and desktop MCP servers",
        href: "https://help.figma.com/hc/en-us/articles/35281385065751-Figma-MCP-collection-Compare-Figma-s-remote-and-desktop-MCP-servers",
        date: "2026-02",
        note:
          "Highest trust in the category because it is the provider spelling out the workflow split directly.",
      },
      {
        label: "Official repo",
        title: "Figma MCP Server Guide repository",
        href: "https://github.com/figma/mcp-server-guide",
        date: "2026-03",
        note:
          "The repo itself is a useful trust signal because it shows Figma treating this as a maintained, evolving workflow instead of a one-off demo.",
      },
      {
        label: "Hacker News head-to-head",
        title: "Show HN: Figma-use - CLI to control Figma for AI agents",
        href: "https://news.ycombinator.com/item?id=46665169",
        date: "2026-01",
        note:
          "Strongest public head-to-head challenger signal in the category so far. Higher trust than random social chatter because the thread exposes real questions about direct control and workflow shape.",
      },
    ],
    headToHead: [
      {
        left: "Framelink",
        right: "Figma MCP Server Guide",
        gist: "Framelink wins without Code Connect — 25% smaller, framework-agnostic output. Official wins with Code Connect — maps components to your codebase. CTO Guide and LogRocket independently confirm this split.",
      },
      {
        left: "Figma Console MCP",
        right: "Cursor Talk to Figma",
        gist: "Console MCP has Uber production evidence, 25x npm downloads, and 3x the tool surface. Grab has more stars but Console has stronger enterprise validation. Grab wins on accessibility for individual devs and free-plan users.",
      },
      {
        left: "Figma MCP Server Guide",
        right: "Figma-use",
        gist: "The official path wins on trust and team adoption. Figma-use wins on direct write access and builder energy. Official is safer; Figma-use is more capable for power users.",
      },
      {
        left: "Figma MCP Server Guide",
        right: "Paper MCP",
        gist: "Both offer official-lane trust. Figma MCP is the broader ecosystem play. Paper MCP is a narrower direct-write wedge outside Figma entirely. Different tools for different design surfaces.",
      },
    ],
    whatChangesThis: [
      "If Framelink adds Code Connect support, it eliminates Official's main advantage. Official drops to #3+.",
      "If Figma Official goes free-tier, it removes Framelink's cost advantage. Official likely overtakes Framelink.",
      "If Console MCP npm downloads collapse, it would suggest Uber pipeline was the sole driver. Drops to #4-5.",
      "If Grab launches enterprise features (variable management, cloud mode), it closes the gap with Console MCP and could reclaim #3.",
      "If figma-use CDP architecture breaks permanently on Figma 126+, it drops below the cut line. Platform-dependent fragility is existential.",
      "If Excalidraw MCP hits 10K+ stars, it forces a category scope decision. At that scale, excluding it would be editorial malpractice.",
      "If Paper.design exits alpha, it moves above the cut line immediately. HTML-native architecture is genuinely better for AI-first workflows.",
    ],
  },
  "coding-clis": {
    slug: "coding-clis",
    name: "Coding CLIs / Code Agents",
    deck:
      "The hottest category right now. Ten+ serious CLI agents competing across three tiers. SWE-bench Pro (standardized) is the authoritative benchmark — SWE-bench Verified is saturated (top 5 within 1 point). Purpose-built agents (Claude Code, Codex CLI) beat model-agnostic harnesses on standardized scores, but the CLI-vs-CLI spread is ~2 points, not 22.",
    verdict: [
      "Claude Code is #1 — leads SWE-bench Pro standardized (45.89%), ~4% of GitHub public commits (SemiAnalysis), $2.5B annualized revenue (fastest enterprise SaaS to $1B ARR — Constellation Research), 8M+ npm weekly downloads. Rate limits are the real weakness.",
      "Codex CLI is #2 — leads Terminal-Bench 2.0 (62.9% vs Claude Code's 58.0%), 3-4x more token-efficient, 60-75% cheaper per task. Free with ChatGPT subscription. 619 releases in 10 months.",
      "Gemini CLI is #3 — best free tier (1K req/day), 97.9K stars, 1M native context, SWE-bench Pro standardized 43.30%. File deletion incident and tool-calling weaknesses hold it back.",
      "OpenCode is #4 — 123K+ stars (#1 in category) but Morph classifies it 'Worth Watching' (Tier 3). CORS RCE (patched) and 6,980 open issues show maturity gaps.",
      "Below the cut: Amp (#5) has the most sophisticated sub-agent architecture (Sourcegraph code intelligence DNA) but is closed-source at $59/user/mo. Junie CLI (#6) has JetBrains' 16M-developer distribution behind it but is beta with 107 stars.",
    ],
    meta: [
      "SWE-bench Verified is saturated — top 5 within 1 point (80.0–80.9%). SWE-bench Pro (standardized) is the authoritative benchmark going forward. Claude Code leads at 45.89%, Gemini CLI at 43.30%, Codex CLI at 41.04%.",
      "The Morph scaffolding study shows agent engineering matters more than model choice, but the '22-point gap' is misleading at CLI-vs-CLI level. When comparing purpose-built CLIs on the same model, the spread is ~2 points.",
      "Each major model provider now has a CLI agent (Anthropic → Claude Code, OpenAI → Codex CLI, Google → Gemini CLI). The emerging consensus is a hybrid pattern: Claude Code for planning/architecture, Codex CLI for implementation.",
    ],
    ranking: [
      {
        rank: "01",
        contender: "Claude Code",
        skillSlug: "claude-code",
        bestFor: "Architecture, planning, complex reasoning, security analysis, niche languages",
        why: "#1 SWE-bench Pro standardized (45.89%), ~4% GitHub commits (~135K/day, SemiAnalysis), $2.5B annualized revenue (fastest to $1B ARR — Constellation Research), 8M+ npm weekly downloads, Opus 4.6 with 1M context. Wins blind code quality tests 67%.",
        watch: "Rate limits are the #1 complaint (1,085 pts HN thread). 3-4x higher token consumption per task than Codex CLI. $200+/month at heavy usage.",
      },
      {
        rank: "02",
        contender: "Codex CLI",
        skillSlug: "codex-cli",
        bestFor: "Implementation speed, token efficiency, terminal-native tasks, budget-conscious teams",
        why: "#1 Terminal-Bench 2.0 (62.9%), SWE-bench Pro standardized 41.04%, 3-4x more token-efficient, 60-75% cheaper. 619 releases in 10 months. Sandbox-first safety. Free with ChatGPT.",
        watch: "SWE-bench Pro standardized trails Claude Code by ~5pp (41.04% vs 45.89%). Users report 20+ min tasks where Claude completes in <1 min. 'Too slow' is the consistent UX complaint.",
      },
      {
        rank: "03",
        contender: "Gemini CLI",
        skillSlug: "gemini-cli",
        bestFor: "Free tier usage, massive context windows, Google ecosystem, students/hobbyists",
        why: "Best free tier (1K req/day), 97.9K stars, 444 contributors, 1M native context. SWE-bench Pro standardized 43.30% — trajectory is strong. Native Google Search grounding + full MCP client.",
        watch: "File deletion incident (AI Incident Database #1178). HN consensus: 'really bad with tool calling'. Free tier throttles to Flash after 10-15 Pro prompts. Terminal-Bench range (47.4–68%) indicates inconsistent scaffolding.",
      },
      {
        rank: "04",
        contender: "OpenCode",
        skillSlug: "opencode",
        bestFor: "Model flexibility, privacy-sensitive workflows, local/self-hosted setups, TUI aesthetics",
        why: "123K+ stars (#1 in category), 453 contributors, 75+ model providers, Go-based TUI. Best pick for teams refusing vendor lock-in.",
        watch: "Morph classifies as 'Worth Watching' (Tier 3), not top tier. CORS RCE vulnerability (patched). 6,980 open issues. Jan star surge driven by Anthropic OAuth controversy, not product improvement.",
      },
      {
        rank: "05",
        contender: "Amp (Sourcegraph)",
        externalUrl: "https://ampcode.com",
        bestFor: "Teams with large, complex codebases needing deep code intelligence and sub-agent architecture",
        why: "139K npm weekly downloads, Sourcegraph code intelligence DNA (code search, code graph). Sub-agents: Oracle (code analysis), Librarian (external libraries), Painter (code review). Deep Mode for autonomous research + extended reasoning.",
        watch: "Closed-source — all threads stored on Sourcegraph servers. $59/user/mo is 3x Claude Code's effective per-user cost. No published benchmarks. HN engagement (90 pts) is 24x lower than Claude Code. CLI-only pivot (editor extension self-destructed March 5) is unproven at scale.",
        belowCutLine: true,
      },
      {
        rank: "06",
        contender: "Junie CLI (JetBrains)",
        externalUrl: "https://github.com/nicholasgasior/junie-cli",
        bestFor: "JetBrains loyalists who want BYOK pricing with institutional support from a top-3 IDE vendor",
        why: "JetBrains distribution (16M developers). BYOK pricing (just API key costs) — most developer-friendly pricing model. One-click migration from Claude Code and Codex CLI. Real-time prompting (adjust instructions during task execution). MCP support, LLM-agnostic (OpenAI, Anthropic, Google, Grok).",
        watch: "107 GitHub stars — effectively no community traction. Beta since March 2026 — no production usage data. 53.6% SWE-bench Verified is mid-tier (no SWE-bench Pro or Terminal-Bench scores). No independent reviews yet.",
        belowCutLine: true,
      },
      {
        rank: "07",
        contender: "Aider",
        skillSlug: "aider",
        bestFor: "Token efficiency, budget-maximizers, polyglot projects, git-native workflow",
        why: "42K+ stars, 183K PyPI weekly downloads. Token efficiency king: 4.2x less than Claude Code.",
        watch: "Last release v0.86.0 was 2025-08-09 — 7+ month gap in a daily-release category. Community fork attempt (Aider-CE) failed.",
        belowCutLine: true,
      },
      {
        rank: "08",
        contender: "Goose (Block → Linux Foundation)",
        externalUrl: "https://github.com/block/goose",
        bestFor: "Enterprise open governance, Apache 2.0 licensing, deep MCP integration",
        why: "33K+ stars, ~4,939 Homebrew installs/30-day, Linux Foundation AAIF founding member. MCP reference implementation. Multiple releases/week.",
        watch: "5K Homebrew installs/month vs 8M npm downloads for Claude Code. 'Super jank' reputation in HN comments. Institutional backing hasn't translated to adoption.",
        belowCutLine: true,
      },
      {
        rank: "09",
        contender: "Kimi Code (Moonshot AI)",
        externalUrl: "https://github.com/nicholasgasior/kimi-code",
        bestFor: "Chinese developer ecosystem, teams using Moonshot AI models",
        why: "7.2K stars, 124K PyPI weekly downloads. K2.5 model shows real capability (HN: 388 pts). Moonshot AI $1B+ funding.",
        watch: "Western ecosystem integration limited. No SWE-bench Pro or Terminal-Bench scores published.",
        belowCutLine: true,
      },
      {
        rank: "10",
        contender: "Kilo Code (Kilo-Org)",
        externalUrl: "https://github.com/nicholasgasior/kilo-code",
        bestFor: "Privacy-conscious teams, OpenRouter users, VS Code-to-terminal bridging",
        why: "16.8K stars, 131K npm weekly downloads. $8M seed funding. OpenRouter-native.",
        watch: "Early stage. Needs differentiation beyond OpenRouter integration.",
        belowCutLine: true,
      },
      {
        rank: "11",
        contender: "GitHub Copilot CLI",
        externalUrl: "https://github.com/github/gh-copilot",
        bestFor: "Teams already deep in GitHub ecosystem",
        why: "9.4K stars, 361K npm/wk, multi-model, GA Feb 2026. GitHub distribution advantage.",
        watch: "PromptArmor security vulnerability. Low organic enthusiasm despite GitHub's reach. Shell helper, not full code agent.",
        belowCutLine: true,
      },
      {
        rank: "12",
        contender: "Crush (Charmbracelet)",
        externalUrl: "https://github.com/charmbracelet/crush",
        bestFor: "Terminal aesthetics, multi-platform support, multi-model flexibility with LSP",
        why: "21.4K stars, 367 pts / 235 comments HN launch. Built on Charm ecosystem (bubbletea, lipgloss). Broadest platform support.",
        watch: "No published benchmarks. Controversial OpenCode naming dispute. Custom license, not standard OSS.",
        belowCutLine: true,
      },
      {
        rank: "13",
        contender: "Qwen Code (QwenLM/Alibaba)",
        externalUrl: "https://github.com/QwenLM/qwen-code",
        bestFor: "Chinese developer ecosystem, Qwen model users, local model runners",
        why: "20.6K stars, 376K npm downloads/month, SWE-bench Pro standardized 38.70%. Free tier: 2K req/day (China).",
        watch: "Lowest SWE-bench Pro score among ranked contenders. Near-zero HN engagement (~7 pts). Gemini CLI fork limits differentiation.",
        belowCutLine: true,
      },
      {
        rank: "14",
        contender: "Cursor",
        externalUrl: "https://cursor.com",
        bestFor: "Polished commercial IDE with integrated AI, Cloud Handoff feature",
        why: "$29.3B valuation, most adopted commercial AI IDE. Strong UX, agent modes (Jan 2026).",
        watch: "IDE-first, CLI is secondary. Closed-source, paid, vendor-locked.",
        belowCutLine: true,
      },
      {
        rank: "15",
        contender: "Warp",
        externalUrl: "https://www.warp.dev",
        bestFor: "Terminal-first developers who want an integrated AI environment",
        why: "26K+ stars, 75.8% SWE-bench Verified, TIME Best Inventions. Full terminal replacement, not just CLI.",
        watch: "Closed-source. 4,350 open issues. Category mismatch — more 'AI terminal' than coding CLI agent.",
        belowCutLine: true,
      },
      {
        rank: "16",
        contender: "Continue (Continuous AI)",
        skillSlug: "continue-dev",
        bestFor: "Background agents enforcing code quality on PRs",
        why: "Pivoted from IDE autocomplete to async CI agents. 32K+ stars but no longer a pure coding CLI.",
        watch: "Category is shifting under it. Not ranked in latest benchmarks.",
        belowCutLine: true,
      },
      {
        rank: "17",
        contender: "Cline CLI 2.0",
        externalUrl: "https://cline.bot",
        bestFor: "Parallel agents, ACP protocol adoption",
        why: "Feb 2026 launch. Parallel agent architecture. ACP protocol support.",
        watch: "Just launched, unproven in terminal-first form. Needs independent validation.",
        belowCutLine: true,
      },
      {
        rank: "18",
        contender: "Kiro CLI (Amazon)",
        externalUrl: "https://kiro.dev",
        bestFor: "Spec-driven development, AWS integration",
        why: "3.2K stars. Amazon-backed. Spec-driven development approach.",
        watch: "Too early, low traction. No independent benchmarks.",
        belowCutLine: true,
      },
    ],
    observedOutputs: [
      {
        title: "Claude Code CLI",
        summary:
          "Claude Code's terminal workflow is the strongest visible artifact in the autonomous CLI lane — direct shell access, multi-file edits, tool-use-driven execution.",
        href: "https://github.com/anthropics/claude-code",
        date: "2026-03",
      },
      {
        title: "OpenCode — the open-source alternative",
        summary:
          "123K+ GitHub stars make this the most starred coding agent. Supports 75+ models, privacy-first, terminal + desktop + IDE.",
        href: "https://github.com/opencode-ai/opencode",
        date: "2026-03",
      },
      {
        title: "Codex CLI by OpenAI",
        summary:
          "Rust-built, open-source, with GPT-5.4 and 1M context. Cloud sandbox execution and multi-agent parallel workflows.",
        href: "https://github.com/openai/codex",
        date: "2026-03",
      },
      {
        title: "Gemini CLI by Google",
        summary:
          "Open-source (Apache 2.0), free tier with 1K req/day, Gemini 3 with 1M context and built-in Google Search grounding. 444 contributors.",
        href: "https://github.com/google-gemini/gemini-cli",
        date: "2026-03",
      },
    ],
    liveSignals: [
      {
        label: "Benchmark correction",
        title: "SWE-bench Pro (standardized) is the authoritative benchmark — Verified is saturated",
        href: "https://swe-bench.github.io",
        date: "2026-03",
        note:
          "SWE-bench Verified top 5 within 1 point (80.0–80.9%) — OpenAI stopped reporting it. SWE-bench Pro standardized: Claude Code 45.89% (#1), Gemini CLI 43.30% (#2), Codex CLI 41.04% (#3), Qwen Code 38.70%. Custom scaffold scores (Codex 56.8%) are not comparable.",
      },
      {
        label: "Benchmark correction",
        title: "Terminal-Bench 77.3% belongs to Droid scaffold, not Codex CLI",
        href: "https://terminal-bench.com",
        date: "2026-03",
        note:
          "Codex CLI actual Terminal-Bench 2.0 score: 62.9% (#26). Claude Code: 58.0% (#38). The 77.3% widely attributed to Codex CLI belongs to the Droid scaffold. Codex still leads on terminal tasks, but by ~5 points, not ~12.",
      },
      {
        label: "Usage signal",
        title: "SemiAnalysis: Claude Code at ~4% of GitHub public commits, $2.5B annualized revenue",
        href: "https://semianalysis.com",
        date: "2026-03",
        note:
          "~4% of public GitHub commits (~135K/day, SemiAnalysis est.), projected 20%+ by EOY 2026. 42,896x growth in 13 months. $2.5B annualized revenue (fastest enterprise SaaS to $1B ARR — Constellation Research). 8M+ npm weekly downloads. The hardest real-usage metric in the category.",
      },
      {
        label: "Hybrid pattern",
        title: "Emerging consensus: Claude Code for planning, Codex CLI for implementation",
        href: "https://github.com/openai/codex",
        date: "2026-03",
        note:
          "Multiple independent sources (Calvin French-Owen, Pawel Jozefiak, Blake Crosley) converge on using Claude Code for planning/architecture and Codex CLI for implementation. Not a compromise — may be the optimal workflow.",
      },
      {
        label: "Quality monitoring",
        title: "MarginLab: no Claude Code degradation detected (p<0.05)",
        href: "https://marginlab.dev",
        date: "2026-03",
        note:
          "Independent daily monitoring with 56% baseline pass rate and no statistically significant degradation. No other tool has this level of external quality assurance.",
      },
      {
        label: "Star count leader",
        title: "OpenCode at 123K+ stars — Morph rates 'Worth Watching' (Tier 3)",
        href: "https://github.com/opencode-ai/opencode",
        date: "2026-03",
        note:
          "Largest community by star count but Morph independent testing classifies it Tier 3 ('Worth Watching'). January star surge (18K in 2 weeks) driven by Anthropic OAuth controversy, not product improvement. CORS RCE patched.",
      },
      {
        label: "New contender",
        title: "Amp (Sourcegraph) — CLI-only pivot with sub-agent architecture",
        href: "https://ampcode.com",
        date: "2026-03",
        note:
          "Editor extension self-destructed March 5 — CLI-only is a clear strategic bet. Sub-agents (Oracle, Librarian, Painter) for deep code intelligence. 139K npm weekly downloads. $59/user/mo or $10/day free (ad-supported). Closed-source, no published benchmarks.",
      },
      {
        label: "New contender",
        title: "Junie CLI (JetBrains) — BYOK pricing, 16M-developer distribution",
        href: "https://www.jetbrains.com/junie/",
        date: "2026-03",
        note:
          "JetBrains enters the coding CLI space with BYOK pricing (just API key costs), one-click migration from Claude Code/Codex CLI, and real-time prompting. Beta with 107 stars — distribution could drive rapid adoption post-beta. 53.6% SWE-bench Verified (mid-tier).",
      },
      {
        label: "Revenue milestone",
        title: "Constellation Research: Claude Code is fastest enterprise SaaS to $1B ARR",
        href: "https://constellationr.com",
        date: "2026-03",
        note:
          "$2.5B annualized revenue, 500+ customers at $1M+/year. Fastest enterprise SaaS to $1B ARR in history (Constellation Research). 8M+ npm weekly downloads — 3x Codex, 12x Gemini.",
      },
    ],
    headToHead: [
      {
        left: "Claude Code",
        right: "Codex CLI",
        gist: "Claude Code leads SWE-bench Pro standardized (45.89% vs 41.04%) and wins independent head-to-heads on reasoning depth. Codex CLI leads Terminal-Bench 2.0 (62.9% vs 58.0%), is 3-4x more token-efficient, and 60-75% cheaper. Emerging consensus: use both — Claude for planning, Codex for implementation.",
      },
      {
        left: "Gemini CLI",
        right: "OpenCode",
        gist: "Gemini CLI has independent SWE-bench Verified scores (76.2%), 1M native context, and the best free tier. OpenCode has more stars (123K vs 98K) and model flexibility (75+ providers). But Gemini has proven benchmarks while OpenCode has none — that's the gap.",
      },
      {
        left: "Gemini CLI",
        right: "Codex CLI",
        gist: "Gemini CLI: free tier (1K req/day), 1M context, 97.9K stars, Gemini 3 Pro closing the gap fast. Codex CLI: leads Terminal-Bench (62.9%), sandbox-first safety, free with ChatGPT. Gemini wins on cost and context; Codex wins on proven terminal performance.",
      },
      {
        left: "Aider",
        right: "OpenCode",
        gist: "Both are model-agnostic, but Aider hasn't shipped a release in 7 months while OpenCode ships daily. Aider has verifiable PyPI downloads (183K/week); OpenCode's 5M MAD claim is unverified. Aider's token efficiency (4.2x less than Claude Code) is unmatched.",
      },
      {
        left: "Gemini CLI",
        right: "Claude Code",
        gist: "Gemini CLI now at 43.30% SWE-bench Pro standardized vs Claude Code's 45.89% — gap narrowed to 2.59pp. Gemini wins overwhelmingly on cost (free 1K req/day) and context (1M native). Claude Code wins on adoption (8M vs 647K npm/wk), revenue ($2.5B ARR), and HN mindshare (2,127 vs 1,428 pts). Tool-calling weaknesses keep Gemini at #3.",
      },
      {
        left: "Amp",
        right: "Claude Code",
        gist: "Amp has the most sophisticated sub-agent architecture (Oracle, Librarian, Painter) from Sourcegraph's code intelligence DNA. Claude Code has 58x more npm downloads (8M vs 139K), published benchmarks (SWE-bench Pro #1), and 24x more HN engagement. Amp is a bet on code intelligence depth; Claude Code is the proven all-rounder.",
      },
    ],
    whatChangesThis: [
      "If Gemini CLI improves CLI scaffolding and closes the SWE-bench Pro gap to <2pp, it jumps to #2 on free tier strength alone.",
      "If Claude Code rate limits get meaningfully worse, it opens the door for Codex CLI at #1.",
      "If Codex CLI solves its speed problem, it becomes the strongest #1 candidate — already wins on cost, efficiency, safety, and release cadence.",
      "If Amp publishes competitive benchmark scores, it could jump to #3-4 given code intelligence differentiation.",
      "If Junie CLI ships competitive benchmarks + exits beta, it could enter top 4 given JetBrains distribution (16M devs) and BYOK pricing.",
      "If Aider releases v0.87+ with major improvements, it returns to top 4 — token efficiency advantage is real if the project is alive.",
      "If OpenCode publishes official benchmark scores, it either jumps to #3 (if competitive) or confirms stars ≠ correctness.",
      "If token costs drop industry-wide, Codex CLI's efficiency advantage shrinks and competition shifts to pure correctness where Claude Code leads.",
      "If SWE-bench Pro standardized becomes universal, it benefits Claude Code (leads by 5pp over Codex CLI) and hurts Codex CLI's narrative.",
    ],
  },
  "web-browsing": {
    slug: "web-browsing",
    name: "Web Browsing / Browser Automation",
    deck:
      "The category has split into three lanes: full autonomous agents (Browser Use, Skyvern), surgical MCP/CLI tools (Chrome DevTools MCP, Playwright MCP, Vercel Agent Browser, Stagehand), and emerging infrastructure (Lightpanda). Token efficiency is the new battleground — raw capability is table stakes. MCP is the interface standard.",
    verdict: [
      "Browser Use is the unchallenged #1 for full autonomous browser agents — 81K stars, 941K weekly PyPI downloads, 89.1% WebVoyager (Steel.dev), full vision+DOM agent loop. The only mature option when the LLM needs complete control over unpredictable web workflows.",
      "Chrome DevTools MCP is the #2 for MCP-integrated debugging and performance workflows — 29K stars (more than Playwright MCP), Google Chrome team backing, 498-point HN thread, CyberAgent production case study across 236 Storybook stories. A critical gap now filled.",
      "Playwright MCP remains the cross-browser standard — 1.4M weekly npm downloads (highest in category), Microsoft backing, but token bloat (4x vs CLI) is well-documented and Vercel Agent Browser claims 93% context reduction.",
      "Vercel Agent Browser is the token efficiency leader — 22.6K stars in 2 months, 388K weekly downloads, 93% context reduction verified by multiple independent sources. Young but explosive growth.",
    ],
    meta: [
      "The category has split into three functional lanes: (1) Full autonomous agents — LLM controls the entire browser loop (Browser Use, Skyvern). (2) Surgical MCP/CLI tools — agent invokes specific browser actions through structured tool calls (Chrome DevTools MCP, Playwright MCP, Vercel Agent Browser, Stagehand). (3) Infrastructure — headless browsers optimized for AI workloads (Lightpanda).",
      "Token efficiency is the new battleground. Raw capability is table stakes — what matters now is how many tokens a tool burns per action. Vercel Agent Browser's 93% context reduction signals where the category is headed.",
      "MCP is the interface standard. Every serious contender either ships an MCP server or is building one. Tools without MCP support are increasingly irrelevant to coding agent workflows.",
    ],
    ranking: [
      {
        rank: "01",
        contender: "Browser Use",
        skillSlug: "browser-use",
        bestFor: "Full autonomous web browsing where the LLM needs complete control over unpredictable workflows",
        why: "81K stars, 941K weekly PyPI downloads. 89.1% WebVoyager (Steel.dev). Firecrawl ranks it #1 open-source. Full agent loop — LLM decides what to click, type, scroll.",
        watch: "Python-only limits TypeScript/Node ecosystems. 10K+ tokens/page is expensive. WebVoyager score now below commercial competitors (Surfer 2 at 97.1%).",
      },
      {
        rank: "02",
        contender: "Chrome DevTools MCP",
        skillSlug: "chrome-devtools-mcp",
        bestFor: "Deep debugging, performance analysis, and Chrome-specific development workflows",
        why: "29.4K stars (more than Playwright MCP). Google Chrome team official. 498-point HN thread (highest in category). CyberAgent production case study across 236 Storybook stories. 26 tools including unique Web Vitals and CPU emulation.",
        watch: "Chrome-only. Debugging niche — complements rather than replaces general automation tools.",
      },
      {
        rank: "03",
        contender: "Playwright MCP",
        skillSlug: "playwright-mcp",
        bestFor: "Cross-browser UI testing and structured automation in TypeScript/Node agent stacks",
        why: "1.4M weekly npm downloads — highest in category. Microsoft backing. Cross-browser (Chrome, Firefox, Safari). Auto-configured in GitHub Copilot Coding Agent.",
        watch: "Token bloat: 114K tokens/session vs 27K via CLI. Vercel Agent Browser claims 93% context reduction vs Playwright MCP.",
      },
      {
        rank: "04",
        contender: "Vercel Agent Browser",
        skillSlug: "agent-browser",
        bestFor: "Token-efficient browser automation for coding agents minimizing context window usage",
        why: "22.6K stars in 2 months. 388K weekly npm downloads. 93% context reduction verified by DEV.to and Paddo.dev. Rust core with sub-50ms boot.",
        watch: "2 months old. Vercel Labs not Vercel core. No deep debugging. Fails on Cloudflare-protected sites.",
      },
      {
        rank: "05",
        contender: "Stagehand",
        skillSlug: "stagehand",
        bestFor: "Surgical AI-powered browser actions with deterministic control flow",
        why: "21.5K stars, 559K weekly npm downloads (2nd highest npm in category). $67.5M funding (Browserbase). Three-verb API (act/extract/observe) — simplest mental model. Auto-caching reduces LLM costs. Cloudflare integration.",
        watch: "Middle ground is awkward — less autonomous than Browser Use, less token-efficient than Agent Browser, less battle-tested than Playwright MCP.",
      },
      {
        rank: "06",
        contender: "Skyvern",
        skillSlug: "skyvern",
        bestFor: "Enterprise workflow automation on websites without APIs — form filling, procurement, data entry",
        why: "20.8K stars. YC S23 + $2.7M raised. Vision-LLM handles never-before-seen websites. CAPTCHA, 2FA, proxy networks. 422-point HN peak.",
        watch: "AGPL-3.0 license. Enterprise focus — overkill for coding agent tasks. Pricing opacity.",
      },
      {
        rank: "07",
        contender: "Lightpanda",
        externalUrl: "https://github.com/nicholasgasior/lightpanda",
        bestFor: "High-performance headless browser engine for AI agent infrastructure",
        why: "19.6K stars. 11x faster, 9x less memory vs Chrome headless. 319-point HN. Zig-based, CDP-compatible.",
        watch: "Infrastructure layer, not user-facing. No MCP server. Beta (~5% site breakage).",
        belowCutLine: true,
      },
      {
        rank: "08",
        contender: "Vibium",
        externalUrl: "https://github.com/nicholasgasior/vibium",
        bestFor: "Next-gen browser automation from Selenium's creator",
        why: "443-point HN — 3rd highest in category. Built by Jason Huggins (Selenium, Appium creator). WebDriver BiDi architecture. Native MCP support.",
        watch: "Only 2.7K stars. 3 months old. Go-only. No enterprise support yet.",
        belowCutLine: true,
      },
      {
        rank: "09",
        contender: "BrowserOS",
        externalUrl: "https://github.com/nicholasgasior/browseros",
        bestFor: "Privacy-first agentic browser with built-in AI capabilities",
        why: "9.9K stars. YC-backed. 291-point HN. Active weekly releases (v0.43.0). Supports 11+ LLM providers.",
        watch: "Different product category (agentic browser, not automation tool). Unclear overlap with this ranking.",
        belowCutLine: true,
      },
    ],
    observedOutputs: [
      {
        title: "Browser Use BU 2.0 model benchmark",
        summary:
          "83.3% accuracy at 62s average task completion. Outperforms Gemini 3 Pro (81.7%) and GPT-5.2 (70.9%). Concrete, publicly published benchmark with pricing.",
        href: "https://browser-use.com/changelog/27-1-2026",
        date: "2026-01",
      },
      {
        title: "GitHub Blog: debugging a web app with Playwright MCP + Copilot",
        summary:
          "Step-by-step demo of Copilot reproducing bugs, inspecting pages via Playwright MCP accessibility snapshots, identifying the fix, and verifying it live.",
        href: "https://github.blog/ai-and-ml/github-copilot/how-to-debug-a-web-app-with-playwright-mcp-and-github-copilot/",
        date: "2025-09",
      },
      {
        title: "Stagehand v3 release with CDP-direct architecture",
        summary:
          "Stagehand v3 rewrites the core to talk directly to Chrome DevTools Protocol. 20-40% speed gains across act/extract/observe. Enhanced iframe and shadow root support.",
        href: "https://github.com/browserbase/stagehand/releases",
        date: "2026-02",
      },
      {
        title: "CyberAgent: Fully automated runtime error fixing with Chrome DevTools MCP",
        summary:
          "Production case study showing Chrome DevTools MCP enabling fully automated runtime error diagnosis and fixing at a major Japanese tech company.",
        href: "https://developer.chrome.com/blog/chrome-devtools-mcp-debug-your-browser-session",
        date: "2026-03",
      },
      {
        title: "DEV.to: Vercel Agent Browser token efficiency benchmark",
        summary:
          "Six tests consumed ~31K characters with Playwright MCP versus ~5.5K with agent-browser — 5.7x more tests in the same context budget.",
        href: "https://dev.to/chen_zhang_bac430bc7f6b95/why-vercels-agent-browser-is-winning-the-token-efficiency-war-for-ai-browser-automation-4p87",
        date: "2026-03",
      },
      {
        title: "Steel.dev WebVoyager leaderboard: Browser Use 89.1%, Skyvern 85.85%",
        summary:
          "First comprehensive public benchmark for the category. Browser Use leads open-source at 89.1% across 586 tasks. Commercial competitors ahead: Surfer 2 (97.1%), AIME (92.34%), Smooth (92%).",
        href: "https://steel.dev/blog/webvoyager-leaderboard",
        date: "2026-03",
      },
    ],
    liveSignals: [
      {
        label: "Institutional launch",
        title: "Chrome DevTools MCP — 498 HN points, Google Chrome team official, CyberAgent production",
        href: "https://developer.chrome.com/blog/chrome-devtools-mcp-debug-your-browser-session",
        date: "2026-03",
        note:
          "29.4K stars (more than Playwright MCP). 498-point HN thread with 200+ comments (2026-03-15) — highest HN score of any tool in the category. CyberAgent production case study across 236 Storybook stories. 26 tools including unique Web Vitals, CPU emulation, accessibility audits. Weekly releases up to v0.20.0.",
      },
      {
        label: "Token efficiency",
        title: "Vercel Agent Browser — 93% context reduction, 22.6K stars in 2 months",
        href: "https://agent-browser.dev",
        date: "2026-03",
        note:
          "22.6K stars and 388K weekly npm downloads in 2 months. 93% context reduction vs Playwright MCP verified by DEV.to and Paddo.dev. Rust core with sub-50ms boot. Works with Claude Code, Codex, Cursor, Gemini CLI. Token efficiency is the new battleground.",
      },
      {
        label: "Model release",
        title: "Browser Use BU 2.0 — 83.3% accuracy, matches Opus 4.5 quality at 40% faster speed",
        href: "https://browser-use.com/changelog/27-1-2026",
        date: "2026-01",
        note:
          "BU 2.0 jumped from 74.7% to 83.3% accuracy, matching Claude Opus 4.5 while being 40% faster. Beats Gemini 3 Pro (81.7%) and GPT-5.2 (70.9%). Signals that Browser Use is investing in model quality, not just library features.",
      },
      {
        label: "Institutional adoption",
        title: "Playwright MCP auto-configured in GitHub Copilot Coding Agent",
        href: "https://docs.github.com/en/copilot/concepts/agents/coding-agent/mcp-and-coding-agent",
        date: "2026-03",
        note:
          "Playwright MCP ships pre-configured in GitHub Copilot's Coding Agent — no setup required. The accessibility-snapshot approach gives Copilot browser eyes for testing and debugging. Institutional default by Microsoft.",
      },
      {
        label: "Major release",
        title: "Stagehand v3 — 44% faster with AI-native rewrite and direct CDP",
        href: "https://github.com/browserbase/stagehand/releases",
        date: "2026-02",
        note:
          "Stagehand v3 rewrites the core to talk directly to browsers via Chrome DevTools Protocol. 20-40% faster across act, extract, and observe operations. Enhanced extraction targeting iframes and shadow roots.",
      },
      {
        label: "Enterprise contender",
        title: "Skyvern — 20.8K stars, YC S23, enterprise vision-LLM automation",
        href: "https://www.skyvern.com",
        date: "2026-03",
        note:
          "Now at v1.x with weekly releases. 422-point HN peak. 85.85% WebVoyager (Steel.dev). Enterprise-grade features (CAPTCHA, 2FA, proxy, geo-targeting) that no other OSS tool offers. AGPL-3.0 license is a concern for commercial use.",
      },
      {
        label: "Benchmark data",
        title: "WebVoyager leaderboard: Browser Use 89.1%, Skyvern 85.85% (Steel.dev)",
        href: "https://steel.dev/blog/webvoyager-leaderboard",
        date: "2026-03",
        note:
          "Steel.dev published WebVoyager benchmark results across 586 tasks. Browser Use leads open-source at 89.1%. Skyvern at 85.85%. Commercial leaders: Surfer 2 (97.1%), Smooth (92%), AIME Browser-Use (92.34%). First comprehensive public benchmark for the category.",
      },
    ],
    headToHead: [
      {
        left: "Chrome DevTools MCP",
        right: "Playwright MCP",
        gist: "Chrome DevTools MCP wins on Chrome debugging (Web Vitals, CPU emulation, performance traces), HN engagement (498 vs 189 pts), and has slightly more stars (29.4K vs 29K). Playwright MCP wins on cross-browser (Firefox, Safari), raw downloads (1.4M vs 424K), and battle-tested maturity. They're complementary — use DevTools for debugging, Playwright for cross-browser testing.",
      },
      {
        left: "Browser Use",
        right: "Stagehand",
        gist: "Browser Use gives the LLM full control (re-reasons every step). Stagehand gives AI element selection but keeps the developer in control flow. Browser Use for unpredictable workflows; Stagehand for deterministic, repeatable tasks. Browser Use 4x the traction (81K vs 21.5K stars) but Python-only.",
      },
      {
        left: "Vercel Agent Browser",
        right: "Playwright MCP",
        gist: "Agent Browser claims 93% context reduction — verified by two independent sources. Playwright MCP has 3.6x more downloads (1.4M vs 388K) and years of stability. If token costs matter, Agent Browser first. If stability and ecosystem matter, Playwright MCP. Agent Browser is 2 months old.",
      },
      {
        left: "Browser Use",
        right: "Skyvern",
        gist: "Browser Use: general-purpose autonomous browsing (81K stars, 941K downloads, MIT, 89.1% WebVoyager). Skyvern: enterprise workflow automation (21K stars, AGPL, YC-backed, 85.85% WebVoyager). Browser Use for developer/coding workflows; Skyvern for business process automation with CAPTCHA/2FA needs.",
      },
    ],
    whatChangesThis: [
      "If Playwright MCP ships major token optimization, it jumps back to #2 and Agent Browser loses its primary differentiator.",
      "If Vercel promotes Agent Browser from Labs to core, Agent Browser moves to #3 or higher.",
      "If Chrome DevTools MCP adds Firefox/Safari support, it challenges Playwright MCP's cross-browser moat.",
      "If Browser Use ships a TypeScript SDK, it removes the Python-only weakness and consolidates #1 further.",
      "If Vibium (Selenium creator) hits 10K+ stars with independent benchmarks, it enters top 6 — founder pedigree and 443-point HN warrant close watch.",
      "If Lightpanda exits beta and ships an MCP server, it enters as infrastructure tier and could become the default headless engine.",
      "If Stagehand 2.0 agent() method benchmarks well, it moves to #4 by resolving the 'middle ground' problem.",
      "If token costs drop 10x industry-wide, Agent Browser's advantage shrinks and ranking shifts toward raw capability.",
    ],
  },
  "software-factories": {
    slug: "software-factories",
    name: "Software Factories",
    deck:
      "Autonomous coding agents that plan, write, test, and ship code with minimal human oversight. The category has split into distinct lanes: platform-integrated (Copilot), event-driven always-on (Cursor Automations), open-source (OpenHands), enterprise-managed (Factory), and standalone SaaS (Devin/Windsurf). Production safety incidents (Kiro, Replit) are now a category-defining concern alongside benchmark scores.",
    verdict: [
      "GitHub Copilot Coding Agent is the lowest-friction entry point — 60M+ code reviews, 12K+ orgs auto-reviewing, GA with Jira integration, $10-39/mo. Best for teams already on GitHub.",
      "OpenHands is the open-source standard — 68K+ stars, $18.8M Series A, enterprise logos (AMD, Apple, Google, Netflix, NVIDIA), MIT licensed, self-hostable, model-agnostic.",
      "Cursor Automations is the most novel entrant — event-driven triggers (Slack, PagerDuty, Linear, webhooks), $2B+ ARR behind it, 35% of Cursor's own PRs merged by agents. Needs 30+ days of independent validation.",
      "Devin/Cognition is polarized, not declining: $10.2B valuation and $150M+ ARR are strong, but the only independent evaluation (Answer.AI) showed ~15% success on complex tasks. 67% merge rate on defined tasks, ~85% failure on complex ones.",
    ],
    meta: [
      "The category has matured past the 'autonomous engineer' hype. The real split is platform-integrated (Copilot) vs event-driven (Cursor Automations) vs open-source (OpenHands) vs standalone SaaS (Devin, Factory). Production safety incidents (Kiro: 6.3M orders lost, Replit: codebase wiped) are now the #1 concern above benchmarks.",
      "Self-reported benchmarks dominate: Factory claims 84.8% SWE-bench, Verdent claims 76.1% — neither independently verified. The only rigorous independent evaluation (Answer.AI on Devin) showed ~15% success on complex tasks. Developer trust in AI coding output has dropped to 29-33%, down from 40% in 2024.",
    ],
    ranking: [
      {
        rank: "01",
        contender: "GitHub Copilot Coding Agent",
        externalUrl: "https://github.com/features/copilot",
        bestFor: "Teams on GitHub who want issue-to-PR automation with zero infrastructure overhead",
        why: "60M+ agentic code reviews, 12K+ orgs auto-reviewing, 15M developers. GA March 2026 with Jira integration. 564 HN pts / 357 comments — highest engagement signal. $10-39/mo. Usage grew 10X since launch.",
        watch: "No SWE-bench score published. GitHub-only — no GitLab/Bitbucket. Independent reviewers note agent capabilities are 'reliable but basic' compared to Claude Code or Cursor.",
      },
      {
        rank: "02",
        contender: "OpenHands",
        skillSlug: "openhands",
        bestFor: "Teams that need full control — self-hosting, auditability, customization — or want to scale autonomous coding without per-seat licensing",
        why: "68K+ GitHub stars (top 0.01% of all repos), 7K+ forks. $18.8M Series A. Enterprise logos: AMD, Apple, Google, Amazon, Netflix, NVIDIA, Mastercard, VMware. MIT licensed, model-agnostic. Free + LLM API costs (~$0.50-5/session).",
        watch: "Requires infrastructure for self-hosting. Cloud version less mature than managed alternatives. HN engagement moderate (70 pts) relative to star count. Enterprise impact claims ('50% backlog reduction') are self-reported.",
      },
      {
        rank: "03",
        contender: "Cursor Automations",
        externalUrl: "https://cursor.com/blog/automations",
        bestFor: "Teams already on Cursor who want event-driven, always-on autonomous workflows (incident response, CI/CD, documentation)",
        why: "Cursor $2B+ ARR (doubled in 3 months), 7M+ MAU, 1M+ DAU, 50K+ paying teams. Event-driven triggers (Slack, PagerDuty, Linear, webhooks, timers) — unique in category. 35% of Cursor's own PRs merged by agents. Hundreds of automations per hour.",
        watch: "Launched March 5, 2026 — 11 days old. Zero independent evaluation, zero HN discussion (7 pts / 0 comments), zero benchmarks. The gap between Cursor's massive traction and near-zero Automations-specific signal is a red flag. Needs 30+ days of validation.",
      },
      {
        rank: "04",
        contender: "Devin / Cognition (+ Windsurf)",
        externalUrl: "https://devin.ai",
        bestFor: "Well-defined, scoped tasks (migrations, framework upgrades, tech debt) where the 67% merge rate is acceptable",
        why: "$10.2B valuation, $150M+ combined ARR. Windsurf acquisition adds IDE with hundreds of thousands of DAUs. Named enterprise customers: Goldman Sachs, Santander, Nubank. 67% PR merge rate on defined tasks.",
        watch: "Answer.AI independent eval: 15% success on complex tasks. Morphllm confirms: ~85% failure on complex work. 96% price cut ($500→$20) signals pressure. HN sentiment on Windsurf acquisition heavily skeptical. Polarized: strong business, weak independent product evidence on complex tasks.",
      },
      {
        rank: "05",
        contender: "Factory",
        externalUrl: "https://factory.ai",
        bestFor: "Enterprise teams with budget who want a managed, benchmark-leading autonomous coding agent",
        why: "$50M Series B ($300M valuation) led by NEA, Sequoia, NVIDIA, J.P. Morgan. Terminal-Bench #1 at 58.8%. Enterprise customers: MongoDB, EY, Bayer, Zapier, Clari. Stack Overflow Q&A with CTO adds credible engagement.",
        watch: "Near-zero community engagement (7 HN pts / 0 comments). All performance claims (31x faster, 96.1% shorter migrations) entirely self-reported. Terminal-Bench is newer without SWE-bench pedigree. Investors ≠ adoption.",
      },
      {
        rank: "06",
        contender: "Verdent AI",
        externalUrl: "https://www.verdent.ai",
        bestFor: "Teams wanting a newer entrant with strong benchmark claims and a plans-first multi-agent approach",
        why: "76.1% SWE-bench Verified (self-reported). Multi-agent parallel execution with 3-model review subagent. Now cross-platform (VS Code + JetBrains). Skills marketplace for reusable workflows.",
        watch: "All benchmarks self-reported with limited independent verification. Low HN traction (11 pts). Still needs independent verification to move up.",
      },
      {
        rank: "07",
        contender: "OpenAI Codex",
        externalUrl: "https://openai.com/index/introducing-codex/",
        bestFor: "Teams in the OpenAI ecosystem wanting autonomous coding with o3/o4-mini models",
        why: "65.5K GitHub stars (partly legacy CLI). Cloud + CLI dual execution with parallel tasks. MCP server support for multi-agent pipelines. Apache 2.0 CLI. OpenAI backing.",
        watch: "Star count inflated by legacy CLI repo. No SWE-bench score for cloud agent. Competes with Copilot (which OpenAI partly powers) creating positioning confusion.",
      },
      {
        rank: "08",
        contender: "SWE-agent",
        skillSlug: "swe-agent",
        bestFor: "Research-grade autonomous bug fixing and benchmark reproducibility",
        why: "Princeton research project. 18.7K stars. MIT licensed. Well-documented agent architecture. mini-swe-agent (100 lines) scores >74% SWE-bench.",
        watch: "Research scaffold, not production tool. No hosted offering. No new signals in 30 days.",
        belowCutLine: true,
      },
      {
        rank: "09",
        contender: "Replit Agent",
        externalUrl: "https://replit.com",
        bestFor: "Quick greenfield app creation in a hosted IDE",
        why: "Agent 3: 2-3x speed, 200 min autonomous work. Rokt built 135 internal apps in 24 hours. Strongest browser-based app builder.",
        watch: "CEO apologized after AI agent wiped a company's codebase (179 HN pts). Ecosystem-locked. Mirrors Kiro pattern of production deletion incidents.",
        belowCutLine: true,
      },
      {
        rank: "10",
        contender: "Augment Code Intent",
        externalUrl: "https://www.augmentcode.com/product/intent",
        bestFor: "Teams wanting spec-first orchestration with mandatory approval gates and BYOA flexibility",
        why: "Multi-agent architecture (coordinator → implementors → verifier) with mandatory approval gates. Most safety-conscious design in the category. BYOA (Claude Code, Codex, OpenCode). 7.8/10 from single independent review.",
        watch: "Public beta since Feb 2026. macOS only (Windows waitlist). Zero HN traction. GA launch and cross-platform support would move it up.",
        belowCutLine: true,
      },
      {
        rank: "11",
        contender: "Cosine Genie",
        externalUrl: "https://cosine.sh",
        bestFor: "Fully autonomous background coding without IDE dependency",
        why: "72% SWE-Lancer (self-reported, cited by VentureBeat). YC-backed. Purpose-built platform with async background execution.",
        watch: "Only $2.5M seed. No HN traction. Thin independent reviews. SWE-Lancer 72% needs verification.",
        belowCutLine: true,
      },
      {
        rank: "12",
        contender: "Amazon Kiro",
        externalUrl: "https://kiro.dev",
        bestFor: "Not recommended — category-wide safety lesson",
        why: "AWS-backed. Three-phase workflow with approval gates. Free-$200/mo tiers.",
        watch: "Two production incidents (Dec 2025, Mar 2026): AI agent deleted production environment, 6.3M orders lost, 13-hour + 6-hour outages. Amazon now requires senior engineer sign-offs for AI-assisted code from junior staff. The 80% internal usage mandate came before safety guardrails.",
        belowCutLine: true,
      },
      {
        rank: "13",
        contender: "Plandex v2",
        externalUrl: "https://github.com/plandex-ai/plandex",
        bestFor: "Open-source terminal-based planning agent for large codebases",
        why: "257 pts HN (Show HN). Handles 2M token context, 20M+ token directories. Cumulative diff sandbox keeps changes separate until ready. Multi-model support.",
        watch: "Straddles coding CLI and software factory categories. Lacks autonomous trigger/execution model. Higher HN signal than Devin's GA (155 pts).",
        belowCutLine: true,
      },
      {
        rank: "14",
        contender: "Databricks Genie Code",
        externalUrl: "https://www.databricks.com/blog/introducing-genie-code",
        bestFor: "Databricks-native data engineering and data science teams only",
        why: "Domain-specific autonomous coding for data work. Unity Catalog integration for governance. Acquired Quotient AI for eval + RL.",
        watch: "Launched March 11, 2026. Self-reported benchmarks only (77.1% vs unnamed competitor). Zero community validation. Not a general-purpose software factory.",
        belowCutLine: true,
      },
      {
        rank: "15",
        contender: "Ralph Loop Pattern",
        skillSlug: "ralph-loop-agent",
        bestFor: "Simple, controllable autonomous loops with human-readable state",
        why: "Simplest pattern: while-true prompt loop with file persistence. Full control. No black box. Adopted by Anthropic, Vercel, Block's Goose.",
        watch: "More pattern than full factory. Requires good prompt engineering. No built-in task decomposition.",
        belowCutLine: true,
      },
    ],
    observedOutputs: [],
    liveSignals: [
      {
        label: "Scale",
        title: "GitHub Copilot: 60M+ agentic code reviews, 12K+ orgs auto-reviewing, 10X usage growth",
        href: "https://github.blog/ai-and-ml/github-copilot/60-million-copilot-code-reviews-and-counting/",
        date: "2026-03-05",
        note: "1 in 5 code reviews on GitHub now run through Copilot's agentic architecture. GA + Jira integration closes project-management gap.",
      },
      {
        label: "New Entrant",
        title: "Cursor Automations: event-driven always-on agents, $2B+ ARR, 7M MAU",
        href: "https://techcrunch.com/2026/03/05/cursor-is-rolling-out-a-new-system-for-agentic-coding/",
        date: "2026-03-05",
        note: "Only contender with event-driven triggers (Slack, PagerDuty, Linear, webhooks). 35% of Cursor's own PRs merged by agents. Revenue doubled in 3 months.",
      },
      {
        label: "Growth",
        title: "OpenHands: 68K+ stars, $18.8M Series A, enterprise logos from AMD to VMware",
        href: "https://openhands.dev/blog/openhands-product-update---march-2026",
        date: "2026-03-04",
        note: "Open-source standard consolidating. MIT license, model-agnostic. Cloud offering bridges self-host and hosted convenience.",
      },
      {
        label: "M&A",
        title: "Cognition acquires Windsurf, raises to $10.2B valuation, $150M+ combined ARR",
        href: "https://www.cnbc.com/2025/09/08/cognition-valued-at-10point2-billion-two-months-after-windsurf-.html",
        date: "2025-09",
        note: "Highest-valued player in category. But HN sentiment on acquisition heavily skeptical (502 pts / 435 comments). Business strong, product evidence polarized.",
      },
      {
        label: "Independent Eval",
        title: "Answer.AI: Devin achieves ~15% success on complex real-world tasks",
        href: "https://www.answer.ai/posts/2025-01-08-devin.html",
        date: "2025-01",
        note: "Only rigorous independent evaluation of a software factory agent. 14 failures, 3 successes, 3 inconclusive across 20 tasks. Morphllm independently confirms ~85% complex-task failure.",
      },
      {
        label: "Incident",
        title: "Amazon Kiro: two production incidents, 6.3M orders lost, mandatory senior sign-offs imposed",
        href: "https://medium.com/@heinancabouly/amazon-forced-engineers-to-use-ai-coding-tools-then-it-lost-6-3-million-orders-256a7343b01d",
        date: "2026-03",
        note: "Category-wide safety lesson. AI agent deleted production environment. 80% usage mandate came before safety guardrails. Amazon now requires senior engineer sign-offs for AI-assisted code from junior staff.",
      },
      {
        label: "Funding",
        title: "Factory.ai $50M Series B at $300M valuation — NEA, Sequoia, NVIDIA, J.P. Morgan",
        href: "https://www.businesswire.com/news/home/20250925993478/en/",
        date: "2025-09-25",
        note: "Terminal-Bench #1 at 58.8%. Strong investor signal but near-zero community engagement (7 HN pts).",
      },
      {
        label: "Trust Signal",
        title: "Developer trust in AI coding drops to 29-33%, down from 40% in 2024",
        href: "https://stackoverflow.blog/2026/02/04/code-smells-for-ai-agents-q-and-a-with-eno-reyes-of-factory/",
        date: "2026-02",
        note: "Stack Overflow data. Favors human-in-the-loop designs and spec-first approaches. Headwind for fully autonomous models.",
      },
    ],
    headToHead: [
      {
        left: "Copilot Coding Agent",
        right: "Cursor Automations",
        gist: "Copilot: 15M devs, 12K orgs, 564 HN pts, proven track record. Cursor: $2B ARR, event-driven triggers, 7M MAU but 7 HN pts on Automations. Copilot wins on distribution and trust; Cursor wins on autonomy model. Copilot for now; Cursor could challenge within 6 months.",
      },
      {
        left: "Copilot Coding Agent",
        right: "OpenHands",
        gist: "Different lanes. Copilot: zero-friction, GitHub-native, no setup. OpenHands: self-hostable, model-agnostic, MIT, scales to 1000s of parallel tasks. Copilot for GitHub-native teams; OpenHands for control, self-hosting, data sovereignty.",
      },
      {
        left: "Cursor Automations",
        right: "Devin / Cognition",
        gist: "Cursor: 13x Devin's pre-acq revenue, event-driven triggers are novel, $2B ARR. Devin: more autonomy history, 67% merge rate on defined tasks, $10.2B valuation. Cursor wins on revenue and trigger model; Devin has more autonomy history but weaker product evidence.",
      },
      {
        left: "OpenHands",
        right: "Devin / Cognition",
        gist: "OpenHands: 68K stars, MIT, free, model-agnostic, broader enterprise logos (AMD, Apple, Google, NVIDIA). Devin: $10.2B valuation, $150M+ ARR, but 15% complex-task success. OpenHands for control and cost; Devin for turnkey defined-task automation.",
      },
      {
        left: "Factory",
        right: "field",
        gist: "Factory: Terminal-Bench #1, Sequoia+NVIDIA backing, enterprise customers. But 7 HN pts with 0 comments = near-zero community validation. Investor excitement ≠ developer adoption. Needs independent verification to move up.",
      },
    ],
    whatChangesThis: [
      "If Cursor Automations gets independent evaluation showing strong results, it moves to #2 and potentially challenges #1 within 6 months given $2B ARR momentum.",
      "If post-Windsurf independent Devin evaluation shows real improvement (>40% complex-task success), Devin moves to #3 ahead of Cursor Automations.",
      "If Factory gets significant HN engagement or independent testimonials, it moves to #4. Current investor-community gap is unsustainable.",
      "If another Kiro-scale production incident hits a ranked contender, the entire ranking reshuffles toward safety-first tools (OpenHands sandboxing, Augment Intent approval gates).",
      "If Augment Intent ships GA with cross-platform support and multiple positive independent reviews, it enters ranked list at #5-6.",
      "If developer trust continues declining (currently 29-33%), it favors human-in-the-loop designs and slows fully autonomous adoption.",
      "If NIST AI Agent Standards finalize, compliance-ready tools (Factory, Augment Intent) get a regulatory tailwind.",
    ],
  },
  "search-news": {
    slug: "search-news",
    name: "Search & News",
    deck:
      "Web search, scraping, and deep research tools for AI agents. The category has split into three lanes: search APIs (Brave, Exa, Tavily), scrape/crawl tools (Firecrawl, Crawl4AI), and deep research APIs (Parallel, Perplexity Sonar). Most serious agent workflows need tools from the first two lanes. MCP support is table stakes — the real differentiators are benchmark quality, latency, index independence, and license.",
    verdict: [
      "Brave Search is the strongest default — #1 on the only independent benchmark (AIMultiple 2026), fastest latency (669ms), most feature-complete MCP server (6 tools), SOC 2 Type II attested, and a real free tier.",
      "Firecrawl is the scraping and extraction workhorse — 93K stars, #2 on benchmarks (highest relevance score), search + scrape + autonomous /agent endpoint in one tool. Unchallenged in its lane.",
      "Exa is the pick when semantic depth matters — neural embeddings, people/company/code verticals, 5x MCP adoption over Brave. Best for similarity and research-heavy agent workflows. Feb 2026 Exa Fast (sub-500ms) narrows the latency gap.",
    ],
    meta: [
      "The category has split into three functional lanes: search APIs (find content), scrape/crawl tools (extract content from URLs), and deep research APIs (multi-step search + synthesis). Most agent workflows need lanes 1 and 2.",
      "MCP support is table stakes — every serious contender has it. The real differentiators are: benchmark quality, latency, index independence, license, and cost.",
      "The AIMultiple 2026 Agentic Search Benchmark (100 queries, GPT-5.2 judge) is the only independent multi-tool comparison. Brave #1, Firecrawl #2, Exa #3, Parallel #4, Tavily #5.",
    ],
    ranking: [
      {
        rank: "01",
        contender: "Brave Search API",
        externalUrl: "https://brave.com/search/api/",
        bestFor:
          "Default search API for AI agents — fastest, broadest MCP tooling, independent benchmark winner",
        why: "#1 Agent Score (14.89) in AIMultiple 2026. Fastest latency (669ms). Independent index (not a Google wrapper). 6-tool MCP server (web, local, image, video, news, summarizer). SOC 2 Type II attested (Oct 2025). Free tier: 2,000 queries/mo. New Place Search + LLM Context API endpoints (Feb 2026).",
        watch:
          "Less semantic depth than Exa on conceptual/research queries. MCP server stars (781) lag Exa's (4,022). Search API is secondary to Brave's browser business.",
      },
      {
        rank: "02",
        contender: "Firecrawl",
        skillSlug: "firecrawl-mcp-server",
        bestFor:
          "Web scraping, structured extraction, turning messy pages into LLM-ready content — the research/extraction workhorse",
        why: "93.7K GitHub stars — highest traction in category. Agent Score 14.58 (#2, highest relevance score in benchmark). Search + scrape + autonomous /agent endpoint — only tool covering all three lanes. $14.5M Series A (YC W24), 350K+ developers. v2.8.0: parallel agent execution, Spark model family, Browser Sandbox. Multi-language SDKs (Python, JS, Java, Go, Rust).",
        watch:
          "AGPL-3.0 license is a dealbreaker for some enterprises. Scraping focus means search quality isn't primary strength. HN traction (35pts) is modest relative to star count.",
      },
      {
        rank: "03",
        contender: "Exa",
        skillSlug: "exa-mcp-server",
        bestFor:
          "Semantic search, similarity search, market mapping — strongest where traditional keyword search fails",
        why: "Agent Score 14.39 (#3), statistically tied with top tier. Strongest MCP adoption: 4,022 stars (5x Brave). Neural search with verticals — people (1B+ LinkedIn profiles), company, code. 81% on complex retrieval vs Tavily's 71%. $85M Series B at $700M, Nvidia-backed. Feb 2026: Exa Fast (sub-500ms) and Exa Deep (agentic). Free MCP tier launched.",
        watch:
          "Latency (~1,200ms) is nearly 2x Brave's (Exa Fast sub-500ms claim unverified independently). Weakness on freshness-dependent queries. Closed-source, cloud-only. Pricing ~10x more expensive than Firecrawl at comparable usage.",
      },
      {
        rank: "04",
        contender: "SearXNG",
        externalUrl: "https://docs.searxng.org",
        bestFor:
          "Privacy-first, self-hosted meta-search — no API keys, no vendor lock-in, no cost",
        why: "26,587 stars, active development (v2026.3.13, last push 2026-03-13). Zero cost, zero API keys — aggregates 242 search engines. Privacy guarantee: no query logging, no tracking. Multiple community MCP servers. AGPL-3.0.",
        watch:
          "No independent benchmark data — not tested in AIMultiple. Meta-search quality depends on upstream engines. Self-hosting overhead. No structured extraction — pure search only. No dedicated company or funding.",
      },
      {
        rank: "05",
        contender: "Tavily",
        externalUrl: "https://tavily.com",
        bestFor:
          "Quick integration for AI agent search — simple API, broad framework support",
        why: "LangChain default search tool — biggest distribution advantage in category. 3M+ monthly SDK downloads. 1M+ developers. Acquired by Nebius for $275M (Feb 2026). Fortune 500 customers (IBM), Cohere, Groq.",
        watch:
          "Agent Score 13.67 (#5 of 8) — meaningful gap below top-4 cluster. No independent index (wraps external sources). Nebius acquisition introduces pricing and roadmap uncertainty. API unchanged post-acquisition so far, but watch for Q2 changes.",
      },
      {
        rank: "06",
        contender: "Jina Reader",
        externalUrl: "https://jina.ai/reader",
        bestFor:
          "Simplest URL-to-markdown conversion (one-line API) with ReaderLM-v2 for local extraction",
        why: "Prepend r.jina.ai/ to any URL. ReaderLM-v2 (1.5B params, 512K context, 29 languages, 3x quality over v1). 10,225 stars. Apache-2.0. Reader API actively maintained (~4,000 max concurrency).",
        watch:
          "Reader-only, no search/discovery. OSS repo last pushed 2025-05-08 (stale), but hosted API and ReaderLM-v2 are active. Effectively superseded by Firecrawl for new projects needing scrape + search.",
      },
      {
        rank: "07",
        contender: "Crawl4AI",
        externalUrl: "https://github.com/unclecode/crawl4ai",
        bestFor: "Free, open-source web scraping with no vendor lock-in",
        why: "62K GitHub stars (#2 in category), hit #1 on GitHub trending. Apache-2.0 license — no copyleft concerns. Completely free. 914K monthly PyPI downloads. Adaptive Intelligence (pattern-learning crawler). Local LLM support (Llama 3, Mistral).",
        watch:
          "Same lane as Firecrawl with less API polish, no managed service, and weaker MCP integration. Python-only. No search capability — scrape/crawl only. Not in AIMultiple benchmark.",
        belowCutLine: true,
      },
      {
        rank: "08",
        contender: "Parallel AI Search",
        externalUrl: "https://parallel.ai",
        bestFor: "Deep research where quality matters more than speed",
        why: "Agent Score 14.21 (#4) — top tier on quality. Self-reported BrowseComp: 45-58% accuracy vs Perplexity 8%. $130M total funding at $740M valuation (Kleiner Perkins, Index Ventures). Founded by Parag Agrawal (ex-Twitter CEO). 123pts on HN.",
        watch:
          "Latency is 13,600ms — 20x slower than Brave. Only viable for async research workflows. BrowseComp claims need independent verification. No public GitHub repo. Pricing not public.",
        belowCutLine: true,
      },
      {
        rank: "09",
        contender: "You.com Search API",
        externalUrl: "https://you.com",
        bestFor:
          "Enterprise integrations (AWS Marketplace, Databricks Unity Catalog)",
        why: "OpenAI integrated You.com as core search provider. Claims 93% SimpleQA and 466ms latency (self-reported). MCP server launched. Deep Search API in early access. 1,000 free API queries/month.",
        watch:
          "Most benchmark claims are self-reported. Not in AIMultiple benchmark. OpenAI integration scope and exclusivity unclear. Needs independent verification.",
        belowCutLine: true,
      },
      {
        rank: "10",
        contender: "Linkup",
        externalUrl: "https://www.linkup.so",
        bestFor:
          "AI-native web search API with sub-second speed and strong angel backing",
        why: "$10M seed (Feb 2026, Gradient). Angels: Olivier Pomel (Datadog CEO), Arthur Mensch (Mistral CEO). Customers include KPMG, Artisan. /fast endpoint for sub-second search. MCP integrated with Claude Desktop.",
        watch:
          "Seed-stage — too early for ranking. Not in AIMultiple benchmark. No independent performance data. 'Hundreds of customers' claim unverified.",
        belowCutLine: true,
      },
      {
        rank: "11",
        contender: "Perplexity Sonar API",
        externalUrl: "https://perplexity.ai",
        bestFor:
          "Highest raw answer accuracy (87% in HumAI) with citation synthesis",
        why: "87% accuracy (highest in HumAI). 94% citation quality. Sonar Deep Research for multi-step retrieval. Official MCP server. Citation tokens no longer billed (Feb 2026).",
        watch:
          "Agent Score 12.96 (#7 of 8) — below SerpAPI. 11,000ms+ latency. Brand recognition exceeds API performance. Consumer product trying to be an API.",
        belowCutLine: true,
      },
      {
        rank: "12",
        contender: "Valyu DeepSearch",
        externalUrl: "https://valyu.network",
        bestFor:
          "High-stakes knowledge work (finance, economics, medical) — if claims hold",
        why: "Claims 94% SimpleQA and 79% FreshQA (vs Google 39%). 50+ proprietary data sources (SEC, clinical trials). a16z backed. LangChain integration. DeepSearch v2.0 with tool calling.",
        watch:
          "Almost all evidence is self-reported. Only one independent reviewer found. No HN traction. No AIMultiple entry. Needs independent verification.",
        belowCutLine: true,
      },
      {
        rank: "13",
        contender: "Serper",
        externalUrl: "https://serper.dev",
        bestFor: "Cheapest Google SERP access ($0.30/1K queries)",
        why: "3-10x cheaper than alternatives. LangChain integration. 2,500 free searches on signup.",
        watch:
          "Pure Google SERP wrapper — no semantic understanding, no independent index. Budget pick only.",
        belowCutLine: true,
      },
      {
        rank: "14",
        contender: "Spider Cloud",
        externalUrl: "https://spider.cloud",
        bestFor: "High-volume scraping performance (Rust-based)",
        why: "Claims 100K pages/sec, 7x Firecrawl throughput. MIT license. 2,329 stars. Rust-based zero-copy parsing. Cost advantage at scale (~$48/100K pages vs Firecrawl ~$240).",
        watch: "Tiny community (2.3K stars). Benchmark claims entirely self-reported.",
        belowCutLine: true,
      },
      {
        rank: "15",
        contender: "Google Grounding with Search",
        externalUrl: "https://ai.google.dev/gemini-api/docs/grounding",
        bestFor: "Gemini-native workflows only",
        why: "Native to Gemini API. 5,000 free prompts/month (Gemini 3).",
        watch:
          "Platform lock-in (Gemini API only). Most expensive ($14/1K queries). Not a standalone search API. No MCP server.",
        belowCutLine: true,
      },
    ],
    observedOutputs: [],
    liveSignals: [
      {
        label: "benchmark",
        title:
          "AIMultiple 2026 Agentic Search Benchmark — Brave #1, Firecrawl #2, Exa #3",
        href: "https://aimultiple.com/agentic-search",
        date: "2026-02",
        note: "100 queries, GPT-5.2 judge, bootstrap resampling with 10K resamples for 95% CI. Top 4 (Brave, Firecrawl, Exa, Parallel Pro) statistically indistinguishable. Brave-Tavily gap (~1pt) is 'meaningful, not random.'",
      },
      {
        label: "acquisition",
        title:
          "Nebius acquires Tavily for $275M (up to $400M with milestones)",
        href: "https://www.bloomberg.com/news/articles/2026-02-10/nebius-agrees-to-buy-ai-agent-search-company-tavily-for-275-million",
        date: "2026-02-10",
        note: "Bloomberg-confirmed. API unchanged post-acquisition. No pricing changes yet — watch Q2 for Nebius integration shifts.",
      },
      {
        label: "traction",
        title:
          "Brave MCP Server v2.x — 6 tools, SOC 2 Type II, Place Search + LLM Context API",
        href: "https://github.com/brave/brave-search-mcp-server",
        date: "2026-03-16",
        note: "781 stars, actively maintained. Removed base64 image encoding bloat. Tool whitelisting/blacklisting. HTTP + stdio transport. SOC 2 Type II attested (Oct 2025).",
      },
      {
        label: "funding",
        title:
          "Exa raises $85M Series B at $700M valuation, Nvidia NVentures backing",
        href: "https://siliconangle.com/2025/09/03/nvidia-backs-85m-round-ai-search-startup-exa/",
        date: "2025-09-03",
        note: "Infrastructure-grade credibility. Exa serves web search to thousands of companies including Cursor. Feb 2026: Exa Fast (sub-500ms) and Exa Deep (agentic) launched.",
      },
      {
        label: "traction",
        title:
          "nilch search engine built on Brave API — organic developer adoption",
        href: "https://news.ycombinator.com/item?id=46417748",
        date: "2025-12-29",
        note: "199 HN points, 76 comments. Independent developer choosing Brave API as backend. Organic adoption signal.",
      },
      {
        label: "funding",
        title:
          "Linkup raises $10M seed — AI-native search API (Gradient, Mistral/Datadog founders)",
        href: "https://www.linkup.so/blog/linkup-raises-10m-seed-to-build-web-search-for-ai",
        date: "2026-02",
        note: "New contender. Angels include Datadog CEO and Mistral CEO. Customers include KPMG. Sub-second /fast endpoint. Below cut line — too early.",
      },
      {
        label: "comparison",
        title:
          "Three independent Crawl4AI vs Firecrawl comparisons reach consensus",
        href: "https://www.capsolver.com/blog/AI/crawl4ai-vs-firecrawl",
        date: "2026-01",
        note: "Capsolver, Bright Data, Apify all agree: Crawl4AI wins on license/cost/control, Firecrawl wins on ease of use/enterprise/combined search+scrape.",
      },
      {
        label: "comparison",
        title:
          "HumAI: Perplexity vs Tavily vs Exa vs You.com complete comparison 2026",
        href: "https://www.humai.blog/perplexity-vs-tavily-vs-exa-vs-you-com-the-complete-ai-search-engine-comparison-2026/",
        date: "2026",
        note: "Independent comparison. Perplexity highest accuracy (87%), Tavily fastest (187ms), Exa best citations (96%).",
      },
    ],
    headToHead: [
      {
        left: "Brave Search",
        right: "Exa",
        gist: "Brave wins on speed (669ms vs ~1,200ms), benchmark score (14.89 vs 14.39), MCP breadth (6 tools vs 1), and free tier (2,000/mo). Exa wins on semantic depth (neural embeddings, people/company/code verticals) and MCP adoption (4,022 vs 781 stars). Use Brave as the default; switch to Exa when you need meaning-based search or vertical lookups.",
      },
      {
        left: "Brave Search",
        right: "Tavily",
        gist: "AIMultiple benchmark: ~1pt gap (14.89 vs 13.67) described as 'meaningful, not random.' Brave has independent index; Tavily wraps external sources. Tavily acquired by Nebius (Jan 2026) — future direction uncertain. Brave is objectively stronger on evidence; Tavily persists on LangChain ecosystem inertia.",
      },
      {
        left: "Firecrawl",
        right: "Crawl4AI",
        gist: "Firecrawl wins on features (search+scrape+agent), enterprise compliance, multi-language SDKs, and benchmark score (14.58). Crawl4AI wins on license (Apache-2.0 vs AGPL), cost (free), Adaptive Intelligence, and 914K monthly PyPI downloads. Three independent reviews (Capsolver, Bright Data, Apify) reach the same conclusion: complements, not substitutes.",
      },
      {
        left: "Exa",
        right: "Tavily",
        gist: "Exa wins on quality (14.39 vs 13.67 Agent Score, 81% vs 71% complex retrieval, 96% vs 85% citations) and proprietary index. Tavily wins on distribution (3M+ monthly SDK downloads, LangChain default). Exa is the better tool; Tavily is the more convenient one. Tavily's Nebius acquisition adds risk.",
      },
      {
        left: "Firecrawl",
        right: "Jina Reader",
        gist: "Firecrawl does everything Jina Reader does, plus search, structured extraction, batch processing, and agent endpoint. Jina Reader's OSS repo is stale (last commit May 2025). Firecrawl is the superset choice for new projects.",
      },
      {
        left: "SearXNG",
        right: "Brave Search",
        gist: "SearXNG: free, self-hosted, private, 242 aggregated engines. Brave: higher quality (14.89 benchmark), faster (669ms), managed, SOC 2. Privacy vs quality tradeoff. SearXNG is the only option for teams that can't send queries to third-party APIs.",
      },
    ],
    whatChangesThis: [
      "If Tavily's Nebius acquisition leads to pricing changes or API shifts, it drops off entirely. If they invest heavily (independent index, benchmark improvements), it could reclaim top 3.",
      "If Parallel AI's BrowseComp claims are independently validated, it enters the ranked list as #1 deep research tool (a new lane, not displacing Brave for standard search).",
      "If Exa Fast sub-500ms is independently verified and pricing becomes competitive, Exa could challenge Brave for the default search API pick.",
      "If Jina Reader resumes meaningful OSS development (MCP server, structured extraction), it differentiates from Firecrawl. Without activity, it's on track for delisting.",
      "If Crawl4AI ships a mature MCP server and gets AIMultiple benchmark inclusion, it creates a real decision point vs Firecrawl in the extraction lane.",
      "If Google or OpenAI ships a dedicated agent search API, the entire category shifts — all current contenders need to differentiate on specialization.",
      "If SearXNG gets independent benchmark inclusion, it either validates as competitive or gets exposed as lower quality. Currently ungradeable on search quality.",
      "If Linkup or Airweave gains >10K stars and benchmark results, they enter the ranked list.",
    ],
  },};

export const platforms: Record<PlatformSlug, PlatformRecord> = {
  figma: {
    slug: "figma",
    name: "Figma",
    url: "https://figma.com",
    summary:
      "The dominant design tool. Native MCP support is evolving. The key question for agents is whether the official path is enough or write-access challengers fill the gap.",
    nativeSupport:
      "Figma ships an official MCP server guide with remote and desktop variants. Read access is strong; direct write-back is still the frontier.",
    relatedCategories: ["ux-ui"],
    relatedSkills: ["figma-mcp-server-guide", "figma-use", "vibma"],
  },
  "google-workspace": {
    slug: "google-workspace",
    name: "Google Workspace",
    url: "https://workspace.google.com",
    summary:
      "The core business operating surface: Gmail, Docs, Sheets, Calendar, Drive. Community MCP coverage is the broadest; Google's own CLI is narrower but official.",
    nativeSupport:
      "Google ships a Workspace CLI but intentionally moved away from MCP. Broad cross-app MCP coverage comes from community tools.",
    relatedCategories: ["product-business-development"],
    relatedSkills: ["google-workspace-mcp"],
  },
  browser: {
    slug: "browser",
    name: "Web Browser",
    url: "https://www.chromium.org",
    summary:
      "The universal interaction surface. Agent browser access splits between vision-based control (Browser Use), structured automation (Playwright), and AI-native SDKs (Stagehand).",
    nativeSupport:
      "Browsers have no native agent API. All agent access goes through automation libraries, MCP wrappers, or vision-based screenshot approaches.",
    relatedCategories: ["web-browsing"],
    relatedSkills: ["browser-use", "chrome-devtools-mcp", "playwright-mcp", "agent-browser", "stagehand", "skyvern"],
  },
  terminal: {
    slug: "terminal",
    name: "Terminal / CLI",
    url: "https://en.wikipedia.org/wiki/Terminal_emulator",
    summary:
      "The developer's native workspace. Coding agents either run inside the terminal (Claude Code, Aider) or wrap it inside an IDE (Cursor, Continue).",
    nativeSupport:
      "Terminals provide raw shell access. The agent layer is entirely in the tool — no platform-level agent API exists.",
    relatedCategories: ["coding-clis"],
    relatedSkills: ["claude-code", "opencode", "codex-cli", "gemini-cli", "aider", "continue-dev"],
  },
  github: {
    slug: "github",
    name: "GitHub",
    url: "https://github.com",
    summary:
      "The dominant code hosting and collaboration platform. Agents interact via CLI, API, or MCP integrations. Key for issue tracking, PRs, and CI/CD.",
    nativeSupport:
      "GitHub has strong API and CLI support. Copilot is the native AI layer but is focused on IDE completion rather than autonomous agent workflows.",
    relatedCategories: ["teams-of-agents", "coding-clis"],
    relatedSkills: ["openhands", "swe-agent", "claude-code"],
  },
};

export const platformList = Object.values(platforms);

export const categoryList = [
  categories["coding-clis"],
  categories["web-browsing"],
  categories["product-business-development"],
  categories["teams-of-agents"],
  categories["ux-ui"],
  categories["software-factories"],
  categories["search-news"],
];

export const skillList = Object.values(skills);

export function getCategory(slug: string) {
  return categories[slug as CategorySlug];
}

export function getSkill(slug: string) {
  return skills[slug as SkillSlug];
}

export function getPlatform(slug: string) {
  return platforms[slug as PlatformSlug];
}
