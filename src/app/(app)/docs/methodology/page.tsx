import type { Metadata } from "next";

import { MethodologyContent } from "./methodology-content";

export const metadata: Metadata = {
  title: "Methodology — SkillPack",
  description:
    "How SkillPack measures trust scores, tiers, complexity, evidence quality, and rankings for every AI skill.",
};

export default function MethodologyPage() {
  return <MethodologyContent />;
}
