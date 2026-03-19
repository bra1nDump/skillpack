/* eslint-disable no-console */
/**
 * Unified GitHub data collector for all skills.
 * Combines: stars, repo health, skillpack fields (daysOld, weekGrowth, tags, complexity).
 *
 * Usage: node scripts/collect-github.mjs
 *        GITHUB_TOKEN=ghp_... node scripts/collect-github.mjs
 */
import fs from "node:fs";
import path from "node:path";

// ── Load .env ────────────────────────────────────────────────────────────────
try {
  const envPath = path.resolve(".env");

  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
      const m = line.match(/^([A-Z_0-9]+)=(.+?)\r?$/);

      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  }
} catch {}

const CATALOG_PATH = path.resolve("src/lib/catalog.ts");
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const CURRENT_MONTH = new Date().toISOString().slice(0, 7);

function makeHeaders() {
  const h = { "User-Agent": "skillpack-metrics/1.0" };

  if (GITHUB_TOKEN) h["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  return h;
}

// ── Extract skills from catalog ──────────────────────────────────────────────
function extractSkills() {
  const source = fs.readFileSync(CATALOG_PATH, "utf-8");
  const skills = [];
  let slug = null;
  let repo = null;
  let summary = "";
  let categories = [];

  for (const line of source.split("\n")) {
    const sm = line.match(/^\s*slug:\s*"([^"]+)"/);

    if (sm) { slug = sm[1]; summary = ""; }

    const rm = line.match(/^\s*repo:\s*"([^"]+)"/);

    if (rm) repo = rm[1];

    const sum = line.match(/^\s*summary:\s*"([^"]*)"/);

    if (sum) summary = sum[1];

    const catM = line.match(/relatedCategories:\s*\[([^\]]*)\]/);

    if (catM) categories = catM[1].match(/"([^"]+)"/g)?.map((s) => s.replace(/"/g, "")) || [];

    if (line.match(/^\s*strengths:\s*\[/) && slug) {
      skills.push({ slug, repo, summary: summary.slice(0, 300), categories });
      slug = null;
      repo = null;
      summary = "";
      categories = [];
    }
  }

  return skills;
}

// ── GitHub API calls ─────────────────────────────────────────────────────────
async function fetchRepo(repo) {
  const res = await fetch(`https://api.github.com/repos/${repo}`, { headers: makeHeaders() });

  if (!res.ok) {
    const rate = res.headers.get("x-ratelimit-remaining");

    throw new Error(`HTTP ${res.status} (rate-limit: ${rate})`);
  }
  return res.json();
}

async function fetchContributorCount(repo) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/contributors?per_page=1&anon=true`,
      { headers: makeHeaders() },
    );

    if (!res.ok) return null;
    const link = res.headers.get("link");

    if (link) {
      const m = link.match(/page=(\d+)>;\s*rel="last"/);

      if (m) return parseInt(m[1], 10);
    }
    const data = await res.json();

    return Array.isArray(data) ? data.length : null;
  } catch { return null; }
}

async function fetchLanguages(repo) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/languages`, { headers: makeHeaders() });

    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

// ── Compute derived fields ───────────────────────────────────────────────────
function formatStars(n) {
  if (n >= 10000) return `${Math.round(n / 1000)}K+`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K+`;
  return String(n);
}

function computeWeekGrowth(source, slug) {
  const idx = source.indexOf(`slug: "${slug}"`);

  if (idx === -1) return null;
  const block = source.slice(idx, idx + 5000);
  const m = block.match(/stars:\s*\[([\s\S]*?)\]/);

  if (!m) return null;
  const entries = m[1].match(/\{\s*date:\s*"([^"]+)",\s*value:\s*(\d+)\s*\}/g);

  if (!entries || entries.length < 2) return null;
  const parsed = entries.map((e) => {
    const em = e.match(/date:\s*"([^"]+)",\s*value:\s*(\d+)/);

    return { value: parseInt(em[2], 10) };
  });
  const last = parsed[parsed.length - 1].value;
  const prev = parsed[parsed.length - 2].value;

  if (prev === 0) return null;
  return Math.round(((last - prev) / prev) * 10000) / 10000;
}

function computeComplexity(languages) {
  if (!languages) return null;
  const langCount = Object.keys(languages).length;
  const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);

  if (totalBytes > 500000 && langCount >= 4) return 5;
  if (totalBytes > 200000 && langCount >= 3) return 4;
  if (totalBytes > 50000 && langCount >= 2) return 3;
  if (totalBytes > 10000) return 2;
  return 1;
}

function generateTags(summary, categories) {
  const tags = new Set();
  const catTags = {
    "coding-clis": ["cli", "coding"], "web-browsing": ["browser", "web"],
    "ux-ui": ["design", "ui"], "teams-of-agents": ["agents", "orchestration"],
    "software-factories": ["automation", "factory"], "search-news": ["search", "research"],
    "product-business-development": ["business", "productivity"],
    "marketing": ["marketing"], "business": ["business"],
    "content-writing": ["content", "writing"], "research": ["research"],
    "automation": ["automation"], "security": ["security"],
    "documentation": ["docs"], "data-analytics": ["data", "analytics"],
  };

  for (const cat of categories) {
    for (const t of catTags[cat] || []) tags.add(t);
  }
  if (summary) {
    const kws = [
      "figma", "mcp", "docker", "k8s", "react", "next.js", "prisma",
      "typescript", "python", "rust", "api", "graphql", "sql", "stripe",
      "supabase", "slack", "github", "jira", "notion", "terraform",
      "aws", "vercel", "testing", "scraping", "ai", "llm", "claude", "gemini",
    ];
    const lower = summary.toLowerCase();

    for (const kw of kws) if (lower.includes(kw)) tags.add(kw);
  }
  return [...tags].slice(0, 4);
}

// ── Update catalog.ts ────────────────────────────────────────────────────────
function findSkillBlock(source, slug) {
  const pattern = new RegExp(`slug:\\s*"${slug}"`);
  const idx = source.search(pattern);

  if (idx === -1) return null;
  const after = source.slice(idx);
  const next = after.slice(50).search(/slug:\s*"/);
  const end = next !== -1 ? idx + 50 + next : source.length;

  return { start: idx, end, block: source.slice(idx, end) };
}

function updateField(block, field, value) {
  let valueStr;

  if (typeof value === "string") valueStr = `"${value}"`;
  else if (Array.isArray(value)) valueStr = `[${value.map((v) => `"${v}"`).join(", ")}]`;
  else if (typeof value === "boolean") valueStr = String(value);
  else valueStr = String(value);

  const existing = new RegExp(`${field}:\\s*[^,}\\n]+`);

  if (existing.test(block)) {
    return block.replace(existing, `${field}: ${valueStr}`);
  }
  const insertBefore = block.search(/\s+strengths:\s*\[/);

  if (insertBefore !== -1) {
    return block.slice(0, insertBefore) + `\n    ${field}: ${valueStr},` + block.slice(insertBefore);
  }
  return block;
}

function updateStarsMetrics(block, stars) {
  const monthPattern = new RegExp(`\\{\\s*date:\\s*"${CURRENT_MONTH}",\\s*value:\\s*\\d+\\s*\\}`);
  const metricsRegex = /metrics:\s*\{[\s\S]*?stars:\s*\[([\s\S]*?)\]/;
  const metricsMatch = block.match(metricsRegex);

  if (metricsMatch) {
    if (monthPattern.test(block)) {
      return block.replace(monthPattern, `{ date: "${CURRENT_MONTH}", value: ${stars} }`);
    }
    const content = metricsMatch[1].trim();
    const needsComma = content.length > 0 && !content.endsWith(",");
    const insertion = `${needsComma ? "," : ""}\n        { date: "${CURRENT_MONTH}", value: ${stars} }`;
    const arrStart = block.indexOf("stars: [");
    const closing = block.indexOf("]", arrStart + content.length);

    return block.slice(0, closing) + insertion + "\n      " + block.slice(closing);
  }
  // No metrics block — insert after githubStars
  const starsLine = block.match(/githubStars:\s*"[^"]*",?\n/);

  if (starsLine) {
    const point = block.indexOf(starsLine[0]) + starsLine[0].length;
    const metricsBlock = `    metrics: {\n      stars: [\n        { date: "${CURRENT_MONTH}", value: ${stars} },\n      ],\n    },\n`;

    return block.slice(0, point) + metricsBlock + block.slice(point);
  }
  return block;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const skills = extractSkills();

  if (skills.length === 0) {
    console.error("No skills found in catalog.ts");
    process.exit(1);
  }

  console.log(`Found ${skills.length} skills with repos.`);
  console.log(GITHUB_TOKEN ? "Using GITHUB_TOKEN (5000 req/hr)\n" : "⚠ No GITHUB_TOKEN — unauthenticated (60 req/hr)\n");

  let source = fs.readFileSync(CATALOG_PATH, "utf-8");
  let success = 0;
  let failed = 0;

  for (const skill of skills) {
    if (!skill.repo) continue;

    try {
      // Fetch all GitHub data in parallel
      const [repoData, contributors, languages] = await Promise.all([
        fetchRepo(skill.repo),
        fetchContributorCount(skill.repo),
        fetchLanguages(skill.repo),
      ]);

      const stars = repoData.stargazers_count;
      const lastPushAt = repoData.pushed_at;
      const lastPushDays = Math.floor((Date.now() - new Date(lastPushAt).getTime()) / 86400000);
      const daysOld = Math.floor((Date.now() - new Date(repoData.created_at).getTime()) / 86400000);
      const complexity = computeComplexity(languages);
      const tags = generateTags(skill.summary, skill.categories);

      // Find and update block
      const found = findSkillBlock(source, skill.slug);

      if (!found) {
        console.warn(`  ⚠ ${skill.slug}: not found in catalog`);
        failed++;
        continue;
      }

      let block = found.block;

      // Stars
      block = updateField(block, "githubStars", formatStars(stars));
      block = updateStarsMetrics(block, stars);

      // Repo health
      const contribStr = contributors != null ? `, contributors: ${contributors}` : "";
      const healthStr = `repoHealth: { lastPushAt: "${lastPushAt}", lastPushDays: ${lastPushDays}, openIssues: ${repoData.open_issues_count}, forks: ${repoData.forks_count}, archived: ${repoData.archived || false}${contribStr} }`;
      const healthPattern = /repoHealth:\s*\{[^}]*\}/;

      if (healthPattern.test(block)) {
        block = block.replace(healthPattern, healthStr);
      } else {
        const insertBefore = block.search(/\s+strengths:\s*\[/);

        if (insertBefore !== -1) {
          block = block.slice(0, insertBefore) + `\n    ${healthStr},` + block.slice(insertBefore);
        }
      }

      // Package size
      const langStr = languages && Object.keys(languages).length > 0
        ? `, languages: { ${Object.entries(languages).map(([k, v]) => `"${k}": ${v}`).join(", ")} }`
        : "";
      const pkgStr = `packageSize: { repoSizeKb: ${repoData.size}${langStr} }`;
      const pkgPattern = /packageSize:\s*\{[^}]*(?:\{[^}]*\}[^}]*)?\}/;

      if (pkgPattern.test(block)) {
        block = block.replace(pkgPattern, pkgStr);
      } else {
        const ins = block.search(/\s+strengths:\s*\[/);

        if (ins !== -1) block = block.slice(0, ins) + `\n    ${pkgStr},` + block.slice(ins);
      }

      // SkillPack fields
      block = updateField(block, "daysOld", daysOld);
      if (complexity != null) block = updateField(block, "complexity", complexity);
      if (tags.length > 0) block = updateField(block, "tags", tags);

      // weekGrowth (from existing star data, computed after star update)
      source = source.slice(0, found.start) + block + source.slice(found.end);
      const wg = computeWeekGrowth(source, skill.slug);

      if (wg != null) {
        const found2 = findSkillBlock(source, skill.slug);

        if (found2) {
          const updatedBlock = updateField(found2.block, "weekGrowth", wg);

          source = source.slice(0, found2.start) + updatedBlock + source.slice(found2.end);
        }
      } else {
        source = source.slice(0, 0) + source; // no-op, just applied above
      }

      const freshIcon = lastPushDays < 7 ? "🟢" : lastPushDays < 30 ? "🟡" : "🔴";

      console.log(`  ✓ ${skill.slug}: ★${formatStars(stars)} ${freshIcon}${lastPushDays}d cmplx=${complexity ?? "?"} age=${daysOld}d tags=[${tags.join(",")}]${wg ? ` growth=${(wg * 100).toFixed(1)}%` : ""}`);
      success++;

      // Rate limit
      if (!GITHUB_TOKEN) await new Promise((r) => setTimeout(r, 1200));
    } catch (err) {
      console.error(`  ✗ ${skill.slug}: ${err.message}`);
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
