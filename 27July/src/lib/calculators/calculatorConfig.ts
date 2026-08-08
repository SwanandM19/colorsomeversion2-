// ─────────────────────────────────────────────────────────────────────────
// CALCULATOR CONFIGURATION — single source of truth for every number used
// by the /calculators pages.
//
// DATA STATUS
// Every numeric value below is wrapped in a `Rated<T>` — `{ value, status }`
// — so the app can tell at runtime whether a figure is:
//   "verified"   — confirmed Colorsome technical/commercial data
//   "assumption" — a generic, indicative, industry-standard placeholder
//
// As of writing, EVERY value in this file is "assumption". None of it is
// verified Colorsome pricing, coverage, or labour data — see the data audit
// earlier in this project's history (no product in data.ts carries an
// absolute coverage rate, price, or labour figure). Calculator pages must
// never present an "assumption" value as an official Colorsome
// specification — the shared UI components read `.status` to decide
// wording ("indicative estimate" vs a plain figure).
//
// PRODUCT-LEVEL DATA
// `PRODUCT_CALCULATOR_DATA` is keyed by the real product `slug` used in
// src/app/products/data.ts, ready to hold verified per-product figures the
// moment they're supplied. It is empty today. The `resolve*` functions at
// the bottom implement the fallback chain calculator pages should use:
// verified per-product data first, generic category assumption otherwise —
// so no calculator component needs to change when real data arrives; only
// this file does.
// ─────────────────────────────────────────────────────────────────────────

export type DataStatus = "verified" | "assumption";

export interface Rated<T> {
  value: T;
  status: DataStatus;
  /** Optional human-readable provenance, e.g. "Colorsome TDS 2026" once real. */
  source?: string;
}

function assumption<T>(value: T, source?: string): Rated<T> {
  return { value, status: "assumption", source };
}

export const DATA_SOURCE_NOTE =
  "Figures used in this calculator are generic, indicative industry-standard estimates and are not confirmed Colorsome pricing or technical data.";

// ─── Room / area geometry assumptions ──────────────────────────────────────
export const AREA_ASSUMPTIONS = {
  // Standard door/window sizes used by the "Quick Estimate" opening method.
  standardDoorSqft: assumption(21, "Typical door ~3ft x 7ft"), // ~3ft x 7ft
  standardWindowSqft: assumption(15, "Typical window ~5ft x 3ft"), // ~5ft x 3ft
};

// ─── Paint coverage (sq.ft per litre, per coat) — generic by paint type ───
export const PAINT_COVERAGE_SQFT_PER_LITRE: Record<string, Rated<number>> = {
  "Interior Emulsion": assumption(130),
  "Exterior Emulsion": assumption(120),
  "Enamel": assumption(90),
  "Primer": assumption(140),
  "Distemper": assumption(110),
};
export const DEFAULT_COATS = 2;
export const WASTAGE_FACTOR = 1.1; // 10% buffer — standard trade practice

// ─── Labour (₹ per sq.ft) — generic estimate ───────────────────────────────
export const LABOUR_RATE_PER_SQFT: Record<"interior" | "exterior", Rated<number>> = {
  interior: assumption(8),
  exterior: assumption(11),
};

// ─── Primer / putty system (generic) ───────────────────────────────────────
export const PRIMER_PUTTY = {
  puttyCoverageSqftPerKg: assumption(18), // ~2 coats
  primerCoverageSqftPerLitre: assumption(140),
  puttyRatePerKg: assumption(22),
  primerRatePerLitre: assumption(130),
};

export const PAINT_RATE_PER_LITRE: Record<"economy" | "premium" | "luxury", Rated<number>> = {
  economy: assumption(220),
  premium: assumption(320),
  luxury: assumption(480),
};

// ─── Waterproofing (generic consumption by surface type) ──────────────────
export const WATERPROOFING_SURFACES = [
  { key: "terrace-roof", label: "Terrace / Roof", consumptionKgPerSqft: assumption(0.09), coats: 2 },
  { key: "bathroom", label: "Bathroom", consumptionKgPerSqft: assumption(0.06), coats: 2 },
  { key: "exterior-wall", label: "Exterior Wall", consumptionKgPerSqft: assumption(0.05), coats: 2 },
  { key: "interior-wall", label: "Interior Wall", consumptionKgPerSqft: assumption(0.04), coats: 2 },
  { key: "water-tank", label: "Water Tank", consumptionKgPerSqft: assumption(0.07), coats: 2 },
] as const;
export const WATERPROOFING_RATE_PER_KG = assumption(85);
// Repair/re-work surfaces conventionally need extra sealing material to
// address existing damage before the main system goes on — generic
// industry allowance, not a verified Colorsome-specific figure.
export const WATERPROOFING_REPAIR_MULTIPLIER = 1.15;

// ─── Purchasable pack sizes used for pack-combination optimization ─────────
// Generic sizes only — not tied to any specific product's real pack range
// (compare to the handful of products in data.ts with verified `packSizes`).
export const PACK_SIZES_LITRE = [20, 10, 4, 1];
export const PACK_SIZES_KG = [40, 20, 5, 1];

// ─── Product-requirement "system" (generic layer sequence) ────────────────
export const PAINTING_SYSTEM: Record<"fresh" | "repaint", { step: string; label: string }[]> = {
  fresh: [
    { step: "01", label: "Wall Putty" },
    { step: "02", label: "Primer" },
    { step: "03", label: "Topcoat" },
  ],
  repaint: [
    { step: "01", label: "Surface Preparation" },
    { step: "02", label: "Primer (where needed)" },
    { step: "03", label: "Topcoat" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// PER-PRODUCT DATA — keyed by the real product `slug` from
// src/app/products/data.ts. Empty until verified figures are supplied.
// Shape mirrors the category-level generics above so a slug's entry can
// override any subset of fields (partial data is fine — unset fields fall
// back to the category assumption).
// ─────────────────────────────────────────────────────────────────────────
export interface ProductCalculatorData {
  coverageSqftPerLitre?: Rated<number>;
  recommendedCoats?: Rated<number>;
  ratePerLitre?: Rated<number>;
  packSizesLitre?: Rated<number[]>;
}

export const PRODUCT_CALCULATOR_DATA: Record<string, ProductCalculatorData> = {
  // "jet-emulsion": {
  //   coverageSqftPerLitre: { value: 140, status: "verified", source: "Colorsome TDS 2026" },
  //   recommendedCoats: { value: 2, status: "verified", source: "Colorsome TDS 2026" },
  // },
};

/**
 * Fallback chain for coverage: verified per-product figure first (if a
 * product slug is given and has one), otherwise the generic category
 * assumption for the given paint type. Never fabricates a product-specific
 * number — an unmatched slug simply falls through to the category value
 * with `status: "assumption"` intact, so the UI can say so.
 */
export function resolveCoverage(paintType: string, productSlug?: string): Rated<number> {
  if (productSlug) {
    const productData = PRODUCT_CALCULATOR_DATA[productSlug]?.coverageSqftPerLitre;
    if (productData) return productData;
  }
  return PAINT_COVERAGE_SQFT_PER_LITRE[paintType] ?? PAINT_COVERAGE_SQFT_PER_LITRE["Interior Emulsion"];
}

export function resolveCoats(productSlug?: string): Rated<number> {
  if (productSlug) {
    const productData = PRODUCT_CALCULATOR_DATA[productSlug]?.recommendedCoats;
    if (productData) return productData;
  }
  return assumption(DEFAULT_COATS);
}

export function resolvePackSizesLitre(productSlug?: string): Rated<number[]> {
  if (productSlug) {
    const productData = PRODUCT_CALCULATOR_DATA[productSlug]?.packSizesLitre;
    if (productData) return productData;
  }
  return assumption(PACK_SIZES_LITRE);
}
