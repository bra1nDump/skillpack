import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { createTextSkill, listSkills } from "@/lib/blob-storage";
import { fetchGitHubFile } from "@/lib/github-fetch";
import { validateInstallCommand } from "@/lib/validate-install";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const skills = await listSkills(session.user.email);

  return NextResponse.json({ skills });
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, repoUrl, filePath, installCommand } = body as {
    title: string;
    repoUrl: string;
    filePath: string;
    installCommand?: string;
  };

  if (!title?.trim()) {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 },
    );
  }

  if (!repoUrl?.trim()) {
    return NextResponse.json(
      { error: "Repository URL is required" },
      { status: 400 },
    );
  }

  // Fetch content from GitHub
  let content: string;

  try {
    content = await fetchGitHubFile(repoUrl, filePath || "SKILL.md");
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : "Failed to fetch from repository";

    return NextResponse.json({ error: msg }, { status: 400 });
  }

  // Validate install command if provided
  if (installCommand?.trim()) {
    const validation = await validateInstallCommand(installCommand);

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 },
      );
    }
  }

  try {
    const meta = await createTextSkill(
      session.user.email,
      title,
      content,
      repoUrl.trim(),
      filePath?.trim() || "SKILL.md",
      installCommand?.trim() || undefined,
    );

    return NextResponse.json({ skill: meta }, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create skill";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
