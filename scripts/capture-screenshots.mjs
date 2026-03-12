/* eslint-disable no-console */
/**
 * Capture product screenshots for each skill.
 * Usage: npm run screenshots
 * Requires: npx playwright install chromium
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const CATALOG_PATH = path.resolve("src/lib/catalog.ts");
const OUTPUT_DIR = path.resolve("public/screenshots");
const VIEWPORT = { width: 1280, height: 800 };

/**
 * Extract skill slugs and URLs from catalog.ts by scanning lines.
 * Returns array of { slug, url }.
 */
function extractSkillUrls() {
  const lines = fs.readFileSync(CATALOG_PATH, "utf-8").split("\n");
  const skills = [];
  let currentSlug = null;
  let currentRepo = null;
  let currentDocs = null;
  let currentProduct = null;

  for (const line of lines) {
    const slugMatch = line.match(/slug:\s*"([^"]+)"/);

    if (slugMatch) {
      // Save previous skill if we had one
      if (currentSlug && currentRepo) {
        skills.push({ slug: currentSlug, url: currentProduct || currentDocs || currentRepo });
      }
      currentSlug = slugMatch[1];
      currentRepo = null;
      currentDocs = null;
      currentProduct = null;
    }

    const repoMatch = line.match(/repoUrl:\s*"([^"]+)"/);

    if (repoMatch) currentRepo = repoMatch[1];

    const docsMatch = line.match(/docsUrl:\s*"([^"]+)"/);

    if (docsMatch) currentDocs = docsMatch[1];

    const productMatch = line.match(/productUrl:\s*"([^"]+)"/);

    if (productMatch) currentProduct = productMatch[1];
  }

  // Don't forget the last skill
  if (currentSlug && currentRepo) {
    skills.push({ slug: currentSlug, url: currentProduct || currentDocs || currentRepo });
  }

  return skills;
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const skills = extractSkillUrls();

  if (skills.length === 0) {
    console.error("No skills found in catalog.ts");
    process.exit(1);
  }

  console.log(`Found ${skills.length} skills. Capturing screenshots...\n`);

  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    colorScheme: "dark",
  });

  let success = 0;
  let failed = 0;

  for (const { slug, url } of skills) {
    const outPath = path.join(OUTPUT_DIR, `${slug}.png`);

    try {
      const page = await context.newPage();

      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      // Small delay to let animations settle
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: outPath,
        clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
      });
      await page.close();
      console.log(`  ✓ ${slug} → ${outPath}`);
      success++;
    } catch (err) {
      console.error(`  ✗ ${slug} (${url}): ${err.message}`);
      failed++;
    }
  }

  await browser.close();
  console.log(`\nDone: ${success} captured, ${failed} failed.`);

  if (success > 0) {
    console.log(`\nScreenshots saved to ${OUTPUT_DIR}`);
    console.log("They will be auto-detected on skill pages (no manual config needed).");
  }
}

main().catch(console.error);
