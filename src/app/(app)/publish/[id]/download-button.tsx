"use client";

export function DownloadButton({
  content,
  filename,
}: {
  content: string;
  filename: string;
}) {
  function handleDownload() {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="border border-[var(--border)] px-4 py-2 font-mono text-xs text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
    >
      DOWNLOAD .MD
    </button>
  );
}
