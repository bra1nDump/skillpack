"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type SearchItem = {
  label: string;
  name: string;
  href: string;
  summary: string;
  image?: string;
};

export function Search({ items, dark }: { items: SearchItem[]; dark?: boolean }) {
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
        <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search skills, categories, bundles..."
          className={`w-full rounded-lg border py-2.5 pl-10 pr-12 text-[15px] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]/30 ${
            dark
              ? "border-[var(--dark-dim)] bg-transparent text-white placeholder:text-[var(--dark-subtle)] focus:border-[var(--dark-muted)]"
              : "border-[var(--border)] bg-white text-gray-900 placeholder:text-gray-500 focus:border-[var(--accent)]/50 focus:bg-white"
          }`}
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-[var(--border)] bg-gray-50 px-1.5 py-0.5 font-mono text-[12px] text-gray-500">
          /
        </kbd>
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute top-full z-30 mt-2 max-h-80 w-full overflow-y-auto rounded-lg border border-[var(--border)] bg-white shadow-lg shadow-gray-200/60">
          {filtered.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
              className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3 last:border-b-0 hover:bg-gray-50"
            >
              {item.image && (
                <div className="h-8 w-12 flex-shrink-0 overflow-hidden rounded border border-[var(--border)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <span
                  className={`inline-block rounded px-1.5 py-0.5 font-mono text-[13px] uppercase tracking-wider ${
                    item.label === "Skill"
                      ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                      : item.label === "Bundle"
                        ? "bg-violet-50 text-violet-600"
                        : item.label === "Category"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
                <p className="mt-1 text-[15px] font-medium text-gray-800">
                  {item.name}
                </p>
                <p className="mt-0.5 line-clamp-1 text-[13px] text-gray-500">
                  {item.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {open && query.length >= 2 && filtered.length === 0 && (
        <div className="absolute top-full z-30 mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-4 shadow-lg shadow-gray-200/60">
          <p className="text-[15px] text-gray-500">No results for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
