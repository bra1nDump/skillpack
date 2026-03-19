const MEASURES = [
  { icon: "◈", title: "Trust Score", desc: "Freshness, community, adoption, evidence — 0 to 100", color: "text-emerald-500" },
  { icon: "★", title: "Stars", desc: "GitHub stars with growth trends", color: "text-amber-500" },
  { icon: "◎", title: "Complexity", desc: "Repo structure depth — languages, files, size", color: "text-gray-600" },
  { icon: "↓", title: "Downloads", desc: "Weekly npm/PyPI installs", color: "text-blue-500" },
];

export function MeasureStrip() {
  return (
    <div className="grid grid-cols-4 border-b border-[var(--border)] px-8">
      {MEASURES.map((m, i) => (
        <div
          key={m.title}
          className={`py-3.5 ${i > 0 ? "border-l border-[var(--border)] pl-4" : ""} ${i < 3 ? "pr-4" : ""}`}
        >
          <div className="mb-1 flex items-center gap-1.5">
            <span className={`text-[12px] ${m.color}`}>{m.icon}</span>
            <span className="text-[11.5px] font-bold text-gray-900">{m.title}</span>
          </div>
          <p className="text-[10.5px] leading-[1.4] text-gray-500">{m.desc}</p>
        </div>
      ))}
    </div>
  );
}
