# Skillbench

## Change priority protocol

When told to change something, ALWAYS follow this order:
1. **Update human-steering-history.md** — log the decision as stated
2. **Update docs** (agents.md, specification.md, agent prompts) — reflect the new rule
3. **Make code changes** — implement in catalog.ts, components, pages

## What this is

Curated, evidence-backed buyer's guide for agent skills. Not a registry, not a marketplace. The core value is: narrow job categories, strong rankings, real citations, head-to-head comparisons.

The main user intent: **"What's the best skill for the thing I'm trying to do?"**

## Project structure

```
specification.md              ← Product spec, entities, evidence model, signal quality bar
competition.md                ← Landscape analysis, registries, benchmarks, gap analysis
human-steering-history.md     ← Design decision log

agents/                       ← Research pipeline agent prompts
  discover.md                 ← Find fresh signals, new contenders, shifting meta
  deep-dive.md                ← Build evidence base, trust tags, multi-source verification
  rank.md                     ← Editorial ranking per job
  qa.md                       ← Publish gate — links, signals, screenshots, claims

agent-runs/                   ← Research run outputs
  agents.md                   ← Run folder structure and findings template
  <timestamp>_<stage>_<scope>/
    findings.md               ← Written output
    assets/                   ← Screenshots, artifacts

src/                          ← Next.js application
  app/                        ← Pages (homepage, /categories/[slug], /skills/[slug], /bundles/[slug])
  lib/catalog.ts              ← Skill and job data (hardcoded, fed by pipeline)
  components/                 ← Shared UI components
```

## Research pipeline

```
Discover → Deep-Dive → Rank → QA → Publish
```

1. **Discover** — AGGRESSIVELY find ALL contenders using web search, Twitter/X API, Reddit API, HN Algolia, GitHub trending, and registry checks. Missing a key player is a critical failure.
2. **Deep-Dive** — build MEASURABLE evidence with inline artifacts, hard quality gates, and engagement metrics. Evidence not passing the bar gets DISCARDED. Deep-dive also contributes new finds.
3. **Rank** — editorial ranking per category. Top 3-4 recommended, rest below the cut line. Evidence-first, opinionated.
4. **QA** — block publish on dead links, weak signals, single-source claims, stale evidence.
5. **Publish** — build and deploy to Vercel.

Each agent prompt lives in `agents/<name>.md`. Each run writes to `agent-runs/`.

## Research tools

- **Web search** — broad queries, comparisons, "best X 2026"
- **Twitter/X API** — `python ~/projects/bra1ndump/skills/twitter-x/x.py search "QUERY" --top --count 50`
- **Reddit API** — `python ~/projects/bra1ndump/skills/reddit-search/reddit.py search "QUERY" --sort relevance --time month`
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

- **Category** (formerly "Job") — narrow task category (e.g., Coding CLIs, Web Browsing)
- **Skill** — a specific tool/MCP server/agent that solves a category
- **Platform** — underlying platform a skill connects to (e.g., Figma, Browser, Terminal)
- **Bundle** — a full setup/stack that a known persona uses, referencing skills in our registry. Tracks what popular/trending Twitter personas actually ship with.

## Current categories

- **Coding CLIs / Code Agents** — Claude Code, Aider, Continue, Cursor
- **Web Browsing / Browser Automation** — Browser Use, Stagehand, Playwright MCP
- **Product / Business Development** — Google Workspace MCP, Firecrawl, Exa
- **Teams of Agents / Software Factory** — OpenHands, Ralph Loop, SWE-agent
- **UX / UI** — Figma MCP, write-access challengers, design automation

## Stack

- Next.js 15+, Tailwind CSS v4, static generation
- Deployed on Vercel
- Research pipeline runs locally
