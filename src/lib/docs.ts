import fs from "node:fs/promises";
import path from "node:path";

const DOCS_ROOT = process.cwd();

function ensureInsideRoot(targetPath: string) {
  const normalizedRoot = path.resolve(DOCS_ROOT);
  const normalizedTarget = path.resolve(targetPath);

  if (!normalizedTarget.startsWith(normalizedRoot)) {
    throw new Error("Path escapes project root");
  }

  return normalizedTarget;
}

export async function readDocMarkdown(slug: string[]) {
  const requested = ensureInsideRoot(path.join(DOCS_ROOT, ...slug));
  const candidates = requested.endsWith(".md")
    ? [requested]
    : [requested, `${requested}.md`];

  for (const candidate of candidates) {
    try {
      const source = await fs.readFile(candidate, "utf8");
      return {
        source,
        filePath: candidate,
        relativePath: path.relative(DOCS_ROOT, candidate),
      };
    } catch {
      continue;
    }
  }

  throw new Error("Doc not found");
}
