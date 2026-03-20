import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8">
        <div className="py-24 text-center">
          <p className="font-mono text-6xl font-bold text-gray-200">404</p>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-6 text-gray-500">
            This page doesn&apos;t exist yet. Try browsing categories or skills instead.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            {[
              { href: "/", label: "Home" },
              { href: "/categories", label: "Categories" },
              { href: "/skills", label: "Skills" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-[15px] font-medium text-gray-700 transition-all hover:border-[var(--border-hover)] hover:text-gray-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
    </main>
  );
}
