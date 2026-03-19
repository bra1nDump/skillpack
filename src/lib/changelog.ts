import { skillList } from "./catalog";
import { parseStars } from "./parse-stars";
import { computeTrustScore } from "./trust-score";

export type ChangelogItem = {
  slug: string;
  name: string;
  type: "stars-growth" | "downloads-growth";
  detail: string;
  trustScore: number;
  delta: number;
};

export function getTopMovers(limit = 3): ChangelogItem[] {
  const items: ChangelogItem[] = [];

  for (const skill of skillList) {
    const stars = skill.metrics?.stars;

    if (stars && stars.length >= 2) {
      const prev = stars[stars.length - 2].value;
      const latest = stars[stars.length - 1].value;
      const delta = latest - prev;

      if (delta > 0) {
        items.push({
          slug: skill.slug,
          name: skill.name,
          type: "stars-growth",
          detail: `+${delta.toLocaleString()} stars`,
          trustScore: computeTrustScore(skill),
          delta,
        });
      }
    }
  }

  return items
    .sort((a, b) => b.delta - a.delta)
    .slice(0, limit);
}

export function getDownloadMovers(limit = 3): ChangelogItem[] {
  const items: ChangelogItem[] = [];

  for (const skill of skillList) {
    const dl = skill.metrics?.downloads;

    if (dl && dl.length >= 2) {
      const prev = dl[dl.length - 2].value;
      const latest = dl[dl.length - 1].value;
      const delta = latest - prev;

      if (delta > 0 && prev > 0) {
        const pct = Math.round((delta / prev) * 100);

        items.push({
          slug: skill.slug,
          name: skill.name,
          type: "downloads-growth",
          detail: `+${pct}% downloads`,
          trustScore: computeTrustScore(skill),
          delta: pct,
        });
      }
    }
  }

  return items
    .sort((a, b) => b.delta - a.delta)
    .slice(0, limit);
}
