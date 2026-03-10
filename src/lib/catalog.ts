export type SkillSlug =
  | "figma-mcp-server-guide"
  | "figma-use"
  | "vibma"
  | "firecrawl-mcp-server"
  | "exa-mcp-server"
  | "google-workspace-mcp"
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
  | "stagehand";

export type JobSlug =
  | "product-business-development"
  | "teams-of-agents"
  | "ux-ui"
  | "coding-clis"
  | "web-browsing";

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
  relatedJobs: JobSlug[];
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
  previewImage?: string;
  docsUrl?: string;
  relatedJobs: JobSlug[];
  strengths: string[];
  weaknesses: string[];
  evidence: EvidenceItem[];
  githubStars?: string;
};

export type JobRecord = {
  slug: JobSlug;
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
    image?: string;
  }>;
  liveSignals: Array<{
    label: string;
    title: string;
    href: string;
    date: string;
    note: string;
    preview?: string;
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
  | "mckay-wrigley-stack";

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
      "Official Figma guide for the MCP path. Strongest trust lane for design context inside agent workflows.",
    verdict:
      "Best default when trust, officialness, and team adoption matter more than raw write access.",
    docsUrl:
      "https://help.figma.com/hc/en-us/articles/35281385065751-Figma-MCP-collection-Compare-Figma-s-remote-and-desktop-MCP-servers",
    relatedJobs: ["ux-ui"],
    strengths: [
      "Official provider trust",
      "Clear path into real Figma workflows",
      "Best fit for teams standardizing on the official lane",
    ],
    weaknesses: [
      "Less exciting than unofficial write-access challengers",
      "Still tied to Figma auth and setup discipline",
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
      "Community write-access contender for controlling Figma directly from the command line and agent loops.",
    verdict:
      "Best public challenger when you care about direct mutation and builder energy more than official trust.",
    relatedJobs: ["ux-ui"],
    strengths: [
      "Strong write-access story",
      "Real public builder traction",
      "Clear GitHub-first artifact surface",
    ],
    weaknesses: [
      "Weaker institutional trust than the official Figma path",
      "More likely to matter for power users than broad teams",
    ],
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
      "Design-system-specific challenger focused on letting agents create directly in Figma.",
    verdict:
      "Interesting challenger, but still clearly behind the official path and Figma-use on public trust.",
    relatedJobs: ["ux-ui"],
    strengths: [
      "Very explicit write-directly positioning",
      "Good fit for people testing aggressive design automation",
    ],
    weaknesses: [
      "Low public traction so far",
      "Trust is still builder-post level rather than broad adoption",
    ],
    evidence: [
      {
        quality: "moderate",
        title: "Vibma HN discussion — design-system-specific Figma automation",
        url: "https://github.com/ufira-ai/Vibma",
        date: "2025-12",
        engagement: "Low — early-stage repo",
        who: "Ufira AI (independent team)",
        gist: "Watch-status: explicit write-directly positioning for design automation. Traction still builder-post level, no independent reviews yet.",
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
    official: true,
    status: "active",
    summary:
      "Official Firecrawl MCP for scraping, extraction, and deep research workflows.",
    verdict:
      "Best research-side skill when the job is business intelligence across messy public websites.",
    docsUrl: "https://firecrawl.dev",
    relatedJobs: ["product-business-development"],
    strengths: [
      "Official provider support",
      "Strong extraction and scraping shape",
      "Best fit when research means real web pages, not just search snippets",
    ],
    weaknesses: [
      "Not the system of record itself",
      "Needs a downstream workspace if you want operating memory",
    ],
    githubStars: "69K+",
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
    ],
  },
  "exa-mcp-server": {
    slug: "exa-mcp-server",
    name: "Exa MCP Server",
    repo: "exa-labs/exa-mcp-server",
    repoUrl: "https://github.com/exa-labs/exa-mcp-server",
    readmeBranch: "main",
    official: true,
    status: "active",
    summary:
      "Official Exa MCP for fast web search and crawling when the workflow is search-first rather than page-ops-first.",
    verdict:
      "Best search-heavy research skill, but not as strong as Firecrawl once the workflow leans into extraction and page actions.",
    relatedJobs: ["product-business-development"],
    strengths: [
      "Fast search-first workflow",
      "Official provider support",
      "Good fit for discovery and initial market mapping",
    ],
    weaknesses: [
      "Less differentiated when you need operational follow-through",
      "Weaker than Workspace MCP for actually running the business surface",
    ],
    evidence: [
      {
        quality: "moderate",
        title: "Exa announces best agentic search endpoint — faster, cheaper, structured outputs",
        url: "https://exa.ai/research",
        date: "2026-03",
        engagement: "Official announcement",
        who: "Exa (official)",
        gist: "New agentic endpoint with field-level grounding, structured outputs. Semantic search across billions of docs including code and papers.",
        selfReported: true,
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
      "Best broad operating skill for product and business workflows because it turns the agent into an operator, not just a researcher.",
    docsUrl: "https://workspacemcp.com",
    relatedJobs: ["product-business-development"],
    strengths: [
      "Huge breadth across core business tools",
      "Best fit when the job includes reading and writing real operating docs",
      "Strong ecosystem momentum",
    ],
    weaknesses: [
      "Community-built rather than Google-official",
      "Auth and scope management matter a lot",
      "Google's own Workspace CLI removed MCP mode 2 days after launch — signals instability in the MCP approach for this surface",
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
    ],
  },
  openhands: {
    slug: "openhands",
    name: "OpenHands",
    repo: "OpenHands/OpenHands",
    repoUrl: "https://github.com/OpenHands/OpenHands",
    readmeBranch: "main",
    official: false,
    status: "active",
    summary:
      "Open-source software agent surface with the broadest public traction in the long-running development lane.",
    verdict:
      "Best default software-factory contender when you want a broad autonomous development surface with real public gravity.",
    docsUrl: "https://docs.openhands.dev",
    relatedJobs: ["teams-of-agents"],
    strengths: [
      "Massive public traction",
      "Clear software-agent framing",
      "Strong benchmark and adoption story",
    ],
    weaknesses: [
      "Heavier surface area than a simple loop pattern",
      "Can be more infra than you need for narrow tasks",
    ],
    githubStars: "68K+",
    evidence: [
      {
        quality: "strong",
        title: "OpenHands raises $18.8M, reports 77.6% SWE-bench Verified with Claude Sonnet Thinking",
        url: "https://openhands.dev/",
        date: "2026-01",
        engagement: "68K+ GitHub stars, $18.8M funding",
        who: "OpenHands team (formerly OpenDevin, Princeton-originated)",
        gist: "Cloud coding agents that solve 87% of bug tickets same day. 77.6% SWE-bench Verified. New software-agent-sdk v1.0 architecture.",
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
      "Vercel’s continuous-autonomy loop for the AI SDK. Cleaner pattern surface than a full software-agent platform.",
    verdict:
      "Best reference when the team wants a crisp loop pattern instead of a huge agent platform.",
    docsUrl: "https://ai-sdk.dev",
    relatedJobs: ["teams-of-agents"],
    strengths: [
      "Official Vercel trust",
      "Strong loop framing for continuous autonomy",
      "Good fit for people who want pattern clarity",
    ],
    weaknesses: [
      "Lighter public artifact surface than OpenHands or SWE-agent",
      "More pattern than full factory out of the box",
    ],
    evidence: [
      {
        quality: "moderate",
        title: "Ralph Loop Agent: Vercel AI SDK continuous-autonomy pattern",
        url: "https://github.com/vercel-labs/ralph-loop-agent",
        date: "2025-12",
        engagement: "Vercel Labs repo",
        who: "Vercel (official labs project)",
        gist: "Reference implementation for continuous AI loop pattern using the AI SDK. Clean pattern surface for teams wanting loop-based agent autonomy without a heavy platform.",
        selfReported: true,
      },
    ],
  },
  "swe-agent": {
    slug: "swe-agent",
    name: "SWE-agent",
    repo: "SWE-agent/SWE-agent",
    repoUrl: "https://github.com/SWE-agent/SWE-agent",
    readmeBranch: "main",
    official: false,
    status: "active",
    summary:
      "Benchmark-driven software engineering agent with the cleanest issue-fixing story in the open-source lane.",
    verdict:
      "Best narrow pick when the question is issue-level repair and benchmark credibility, not general software-factory orchestration.",
    docsUrl: "https://swe-agent.com/latest/",
    relatedJobs: ["teams-of-agents"],
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
    readmeBranch: "main",
    official: true,
    status: "active",
    summary:
      "Anthropic's official agentic coding CLI. Terminal-native, tool-use-driven, with deep file system and shell access. Opus 4.5 scores 80.9% on SWE-bench.",
    verdict:
      "Best default for developers who want a terminal-first agent that reads, writes, and runs code autonomously with minimal setup.",
    relatedJobs: ["coding-clis", "teams-of-agents"],
    githubStars: "40K+",
    strengths: [
      "Official Anthropic support with fastest model access",
      "Terminal-native with deep shell and filesystem integration",
      "Strong autonomous multi-step task execution",
      "Hooks, MCP servers, and extensibility story",
    ],
    weaknesses: [
      "Tied to Anthropic models only",
      "No GUI — terminal-only workflow",
      "Requires comfort with CLI-first development",
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
    ],
  },
  aider: {
    slug: "aider",
    name: "Aider",
    repo: "Aider-AI/aider",
    repoUrl: "https://github.com/Aider-AI/aider",
    readmeBranch: "main",
    official: false,
    status: "active",
    summary:
      "Open-source AI pair programming CLI with broad model support and strong SWE-bench performance.",
    verdict:
      "Best open-source CLI when model flexibility and benchmark credibility both matter.",
    docsUrl: "https://aider.chat",
    relatedJobs: ["coding-clis"],
    strengths: [
      "Works with many model providers (OpenAI, Anthropic, local models)",
      "Strong SWE-bench performance with public results",
      "Git-aware: auto-commits changes with clear diffs",
      "Mature and well-documented",
    ],
    weaknesses: [
      "Less autonomous than Claude Code for multi-step tasks",
      "Chat-loop interface rather than deep agent autonomy",
      "Weaker tool-use story compared to integrated CLIs",
    ],
    githubStars: "41.7K",
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
    relatedJobs: ["coding-clis", "teams-of-agents"],
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
      "Open-source AI coding agent with 119K+ GitHub stars and support for 75+ model providers including local models. Terminal, desktop, and IDE versions. Originally by Charm, now maintained by SST.",
    verdict:
      "The strongest open-source all-rounder: model flexibility (75+ providers), privacy-first architecture, and massive community adoption. The real open-source alternative to Claude Code.",
    docsUrl: "https://opencode.ai",
    relatedJobs: ["coding-clis"],
    strengths: [
      "75+ model providers including local models via Ollama",
      "119K+ GitHub stars — massive adoption",
      "Privacy-first: does not store code or context",
      "Available as CLI, desktop app, and IDE extension",
      "Can switch models mid-session while maintaining context",
    ],
    weaknesses: [
      "Jack of all trades — less opinionated than Claude Code or Codex",
      "Quality depends heavily on which model you choose",
      "Had critical RCE vulnerability (fixed v1.1.10+) — security maturity questions for enterprise",
      "Lost Claude Code subscription auth access after Anthropic blocked it",
    ],
    githubStars: "119K+",
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
    ],
  },
  "codex-cli": {
    slug: "codex-cli",
    name: "Codex CLI",
    repo: "openai/codex",
    repoUrl: "https://github.com/openai/codex",
    readmeBranch: "main",
    official: true,
    status: "active",
    summary:
      "OpenAI's open-source coding agent built in Rust. Terminal-first, with GPT-5.4 support, 1M context window, native computer-use, and cloud sandbox execution.",
    verdict:
      "Best pick for teams invested in OpenAI models. Rust-built for speed, cloud sandbox for safety, and GPT-5.4 with 1M context is the largest window in the CLI category.",
    docsUrl: "https://developers.openai.com/codex/cli/",
    relatedJobs: ["coding-clis"],
    strengths: [
      "Built in Rust — fast and efficient",
      "GPT-5.4 with 1M context window and native computer-use",
      "Cloud sandbox execution for safety",
      "Multi-agent parallel workflows",
      "Built-in web search tool",
    ],
    weaknesses: [
      "Tied to OpenAI models only",
      "Requires OpenAI API key and pricing",
      "Newer than Claude Code and Aider — less battle-tested in community",
    ],
    githubStars: "64K+",
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
    ],
  },
  "gemini-cli": {
    slug: "gemini-cli",
    name: "Gemini CLI",
    repo: "google-gemini/gemini-cli",
    repoUrl: "https://github.com/google-gemini/gemini-cli",
    readmeBranch: "main",
    official: true,
    status: "active",
    summary:
      "Google's open-source terminal agent with Gemini 3 models, 1M token context, built-in Google Search grounding, and a genuinely free tier (60 req/min, 1K req/day).",
    verdict:
      "Best free entry point in the coding CLI lane. The free tier alone makes it the most accessible — and Gemini 3 with 1M context is genuinely competitive.",
    docsUrl: "https://developers.google.com/gemini-code-assist/docs/gemini-cli",
    relatedJobs: ["coding-clis"],
    strengths: [
      "Genuinely free: 60 req/min, 1K req/day with personal Google account",
      "1M token context window with Gemini 3",
      "Built-in Google Search grounding",
      "Open source (Apache 2.0)",
      "MCP server support for extensibility",
    ],
    weaknesses: [
      "Tied to Google/Gemini models",
      "Free tier data used for model training — privacy concern flagged by HN community",
      "Newer entrant — less community track record than Aider or Claude Code",
    ],
    githubStars: "97K+",
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
    ],
  },
  "browser-use": {
    slug: "browser-use",
    name: "Browser Use",
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
    relatedJobs: ["web-browsing"],
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
    githubStars: "80K+",
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
        quality: "moderate",
        title: "browser-use/browser-use: 80.1K stars — fastest-growing OSS AI browser agent",
        url: "https://github.com/browser-use/browser-use",
        date: "2026-03",
        engagement: "80.1K stars, 9.5K forks, 296 contributors",
        who: "Open-source community",
        gist: "Dominant AI browser agent framework by stars. Zero to 80K+ in ~18 months. Latest release v0.12.1.",
        selfReported: true,
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
    relatedJobs: ["web-browsing"],
    strengths: [
      "Microsoft/Playwright official backing",
      "Accessibility snapshots instead of screenshots — more reliable for structured tasks",
      "Auto-configured in GitHub Copilot Coding Agent",
      "MCP-native — works with any MCP-compatible host",
    ],
    weaknesses: [
      "Less vision-aware than Browser Use for visual tasks",
      "Requires MCP host support",
      "Accessibility snapshots miss visual layout information",
    ],
    githubStars: "28.5K",
    evidence: [
      {
        quality: "strong",
        title: "microsoft/playwright-mcp: 28.5K stars, official Microsoft backing",
        url: "https://github.com/microsoft/playwright-mcp",
        date: "2026-03",
        engagement: "28.5K stars, 2.3K forks",
        who: "Microsoft (official Playwright team)",
        gist: "Uses accessibility snapshots instead of screenshots for LLM browser control. Auto-configured in GitHub Copilot Coding Agent — institutional advantage.",
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
    ],
  },
  stagehand: {
    slug: "stagehand",
    name: "Stagehand",
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
    relatedJobs: ["web-browsing"],
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
    githubStars: "21.4K",
    evidence: [
      {
        quality: "moderate",
        title: "browserbase/stagehand: 21.4K stars, VC-backed ($67.5M funding)",
        url: "https://github.com/browserbase/stagehand",
        date: "2026-03",
        engagement: "21.4K stars, 1.4K forks",
        who: "Browserbase (VC-backed, $67.5M total funding)",
        gist: "Second most popular AI browser automation framework. TypeScript-first, Playwright-extending approach. ~1/4 the traction of browser-use.",
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
    ],
  },
};

export const jobs: Record<JobSlug, JobRecord> = {
  "product-business-development": {
    slug: "product-business-development",
    name: "Product / Business Development",
    deck:
      "The meta here is not one universal business skill. It is a stack: an operating surface plus a research surface. Google Workspace MCP wins the operating lane; Firecrawl and Exa still win the research lane.",
    verdict: [
      "If the agent needs to actually operate the business, not just research it, Google Workspace MCP is the strongest public default right now.",
      "Firecrawl MCP is the best complementary skill when the workflow leans into extracting messy public websites, lead pages, or competitive intelligence.",
      "Exa MCP stays relevant when the job is search-heavy and speed matters more than deep page operations, but it is not the operating spine.",
    ],
    meta: [
      "The broad job is messy on purpose. Product and business development usually means switching between docs, mail, calendars, spreadsheets, and web research without losing the thread.",
      "That is why the operating surface matters more than a pretty demo. The strongest contender is usually the one that turns the agent into an operator inside the real system of record, not the one that only returns a nice research summary.",
    ],
    ranking: [
      {
        rank: "01",
        contender: "Google Workspace MCP",
        skillSlug: "google-workspace-mcp",
        bestFor: "Running docs, mail, sheets, calendars, and internal operating surfaces",
        why: "Best breadth and strongest day-to-day operating fit.",
        watch: "Community-built, so auth quality and trust posture matter.",
      },
      {
        rank: "02",
        contender: "Firecrawl MCP Server",
        skillSlug: "firecrawl-mcp-server",
        bestFor: "Competitive research, scraping, and pulling structure out of public web pages",
        why: "Best research-side companion once the workflow leaves the internal workspace.",
        watch: "Still needs another tool for actual business operations.",
      },
      {
        rank: "03",
        contender: "Exa MCP Server",
        skillSlug: "exa-mcp-server",
        bestFor: "Search-first market scans and fast information discovery",
        why: "Fastest search-shaped option in this lane.",
        watch: "Less differentiated than Firecrawl for extraction-heavy work.",
      },
      {
        rank: "04",
        contender: "Google Workspace CLI",
        externalUrl: "https://github.com/googleworkspace/cli",
        bestFor: "Official Google-authored command-line access to one product family",
        why: "The most important native contender, because it proves Google is shipping its own surface instead of blessing MCP here.",
        watch: "It intentionally moved away from MCP, so it does not replace the broad cross-app operating lane.",
        belowCutLine: true,
      },
    ],
    observedOutputs: [
      {
        title: "Google Workspace MCP public operating surface",
        summary:
          "The strongest visible artifact in this lane is still the Google Workspace MCP public repo surface because it shows the breadth of the operating stack in one place.",
        href: "https://github.com/taylorwilsdon/google_workspace_mcp",
        date: "2026-03",
      },
      {
        title: "Firecrawl research-side extraction surface",
        summary:
          "Firecrawl’s public surface is simpler visually, but it remains the cleanest official scraping and extraction path for the business-research lane.",
        href: "https://github.com/firecrawl/firecrawl-mcp-server",
        date: "2026-03",
      },
      {
        title: "Exa search-first research surface",
        summary:
          "Exa remains the cleanest public search-first surface in this category when the job is discovery rather than acting inside the workspace itself.",
        href: "https://github.com/exa-labs/exa-mcp-server",
        date: "2026-03",
      },
    ],
    liveSignals: [
      {
        label: "Hacker News comparison",
        title: "Comment in the Google Workspace CLI thread: ‘Honestly, easier with MCP straight up’",
        href: "https://news.ycombinator.com/item?id=47258403",
        date: "2026-03",
        note:
          "Useful because it is an active public comparison inside the official Google Workspace CLI discussion. Moderate trust: practitioner comment, not official guidance, but directly on point.",
      },
      {
        label: "Maintainer artifact",
        title: "Google Workspace MCP repository",
        href: "https://github.com/taylorwilsdon/google_workspace_mcp",
        date: "2026-03",
        note:
          "Highest practical operating breadth in this lane right now, with explicit Gmail, Docs, Sheets, Calendar, Drive, and Search coverage. High relevance, medium trust because it is maintainer-provided.",
      },
      {
        label: "Official provider",
        title: "Firecrawl MCP Server repository",
        href: "https://github.com/firecrawl/firecrawl-mcp-server",
        date: "2026-03",
        note:
          "Official provider support matters here because broken extraction kills downstream business workflows. High trust on operational reliability, weaker on independent comparison.",
      },
      {
        label: "Official native contender",
        title: "Google Workspace CLI discussion on Hacker News",
        href: "https://news.ycombinator.com/item?id=47284551",
        date: "2026-03",
        note:
          "Important because it proves the native official lane is evolving quickly. Right now it still looks narrower than the broad MCP operating surface for this job.",
      },
    ],
    headToHead: [
      {
        left: "Google Workspace MCP",
        right: "Firecrawl MCP",
        gist: "Workspace MCP is the operating spine (read and write docs, sheets, mail). Firecrawl is the research arm (scrape, extract, crawl). They complement rather than replace each other.",
      },
      {
        left: "Firecrawl MCP",
        right: "Exa MCP",
        gist: "Firecrawl wins when the job is deep extraction from specific pages. Exa wins when the job is fast search across many sources. Firecrawl is page-ops; Exa is search-first.",
      },
      {
        left: "Google Workspace MCP",
        right: "Google Workspace CLI",
        gist: "The CLI is official Google but intentionally non-MCP and narrower. The community MCP has broader cross-app coverage. The CLI proves Google is investing, but has not shipped a broad MCP alternative yet.",
      },
    ],
    whatChangesThis: [
      "If Google ships a clearly superior official cross-app Workspace agent surface, the top rank changes fast.",
      "If the job skews much harder toward research than operations, Firecrawl or Exa can move up depending on the exact workflow shape.",
    ],
  },
  "teams-of-agents": {
    slug: "teams-of-agents",
    name: "Teams of Agents / Software Factory / Ralph Loop",
    deck:
      "The meta here is splitting by workflow shape. OpenHands wins the broad software-agent lane, Ralph is the cleanest loop-pattern reference, and SWE-agent stays strongest for issue-level benchmark credibility.",
    verdict: [
      "OpenHands is the best broad default if the question is 'what actually feels like a software factory in public?'",
      "Ralph Loop Agent is the sharpest reference if the team wants a continuous autonomy loop without signing up for a giant platform.",
      "SWE-agent remains the best narrow contender when the argument is benchmarked issue-fixing rather than broad orchestration.",
    ],
    meta: [
      "This category is not one thing. Some teams want a full autonomous development surface, some want a repeatable loop pattern, and some just want the strongest issue-level repair agent.",
      "The honest comparison is not about fake global scores. It is about which workflow shape matches the team’s appetite for infra, control, and public trust.",
    ],
    ranking: [
      {
        rank: "01",
        contender: "OpenHands",
        skillSlug: "openhands",
        bestFor: "The broad software-factory and long-running development lane",
        why: "Largest public gravity and the strongest all-around software-agent surface.",
        watch: "Can be heavier than needed for simpler loop-based setups.",
      },
      {
        rank: "02",
        contender: "Ralph Loop Agent",
        skillSlug: "ralph-loop-agent",
        bestFor: "Continuous autonomy loops and the cleanest 'Ralph' pattern framing",
        why: "Best pure loop-pattern reference in the current public stack.",
        watch: "Thinner artifact surface than OpenHands or SWE-agent.",
      },
      {
        rank: "03",
        contender: "SWE-agent",
        skillSlug: "swe-agent",
        bestFor: "Issue-level repair with a strong benchmark story",
        why: "Best fit when the team cares more about SWE-bench-shaped credibility than platform sprawl.",
        watch: "Narrower than the broad software-factory lane.",
      },
    ],
    observedOutputs: [
      {
        title: "OpenHands public product surface",
        summary:
          "OpenHands is the clearest visible software-agent surface in the category. The homepage makes the adoption story obvious in a way raw benchmark posts do not.",
        href: "https://www.all-hands.dev/",
        date: "2026-03",
      },
      {
        title: "SWE-agent public benchmark artifact",
        summary:
          "SWE-agent’s banner and benchmark-native public surface make it the cleanest visible artifact in the issue-fixing lane.",
        href: "https://github.com/SWE-agent/SWE-agent",
        date: "2026-03",
      },
      {
        title: "Mini SWE-agent benchmark thread",
        summary:
          "This HN thread is useful because the researchers explain the 65% SWE-bench result in plain language and the comments expose what people actually trust in the benchmark story.",
        href: "https://news.ycombinator.com/item?id=44682897",
        date: "2025-07",
      },
    ],
    liveSignals: [
      {
        label: "High-signal HN comment",
        title: "OpenHands contributor on why multi-agent systems rarely help benchmark scores",
        href: "https://news.ycombinator.com/item?id=44508250",
        date: "2025-07",
        note:
          "One of the strongest public trust sources here because it is candid, specific, and comes from someone directly close to the OpenHands project instead of generic multi-agent hype.",
      },
      {
        label: "Benchmark-native",
        title: "Show HN: Mini-swe-agent achieves 65% on SWE-bench in 100 lines of Python",
        href: "https://news.ycombinator.com/item?id=44682897",
        date: "2025-07",
        note:
          "High trust because it comes from the SWE-agent researchers themselves and anchors the narrow issue-fixing lane in a concrete public result.",
      },
      {
        label: "Loop reference",
        title: "Ralph Loop Agent repository",
        href: "https://github.com/vercel-labs/ralph-loop-agent",
        date: "2025-12",
        note:
          "Important because it gives the loop pattern an official and compact reference implementation instead of a giant platform claim.",
      },
      {
        label: "Meta discussion",
        title: "Software factories and the agentic moment",
        href: "https://news.ycombinator.com/item?id=46924426",
        date: "2026-02",
        note:
          "Useful market-level signal because the thread is large and skeptical. It is not ranking evidence by itself, but it shows what the public is actually pushing back on in the software-factory story.",
      },
    ],
    headToHead: [
      {
        left: "OpenHands",
        right: "SWE-agent",
        gist: "OpenHands is the broad software-factory surface with the most public gravity. SWE-agent is narrower but benchmark-native. Choose OpenHands for general development, SWE-agent for issue-level repair credibility.",
      },
      {
        left: "OpenHands",
        right: "Ralph Loop Agent",
        gist: "OpenHands is a full platform with infra overhead. Ralph is a clean loop pattern for teams that want continuous autonomy without the platform weight. Different workflow shapes, not direct replacements.",
      },
      {
        left: "Ralph Loop Agent",
        right: "SWE-agent",
        gist: "Ralph is about loop-shaped continuous work. SWE-agent is about one-shot issue repair. Ralph is a pattern; SWE-agent is a tool. They solve different subcases of the same meta-job.",
      },
    ],
    whatChangesThis: [
      "If you want the cleanest loop pattern, Ralph can jump to the top for that subcase immediately.",
      "If benchmark performance dominates all other concerns, SWE-agent moves up.",
    ],
  },
  "ux-ui": {
    slug: "ux-ui",
    name: "UX / UI",
    deck:
      "The current meta is not 'which model can make the prettiest mockup.' It is 'which workflow produces something editable, trusted, and worth keeping inside the real design tool.'",
    verdict: [
      "The official Figma MCP lane still wins the broad default because it has the strongest trust and adoption story.",
      "Figma-use is the strongest public challenger when direct write access matters more than officialness.",
      "Vibma stays interesting, but still reads more like an emerging challenger than a stable default.",
    ],
    meta: [
      "There are two real lanes here: the official trust lane and the write-access challenger lane.",
      "Right now the official lane still wins overall because teams adopt trusted workflows faster than experimental ones, but the hottest experimentation is happening in the challenger lane.",
    ],
    ranking: [
      {
        rank: "01",
        contender: "Figma MCP Server Guide",
        skillSlug: "figma-mcp-server-guide",
        bestFor: "Official design context and team-friendly adoption",
        why: "Strongest trust lane and the clearest official path.",
        watch: "Still less exciting than write-access challengers for power users.",
      },
      {
        rank: "02",
        contender: "Figma-use",
        skillSlug: "figma-use",
        bestFor: "Direct write access and builder-heavy UI workflows",
        why: "Strongest public challenger artifact in the category.",
        watch: "Trust is still lower than the official lane.",
      },
      {
        rank: "03",
        contender: "Vibma",
        skillSlug: "vibma",
        bestFor: "Design-system-forward experiments inside Figma",
        why: "Interesting direct-design challenger with a clear angle.",
        watch: "Still much earlier and lower-trust than the top two.",
      },
      {
        rank: "04",
        contender: "Paper MCP",
        externalUrl: "https://paper.design/docs/mcp",
        bestFor: "Direct document mutation inside the design document itself",
        why: "The clearest direct-write wedge outside the Figma-native lane.",
        watch: "Narrower ecosystem and weaker broad public trust.",
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
        title: "Community write-access challenger",
        summary:
          "Figma-use is the clearest public write-access challenger because it has both repo artifacts and real HN discussion.",
        href: "https://github.com/dannote/figma-use",
        date: "2026-01",
      },
      {
        title: "Vibma challenger thread",
        summary:
          "Vibma is still early, but the HN thread is valuable because it states the direct-edit promise plainly and contrasts itself with the official Figma MCP lane.",
        href: "https://news.ycombinator.com/item?id=47217411",
        date: "2026-03",
      },
    ],
    liveSignals: [
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
      {
        label: "Hacker News challenger",
        title:
          "Show HN: Vibma - let agents create professional design system in Figma, directly",
        href: "https://news.ycombinator.com/item?id=47217411",
        date: "2026-03",
        note:
          "Lower traction than Figma-use, but still directly relevant because it frames the same write-access split.",
      },
    ],
    headToHead: [
      {
        left: "Figma MCP Server Guide",
        right: "Figma-use",
        gist: "The official path wins on trust and team adoption. Figma-use wins on direct write access and builder energy. Official is safer; Figma-use is more capable for power users.",
      },
      {
        left: "Figma-use",
        right: "Vibma",
        gist: "Both are write-access challengers, but Figma-use has significantly more public traction and trust. Vibma is earlier and more design-system-focused. Figma-use is the safer challenger bet.",
      },
      {
        left: "Figma MCP Server Guide",
        right: "Paper MCP",
        gist: "Both offer official-lane trust. Figma MCP is the broader ecosystem play. Paper MCP is a narrower direct-write wedge outside Figma entirely. Different tools for different design surfaces.",
      },
    ],
    whatChangesThis: [
      "If the official Figma path becomes dramatically better at direct write-back, the challenger gap narrows fast.",
      "If a challenger starts winning broad public trust instead of just builder attention, the top of the category shifts.",
    ],
  },
  "coding-clis": {
    slug: "coding-clis",
    name: "Coding CLIs / Code Agents",
    deck:
      "The hottest category right now. Six serious CLI agents — Claude Code, Codex CLI, Gemini CLI, OpenCode, Aider, and Continue (pivoted) — each with real traction. The split is model lock-in vs flexibility, autonomy depth vs accessibility, and free tier vs paid.",
    verdict: [
      "Claude Code is the strongest autonomous terminal agent — deepest multi-step execution with Opus 4.5's 80.9% SWE-bench. But Anthropic-only.",
      "OpenCode is the real open-source juggernaut — 120K+ stars, 5M monthly users, 75+ model providers. The all-rounder that nobody should be sleeping on.",
      "Codex CLI is OpenAI's Rust-built answer — GPT-5.4 with 1M context, cloud sandboxes, and multi-agent parallel workflows. New but serious.",
      "Gemini CLI has the most accessible free tier — 60 req/min, 1K req/day with just a Google account. Gemini 3 with 1M context is genuinely competitive.",
      "Aider remains the most transparent on benchmarks — 39K+ stars, 4.1M+ installs, works with every major model provider.",
      "Continue pivoted hard from IDE autocomplete to Continuous AI — async agents on PRs enforcing code quality. Different game entirely now.",
    ],
    meta: [
      "This is a six-way race and it is NOT converging. Each major model provider now has a CLI agent (Anthropic → Claude Code, OpenAI → Codex CLI, Google → Gemini CLI), and the open-source alternatives (OpenCode, Aider) compete on model flexibility.",
      "The honest comparison is: do you want the best model (Claude Code, Codex), the cheapest entry (Gemini CLI free tier), the most flexible (OpenCode, Aider), or background CI agents (Continue)?",
    ],
    ranking: [
      {
        rank: "01",
        contender: "Claude Code",
        skillSlug: "claude-code",
        bestFor: "Deepest autonomous multi-step terminal agent",
        why: "Opus 4.5 with 80.9% SWE-bench, native tool use, hooks, MCP extensibility. The autonomy leader.",
        watch: "Anthropic-only models. Premium pricing.",
      },
      {
        rank: "02",
        contender: "OpenCode",
        skillSlug: "opencode",
        bestFor: "Model-flexible open-source all-rounder",
        why: "120K+ stars, 5M users/month, 75+ model providers, privacy-first. The community winner.",
        watch: "Less opinionated — quality depends on model choice.",
      },
      {
        rank: "03",
        contender: "Codex CLI",
        skillSlug: "codex-cli",
        bestFor: "OpenAI ecosystem with cloud sandbox execution",
        why: "Rust-built, GPT-5.4 with 1M context, cloud sandboxes, multi-agent workflows.",
        watch: "OpenAI-only. Newer — less community battle-testing.",
      },
      {
        rank: "04",
        contender: "Gemini CLI",
        skillSlug: "gemini-cli",
        bestFor: "Best free tier and most accessible entry point",
        why: "60 req/min free, Gemini 3 with 1M context, built-in Google Search grounding.",
        watch: "Google-only models. Newest entrant.",
      },
      {
        rank: "05",
        contender: "Aider",
        skillSlug: "aider",
        bestFor: "Most transparent benchmarks and widest model support",
        why: "39K+ stars, 4.1M installs, works with every provider, git-native.",
        watch: "Chat-loop style rather than deep agent autonomy.",
        belowCutLine: true,
      },
      {
        rank: "06",
        contender: "Continue (Continuous AI)",
        skillSlug: "continue-dev",
        bestFor: "Background agents enforcing code quality on PRs",
        why: "Pivoted from IDE autocomplete to async CI agents. Different game entirely.",
        watch: "No longer an IDE tool. Best for teams, not solo devs.",
        belowCutLine: true,
      },
      {
        rank: "07",
        contender: "Cursor",
        externalUrl: "https://cursor.com",
        bestFor: "Polished commercial IDE with integrated AI",
        why: "Most adopted commercial AI IDE. Strong UX, strong composer mode.",
        watch: "Closed-source, paid, vendor-locked.",
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
          "120K+ GitHub stars make this the most starred coding agent. Supports 75+ models, privacy-first, terminal + desktop + IDE.",
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
          "Open-source (Apache 2.0), free tier with 60 req/min, Gemini 3 with 1M context and built-in Google Search grounding.",
        href: "https://github.com/google-gemini/gemini-cli",
        date: "2026-03",
      },
    ],
    liveSignals: [
      {
        label: "Market leader",
        title: "OpenCode hits 120K+ GitHub stars",
        href: "https://github.com/opencode-ai/opencode",
        date: "2026-03",
        note:
          "Largest community by star count in the coding CLI lane. 5M monthly users signals real adoption, not just hype.",
      },
      {
        label: "Official contender",
        title: "Codex CLI — OpenAI's open-source terminal agent",
        href: "https://github.com/openai/codex",
        date: "2026-03",
        note:
          "OpenAI entering the CLI agent race with a Rust-built open-source tool changes the competitive landscape. GPT-5.4 with 1M context is a real capability differentiator.",
      },
      {
        label: "Free tier disruptor",
        title: "Gemini CLI — free terminal agent with 1M context",
        href: "https://github.com/google-gemini/gemini-cli",
        date: "2025-06",
        note:
          "Google offering 60 req/min free undercuts the paid alternatives. Forces every competitor to justify their pricing.",
      },
      {
        label: "Benchmark transparency",
        title: "Aider polyglot SWE-bench results",
        href: "https://aider.chat/docs/leaderboards/",
        date: "2026-03",
        note:
          "Most transparent public benchmarking in the category. Updated regularly across multiple models.",
      },
    ],
    headToHead: [
      {
        left: "Claude Code",
        right: "Codex CLI",
        gist: "At launch (May 2025), HN consensus was Claude Code > Codex CLI. Codex has since tripled to 1.6M weekly users. Claude Code wins on reasoning depth; Codex wins on 1M context, Rust speed, and parallel agents.",
      },
      {
        left: "OpenCode",
        right: "Claude Code",
        gist: "OpenCode has 119K stars and superior TUI engineering (per HN praise). Claude Code wins on autonomy depth. But OpenCode had a critical RCE vulnerability and lost Claude auth access after Anthropic blocked it.",
      },
      {
        left: "Gemini CLI",
        right: "Aider",
        gist: "Gemini CLI is free (60 req/min) and has 97K stars but free-tier data trains models. Aider has 691K monthly PyPI downloads and scored within 2.8 points of Claude Code at 3x fewer tokens.",
      },
    ],
    whatChangesThis: [
      "If OpenCode's model-agnostic approach proves strictly better than locked-in providers, the official CLI agents lose their moat.",
      "If Gemini CLI's free tier gets good enough for production work, paid CLI agents need to justify their cost.",
      "If Continue's Continuous AI model works, background CI agents become a new subcategory entirely.",
    ],
  },
  "web-browsing": {
    slug: "web-browsing",
    name: "Web Browsing / Browser Automation",
    deck:
      "The meta is splitting between full vision-based browser agents and structured MCP-based browser tools. Browser Use wins the autonomous browsing lane; Stagehand wins the TypeScript-native lane; Playwright MCP wins the MCP-integrated lane.",
    verdict: [
      "Browser Use is the strongest default for agents that need to see and interact with real web pages — vision + DOM hybrid, large community, active development.",
      "Stagehand is the best pick for TypeScript-native teams that want the simplest API surface with natural language selectors.",
      "Playwright MCP is the best choice when the agent stack already uses MCP and needs structured browser control without a separate browser-use library.",
    ],
    meta: [
      "Browser automation for agents is different from traditional test automation. The agent needs to understand what it sees, not just execute scripted steps.",
      "The real split is between vision-heavy approaches (screenshot + DOM) and structured tool approaches (MCP-wrapped browser APIs). Both work, but for different workflow shapes.",
    ],
    ranking: [
      {
        rank: "01",
        contender: "Browser Use",
        skillSlug: "browser-use",
        bestFor: "Full autonomous web browsing with vision and DOM understanding",
        why: "Largest community, most complete vision+DOM hybrid, broadest model support.",
        watch: "Python-only. Reliability on complex flows still evolving.",
      },
      {
        rank: "02",
        contender: "Stagehand",
        skillSlug: "stagehand",
        bestFor: "TypeScript-native browser automation with natural language selectors",
        why: "Cleanest API surface. Best DX for TypeScript teams.",
        watch: "Smaller community. Browserbase ecosystem tie-in.",
      },
      {
        rank: "03",
        contender: "Playwright MCP",
        skillSlug: "playwright-mcp",
        bestFor: "MCP-integrated browser control for existing MCP agent stacks",
        why: "Best fit when the agent already speaks MCP and needs browser as a tool.",
        watch: "Less vision-aware. Narrower community.",
      },
    ],
    observedOutputs: [
      {
        title: "Browser Use autonomous browsing",
        summary:
          "Browser Use's GitHub presence and demo artifacts are the strongest visible proof in the autonomous browsing lane.",
        href: "https://github.com/browser-use/browser-use",
        date: "2026-03",
      },
      {
        title: "Stagehand act/extract/observe API",
        summary:
          "Stagehand's three-primitive API and natural language selectors represent the cleanest developer experience artifact in browser automation.",
        href: "https://github.com/browserbase/stagehand",
        date: "2026-03",
      },
    ],
    liveSignals: [
      {
        label: "Community traction",
        title: "Browser Use — make websites accessible for AI agents",
        href: "https://github.com/browser-use/browser-use",
        date: "2026-03",
        note:
          "Strongest community signal in the browser automation lane by star count and active development. The vision+DOM hybrid approach is becoming the default pattern.",
      },
      {
        label: "TypeScript-native",
        title: "Stagehand by Browserbase — AI web browsing framework",
        href: "https://github.com/browserbase/stagehand",
        date: "2026-03",
        note:
          "Important because it gives TypeScript teams a clean alternative to Python-only browser-use. The natural language selector approach reduces selector fragility.",
      },
    ],
    headToHead: [
      {
        left: "Browser Use",
        right: "Stagehand",
        gist: "Browser Use: 80K stars, $17M seed (YC W25, Paul Graham). Stagehand: 21K stars, Browserbase-backed ($67.5M). Browser Use 4x the traction but Python-only; Stagehand wins TypeScript teams.",
      },
      {
        left: "Browser Use",
        right: "Playwright MCP",
        gist: "Browser Use uses vision+DOM. Playwright MCP uses accessibility snapshots (more reliable for structured data). Playwright MCP is auto-configured in GitHub Copilot Coding Agent — institutional default vs. community darling.",
      },
      {
        left: "Stagehand",
        right: "Playwright MCP",
        gist: "Stagehand has AI-native natural language selectors and richer DX. Playwright MCP has broader browser automation maturity under the hood. Stagehand for DX; Playwright MCP for MCP integration.",
      },
    ],
    whatChangesThis: [
      "If browser-use ships a TypeScript SDK, Stagehand's language advantage narrows.",
      "If MCP adoption accelerates, Playwright MCP could move up as agents standardize on tool protocols.",
      "If vision models get dramatically better at understanding web pages, vision-first approaches pull ahead of structured DOM approaches.",
    ],
  },
};

export const platforms: Record<PlatformSlug, PlatformRecord> = {
  figma: {
    slug: "figma",
    name: "Figma",
    url: "https://figma.com",
    summary:
      "The dominant design tool. Native MCP support is evolving. The key question for agents is whether the official path is enough or write-access challengers fill the gap.",
    nativeSupport:
      "Figma ships an official MCP server guide with remote and desktop variants. Read access is strong; direct write-back is still the frontier.",
    relatedJobs: ["ux-ui"],
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
    relatedJobs: ["product-business-development"],
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
    relatedJobs: ["web-browsing"],
    relatedSkills: ["browser-use", "playwright-mcp", "stagehand"],
  },
  terminal: {
    slug: "terminal",
    name: "Terminal / CLI",
    url: "https://en.wikipedia.org/wiki/Terminal_emulator",
    summary:
      "The developer's native workspace. Coding agents either run inside the terminal (Claude Code, Aider) or wrap it inside an IDE (Cursor, Continue).",
    nativeSupport:
      "Terminals provide raw shell access. The agent layer is entirely in the tool — no platform-level agent API exists.",
    relatedJobs: ["coding-clis"],
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
    relatedJobs: ["teams-of-agents", "coding-clis"],
    relatedSkills: ["openhands", "swe-agent", "claude-code"],
  },
};

export const platformList = Object.values(platforms);

export const jobList = [
  jobs["coding-clis"],
  jobs["web-browsing"],
  jobs["product-business-development"],
  jobs["teams-of-agents"],
  jobs["ux-ui"],
];

export const skillList = Object.values(skills);

export function getJob(slug: string) {
  return jobs[slug as JobSlug];
}

export function getSkill(slug: string) {
  return skills[slug as SkillSlug];
}

export function getPlatform(slug: string) {
  return platforms[slug as PlatformSlug];
}
