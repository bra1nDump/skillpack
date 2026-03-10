# Skillbench Specification

## Product Summary

Skillbench is a curated website for finding the best skill, platform, or native capability for a specific agent job to be done.

The product is not a broad marketplace and not a generic registry mirror. The core value is:

- narrow, useful categories
- strong ranking and comparison
- evidence-backed recommendations
- real citations to people comparing tools in public

The main user intent is:

> "What's the best skill for the thing I'm trying to do?"

The site should answer that quickly, explain why, and show the strongest alternatives in the same category.

## V1 Scope

V1 is a research and comparison product, not a live benchmark lab.

We will not initially run the skills ourselves in a formal benchmark harness. Instead, we will:

- collect public evidence
- collect pairwise comparisons
- collect examples of real people using the skills
- collect official posts, blog posts, Reddit threads, and X/Twitter posts
- rank skills and platforms based on evidence quality and relevance

Later, the system may run local benchmarks, but that is not required for the initial version.

## Core Principles

- Flat browsing experience, not a deep directory maze
- Opinionated recommendations, not neutral listing
- Comparisons first
- Evidence first
- Minimal number of page types
- Static website, rebuilt locally on a schedule

## Core Entities

There are five first-class entities:

### 1. Category (formerly "Job")

What the user wants to do. A narrow task category.

Examples:

- Web browsing
- Web form automation
- Google Docs reading
- Notion reading
- Task tracking
- Browser testing
- iOS simulator control
- Xcode builds
- Coding CLIs

### 2. Platform

The underlying product, environment, or native capability used to solve the job.

Examples:

- Google Docs
- Notion
- Linear
- GitHub Issues
- Browser Use
- Playwright
- Puppeteer
- Claude Code native browser
- Cursor native support

Important: a platform may solve the job natively without a separate skill.

### 3. Skill

A specific skill, package, repo, integration, or workflow used on top of a platform.

### 4. Source

A citation that provides evidence.

### 5. Bundle

A full setup/stack from a known persona. Bundles track what popular/trending builders actually ship with day to day, referencing skills in our registry.

Examples:

- Karpathy's coding stack (Claude Code + Cursor)
- swyx's agent stack (Claude Code + Firecrawl + Browser Use)

Examples:

- X/Twitter post
- Reddit thread
- blog post
- official documentation
- release note
- demo video

## Taxonomy

The data model is tiered:

```text
Job
  -> Platform
    -> Skill
```

The browsing experience should still feel flat. Users should mostly start at the homepage, then go to a job page, and only drill down if needed.

This structure solves the case where multiple platforms can address the same job.

Example:

```text
Task Tracking
  -> Linear
    -> Skill A
    -> Skill B
  -> Notion
    -> Skill C
  -> GitHub Issues
    -> Native support
    -> Skill D
```

## Page Types

V1 should have only four page types:

### 1. Homepage

Primary goals:

- show core jobs
- show top current recommendations
- show recent changes
- surface strong evidence and comparisons

### 2. Job Page

This is the main product surface.

A job page should include:

- ranked options
- comparison table
- short explanation of the ranking
- supporting evidence
- related platforms and related jobs

### 3. Platform Page

A platform page answers:

- how good this platform is for agent usage
- whether native support is enough
- which skills on top of it are best

### 4. Skill Page

A skill page answers:

- what this skill is good for
- how it ranks inside its platform or job
- what evidence supports it
- what better alternatives exist

## Homepage Structure

The homepage should be simple and editorial.

Suggested sections:

- search bar
- core jobs
- best right now
- what changed
- evidence feed

The homepage is not meant to be exhaustive. It should route users into narrow jobs quickly.

## Ranking Model

The site should rank options clearly rather than presenting them as an unordered directory.

Ranking should happen at two levels:

- within a job
- within a platform

The output should be a clear ranked table, not a vague prose-only recommendation.

We do not need a single universal score across the whole site. Ranking is context-specific.

## Comparison Model

Comparison is the core product behavior.

We especially care about:

- pairwise comparisons between skills
- pairwise comparisons between platforms
- public posts where someone explicitly says one option is better than another

Strong comparison evidence includes:

- "X is better than Y for this workflow"
- "I switched from X to Y because..."
- "Y is now outdated"
- "X is official, but Y is more capable"

## Status Model

Each skill or platform should have a status:

- `active`
- `watch`
- `archived`

### Active

Currently relevant and should appear in default tables.

### Watch

Possibly relevant, but uncertain, stale, or not yet sufficiently evidenced.

### Archived

Dead, superseded, stale, or clearly outperformed.

Archived items should not appear in default comparisons, but they should still have their own page and a visible reason for archival.

## Evidence Model

We want public citations and backlinks, not unsupported claims.

Evidence sources can include:

- official docs
- release notes
- maintainer posts
- blog posts
- X/Twitter posts
- Reddit threads
- YouTube videos

We especially want sources where people:

- tried the skill
- compared it against another option
- showed output
- explained tradeoffs

## Source Credibility

Sources should be weighted by signal quality.

Suggested tiers:

### Tier 1: Official

- official docs
- official repos
- official release notes
- creator posts

### Tier 2: Expert

- respected practitioners
- credible researchers
- detailed technical blog posts
- known builders in the space

### Tier 3: Community

- Reddit threads
- community X/Twitter posts
- forum discussion

### Tier 4: Weak — DISCARD by default

- low-effort SEO pages
- shallow reposts
- generic AI-generated summaries
- HN threads with fewer than 10 points or fewer than 5 substantive comments
- drive-by opinions without specifics ("honestly easier with X" with no supporting detail)
- isolated praise without comparison or usage evidence

Tier 4 signals should almost never appear in the product. If one is included, it must have an explicit justification for why it is still useful despite being weak.

### Signal quality minimum bar

Every signal shipped in the product must meet ALL of these:

1. **Traction**: visible community engagement (upvotes, replies, stars, retweets). A 2-comment HN thread is not a signal.
2. **Substance**: a specific claim, comparison, experience report, or demonstrated output. Generic sentiment is not enough.
3. **Attribution**: who said it matters. Maintainers and known builders outweigh anonymous drive-by comments.
4. **Freshness**: signals older than 2 months are dead weight — cut them. If a tool is truly a leader, it will have fresh mentions and fresh comparisons. Do not grandfather stale signals just because they were once relevant.
5. **Visual proof**: screenshots must show the product in use, not homepages or landing pages.
6. **Multiple independent sources required for ALL claims**: a single source is worth nothing. Every claim shipped in the product — verdict, strength, weakness, comparison, capability statement — must be backed by at least 2-3 independent sources. Single-source claims are hypotheses at best. Label them as unverified or cut them.
7. **Engagement floor**: if the source has few likes, few comments, few upvotes — it is not a signal. A blog post with zero comments, an HN thread with 2 replies, a tweet with no engagement — all noise. The public must have visibly reacted for it to count.
8. **Author reputation**: if the author has no visible track record — no public projects, no history in the space, no reputation — the signal is suspect. Weight maintainers, known builders, and people with public work 10x over anonymous or low-profile commenters.

When in doubt, cut the signal. Three strong signals beat eight weak ones.

### Promotional Material Rule

NEVER trust the product's own website, blog, or company review as strong evidence. Self-reported claims (official docs, launch posts, company blogs about their own product) may be referenced for factual details (feature lists, pricing, benchmarks they claim) but MUST be clearly marked as `selfReported`. They do NOT count toward multi-source verification. "Company X says their product is great" is noise. "Independent reviewer Y says X is great" is signal.

We should also classify evidence type:

- direct use
- comparison
- announcement
- tutorial
- complaint
- opinion

## Discovery and Research Pipeline

The content pipeline should run locally on the machine, not on a hosted server.

This pipeline has four stages:

### 1. Discover

Goal:

- detect new or newly relevant skills, platforms, and discussions

Inputs:

- top entries from skill registries
- web search
- X/Twitter search
- Reddit search
- recent posts from the last day or week

Important:

- we should not rely only on a fixed list of tracked accounts
- search should be freshness-based and topic-based
- we care more about top or hot items than exhaustive coverage

Typical discovery triggers:

- new skill appears in top registry results
- a known skill gets a major update
- recent public comparisons appear
- recent discussion suggests a skill is now hot or obsolete

### 2. Deep Dive

Goal:

- gather structured evidence for a job, platform, or skill

Tasks:

- collect official references
- collect credible public commentary
- collect pairwise comparisons
- collect examples and quotes
- collect reasons people prefer one option over another

Deep dive should happen for:

- all items initially
- later, only triggered items or stale pages

### 3. Rank

Goal:

- update rankings and statuses

Tasks:

- rank skills inside each platform
- rank platforms inside each job
- assign `active`, `watch`, or `archived`
- update short verdicts
- update which items appear in default comparison tables

### 4. Publish

Goal:

- regenerate the website

Tasks:

- update homepage
- update job pages
- update platform pages
- update skill pages

## Content Format

Content should live in Markdown with frontmatter.

Reasons:

- easy to edit manually
- easy for agents to generate
- easy to render statically
- good fit for research-heavy pages

Frontmatter should be type-checked.

Recommended approach:

- Markdown files for jobs, platforms, skills, and sources
- TypeScript schemas with Zod for validation

We should avoid introducing extra YAML files where a Markdown document is enough.

## Search

Search should be very simple in V1.

Requirements:

- client-side only
- no backend search service
- no vector database
- basic string similarity / keyword matching

This is enough for initial navigation.

## Design Direction

The site should feel sharp and editorial, not like a generic docs template.

Principles:

- strong typography
- intentional contrast
- minimal but expressive layout
- hover states that reveal useful comparison details
- evidence and ranking should be visually prominent

We should avoid generic AI-generated landing page aesthetics.

## Stack Choice

Chosen stack:

- Next.js
- Tailwind CSS v4
- shadcn/ui

Reasoning:

- strongest tool support across coding agents
- best generation quality from modern AI coding tools
- easy static-friendly content site
- good fit for a custom editorial UI

We are not using a monorepo for now.

V1 will be a single Next.js application.

## Publishing Infrastructure

Chosen deployment target:

- Vercel

Reasoning:

- best default fit for Next.js
- simplest deployment path
- easy preview deployments
- enough for a static-first content product

The research and content generation pipeline still runs locally. Vercel is only for publishing the built site.

## Initial Open Questions

These are still open and can be refined after the first real category pages:

- which initial jobs should appear on the homepage
- how much detail should appear directly on the homepage versus job pages
- whether platform pages should be fully first-class in navigation or mostly supporting pages
- how much of the source material should be embedded inline versus linked out
- how we visually show a pairwise comparison without making tables too heavy

## V1 Success Criteria

V1 is successful if a user can:

- land on the homepage
- identify their job quickly
- see the best options ranked
- understand why the top option wins
- inspect real public evidence
- navigate to a narrower platform or skill page if needed

The website should feel useful even before formal local benchmarks exist.
