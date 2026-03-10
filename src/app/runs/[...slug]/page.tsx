import type { Components } from "react-markdown";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { SiteFooter } from "@/components/site-footer";
import {
  readRunMarkdown,
  resolveRunAssetHref,
  resolveRunMarkdownHref,
} from "@/lib/run-docs";

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function RunPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await readRunMarkdown(slug).catch(() => null);

  if (!doc) {
    notFound();
  }

  const { source, relativePath } = doc;

  const components: Components = {
    a: ({ href = "", children }) => {
      const target = resolveRunMarkdownHref(slug, href);
      const external = target.startsWith("http");
      if (external) {
        return (
          <a
            href={target}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-black/20 underline-offset-4 hover:decoration-black/50"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={target}
          className="underline decoration-black/20 underline-offset-4 hover:decoration-black/50"
        >
          {children}
        </Link>
      );
    },
    img: ({ src = "", alt = "" }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolveRunAssetHref(slug, typeof src === "string" ? src : "")}
        alt={alt}
        className="my-6 w-full border border-black/10"
      />
    ),
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
    h3: ({ children }) => (
      <h3 className="mt-8 text-lg font-semibold text-zinc-950">{children}</h3>
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
          <p className="text-xs text-zinc-500">{relativePath}</p>
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
