import { DarkHero } from "@/components/dark-hero";
import { LiveFeedTicker } from "@/components/live-feed-ticker";
import { MeasureStrip } from "@/components/measure-strip";
import { SkillCatalog } from "@/components/skill-catalog";
import { skillList } from "@/lib/catalog";
import { computeTrustScore } from "@/lib/trust-score";

import type { FeedEvent } from "@/components/live-feed-ticker";
import type { SkillRowData } from "@/components/skill-row";

// Map all skills to SkillRowData for the catalog
const catalogSkills: SkillRowData[] = skillList.map((skill) => {
  const lastDl = skill.metrics?.downloads?.at(-1)?.value;

  return {
    slug: skill.slug,
    name: skill.name,
    repo: skill.repo,
    skillType: skill.skillType,
    skillTier: skill.skillTier,
    complexity: skill.complexity,
    freshnessDays: skill.repoHealth?.lastPushDays,
    installs: lastDl,
    daysOld: skill.daysOld,
    weekGrowth: skill.weekGrowth,
    tags: skill.tags,
    trustScore: computeTrustScore(skill),
  };
});

// Build live feed from real data
function buildFeedEvents(): FeedEvent[] {
  const events: FeedEvent[] = [];

  // Recently updated repos
  const recentlyPushed = skillList
    .filter((s) => s.repoHealth?.lastPushDays != null && s.repoHealth.lastPushDays <= 7)
    .sort((a, b) => (a.repoHealth!.lastPushDays) - (b.repoHealth!.lastPushDays))
    .slice(0, 8);

  for (const s of recentlyPushed) {
    const days = s.repoHealth!.lastPushDays;

    events.push({
      skill: s.name,
      event: "updated",
      detail: `pushed ${days === 0 ? "today" : `${days}d ago`}`,
      time: days === 0 ? "today" : `${days}d`,
    });
  }

  // Classified skills (have type + tier)
  const classified = skillList
    .filter((s) => s.skillType && s.skillTier)
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  for (const s of classified) {
    events.push({
      skill: s.name,
      event: "classified",
      detail: `${s.skillType} × ${s.skillTier}`,
      time: "",
    });
  }

  // Trending (positive weekGrowth)
  const trending = skillList
    .filter((s) => s.weekGrowth != null && s.weekGrowth > 0.05)
    .sort((a, b) => (b.weekGrowth ?? 0) - (a.weekGrowth ?? 0))
    .slice(0, 4);

  for (const s of trending) {
    events.push({
      skill: s.name,
      event: "trending",
      detail: `★ +${((s.weekGrowth ?? 0) * 100).toFixed(0)}%`,
      time: "",
    });
  }

  // New skills (recently created repos)
  const newSkills = skillList
    .filter((s) => s.daysOld != null && s.daysOld <= 60)
    .sort((a, b) => (a.daysOld ?? 999) - (b.daysOld ?? 999))
    .slice(0, 4);

  for (const s of newSkills) {
    events.push({
      skill: s.name,
      event: "new",
      detail: `${s.daysOld}d old`,
      time: "",
    });
  }

  // Shuffle to mix event types
  return events.sort(() => Math.random() - 0.5);
}

const feedEvents = buildFeedEvents();

export default function Home() {
  return (
    <>
      <LiveFeedTicker events={feedEvents} />
      <DarkHero />
      <MeasureStrip />
      <SkillCatalog skills={catalogSkills} />
    </>
  );
}
