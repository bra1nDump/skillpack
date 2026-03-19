/* eslint-disable no-console */
/**
 * LLM-based classification of skills into SkillPack taxonomy.
 * Assigns: skillType (Expertise|Generator|Guardian|Connector) and skillTier (Atomic|Composite|Orchestrator|Pack).
 *
 * Uses Claude CLI (`claude -p`) to classify each skill based on its summary, verdict, and repo.
 *
 * Usage: node scripts/classify-skills.mjs
 *        node scripts/classify-skills.mjs --slug claude-code  (single skill)
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const CATALOG_PATH = path.resolve("src/lib/catalog.ts");

function extractSkills() {
  const source = fs.readFileSync(CATALOG_PATH, "utf-8");
  const skills = [];

  // Split catalog into per-skill blocks using slug as delimiter
  const slugPositions = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => ({
    slug: m[1],
    start: m.index,
  }));

  for (let i = 0; i < slugPositions.length; i++) {
    const { slug, start } = slugPositions[i];
    const end = i + 1 < slugPositions.length ? slugPositions[i + 1].start : source.length;
    const block = source.slice(start, end);

    // Skip non-skill blocks (categories, bundles, platforms also have slugs)
    if (!block.includes("strengths:")) continue;

    // Check if already classified
    const hasType = /skillType:\s*"/.test(block);
    const hasTier = /skillTier:\s*"/.test(block);

    if (hasType && hasTier) continue;

    // Extract name and summary
    const nameMatch = block.match(/name:\s*"([^"]+)"/);
    const summaryMatch = block.match(/summary:\s*\n?\s*"([^"]*)"/);

    skills.push({
      slug,
      name: nameMatch?.[1] ?? slug,
      summary: (summaryMatch?.[1] ?? "").slice(0, 300),
      needsType: !hasType,
      needsTier: !hasTier,
    });
  }

  return skills;
}

function classifyWithLLM(skill) {
  const prompt = `You must classify this AI tool into two dimensions. Reply with ONLY valid JSON, nothing else.

Tool: "${skill.name}"
Description: "${skill.summary}"

Dimension 1 - "skillType" (what it DOES to the AI agent):
  "Expertise" = Adds domain knowledge (patterns, conventions, best practices)
  "Generator" = Produces output (code, files, content, scaffolding)
  "Guardian" = Prevents mistakes (scanning, linting, auditing, enforcement)
  "Connector" = Bridges to external services (MCP servers, APIs, CLI tools)

Dimension 2 - "skillTier" (how complex it is):
  "Atomic" = Single focused capability
  "Composite" = Multi-step workflow
  "Orchestrator" = Coordinates multiple tools with decision logic
  "Pack" = Bundle of multiple skills

IMPORTANT: skillType MUST be one of: Expertise, Generator, Guardian, Connector
IMPORTANT: skillTier MUST be one of: Atomic, Composite, Orchestrator, Pack

Reply ONLY: {"skillType":"...","skillTier":"..."}`;

  try {
    const result = execSync("claude -p --output-format json", {
      input: prompt,
      timeout: 30_000,
      stdio: ["pipe", "pipe", "pipe"],
    });

    const output = result.toString().trim();

    // Claude CLI --output-format json returns:
    // {"type":"result","result":"{\"type\":\"Generator\",\"tier\":\"Orchestrator\"}"}
    // We need to extract the inner JSON from the "result" field.
    let parsed;

    try {
      const wrapper = JSON.parse(output);

      if (wrapper.result) {
        // wrapper.result is a JSON string — parse it
        const inner = typeof wrapper.result === "string" ? wrapper.result : JSON.stringify(wrapper.result);
        const jsonMatch = inner.match(/\{[^}]+\}/);

        if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
      }
    } catch {
      // Fallback: try to find any JSON object in raw output
      const jsonMatch = output.match(/\{"type"\s*:\s*"[^"]+"\s*,\s*"tier"\s*:\s*"[^"]+"\s*\}/);

      if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
    }

    // Normalize field names (LLM might use type/tier or skillType/skillTier)
    if (parsed) {
      const type = parsed.skillType || parsed.type;
      const tier = parsed.skillTier || parsed.tier;

      const validTypes = ["Expertise", "Generator", "Guardian", "Connector"];
      const validTiers = ["Atomic", "Composite", "Orchestrator", "Pack"];

      if (type && tier && validTypes.includes(type) && validTiers.includes(tier)) {
        return { type, tier };
      }

      // Auto-correct: if type is actually a tier value, default to Generator
      if (tier && validTiers.includes(tier) && !validTypes.includes(type)) {
        console.warn(`    auto-correct: type "${type}" invalid, defaulting to "Generator"`);
        return { type: "Generator", tier };
      }
    }

    console.warn(`  ⚠ ${skill.slug}: unexpected LLM output, skipping`);
    console.warn(`    raw: ${output.slice(0, 200)}`);
    return null;
  } catch (err) {
    console.error(`  ✗ ${skill.slug}: LLM call failed — ${err.message?.slice(0, 100)}`);
    return null;
  }
}

function updateSkillField(source, slug, fieldName, fieldValue) {
  const slugPattern = new RegExp(`slug:\\s*"${slug}"`);
  const slugIndex = source.search(slugPattern);

  if (slugIndex === -1) return source;

  const afterSlug = source.slice(slugIndex);
  const nextSlugMatch = afterSlug.slice(50).search(/slug:\s*"/);
  const blockEnd = nextSlugMatch !== -1 ? slugIndex + 50 + nextSlugMatch : source.length;
  let block = source.slice(slugIndex, blockEnd);

  const valueStr = `"${fieldValue}"`;
  const existingPattern = new RegExp(`${fieldName}:\\s*"[^"]*"`);

  if (existingPattern.test(block)) {
    block = block.replace(existingPattern, `${fieldName}: ${valueStr}`);
  } else {
    const insertBefore = block.search(/\s+strengths:\s*\[/);

    if (insertBefore !== -1) {
      block = block.slice(0, insertBefore) + `\n    ${fieldName}: ${valueStr},` + block.slice(insertBefore);
    }
  }

  return source.slice(0, slugIndex) + block + source.slice(blockEnd);
}

async function main() {
  const args = process.argv.slice(2);
  const singleSlug = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : null;

  let skills = extractSkills();

  if (singleSlug) {
    skills = skills.filter((s) => s.slug === singleSlug);
  }

  if (skills.length === 0) {
    console.log("All skills already classified (or slug not found).");
    return;
  }

  console.log(`Classifying ${skills.length} skills with LLM...\n`);

  let classified = 0;

  for (const skill of skills) {
    const result = classifyWithLLM(skill);

    if (!result) continue;

    // Re-read source each time so we write incrementally (crash-safe)
    let source = fs.readFileSync(CATALOG_PATH, "utf-8");

    if (skill.needsType) {
      source = updateSkillField(source, skill.slug, "skillType", result.type);
    }
    if (skill.needsTier) {
      source = updateSkillField(source, skill.slug, "skillTier", result.tier);
    }

    fs.writeFileSync(CATALOG_PATH, source, "utf-8");
    console.log(`  ✓ ${skill.slug}: ${result.type} × ${result.tier}`);
    classified++;

    // Small delay between LLM calls
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\nDone: ${classified}/${skills.length} skills classified.`);
}

main().catch(console.error);
