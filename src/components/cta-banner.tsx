"use client";

import { useState } from "react";

import { SubscribeForm } from "./subscribe-form";

const GITHUB_URL = "https://github.com/bra1nDump/skillpack/";
const INSTALL_CMD = "npx skills add bra1nDump/skillpack";

/**
 * CTA banner with 3 actions: Install, Subscribe, Star on GitHub.
*/

export function CtaBanner() {
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const installButton = (
    <button
      type="button"
      onClick={copyInstall}
      className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-[var(--accent)] bg-[var(--accent)]/10 px-3 py-2.5 font-mono text-[9px] font-bold tracking-wider text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white sm:w-auto sm:px-4 sm:text-[11px]"
    >
      <span className="text-[var(--accent)] group-hover:text-white">$</span>
      {copied ? "COPIED!" : INSTALL_CMD}
    </button>
  );

  const starButton = (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noreferrer"
      className="flex w-full items-center justify-center gap-1.5 rounded border border-[#555] px-3 py-2.5 font-mono text-[10px] font-bold tracking-wider text-white transition-colors hover:border-white hover:bg-[#222] sm:w-auto sm:px-4 sm:text-[11px]"
    >
      ★ STAR ON GITHUB
    </a>
  );

  return (
    <div className="border-t border-[#262626] px-2 pb-5 pt-8 text-white sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
        <div className="hidden sm:block">
          <p className="text-[14px] font-bold">Try SkillPack</p>
          <p className="mt-0.5 text-[12px] text-gray-500">
            One command. Best solutions. Installed.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          {installButton}
          {starButton}
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2 border-t border-[#262626] pt-4 sm:flex-row sm:items-center sm:gap-3">
        <span className="text-[11px] text-gray-500">Stay updated:</span>
        <SubscribeForm variant="dark" />
      </div>
    </div>
  );
}
