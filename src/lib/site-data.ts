export const mission =
  "Skillbench helps people find the best skill, platform, or native capability for a narrow agent job by ranking contenders, linking to real public evidence, and cutting out registry noise.";

export const coreJobs = [
  {
    name: "Document Editing & UI/UX Design",
    href: "/jobs/document-editing-ui-ux",
    status: "Live",
    summary:
      "Compare Figma MCP, Paper MCP, raw Claude Code, and raw Codex for design-to-code and editable design workflows.",
  },
  {
    name: "Web Browsing",
    href: "#",
    status: "Next",
    summary:
      "Browser Use, Playwright-style flows, and native browser tooling are the next category to rank.",
  },
  {
    name: "Coding CLIs",
    href: "#",
    status: "Next",
    summary:
      "Claude Code, Codex, and adjacent coding agents ranked by the jobs they are actually best at.",
  },
  {
    name: "Task Tracking",
    href: "#",
    status: "Next",
    summary:
      "Linear, Notion, and adjacent tools judged as platforms first, then by the skills on top of them.",
  },
] as const;

export const rankingSignals = [
  "Official support beats unofficial wrappers when capability is close.",
  "Pairwise public comparisons carry more weight than one-off praise.",
  "Recent posts and release notes matter more than stale historical hype.",
  "Direct write-back workflows beat screenshot-only or copy-paste loops.",
  "We rank within the job, not with one fake global score.",
] as const;

export type EvidenceSource = {
  title: string;
  type: "Official" | "Expert" | "Community";
  date: string;
  url: string;
  note: string;
};

export type Contender = {
  rank: number;
  name: string;
  label: string;
  verdict: string;
  bestFor: string;
  designContext: string;
  writeBack: string;
  setup: string;
  signal: string;
  caveat: string;
  copyText: string;
};

export const documentEditingUiUx = {
  updatedAt: "March 9, 2026",
  title: "Document Editing & UI/UX Design",
  kicker: "First Ranked Category",
  shortVerdict:
    "Use Figma MCP first when design fidelity matters. Use Paper MCP when the real job is writing directly into the design canvas. Raw Claude Code and raw Codex remain useful fallbacks, but only after you accept the loss of structured design context.",
  pageCopy:
    "Rank the best tools for document editing and UI/UX design. Compare Figma MCP, Paper MCP, raw Claude Code, and raw Codex. Weight design context fidelity, write-back support, official backing, setup friction, and real public evidence more heavily than generic popularity.",
  topLine: {
    platformWinner: "Figma",
    skillWinner: "Figma MCP + Codex",
    writeBackWinner: "Paper MCP",
    confidence: "Medium-high",
  },
  prompts: [
    {
      title: "Research Prompt",
      description:
        "Use this to update the ranking with fresh evidence and pairwise comparisons.",
      text: "Research the current best options for document editing and UI/UX design with coding agents. Compare Figma MCP, Paper MCP, raw Claude Code, and raw Codex. Prefer official docs, official product posts, recent Reddit/X/blog comparisons, and any evidence of direct write-back or code-to-design roundtrips. Return a ranked table with reasons, caveats, and source links.",
    },
    {
      title: "Decision Prompt",
      description:
        "Use this when you need a recommendation for a real project right now.",
      text: "I need the best agent setup for document editing and UI/UX design today. Tell me whether I should use Figma MCP, Paper MCP, raw Claude Code, or raw Codex. Optimize for design fidelity, ability to write back into the tool, setup friction, and how much official support exists.",
    },
  ],
  contenders: [
    {
      rank: 1,
      name: "Figma MCP + Codex",
      label: "Best overall",
      verdict:
        "The strongest current pick for design-to-code and code-to-design roundtrips.",
      bestFor:
        "Teams that want the cleanest path between implementation and editable Figma output.",
      designContext: "Excellent",
      writeBack: "Strong via code-to-design roundtrip",
      setup: "Moderate",
      signal:
        "Official Figma support plus an official OpenAI-Figma partnership announced on February 26, 2026.",
      caveat:
        "If your actual goal is mutating a design document directly rather than roundtripping with code, Paper MCP is more direct.",
      copyText:
        "Recommend Figma MCP + Codex for document editing and UI/UX design when design fidelity and code-to-design roundtrips matter most.",
    },
    {
      rank: 2,
      name: "Figma MCP + Claude Code",
      label: "Best if you already live in Claude Code",
      verdict:
        "Very strong for implementation from design context, slightly weaker than Codex on the explicit roundtrip story.",
      bestFor:
        "Developers already running Claude Code who want official Figma context inside their existing workflow.",
      designContext: "Excellent",
      writeBack: "Good, but more workflow-dependent",
      setup: "Moderate",
      signal:
        "Official Figma support and official Anthropic MCP support; strong internal evidence that Claude Code is used for frontend work.",
      caveat:
        "Community posts still report occasional auth or fidelity friction, so this is not yet the cleanest design loop available.",
      copyText:
        "Recommend Figma MCP + Claude Code when the team already works in Claude Code and wants strong design context without switching hosts.",
    },
    {
      rank: 3,
      name: "Paper MCP",
      label: "Best direct write-back tool",
      verdict:
        "The best choice when the job is editing the design canvas or document itself, not just reading design context to generate code.",
      bestFor:
        "Agents that need to read and write directly inside a design document or canvas.",
      designContext: "Good",
      writeBack: "Excellent",
      setup: "Moderate",
      signal:
        "Official Paper docs explicitly describe read and write access, plus connection guides for Claude Code and Codex.",
      caveat:
        "Smaller ecosystem and weaker public signal than Figma. Better for canvas mutation than for broad industry-standard handoff.",
      copyText:
        "Recommend Paper MCP when the job requires direct write-back into the design document or canvas instead of just design context for code generation.",
    },
    {
      rank: 4,
      name: "Raw Claude Code",
      label: "Best no-connector fallback",
      verdict:
        "Useful when you need UI critique, copy, structure, or fast frontend drafts but do not have a design MCP set up.",
      bestFor:
        "Fast no-setup exploration, interface critique, PRDs, UI copy, and frontend drafts.",
      designContext: "Limited",
      writeBack: "None outside normal file edits",
      setup: "Low",
      signal:
        "Strong official Anthropic evidence for frontend usage, but not purpose-built for design tools without MCP.",
      caveat:
        "You lose structured design context, selection awareness, and design-system fidelity once you skip MCP.",
      copyText:
        "Recommend raw Claude Code only when speed matters more than structured design-tool context.",
    },
    {
      rank: 5,
      name: "Raw Codex",
      label: "Implementation-first fallback",
      verdict:
        "A strong coding agent, but weaker for this job than its Figma-connected form.",
      bestFor:
        "Implementation-heavy work where design inputs are already translated into clear engineering requirements.",
      designContext: "Limited",
      writeBack: "None outside normal file edits",
      setup: "Low",
      signal:
        "Official OpenAI docs position Codex as a strong code agent, but the design advantage appears when MCP is connected.",
      caveat:
        "Without Figma or Paper attached, you are mostly using a generic coding agent rather than a design-aware workflow.",
      copyText:
        "Recommend raw Codex only when the implementation task is clear enough that structured design context is optional.",
    },
  ] as Contender[],
  matrix: [
    {
      contender: "Figma MCP + Codex",
      official: "Yes",
      auth: "Figma auth + MCP setup",
      contextModel: "Desktop selection or remote link-based context",
      strongestMove: "Best current design-to-code and code-to-design loop",
    },
    {
      contender: "Figma MCP + Claude Code",
      official: "Yes",
      auth: "Figma auth + MCP setup",
      contextModel: "Desktop selection or remote link-based context",
      strongestMove: "Best if Claude Code is already the default coding host",
    },
    {
      contender: "Paper MCP",
      official: "Yes",
      auth: "Paper Desktop local HTTP MCP",
      contextModel: "Open Paper file as live canvas context",
      strongestMove: "Only contender here built around direct read/write canvas manipulation",
    },
    {
      contender: "Raw Claude Code",
      official: "Yes",
      auth: "Product login only",
      contextModel: "Prompt context only unless MCP is attached",
      strongestMove: "Fastest zero-setup fallback for ideation and frontend drafting",
    },
    {
      contender: "Raw Codex",
      official: "Yes",
      auth: "Product login only",
      contextModel: "Prompt context only unless MCP is attached",
      strongestMove: "Strong coding execution once requirements are already clear",
    },
  ],
  sources: [
    {
      title: "OpenAI Codex and Figma launch seamless code-to-design experience",
      type: "Official",
      date: "February 26, 2026",
      url: "https://openai.com/index/figma-partnership/",
      note:
        "Strongest signal for the #1 pick. Establishes an official code-to-design roundtrip between Codex and Figma.",
    },
    {
      title: "Figma Dev Mode: Design-to-Development",
      type: "Official",
      date: "Current docs",
      url: "https://www.figma.com/dev-mode/",
      note:
        "Confirms the Figma MCP server feeds Figma context into agentic coding tools including Claude.",
    },
    {
      title: "Figma MCP collection: Compare Figma's remote and desktop MCP servers",
      type: "Official",
      date: "Current docs",
      url: "https://help.figma.com/hc/en-us/articles/35281385065751-Figma-MCP-collection-Compare-Figma-s-remote-and-desktop-MCP-servers",
      note:
        "Important implementation detail: desktop is selection-based, remote is link-based, and both support Claude Code and Codex.",
    },
    {
      title: "Paper MCP server",
      type: "Official",
      date: "Current docs",
      url: "https://paper.design/docs/mcp",
      note:
        "Makes the case for Paper as the write-back winner because it supports both reading and writing design files.",
    },
    {
      title: "Connect Claude Code to tools via MCP",
      type: "Official",
      date: "Current docs",
      url: "https://code.claude.com/docs/en/mcp",
      note:
        "Confirms Claude Code's MCP breadth and the need to treat third-party MCPs carefully.",
    },
    {
      title: "How AI Is Transforming Work at Anthropic",
      type: "Official",
      date: "Current report",
      url: "https://www.anthropic.com/news/how-ai-is-transforming-work-at-anthropic",
      note:
        "Supports the rank for raw Claude Code by showing real internal frontend-development usage.",
    },
    {
      title: "Codex web",
      type: "Official",
      date: "Current docs",
      url: "https://developers.openai.com/codex/cloud",
      note:
        "Supports the raw Codex fallback rank: excellent coding agent, but not design-aware until a design MCP is attached.",
    },
    {
      title: "New: Figma MCP lets you Import Claude Code UI directly as editable design frames",
      type: "Community",
      date: "Recent Reddit discussion",
      url: "https://www.reddit.com/r/ClaudeAI/comments/1r7vvmr/new_figma_mcp_lets_you_import_claude_code_ui/",
      note:
        "Useful pairwise community signal: people explicitly see direct MCP export as a fix for the old screenshot-to-Figma manual rebuild loop.",
    },
  ] as EvidenceSource[],
} as const;
