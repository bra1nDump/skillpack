import fs from "node:fs/promises";
import path from "node:path";

const RUNS_ROOT = path.join(process.cwd(), "agent-runs");

function ensureInsideRuns(targetPath: string) {
  const normalizedRoot = path.resolve(RUNS_ROOT);
  const normalizedTarget = path.resolve(targetPath);

  if (!normalizedTarget.startsWith(normalizedRoot)) {
    throw new Error("Path escapes agent-runs root");
  }

  return normalizedTarget;
}

export async function readRunMarkdown(slug: string[]) {
  const requested = ensureInsideRuns(path.join(RUNS_ROOT, ...slug));
  const finalPath = requested.endsWith(".md")
    ? requested
    : ensureInsideRuns(path.join(requested, "findings.md"));

  const source = await fs.readFile(finalPath, "utf8");
  return {
    source,
    filePath: finalPath,
    relativePath: path.relative(RUNS_ROOT, finalPath),
  };
}

export function resolveRunAssetPath(slug: string[]) {
  return ensureInsideRuns(path.join(RUNS_ROOT, ...slug));
}

export function resolveRunMarkdownHref(currentSlug: string[], href: string) {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href;
  }

  const currentDir = currentSlug[currentSlug.length - 1]?.endsWith(".md")
    ? currentSlug.slice(0, -1)
    : currentSlug;

  const target = ensureInsideRuns(path.resolve(RUNS_ROOT, ...currentDir, href));
  const relative = path.relative(RUNS_ROOT, target);

  return `/runs/${relative.replace(/\\/g, "/")}`;
}

export function resolveRunAssetHref(currentSlug: string[], href: string) {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href;
  }

  const currentDir = currentSlug[currentSlug.length - 1]?.endsWith(".md")
    ? currentSlug.slice(0, -1)
    : currentSlug;

  const target = ensureInsideRuns(path.resolve(RUNS_ROOT, ...currentDir, href));
  const relative = path.relative(RUNS_ROOT, target);

  return `/run-assets/${relative.replace(/\\/g, "/")}`;
}
