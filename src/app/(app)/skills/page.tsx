import { DarkCTA } from "@/components/dark-cta";
import { DarkPageHeader } from "@/components/dark-page-header";
import { SkillsList } from "@/components/skills-list";
import { categoryList, skillList } from "@/lib/catalog";
import { getScreenshotUrl } from "@/lib/screenshots";
import { computeTrend } from "@/lib/trend";
import { computeTrustScore } from "@/lib/trust-score";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Skills — Skillbench",
  description:
    "Browse all tracked agent skills with editorial verdicts, source links, and related categories.",
};

export default function SkillsIndexPage() {
  const items = skillList.map((skill) => ({
    slug: skill.slug,
    name: skill.name,
    repo: skill.repo,
    status: skill.status,
    official: skill.official,
    githubStars: skill.githubStars,
    evidenceCount: skill.evidence.length,
    verdict: skill.verdict,
    trustScore: computeTrustScore(skill),
    starsTrend: computeTrend(skill.metrics?.stars),
    screenshotUrl: getScreenshotUrl(skill.slug),
    categories: categoryList
      .filter((j) => skill.relatedCategories.includes(j.slug))
      .map((j) => ({ slug: j.slug, name: j.name })),
  }));

  return (
    <>
      <DarkPageHeader
        title="All Skills"
        subtitle={`${skillList.length} skills tracked across ${categoryList.length} categories. Each with an editorial verdict, source links, and evidence.`}
        stats={[
          { label: "Skills", value: String(skillList.length) },
          { label: "Categories", value: String(categoryList.length) },
        ]}
      />
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        <SkillsList skills={items} />
      </main>
      <DarkCTA
        title="Know a skill we're missing?"
        subtitle="Submit evidence and we'll run the full research pipeline."
        buttonText="SUBMIT →"
        buttonHref="/docs/agents"
        variant="ghost"
      />
    </>
  );
}
