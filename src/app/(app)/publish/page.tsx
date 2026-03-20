export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

import { auth, signOut } from "@/lib/auth";
import { listSkills } from "@/lib/blob-storage";

import { SkillsList } from "./skills-list";

export default async function PublishPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/sign-in");

  const skills = await listSkills(session.user.email);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-mono text-xl font-bold text-[var(--foreground)]">
            Your Skills
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {session.user.email}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="border border-[var(--border)] px-3 py-2 font-mono text-xs text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      <SkillsList initialSkills={skills} />
    </div>
  );
}
