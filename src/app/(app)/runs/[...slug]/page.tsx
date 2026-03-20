import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  readRunMarkdown,
  resolveRunAssetHref,
  resolveRunMarkdownHref,
} from "@/lib/run-docs";

import type { Components } from "react-markdown";

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
            className="text-[var(--accent)] transition-colors hover:opacity-80"
          >
            {children}
          </a>
        );
      }

      return (
        <Link href={target} className="text-[var(--accent)] transition-colors hover:opacity-80">
          {children}
        </Link>
      );
    },
    img: ({ src = "", alt = "" }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolveRunAssetHref(slug, typeof src === "string" ? src : "")}
        alt={alt}
        className="my-6 w-full rounded-lg border border-[var(--border)]"
      />
    ),
    h1: ({ children }) => (
      <h1 className="mt-10 text-3xl font-bold tracking-tight text-gray-900 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 font-mono text-[13px] font-semibold uppercase tracking-widest text-[var(--accent)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-lg font-semibold text-gray-900">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mt-4 text-[15px] leading-7 text-gray-500">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-7 text-gray-500">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-[15px] leading-7 text-gray-500">
        {children}
      </ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-[var(--accent)]/30 pl-5 text-gray-500">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.92em] text-gray-700">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mt-6 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-[15px] leading-7 text-gray-700">
        {children}
      </pre>
    ),
  };

  return (
      <main className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-8">
        <div className="pb-6">
          <p className="font-mono text-[13px] text-gray-500">{relativePath}</p>
        </div>

        <article className="prose-none py-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {source}
          </ReactMarkdown>
        </article>
      </main>
  );
}
