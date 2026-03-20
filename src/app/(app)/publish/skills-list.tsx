"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import type { SkillMeta } from "@/lib/blob-storage";

function DeleteModal({
  skillTitle,
  onConfirm,
  onCancel,
}: {
  skillTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  function handleCancel() {
    setVisible(false);
    setTimeout(onCancel, 200);
  }

  function handleConfirm() {
    setVisible(false);
    setTimeout(onConfirm, 200);
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", backgroundColor: visible ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0)" }}
      onClick={handleCancel}
    >
      <div
        className={`mx-4 w-full max-w-[400px] bg-white shadow-2xl transition-all duration-200 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{ padding: "32px 36px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-mono text-base font-bold text-[var(--foreground)]">
          Delete skill
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
          Are you sure you want to delete <strong className="text-[var(--foreground)]">{skillTitle}</strong>? This cannot be undone.
        </p>
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="border border-[var(--border)] px-5 py-2.5 font-mono text-xs text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="bg-[var(--accent)] px-5 py-2.5 font-mono text-xs font-bold text-white transition-colors hover:bg-[#c5303b]"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export function SkillsList({ initialSkills }: { initialSkills: SkillMeta[] }) {
  const [skills, setSkills] = useState(initialSkills);
  const [deleteTarget, setDeleteTarget] = useState<SkillMeta | null>(null);
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "1";
  const [banner, setBanner] = useState<string | null>(
    isNew ? "Skill published successfully!" : null,
  );

  useEffect(() => {
    setSkills(initialSkills);
  }, [initialSkills]);

  useEffect(() => {
    if (!banner) return;
    const timer = setTimeout(() => setBanner(null), 60_000);
    return () => clearTimeout(timer);
  }, [banner]);

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    const skillId = deleteTarget.id;
    setDeleteTarget(null);

    // Optimistic removal
    setSkills((prev) => prev.filter((s) => s.id !== skillId));

    const res = await fetch(`/api/skills/${skillId}`, { method: "DELETE" });
    if (!res.ok) {
      setSkills(initialSkills);
    }
  }, [deleteTarget, initialSkills]);

  return (
    <>
      {deleteTarget && (
        <DeleteModal
          skillTitle={deleteTarget.title}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {banner && (
        <div className="mb-4 flex items-center gap-3 border border-[var(--green)] bg-[#059669]/5 px-4 py-3">
          <span className="font-mono text-xs text-[var(--green)]">
            {banner}
          </span>
          <button
            type="button"
            onClick={() => setBanner(null)}
            className="ml-auto shrink-0 font-mono text-[10px] text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            ×
          </button>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[11px] text-[var(--muted)]">
          {skills.length}/20 skills
        </p>
        <Link
          href="/publish/new"
          className="bg-[var(--accent)] px-4 py-2 font-mono text-xs font-bold text-white transition-colors hover:bg-[#c5303b]"
        >
          + NEW SKILL
        </Link>
      </div>

      {skills.length === 0 ? (
        <div className="border border-dashed border-[var(--border)] px-6 py-16 text-center">
          <p className="font-mono text-sm text-[var(--muted)]">
            No skills published yet.
          </p>
          <Link
            href="/publish/new"
            className="mt-4 inline-block bg-[var(--accent)] px-5 py-2.5 font-mono text-xs font-bold text-white transition-colors hover:bg-[#c5303b]"
          >
            PUBLISH YOUR FIRST SKILL
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-[var(--border)] border border-[var(--border)]">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <Link href={`/publish/${skill.id}`} className="min-w-0 flex-1">
                <p className="truncate font-mono text-sm font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--accent)]">
                  {skill.title}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-[var(--muted)]">
                  {skill.installCommand ? (
                    <span className="text-[var(--green)]">{skill.installCommand}</span>
                  ) : (
                    <>{skill.type === "text" ? "Text" : "Folder"} &middot;{" "}
                    {(skill.totalSize / 1024).toFixed(1)} KB</>
                  )}
                  {" "}&middot; {new Date(skill.createdAt).toLocaleDateString()}
                </p>
              </Link>
              <button
                type="button"
                onClick={() => setDeleteTarget(skill)}
                className="shrink-0 font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                DELETE
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
