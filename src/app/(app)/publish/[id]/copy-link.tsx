"use client";

import { useState } from "react";

export function CopyLinkButton({
  text,
  label = "COPY",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="bg-[var(--accent)] px-3 py-1.5 font-mono text-[10px] font-bold text-white transition-colors hover:bg-[#c5303b]"
    >
      {copied ? "COPIED!" : label}
    </button>
  );
}
