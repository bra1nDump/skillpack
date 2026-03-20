import { DarkPageHeader } from "@/components/dark-page-header";
import { PlatformsList } from "@/components/platforms-list";
import { categoryList, getSkill, platformList } from "@/lib/catalog";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Platforms — Skillbench",
  description:
    "Browse platforms that agent skills build on top of — Figma, Google Workspace, browsers, terminals, and more.",
};

export default function PlatformsIndexPage() {
  const items = platformList.map((platform) => ({
    slug: platform.slug,
    name: platform.name,
    summary: platform.summary,
    categories: categoryList
      .filter((j) => platform.relatedCategories.includes(j.slug))
      .map((j) => ({ slug: j.slug, name: j.name })),
    skillCount: platform.relatedSkills
      .map((s) => getSkill(s))
      .filter(Boolean).length,
  }));

  return (
    <>
      <DarkPageHeader
        title="All Platforms"
        subtitle={`${platformList.length} platforms tracked. A platform is the underlying product or environment that skills build on top of.`}
        stats={[{ label: "Platforms", value: String(platformList.length) }]}
      />
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        <PlatformsList platforms={items} />
      </main>
    </>
  );
}
