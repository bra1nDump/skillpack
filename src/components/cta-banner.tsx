"use client";

import { useState } from "react";

import { SubscribeForm } from "./subscribe-form";

const GITHUB_URL = "https://github.com/bra1nDump/skillpack/";
const INSTALL_CMD = "npx skills add bra1nDump/skillpack";

/**
 * CTA banner with 3 actions: Install, Subscribe, Star on GitHub.
*/

export function CtaBanner({
  variant = 1,
}: {
  variant?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}) {
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

  // Variant 1: Horizontal strip — Install | Subscribe | Star
  if (variant === 1) {
    return (
      <div className="flex flex-col items-center gap-3 bg-[var(--dark-bg)] px-6 py-5 sm:flex-row sm:justify-center">
        {installButton}
        <SubscribeForm variant="dark" />
        {starButton}
      </div>
    );
  }

  // Variant 2: Centered stack with headline
  if (variant === 2) {
    return (
      <div className="bg-[var(--dark-bg)] px-6 py-6 text-center text-white">
        <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
          Get started
        </p>
        <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {installButton}
          {starButton}
        </div>
        <div className="mt-3 flex justify-center">
          <SubscribeForm variant="dark" />
        </div>
      </div>
    );
  }

  // Variant 3: Two-column — left: install cmd + star, right: subscribe
  if (variant === 3) {
    return (
      <div className="flex flex-col gap-4 bg-[var(--dark-bg)] px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {installButton}
          {starButton}
        </div>
        <SubscribeForm variant="dark" />
      </div>
    );
  }

  // Variant 4: Compact inline — just install cmd is the hero, rest is secondary
  if (variant === 4) {
    return (
      <div className="bg-[var(--dark-bg)] px-6 py-4 text-white">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
          {installButton}
          <span className="hidden text-[#333] sm:inline">|</span>
          <SubscribeForm variant="dark" />
          <span className="hidden text-[#333] sm:inline">|</span>
          {starButton}
        </div>
      </div>
    );
  }

  // Variant 5: Inline — same bg as hero, no card border
  if (variant === 5) {
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

  // Variant 6: Minimal — just the install command, others as text links
  if (variant === 6) {
    return (
      <div className="flex flex-col items-center gap-2 bg-[var(--dark-bg)] px-6 py-5 text-white">
        {installButton}
        <div className="flex items-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] text-gray-500 transition-colors hover:text-white"
          >
            ★ Star on GitHub
          </a>
          <span className="text-[#333]">·</span>
          <SubscribeForm variant="dark" />
        </div>
      </div>
    );
  }

  // Variant 7: Full-width gradient accent bar
  if (variant === 7) {
    return (
      <div className="bg-gradient-to-r from-[var(--dark-bg)] via-[#0a0a0a] to-[var(--dark-bg)] px-6 py-5">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {installButton}
          <div className="h-6 w-px bg-[#333] max-sm:hidden" />
          <SubscribeForm variant="dark" />
          <div className="h-6 w-px bg-[#333] max-sm:hidden" />
          {starButton}
        </div>
      </div>
    );
  }

  // Variant 8: Three equal columns
  if (variant === 8) {
    return (
      <div className="grid gap-4 bg-[var(--dark-bg)] px-6 py-5 text-white sm:grid-cols-3">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
            Install
          </span>
          {installButton}
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
            Subscribe
          </span>
          <SubscribeForm variant="dark" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
            Support
          </span>
          {starButton}
        </div>
      </div>
    );
  }

  // Variant 9: Left-aligned with description
  if (variant === 9) {
    return (
      <div className="flex flex-col gap-4 bg-[var(--dark-bg)] px-8 py-6 text-white sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold">
            One command. Best solutions for your stack.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          {installButton}
          <SubscribeForm variant="dark" />
          {starButton}
        </div>
      </div>
    );
  }

  // Variant 10: Stacked centered — install is BIG, rest below
  return (
    <div className="flex flex-col items-center gap-4 bg-[var(--dark-bg)] px-6 py-6 text-white">
      <button
        type="button"
        onClick={copyInstall}
        className="group flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--accent)] bg-[var(--accent)]/10 px-6 py-3.5 font-mono text-[13px] font-bold tracking-wider text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white"
      >
        <span className="text-[var(--accent)] group-hover:text-white">$</span>
        {copied ? "COPIED!" : INSTALL_CMD}
      </button>
      <div className="flex items-center gap-4">
        <SubscribeForm variant="dark" />
        {starButton}
      </div>
    </div>
  );
}
