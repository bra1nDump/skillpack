import fs from "node:fs";
import path from "node:path";

/**
 * Returns the screenshot URL for a skill slug if the file exists in public/screenshots/.
 * Convention-based: no need to manually register URLs.
 */
export function getScreenshotUrl(slug: string): string | null {
  const filePath = path.join(process.cwd(), "public", "screenshots", `${slug}.png`);

  return fs.existsSync(filePath) ? `/screenshots/${slug}.png` : null;
}
