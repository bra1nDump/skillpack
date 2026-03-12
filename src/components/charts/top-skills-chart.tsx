"use client";

import { useRouter } from "next/navigation";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AXIS_STYLE, CHART_COLORS, TOOLTIP_STYLE } from "@/lib/chart-theme";
import { formatStars } from "@/lib/parse-stars";

export type TopSkillData = {
  name: string;
  stars: number;
  slug: string;
};

export function TopSkillsChart({ data }: { data: TopSkillData[] }) {
  const router = useRouter();

  if (data.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[var(--surface)] p-5">
      <ResponsiveContainer width="100%" height={data.length * 40 + 30}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 12, bottom: 4, left: 4 }}
        >
          <CartesianGrid
            horizontal={false}
            stroke={CHART_COLORS.gridLine}
          />
          <XAxis
            type="number"
            tick={AXIS_STYLE}
            tickFormatter={formatStars}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={AXIS_STYLE}
            width={120}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            {...TOOLTIP_STYLE}
            formatter={(value) => [formatStars(Number(value)), "GitHub Stars"]}
          />
          <Bar
            dataKey="stars"
            fill={CHART_COLORS.accent}
            radius={[0, 4, 4, 0]}
            barSize={16}
            cursor="pointer"
            onClick={(_data, _index, e) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const slug = (e as any)?.payload?.slug ?? (_data as any)?.slug;

              if (slug) router.push(`/skills/${slug}`);
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
