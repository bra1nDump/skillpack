import fs from "node:fs/promises";
import path from "node:path";

import { resolveRunAssetPath } from "@/lib/run-docs";

type RouteProps = {
  params: Promise<{
    slug: string[];
  }>;
};

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
};

export async function GET(_: Request, { params }: RouteProps) {
  const { slug } = await params;
  const filePath = resolveRunAssetPath(slug);
  const file = await fs.readFile(filePath);
  const ext = path.extname(filePath).toLowerCase();

  return new Response(file, {
    headers: {
      "Content-Type": CONTENT_TYPES[ext] ?? "application/octet-stream",
      "Cache-Control": "no-store",
    },
  });
}
