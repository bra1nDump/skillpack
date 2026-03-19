/* eslint-disable no-console */
/**
 * Collect repository size and language breakdown for all skills.
 * Usage: node scripts/collect-package-size.mjs
 * Optional: GITHUB_TOKEN=ghp_... node scripts/collect-package-size.mjs
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

async function fetchRepoSize(repo) {
  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: makeHeaders(),
  });

  if (!res.ok) {
    const rateRemaining = res.headers.get("x-ratelimit-remaining");

    throw new Error(`HTTP ${res.status} (rate-limit remaining: ${rateRemaining})`);
  }
  const data = await res.json();

  return data.size; // KB
}

async function fetchLanguages(repo) {
  const res = await fetch(`https://api.github.com/repos/${repo}/languages`, {
    headers: makeHeaders(),
  });

  if (!res.ok) return null;
  return await res.json(); // { "TypeScript": 123456, "JavaScript": 7890 }
}

function formatSize(kb) {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${kb} KB`;
}

function updateSkillPackageSize(source, slug, repoSizeKb, languages) {
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

  // Build the packageSize value
  const langStr = languages && Object.keys(languages).length > 0
    ? `, languages: { ${Object.entries(languages).map(([k, v]) => `"${k}": ${v}`).join(", ")} }`
    : "";
  const newValue = `packageSize: { repoSizeKb: ${repoSizeKb}${langStr} }`;

  // Check if packageSize already exists (handle nested braces from languages)
  const existingPattern = /packageSize:\s*\{[^}]*(?:\{[^}]*\}[^}]*)?\}/;

  if (existingPattern.test(block)) {
    block = block.replace(existingPattern, newValue);
  } else {
    // Insert before metrics or before evidence
    const insertBefore = block.search(/\s+metrics:\s*\{/);

    if (insertBefore !== -1) {
      block = block.slice(0, insertBefore) + `\n    ${newValue},` + block.slice(insertBefore);
    } else {
      // Insert before the last closing brace area (before strengths or weaknesses)
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

  console.log(`Found ${skills.length} skills. Fetching package sizes...`);
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
      const sizeKb = await fetchRepoSize(repo);
      const languages = await fetchLanguages(repo);

      source = updateSkillPackageSize(source, slug, sizeKb, languages);

      const topLangs = languages
        ? Object.keys(languages).slice(0, 3).join(", ")
        : "N/A";

      console.log(`  ✓ ${slug}: ${formatSize(sizeKb)} (${topLangs})`);
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
