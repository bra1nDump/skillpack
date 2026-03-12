import { categoryList, skillList } from "./catalog";
import { parseStars } from "./parse-stars";

import type { CategorySlug } from "./catalog";

export type CompareSkill = {
  slug: string;
  name: string;
  stars: number;
  starsDisplay: string;
  evidenceCount: number;
  strongEvidence: number;
  official: boolean;
  status: string;
  categories: Array<{
    slug: CategorySlug;
    name: string;
    rank: number;
    total: number;
  }>;
};

export const compareSkills: CompareSkill[] = skillList.map((skill) => {
  const categories = categoryList
    .filter((c) => skill.relatedCategories.includes(c.slug))
    .map((c) => {
      const entry = c.ranking.find((r) => r.skillSlug === skill.slug);

      return {
        slug: c.slug,
        name: c.name,
        rank: entry ? parseInt(entry.rank, 10) : 0,
        total: c.ranking.length,
      };
    })
    .filter((c) => c.rank > 0);

  return {
    slug: skill.slug,
    name: skill.name,
    stars: parseStars(skill.githubStars),
    starsDisplay: skill.githubStars ?? "—",
    evidenceCount: skill.evidence.length,
    strongEvidence: skill.evidence.filter((e) => e.quality === "strong").length,
    official: skill.official,
    status: skill.status,
    categories,
  };
});
