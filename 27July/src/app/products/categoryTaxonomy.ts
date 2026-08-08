// Shared category hierarchy for the Products mega-menu, the mobile Products
// accordion, and the Products page's simplified filter bar / default grouped
// view. Built directly from the raw `category` strings in data.ts (which has
// real-world inconsistencies — plurals, near-duplicates like "Tile Adhesive"
// vs "Tile Adhesives" — so subcategories intentionally merge those variants
// under one clean, clickable label rather than inventing new categories).
//
// Every raw category string in data.ts must appear in exactly one
// subcategory's `categories` array — enforced by a dev-time check in
// products/page.tsx (see `assertTaxonomyCoversAllCategories`).

export interface Subcategory {
  slug: string;
  label: string;
  categories: string[]; // exact raw `product.category` values this covers
}

export interface CategoryColumn {
  slug: string;
  title: string;
  subcategories: Subcategory[];
}

export const CATEGORY_TAXONOMY: CategoryColumn[] = [
  {
    slug: "interior-paints",
    title: "Interior Paints",
    subcategories: [
      { slug: "emulsions", label: "Emulsions", categories: ["Emulsion Paints"] },
      { slug: "interior-paints", label: "Interior Paints", categories: ["Interior Paints", "Interior Wall Paint"] },
      { slug: "distempers", label: "Distempers", categories: ["Distempers"] },
    ],
  },
  {
    slug: "exterior-paints-textures",
    title: "Exterior Paints & Textures",
    subcategories: [
      { slug: "exterior-emulsions", label: "Exterior Emulsions", categories: ["Exterior Paints", "Exterior Emulsion Paints", "Exterior Emulsion Paint", "Exterior Painting System"] },
      { slug: "exterior-textures", label: "Exterior Textures", categories: ["Exterior Textures", "Exterior Texture", "Exterior Texture Protective Coat"] },
      { slug: "exterior-primers", label: "Exterior Primers", categories: ["Exterior Primers", "Exterior Wall Primer", "Exterior Wall Primers"] },
    ],
  },
  {
    slug: "enamels-primers-sealers",
    title: "Enamels, Primers & Sealers",
    subcategories: [
      { slug: "enamels-decoratives", label: "Enamels & Decoratives", categories: ["Enamel Paints", "Metal Paints / Enamel Paints", "Decorative Paints", "Oil Paints", "Wood Coatings"] },
      { slug: "primers-sealers", label: "Primers & Sealers", categories: ["Primers", "Primers and Sealers"] },
    ],
  },
  {
    slug: "waterproofing-construction",
    title: "Waterproofing & Construction",
    subcategories: [
      { slug: "waterproofing", label: "Waterproofing", categories: ["Waterproofing"] },
      { slug: "wall-putty-fillers", label: "Wall Putty & Fillers", categories: ["Wall Finishes", "Construction Materials", "Wall Putty", "Wall Fillers", "Wall Fillers/Putty"] },
      { slug: "tile-adhesives", label: "Tile Adhesives", categories: ["Tile Adhesive", "Tile Adhesives"] },
    ],
  },
  {
    slug: "industrial-protective",
    title: "Industrial & Protective",
    subcategories: [
      { slug: "protective-coatings", label: "Protective Coatings", categories: ["Protective Coatings", "Metal Primer / Industrial Coating", "Metal Primer", "Epoxy Coatings"] },
      { slug: "industrial-coatings", label: "Industrial Coatings", categories: ["Industrial Coatings", "Industrial Textiles"] },
      { slug: "roof-floor", label: "Roof & Floor Coatings", categories: ["Roof Coating", "Floor Coatings"] },
    ],
  },
];

// Flat lookup: any slug (column OR subcategory) -> the raw category strings
// it should match. Used by the Products page to resolve `?category=<slug>`.
export const SLUG_TO_CATEGORIES: Record<string, string[]> = {};
for (const column of CATEGORY_TAXONOMY) {
  const all: string[] = [];
  for (const sub of column.subcategories) {
    SLUG_TO_CATEGORIES[sub.slug] = sub.categories;
    all.push(...sub.categories);
  }
  SLUG_TO_CATEGORIES[column.slug] = all;
}

/** Dev-time integrity check: every raw category in `allCategories` must be
 * covered by exactly one subcategory. Returns problems found (empty = OK). */
export function checkTaxonomyCoverage(allCategories: string[]): { missing: string[]; duplicated: string[] } {
  const seen = new Map<string, number>();
  for (const column of CATEGORY_TAXONOMY) {
    for (const sub of column.subcategories) {
      for (const cat of sub.categories) {
        seen.set(cat, (seen.get(cat) ?? 0) + 1);
      }
    }
  }
  const missing = allCategories.filter((c) => !seen.has(c));
  const duplicated = [...seen.entries()].filter(([, n]) => n > 1).map(([c]) => c);
  return { missing, duplicated };
}
