import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { deleteSkill } from "@/lib/blob-storage";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await deleteSkill(session.user.email, id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
