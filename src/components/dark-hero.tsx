import { Search } from "@/components/search";

interface DarkHeroProps {
  searchItems: {
    label: string;
    name: string;
    href: string;
    summary: string;
    image?: string;
  }[];
  stats: { label: string; value: string; color?: string }[];
}

export function DarkHero({ searchItems, stats }: DarkHeroProps) {
  return (
    <div className="m-4 mb-0 rounded-lg bg-[var(--dark-bg)] p-7 text-white md:mx-4">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Left: value prop */}
        <div className="min-w-0 flex-1">
          <div className="mb-3 inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-[10px] tracking-[0.5px] text-[var(--accent)]">
              LIVE RANKINGS
            </span>
          </div>
          <h1 className="max-w-lg text-[26px] font-black leading-[1.15] tracking-[-0.5px]">
            Find the actual meta for{" "}
            <span className="text-[var(--accent)]">agent skills</span>
          </h1>
          <p className="mt-2.5 max-w-[380px] text-[12px] leading-[1.6] text-[var(--dark-muted)]">
            Independent rankings backed by visible proof — GitHub stars, live
            signals, head-to-head comparisons.
          </p>
          <div className="mt-4 max-w-[380px]">
            <Search items={searchItems} dark />
          </div>
        </div>

        {/* Right: live stats */}
        <div className="min-w-[200px] flex-shrink-0">
          <div className="rounded-md border border-[var(--dark-border)] bg-[var(--dark-surface)] p-4">
            <p className="mb-3 font-mono text-[8px] uppercase tracking-[1.5px] text-[var(--dark-subtle)]">
              Live stats
            </p>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label}>
                  <p
                    className="font-mono text-[22px] font-bold"
                    style={{ color: s.color || "#fff" }}
                  >
                    {s.value}
                  </p>
                  <p className="font-mono text-[9px] text-[var(--dark-subtle)]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
