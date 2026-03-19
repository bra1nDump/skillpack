#!/usr/bin/env node

/**
 * Ralph Loop Orchestrator
 *
 * Runs the discover → deep-dive → rank → catalog-update → QA pipeline
 * by spawning `claude -p` subprocesses for each stage.
 *
 * Usage:
 *   npm run ralph -- --category coding-clis
 *   npm run ralph -- --all
 *   npm run ralph -- --category coding-clis --loop --interval 30
 */

import { execSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// Known categories (from catalog.ts CategorySlug)
// ---------------------------------------------------------------------------
const CATEGORIES = [
  "product-business-development",
  "teams-of-agents",
  "ux-ui",
  "coding-clis",
  "web-browsing",
  "software-factories",
  "search-news",
];

// ---------------------------------------------------------------------------
// CLI arg parsing
// ---------------------------------------------------------------------------
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { categories: [], loop: false, interval: 60, concurrency: 1 };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--category":
        opts.categories.push(args[++i]);
        break;
      case "--all":
        opts.categories = [...CATEGORIES];
        break;
      case "--loop":
        opts.loop = true;
        break;
      case "--interval":
        opts.interval = parseInt(args[++i], 10);
        break;
      case "--parallel":
        opts.concurrency = parseInt(args[++i], 10) || 3;
        break;
      default:
        console.error(`Unknown arg: ${args[i]}`);
        process.exit(1);
    }
  }

  if (opts.categories.length === 0) {
    console.error("Usage: ralph --category <slug> | --all [--loop] [--interval <min>] [--parallel <N>]");
    process.exit(1);
  }

  for (const cat of opts.categories) {
    if (!CATEGORIES.includes(cat)) {
      console.error(`Unknown category: ${cat}\nKnown: ${CATEGORIES.join(", ")}`);
      process.exit(1);
    }
  }

  return opts;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function timestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}`;
}

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function readFile(path) {
  return existsSync(path) ? readFileSync(path, "utf-8") : "";
}

function log(stage, msg) {
  const ts = new Date().toISOString().slice(11, 19);

  console.log(`[${ts}] [${stage}] ${msg}`);
}

// ---------------------------------------------------------------------------
// Claude subprocess runner
// ---------------------------------------------------------------------------
const ALLOWED_TOOLS = "Bash,Read,Write,Edit,Glob,Grep,WebSearch,WebFetch,Agent";

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function formatDuration(seconds) {
  if (seconds < 60) return `${seconds.toFixed(0)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);

  return `${m}m ${s}s`;
}

async function runClaude({ systemPromptFile, prompt, stage, timeoutMin = 30 }) {
  // Build the full prompt: agent personality + task
  let fullPrompt = "";

  if (systemPromptFile) {
    const systemPrompt = readFileSync(systemPromptFile, "utf-8");

    fullPrompt += `<system-instructions>\n${systemPrompt}\n</system-instructions>\n\n`;
  }
  fullPrompt += prompt;

  const args = [
    "-p",
    "--allowedTools", ALLOWED_TOOLS,
    "--verbose",
  ];

  const promptPreview = prompt.split("\n").find((l) => l.startsWith("TASK:"))?.slice(0, 100) || prompt.slice(0, 80);

  log(stage, "Spawning claude subprocess…");
  log(stage, `  Prompt: ${systemPromptFile ? systemPromptFile.split(/[/\\]/).pop() : "(inline)"} + ${formatBytes(fullPrompt.length)}`);
  log(stage, `  Task: ${promptPreview}…`);
  log(stage, `  Tools: ${ALLOWED_TOOLS}`);
  log(stage, `  Timeout: ${timeoutMin} min`);
  const start = Date.now();

  // Async spawn to allow parallel pipelines
  const result = await new Promise((resolve) => {
    const child = spawn("claude", args, {
      cwd: ROOT,
      stdio: ["pipe", "pipe", "pipe"],
      shell: true,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (d) => { stdout += d.toString(); });
    child.stderr.on("data", (d) => { stderr += d.toString(); });

    child.stdin.write(fullPrompt);
    child.stdin.end();

    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      resolve({ status: null, signal: "SIGTERM", stdout, stderr });
    }, timeoutMin * 60 * 1000);

    child.on("close", (code, signal) => {
      clearTimeout(timer);
      resolve({ status: code, signal, stdout, stderr });
    });
  });

  const elapsedSec = (Date.now() - start) / 1000;
  const elapsed = elapsedSec.toFixed(1);
  const duration = formatDuration(elapsedSec);
  const outputSize = formatBytes((result.stdout || "").length);

  if (result.status !== 0) {
    const reason = result.signal === "SIGTERM" || result.status === null
      ? `TIMEOUT (${timeoutMin} min limit reached)`
      : `exit code ${result.status}`;

    log(stage, `FAILED after ${duration} — ${reason}`);
    if (result.stderr) {
      const stderr = result.stderr.slice(0, 500).trim();

      if (stderr) log(stage, `  stderr: ${stderr}`);
    }
    if (result.stdout) {
      log(stage, `  Partial output: ${outputSize}`);
    }
    return { ok: false, output: result.stdout || "", elapsed };
  }

  log(stage, `Completed in ${duration} — output: ${outputSize}`);
  return { ok: true, output: result.stdout || "", elapsed };
}

// ---------------------------------------------------------------------------
// Pipeline stages
// ---------------------------------------------------------------------------

async function stageDiscover(category, runDir) {
  const stage = "DISCOVER";
  const outDir = resolve(runDir, `discover_${category}`);

  ensureDir(outDir);

  const catalogSnippet = getCategoryContext(category);
  const prompt = `You are researching the "${category}" category for Skillbench.

Current catalog context for this category:
${catalogSnippet}

TASK: Run the full discover protocol. Search HN Algolia, GitHub, web search, and any other available tools. Find all serious contenders, new signals, and gaps.

IMPORTANT: Write your findings to ${outDir}/findings.md using the structure from agent-runs/agents.md. Also output findings to stdout.`;

  const result = await runClaude({
    systemPromptFile: resolve(ROOT, "agents/discover.md"),
    prompt,
    stage,
  });

  // If claude wrote the file directly, great. Otherwise write stdout.
  const findingsPath = resolve(outDir, "findings.md");

  if (!existsSync(findingsPath) && result.output) {
    writeFileSync(findingsPath, result.output, "utf-8");
  }

  const findingsSize = existsSync(findingsPath) ? formatBytes(readFileSync(findingsPath).length) : "0B";

  log(stage, `  Findings: ${findingsPath.split(/[/\\]/).slice(-2).join("/")} (${findingsSize})`);

  return { ...result, findingsPath };
}

async function stageDeepDive(category, runDir, discoverFindings) {
  const stage = "DEEP-DIVE";
  const outDir = resolve(runDir, `deep-dive_${category}`);

  ensureDir(outDir);

  const catalogSnippet = getCategoryContext(category);
  const prompt = `You are deep-diving the "${category}" category for Skillbench.

Current catalog context:
${catalogSnippet}

Discover stage findings:
${discoverFindings.slice(0, 8000)}

TASK: Run the full deep-dive protocol. Build evidence-backed understanding for every contender found. Collect quantitative traction, official artifacts, public comparisons, and usage evidence.

IMPORTANT: Write your findings to ${outDir}/findings.md using the structure from agent-runs/agents.md.`;

  const result = await runClaude({
    systemPromptFile: resolve(ROOT, "agents/deep-dive.md"),
    prompt,
    stage,
  });

  const findingsPath = resolve(outDir, "findings.md");

  if (!existsSync(findingsPath) && result.output) {
    writeFileSync(findingsPath, result.output, "utf-8");
  }

  const findingsSize = existsSync(findingsPath) ? formatBytes(readFileSync(findingsPath).length) : "0B";

  log(stage, `  Findings: ${findingsPath.split(/[/\\]/).slice(-2).join("/")} (${findingsSize})`);
  log(stage, `  Input was: discover findings ${formatBytes(discoverFindings.length)}`);

  return { ...result, findingsPath };
}

async function stageRank(category, runDir, discoverFindings, deepDiveFindings) {
  const stage = "RANK";
  const outDir = resolve(runDir, `rank_${category}`);

  ensureDir(outDir);

  const prompt = `You are ranking the "${category}" category for Skillbench.

Discover findings:
${discoverFindings.slice(0, 4000)}

Deep-dive findings:
${deepDiveFindings.slice(0, 8000)}

TASK: Produce a ranked recommendation. Weight evidence quality, real usage, recency, and direct workflow fit. Call out narrow subcases.

IMPORTANT: Write your findings to ${outDir}/findings.md using the structure from agent-runs/agents.md.`;

  const result = await runClaude({
    systemPromptFile: resolve(ROOT, "agents/rank.md"),
    prompt,
    stage,
  });

  const findingsPath = resolve(outDir, "findings.md");

  if (!existsSync(findingsPath) && result.output) {
    writeFileSync(findingsPath, result.output, "utf-8");
  }

  const findingsSize = existsSync(findingsPath) ? formatBytes(readFileSync(findingsPath).length) : "0B";

  log(stage, `  Findings: ${findingsPath.split(/[/\\]/).slice(-2).join("/")} (${findingsSize})`);
  log(stage, `  Input was: discover ${formatBytes(discoverFindings.length)} + deep-dive ${formatBytes(deepDiveFindings.length)}`);

  return { ...result, findingsPath };
}

async function stageCatalogUpdate(category, rankFindingsPath) {
  const stage = "CATALOG-UPDATE";
  const rankFindings = readFile(rankFindingsPath);

  if (!rankFindings) {
    log(stage, "No rank findings available — skipping catalog update");
    return { ok: false, output: "", elapsed: "0" };
  }

  const prompt = `Read the rank findings at ${rankFindingsPath}.

Based on these findings, update src/lib/catalog.ts for the "${category}" category:
- Update evidence arrays with new [STRONG] and [MODERATE] evidence items
- Update liveSignals with fresh signals found
- Update rankings if evidence supports changes
- Update verdicts if the meta has shifted
- Add any NEW CONTENDER entries to the skills array if flagged
- Keep existing data that isn't contradicted by new findings
- If deep-dive findings contain YouTube video data, add a "videos" array to the skill entry:
  videos: [{ title: "...", youtubeId: "11-char-id", channel: "...", date: "YYYY-MM-DD" }]
  The SkillRecord type already has this field — just populate it from the findings.

CRITICAL RULE — every contender in a category ranking MUST have a full skill entry:
- Every ranking item MUST use "skillSlug" pointing to a skill entry in the skills object — NEVER use "externalUrl" alone.
- If a contender does not yet have a skill entry, CREATE one with at minimum: slug, name, repo/repoUrl (if available), summary, verdict, relatedCategories, strengths, weaknesses, and evidence.
- The skill slug should be kebab-case (e.g. "brave-search-api", "salesforce-mcp").
- Add the new slug to the SkillSlug union type at the top of catalog.ts.
- This ensures every skill on the site has its own internal page at /skills/[slug].

Also run: npm run metrics:collect to refresh star counts.

Be conservative — only change what the evidence supports. Preserve the existing TypeScript types.`;

  return await runClaude({
    prompt,
    stage,
  });
}

async function stageScreenshots(category) {
  const stage = "SCREENSHOTS";

  const prompt = `TASK: Find and install real product-in-use screenshots for skills in the "${category}" category.

Step 1 — read src/lib/catalog.ts and find all skills where relatedCategories includes "${category}".
For each skill, note its slug and repo (e.g. "anthropics/claude-code").

Step 2 — for each skill, check if public/screenshots/{slug}.png already exists.
If it exists, view the image to decide: does it show the product ACTIVELY BEING USED (terminal output, real workflow, agent completing a task)? If yes AND image is high quality (not blurry, width >= 800px), skip. Otherwise replace it.

Step 3 — for each skill needing a screenshot:
a) Search for product-in-use screenshots:
   - WebFetch the raw README: https://raw.githubusercontent.com/{repo}/main/README.md
     Look for embedded images (![...](...)) that show the tool in action
   - WebFetch the raw README on "master" branch too if "main" returns 404
   - WebSearch: '"{skill name}" screenshot terminal' and '"{skill name}" demo in use'
   - Check official docs page if docsUrl exists

b) Download up to 5 candidate images:
   mkdir -p public/screenshots/candidates/{slug}
   curl -L -sS -o "public/screenshots/candidates/{slug}/c1.png" "URL1" --max-time 15
   (repeat for each candidate, c1 through c5)

c) QUALITY CHECK — after downloading, verify resolution:
   Use: identify "public/screenshots/candidates/{slug}/cN.png" or file size check.
   REJECT any image smaller than 800x400 pixels or under 50KB — these are thumbnails/badges.

d) View each remaining candidate and score 1-10:
   - 8-10: Product clearly in use (terminal running, UI showing real workflow, agent output)
   - 5-7: Plausible but unclear
   - 1-4: Landing page, logo, badge, or unrelated

e) Install winner (score >= 7):
   cp "public/screenshots/candidates/{slug}/cN.png" "public/screenshots/{slug}.png"

IMPORTANT RULES:
- Minimum resolution: 800x400 pixels. NEVER install a low-res or thumbnail image.
- Prioritize README images — they are usually the best product-in-use shots.
- EVERY skill must have a screenshot attempt. Do not skip skills.
- Skip installing only if no candidate scores 7+ AND meets minimum resolution.`;

  return await runClaude({
    systemPromptFile: resolve(ROOT, "agents/screenshot-scout.md"),
    prompt,
    stage,
    timeoutMin: 60,
  });
}

function stageMetrics() {
  const stage = "METRICS";

  log(stage, "Collecting stars, downloads, and mentions…");
  const start = Date.now();

  const scripts = [
    { name: "stars", cmd: "node scripts/collect-stars.mjs" },
    { name: "downloads", cmd: "node scripts/collect-downloads.mjs" },
    { name: "mentions", cmd: "node scripts/collect-mentions.mjs" },
    { name: "package-size", cmd: "node scripts/collect-package-size.mjs" },
    { name: "repo-health", cmd: "node scripts/collect-repo-health.mjs" },
  ];

  for (const s of scripts) {
    try {
      execSync(s.cmd, { cwd: ROOT, stdio: "pipe", timeout: 120_000 });
      log(stage, `${s.name} collected`);
    } catch (e) {
      log(stage, `${s.name} FAILED (non-fatal): ${e.message?.slice(0, 200)}`);
    }
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  return { ok: true, output: "metrics collected", elapsed };
}

function stageQA() {
  const stage = "QA";

  log(stage, "Running build + link check…");
  const start = Date.now();

  try {
    execSync("npm run build", { cwd: ROOT, stdio: "pipe", timeout: 120_000 });
    log(stage, "Build passed");
  } catch (e) {
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);

    log(stage, `Build FAILED after ${elapsed}s`);
    log(stage, e.stderr?.toString().slice(-500) || e.message);
    return { ok: false, output: "build failed", elapsed };
  }

  try {
    execSync("npm run qa:links", { cwd: ROOT, stdio: "pipe", timeout: 60_000 });
    log(stage, "Link check passed");
  } catch (e) {
    log(stage, "Link check FAILED (non-fatal)");
    log(stage, e.stdout?.toString().slice(-500) || e.message);
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  return { ok: true, output: "QA passed", elapsed };
}

// ---------------------------------------------------------------------------
// Category context extractor
// ---------------------------------------------------------------------------
function getCategoryContext(category) {
  try {
    const catalogPath = resolve(ROOT, "src/lib/catalog.ts");
    const catalog = readFileSync(catalogPath, "utf-8");
    // Extract a rough snippet around the category slug
    const idx = catalog.indexOf(`slug: "${category}"`);

    if (idx === -1) return `Category slug: ${category} (not found in catalog)`;
    // Grab ~2000 chars around it
    const start = Math.max(0, idx - 200);
    const end = Math.min(catalog.length, idx + 2000);

    return catalog.slice(start, end);
  } catch {
    return `Category slug: ${category}`;
  }
}

// ---------------------------------------------------------------------------
// Phase 1: Research (parallelizable) — Discover → Deep-Dive → Rank
// ---------------------------------------------------------------------------
async function runResearch(category) {
  const ts = timestamp();
  const runDir = resolve(ROOT, "agent-runs", `${ts}_run_${category}`);

  ensureDir(runDir);

  console.log(`\n${"=".repeat(60)}`);
  console.log(`  Research — ${category}`);
  console.log(`  Run dir: ${runDir}`);
  console.log(`  Started: ${new Date().toISOString()}`);
  console.log(`${"=".repeat(60)}\n`);

  const results = {};

  // Stage 1: Discover
  log(category, "Stage 1/3: Discover");
  const discover = await stageDiscover(category, runDir);

  results.discover = discover;
  const discoverFindings = readFile(discover.findingsPath);

  // Stage 2: Deep-Dive
  log(category, "Stage 2/3: Deep-Dive");
  const deepDive = await stageDeepDive(category, runDir, discoverFindings);

  results.deepDive = deepDive;
  const deepDiveFindings = readFile(deepDive.findingsPath);

  // Stage 3: Rank
  log(category, "Stage 3/3: Rank");
  const rank = await stageRank(category, runDir, discoverFindings, deepDiveFindings);

  results.rank = rank;

  const totalElapsed = Object.values(results).reduce((sum, r) => sum + parseFloat(r.elapsed || "0"), 0);

  log(category, `Research done in ${formatDuration(totalElapsed)}`);

  return { category, runDir, rankFindingsPath: rank.findingsPath, results };
}

// ---------------------------------------------------------------------------
// Phase 2: Finalize (sequential) — Catalog Update → Metrics → QA
// ---------------------------------------------------------------------------
async function runFinalize(researchResults) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`  Finalize — ${researchResults.length} categories`);
  console.log(`  Started: ${new Date().toISOString()}`);
  console.log(`${"=".repeat(60)}\n`);

  const finalResults = {};

  // Catalog updates — one at a time to avoid race conditions
  for (const r of researchResults) {
    log("CATALOG", `Updating catalog for ${r.category}…`);
    r.results.catalogUpdate = await stageCatalogUpdate(r.category, r.rankFindingsPath);
  }

  // Screenshots — find real product-in-use images (parallel, all categories at once)
  log("SCREENSHOTS", `Finding product screenshots for ${researchResults.length} categories in parallel…`);
  await Promise.all(
    researchResults.map(async (r) => {
      log("SCREENSHOTS", `Starting screenshots for ${r.category}…`);
      r.results.screenshots = await stageScreenshots(r.category);
    }),
  );

  // Metrics — once for all
  log("METRICS", "Collecting stars, downloads, and mentions…");
  finalResults.metrics = stageMetrics();

  // QA — once at the end
  log("QA", "Running build + link check…");
  finalResults.qa = stageQA();

  return finalResults;
}

// ---------------------------------------------------------------------------
// Print summary
// ---------------------------------------------------------------------------
function printSummary(researchResults, finalResults) {
  console.log(`\n${"=".repeat(60)}`);
  console.log("  Ralph Pipeline — Final Summary");
  console.log(`  Finished: ${new Date().toISOString()}`);
  console.log(`${"=".repeat(60)}`);

  for (const r of researchResults) {
    const stages = r.results;
    const passed = Object.values(stages).filter((s) => s.ok).length;
    const failed = Object.values(stages).filter((s) => !s.ok).length;
    const total = Object.values(stages).reduce((sum, s) => sum + parseFloat(s.elapsed || "0"), 0);

    console.log(`\n  ${r.category} (${formatDuration(total)} | ${passed}✓ ${failed}✗)`);
    for (const [name, s] of Object.entries(stages)) {
      const icon = s.ok ? "✓" : "✗";

      console.log(`    ${icon} ${name.padEnd(16)} ${formatDuration(parseFloat(s.elapsed || "0"))}`);
    }
  }

  console.log("\n  Finalize");
  for (const [name, s] of Object.entries(finalResults)) {
    const icon = s.ok ? "✓" : "✗";

    console.log(`    ${icon} ${name.padEnd(16)} ${formatDuration(parseFloat(s.elapsed || "0"))}`);
  }
  console.log(`${"=".repeat(60)}\n`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const opts = parseArgs();

  const runOnce = async () => {
    const researchResults = [];

    if (opts.concurrency <= 1) {
      // Sequential research + finalize per category (legacy behavior)
      for (const category of opts.categories) {
        const r = await runResearch(category);

        researchResults.push(r);
      }
    } else {
      // Parallel research
      const limit = Math.min(opts.concurrency, opts.categories.length);

      console.log(`Running ${opts.categories.length} categories, ${limit} research agents in parallel\n`);
      const queue = [...opts.categories];
      const running = new Set();

      await new Promise((resolve) => {
        function next() {
          if (queue.length === 0 && running.size === 0) return resolve();
          while (running.size < limit && queue.length > 0) {
            const cat = queue.shift();

            running.add(cat);
            runResearch(cat)
              .then((r) => researchResults.push(r))
              .catch((e) => log("ERROR", `${cat}: ${e.message}`))
              .finally(() => { running.delete(cat); next(); });
          }
        }
        next();
      });
    }

    // Phase 2: sequential finalize (catalog updates, metrics, QA)
    const finalResults = await runFinalize(researchResults);

    // Summary
    printSummary(researchResults, finalResults);
  };

  if (opts.loop) {
    console.log(`Ralph loop mode — interval: ${opts.interval} min. Ctrl+C to stop.`);
    while (true) {
      await runOnce();
      log("LOOP", `Sleeping ${opts.interval} minutes…`);
      await new Promise((r) => setTimeout(r, opts.interval * 60 * 1000));
    }
  } else {
    await runOnce();
  }
}

main().catch((err) => {
  console.error("Ralph fatal error:", err);
  process.exit(1);
});
