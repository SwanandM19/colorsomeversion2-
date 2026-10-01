// One-off generator: creates a QR code PNG per product, with the Colorsome
// logo centered on top of each code, and saves them to /qr-codes.
//
// Usage:
//   node scripts/generate-qr-codes.mjs
//
// Change SITE_URL below if the production domain changes.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SITE_URL = "https://www.colorsomepaints.com";
const DATA_FILE = path.join(ROOT, "src/app/products/data.ts");
const LOGO_FILE = path.join(ROOT, "public/LogoWoBg.png");
const OUT_DIR = path.join(ROOT, "qr-codes");

const QR_SIZE = 1000; // px, output image is square
const LOGO_SCALE = 0.22; // logo width as a fraction of QR_SIZE

function extractProducts(source) {
  const products = [];
  // Each product is written as a single-line object literal starting with `{ id: "..."`.
  const lineRegex = /\{\s*id:\s*"[^"]*"[\s\S]*?\}(?=,\s*\n|\s*\];)/g;
  const matches = source.match(lineRegex) || [];
  for (const block of matches) {
    const nameMatch = block.match(/name:\s*"([^"]*)"/);
    const slugMatch = block.match(/slug:\s*"([^"]*)"/);
    if (nameMatch && slugMatch) {
      products.push({ name: nameMatch[1], slug: slugMatch[1] });
    }
  }
  return products;
}

function slugToFilename(slug) {
  return `${slug}.png`;
}

async function buildQrWithLogo(url, logoBuffer) {
  const qrBuffer = await QRCode.toBuffer(url, {
    errorCorrectionLevel: "H",
    type: "png",
    width: QR_SIZE,
    margin: 2,
    color: { dark: "#000000", light: "#FFFFFF" },
  });

  const logoSize = Math.round(QR_SIZE * LOGO_SCALE);
  const padding = Math.round(logoSize * 0.18);
  const padSize = logoSize + padding * 2;

  const resizedLogo = await sharp(logoBuffer)
    .resize(logoSize, logoSize, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();

  // White rounded square behind the logo so it stays legible against the QR modules.
  const badge = Buffer.from(
    `<svg width="${padSize}" height="${padSize}">
      <rect x="0" y="0" width="${padSize}" height="${padSize}" rx="${Math.round(padSize * 0.18)}" fill="#ffffff"/>
    </svg>`
  );

  const composed = await sharp(qrBuffer)
    .composite([
      { input: badge, left: Math.round((QR_SIZE - padSize) / 2), top: Math.round((QR_SIZE - padSize) / 2) },
      {
        input: resizedLogo,
        left: Math.round((QR_SIZE - logoSize) / 2),
        top: Math.round((QR_SIZE - logoSize) / 2),
      },
    ])
    .png()
    .toBuffer();

  return composed;
}

async function main() {
  const source = fs.readFileSync(DATA_FILE, "utf8");
  const products = extractProducts(source);

  if (products.length === 0) {
    throw new Error("No products found in data.ts — check the parsing regex still matches the file format.");
  }

  if (!fs.existsSync(LOGO_FILE)) {
    throw new Error(`Logo not found at ${LOGO_FILE}`);
  }
  const logoBuffer = fs.readFileSync(LOGO_FILE);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const { name, slug } of products) {
    const url = `${SITE_URL}/products/${slug}`;
    const png = await buildQrWithLogo(url, logoBuffer);
    const outPath = path.join(OUT_DIR, slugToFilename(slug));
    fs.writeFileSync(outPath, png);
    console.log(`✓ ${name} -> ${path.relative(ROOT, outPath)} (${url})`);
  }

  console.log(`\nDone. ${products.length} QR codes written to ${path.relative(ROOT, OUT_DIR)}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
