# Skillbench

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
  app/                        ← Pages (homepage, /jobs/[slug], /skills/[slug])
  lib/catalog.ts              ← Skill and job data (hardcoded, fed by pipeline)
  components/                 ← Shared UI components
```

## Research pipeline

```
Discover → Deep-Dive → Rank → QA → Publish
```

1. **Discover** — find what is newly relevant, hot, or compared. 7-day then 30-day window.
2. **Deep-Dive** — build evidence with multi-source verification, trust tags, signal quality gate.
3. **Rank** — editorial ranking per job. Evidence-first, not opinion-first.
4. **QA** — block publish on dead links, weak signals, single-source claims, stale evidence.
5. **Publish** — build and deploy to Vercel.

Each agent prompt lives in `agents/<name>.md`. Each run writes to `agent-runs/`.

## Signal quality bar (applies everywhere)

- Single source = nothing. Every claim needs 2-3 independent sources.
- Signals older than 2 months are dead weight.
- No engagement (likes, comments, upvotes) = noise.
- Author must have visible track record or signal is suspect.
- Screenshots must show the product in use, not homepages.

Full rules in [specification.md](specification.md) and [agents/deep-dive.md](agents/deep-dive.md).

## Current job categories

- **UX / UI** — Figma MCP, write-access challengers, design automation
- **Product / Business Development** — Google Workspace MCP, Firecrawl, Exa
- **Teams of Agents / Software Factory** — OpenHands, Ralph Loop, SWE-agent

## Stack

- Next.js 15+, Tailwind CSS v4, static generation
- Deployed on Vercel
- Research pipeline runs locally
