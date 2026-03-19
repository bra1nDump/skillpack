"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AXIS_STYLE, CHART_COLORS, TOOLTIP_STYLE } from "@/lib/chart-theme";
import { formatStars } from "@/lib/parse-stars";

export type CategorySkillData = {
  name: string;
  stars: number;
  evidence: number;
  strongEvidence: number;
  rank: string;
};

function StarsChart({ data }: { data: CategorySkillData[] }) {
  return (
    <div>
      <p className="mb-3 font-mono text-[12px] uppercase tracking-widest text-gray-500">
        GitHub Stars
      </p>
      <ResponsiveContainer width="100%" height={data.length * 40 + 20}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 12, bottom: 4, left: 4 }}
        >
          <CartesianGrid horizontal={false} stroke={CHART_COLORS.gridLine} />
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
            width={160}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            {...TOOLTIP_STYLE}
            formatter={(value) => [formatStars(Number(value)), "Stars"]}
          />
          <Bar dataKey="stars" radius={[0, 4, 4, 0]} barSize={18}>
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.rank === "01" ? CHART_COLORS.accent : `${CHART_COLORS.accent}99`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function EvidenceChart({ data }: { data: CategorySkillData[] }) {
  return (
    <div>
      <p className="mb-3 font-mono text-[12px] uppercase tracking-widest text-gray-500">
        Evidence items
      </p>
      <ResponsiveContainer width="100%" height={data.length * 40 + 20}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 12, bottom: 4, left: 4 }}
        >
          <CartesianGrid horizontal={false} stroke={CHART_COLORS.gridLine} />
          <XAxis
            type="number"
            tick={AXIS_STYLE}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={AXIS_STYLE}
            width={160}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip {...TOOLTIP_STYLE} />
          <Bar
            dataKey="strongEvidence"
            stackId="ev"
            fill={CHART_COLORS.green}
            barSize={18}
          />
          <Bar
            dataKey="moderate"
            stackId="ev"
            fill={CHART_COLORS.amber}
            radius={[0, 4, 4, 0]}
            barSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 flex items-center justify-center gap-5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm" style={{ background: CHART_COLORS.green }} />
          <span className="font-mono text-[12px] text-gray-500">Strong</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm" style={{ background: CHART_COLORS.amber }} />
          <span className="font-mono text-[12px] text-gray-500">Moderate</span>
        </div>
      </div>
    </div>
  );
}

export function CategorySkillsChart({ data }: { data: CategorySkillData[] }) {
  if (data.length === 0) return null;

  const enriched = data.map((d) => ({
    ...d,
    moderate: d.evidence - d.strongEvidence,
  }));

  return (
    <div className="grid gap-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 lg:grid-cols-2">
      <StarsChart data={enriched} />
      <EvidenceChart data={enriched} />
    </div>
  );
}
