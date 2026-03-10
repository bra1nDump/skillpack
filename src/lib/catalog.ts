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
  }>;
  observedOutputs: Array<{
    title: string;
    summary: string;
    href: string;
    image?: string;
  }>;
  liveSignals: Array<{
    label: string;
    title: string;
    href: string;
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
    previewImage:
      "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/figma-mcp-help.png",
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
    previewImage:
      "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/figma-use-repo-hero.png",
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
    previewImage:
      "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/vibma-hn.png",
    relatedJobs: ["ux-ui"],
    strengths: [
      "Very explicit write-directly positioning",
      "Good fit for people testing aggressive design automation",
    ],
    weaknesses: [
      "Low public traction so far",
      "Trust is still builder-post level rather than broad adoption",
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
    previewImage:
      "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/firecrawl-mcp-repo-hero.png",
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
    previewImage:
      "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/exa-mcp-repo-hero.png",
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
    previewImage:
      "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/google-workspace-mcp-repo-hero.png",
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
    previewImage:
      "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/openhands-home-hero.png",
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
    previewImage:
      "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/ralph-loop-repo-hero.png",
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
    previewImage:
      "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/swe-agent-repo-hero.png",
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
      "Anthropic's official agentic coding CLI. Terminal-native, tool-use-driven, with deep file system and shell access.",
    verdict:
      "Best default for developers who want a terminal-first agent that reads, writes, and runs code autonomously with minimal setup.",
    relatedJobs: ["coding-clis", "teams-of-agents"],
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
  },
  opencode: {
    slug: "opencode",
    name: "OpenCode",
    repo: "opencode-ai/opencode",
    repoUrl: "https://github.com/opencode-ai/opencode",
    readmeBranch: "main",
    official: false,
    status: "active",
    summary:
      "Open-source AI coding agent with 120K+ GitHub stars, 5M+ monthly users, and support for 75+ model providers including local models. Terminal, desktop, and IDE versions.",
    verdict:
      "The strongest open-source all-rounder: model flexibility (75+ providers), privacy-first architecture, and massive community adoption. The real open-source alternative to Claude Code.",
    docsUrl: "https://opencode.ai",
    relatedJobs: ["coding-clis"],
    strengths: [
      "75+ model providers including local models via Ollama",
      "120K+ GitHub stars, 5M+ monthly users — massive adoption",
      "Privacy-first: does not store code or context",
      "Available as CLI, desktop app, and IDE extension",
      "Can switch models mid-session while maintaining context",
    ],
    weaknesses: [
      "Jack of all trades — less opinionated than Claude Code or Codex",
      "Quality depends heavily on which model you choose",
      "Less deep integration with any single model provider",
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
      "Newer entrant — less community track record than Aider or Claude Code",
      "Google Search grounding quality depends on query",
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
  },
  "playwright-mcp": {
    slug: "playwright-mcp",
    name: "Playwright MCP",
    repo: "anthropics/anthropic-quickstarts",
    repoUrl: "https://github.com/anthropics/anthropic-quickstarts",
    readmeBranch: "main",
    official: true,
    status: "active",
    summary:
      "MCP server wrapping Playwright for structured browser automation accessible to any MCP-compatible agent.",
    verdict:
      "Best MCP-native browser option when the agent stack already uses MCP and needs structured browser control.",
    relatedJobs: ["web-browsing"],
    strengths: [
      "MCP-native — works with any MCP-compatible host",
      "Built on Playwright's mature browser automation",
      "Structured tool interface rather than raw browser scripting",
    ],
    weaknesses: [
      "Less vision-aware than Browser Use",
      "Requires MCP host support",
      "Narrower community than standalone browser-use libraries",
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
      },
    ],
    observedOutputs: [
      {
        title: "Google Workspace MCP public operating surface",
        summary:
          "The strongest visible artifact in this lane is still the Google Workspace MCP public repo surface because it shows the breadth of the operating stack in one place.",
        href: "https://github.com/taylorwilsdon/google_workspace_mcp",
        image:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/google-workspace-mcp-repo-hero.png",
      },
      {
        title: "Firecrawl research-side extraction surface",
        summary:
          "Firecrawl’s public surface is simpler visually, but it remains the cleanest official scraping and extraction path for the business-research lane.",
        href: "https://github.com/firecrawl/firecrawl-mcp-server",
        image:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/firecrawl-mcp-repo-hero.png",
      },
      {
        title: "Exa search-first research surface",
        summary:
          "Exa remains the cleanest public search-first surface in this category when the job is discovery rather than acting inside the workspace itself.",
        href: "https://github.com/exa-labs/exa-mcp-server",
        image:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/exa-mcp-repo-hero.png",
      },
    ],
    liveSignals: [
      {
        label: "Hacker News comparison",
        title: "Comment in the Google Workspace CLI thread: 'Honestly, easier with MCP straight up'",
        href: "https://news.ycombinator.com/item?id=47258403",
        note:
          "Useful because it is an active public comparison inside the official Google Workspace CLI discussion. Moderate trust: practitioner comment, not official guidance, but directly on point.",
        preview:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/gws-cli-mcp-comment-hn.png",
      },
      {
        label: "Maintainer artifact",
        title: "Google Workspace MCP repository",
        href: "https://github.com/taylorwilsdon/google_workspace_mcp",
        note:
          "Highest practical operating breadth in this lane right now, with explicit Gmail, Docs, Sheets, Calendar, Drive, and Search coverage. High relevance, medium trust because it is maintainer-provided.",
        preview:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/google-workspace-mcp-repo-hero.png",
      },
      {
        label: "Official provider",
        title: "Firecrawl MCP Server repository",
        href: "https://github.com/firecrawl/firecrawl-mcp-server",
        note:
          "Official provider support matters here because broken extraction kills downstream business workflows. High trust on operational reliability, weaker on independent comparison.",
        preview:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/firecrawl-mcp-repo-hero.png",
      },
      {
        label: "Official native contender",
        title: "Google Workspace CLI discussion on Hacker News",
        href: "https://news.ycombinator.com/item?id=47284551",
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
        image:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/openhands-home-hero.png",
      },
      {
        title: "SWE-agent public benchmark artifact",
        summary:
          "SWE-agent’s banner and benchmark-native public surface make it the cleanest visible artifact in the issue-fixing lane.",
        href: "https://github.com/SWE-agent/SWE-agent",
        image:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/swe-agent-repo-hero.png",
      },
      {
        title: "Mini SWE-agent benchmark thread",
        summary:
          "This HN thread is useful because the researchers explain the 65% SWE-bench result in plain language and the comments expose what people actually trust in the benchmark story.",
        href: "https://news.ycombinator.com/item?id=44682897",
        image:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/mini-swe-agent-hn.png",
      },
    ],
    liveSignals: [
      {
        label: "High-signal HN comment",
        title: "OpenHands contributor on why multi-agent systems rarely help benchmark scores",
        href: "https://news.ycombinator.com/item?id=44508250",
        note:
          "One of the strongest public trust sources here because it is candid, specific, and comes from someone directly close to the OpenHands project instead of generic multi-agent hype.",
        preview:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/openhands-multi-agent-hn.png",
      },
      {
        label: "Benchmark-native",
        title: "Show HN: Mini-swe-agent achieves 65% on SWE-bench in 100 lines of Python",
        href: "https://news.ycombinator.com/item?id=44682897",
        note:
          "High trust because it comes from the SWE-agent researchers themselves and anchors the narrow issue-fixing lane in a concrete public result.",
        preview:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/mini-swe-agent-hn.png",
      },
      {
        label: "Loop reference",
        title: "Ralph Loop Agent repository",
        href: "https://github.com/vercel-labs/ralph-loop-agent",
        note:
          "Important because it gives the loop pattern an official and compact reference implementation instead of a giant platform claim.",
        preview:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/ralph-loop-repo-hero.png",
      },
      {
        label: "Meta discussion",
        title: "Software factories and the agentic moment",
        href: "https://news.ycombinator.com/item?id=46924426",
        note:
          "Useful market-level signal because the thread is large and skeptical. It is not ranking evidence by itself, but it shows what the public is actually pushing back on in the software-factory story.",
        preview:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/software-factory-hn.png",
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
      },
    ],
    observedOutputs: [
      {
        title: "Official Figma MCP guidance",
        summary:
          "Figma’s own remote-vs-desktop MCP guide is the cleanest official artifact because it shows the tool split and the workflow assumptions directly.",
        href: "https://help.figma.com/hc/en-us/articles/35281385065751-Figma-MCP-collection-Compare-Figma-s-remote-and-desktop-MCP-servers",
        image:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/figma-mcp-help.png",
      },
      {
        title: "Community write-access challenger",
        summary:
          "Figma-use is the clearest public write-access challenger because it has both repo artifacts and real HN discussion.",
        href: "https://github.com/dannote/figma-use",
        image:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/figma-use-repo-hero.png",
      },
      {
        title: "Vibma challenger thread",
        summary:
          "Vibma is still early, but the HN thread is valuable because it states the direct-edit promise plainly and contrasts itself with the official Figma MCP lane.",
        href: "https://news.ycombinator.com/item?id=47217411",
        image:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/vibma-hn.png",
      },
    ],
    liveSignals: [
      {
        label: "Official docs",
        title: "Compare Figma's remote and desktop MCP servers",
        href: "https://help.figma.com/hc/en-us/articles/35281385065751-Figma-MCP-collection-Compare-Figma-s-remote-and-desktop-MCP-servers",
        note:
          "Highest trust in the category because it is the provider spelling out the workflow split directly.",
        preview:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/figma-mcp-help.png",
      },
      {
        label: "Official repo",
        title: "Figma MCP Server Guide repository",
        href: "https://github.com/figma/mcp-server-guide",
        note:
          "The repo itself is a useful trust signal because it shows Figma treating this as a maintained, evolving workflow instead of a one-off demo.",
        preview:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/figma-mcp-guide-repo-hero.png",
      },
      {
        label: "Hacker News head-to-head",
        title: "Show HN: Figma-use - CLI to control Figma for AI agents",
        href: "https://news.ycombinator.com/item?id=46665169",
        note:
          "Strongest public head-to-head challenger signal in the category so far. Higher trust than random social chatter because the thread exposes real questions about direct control and workflow shape.",
        preview:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/figma-use-hn.png",
      },
      {
        label: "Hacker News challenger",
        title:
          "Show HN: Vibma - let agents create professional design system in Figma, directly",
        href: "https://news.ycombinator.com/item?id=47217411",
        note:
          "Lower traction than Figma-use, but still directly relevant because it frames the same write-access split.",
        preview:
          "/run-assets/2026-03-09_12-55_evidence-capture_core-jobs/assets/vibma-hn.png",
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
      },
      {
        rank: "06",
        contender: "Continue (Continuous AI)",
        skillSlug: "continue-dev",
        bestFor: "Background agents enforcing code quality on PRs",
        why: "Pivoted from IDE autocomplete to async CI agents. Different game entirely.",
        watch: "No longer an IDE tool. Best for teams, not solo devs.",
      },
      {
        rank: "07",
        contender: "Cursor",
        externalUrl: "https://cursor.com",
        bestFor: "Polished commercial IDE with integrated AI",
        why: "Most adopted commercial AI IDE. Strong UX, strong composer mode.",
        watch: "Closed-source, paid, vendor-locked.",
      },
    ],
    observedOutputs: [
      {
        title: "Claude Code CLI",
        summary:
          "Claude Code's terminal workflow is the strongest visible artifact in the autonomous CLI lane — direct shell access, multi-file edits, tool-use-driven execution.",
        href: "https://github.com/anthropics/claude-code",
      },
      {
        title: "OpenCode — the open-source alternative",
        summary:
          "120K+ GitHub stars make this the most starred coding agent. Supports 75+ models, privacy-first, terminal + desktop + IDE.",
        href: "https://github.com/opencode-ai/opencode",
      },
      {
        title: "Codex CLI by OpenAI",
        summary:
          "Rust-built, open-source, with GPT-5.4 and 1M context. Cloud sandbox execution and multi-agent parallel workflows.",
        href: "https://github.com/openai/codex",
      },
      {
        title: "Gemini CLI by Google",
        summary:
          "Open-source (Apache 2.0), free tier with 60 req/min, Gemini 3 with 1M context and built-in Google Search grounding.",
        href: "https://github.com/google-gemini/gemini-cli",
      },
    ],
    liveSignals: [
      {
        label: "Market leader",
        title: "OpenCode hits 120K+ GitHub stars",
        href: "https://github.com/opencode-ai/opencode",
        note:
          "Largest community by star count in the coding CLI lane. 5M monthly users signals real adoption, not just hype.",
      },
      {
        label: "Official contender",
        title: "Codex CLI — OpenAI's open-source terminal agent",
        href: "https://github.com/openai/codex",
        note:
          "OpenAI entering the CLI agent race with a Rust-built open-source tool changes the competitive landscape. GPT-5.4 with 1M context is a real capability differentiator.",
      },
      {
        label: "Free tier disruptor",
        title: "Gemini CLI — free terminal agent with 1M context",
        href: "https://github.com/google-gemini/gemini-cli",
        note:
          "Google offering 60 req/min free undercuts the paid alternatives. Forces every competitor to justify their pricing.",
      },
      {
        label: "Benchmark transparency",
        title: "Aider polyglot SWE-bench results",
        href: "https://aider.chat/docs/leaderboards/",
        note:
          "Most transparent public benchmarking in the category. Updated regularly across multiple models.",
      },
    ],
    headToHead: [
      {
        left: "Claude Code",
        right: "Codex CLI",
        gist: "Claude Code has deeper autonomy and SWE-bench leadership. Codex CLI has 1M context, cloud sandboxes, and multi-agent workflows. Different model providers, both official and serious.",
      },
      {
        left: "OpenCode",
        right: "Claude Code",
        gist: "OpenCode wins on model flexibility (75+ providers) and adoption (120K+ stars). Claude Code wins on autonomy depth and Opus quality. OpenCode is the people's choice; Claude Code is the power user's pick.",
      },
      {
        left: "Gemini CLI",
        right: "Aider",
        gist: "Gemini CLI is free and has 1M context but locked to Google models. Aider works with every provider and has the most transparent benchmarks. Free vs flexible.",
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
      },
      {
        title: "Stagehand act/extract/observe API",
        summary:
          "Stagehand's three-primitive API and natural language selectors represent the cleanest developer experience artifact in browser automation.",
        href: "https://github.com/browserbase/stagehand",
      },
    ],
    liveSignals: [
      {
        label: "Community traction",
        title: "Browser Use — make websites accessible for AI agents",
        href: "https://github.com/browser-use/browser-use",
        note:
          "Strongest community signal in the browser automation lane by star count and active development. The vision+DOM hybrid approach is becoming the default pattern.",
      },
      {
        label: "TypeScript-native",
        title: "Stagehand by Browserbase — AI web browsing framework",
        href: "https://github.com/browserbase/stagehand",
        note:
          "Important because it gives TypeScript teams a clean alternative to Python-only browser-use. The natural language selector approach reduces selector fragility.",
      },
    ],
    headToHead: [
      {
        left: "Browser Use",
        right: "Stagehand",
        gist: "Browser Use is Python-only with vision+DOM hybrid and the largest community. Stagehand is TypeScript-native with the cleanest API and natural language selectors. Browser Use for Python teams; Stagehand for TypeScript teams.",
      },
      {
        left: "Browser Use",
        right: "Playwright MCP",
        gist: "Browser Use is a standalone library with vision understanding. Playwright MCP is a structured tool interface for MCP hosts. Browser Use for autonomous browsing; Playwright MCP for agents that already speak MCP.",
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
