"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteSkillButton({ skillId, redirectTo }: { skillId: string; redirectTo?: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this skill? This cannot be undone.")) return;

    setPending(true);
    try {
      const res = await fetch(`/api/skills/${skillId}`, { method: "DELETE" });
      if (res.ok) {
        if (redirectTo) {
          router.push(redirectTo);
        }
        router.refresh();
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="shrink-0 font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--accent)] disabled:opacity-50"
    >
      {pending ? "..." : "DELETE"}
    </button>
  );
}
