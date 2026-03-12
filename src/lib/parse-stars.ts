export function parseStars(raw: string | undefined): number {
  if (!raw) return 0;
  const cleaned = raw.replace(/[+,]/g, "").trim();
  const match = cleaned.match(/^([\d.]+)\s*K?$/i);

  if (!match) return 0;
  const num = parseFloat(match[1]);

  return cleaned.toUpperCase().includes("K") ? num * 1000 : num;
}

export function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`;
  return String(n);
}
