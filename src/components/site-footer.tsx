import Link from "next/link";

import { mission } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-transparent">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-zinc-600 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
            Why This Exists
          </p>
          <p className="max-w-3xl leading-6">{mission}</p>
        </div>
        <div className="flex flex-col gap-2 border-t border-black/5 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p>Built as a static, evidence-backed buyer&apos;s guide for agent skills.</p>
          <div className="flex items-center gap-4">
            <Link className="hover:text-black" href="/">
              Home
            </Link>
            <Link className="hover:text-black" href="/jobs/document-editing-ui-ux">
              Document Editing & UI/UX Design
            </Link>
            <Link className="hover:text-black" href="/storyboard">
              Storyboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
