/* eslint-disable no-console */
/**
 * Collect npm/PyPI weekly download counts for skills and update catalog.ts.
 * Usage: node scripts/collect-downloads.mjs
 */
import fs from "node:fs";
import path from "node:path";

const CATALOG_PATH = path.resolve("src/lib/catalog.ts");
const CURRENT_MONTH = new Date().toISOString().slice(0, 7); // "YYYY-MM"

/**
 * Extract skill slugs with npmPackage or pypiPackage fields from catalog.ts.
 * Returns array of { slug, npmPackage?, pypiPackage? }.
 */
function extractSkillPackages() {
  const lines = fs.readFileSync(CATALOG_PATH, "utf-8").split("\n");
  const skills = [];
  let currentSlug = null;
  let currentNpm = null;
  let currentPypi = null;

  for (const line of lines) {
    const slugMatch = line.match(/slug:\s*"([^"]+)"/);

    if (slugMatch) {
      // Save previous skill if it had packages
      if (currentSlug && (currentNpm || currentPypi)) {
        skills.push({ slug: currentSlug, npmPackage: currentNpm, pypiPackage: currentPypi });
      }

      currentSlug = slugMatch[1];
      currentNpm = null;
      currentPypi = null;
    }

    const npmMatch = line.match(/^\s*npmPackage:\s*"([^"]+)"/);

    if (npmMatch) currentNpm = npmMatch[1];

    const pypiMatch = line.match(/^\s*pypiPackage:\s*"([^"]+)"/);

    if (pypiMatch) currentPypi = pypiMatch[1];
  }

  // Don't forget the last skill
  if (currentSlug && (currentNpm || currentPypi)) {
    skills.push({ slug: currentSlug, npmPackage: currentNpm, pypiPackage: currentPypi });
  }

  return skills;
}

/**
 * Fetch weekly download count from npm.
 */
async function fetchNpmDownloads(pkg) {
  const res = await fetch(`https://api.npmjs.org/downloads/point/last-week/${pkg}`, {
    headers: { "User-Agent": "skillbench-metrics/1.0" },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  return data.downloads;
}

/**
 * Fetch weekly download count from PyPI.
 */
async function fetchPypiDownloads(pkg) {
  const res = await fetch(`https://pypistats.org/api/packages/${pkg}/recent`, {
    headers: { "User-Agent": "skillbench-metrics/1.0" },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  return data.data.last_week;
}

/**
 * Format download count for display.
 */
function formatDisplayDownloads(n) {
  if (n >= 10000) return `${Math.round(n / 1000)}K+`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K+`;
  return String(n);
}

/**
 * Update catalog.ts with new download data for a skill.
 * Appends to (or creates) metrics.downloads[] array.
 * Returns updated source text.
 */
function updateSkillDownloads(source, slug, downloads) {
  const slugPattern = new RegExp(`slug:\\s*"${slug}"`);
  const slugIndex = source.search(slugPattern);

  if (slugIndex === -1) {
    console.warn(`  Warning: Could not find slug "${slug}" in catalog.ts`);
    return source;
  }

  // Find the boundaries of this skill block
  const afterSlug = source.slice(slugIndex);
  const nextSlugMatch = afterSlug.slice(50).search(/slug:\s*"/);
  const blockEnd = nextSlugMatch !== -1 ? slugIndex + 50 + nextSlugMatch : source.length;
  const block = source.slice(slugIndex, blockEnd);

  let updatedBlock = block;

  // Check if metrics.downloads already exists
  const downloadsRegex = /metrics:\s*\{[\s\S]*?downloads:\s*\[([\s\S]*?)\]/;
  const downloadsMatch = updatedBlock.match(downloadsRegex);

  if (downloadsMatch) {
    // Skill already has metrics.downloads — check if current month exists
    const downloadsArrayContent = downloadsMatch[1];
    const monthPattern = new RegExp(
      `\\{\\s*date:\\s*"${CURRENT_MONTH}",\\s*value:\\s*\\d+\\s*\\}`,
    );

    if (monthPattern.test(downloadsArrayContent)) {
      // Replace existing month entry
      updatedBlock = updatedBlock.replace(
        monthPattern,
        `{ date: "${CURRENT_MONTH}", value: ${downloads} }`,
      );
    } else {
      // Append new entry before the closing ]
      const lastEntry = downloadsArrayContent.trim();
      const needsComma = lastEntry.length > 0 && !lastEntry.endsWith(",");
      const indent = "        ";
      const insertion = `${needsComma ? "," : ""}\n${indent}{ date: "${CURRENT_MONTH}", value: ${downloads} }`;

      // Find the ] that closes the downloads array
      const downloadsArrayStart = updatedBlock.indexOf("downloads: [");
      const closingBracket = updatedBlock.indexOf(
        "]",
        downloadsArrayStart + downloadsArrayContent.length,
      );

      updatedBlock =
        updatedBlock.slice(0, closingBracket) +
        insertion +
        "\n      " +
        updatedBlock.slice(closingBracket);
    }
  } else {
    // No downloads array — check if metrics block exists
    const metricsRegex = /metrics:\s*\{/;
    const metricsMatch = updatedBlock.match(metricsRegex);

    if (metricsMatch) {
      // metrics block exists but no downloads array — insert downloads after opening {
      const metricsStart = updatedBlock.indexOf(metricsMatch[0]);
      const insertPoint = metricsStart + metricsMatch[0].length;
      const downloadsArray = `\n      downloads: [\n        { date: "${CURRENT_MONTH}", value: ${downloads} },\n      ],`;

      updatedBlock =
        updatedBlock.slice(0, insertPoint) + downloadsArray + updatedBlock.slice(insertPoint);
    } else {
      // No metrics block at all — insert one before the closing of the skill object
      // Look for a good insertion point: after the last known field before evidence/closing
      const npmLine = updatedBlock.match(/npmPackage:\s*"[^"]*",?\n/);
      const pypiLine = updatedBlock.match(/pypiPackage:\s*"[^"]*",?\n/);
      const starsLine = updatedBlock.match(/githubStars:\s*"[^"]*",?\n/);

      const anchor = starsLine || npmLine || pypiLine;

      if (anchor) {
        const insertPoint = updatedBlock.indexOf(anchor[0]) + anchor[0].length;
        const metricsBlock = `    metrics: {\n      downloads: [\n        { date: "${CURRENT_MONTH}", value: ${downloads} },\n      ],\n    },\n`;

        updatedBlock =
          updatedBlock.slice(0, insertPoint) + metricsBlock + updatedBlock.slice(insertPoint);
      }
    }
  }

  return source.slice(0, slugIndex) + updatedBlock + source.slice(blockEnd);
}

/**
 * Delay helper.
 */
function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const skills = extractSkillPackages();

  if (skills.length === 0) {
    console.error("No skills with npmPackage or pypiPackage found in catalog.ts");
    process.exit(1);
  }

  console.log(`Found ${skills.length} skills with package info. Fetching download counts...\n`);

  let source = fs.readFileSync(CATALOG_PATH, "utf-8");
  let success = 0;
  let failed = 0;

  for (const { slug, npmPackage, pypiPackage } of skills) {
    // Fetch npm downloads
    if (npmPackage) {
      try {
        const downloads = await fetchNpmDownloads(npmPackage);

        source = updateSkillDownloads(source, slug, downloads);
        console.log(`[npm] ${npmPackage} → ${downloads.toLocaleString()} downloads/week`);
        success++;
      } catch (err) {
        console.warn(`[npm] ${npmPackage}: ${err.message}`);
        failed++;
      }

      await delay(200);
    }

    // Fetch PyPI downloads
    if (pypiPackage) {
      try {
        const downloads = await fetchPypiDownloads(pypiPackage);

        source = updateSkillDownloads(source, slug, downloads);
        console.log(`[pypi] ${pypiPackage} → ${downloads.toLocaleString()} downloads/week`);
        success++;
      } catch (err) {
        console.warn(`[pypi] ${pypiPackage}: ${err.message}`);
        failed++;
      }

      await delay(200);
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
