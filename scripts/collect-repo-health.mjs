/* eslint-disable no-console */
/**
 * Collect repository health signals for all skills.
 * Fetches: pushed_at, open_issues_count, forks_count, archived, contributor count.
 * Usage: node scripts/collect-repo-health.mjs
 */
import fs from "node:fs";
import path from "node:path";

// Load .env if present
try {
  const envPath = path.resolve(".env");

  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
      const m = line.match(/^([A-Z_]+)=(.+)$/);

      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  }
} catch {}

const CATALOG_PATH = path.resolve("src/lib/catalog.ts");
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function extractSkillRepos() {
  const lines = fs.readFileSync(CATALOG_PATH, "utf-8").split("\n");
  const skills = [];
  let currentSlug = null;

  for (const line of lines) {
    const slugMatch = line.match(/slug:\s*"([^"]+)"/);

    if (slugMatch) currentSlug = slugMatch[1];

    const repoMatch = line.match(/^\s*repo:\s*"([^"]+)"/);

    if (repoMatch && currentSlug) {
      skills.push({ slug: currentSlug, repo: repoMatch[1] });
      currentSlug = null;
    }
  }

  return skills;
}

function makeHeaders() {
  const headers = { "User-Agent": "skillbench-metrics/1.0" };

  if (GITHUB_TOKEN) headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  return headers;
}

async function fetchRepoHealth(repo) {
  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: makeHeaders(),
  });

  if (!res.ok) {
    const rateRemaining = res.headers.get("x-ratelimit-remaining");

    throw new Error(`HTTP ${res.status} (rate-limit remaining: ${rateRemaining})`);
  }
  const data = await res.json();

  const lastPushAt = data.pushed_at;
  const lastPushDays = Math.floor(
    (Date.now() - new Date(lastPushAt).getTime()) / (1000 * 60 * 60 * 24),
  );

  return {
    lastPushAt,
    lastPushDays,
    openIssues: data.open_issues_count,
    forks: data.forks_count,
    archived: data.archived || false,
  };
}

async function fetchContributorCount(repo) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/contributors?per_page=1&anon=true`,
      { headers: makeHeaders() },
    );

    if (!res.ok) return null;

    // Parse Link header for last page = total count
    const link = res.headers.get("link");

    if (link) {
      const lastMatch = link.match(/page=(\d+)>;\s*rel="last"/);

      if (lastMatch) return parseInt(lastMatch[1], 10);
    }

    // No pagination = single page, count the results
    const data = await res.json();

    return Array.isArray(data) ? data.length : null;
  } catch {
    return null;
  }
}

function updateSkillHealth(source, slug, health) {
  const slugPattern = new RegExp(`slug:\\s*"${slug}"`);
  const slugIndex = source.search(slugPattern);

  if (slugIndex === -1) {
    console.warn(`  ⚠ Could not find slug "${slug}" in catalog.ts`);
    return source;
  }

  const afterSlug = source.slice(slugIndex);
  const nextSlugMatch = afterSlug.slice(50).search(/slug:\s*"/);
  const blockEnd = nextSlugMatch !== -1 ? slugIndex + 50 + nextSlugMatch : source.length;
  let block = source.slice(slugIndex, blockEnd);

  const contribStr = health.contributors != null ? `, contributors: ${health.contributors}` : "";
  const newValue = `repoHealth: { lastPushAt: "${health.lastPushAt}", lastPushDays: ${health.lastPushDays}, openIssues: ${health.openIssues}, forks: ${health.forks}, archived: ${health.archived}${contribStr} }`;

  // Check if repoHealth already exists
  const existingPattern = /repoHealth:\s*\{[^}]*\}/;

  if (existingPattern.test(block)) {
    block = block.replace(existingPattern, newValue);
  } else {
    // Insert before metrics or before strengths
    const insertBefore = block.search(/\s+metrics:\s*\{/);

    if (insertBefore !== -1) {
      block = block.slice(0, insertBefore) + `\n    ${newValue},` + block.slice(insertBefore);
    } else {
      const strengthsIdx = block.search(/\s+strengths:\s*\[/);

      if (strengthsIdx !== -1) {
        block = block.slice(0, strengthsIdx) + `\n    ${newValue},` + block.slice(strengthsIdx);
      }
    }
  }

  return source.slice(0, slugIndex) + block + source.slice(blockEnd);
}

async function main() {
  const skills = extractSkillRepos();

  if (skills.length === 0) {
    console.error("No skills found in catalog.ts");
    process.exit(1);
  }

  console.log(`Found ${skills.length} skills. Fetching repo health...`);
  if (GITHUB_TOKEN) {
    console.log("Using GITHUB_TOKEN for authentication\n");
  } else {
    console.log("No GITHUB_TOKEN — using unauthenticated API (60 req/hr)\n");
  }

  let source = fs.readFileSync(CATALOG_PATH, "utf-8");
  let success = 0;
  let failed = 0;

  for (const { slug, repo } of skills) {
    try {
      const health = await fetchRepoHealth(repo);
      const contributors = await fetchContributorCount(repo);

      health.contributors = contributors;

      source = updateSkillHealth(source, slug, health);

      const freshLabel = health.lastPushDays < 7 ? "🟢" : health.lastPushDays < 30 ? "🟡" : "🔴";

      console.log(
        `  ✓ ${slug}: ${freshLabel} ${health.lastPushDays}d ago, ${health.openIssues} issues, ${health.forks} forks${contributors ? `, ${contributors} contributors` : ""}${health.archived ? " [ARCHIVED]" : ""}`,
      );
      success++;

      if (!GITHUB_TOKEN) {
        await new Promise((r) => setTimeout(r, 200));
      }
    } catch (err) {
      console.error(`  ✗ ${slug} (${repo}): ${err.message}`);
      failed++;
    }
  }

  if (success > 0) {
    fs.writeFileSync(CATALOG_PATH, source, "utf-8");
    console.log(`\nDone: ${success} updated, ${failed} failed.`);
  } else {
    console.log("\nNo skills were updated.");
  }
}

main().catch(console.error);
