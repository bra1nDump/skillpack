"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type SearchItem = {
  label: string;
  name: string;
  href: string;
  summary: string;
};

export function Search({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.length < 2
    ? []
    : items.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q)
        );
      });

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        !e.metaKey &&
        !e.ctrlKey &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-xl">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search categories, skills, bundles, platforms..."
          className="w-full border border-black/10 bg-white/60 px-4 py-3 pr-12 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-black/25 focus:outline-none"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-black/10 bg-white/80 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
          /
        </kbd>
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute top-full z-30 mt-1 max-h-80 w-full overflow-y-auto border border-black/10 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
          {filtered.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
              className="block border-b border-black/5 px-4 py-3 last:border-b-0 hover:bg-zinc-50"
            >
              <span
                className={`inline-block rounded-sm px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] ${
                  item.label === "Skill"
                    ? "bg-zinc-900 text-zinc-100"
                    : item.label === "Bundle"
                      ? "bg-violet-100 text-violet-700"
                      : item.label === "Category"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-zinc-100 text-zinc-500"
                }`}
              >
                {item.label}
              </span>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {item.name}
              </p>
              <p className="mt-1 line-clamp-1 text-xs text-zinc-500">
                {item.summary}
              </p>
            </Link>
          ))}
        </div>
      )}
      {open && query.length >= 2 && filtered.length === 0 && (
        <div className="absolute top-full z-30 mt-1 w-full border border-black/10 bg-white px-4 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
          <p className="text-sm text-zinc-500">No results for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
