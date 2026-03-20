"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function parseOwnerRepo(repoUrl: string): string {
  const cleaned = repoUrl.trim().replace(/\/+$/, "");
  if (cleaned.includes("github.com")) {
    const parts = cleaned.split("github.com/")[1]?.split("/") ?? [];
    if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
  }
  const parts = cleaned.split("/").filter(Boolean);
  if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
  return "";
}

export default function NewSkillPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [skillName, setSkillName] = useState("");
  const [useDefaultPath, setUseDefaultPath] = useState(true);
  const [customPath, setCustomPath] = useState("");
  const [useDefaultInstall, setUseDefaultInstall] = useState(true);
  const [customInstall, setCustomInstall] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  const ownerRepo = parseOwnerRepo(repoUrl);
  const slug = skillName.trim().toLowerCase().replace(/\s+/g, "-");

  const filePath = useDefaultPath
    ? `.agents/skills/${slug || "my-skill"}/SKILL.md`
    : customPath;

  const installCommand = useDefaultInstall
    ? ownerRepo ? `npx skills add ${ownerRepo}` : ""
    : customInstall;

  async function handleFetchPreview() {
    setError("");
    setPreview(null);

    if (!repoUrl.trim()) {
      setError("Repository URL is required");
      return;
    }
    if (!filePath.trim()) {
      setError("File path is required");
      return;
    }

    setFetching(true);
    try {
      const res = await fetch("/api/skills/fetch-repo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: repoUrl.trim(), filePath }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch file");
      setPreview(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setFetching(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim()) { setError("Title is required"); return; }
    if (!repoUrl.trim()) { setError("Repository URL is required"); return; }

    setSubmitting(true);
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          repoUrl: repoUrl.trim(),
          filePath,
          installCommand: installCommand.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create skill");
      }
      window.location.href = "/publish?new=1";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  const inputClass = "block w-full border border-[var(--border)] bg-white px-4 py-2.5 font-mono text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)]";
  const labelClass = "mb-1 block font-mono text-xs font-bold uppercase tracking-wider text-[var(--muted)]";

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-8">
      <h1 className="mb-1 font-mono text-xl font-bold text-[var(--foreground)]">
        Publish a Skill
      </h1>
      <p className="mb-8 text-sm text-[var(--muted)]">
        Link a GitHub repository containing your SKILL.md.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <label className={labelClass}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. My Testing Skill"
          className={`${inputClass} mb-6`}
        />

        {/* Repository URL */}
        <label className={labelClass}>Repository URL</label>
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/user/repo"
          className={`${inputClass} mb-6`}
        />

        {/* Skill name */}
        <label className={labelClass}>Skill name</label>
        <input
          type="text"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          placeholder="e.g. my-skill"
          className={`${inputClass} mb-4`}
        />

        {/* File path — toggle */}
        <div className="mb-6 border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] text-[var(--muted)]">
              SKILL.md path
            </p>
            <button
              type="button"
              onClick={() => {
                setUseDefaultPath(!useDefaultPath);
                if (useDefaultPath) setCustomPath(filePath);
              }}
              className="font-mono text-[10px] font-bold text-[var(--accent)]"
            >
              {useDefaultPath ? "CUSTOMIZE" : "USE DEFAULT"}
            </button>
          </div>
          {useDefaultPath ? (
            <p className="mt-1 font-mono text-xs text-[var(--foreground)]">{filePath}</p>
          ) : (
            <input
              type="text"
              value={customPath}
              onChange={(e) => setCustomPath(e.target.value)}
              className="mt-1 block w-full border border-[var(--border)] bg-white px-3 py-1.5 font-mono text-xs text-[var(--foreground)] outline-none focus:border-[var(--accent)]"
            />
          )}
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={handleFetchPreview}
              disabled={fetching || !repoUrl.trim()}
              className="font-mono text-[11px] font-bold text-[var(--accent)] transition-opacity hover:opacity-80 disabled:opacity-30"
            >
              {fetching ? "FETCHING..." : "PREVIEW"}
            </button>
          </div>
        </div>

        {/* Install command — toggle */}
        <div className="mb-6 border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] text-[var(--muted)]">
              Install command
            </p>
            <button
              type="button"
              onClick={() => {
                setUseDefaultInstall(!useDefaultInstall);
                if (useDefaultInstall) setCustomInstall(installCommand);
              }}
              className="font-mono text-[10px] font-bold text-[var(--accent)]"
            >
              {useDefaultInstall ? "CUSTOMIZE" : "USE DEFAULT"}
            </button>
          </div>
          {useDefaultInstall ? (
            <p className="mt-1 font-mono text-xs text-[var(--foreground)]">
              {installCommand || <span className="text-[var(--muted)] italic">enter repo URL to generate</span>}
            </p>
          ) : (
            <input
              type="text"
              value={customInstall}
              onChange={(e) => setCustomInstall(e.target.value)}
              placeholder="npx skills add owner/repo"
              className="mt-1 block w-full border border-[var(--border)] bg-white px-3 py-1.5 font-mono text-xs text-[var(--foreground)] outline-none focus:border-[var(--accent)]"
            />
          )}
        </div>

        {/* Preview */}
        {preview !== null && (
          <div className="mb-6">
            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--green)]">
              Preview — fetched from repository
            </p>
            <pre className="max-h-[40vh] overflow-auto border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-sm leading-relaxed text-[var(--foreground)]">
              {preview}
            </pre>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mb-4 font-mono text-xs text-[var(--accent)]">{error}</p>
        )}

        {/* Submit */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/publish")}
            className="font-mono text-xs text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            &larr; Back
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="bg-[var(--accent)] px-6 py-2.5 font-mono text-xs font-bold text-white transition-colors hover:bg-[#c5303b] disabled:opacity-50"
          >
            {submitting ? "PUBLISHING..." : "PUBLISH"}
          </button>
        </div>
      </form>
    </div>
  );
}
