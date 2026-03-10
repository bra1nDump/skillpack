import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { getJob, getSkill, jobList } from "@/lib/catalog";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return jobList.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  return {
    title: `${job.name} — Skillbench`,
    description: job.deck,
  };
}

export default async function JobPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJob(slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="border-b border-black/5 pb-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            <Link href="/" className="hover:text-black">
              Skillbench
            </Link>
            <span className="px-2 text-zinc-400">/</span>
            <span>Category</span>
          </div>
          <h1 className="mt-8 text-4xl font-semibold tracking-[-0.06em] text-zinc-950 sm:text-6xl">
            {job.name}
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-zinc-600">{job.deck}</p>
        </div>

        <section className="border-b border-black/5 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Verdict
          </p>
          <div className="mt-5 space-y-5 text-base leading-8 text-zinc-700">
            {job.verdict.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="border-b border-black/5 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            The deeper read
          </p>
          <div className="mt-5 space-y-5 text-base leading-8 text-zinc-700">
            {job.meta.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        {job.observedOutputs.length > 0 ? (
          <section className="border-b border-black/5 py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Observed outputs
            </p>
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              {job.observedOutputs.map((item) => (
                <article key={item.title} className="border border-black/10 p-4">
                  <a href={item.href} target="_blank" rel="noreferrer" className="group block">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-60 w-full border border-black/10 bg-white object-contain object-top p-1 transition-transform duration-200 group-hover:scale-[1.01]"
                      />
                    ) : null}
                    <p className="mt-4 text-sm font-semibold text-zinc-950 underline decoration-black/15 underline-offset-4 group-hover:decoration-black/40">
                      {item.title}
                    </p>
                  </a>
                  <p className="mt-3 text-sm leading-7 text-zinc-700">{item.summary}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 underline decoration-black/15 underline-offset-4 hover:text-black"
                  >
                    View source
                  </a>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="border-b border-black/5 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Current ranking
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-black/5 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  <th className="py-3 pr-4 font-medium">Rank</th>
                  <th className="py-3 pr-4 font-medium">Contender</th>
                  <th className="py-3 pr-4 font-medium">Best for</th>
                  <th className="py-3 pr-4 font-medium">Why it ranks here</th>
                  <th className="py-3 font-medium">Watch for</th>
                </tr>
              </thead>
              <tbody>
                {job.ranking.map((item) => {
                  const skill = item.skillSlug ? getSkill(item.skillSlug) : null;
                  const href = skill ? `/skills/${skill.slug}` : item.externalUrl;
                  const external = Boolean(item.externalUrl && !skill);

                  return (
                    <tr key={item.rank} className="border-b border-black/5 align-top">
                      <td className="py-4 pr-4 font-mono text-sm text-zinc-700">{item.rank}</td>
                      <td className="group relative py-4 pr-4 text-sm font-semibold text-zinc-950">
                        {href ? (
                          external ? (
                            <a
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              className="underline decoration-black/20 underline-offset-4"
                            >
                              {item.contender}
                            </a>
                          ) : (
                            <Link
                              href={href}
                              className="underline decoration-black/20 underline-offset-4"
                            >
                              {item.contender}
                            </Link>
                          )
                        ) : (
                          <span>{item.contender}</span>
                        )}
                        {skill?.previewImage ? (
                          <div className="pointer-events-none absolute left-0 top-full z-20 hidden w-72 border border-black/10 bg-white p-3 shadow-[0_18px_50px_rgba(0,0,0,0.08)] lg:group-hover:block">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={skill.previewImage}
                              alt={item.contender}
                              className="h-44 w-full border border-black/10 bg-white object-contain object-top p-1"
                            />
                          </div>
                        ) : null}
                      </td>
                      <td className="py-4 pr-4 text-sm leading-7 text-zinc-700">{item.bestFor}</td>
                      <td className="py-4 pr-4 text-sm leading-7 text-zinc-700">{item.why}</td>
                      <td className="py-4 text-sm leading-7 text-zinc-700">{item.watch}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {job.headToHead.length > 0 ? (
          <section className="border-b border-black/5 py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Head to head
            </p>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {job.headToHead.map((pair) => (
                <article key={`${pair.left}-${pair.right}`} className="border border-black/10 px-5 py-5">
                  <p className="text-sm font-semibold text-zinc-950">
                    {pair.left}
                    <span className="mx-2 font-normal text-zinc-400">vs</span>
                    {pair.right}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">
                    {pair.gist}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {job.liveSignals.length > 0 ? (
          <section className="border-b border-black/5 py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Public signals
            </p>
            <div className="mt-6 space-y-6">
              {job.liveSignals.map((signal) => (
                <article key={signal.title} className="border-t border-black/5 pt-4">
                  <div
                    className={
                      signal.preview
                        ? "grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]"
                        : "grid gap-6"
                    }
                  >
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                        {signal.label}
                      </p>
                      <a
                        href={signal.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-base font-semibold leading-8 text-zinc-950 underline decoration-black/20 underline-offset-4 hover:decoration-black/50"
                      >
                        {signal.title}
                      </a>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-700">
                        {signal.note}
                      </p>
                    </div>
                    {signal.preview ? (
                      <a
                        href={signal.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group block"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={signal.preview}
                          alt={signal.title}
                          className="h-52 w-full border border-black/10 bg-white object-contain object-top p-1 transition-transform duration-200 group-hover:scale-[1.01]"
                        />
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            What changes this
          </p>
          <div className="mt-5 space-y-4 text-base leading-8 text-zinc-700">
            {job.whatChangesThis.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
