"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AXIS_STYLE, CHART_COLORS, TOOLTIP_STYLE } from "@/lib/chart-theme";
import { formatStars } from "@/lib/parse-stars";

import type { CompareSkill } from "@/lib/compare-data";

const BAR_COLORS = [
  CHART_COLORS.accent,
  CHART_COLORS.green,
  CHART_COLORS.amber,
  "#f472b6", // pink
  "#38bdf8", // sky
  "#a78bfa", // violet
];

export function CompareStarsChart({ skills }: { skills: CompareSkill[] }) {
  const data = skills.map((s) => ({ name: s.name, stars: s.stars }));

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="mb-4 font-mono text-[13px] uppercase tracking-widest text-gray-500">GitHub Stars</p>
      <ResponsiveContainer width="100%" height={skills.length * 48 + 30}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, bottom: 4, left: 4 }}>
          <CartesianGrid horizontal={false} stroke={CHART_COLORS.gridLine} />
          <XAxis type="number" tick={AXIS_STYLE} tickFormatter={formatStars} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={AXIS_STYLE} width={160} axisLine={false} tickLine={false} />
          <Tooltip {...TOOLTIP_STYLE} formatter={(value) => [formatStars(Number(value)), "Stars"]} />
          <Bar dataKey="stars" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((_, i) => (
              <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CompareEvidenceChart({ skills }: { skills: CompareSkill[] }) {
  const data = skills.map((s) => ({
    name: s.name,
    strong: s.strongEvidence,
    moderate: s.evidenceCount - s.strongEvidence,
  }));

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="mb-4 font-mono text-[13px] uppercase tracking-widest text-gray-500">Evidence</p>
      <ResponsiveContainer width="100%" height={skills.length * 48 + 50}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, bottom: 4, left: 4 }}>
          <CartesianGrid horizontal={false} stroke={CHART_COLORS.gridLine} />
          <XAxis type="number" tick={AXIS_STYLE} axisLine={false} tickLine={false} allowDecimals={false} />
          <YAxis type="category" dataKey="name" tick={AXIS_STYLE} width={160} axisLine={false} tickLine={false} />
          <Tooltip {...TOOLTIP_STYLE} />
          <Legend
            wrapperStyle={{ fontSize: 10, fontFamily: "var(--font-ibm-plex-mono), monospace", color: CHART_COLORS.muted }}
          />
          <Bar dataKey="strong" stackId="evidence" fill={CHART_COLORS.green} barSize={20} radius={[0, 0, 0, 0]} />
          <Bar dataKey="moderate" stackId="evidence" fill={CHART_COLORS.amber} barSize={20} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
