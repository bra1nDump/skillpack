# Competition & Landscape

## Skill Directories / Registries

### skills.sh
- **URL**: https://skills.sh
- **What**: "The Open Agent Skills Ecosystem" — largest skill directory
- **Install**: `npx skillsadd <owner/repo>`
- **Features**: Leaderboard (All Time / Trending 24h / Hot), search, security audits (GEN, SOCKET, SNYK)
- **Supports**: Claude Code, Cursor, Cline, GitHub Copilot, Gemini, 20+ agents
- **Top skill**: `find-skills` at 462K installs — a meta-skill to discover other skills
- **Strength**: Volume, install counts, audit infrastructure
- **Weakness**: No quality curation, no comparisons, no benchmarks — pure registry

### MCPMarket
- **URL**: https://mcpmarket.com
- **What**: MCP server directory — connects AI agents with external tools
- **Features**: Categorized directory (20+ categories: Dev Tools, API Dev, Data Science, Productivity, DevOps, Analytics, Security, etc.)
- **Integrations**: GitHub, Playwright, Figma, databases, cloud infra, social media, e-commerce
- **Strength**: Broad MCP coverage, good categorization
- **Weakness**: MCP-only (no skills/plugins), no quality signal, no comparisons

### ClawHub (OpenClaw)
- **URL**: https://docs.openclaw.ai/tools/clawhub
- **What**: Public skill registry for OpenClaw — discover, share, and manage reusable skill bundles
- **Install**: Skill bundles = folders with `SKILL.md` + supporting files, zip downloads per version
- **Features**: Embeddings-powered semantic search (not just keywords), tags, stars, comments, semantic versioning with changelogs
- **Safety**: GitHub account age gate (1 week min to publish), community reporting (auto-hide after 3+ reports), moderator tools
- **Strength**: Versioned skill bundles with metadata, semantic search, governance model
- **Weakness**: Tied to OpenClaw ecosystem, no cross-agent support, no benchmarking

### Other registries
- **LobeHub Skills**: https://lobehub.com/skills — large registry, less opinionated
- **PulseMCP**: https://www.pulsemcp.com/servers — 8590+ MCP servers, updated daily
- **mcpservers.org**: https://mcpservers.org — "Awesome MCP Servers" directory
- **mcp.so**: https://mcp.so — another MCP directory
- **awesome-claude-skills**: https://github.com/travisvn/awesome-claude-skills — curated GitHub list

### Official / Platform-owned
- **Claude Code Plugin Marketplace**: Built into Claude Code via `/plugin`. Official (`claude-plugins-official`) + demo (`anthropics/claude-code`) marketplaces
- **Vercel Skills**: Runs skills.sh — `npx skillsadd vercel-labs/skills/find-skills`
- **Cline MCP Marketplace**: https://github.com/cline/mcp-marketplace — official Cline MCP registry

---

## Benchmarks / Arenas (Visual Output Comparison)

### WebDev Arena (LMArena)
- **URL**: https://web.lmarena.ai
- **What**: Users submit a prompt, two LLMs generate web apps side-by-side, community votes on the winner
- **Method**: Bradley-Terry / Elo scoring. Models prompted as "expert frontend React engineer + great UI/UX designer" using React + TypeScript + Tailwind
- **Strength**: Live, crowdsourced, blind voting eliminates brand bias
- **Weakness**: Compares raw models, not skills/plugins. No feed or gallery of past outputs

### Design Arena (Arcada Labs, YC S25)
- **URL**: https://www.designarena.ai
- **What**: Crowdsourced benchmark for AI-generated design — websites, UI components, logos, images, video, audio, data viz
- **Method**: 4 models from active pool, anonymous side-by-side, Elo-based ranking, real-time leaderboard
- **Strength**: Broadest scope (not just web), real-time updates, closest to a "feed" experience
- **Weakness**: Still compares models/tools, not skills. No skill-layer benchmarking

### Manus.im Comparison
- **URL**: https://manus.im/blog/best-landing-page-generator
- **What**: Tested 7 AI landing page generators with the exact same prompt ("QuillSpark AI writing assistant")
- **Method**: Static blog post with visual screenshots of each output
- **Strength**: Apples-to-apples comparison, same prompt across all tools
- **Weakness**: One-time article, not a live feed

### Aider Polyglot Benchmark
- **URL**: https://aider.chat/docs/leaderboards
- **What**: 225 hard coding problems across 6 languages. Not visual, but the gold standard for coding benchmarks
- **Relevant because**: Proves the continuously-refreshed leaderboard model works for dev tools

---

## Gap Analysis — Where Skillbench Fits

Nobody is doing:

1. **Skill-layer benchmarking** — comparing the same task with skill A vs skill B vs no skill
2. **Opinionated curation** — "here are the 20 skills that actually matter" instead of 8000+ entries
3. **Trajectory tracking** — is this skill gaining traction or dying? Twitter mentions over time, YouTube demos
4. **Inline social proof** — embedded tweets and videos showing real people using the skill
5. **Side-by-side skill output comparison** — "here's what Claude + frontend-design skill produces vs Claude + custom-tailwind-skill vs raw Claude"
6. **Background agent-driven updates** — an agent that continuously re-runs benchmarks and commits results

The arenas compare models. The registries list skills. Nobody compares skill quality with evidence.
