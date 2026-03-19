import type { SkillTier } from "@/lib/catalog";

const TIERS: SkillTier[] = ["Atomic", "Composite", "Orchestrator", "Pack"];

export function TierPips({ tier }: { tier: SkillTier }) {
  const level = TIERS.indexOf(tier);

  return (
    <div className="flex items-center gap-0.5">
      {TIERS.map((_, i) => (
        <div
          key={i}
          className={`h-[3px] w-[11px] rounded-[1px] ${
            i <= level ? "bg-gray-800" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
