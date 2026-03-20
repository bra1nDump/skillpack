/**
 * Validates an install command by checking if the npm package exists.
 * Accepts commands like:
 *   npx skills add my-skill
 *   npx @anthropics/skills
 *   npm install my-package
 *   npx some-cli@latest install thing
 */

const ALLOWED_PREFIXES = ["npx ", "npm install ", "npm i "];

export function parsePackageName(command: string): string | null {
  const trimmed = command.trim();

  for (const prefix of ALLOWED_PREFIXES) {
    if (!trimmed.startsWith(prefix)) continue;

    const rest = trimmed.slice(prefix.length).trim();
    // First token after the prefix is the package (possibly with @version)
    const token = rest.split(/\s/)[0];
    if (!token) return null;

    // Strip version suffix: package@latest → package, @scope/pkg@1.0 → @scope/pkg
    const atParts = token.split("@");
    if (token.startsWith("@")) {
      // Scoped: @scope/pkg or @scope/pkg@version
      return atParts.length >= 3
        ? `@${atParts[1]}`  // @scope/pkg@version → @scope/pkg
        : `@${atParts[1]}`; // @scope/pkg
    }
    // Unscoped: pkg or pkg@version
    return atParts[0];
  }

  return null;
}

export async function validateInstallCommand(command: string): Promise<{
  valid: boolean;
  error?: string;
  packageName?: string;
}> {
  const trimmed = command.trim();

  // Check prefix
  const hasValidPrefix = ALLOWED_PREFIXES.some((p) => trimmed.startsWith(p));
  if (!hasValidPrefix) {
    return {
      valid: false,
      error: `Command must start with one of: ${ALLOWED_PREFIXES.map((p) => `"${p.trim()}"`).join(", ")}`,
    };
  }

  const packageName = parsePackageName(trimmed);
  if (!packageName) {
    return { valid: false, error: "Could not parse package name from command" };
  }

  // Check npm registry
  try {
    const res = await fetch(
      `https://registry.npmjs.org/${encodeURIComponent(packageName)}`,
      { method: "HEAD" },
    );

    if (res.ok) {
      return { valid: true, packageName };
    }

    return {
      valid: false,
      error: `Package "${packageName}" not found on npm`,
    };
  } catch {
    // Network error — don't block, just warn
    return { valid: true, packageName };
  }
}
