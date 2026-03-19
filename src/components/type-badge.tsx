import type { SkillType } from "@/lib/catalog";

const TYPE_STYLES: Record<SkillType, string> = {
  Expertise: "bg-blue-500/15 text-blue-500",
  Generator: "bg-emerald-500/15 text-emerald-500",
  Guardian: "bg-red-500/15 text-red-400",
  Connector: "bg-violet-500/15 text-violet-500",
};

export function TypeBadge({ type }: { type: SkillType }) {
  return (
    <span
      className={`inline-block rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide ${TYPE_STYLES[type]}`}
    >
      {type}
    </span>
  );
}
