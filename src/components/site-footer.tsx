import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-[15px] font-medium text-gray-500">Skillbench</p>
          <p className="mt-1 text-[13px] text-gray-500">
            Evidence-backed buyer&apos;s guide for agent skills.
          </p>
        </div>
        <nav className="flex items-center gap-5 text-[13px] text-gray-500">
          <Link href="/problems" className="transition-colors hover:text-gray-900">Problems</Link>
          <Link href="/solutions" className="transition-colors hover:text-gray-900">Solutions</Link>
        </nav>
      </div>
    </footer>
  );
}
