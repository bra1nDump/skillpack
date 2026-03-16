/* eslint-disable no-console */
/**
 * Collect HN mention counts for all skills and update catalog.ts.
 * Queries HN Algolia API for stories mentioning each skill (last 7 days, >5 pts).
 * Usage: node scripts/collect-mentions.mjs
 */
import fs from "node:fs";
import path from "node:path";

const CATALOG_PATH = path.resolve("src/lib/catalog.ts");
const CURRENT_MONTH = new Date().toISOString().slice(0, 7); // "YYYY-MM"
const SEVEN_DAYS_AGO = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;

/**
 * Extract skill slugs and names from catalog.ts.
 * Returns array of { slug, name }.
 */
function extractSkillNames() {
  const lines = fs.readFileSync(CATALOG_PATH, "utf-8").split("\n");
  const skills = [];
  let currentSlug = null;

  for (const line of lines) {
    const slugMatch = line.match(/slug:\s*"([^"]+)"/);

    if (slugMatch) currentSlug = slugMatch[1];

    const nameMatch = line.match(/^\s*name:\s*"([^"]+)"/);

    if (nameMatch && currentSlug) {
      skills.push({ slug: currentSlug, name: nameMatch[1] });
      currentSlug = null;
    }
  }

  return skills;
}

/**
 * Fetch HN mention count from Algolia API.
 * Returns nbHits for stories matching the skill name in the last 7 days with >5 points.
 */
async function fetchMentions(skillName) {
  const query = encodeURIComponent(skillName);
  const url =
    `https://hn.algolia.com/api/v1/search?query=${query}` +
    `&tags=story` +
    `&numericFilters=created_at_i>${SEVEN_DAYS_AGO},points>5` +
    `&hitsPerPage=0`;

  const res = await fetch(url, {
    headers: { "User-Agent": "skillbench-metrics/1.0" },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  return data.nbHits;
}

/**
 * Update catalog.ts with new mentionsPositive data for a skill.
 * Returns updated source text.
 */
function updateSkillMentions(source, slug, count) {
  const slugPattern = new RegExp(`slug:\\s*"${slug}"`);
  const slugIndex = source.search(slugPattern);

  if (slugIndex === -1) {
    console.warn(`  ⚠ Could not find slug "${slug}" in catalog.ts`);
    return source;
  }

  // Find the boundaries of this skill block
  const afterSlug = source.slice(slugIndex);
  const nextSlugMatch = afterSlug.slice(50).search(/slug:\s*"/);
  const blockEnd = nextSlugMatch !== -1 ? slugIndex + 50 + nextSlugMatch : source.length;
  const block = source.slice(slugIndex, blockEnd);

  let updatedBlock = block;

  // Check if mentionsPositive array already exists
  const mentionsRegex = /mentionsPositive:\s*\[([\s\S]*?)\]/;
  const mentionsMatch = updatedBlock.match(mentionsRegex);

  if (mentionsMatch) {
    // mentionsPositive array exists — check if current month is there
    const arrayContent = mentionsMatch[1];
    const monthPattern = new RegExp(
      `\\{\\s*date:\\s*"${CURRENT_MONTH}",\\s*value:\\s*\\d+\\s*\\}`,
    );

    if (monthPattern.test(arrayContent)) {
      // Replace existing month entry
      updatedBlock = updatedBlock.replace(
        monthPattern,
        `{ date: "${CURRENT_MONTH}", value: ${count} }`,
      );
    } else {
      // Append new entry before the closing ]
      const lastEntry = arrayContent.trim();
      const needsComma = lastEntry.length > 0 && !lastEntry.endsWith(",");
      const indent = "        ";
      const insertion = `${needsComma ? "," : ""}\n${indent}{ date: "${CURRENT_MONTH}", value: ${count} }`;

      const arrayStart = updatedBlock.indexOf("mentionsPositive: [");
      const closingBracket = updatedBlock.indexOf("]", arrayStart + arrayContent.length);

      updatedBlock =
        updatedBlock.slice(0, closingBracket) +
        insertion +
        "\n      " +
        updatedBlock.slice(closingBracket);
    }
  } else {
    // No mentionsPositive — check if metrics block exists
    const metricsBlockRegex = /metrics:\s*\{/;
    const metricsMatch = updatedBlock.match(metricsBlockRegex);

    if (metricsMatch) {
      // metrics block exists — find its closing } and insert mentionsPositive before it
      const metricsStart = updatedBlock.indexOf(metricsMatch[0]);
      // Find the closing brace of metrics: look for "\n    }," or "\n    }" pattern
      const afterMetrics = updatedBlock.slice(metricsStart);
      // Match the closing } of the metrics object (at 4-space indent level)
      const closingMatch = afterMetrics.search(/\n\s{4}\},?\n/);

      if (closingMatch !== -1) {
        const insertPoint = metricsStart + closingMatch;
        const mentionsBlock =
          `\n      mentionsPositive: [\n        { date: "${CURRENT_MONTH}", value: ${count} },\n      ],`;

        updatedBlock =
          updatedBlock.slice(0, insertPoint) +
          mentionsBlock +
          updatedBlock.slice(insertPoint);
      }
    } else {
      // No metrics block at all — insert one after githubStars line
      const starsLineMatch = updatedBlock.match(/githubStars:\s*"[^"]*",?\n/);

      if (starsLineMatch) {
        const insertPoint =
          updatedBlock.indexOf(starsLineMatch[0]) + starsLineMatch[0].length;
        const metricsBlock =
          `    metrics: {\n` +
          `      mentionsPositive: [\n` +
          `        { date: "${CURRENT_MONTH}", value: ${count} },\n` +
          `      ],\n` +
          `    },\n`;

        updatedBlock =
          updatedBlock.slice(0, insertPoint) +
          metricsBlock +
          updatedBlock.slice(insertPoint);
      }
    }
  }

  return source.slice(0, slugIndex) + updatedBlock + source.slice(blockEnd);
}

async function main() {
  const skills = extractSkillNames();

  if (skills.length === 0) {
    console.error("No skills found in catalog.ts");
    process.exit(1);
  }

  console.log(`Found ${skills.length} skills. Fetching HN mentions (7d, >5 pts)...\n`);

  let source = fs.readFileSync(CATALOG_PATH, "utf-8");
  let success = 0;
  let failed = 0;

  for (const { slug, name } of skills) {
    try {
      const count = await fetchMentions(name);

      source = updateSkillMentions(source, slug, count);
      console.log(`[hn] ${name} → ${count} mentions (7d, >5 pts)`);
      success++;

      // Rate limit courtesy delay (200ms)
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      console.error(`[hn] ${name}: ERROR ${err.message}`);
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
