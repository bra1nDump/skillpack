import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { resolveGitHubRawUrl } from "@/lib/github-fetch";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { repoUrl, filePath } = (await req.json()) as {
    repoUrl: string;
    filePath: string;
  };

  if (!repoUrl?.trim() || !filePath?.trim()) {
    return NextResponse.json(
      { error: "Repository URL and file path are required" },
      { status: 400 },
    );
  }

  try {
    const rawUrl = resolveGitHubRawUrl(repoUrl, filePath);
    const res = await fetch(rawUrl);

    if (!res.ok) {
      return NextResponse.json(
        { error: `File not found: ${res.status} ${res.statusText}` },
        { status: 404 },
      );
    }

    const content = await res.text();

    return NextResponse.json({ content });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch from repository";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
