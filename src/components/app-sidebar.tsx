"use client";

import Link from "next/link";
import type { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { categoryList, skillList } from "@/lib/catalog";
import { categoryIcons } from "@/lib/skill-filters";

import { AuthButton } from "./auth-button";

function SidebarContent({ onNavigate, session }: { onNavigate?: () => void; session: Session | null }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-[220px] min-w-[220px] flex-col bg-black">
      {/* Brand — skillpack.co */}
      <div className="border-b border-[#262626] px-[18px] pb-[14px] pt-[18px]">
        <Link href="/" onClick={onNavigate}>
          <span className="font-mono text-[17px] font-bold leading-none tracking-[-0.5px] text-white">
            skill<span className="text-[var(--accent)]">pack</span>
            <span className="font-normal text-[#525252]">.co</span>
          </span>
        </Link>
        <p className="mt-[5px] font-mono text-[9px] uppercase tracking-[2px] text-[#525252]">
          Skills and Agents
        </p>
      </div>

      {/* PUBLISH CTA / User info */}
      <div className="px-[18px] pt-[14px] pb-[10px]" onClick={onNavigate}>
        <AuthButton session={session} />
      </div>

      {/* Main nav */}
      <div className="py-2">
        {[
          { href: "/community", label: "Community", icon: "★" },
          { href: "/bundles", label: "Bundles", icon: "▤" },
          { href: "/platforms", label: "Platforms", icon: "◇" },
          { href: "/compare", label: "Compare", icon: "⇔" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-2 border-l-2 px-[18px] py-2 text-[12.5px] transition-colors ${
              pathname === item.href || pathname.startsWith(item.href + "/")
                ? "border-[var(--accent)] bg-[#171717] font-semibold text-white"
                : "border-transparent text-[#A3A3A3] hover:bg-[#111] hover:text-white"
            }`}
          >
            <span className="text-[11px] opacity-50">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      {/* Separator */}
      <div className="mx-[18px] border-t border-[#262626]" />

      {/* Browse — categories */}
      <div className="flex-1 overflow-y-auto pt-1">
        <p className="px-[18px] py-[6px] font-mono text-[9px] font-bold uppercase tracking-[1.5px] text-[#525252]">
          Browse
        </p>
        {categoryList.map((cat) => {
          const isActive = pathname === `/categories/${cat.slug}`;
          const icon = categoryIcons[cat.slug] ?? "◎";
          const count = skillList.filter((s) =>
            s.relatedCategories.includes(cat.slug),
          ).length;

          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              onClick={onNavigate}
              className={`flex items-center gap-2.5 border-l-2 px-[18px] py-[9px] text-[12.5px] transition-colors ${
                isActive
                  ? "border-[var(--accent)] bg-[#171717] font-semibold text-white"
                  : "border-transparent text-[#A3A3A3] hover:bg-[#111] hover:text-white"
              }`}
            >
              <span className="w-[18px] text-center text-[12px] opacity-70">
                {icon}
              </span>
              <span className="flex-1">{cat.name}</span>
              <span
                className={`font-mono text-[10px] ${isActive ? "text-[#A3A3A3]" : "text-[#737373]"}`}
              >
                {count || cat.ranking.length}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Footer links */}
      <div className="flex gap-3 border-t border-[#262626] px-[18px] py-3 font-mono text-[10px] text-[#525252]">
        {[
          { label: "Docs", href: "/docs/methodology" },
          { label: "SkillPack", href: "/skillpack" },
          { label: "GitHub", href: "https://github.com/bra1nDump/skillbench/" },
        ].map((l) => (
          <Link
            key={l.label}
            href={l.href}
            onClick={onNavigate}
            className="transition-colors hover:text-[#A3A3A3]"
            target={l.label==="GitHub" ? "_blank" : "" }
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function DesktopSidebar({ session }: { session: Session | null }) {
  return (
    <aside className="sticky top-0 hidden h-screen shrink-0 md:block">
      <SidebarContent session={session} />
    </aside>
  );
}

export function MobileNav({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-70 flex items-center justify-between bg-black px-4 py-3 md:hidden">
        <Link href="/" onClick={close}>
          <span className="font-mono text-[15px] font-bold tracking-tight text-white">
            skill<span className="text-[var(--accent)]">pack</span>
            <span className="font-normal text-[#525252]">.co</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center text-white"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-60 bg-black/60 transition-opacity duration-250 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
      />
      {/* Slide-in sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-60 w-[220px] transition-transform duration-250 ease-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent onNavigate={close} session={session} />
      </aside>
    </>
  );
}
