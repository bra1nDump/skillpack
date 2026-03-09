"use client";

import { useState } from "react";

type CopyButtonProps = {
  text: string;
  label?: string;
  className?: string;
};

export function CopyButton({
  text,
  label = "Copy",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center rounded-[2px] border border-black/10 bg-transparent px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600 transition hover:border-black/20 hover:text-black ${className}`}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
