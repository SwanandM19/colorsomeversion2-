import type { Product } from "./data";

export interface FaqItem {
  q: string;
  a: string;
}

type TechSpecs = NonNullable<Product["technicalSpecs"]>;

// Maps every raw category string found in data.ts to a shared FAQ template
// group. Several raw strings describe the same real-world product type
// (e.g. "Exterior Emulsion Paint" / "Exterior Emulsion Paints" / "Exterior
// Painting System" are all facade emulsions), so they resolve to one group
// rather than each needing its own template.
const CATEGORY_GROUP_MAP: Record<string, string> = {
  "Emulsion Paints": "interior-emulsion",
  "Interior Paints": "interior-emulsion",
  "Interior Wall Paint": "interior-emulsion",
  "Distempers": "interior-emulsion",

  "Exterior Emulsion Paint": "exterior-emulsion",
  "Exterior Emulsion Paints": "exterior-emulsion",
  "Exterior Painting System": "exterior-emulsion",
  "Exterior Paints": "exterior-emulsion",

  "Enamel Paints": "enamel-metal",
  "Metal Paints / Enamel Paints": "enamel-metal",
  "Decorative Paints": "enamel-metal",
  "Oil Paints": "enamel-metal",

  "Primers": "primer",
  "Primers and Sealers": "primer",

  "Wall Finishes": "wall-putty",
  "Construction Materials": "wall-putty",

  "Exterior Texture": "texture",
  "Exterior Textures": "texture",
  "Exterior Texture Protective Coat": "texture",

  "Waterproofing": "waterproofing",

  "Protective Coatings": "industrial-coating",
  "Industrial Coatings": "industrial-coating",
  "Metal Primer / Industrial Coating": "industrial-coating",
  "Epoxy Coatings": "industrial-coating",
  "Roof Coating": "industrial-coating",
  "Floor Coatings": "industrial-coating",
  "Industrial Textiles": "industrial-coating",

  "Tile Adhesive": "tile-adhesive",
};

function resolveGroup(category: string): string {
  return CATEGORY_GROUP_MAP[category] ?? "interior-emulsion";
}

// Each template's answers are written generically-but-truthfully for the
// category. Where a specific product actually has real technicalSpecs data,
// {{coverage}} / {{dryingTime}} / {{finish}} / {{application}} tokens are
// swapped in for that real value; otherwise the sentence falls back to
// general guidance rather than inventing a number.
const TEMPLATES: Record<string, (p: Product, ts: TechSpecs) => FaqItem[]> = {
  "interior-emulsion": (p, ts) => [
    {
      q: `How many coats does ${p.name} need for full coverage?`,
      a: "Two coats over a properly primed wall is standard for full opacity and colour uniformity. Deep colour changes or unprimed plaster may need a third coat.",
    },
    {
      q: "Do I need to prime the wall first?",
      a: "Yes — a wall primer seals the surface, evens out porosity, and helps the emulsion colour develop true and consistent. Skipping it usually means patchier coverage and more paint used.",
    },
    {
      q: ts.dryingTime
        ? `What is the recoat time for ${p.name}?`
        : "How long should I wait between coats?",
      a: ts.dryingTime
        ? `${ts.dryingTime}. Keep the room ventilated and avoid direct sun or damp conditions during drying.`
        : "Allow the first coat to dry fully — typically a few hours under normal indoor conditions — before applying the second coat.",
    },
    {
      q: "Is this paint washable?",
      a: p.features?.some((f) => /wash|scrub|stain/i.test(f))
        ? "Yes — this finish is formulated to be wipeable, so everyday marks can be cleaned with a damp cloth and mild detergent without dulling the sheen."
        : "Most interior emulsions can be gently wiped once fully cured (usually after 7 days); avoid abrasive scrubbing on lower-sheen finishes.",
    },
    {
      q: "What surfaces is it suitable for?",
      a: p.applications?.length
        ? `${p.name} is intended for ${p.applications.join(", ").toLowerCase()}.`
        : "Suitable for properly prepared interior plaster, putty, and concrete wall surfaces.",
    },
  ],

  "exterior-emulsion": (p, ts) => [
    {
      q: "Does this paint need a primer coat?",
      a: "Yes — an exterior primer improves adhesion and blocks alkali salts from the masonry bleeding through into your topcoat, which is essential for long-term colour retention outdoors.",
    },
    {
      q: ts.coverage
        ? `What coverage can I expect from ${p.name}?`
        : "How much area will one coat cover?",
      a: ts.coverage
        ? `${ts.coverage} under normal application on a properly primed surface.`
        : "Coverage varies with surface porosity and texture — a professional applicator can confirm exact quantity for your wall area.",
    },
    {
      q: "How does it hold up against monsoon and heat?",
      a: p.features?.some((f) => /weather|water|algae|fungal|uv|fade/i.test(f))
        ? "It's formulated for year-round outdoor exposure — built to resist rain, humidity, algal growth, and UV fading through repeated weather cycles."
        : "Exterior emulsions are designed for outdoor exposure, but performance in extreme climates is improved further with a matching exterior primer and correct number of coats.",
    },
    {
      q: "Can it be applied over an old, existing coat of paint?",
      a: "Yes, provided the existing surface is sound — free of flaking, chalking, or fungal growth. Loose material should be scraped and washed off before repainting.",
    },
    {
      q: "Will the colour fade over time?",
      a: p.features?.some((f) => /fade|uv|colour retention/i.test(f))
        ? "It's engineered with UV-resistant pigments to slow fading, though all exterior paints will mellow gradually with years of direct sun exposure."
        : "Some gradual fading is normal for any exterior paint under prolonged sun exposure; darker shades typically show it sooner than lighter ones.",
    },
  ],

  "enamel-metal": (p, ts) => [
    {
      q: "Do I need a primer before applying this enamel?",
      a: p.features?.some((f) => /primer-free|no primer|direct application/i.test(f))
        ? "This formulation is designed for direct application without a separate primer coat on most prepared metal surfaces."
        : "For bare metal, a rust-inhibiting primer (e.g. red oxide) is recommended first; for wood, a wood primer helps the enamel bond and cure evenly.",
    },
    {
      q: ts.dryingTime ? "How long before it's ready for a second coat?" : "How long does this enamel take to dry?",
      a: ts.dryingTime
        ? `${ts.dryingTime}.`
        : "Touch-dry in a few hours, but allow a full day between coats for the hardest, most durable finish.",
    },
    {
      q: "Will it yellow or lose its gloss over time?",
      a: p.features?.some((f) => /non-yellow|yellowing/i.test(f))
        ? "It's formulated to resist yellowing, so the gloss and shade should stay true for years rather than dulling or ambering."
        : "Standard enamels can yellow slightly with age and UV exposure, particularly on interior surfaces away from direct light rotation.",
    },
    {
      q: "What surfaces can I use it on?",
      a: p.applications?.length
        ? `Formulated for ${p.applications.join(", ").toLowerCase()}.`
        : "Suitable for metal, wood, and previously enamelled surfaces once properly cleaned and sanded.",
    },
    {
      q: "How do I clean brushes and tools afterwards?",
      a: "Since this is typically a solvent/oil-based enamel, clean brushes and rollers with mineral turpentine or the thinner recommended on the product label, not water.",
    },
  ],

  primer: (p, ts) => [
    {
      q: "Do I need to dilute this primer before applying it?",
      a: ts.dilution
        ? `${ts.dilution}.`
        : "Most primers are diluted slightly with clean water or solvent as per the technical data sheet — check the container label for the exact ratio for your surface.",
    },
    {
      q: "How many coats of primer are needed?",
      a: "A single, even coat is usually enough to seal the surface and even out porosity before topcoating — heavily porous or repaired walls may need a second coat.",
    },
    {
      q: ts.dryingTime ? "How long before I can paint over this primer?" : "How long should the primer dry before topcoating?",
      a: ts.dryingTime
        ? `${ts.dryingTime}.`
        : "Allow several hours of drying time (longer in humid conditions) before applying your topcoat.",
    },
    {
      q: "Can this primer be used on both interior and exterior walls?",
      a: p.applications?.length
        ? `It's intended for ${p.applications.join(", ").toLowerCase()}.`
        : "Check the applications list above — some primers are formulated specifically for one or the other, not interchangeably.",
    },
    {
      q: "Why can't I just skip the primer and paint directly?",
      a: "Without a primer, porous or alkaline surfaces can absorb topcoat unevenly, cause patchiness, and reduce how well the final paint adheres and lasts over time.",
    },
  ],

  "wall-putty": (p, ts) => [
    {
      q: "How many coats of putty are typically required?",
      a: "Two thin coats generally give the smoothest, most even base — applying it too thick in one pass increases the chance of cracking as it dries.",
    },
    {
      q: "How long does the putty need to dry before sanding?",
      a: ts.dryingTime
        ? `${ts.dryingTime}.`
        : "Allow it to dry fully — usually the better part of a day depending on coat thickness and humidity — before sanding smooth.",
    },
    {
      q: "Can it be applied on both interior and exterior walls?",
      a: p.applications?.length
        ? `Yes — it's suited for ${p.applications.join(", ").toLowerCase()}.`
        : "Check the applications list above; some putty formulations are interior-only while others are rated for exterior exposure.",
    },
    {
      q: "Do I need to prime the wall before applying putty?",
      a: "The wall should at least be cleaned of dust, loose plaster, and algae; a bonding coat may be recommended on very smooth or previously painted surfaces for better grip.",
    },
    {
      q: "What pack size do I need for one room?",
      a: p.packSizes?.length
        ? `It's available in ${p.packSizes.join(", ")} — a professional applicator or our team can help estimate quantity from your wall area.`
        : "Quantity depends on wall area and surface condition — our team can help estimate this for your project.",
    },
  ],

  texture: (p, ts) => [
    {
      q: "What tools are used to apply this texture finish?",
      a: "Textured exterior finishes are typically trowel- or roller-applied by a trained applicator to build the pattern, rather than brushed on like a standard paint.",
    },
    {
      q: "Does it need a base coat or primer first?",
      a: "Yes — a compatible exterior primer or base coat is recommended so the textured layer bonds properly and doesn't crack away from the wall over time.",
    },
    {
      q: "How long does the textured finish take to fully cure?",
      a: ts.dryingTime
        ? `${ts.dryingTime}.`
        : "Full cure typically takes longer than a standard flat paint due to the thickness of the applied texture — allow it to dry undisturbed for at least a full day, longer in humid weather.",
    },
    {
      q: "Is professional application recommended?",
      a: "Yes — achieving a consistent texture pattern across a whole facade takes practice, so we recommend an experienced applicator rather than a first-time DIY attempt.",
    },
    {
      q: "How does it perform in monsoon and direct sun?",
      a: p.features?.some((f) => /weather|water|crack|uv|algae/i.test(f))
        ? "It's built for continuous outdoor exposure — engineered to resist cracking, algal growth, and UV fade across weather cycles."
        : "Exterior texture finishes are designed for outdoor exposure, and their thicker film generally resists hairline cracking better than flat paint.",
    },
  ],

  waterproofing: (p, ts) => [
    {
      q: "How many coats are needed for effective waterproofing?",
      a: "Two coats applied in a cross-hatch pattern (second coat perpendicular to the first) is the standard method to eliminate pinhole gaps and ensure a continuous membrane.",
    },
    {
      q: "Does this need to be diluted before the first coat?",
      a: ts.dilution
        ? `${ts.dilution}.`
        : "Many waterproofing compounds are diluted with water for the first coat to act as a deep-penetrating primer, then applied undiluted for subsequent coats — check the product label for the exact ratio.",
    },
    {
      q: ts.dryingTime ? "How long before the surface is fully waterproof?" : "How long does it take to cure fully?",
      a: ts.dryingTime
        ? `${ts.dryingTime}.`
        : "Allow several hours between coats and avoid exposing the surface to water or foot traffic until fully cured, typically over 24–48 hours.",
    },
    {
      q: "Can it be used on an active leak or must the area be dry first?",
      a: "The surface should be dry and structurally sound — cracks should be opened, cleaned, and sealed before applying, since the coating waterproofs the surface rather than stopping an active structural leak.",
    },
    {
      q: "Where can this be applied?",
      a: p.applications?.length
        ? `It's suited for ${p.applications.join(", ").toLowerCase()}.`
        : "Commonly used on roofs, terraces, bathrooms, and other surfaces regularly exposed to water.",
    },
  ],

  "industrial-coating": (p, ts) => [
    {
      q: "Does this coating need surface preparation before application?",
      a: "Yes — for metal substrates this typically means removing rust, scale, and grease down to a clean, sound surface so the coating can properly anchor and protect.",
    },
    {
      q: "Is this a single-component or multi-component system?",
      a: /epoxy/i.test(p.category) || p.features?.some((f) => /two-component|dual/i.test(f))
        ? "This is a multi-component system — the base and hardener must be mixed in the specified ratio just before application, within the stated pot life."
        : "Check the product label for mixing instructions — some industrial coatings are ready-to-use, others require on-site mixing.",
    },
    {
      q: ts.application ? "How is this coating typically applied?" : "What application methods work best?",
      a: ts.application
        ? `${ts.application}.`
        : "Brush, roller, or spray application all work, with spray generally giving the most even film thickness for large industrial surfaces.",
    },
    {
      q: "How long before the coated surface can be put back into service?",
      a: ts.dryingTime
        ? `${ts.dryingTime}.`
        : "Allow full cure time — often 24–72 hours depending on conditions — before subjecting the surface to mechanical load or moisture.",
    },
    {
      q: "What environments is it designed to withstand?",
      a: p.applications?.length
        ? `It's intended for ${p.applications.join(", ").toLowerCase()}.`
        : "Designed for demanding industrial, marine, or high-traffic environments — check the applications list above for specifics.",
    },
  ],

  "tile-adhesive": (p, ts) => [
    {
      q: "How is this tile adhesive mixed and applied?",
      a: "It's typically mixed with clean water to a lump-free, trowel-able paste and applied with a notched trowel to create even ridges before setting the tile.",
    },
    {
      q: "How long is the open/working time once mixed?",
      a: ts.dryingTime
        ? `${ts.dryingTime}.`
        : "Working time is normally around 20–30 minutes after mixing — only mix as much as you can tile within that window.",
    },
    {
      q: "Is it suitable for both floor and wall tiling?",
      a: p.applications?.length
        ? `Yes — it's intended for ${p.applications.join(", ").toLowerCase()}.`
        : "Check the applications list above — some adhesives are floor-rated only, while others handle both floor and wall tiling.",
    },
    {
      q: "How long before grouting after tiles are laid?",
      a: "Allow the adhesive to set fully first — typically 24 hours — before grouting, so the tiles aren't disturbed while the bond is still curing.",
    },
    {
      q: "What tile types does it work with?",
      a: "Suitable for ceramic and vitrified tiles on properly prepared, structurally sound surfaces; very large-format or natural stone tiles may need a specialised high-bond adhesive.",
    },
  ],
};

export function getCategoryFaq(product: Product): FaqItem[] {
  const group = resolveGroup(product.category);
  const techSpecs = product.technicalSpecs ?? {};
  const builder = TEMPLATES[group] ?? TEMPLATES["interior-emulsion"];
  return builder(product, techSpecs);
}
