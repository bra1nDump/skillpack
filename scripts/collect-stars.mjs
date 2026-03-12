/* eslint-disable no-console */
/**
 * Collect GitHub star counts for all skills and update catalog.ts.
 * Usage: npm run metrics:collect
 * Optional: GITHUB_TOKEN=ghp_... npm run metrics:collect
 */
import fs from "node:fs";
import path from "node:path";

const CATALOG_PATH = path.resolve("src/lib/catalog.ts");
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const CURRENT_MONTH = new Date().toISOString().slice(0, 7); // "YYYY-MM"

/**
 * Extract skill slugs and GitHub repo paths from catalog.ts.
 * Returns array of { slug, repo }.
 */
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

/**
 * Fetch star count from GitHub API.
 */
async function fetchStars(repo) {
  const headers = { "User-Agent": "skillbench-metrics/1.0" };

  if (GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  }

  const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });

  if (!res.ok) {
    const rateRemaining = res.headers.get("x-ratelimit-remaining");

    throw new Error(`HTTP ${res.status} (rate-limit remaining: ${rateRemaining})`);
  }

  const data = await res.json();

  return data.stargazers_count;
}

/**
 * Format star count for display (matches parse-stars.ts formatStars logic).
 */
function formatDisplayStars(n) {
  if (n >= 10000) return `${Math.round(n / 1000)}K+`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K+`;
  return String(n);
}

/**
 * Update catalog.ts with new star data for a skill.
 * Returns updated source text.
 */
function updateSkillStars(source, slug, stars) {
  // Find the skill block: starts with slug: "..." and continues until next top-level key or end
  const slugPattern = new RegExp(`slug:\\s*"${slug}"`);
  const slugIndex = source.search(slugPattern);

  if (slugIndex === -1) {
    console.warn(`  ⚠ Could not find slug "${slug}" in catalog.ts`);
    return source;
  }

  // Find the boundaries of this skill block
  // Look for the next skill slug or end of the skills record
  const afterSlug = source.slice(slugIndex);
  const nextSlugMatch = afterSlug.slice(50).search(/slug:\s*"/);
  const blockEnd = nextSlugMatch !== -1 ? slugIndex + 50 + nextSlugMatch : source.length;
  const block = source.slice(slugIndex, blockEnd);

  let updatedBlock = block;

  // 1. Update githubStars display string
  const displayValue = formatDisplayStars(stars);
  const starsLineRegex = /githubStars:\s*"[^"]*"/;

  if (starsLineRegex.test(updatedBlock)) {
    updatedBlock = updatedBlock.replace(starsLineRegex, `githubStars: "${displayValue}"`);
  }

  // 2. Update metrics.stars array
  const metricsRegex = /metrics:\s*\{[\s\S]*?stars:\s*\[([\s\S]*?)\]/;
  const metricsMatch = updatedBlock.match(metricsRegex);

  if (metricsMatch) {
    // Skill already has metrics.stars — check if current month exists
    const starsArrayContent = metricsMatch[1];
    const monthPattern = new RegExp(`\\{\\s*date:\\s*"${CURRENT_MONTH}",\\s*value:\\s*\\d+\\s*\\}`);

    if (monthPattern.test(starsArrayContent)) {
      // Replace existing month entry
      updatedBlock = updatedBlock.replace(
        monthPattern,
        `{ date: "${CURRENT_MONTH}", value: ${stars} }`,
      );
    } else {
      // Append new entry before the closing ]
      const lastEntry = starsArrayContent.trim();
      const needsComma = lastEntry.length > 0 && !lastEntry.endsWith(",");
      const indent = "        ";
      const insertion = `${needsComma ? "," : ""}\n${indent}{ date: "${CURRENT_MONTH}", value: ${stars} }`;

      // Find the ] that closes the stars array
      const starsArrayStart = updatedBlock.indexOf("stars: [");
      const closingBracket = updatedBlock.indexOf("]", starsArrayStart + starsArrayContent.length);

      updatedBlock =
        updatedBlock.slice(0, closingBracket) +
        insertion +
        "\n      " +
        updatedBlock.slice(closingBracket);
    }
  } else {
    // No metrics block — insert one after githubStars line
    const starsLineMatch = updatedBlock.match(/githubStars:\s*"[^"]*",?\n/);

    if (starsLineMatch) {
      const insertPoint = updatedBlock.indexOf(starsLineMatch[0]) + starsLineMatch[0].length;
      const metricsBlock = `    metrics: {\n      stars: [\n        { date: "${CURRENT_MONTH}", value: ${stars} },\n      ],\n    },\n`;

      updatedBlock =
        updatedBlock.slice(0, insertPoint) +
        metricsBlock +
        updatedBlock.slice(insertPoint);
    }
  }

  return source.slice(0, slugIndex) + updatedBlock + source.slice(blockEnd);
}

async function main() {
  const skills = extractSkillRepos();

  if (skills.length === 0) {
    console.error("No skills found in catalog.ts");
    process.exit(1);
  }

  console.log(`Found ${skills.length} skills. Fetching GitHub stars...`);

  if (GITHUB_TOKEN) {
    console.log("Using GITHUB_TOKEN for authentication (5000 req/hr)\n");
  } else {
    console.log("No GITHUB_TOKEN set — using unauthenticated API (60 req/hr)\n");
  }

  let source = fs.readFileSync(CATALOG_PATH, "utf-8");
  let success = 0;
  let failed = 0;

  for (const { slug, repo } of skills) {
    try {
      const stars = await fetchStars(repo);
      const oldMatch = source.match(new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?githubStars:\\s*"([^"]*)"`));
      const oldDisplay = oldMatch ? oldMatch[1] : "N/A";
      const newDisplay = formatDisplayStars(stars);

      source = updateSkillStars(source, slug, stars);
      console.log(`  ✓ ${slug}: ${oldDisplay} → ${newDisplay} (${stars.toLocaleString()} stars)`);
      success++;

      // Rate limit courtesy delay (100ms)
      if (!GITHUB_TOKEN) {
        await new Promise((r) => setTimeout(r, 100));
      }
    } catch (err) {
      console.error(`  ✗ ${slug} (${repo}): ${err.message}`);
      failed++;
    }
  }

  if (success > 0) {
    fs.writeFileSync(CATALOG_PATH, source, "utf-8");
    console.log(`\nDone: ${success} updated, ${failed} failed.`);
    console.log("catalog.ts has been updated.");
  } else {
    console.log("\nNo skills were updated.");
  }
}

main().catch(console.error);
