// One-off, dev-time conversion: takes the numbered catalog PNGs the client
// supplied (1.png..132.png, unlabeled) and turns each into a single-page PDF
// named after the correct product slug, so the site can link a real
// "Download Catalog" file per product. Not imported by the app at runtime —
// run manually with `node scripts/generateCatalogPdfs.mjs` if the source
// images or mapping ever change.
//
// The number -> product mapping below was built by visually reading the
// product name printed on each catalog sheet (there's no other way to tell
// them apart — the source files are numbered, not named) and matching it
// against src/app/products/data.ts. One entry (101 -> durashield) is a
// near-match, not exact: the sheet reads "Durashield Emulsion" but the live
// product is named "Durashield" with no exact-match sheet of its own — see
// the mapping note below.

import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import path from "node:path";
import fs from "node:fs";

const SRC_DIR = "C:/Users/Pranav/Downloads/Final_Catalog";
const OUT_DIR = path.resolve(import.meta.dirname, "..", "public", "catalogs");

// image number -> product slug (src/app/products/data.ts)
const MAPPING = {
  1: "shield-emulsion", 2: "lotusguard", 3: "danashield", 4: "lotusguard-interior",
  5: "stainshield-emulsion", 6: "pureguard-emulsion", 7: "guardmax-emulsion", 8: "elasticore-pro",
  9: "graphtech-ext", 10: "bondwell-primer", 11: "velvetouch-emulsion", 12: "bondlock-primer",
  13: "aquaguard-clear", 14: "terracoat-pro", 15: "lithos-ext", 16: "lithotex",
  17: "duracryl-emulsion", 18: "armorcoat-tex", 19: "dholtex-ext", 20: "armorcoat-textura",
  21: "armortex", 22: "quartz-tex", 23: "litho-stone-tex", 24: "shieldtex",
  25: "flexibond-ext", 26: "graphex", 27: "textura-pro", 28: "flexishield",
  29: "shield-pu-emulsion", 30: "nanoshield", 31: "shieldex-pro", 32: "extraguard",
  33: "pestgard-enamel", 34: "nanoshield-ext", 35: "dustguard-emulsion", 36: "duracore",
  37: "graphtech-shield", 38: "epoxishield", 39: "lustra-enamel", 40: "lucid-enamel",
  41: "lustra-gloss", 42: "glazepro", 43: "duracore-enamel", 44: "satinshield-emulsion",
  45: "metalock-zinc-pro", 46: "luxeshield", 47: "zincoat-epoxy", 48: "bondseal-pro",
  49: "lustra-shield", 50: "zodiac-emulsion", 51: "eva-emulsion", 52: "duraguard-interior",
  53: "duraguard-exterior", 54: "decorprime", 55: "aquaproof", 56: "aquaris-supra",
  57: "metalock-red-pro", 58: "decorx-acrylic-distemper", 59: "eco-acrylic-distemper", 60: "oil-paint-premium",
  61: "metalock-red", 62: "metalock-yellow", 63: "metalock-yellow-pro", 64: "jet-emulsion",
  65: "uniprime", 66: "uniprime-ext", 67: "glossmate-enamel", 68: "tough-tex",
  69: "buildwell-ready-mix-plaster", 70: "crux-coarse-finish", 71: "crux-supra-fine-finish", 72: "ara-weather-coat",
  73: "axis-weather-coat", 74: "valucoat", 75: "valuegloss", 76: "valuemate-emulsion",
  77: "extend-emulsion", 78: "purecoat", 79: "fungiguard-emulsion", 80: "shieldsheen",
  81: "luxura-pro", 82: "nanoshield-pro", 83: "woodguard-pro", 84: "smoothfill-pro",
  85: "bondtex", 86: "bondfix-ext", 87: "silicoat-prime", 88: "bondfix-white",
  89: "durafill-white", 90: "crackseal-ext", 91: "hydrofix-pro", 92: "bondfix",
  93: "hydroshield-putty", 94: "fibraguard", 95: "flexishield-pro", 96: "hydroflex",
  97: "hydroshield-pro", 98: "armorflex", 99: "hydroshield", 100: "elastoseal",
  // Sheet reads "Durashield Emulsion" — no product has that exact name.
  // "Durashield" (plain) was the one product left with no sheet after every
  // other image matched something else 1:1, so this is a confident but not
  // literal-text match. Flagged to the client for confirmation.
  101: "durashield",
  102: "vivida-ext", 103: "duraguard-emulsion", 104: "aquashield-emulsion",
  105: "lustra-emulsion", 106: "solaris-shield", 107: "duraguard-pro", 108: "twinshield-pro",
  109: "duracote", 110: "roofguard-pro", 111: "lumina-emulsion", 112: "lumina-pro",
  113: "twinshield-emulsion", 114: "velvet-shield", 115: "lumix-sheen", 116: "velveton-ultra",
  117: "lustra-teflon-pro", 118: "silkura", 119: "heritage-lime", 120: "veda-lustre",
  121: "armorshield", 122: "bondfix-dry", 123: "bondfix-tile-adhesive", 124: "dampshield",
  125: "dryguard-pro", 126: "durashield-ext", 127: "flexgrip-pro", 128: "purebase-ext",
  129: "sealbond", 130: "lustra-twin", 131: "sealbond-ext", 132: "armorcoat",
};

async function convertOne(num, slug) {
  const srcPath = path.join(SRC_DIR, `${num}.png`);
  const pngBytes = await sharp(srcPath).png().toBuffer();
  const meta = await sharp(srcPath).metadata();

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([meta.width, meta.height]);
  const image = await pdfDoc.embedPng(pngBytes);
  page.drawImage(image, { x: 0, y: 0, width: meta.width, height: meta.height });

  const outPath = path.join(OUT_DIR, `${slug}.pdf`);
  fs.writeFileSync(outPath, await pdfDoc.save());
  return outPath;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const entries = Object.entries(MAPPING);
  let done = 0;
  for (const [num, slug] of entries) {
    await convertOne(num, slug);
    done++;
  }
  console.log(`Converted ${done}/${entries.length} catalog PDFs into ${OUT_DIR}`);

  // Sanity check: flag any duplicate slug (two source images mapped to the
  // same product) or any product referenced twice.
  const slugs = Object.values(MAPPING);
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  if (dupes.length) console.log("WARNING duplicate slugs in mapping:", [...new Set(dupes)]);
}

main();
