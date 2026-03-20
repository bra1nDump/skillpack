export const dynamic = "force-dynamic";

import Link from "next/link";

import { DarkCTA } from "@/components/dark-cta";
import { DarkPageHeader } from "@/components/dark-page-header";
import { FilterInput } from "@/components/filter-input";
import { listAllCommunitySkills } from "@/lib/community-skills";

import { CommunityList } from "./community-list";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Skills — SkillPack",
  description:
    "Skills published by the community. Browse, discover, and install user-contributed skills.",
};

export default async function CommunityPage() {
  const skills = await listAllCommunitySkills();

  return (
    <>
      <DarkPageHeader
        title="Community Skills"
        subtitle={`${skills.length} skill${skills.length !== 1 ? "s" : ""} published by the community. Install directly with npx.`}
        stats={[
          { label: "Skills", value: String(skills.length) },
        ]}
      />
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        <CommunityList skills={skills} />
      </main>
      <DarkCTA
        title="Have a skill to share?"
        subtitle="Sign in with Google and publish your skill in seconds."
        buttonText="PUBLISH →"
        buttonHref="/publish"
        variant="ghost"
      />
    </>
  );
}
