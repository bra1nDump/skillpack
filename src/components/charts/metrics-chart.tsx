"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AXIS_STYLE, CHART_COLORS, TOOLTIP_STYLE } from "@/lib/chart-theme";
import { formatStars } from "@/lib/parse-stars";

type MetricPoint = { date: string; value: number };

type MetricsLine = {
  name: string;
  color: string;
  data: MetricPoint[];
};

const LINE_COLORS = [
  CHART_COLORS.accent,
  CHART_COLORS.green,
  CHART_COLORS.amber,
  "#f472b6",
  "#38bdf8",
  "#a78bfa",
];

/**
 * Single-skill metrics chart (shown on skill detail page).
 */
export function SkillMetricsChart({ data, label }: { data: MetricPoint[]; label: string }) {
  if (data.length < 2) return null;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[var(--surface)] p-5">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500">{label}</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 4, right: 12, bottom: 4, left: 4 }}>
          <CartesianGrid stroke={CHART_COLORS.gridLine} strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={AXIS_STYLE} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_STYLE} tickFormatter={formatStars} axisLine={false} tickLine={false} />
          <Tooltip
            {...TOOLTIP_STYLE}
            formatter={(value) => [formatStars(Number(value)), label]}
            labelStyle={{ color: CHART_COLORS.muted, fontSize: 11 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={CHART_COLORS.accent}
            strokeWidth={2}
            dot={{ fill: CHART_COLORS.accent, r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Multi-skill comparison chart (shown on category/compare pages).
 * Each line is a different skill.
 */
export function MultiMetricsChart({ lines, label }: { lines: MetricsLine[]; label: string }) {
  if (lines.length === 0) return null;

  // Merge all dates across all lines into a unified timeline
  const allDates = [...new Set(lines.flatMap((l) => l.data.map((d) => d.date)))].sort();

  const merged = allDates.map((date) => {
    const point: Record<string, string | number | null> = { date };

    for (const line of lines) {
      const match = line.data.find((d) => d.date === date);

      point[line.name] = match ? match.value : null;
    }
    return point;
  });

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[var(--surface)] p-5">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500">{label}</p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={merged} margin={{ top: 4, right: 12, bottom: 4, left: 4 }}>
          <CartesianGrid stroke={CHART_COLORS.gridLine} strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={AXIS_STYLE} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_STYLE} tickFormatter={formatStars} axisLine={false} tickLine={false} />
          <Tooltip
            {...TOOLTIP_STYLE}
            formatter={(value) => [formatStars(Number(value)), ""]}
            labelStyle={{ color: CHART_COLORS.muted, fontSize: 11 }}
          />
          {lines.map((line, i) => (
            <Line
              key={line.name}
              type="monotone"
              dataKey={line.name}
              stroke={line.color || LINE_COLORS[i % LINE_COLORS.length]}
              strokeWidth={2}
              dot={{ fill: line.color || LINE_COLORS[i % LINE_COLORS.length], r: 3 }}
              activeDot={{ r: 5 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
        {lines.map((line, i) => (
          <div key={line.name} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: line.color || LINE_COLORS[i % LINE_COLORS.length] }}
            />
            <span className="font-mono text-[10px] text-zinc-500">{line.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
