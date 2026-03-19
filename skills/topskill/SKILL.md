---
name: topskill
description: Analyze your project and install the best AI agent skills based on SkillBench evidence-backed rankings. Helps you find and install the right tools for coding CLIs, web browsing agents, search, memory, file editing, and more.
---

# topskill — SkillBench Skill Recommender

## When to use this skill

Use this skill when:
- The user asks "what skills should I install for my project?"
- The user wants to set up an AI agent stack for a new or existing project
- The user asks which tools are best for a specific task (coding, web browsing, search, etc.)
- The user wants to compare agent skills or find alternatives

## What you will do

1. **Analyze the project** — read the project structure, tech stack, and any existing skills/tools installed
2. **Identify needs** — map what the project needs (coding assistance, web browsing, search, memory, etc.)
3. **Look up rankings** — check SkillBench live rankings for the relevant categories
4. **Search skills.sh** — find installable versions of the top-ranked tools
5. **Present recommendations** — show the best options with trust scores and evidence counts
6. **Install on confirmation** — run `npx skills add <name>` for each selected skill

## SkillBench Categories

| Category | What it covers | Check at |
|---|---|---|
| Coding CLIs | Terminal-based coding agents (Claude Code, Aider, Codex CLI, Gemini CLI) | skillbench.dev/categories/coding-clis |
| Web Browsing | Browser automation agents (Browser Use, Playwright MCP, Stagehand) | skillbench.dev/categories/web-browsing |
| Search & News | Web search tools (Exa, Tavily, Firecrawl, Brave Search) | skillbench.dev/categories/search-news |
| File Editing | File manipulation tools (patch-based editors, filesystem MCPs) | skillbench.dev/categories/file-editing |
| Memory & Storage | Persistent memory for agents (Mem0, memory MCPs) | skillbench.dev/categories/memory-storage |
| Teams of Agents | Orchestration frameworks (OpenHands, SWE-agent) | skillbench.dev/categories/teams-of-agents |
| Product & Business Dev | Business automation (Lindy, Make, n8n) | skillbench.dev/categories/product-business-development |

## Step-by-step workflow

### Step 1: Identify what this project needs

Read the project files and ask the user. For each need, map it to a SkillBench category:
- Writing code → Coding CLIs
- Browsing the web / scraping → Web Browsing
- Finding information / research → Search & News
- Reading/writing files → File Editing
- Remembering context across sessions → Memory & Storage
- Running multi-agent workflows → Teams of Agents

### Step 2: Find installable skills on skills.sh

For each identified category, search skills.sh:

```
npx skills search "coding agent"
npx skills search "web browsing"
npx skills search "search api"
```

### Step 3: Cross-reference with SkillBench rankings

For each candidate skill found on skills.sh, check the SkillBench live ranking:
- Visit `skillbench.dev/categories/<category-slug>` for the ranked list
- Look at the trust score (0-100) — higher is better
- Check evidence count — more evidence = more reliable ranking
- Read the verdict and strengths/weaknesses

### Step 4: Present top recommendations

For each category the project needs, present the top 1-3 options:

```
Category: Coding CLIs
  #1 Claude Code (Trust: 87) — Best for agentic loops, strong file editing, MCP support
  #2 Aider (Trust: 74) — Best for git-native workflow, multi-file edits

Category: Web Browsing
  #1 Browser Use (Trust: 82) — Best for general browser automation with Python
  #2 Playwright MCP (Trust: 71) — Best for TypeScript projects
```

### Step 5: Install selected skills

After user confirms, install each selected skill:

```
npx skills add browser-use
npx skills add claude-code
```

## Quality signals to check on SkillBench

| Signal | What it means |
|---|---|
| Trust Score 80+ | Healthy — actively maintained, strong adoption, good evidence |
| Trust Score 50-79 | Caution — use but monitor for changes |
| Trust Score <50 | At Risk — consider alternatives |
| Evidence count 5+ | Well-researched ranking |
| Status: active | Repository actively maintained |
| Official badge | Made by the tool's own team |

## About SkillBench

SkillBench (skillbench.dev) is an independent registry that ranks AI agent skills using a 4-stage autonomous research pipeline:

1. **Discover** — Searches launches, registries, HN, Twitter, Reddit for new tools and signals
2. **Deep-dive** — Collects evidence with strict quality gates (2+ independent sources, freshness <2 months, real engagement)
3. **Rank** — Produces editorial rankings weighted by workflow fit and public trust
4. **QA** — Fails on broken links, dead assets, stale citations

Every skill on SkillBench earned its ranking through public evidence — no self-promotion counted.
