"use client";

import Link from "next/link";
import type { Session } from "next-auth";

export function AuthButton({ session }: { session: Session | null }) {
  if (session?.user) {
    return (
      <Link
        href="/publish"
        className="flex w-full items-center gap-2 bg-[#171717] px-[18px] py-[10px] cursor-pointer transition-colors hover:bg-[#222]"
      >
        {session.user.image ? (
          <img
            src={session.user.image}
            alt=""
            className="h-5 w-5 rounded-full"
          />
        ) : (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#333] font-mono text-[9px] font-bold text-white">
            {(session.user.name ?? session.user.email ?? "?")[0].toUpperCase()}
          </span>
        )}
        <span className="truncate font-mono text-[11px] text-[#A3A3A3]">
          {session.user.name ?? session.user.email}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/sign-in"
      className="flex w-full items-center justify-center gap-1.5 bg-[#E63946] py-[11px] font-mono text-[12px] font-bold tracking-wider text-white cursor-pointer transition-colors hover:bg-[#c5303b]"
    >
      <span className="text-[14px] leading-none">+</span> PUBLISH YOUR SKILL
    </Link>
  );
}
