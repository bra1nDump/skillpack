# Skillbench

## Change priority protocol

When told to change something, ALWAYS follow this order:
1. **Update human-steering-history.md** — log the decision as stated
2. **Update docs** (agents.md, specification.md, agent prompts) — reflect the new rule
3. **Make code changes** — implement in catalog.ts, components, pages

## What this is

Curated, evidence-backed buyer's guide for agent skills. Not a registry, not a marketplace. The core value is: narrow categories, strong rankings, real citations, head-to-head comparisons.

The main user intent: **"What's the best skill for the thing I'm trying to do?"**

## Project structure

```
specification.md              ← Product spec, entities, evidence model, signal quality bar
competition.md                ← Landscape analysis, registries, benchmarks, gap analysis
human-steering-history.md     ← Design decision log

agents/                       ← Research pipeline agent prompts
  discover.md                 ← Find fresh signals, new contenders, shifting meta
  deep-dive.md                ← Build evidence base, trust tags, multi-source verification
  rank.md                     ← Editorial ranking per category
  qa.md                       ← Publish gate — content quality, links, signals, cross-tool review

agent-runs/                   ← Research run outputs
  agents.md                   ← Run folder structure and findings template
  <timestamp>_run_<category>/
    discover_<category>/findings.md
    deep-dive_<category>/findings.md
    rank_<category>/findings.md

scripts/                      ← Automation scripts
  ralph.mjs                   ← Research pipeline orchestrator (spawns claude -p per stage)
  collect-stars.mjs            ← GitHub star metrics collection
  collect-downloads.mjs        ← npm/PyPI weekly download metrics
  collect-mentions.mjs         ← HN mention counts (7-day window)

src/                          ← Next.js application
  app/                        ← Pages (homepage, /categories/[slug], /skills/[slug], etc.)
  lib/catalog.ts              ← Skill, category, bundle, platform data (fed by pipeline)
  lib/chart-theme.ts          ← Chart colors and styling
  components/                 ← Shared UI components
  components/charts/           ← Recharts-based data visualizations
```

## Research pipeline (Ralph Loop)

Orchestrated by `scripts/ralph.mjs`. Each stage spawns a `claude -p` subprocess with its own system prompt.

```
Discover → Deep-Dive → Rank → Catalog Update → Metrics → QA
```

1. **Discover** (~5 min) — AGGRESSIVELY find ALL contenders using web search, Twitter/X, Reddit, HN Algolia, GitHub trending, registry checks. Missing a key player is a critical failure.
2. **Deep-Dive** (~15-25 min) — build MEASURABLE evidence with inline artifacts, hard quality gates, and engagement metrics. Evidence not passing the bar gets DISCARDED. Also contributes new finds.
3. **Rank** (~5 min) — editorial ranking per category. Top 3-4 recommended, rest below the cut line. Evidence-first, opinionated.
4. **Catalog Update** (~5 min) — Claude reads rank findings and updates `src/lib/catalog.ts` — evidence, rankings, verdicts, signals.
5. **Metrics** (~1 min) — collects GitHub stars, npm/PyPI downloads, HN mentions. No AI needed.
6. **QA** (~2 min) — `npm run build` + `npm run qa:links`. Catches broken TypeScript or dead links.

### Running the pipeline

```bash
# Single category
npm run ralph -- --category coding-clis

# All 7 categories (sequential, ~4-5 hours)
npm run ralph -- --all

# Parallel (3 categories at a time, ~2 hours)
npm run ralph -- --all --parallel 3

# All categories at once (needs ~3GB RAM)
npm run ralph -- --all --parallel 7

# Loop mode (repeat every 30 min)
npm run ralph -- --all --parallel 3 --loop --interval 30

# Direct invocation (same thing)
node scripts/ralph.mjs --all --parallel 3
```

### Metrics collection (standalone)

```bash
# All metrics
npm run metrics:all

# Individual
npm run metrics:collect      # GitHub stars
npm run metrics:downloads    # npm/PyPI weekly downloads
npm run metrics:mentions     # HN mentions (7-day, >5 points)
```

## Research tools

- **Web search** — broad queries, comparisons, "best X 2026"
- **Twitter/X** — `x-twitter` Claude skill (search, trending, count, user commands)
- **Reddit** — `reddit-search` Claude skill (search, posts, info commands)
- **HN Algolia** — `curl "https://hn.algolia.com/api/v1/search?query=QUERY&tags=story&numericFilters=points>10"`
- **GitHub** — star counts, trending, recent releases

## Signal quality bar (applies everywhere)

- Single source = nothing. Every claim needs 2-3 independent sources.
- Signals older than 2 months are dead weight.
- No engagement (likes, comments, upvotes) = noise.
- Author must have visible track record or signal is suspect.
- Screenshots must show the product ACTUALLY IN USE — terminal output, running UI, real workflow output. GitHub repo pages, HN threads, marketing homepages, and docs pages are NOT product screenshots. If you don't have a real product screenshot, don't add one.
- **NEVER trust the product's own website or promotional material as strong evidence.** Self-reported claims (official docs, launch posts, company blogs) may be referenced for factual details but MUST be marked `selfReported: true`. They do NOT count toward multi-source verification.
- Evidence on each skill is REQUIRED, not optional. Every skill ships with evidence or it doesn't ship.
- **EVERY external link MUST be verified as live before it's committed.** Use the appropriate API/tool for each platform (Twitter/X API for tweet URLs, fetch for web pages, etc.). Dead links are a critical failure — never reference a URL that hasn't been confirmed reachable.

Full rules in [specification.md](specification.md) and [agents/deep-dive.md](agents/deep-dive.md).

## Entities

- **Category** — narrow task category (e.g., Coding CLIs, Web Browsing, Software Factories)
- **Skill** — a specific tool/MCP server/agent that solves a category
- **Platform** — underlying platform a skill connects to (e.g., Figma, Browser, Terminal)
- **Bundle** — a full setup/stack that a known persona uses, referencing skills in our registry

## Current categories

- **Coding CLIs / Code Agents** — Claude Code, Aider, Continue, Codex CLI, Gemini CLI
- **Web Browsing / Browser Automation** — Browser Use, Stagehand, Playwright MCP
- **Product / Business Development** — Google Workspace MCP, Firecrawl, Exa
- **Teams of Agents / Software Factory** — OpenHands, Ralph Loop, SWE-agent
- **UX / UI** — Figma MCP, write-access challengers, design automation
- **Software Factories** — Devin, OpenHands, Factory, SWE-agent, Ralph Loop, Replit Agent
- **Search & News** — Exa, Tavily, Firecrawl, Jina Reader, Brave Search, SearXNG

## Tracked metrics per skill

- **GitHub stars** — collected via GitHub API (`scripts/collect-stars.mjs`)
- **Weekly downloads** — npm registry / PyPI stats (`scripts/collect-downloads.mjs`)
- **Social mentions** — HN Algolia 7-day counts (`scripts/collect-mentions.mjs`)
- **Evidence items** — [STRONG] / [MODERATE] tagged, multi-source verified

## Stack

- Next.js 16, Tailwind CSS v4, static generation
- Lato + IBM Plex Mono fonts
- Recharts for data visualizations
- Deployed on Vercel
- Research pipeline runs locally via `ralph.mjs`
