import type { Components } from "react-markdown";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { CopyButton } from "@/components/copy-button";
import { SiteFooter } from "@/components/site-footer";
import { readDocMarkdown } from "@/lib/docs";

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await readDocMarkdown(slug).catch(() => null);

  if (!doc) {
    notFound();
  }

  const { source, relativePath } = doc;

  const components: Components = {
    a: ({ href = "", children }) => {
      const external = href.startsWith("http");
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-black/20 underline-offset-4 hover:decoration-black/50"
          >
            {children}
          </a>
        );
      }

      return <span>{children}</span>;
    },
    h1: ({ children }) => (
      <h1 className="mt-10 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-700">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="mt-4 text-base leading-8 text-zinc-700">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-zinc-700">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-8 text-zinc-700">
        {children}
      </ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l border-black/15 pl-5 text-zinc-700">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded-[2px] bg-black/5 px-1.5 py-0.5 text-[0.92em] text-zinc-900">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mt-6 overflow-x-auto border border-black/10 bg-white px-4 py-4 text-sm leading-7 text-zinc-800">
        {children}
      </pre>
    ),
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-4xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="border-b border-black/5 pb-8">
          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              <Link href="/" className="hover:text-black">
                Skillbench
              </Link>
              <span className="px-2 text-zinc-400">/</span>
              <span>Doc</span>
            </div>
            <CopyButton
              label="Copy link"
              text={`http://127.0.0.1:3000/docs/${slug.join("/")}`}
            />
          </div>
          <p className="mt-6 text-xs text-zinc-500">{relativePath}</p>
        </div>

        <article className="prose-none py-12">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {source}
          </ReactMarkdown>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
