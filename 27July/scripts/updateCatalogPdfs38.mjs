// One-off: converts the final corrected catalog sheets for the 38
// originally-flagged products into PDFs and overwrites the matching file in
// public/catalogs/, so the live "Download Catalog" button on each product
// page serves the corrected sheet. Source: user-provided folder with files
// already named after the product (no identification/matching needed this
// time), cross-checked against src/app/products/data.ts for exact slugs.
//
// Two names needed correcting against the real data: the source file
// "Decoprime.png" maps to the product actually named "Decorprime" (slug
// decorprime) — the catalog heading's spelling was the wrong one, not the
// body text, contrary to what was assumed earlier in the review. Likewise
// "HydroShield Pro.png" maps to "Hydroshield Pro" (slug hydroshield-pro).

import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import path from "node:path";
import fs from "node:fs";

const SRC_DIR = "C:/Users/Pranav/Downloads/final_updated_38";
const OUT_DIR = path.resolve(import.meta.dirname, "..", "public", "catalogs");

// source filename -> product slug (verified against src/app/products/data.ts)
const MAPPING = {
  "AquaShield Emulsion.png": "aquashield-emulsion",
  "ArmorFlex.png": "armorflex",
  "Armorcoat Textura.png": "armorcoat-textura",
  "Bondfix Dry.png": "bondfix-dry",
  "Bondfix Tile Adhesive.png": "bondfix-tile-adhesive",
  "Bondseal Pro.png": "bondseal-pro",
  "Decoprime.png": "decorprime", // real product name is "Decorprime"
  "Decorx Acrylic Distemper.png": "decorx-acrylic-distemper",
  "DryGuard Pro.png": "dryguard-pro",
  "Duraguard Pro.png": "duraguard-pro",
  "Durashield Ext.png": "durashield-ext",
  "Elasticore Pro.png": "elasticore-pro",
  "Epoxishield.png": "epoxishield",
  "Flexgrip Pro.png": "flexgrip-pro",
  "FlexiShield.png": "flexishield",
  "Graphtech Ext.png": "graphtech-ext",
  "Graphtech Shield.png": "graphtech-shield",
  "GuardMax Emulsion.png": "guardmax-emulsion",
  "HydroShield Pro.png": "hydroshield-pro", // real product name is "Hydroshield Pro"
  "HydroShield.png": "hydroshield",
  "Lumina Emulsion.png": "lumina-emulsion",
  "Lumina Pro.png": "lumina-pro",
  "Lustra Emulsion.png": "lustra-emulsion",
  "Lustra Shield.png": "lustra-shield",
  "PureGuard Emulsion.png": "pureguard-emulsion",
  "Purebase Ext.png": "purebase-ext",
  "Roofguard Pro.png": "roofguard-pro",
  "Sealbond Ext.png": "sealbond-ext",
  "Sealbond.png": "sealbond",
  "Shield PU Emulsion.png": "shield-pu-emulsion",
  "Shieldtex.png": "shieldtex",
  "Solaris Shield.png": "solaris-shield",
  "Stainshield Emulsion.png": "stainshield-emulsion",
  "TerraCoat Pro.png": "terracoat-pro",
  "Uniprime Ext.png": "uniprime-ext",
  "Veda Lustre.png": "veda-lustre",
  "Velvetouch Emulsion.png": "velvetouch-emulsion",
  "Vivida Ext.png": "vivida-ext",
};

async function convertOne(filename, slug) {
  const srcPath = path.join(SRC_DIR, filename);
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
  const entries = Object.entries(MAPPING);
  let done = 0;
  for (const [filename, slug] of entries) {
    const srcPath = path.join(SRC_DIR, filename);
    if (!fs.existsSync(srcPath)) {
      console.log("MISSING SOURCE FILE, skipped:", filename, "(", slug, ")");
      continue;
    }
    await convertOne(filename, slug);
    done++;
    console.log("updated:", slug + ".pdf");
  }
  console.log(`\nDone. Updated ${done}/${entries.length} catalog PDFs.`);
}

main();
