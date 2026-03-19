/* eslint-disable no-console */
/**
 * Collect YouTube videos for each skill using YouTube Data API v3.
 * Searches for reviews, tutorials, and demos; stores top 3 per skill in catalog.ts.
 *
 * Usage: npm run videos:collect
 * Requires: YOUTUBE_API_KEY in .env
 *   Get a free key at: https://console.cloud.google.com → APIs → YouTube Data API v3
 *   Free quota: 10,000 units/day (each skill search costs ~100 units)
 */
import fs from "node:fs";
import https from "node:https";
import path from "node:path";

// Load .env
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
const API_KEY = process.env.YOUTUBE_API_KEY;
const PUBLISHED_AFTER = "2025-01-01T00:00:00Z";
const MIN_VIEWS = 2000;
const MAX_VIDEOS_PER_SKILL = 3;

if (!API_KEY) {
  console.error("ERROR: YOUTUBE_API_KEY not set in .env");
  console.error("Get a free key at: https://console.cloud.google.com → APIs → YouTube Data API v3");
  process.exit(1);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "skillbench-videos/1.0" } }, (res) => {
      let data = "";

      res.on("data", (c) => { data += c; });
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error: ${e.message}`)); }
      });
    }).on("error", reject);
  });
}

function esc(s) { return encodeURIComponent(s); }

// ─── YouTube API ─────────────────────────────────────────────────────────────

async function searchVideos(skillName) {
  const q = esc(`"${skillName}" tutorial OR review OR demo OR walkthrough`);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&order=relevance&publishedAfter=${PUBLISHED_AFTER}&maxResults=8&key=${API_KEY}`;
  const data = await fetchJson(url);

  if (data.error) throw new Error(`YouTube API error: ${data.error.message}`);
  return (data.items || []).map((item) => ({
    youtubeId: item.id.videoId,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    date: item.snippet.publishedAt.slice(0, 10),
  }));
}

async function getVideoStats(ids) {
  if (ids.length === 0) return {};
  const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ids.join(",")}&key=${API_KEY}`;
  const data = await fetchJson(url);

  if (data.error) throw new Error(`YouTube API error: ${data.error.message}`);
  const stats = {};

  for (const item of (data.items || [])) {
    stats[item.id] = parseInt(item.statistics?.viewCount || "0", 10);
  }
  return stats;
}

// ─── Catalog parsing ─────────────────────────────────────────────────────────

function extractSkills() {
  const lines = fs.readFileSync(CATALOG_PATH, "utf-8").split("\n");
  const skills = [];
  let slug = null;
  let name = null;

  for (const line of lines) {
    const slugMatch = line.match(/^\s*slug:\s*"([^"]+)"/);

    if (slugMatch) {
      if (slug && name) skills.push({ slug, name });
      slug = slugMatch[1];
      name = null;
    }
    const nameMatch = line.match(/^\s*name:\s*"([^"]+)"/);

    if (nameMatch && slug) name = nameMatch[1];
  }
  if (slug && name) skills.push({ slug, name });
  return skills;
}

// ─── Catalog update ───────────────────────────────────────────────────────────

function updateSkillVideos(source, slug, videos) {
  const slugPattern = new RegExp(`slug:\\s*"${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`);
  const slugIndex = source.search(slugPattern);

  if (slugIndex === -1) return source;

  // Find block boundaries (until next slug)
  const after = source.slice(slugIndex);
  const nextSlug = after.slice(50).search(/slug:\s*"/);
  const blockEnd = nextSlug !== -1 ? slugIndex + 50 + nextSlug : source.length;
  let block = source.slice(slugIndex, blockEnd);

  const videoLines = videos
    .map((v) => `    { title: ${JSON.stringify(v.title)}, youtubeId: ${JSON.stringify(v.youtubeId)}, channel: ${JSON.stringify(v.channel)}, date: ${JSON.stringify(v.date)} }`)
    .join(",\n");
  const videosBlock = `  videos: [\n${videoLines},\n  ],\n`;

  // Replace existing videos block
  if (/\bvideos:\s*\[/.test(block)) {
    block = block.replace(/\bvideos:\s*\[[\s\S]*?\],?\s*\n/, videosBlock);
    return source.slice(0, slugIndex) + block + source.slice(blockEnd);
  }

  // Insert after metrics block if present, otherwise before the last `  },`
  const metricsEnd = block.search(/\bmetrics:\s*\{/);

  if (metricsEnd !== -1) {
    // Find closing of metrics: look for `  },` after metricsEnd
    const afterMetrics = block.slice(metricsEnd);
    const metricsClose = afterMetrics.search(/\n\s{2}\},/);

    if (metricsClose !== -1) {
      const insertAt = metricsEnd + metricsClose + 1; // after \n

      block = block.slice(0, insertAt) + videosBlock + block.slice(insertAt);
      return source.slice(0, slugIndex) + block + source.slice(blockEnd);
    }
  }

  // Fallback: insert before last `  },`
  const lastClose = block.lastIndexOf("\n  },");

  if (lastClose !== -1) {
    block = block.slice(0, lastClose + 1) + videosBlock + block.slice(lastClose + 1);
    return source.slice(0, slugIndex) + block + source.slice(blockEnd);
  }

  return source;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const skills = extractSkills();

  console.log(`Found ${skills.length} skills. Fetching YouTube videos…\n`);

  let source = fs.readFileSync(CATALOG_PATH, "utf-8");
  let updated = 0;
  let skipped = 0;

  for (const { slug, name } of skills) {
    try {
      const results = await searchVideos(name);

      if (results.length === 0) {
        console.log(`  - ${slug}: no results`);
        skipped++;
        continue;
      }

      // Get view counts and filter
      const ids = results.map((r) => r.youtubeId);
      const stats = await getVideoStats(ids);

      const filtered = results
        .map((v) => ({ ...v, views: stats[v.youtubeId] || 0 }))
        .filter((v) => v.views >= MIN_VIEWS)
        .sort((a, b) => b.views - a.views)
        .slice(0, MAX_VIDEOS_PER_SKILL);

      if (filtered.length === 0) {
        console.log(`  - ${slug}: found ${results.length} videos but none exceed ${MIN_VIEWS.toLocaleString()} views`);
        skipped++;
        continue;
      }

      const videos = filtered.map(({ title, youtubeId, channel, date }) => ({ title, youtubeId, channel, date }));

      source = updateSkillVideos(source, slug, videos);
      console.log(`  ✓ ${slug}: ${videos.length} video(s) — top: "${videos[0].title}" (${filtered[0].views.toLocaleString()} views)`);
      updated++;

      // Small delay to avoid quota issues
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      console.error(`  ✗ ${slug}: ${err.message}`);
    }
  }

  fs.writeFileSync(CATALOG_PATH, source, "utf-8");
  console.log(`\nDone: ${updated} skills updated, ${skipped} skipped (no qualifying videos).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
