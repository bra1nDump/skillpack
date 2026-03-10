import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-black/5">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500 hover:text-black"
        >
          Skillbench
        </Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-500">
          <Link href="/jobs" className="hover:text-black">
            Categories
          </Link>
          <Link href="/skills" className="hover:text-black">
            Skills
          </Link>
          <Link href="/platforms" className="hover:text-black">
            Platforms
          </Link>
        </nav>
      </div>
    </header>
  );
}
