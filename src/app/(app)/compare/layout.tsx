import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Skills — Skillbench",
  description: "Side-by-side comparison of agent skills by GitHub stars, evidence, and category rankings.",
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
