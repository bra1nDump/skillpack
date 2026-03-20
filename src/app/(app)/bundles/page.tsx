import { BundlesList } from "@/components/bundles-list";
import { DarkPageHeader } from "@/components/dark-page-header";
import { bundleList, getSkill } from "@/lib/catalog";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Bundles — Skillbench",
  description:
    "Full setups and stacks from known builders and personas — see what the best people actually ship with.",
};

export default function BundlesIndexPage() {
  const items = bundleList.map((bundle) => ({
    slug: bundle.slug,
    name: bundle.name,
    persona: bundle.persona,
    personaHandle: bundle.personaHandle,
    summary: bundle.summary,
    date: bundle.date,
    source: bundle.source,
    skills: bundle.skills
      .map((s) => getSkill(s))
      .filter(Boolean)
      .map((s) => ({ slug: s!.slug, name: s!.name })),
  }));

  return (
    <>
      <DarkPageHeader
        title="Bundles"
        subtitle={`Full setups from known builders. What do the people actually shipping with agents use day to day? ${bundleList.length} stacks tracked.`}
        stats={[{ label: "Stacks", value: String(bundleList.length) }]}
      />
      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        <BundlesList bundles={items} />
      </main>
    </>
  );
}
