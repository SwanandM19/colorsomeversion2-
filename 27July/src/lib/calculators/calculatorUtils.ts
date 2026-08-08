// Shared math/formatting helpers used across every /calculators page.

export function formatINR(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export function formatINRCompact(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${Math.round(n)}`;
}

export interface PackCombo {
  size: number;
  count: number;
}

export interface PackOptimizationResult {
  combo: PackCombo[];
  totalPurchased: number;
  leftover: number;
}

/**
 * Optimal pack-combination optimizer (bounded dynamic programming, i.e. a
 * bounded coin-change search — not greedy). For the given required quantity
 * and available pack sizes, finds the combination that:
 *   1. meets or exceeds the requirement,
 *   2. minimizes leftover (purchased − required),
 *   3. minimizes total pack count among combinations tied on leftover.
 *
 * `packPrices` is optional and unused until real per-pack pricing is
 * supplied — when present it only breaks residual ties (same pack count)
 * in favour of the cheaper size, so cost-aware optimization can be turned
 * on later without changing this function's callers.
 */
export function optimizePackCombination(
  requiredQty: number,
  sizes: number[],
  packPrices?: Record<number, number>
): PackOptimizationResult {
  if (!Number.isFinite(requiredQty) || requiredQty <= 0 || sizes.length === 0) {
    return { combo: [], totalPurchased: 0, leftover: 0 };
  }
  const uniqueSizes = [...new Set(sizes)].filter((s) => Number.isFinite(s) && s > 0).sort((a, b) => b - a);
  if (uniqueSizes.length === 0) return { combo: [], totalPurchased: 0, leftover: 0 };

  const maxSize = uniqueSizes[0];
  // Smallest integer sum that could possibly satisfy the requirement.
  const threshold = Math.ceil(requiredQty - 1e-9);
  // Generous but bounded search window: any minimal-leftover solution is
  // guaranteed to fall within one extra "largest pack" of the threshold.
  const upperBound = threshold + maxSize;

  const packCount = new Array(upperBound + 1).fill(Infinity);
  const lastSizeUsed = new Array<number>(upperBound + 1).fill(-1);
  packCount[0] = 0;

  for (let sum = 1; sum <= upperBound; sum++) {
    for (const size of uniqueSizes) {
      if (size > sum) continue;
      const candidateCount = packCount[sum - size] + 1;
      if (candidateCount < packCount[sum]) {
        packCount[sum] = candidateCount;
        lastSizeUsed[sum] = size;
      } else if (candidateCount === packCount[sum] && packPrices && lastSizeUsed[sum] !== -1) {
        const currentCost = packPrices[lastSizeUsed[sum]] ?? Infinity;
        const candidateCost = packPrices[size] ?? Infinity;
        if (candidateCost < currentCost) lastSizeUsed[sum] = size;
      }
    }
  }

  let bestSum = -1;
  for (let sum = threshold; sum <= upperBound; sum++) {
    if (packCount[sum] < Infinity) {
      bestSum = sum;
      break;
    }
  }

  if (bestSum === -1) {
    // Only possible if the pack sizes can't combine to reach anywhere near
    // the requirement (e.g. a single oddly-sized pack) — fall back to
    // "enough of the largest pack" so the UI always has a sane answer.
    const count = Math.ceil(requiredQty / maxSize);
    return { combo: [{ size: maxSize, count }], totalPurchased: maxSize * count, leftover: maxSize * count - requiredQty };
  }

  const counts = new Map<number, number>();
  let remaining = bestSum;
  while (remaining > 0) {
    const size = lastSizeUsed[remaining];
    counts.set(size, (counts.get(size) ?? 0) + 1);
    remaining -= size;
  }
  const combo: PackCombo[] = uniqueSizes
    .filter((size) => counts.has(size))
    .map((size) => ({ size, count: counts.get(size)! }));

  return { combo, totalPurchased: bestSum, leftover: bestSum - requiredQty };
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function isValidPositiveNumber(v: string | number): boolean {
  const n = typeof v === "string" ? parseFloat(v) : v;
  return Number.isFinite(n) && n > 0 && n < 1_000_000;
}

/** Appends "(indicative)" to a How-was-this-calculated row value when the
 * underlying figure is a generic assumption rather than verified Colorsome
 * data, without cluttering the UI when it's genuinely verified. */
export function ratedSuffix(status: "verified" | "assumption"): string {
  return status === "assumption" ? " (indicative)" : "";
}
