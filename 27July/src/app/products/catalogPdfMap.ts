// Which products have a downloadable catalog PDF (public/catalogs/<slug>.pdf).
// Kept as a separate lookup rather than a field on every entry in the large
// data.ts array — see scripts/generateCatalogPdfs.mjs for how these PDFs
// were produced (one page each, built from client-supplied catalog images).
//
// "durashield" is included here even though its source sheet read
// "Durashield Emulsion" rather than "Durashield" exactly — see the mapping
// note in that script. Remove it from this list if that turns out to be
// the wrong product.
const SLUGS_WITH_CATALOG_PDF = new Set([
  "shield-emulsion", "lotusguard", "danashield", "lotusguard-interior",
  "stainshield-emulsion", "pureguard-emulsion", "guardmax-emulsion", "elasticore-pro",
  "graphtech-ext", "bondwell-primer", "velvetouch-emulsion", "bondlock-primer",
  "aquaguard-clear", "terracoat-pro", "lithos-ext", "lithotex",
  "duracryl-emulsion", "armorcoat-tex", "dholtex-ext", "armorcoat-textura",
  "armortex", "quartz-tex", "litho-stone-tex", "shieldtex",
  "flexibond-ext", "graphex", "textura-pro", "flexishield",
  "shield-pu-emulsion", "nanoshield", "shieldex-pro", "extraguard",
  "pestgard-enamel", "nanoshield-ext", "dustguard-emulsion", "duracore",
  "graphtech-shield", "epoxishield", "lustra-enamel", "lucid-enamel",
  "lustra-gloss", "glazepro", "duracore-enamel", "satinshield-emulsion",
  "metalock-zinc-pro", "luxeshield", "zincoat-epoxy", "bondseal-pro",
  "lustra-shield", "zodiac-emulsion", "eva-emulsion", "duraguard-interior",
  "duraguard-exterior", "decorprime", "aquaproof", "aquaris-supra",
  "metalock-red-pro", "decorx-acrylic-distemper", "eco-acrylic-distemper", "oil-paint-premium",
  "metalock-red", "metalock-yellow", "metalock-yellow-pro", "jet-emulsion",
  "uniprime", "uniprime-ext", "glossmate-enamel", "tough-tex",
  "buildwell-ready-mix-plaster", "crux-coarse-finish", "crux-supra-fine-finish", "ara-weather-coat",
  "axis-weather-coat", "valucoat", "valuegloss", "valuemate-emulsion",
  "extend-emulsion", "purecoat", "fungiguard-emulsion", "shieldsheen",
  "luxura-pro", "nanoshield-pro", "woodguard-pro", "smoothfill-pro",
  "bondtex", "bondfix-ext", "silicoat-prime", "bondfix-white",
  "durafill-white", "crackseal-ext", "hydrofix-pro", "bondfix",
  "hydroshield-putty", "fibraguard", "flexishield-pro", "hydroflex",
  "hydroshield-pro", "armorflex", "hydroshield", "elastoseal",
  "durashield",
  "vivida-ext", "duraguard-emulsion", "aquashield-emulsion",
  "lustra-emulsion", "solaris-shield", "duraguard-pro", "twinshield-pro",
  "duracote", "roofguard-pro", "lumina-emulsion", "lumina-pro",
  "twinshield-emulsion", "velvet-shield", "lumix-sheen", "velveton-ultra",
  "lustra-teflon-pro", "silkura", "heritage-lime", "veda-lustre",
  "armorshield", "bondfix-dry", "bondfix-tile-adhesive", "dampshield",
  "dryguard-pro", "durashield-ext", "flexgrip-pro", "purebase-ext",
  "sealbond", "lustra-twin", "sealbond-ext", "armorcoat",
]);

/** Returns the public URL of a product's catalog PDF, or null if it doesn't have one. */
export function getCatalogPdfUrl(slug: string): string | null {
  return SLUGS_WITH_CATALOG_PDF.has(slug) ? `/catalogs/${slug}.pdf` : null;
}
