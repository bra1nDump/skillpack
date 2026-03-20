import { LandingContent } from "./landing-content";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SkillPack — Free Skills for Coding Agents",
  description:
    "Turn any coding agent into a domain expert. SkillPack picks the best community-rated skills for your project and installs them. Free and open.",
};

export default function StartPage() {
  return <LandingContent />;
}
