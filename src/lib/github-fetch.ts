/**
 * Convert a GitHub repo URL + file path into a raw content URL.
 *
 * Accepts:
 *   https://github.com/user/repo
 *   https://github.com/user/repo/tree/main/some/path
 *   github.com/user/repo
 *   user/repo
 */
export function resolveGitHubRawUrl(repoUrl: string, filePath: string): string {
  let owner: string;
  let repo: string;
  let branch = "main";

  const cleaned = repoUrl.trim().replace(/\/+$/, "");

  // Try to parse as URL
  if (cleaned.includes("github.com")) {
    const url = new URL(
      cleaned.startsWith("http") ? cleaned : `https://${cleaned}`,
    );
    const parts = url.pathname.split("/").filter(Boolean);

    if (parts.length < 2) {
      throw new Error("Invalid GitHub URL: need at least owner/repo");
    }

    owner = parts[0];
    repo = parts[1];

    // If URL has /tree/branch/..., extract branch
    if (parts[2] === "tree" && parts[3]) {
      branch = parts[3];
    }
  } else {
    // Assume "owner/repo" format
    const parts = cleaned.split("/").filter(Boolean);
    if (parts.length < 2) {
      throw new Error(
        'Invalid repository: use "owner/repo" or a full GitHub URL',
      );
    }
    owner = parts[0];
    repo = parts[1];
  }

  const normalizedPath = filePath.replace(/^\/+/, "");

  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${normalizedPath}`;
}

/**
 * Fetch file content from a GitHub repository.
 */
export async function fetchGitHubFile(
  repoUrl: string,
  filePath: string,
): Promise<string> {
  const rawUrl = resolveGitHubRawUrl(repoUrl, filePath);
  const res = await fetch(rawUrl);

  if (!res.ok) {
    throw new Error(
      `Could not fetch ${filePath} from repository (${res.status})`,
    );
  }

  return res.text();
}
