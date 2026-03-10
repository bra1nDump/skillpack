import fs from "node:fs/promises";
import path from "node:path";

const PROJECT_ROOT = process.cwd();
const BASE_URL = process.env.SKILLBENCH_BASE_URL ?? "http://127.0.0.1:3000";
const USER_AGENT = "SkillbenchLinkChecker/1.0 (+https://skillbench.local)";

const seedRoutes = [
  "/",
  "/jobs",
  "/jobs/coding-clis",
  "/jobs/web-browsing",
  "/jobs/product-business-development",
  "/jobs/teams-of-agents",
  "/jobs/ux-ui",
  "/jobs/document-editing-ui-ux",
  "/skills",
  "/bundles",
  "/bundles/karpathy-stack",
  "/bundles/swyx-agent-stack",
  "/bundles/mckay-wrigley-stack",
  "/storyboard",
  "/docs/agents",
  "/docs/qa",
  "/runs/agents.md",
];

const markdownSeeds = ["agents.md", "qa.md", "agent-runs"];
const markdownExtensions = new Set([".md", ".markdown"]);

const warnings = [];
const errors = [];
const externalUrls = new Set();

function addWarning(message) {
  warnings.push(message);
}

function addError(message) {
  errors.push(message);
}

function isExternalUrl(href) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function normalizeRoute(href) {
  if (!href) {
    return null;
  }

  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
    return null;
  }

  if (href.startsWith("http://") || href.startsWith("https://")) {
    const url = new URL(href);
    if (url.origin === BASE_URL) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
    return null;
  }

  if (!href.startsWith("/")) {
    return null;
  }

  return href;
}

function extractAnchorHrefs(html) {
  const hrefs = [];
  const anchorRegex = /<a\b[^>]*href="([^"]+)"/g;
  let match;

  while ((match = anchorRegex.exec(html))) {
    hrefs.push(match[1]);
  }

  return hrefs;
}

function extractAssetSrcs(html) {
  const srcs = [];
  const imgRegex = /<img\b[^>]*src="([^"]+)"/g;
  let match;

  while ((match = imgRegex.exec(html))) {
    srcs.push(match[1]);
  }

  return srcs;
}

function extractMarkdownLinks(source) {
  const hrefs = [];
  const markdownRegex = /\[[^\]]+\]\(([^)\s]+(?:\s+"[^"]*")?)\)/g;
  let match;

  while ((match = markdownRegex.exec(source))) {
    const raw = match[1].trim();
    const href = raw.split(/\s+"/, 1)[0];
    hrefs.push(href);
  }

  return hrefs;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walkMarkdownFiles(target) {
  const absolute = path.join(PROJECT_ROOT, target);
  const stat = await fs.stat(absolute);

  if (stat.isFile()) {
    return [absolute];
  }

  const files = [];
  const entries = await fs.readdir(absolute, { withFileTypes: true });
  for (const entry of entries) {
    const nested = path.join(target, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkMarkdownFiles(nested)));
      continue;
    }

    if (markdownExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(path.join(PROJECT_ROOT, nested));
    }
  }

  return files;
}

async function validateMarkdownLinks() {
  const files = [];
  for (const seed of markdownSeeds) {
    files.push(...(await walkMarkdownFiles(seed)));
  }

  for (const filePath of files) {
    const source = await fs.readFile(filePath, "utf8");
    const hrefs = extractMarkdownLinks(source);

    for (const href of hrefs) {
      const [targetHref] = href.split("#");

      if (!targetHref || targetHref.startsWith("mailto:") || targetHref.startsWith("tel:")) {
        continue;
      }

      if (isExternalUrl(targetHref)) {
        externalUrls.add(targetHref);
        continue;
      }

      let resolvedPath;
      if (targetHref.startsWith("/")) {
        resolvedPath = targetHref.startsWith(PROJECT_ROOT)
          ? targetHref
          : path.join(PROJECT_ROOT, targetHref.replace(/^\/+/, ""));
      } else {
        resolvedPath = path.resolve(path.dirname(filePath), targetHref);
      }

      if (!(await exists(resolvedPath))) {
        addError(
          `Markdown link target missing: ${path.relative(PROJECT_ROOT, filePath)} -> ${href}`,
        );
      }
    }
  }
}

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent": USER_AGENT,
      accept: "text/html,application/xhtml+xml",
    },
  });

  return {
    response,
    text: await response.text(),
  };
}

function classifyExternalResult(url, response) {
  const hostname = new URL(url).hostname.replace(/^www\./, "");
  const status = response.status;

  if (hostname.endsWith("reddit.com")) {
    if (status === 403) {
      addWarning(`External citation bot-blocked but likely live: ${url} (${status})`);
      return;
    }
  }

  if (hostname.endsWith("openai.com")) {
    if (status === 403) {
      addWarning(
        `External citation bot-blocked by Cloudflare and needs browser spot-check: ${url} (${status})`,
      );
      return;
    }
  }

  if (status >= 200 && status < 400) {
    return;
  }

  addError(`External citation failed: ${url} (${status})`);
}

async function crawlRoutes() {
  const pending = [...seedRoutes];
  const seen = new Set();

  while (pending.length > 0) {
    const route = pending.shift();
    if (!route || seen.has(route)) {
      continue;
    }

    seen.add(route);
    const url = new URL(route, BASE_URL).toString();

    let page;
    try {
      page = await fetchText(url);
    } catch (error) {
      addError(`Internal route failed to load: ${route} (${String(error)})`);
      continue;
    }

    if (!page.response.ok) {
      addError(`Internal route failed: ${route} (${page.response.status})`);
      continue;
    }

    for (const href of extractAnchorHrefs(page.text)) {
      if (isExternalUrl(href)) {
        externalUrls.add(href);
        continue;
      }

      const normalized = normalizeRoute(href);
      if (normalized && !seen.has(normalized)) {
        pending.push(normalized);
      }
    }

    for (const src of extractAssetSrcs(page.text)) {
      if (isExternalUrl(src)) {
        externalUrls.add(src);
        continue;
      }

      const normalized = normalizeRoute(src);
      if (!normalized) {
        continue;
      }

      const assetUrl = new URL(normalized, BASE_URL).toString();
      try {
        const response = await fetch(assetUrl, {
          redirect: "follow",
          headers: { "user-agent": USER_AGENT },
        });
        if (!response.ok) {
          addError(`Asset failed to load: ${normalized} (${response.status})`);
        }
      } catch (error) {
        addError(`Asset request failed: ${normalized} (${String(error)})`);
      }
    }
  }
}

async function validateExternalUrls() {
  for (const url of [...externalUrls].sort()) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        headers: {
          "user-agent": USER_AGENT,
          accept: "text/html,application/xhtml+xml",
        },
      });
      classifyExternalResult(url, response);
    } catch (error) {
      addError(`External citation request failed: ${url} (${String(error)})`);
    }
  }
}

async function main() {
  await validateMarkdownLinks();
  await crawlRoutes();
  await validateExternalUrls();

  console.log(`Base URL: ${BASE_URL}`);
  console.log(`External citations checked: ${externalUrls.size}`);
  console.log(`Warnings: ${warnings.length}`);
  for (const warning of warnings) {
    console.log(`WARN ${warning}`);
  }

  console.log(`Errors: ${errors.length}`);
  for (const error of errors) {
    console.log(`ERR ${error}`);
  }

  if (errors.length > 0) {
    process.exitCode = 1;
  }
}

await main();
