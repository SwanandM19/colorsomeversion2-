// Centralized unit conversion for every calculator. All internal
// calculation math happens in a single base unit per quantity type
// (sq.ft for area, feet for length, litres for paint, kg for
// waterproofing/putty material) — user-facing unit toggles only convert
// AT the input/output boundary, never mid-formula, so rounding never
// compounds across a calculation.

export type AreaUnit = "sqft" | "sqm";
export type LengthUnit = "ft" | "m";

export const SQFT_PER_SQM = 10.76391;
export const FT_PER_M = 3.28084;

export function areaToSqft(value: number, unit: AreaUnit): number {
  return unit === "sqm" ? value * SQFT_PER_SQM : value;
}

export function sqftToArea(valueSqft: number, unit: AreaUnit): number {
  return unit === "sqm" ? valueSqft / SQFT_PER_SQM : valueSqft;
}

export function lengthToFeet(value: number, unit: LengthUnit): number {
  return unit === "m" ? value * FT_PER_M : value;
}

export const AREA_UNIT_LABEL: Record<AreaUnit, string> = { sqft: "sq.ft", sqm: "sq.m" };
export const LENGTH_UNIT_LABEL: Record<LengthUnit, string> = { ft: "ft", m: "m" };

/** Formats a sq.ft-based area value for display in the user's chosen unit,
 * rounding only for display — never feed this back into a calculation. */
export function formatArea(valueSqft: number, unit: AreaUnit): string {
  const converted = sqftToArea(valueSqft, unit);
  const rounded = unit === "sqm" ? Math.round(converted * 10) / 10 : Math.round(converted);
  return `${rounded.toLocaleString("en-IN")} ${AREA_UNIT_LABEL[unit]}`;
}
