"use client";

import { useEffect, useRef, useState } from "react";

export type FeedEvent = {
  skill: string;
  event: "updated" | "classified" | "new" | "trending";
  detail: string;
  time: string;
};

const EVENT_COLORS: Record<string, string> = {
  updated: "bg-emerald-500",
  classified: "bg-violet-500",
  new: "bg-[var(--accent)]",
  trending: "bg-amber-500",
};

const EVENT_TEXT_COLORS: Record<string, string> = {
  updated: "text-emerald-600",
  classified: "text-violet-600",
  new: "text-[var(--accent)]",
  trending: "text-amber-600",
};

export function LiveFeedTicker({ events }: { events: FeedEvent[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setPos((p) => p + 0.5), 30);

    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;
    if (pos >= el.scrollWidth / 2) setPos(0);
    el.scrollLeft = pos;
  }, [pos]);

  if (events.length === 0) return null;

  const items = [...events, ...events];

  return (
    <div
      ref={ref}
      className="flex overflow-x-hidden border-b border-[var(--border)] bg-[var(--surface)]"
    >
      {items.map((ev, i) => (
        <div
          key={i}
          className="flex flex-shrink-0 items-center gap-2 border-r border-[var(--border)] px-3.5 py-1.5"
        >
          <span
            className={`h-[5px] w-[5px] flex-shrink-0 rounded-full ${EVENT_COLORS[ev.event] ?? "bg-emerald-500"}`}
          />
          <span className="font-mono text-[11px] font-semibold text-gray-800">
            {ev.skill}
          </span>
          <span
            className={`font-mono text-[9px] font-semibold ${EVENT_TEXT_COLORS[ev.event] ?? "text-emerald-600"}`}
          >
            {ev.event}
          </span>
          <span className="font-mono text-[10px] text-gray-500">{ev.detail}</span>
          <span className="font-mono text-[10px] text-gray-400">{ev.time}</span>
        </div>
      ))}
    </div>
  );
}
