# Future Metrics — Requires Backend

These SkillPack metrics are defined in the data model (`SkillRecord` in `src/lib/catalog.ts`) but cannot be collected without a backend service. They are currently hidden from the UI.

## Fields already in SkillRecord (optional, unused)

### `rating` (number, 1-5)
Community average score from user reviews. Requires:
- User authentication (GitHub OAuth or similar)
- Database to store ratings per user per skill
- API endpoint: POST /api/skills/:slug/rate
- Aggregation: weighted average, min 3 ratings to display

### `reviewCount` (number)
Total number of user reviews. Derived from rating submissions.

### `retention` (number, 0-100)
Percentage of users who still have the skill installed after 30 days. Requires:
- Install tracking (telemetry from Claude Code plugin)
- Uninstall tracking
- Time-series storage for install/uninstall events
- Computation: (users who installed 30+ days ago AND still have it) / (users who installed 30+ days ago)

### `usage` (number, invocations/week)
How often the skill fires across all users. Requires:
- Claude Code session telemetry
- Invocation event tracking (skill triggered, manual vs auto)
- Weekly aggregation pipeline

## Tabs that need these fields

### "Top Rated" tab
Sorts by `rating` descending. Will be added to the catalog when `rating` data exists.

### "Underrated" tab
Filters: `rating >= 4.5 AND installs < threshold`. Hidden gems — high quality but low discovery.

## UI components ready but hidden

- `RetentionBar` (`src/components/retention-bar.tsx`) — mini progress bar with color coding
- Rating stars display was in `SkillRow` but removed pending real data

## What we CAN collect now (already implemented)

| Field | Source | Script |
|-------|--------|--------|
| `trustScore` | Computed from freshness, community, adoption, evidence | `src/lib/trust-score.ts` |
| `weekGrowth` | Delta between last 2 star data points | `scripts/collect-skillpack-fields.mjs` |
| `daysOld` | GitHub API `created_at` | `scripts/collect-skillpack-fields.mjs` |
| `complexity` | GitHub API language breakdown (heuristic) | `scripts/collect-skillpack-fields.mjs` |
| `tags` | Extracted from summary + category | `scripts/collect-skillpack-fields.mjs` |
| `skillType` | LLM classification (Expertise/Generator/Guardian/Connector) | `scripts/classify-skills.mjs` |
| `skillTier` | LLM classification (Atomic/Composite/Orchestrator/Pack) | `scripts/classify-skills.mjs` |
