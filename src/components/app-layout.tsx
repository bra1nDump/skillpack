import { DesktopSidebar, MobileNav } from "./app-sidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Mobile: top bar + overlay menu */}
      <MobileNav />

      <div className="flex w-full min-h-screen">
        {/* Desktop: sticky sidebar */}
        <DesktopSidebar />

        <main className="flex w-full min-w-0 flex-1 flex-col overflow-x-hidden bg-white">
          <div className="flex-1">{children}</div>
          <footer className="border-t border-[var(--border)] px-8 py-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[12px] font-bold text-[var(--foreground)]">
                skill<span className="text-[var(--accent)]">pack</span><span className="text-[var(--muted)]">.co</span>
              </span>
              <p className="text-[11px] text-[var(--muted)]">
                © 2026 skillpack.co
              </p>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
