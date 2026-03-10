import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="py-24 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400">
            404
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-zinc-950">
            Page not found
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-8 text-zinc-600">
            This page doesn&apos;t exist yet. Try browsing categories or skills instead.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/"
              className="border border-black/10 px-5 py-3 text-sm font-semibold text-zinc-950 hover:border-black/25"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="border border-black/10 px-5 py-3 text-sm font-semibold text-zinc-950 hover:border-black/25"
            >
              Browse Categories
            </Link>
            <Link
              href="/skills"
              className="border border-black/10 px-5 py-3 text-sm font-semibold text-zinc-950 hover:border-black/25"
            >
              Browse Skills
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
