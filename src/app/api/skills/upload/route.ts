import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { uploadFolderSkill } from "@/lib/blob-storage";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string;

  if (!title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const files: { name: string; data: Buffer; size: number }[] = [];
  let totalSize = 0;

  for (const [key, value] of formData.entries()) {
    if (key === "title") continue;
    if (!(value instanceof File)) continue;

    totalSize += value.size;
    if (totalSize > MAX_SIZE) {
      return NextResponse.json(
        { error: "Total upload exceeds 10MB limit" },
        { status: 400 },
      );
    }

    const arrayBuffer = await value.arrayBuffer();

    files.push({
      name: value.name,
      data: Buffer.from(arrayBuffer),
      size: value.size,
    });
  }

  if (files.length === 0) {
    return NextResponse.json(
      { error: "At least one file is required" },
      { status: 400 },
    );
  }

  try {
    const meta = await uploadFolderSkill(session.user.email, title, files);

    return NextResponse.json({ skill: meta }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
