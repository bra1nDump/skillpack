# SkillPack Product Direction & Action Items

*Last updated: 2026-03-22*

## High-Level Direction

### Identity: Agentic Meta-Tracking Service
We are an **opinionated meta-tracking service** for everything related to agentic development, building assistants, and using assistants. The true value is in tracking the meta across each domain slice — this is non-trivial and requires a well-tuned pipeline and the starting point we already have. We're beyond just "skills" — we're also tracking personalities and their combinations of skills (e.g. Garry Tan's gstack from YC).

### Three CTAs (replace "Publish Your Skill" everywhere)
1. **Install our skill** — `npx skills add ...` — reviews your project and finds the best skills for it. Push this as the primary action. Use existing npx/skills.sh distribution, don't build our own CLI yet. This also gets us climbing the leaderboard on skills.sh.
2. **Subscribe to leaderboard shifts** — continuous value: get notified when something major changes in a domain you care about. This is also the newsletter play. More people will subscribe to updates than will submit skills (always more consumers than producers). Requires account creation.
3. **Star us on GitHub + submit skills via issues** — social proof growth AND skill submission channel. "Did we miss something? Create an issue on GitHub!" — this replaces the email route and PostHog approach for user submissions.

### Subscribe to Updates — Multiple Channels
When a major change happens in a domain, we notify subscribers. This is a better reason to collect emails than asking people to submit skills. The "subscribe to updates" screen should offer two options:
1. **Newsletter** — classic email subscription
2. **AI prompt** — give users a prompt they can send to OpenClaw / ChatGPT / whatever to check our CHANGELOG.md on the site. This is a novel distribution channel.

We also need a **CHANGELOG page** on the site — a log of major leaderboard shifts, new entries, significant re-rankings. This is interesting content on its own and feeds both the newsletter and the AI-prompt channel.

### Radical UI Simplification
Fewer screens, fewer components, more consistency. Every screen should use similar card components. Less maintenance, better look.

### Terminology Reframe: Problems & Solutions (not Categories & Skills)

**Categories → Problems.** Each "category" is really a **problem space**. The header on every problem page should lead with: **name + the exact problem it solves.** Not a description of the tools — a description of the pain. Route should be `/problems/` not `/categories/`.

**Skills → Solutions.** Each "skill" is really a **solution** to one or more problems. Route should be `/solutions/` not `/skills/`.

**Why this matters:**
- A solution can apply to **multiple problems** and be ranked differently in each. Notion is a top knowledge management solution but a mediocre project management one. Claude Code is a coding CLI solution AND an agent harness.
- Solutions can be **built on top of other solutions.** Notion MCP is built on Notion — they're related but distinct solutions solving different problems (AI-accessible knowledge vs. knowledge management itself).
- Framing around problems makes the value proposition instantly clear to visitors: "I have this problem, what's the best solution?"

**Bundles → Key Players / Innovators.** People and companies pushing full opinionated setups. Harder to rank than individual solutions, but extremely valuable to track — how is their AI adoption going? What are they switching to? This evolves the current "bundles" concept from a static snapshot of someone's stack into a living profile of how key players are adopting AI across multiple problem spaces.

**Example problem page headers:**
- **Coding** — "How do I write code with AI?" Today it's CLIs (Claude Code, Cursor), tomorrow it's Slack with coding agents talking to each other. The problem stays the same, solutions evolve.
- **Memory** — "How do agents remember context across sessions?"
- **Knowledge Management** — "How do I organize and retrieve team knowledge?" (Notion, Google Workspace — sounds unrelated to AI but these are the foundation MCP tools build on)
- **Agent Orchestration** — "How do I coordinate multi-step agent workflows?"

---

## Page-by-Page Feedback

### 1. Home Page (with sidebar)

**Navigation — retire most tabs:**
- **Remove Community tab** — doesn't make sense if we don't let people publish. Submissions go through GitHub issues instead.
- **Remove Bundles tab** — bundles should just be a category, something like "Top AI Influencers and Their Setups"
- **Remove Platforms tab** — comparison should live within categories implicitly
- **Remove Compare tab** — we already have implicit comparison within categories
- **Keep categories in sidebar** — these are fine. Maybe switch between them on left side.

**Hero/Product section:**
- The SkillPack product card should look exactly like any other skill card. "Learn More" shouldn't be special/different.
- Remove the Trust Score / Stars / Complexity / Downloads summary boxes entirely. Replace with a **"Subscribe to updates" CTA** explaining why you want to be subscribed (we deep-research the internet, track shifts, etc.). This IS the reason to subscribe.
- "Learn More" button doesn't look good and adds to the visual overload — not broken, just bad UX. Should be removed or made to look like any other skill card.

**Table / Leaderboard:**
- Rename "ALL SKILLS" → "Leaderboard" or "Agentic Leaderboard" or "SkillPack Leaderboard"
- **Remove Trending / New / All tabs** — just one list
- **Remove "All types" filter** — keep only categories filter
- Move search to right side (where category/type filters currently are)
- **Sort by SkillPack score** (not alphabetically!) — this is our key value. Currently looks alphabetical which is wrong.
- **Columns (exactly 3):**
  1. **Skill name + tags** — name and category tags
  2. **Why use this** — 2 lines, 5 words max per line. The single heavy hitter that says it all. Generated from our research.
  3. **Score** — single number, all the way on the right. No installs, no other metrics.
  - Remove everything else: Tier, Trust, Complexity, Updated, Installs columns
- On hover over a row, show similar detail to what we show on the skill detail page (first card component). Reuse the same component.
- The **top ticker line** should become part of the "subscribe to updates" CTA — scroll through recent changelog items from the past month instead of random classifications. Fix the jitter/flickering.

**Style issues:**
- Black header + black sidebar + white line on top looks strange
- Needs to work better on mobile
- Don't duplicate "Publish Your Skill" across multiple points on the site

### 2. Individual Skill Page

**Header/Card section:**
- Remove the stats boxes (Trust, Stars, Evidence, Repo Size) — nobody cares about number of evidence or repo size or star growth percentage
- Instead: put the **screenshot on the right side** of the product card
- Use simple labels instead of detailed stats: "trending", "recently downgraded in our ranking", etc.
- The editorial text and "editorial verdict" are essentially the same thing — consolidate
- Tags and brief info similar to what we show in the leaderboard table, just slightly more detailed

**Section reordering (top to bottom):**
1. **Product card** — name, editorial summary, tags, screenshot on right
2. **Where it wins / Where to be skeptical** — this is one of the best sections, move it way up
3. **How to get started** — short generated snippet based on our research (not "how to install", frame it as "best way to get started")
4. **Videos** — good job on these, keep them. Fresh data is the #1 important thing. Put under "get started"
5. **Related** — merge "Featured in Bundles" and "Similar Skills" into one "Related" section with a few links (including celebrities/influencers who use it)
6. **Public evidence** — push down

**Remove entirely:**
- Compare Scales section
- Repo Health section (nobody cares)
- GitHub stars over time graph (maybe keep, but low priority)
- Ranked signals in the card

### 3. Category + Ranking Page

- Category ranking cards are good overall
- Remove the ranked signals from within each card — keep it cleaner
- Cards should be more standardized — same component style as used elsewhere
- Long category descriptions push the agent list below the fold — consider removing or collapsing the text

---

## Action Items by Category

### Analytics
- Create new project on PostHog (in Tools account — Max should have access)
- Basic page navigation, default web dashboard, nothing fancy
- Send the link to team when done

### Pipeline Improvements
- **Missing sources:** Twitter/X is not integrated — need it as a research source
- **Missing tools in rankings:**
  - Cursor not in coding section (still one of the biggest)
  - OpenCode is present but ranked too low — extremely strange
  - Conductor is missing — also strange
- **AutoGen ranked first with trust 100 but it's in maintenance mode** — pipeline should flag maintenance mode as a red flag
- **Research demeanor:** Be very skeptical of newcomers, but big established players should be clear
- **Missing category: Personal assistants** — ChatGPT, Claude (Anthropic), Gemini, and now OpenClaw as contender. Big comparison area.
- **Missing category: Memory Systems** — vector DBs, context/memory management for agents (Mem0, Chroma, Pinecone, Weaviate, LangMem)
- **Missing category: Performance** — profiling, benchmarking, speed optimization tools for AI/agent workloads
- **Missing category: Analytics / LLM Tracing** — observability and tracing for LLM calls and agent runs. PostHog (top pick), Braintrust. Also: LangSmith, Helicone, Arize Phoenix, Weights & Biases
- **Missing category: Web Development / UI Frameworks** — frontend frameworks and component libraries for building AI-powered UIs (Vercel AI SDK, Streamlit, Gradio, v0, Bolt, Lovable)
- **Missing category: Agent Harnesses** — frameworks for orchestrating and running agents. Minor overlap with coding CLIs but distinct focus. Candidates: pi.exe, Pydantic AI, LangChain, LangGraph, CrewAI, OpenAI Agents SDK, Claude Agent SDK
- **Missing category: Knowledge Management** — organizing and retrieving team knowledge. Notion, Google Workspace, Obsidian. Sounds unrelated to AI but these are the foundations MCP tools build on — the underlying solutions that AI-accessible layers sit on top of
- **Missing category: AI Adoption / Best Practices** — "How do I adopt AI effectively?" Meta-tracking, best practices, ecosystem navigation. SkillBench itself lives in this category. This is our own problem space.
- **Category audit via external registries** — cross-reference our categories against awesome lists (awesome-mcp, awesome-ai-agents, awesome-llm-apps), official plugin directories (skills.sh, mcpservers.org), and other tool registries to identify category gaps
- Trust scores generally feel too low — even large projects like VIBMA show as weak. Needs tuning.
- Methodology should be visible on the site — tooltips on hover linking to explanation of how scores are calculated. Good for users AND for search indexing AND for reviewing to generate pipeline ideas.

### UI & Design
- Standardize card components across all pages (leaderboard row, skill detail card, category card — all similar)
- Repurpose top ticker line → scroll through recent changelog items (past month), tie into "subscribe to updates" CTA. Fix jitter.
- Fix black header + black sidebar + white line visual clash
- Mobile responsiveness improvements
- Remove all "Publish Your Skill" buttons/CTAs — replace with the three CTAs above
- Simplify columns in leaderboard table
- Sort leaderboard by SkillPack score
- SkillPack's own card should look like any other skill card

### Growth & Distribution
- **Keep repo on bra1nDump** — not moving to a separate org
- Make our skill show up on skills.sh — and test it: does it actually work?
- Figure out how to encourage GitHub stars
- Plan for recruiting verified reviewers / active community members
- When redirecting users to install Codex/Claude, include a SkillPack reference so users discover the platform

### Publishing / Submission Flow (simplified)
- User submissions go through **GitHub issues** — "Did we miss something? Create an issue!" No email route, no PostHog tracking for this.
- Don't build anything complex — just direct people to create an issue. That's it.

### Content & Branding
- /start is the **SkillPack skill itself** — treated as a special route (not a generic landing page). Main page (/) stays as rankings/browse.
- "Publish" button should be red with explicit CTA text (Max's feedback) — but we're changing CTAs anyway
- Reduce number of agent photos; drop unreferenced images in public/screenshots/candidates
- **Add CHANGELOG page** — log of major leaderboard shifts, new entries, significant re-rankings. Feeds the ticker, the newsletter, and the AI-prompt channel. Another page worth watching on its own.

### Team Availability
- Max is mostly unavailable Mon–Thu this week (week of 2026-03-23)
