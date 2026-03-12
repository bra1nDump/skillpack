export const CHART_COLORS = {
  accent: "#818cf8",
  green: "#34d399",
  amber: "#fbbf24",
  muted: "#71717a",
  gridLine: "rgba(255, 255, 255, 0.06)",
  tooltipBg: "#18181f",
  tooltipBorder: "rgba(255, 255, 255, 0.08)",
  text: "#e4e4eb",
} as const;

export const AXIS_STYLE = {
  fontSize: 11,
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fill: CHART_COLORS.muted,
};

export const TOOLTIP_STYLE = {
  contentStyle: {
    background: CHART_COLORS.tooltipBg,
    border: `1px solid ${CHART_COLORS.tooltipBorder}`,
    borderRadius: 8,
    fontSize: 12,
    color: CHART_COLORS.text,
  },
  cursor: { fill: "rgba(129, 140, 248, 0.06)" },
};
