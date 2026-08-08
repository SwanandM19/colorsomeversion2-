// One-off, dev-time asset pipeline for the Colour Visualizer (Phase 1).
// Not imported by the app at runtime — run manually with `node scripts/generateVisualizerAssets.mjs`
// whenever source room photography or mask geometry changes.
//
// Produces:
//   public/visualizer/rooms/<room>.webp        — working image, capped resolution
//   public/visualizer/rooms/<room>-thumb.webp  — room-picker thumbnail
//   public/visualizer/masks/<room>-<wall>.png  — grayscale wall mask (white = paintable)
//
// Masks are authored here as hand-estimated polygons (rect-minus-exclusions,
// feathered) based on a visual inspection of each source photo — a
// legitimate first-pass MVP mask, not a designer-grade cutout. See the
// Phase 1 report(s) for which rooms/walls these cover and which still need
// a professional mask pass.

import sharp from "sharp";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "public");
const OUT_ROOMS = path.join(ROOT, "public", "visualizer", "rooms");
const OUT_MASKS = path.join(ROOT, "public", "visualizer", "masks");

const WORKING_MAX_WIDTH = 1400; // visualizer working-image cap (see perf notes)
const THUMB_WIDTH = 480;

const ROOM_SOURCES = [
  { key: "living-room", file: "LRoom.png" },
  { key: "bedroom", file: "Bed_Visualizerr.png" },
  { key: "kitchen", file: "Kitchen.png" },
  { key: "exterior", file: "ExteriorW.png" },
];

async function buildRoomImages() {
  for (const room of ROOM_SOURCES) {
    const srcPath = path.join(SRC_DIR, room.file);
    const meta = await sharp(srcPath).metadata();
    console.log(`${room.file}: ${meta.width}x${meta.height}`);

    await sharp(srcPath)
      .rotate()
      .resize({ width: Math.min(WORKING_MAX_WIDTH, meta.width ?? WORKING_MAX_WIDTH), withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(path.join(OUT_ROOMS, `${room.key}.webp`));

    await sharp(srcPath)
      .rotate()
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(OUT_ROOMS, `${room.key}-thumb.webp`));
  }
}

/**
 * A shape is either an axis-aligned rect { x, y, w, h } or a polygon
 * { points: [[x,y], ...] } — polygons matter for walls seen at a steep
 * perspective angle, where a rectangle either bleeds into the sky/adjacent
 * surfaces or under-covers the wall (an earlier rectangle-only version of
 * this script did exactly that on the Exterior facade's angled pillar).
 */
function shapeToSvg(shape, fill) {
  if (shape.points) {
    const pts = shape.points.map(([x, y]) => `${x},${y}`).join(" ");
    return `<polygon points="${pts}" fill="${fill}"/>`;
  }
  return `<rect x="${shape.x}" y="${shape.y}" width="${shape.w}" height="${shape.h}" fill="${fill}"/>`;
}

// NOTE: sharp's raw() output channel count depends on the pipeline (an
// earlier bug in this file assumed grayscale PNGs decode to 1 channel when
// they were actually 4) — always read `info.channels` back rather than
// assume a stride, to avoid silently reading the wrong bytes again.
async function rasterizeLayer(width, height, shapes, fillDefault, blur) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="${width}" height="${height}" fill="${fillDefault}"/>
    ${shapes}
  </svg>`;
  let pipeline = sharp(Buffer.from(svg)).grayscale();
  if (blur > 0) pipeline = pipeline.blur(blur);
  const { data, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });
  return { data, channels: info.channels };
}

/**
 * Renders a feathered grayscale mask: white = paintable, black = not.
 *
 * Two independent feather radii, composited rather than one global blur:
 *   - `featherOuter` softens the include shape's own boundary (wall-to-
 *     ceiling, wall-to-corner) — these are naturally soft in the photo
 *     anyway, so some feather there looks right.
 *   - `featherExclude` softens each exclude shape's edge separately, and
 *     much more tightly — these are hard object edges (furniture, frames),
 *     where a large blur creates a visible colour halo bleeding onto the
 *     object. A single global blur radius can't satisfy both at once,
 *     which is what produced the halos in the previous version of this
 *     mask; two separately-blurred layers multiplied together can.
 */
async function renderMask({ width, height, include, exclude = [], featherOuter = 6, featherExclude = 3, outPath }) {
  const includeSvg = shapeToSvg(include, "white");
  const includeLayer = await rasterizeLayer(width, height, includeSvg, "black", featherOuter);

  let excludeLayer;
  if (exclude.length > 0) {
    const excludeSvg = exclude.map((r) => shapeToSvg(r, "white")).join("");
    excludeLayer = await rasterizeLayer(width, height, excludeSvg, "black", featherExclude);
  }

  const pixelCount = width * height;
  const out = Buffer.alloc(pixelCount);
  for (let i = 0; i < pixelCount; i++) {
    const includeV = includeLayer.data[i * includeLayer.channels] / 255;
    const excludeV = excludeLayer ? excludeLayer.data[i * excludeLayer.channels] / 255 : 0;
    out[i] = Math.round(255 * includeV * (1 - excludeV));
  }

  await sharp(out, { raw: { width, height, channels: 1 } }).png().toFile(outPath);
}

async function buildMasks() {
  // ── Living Room — main wall, using LRoom.png
  await renderMask({
    width: 1536,
    height: 1024,
    include: { x: 236, y: 170, w: 1104, h: 600 },
    featherOuter: 6,
    outPath: path.join(OUT_MASKS, "living-room-main-wall.png"),
  });

  // ── Exterior — main facade wall, using ExteriorW.png
  await renderMask({
    width: 1536,
    height: 1024,
    // include: { x: 225, y: 145, w: 1210, h: 675 },
    include: {
  x: 150,   // was 225
  y: 138,   // was 145
  w: 1285,  // keep right edge the same (150 + 1285 = 1435)
  h: 695,   // extend down about 20px
},
    featherOuter: 6,
    outPath: path.join(OUT_MASKS, "exterior-main-wall.png"),
  });

  // ── Bedroom — side wall, using Bed_Visualizerr.png (replaces
  // Bed_Visualizer.png — new photo is shot nearly front-on with minimal
  // perspective skew, so the wall-to-ceiling and wall-to-floor lines are
  // both flat, unlike the previous photo's angled cove). Measured via a
  // pixel-grid overlay: top cove line sits flat at ~y=150 across the whole
  // wall width, floor/skirting line flat at ~y=730. Left boundary is set by
  // the bed's throw-blanket/bedspread corner, which curves out to ~x=800-810
  // between y=630-900 (an initial x=765 boundary was too close and leaked
  // colour onto it — confirmed via a real-browser render, not just the
  // source-photo estimate). x=820 clears it with margin. A plain rectangle
  // is enough here — no polygon needed since there's no meaningful
  // perspective angle to follow.
  await renderMask({
  width: 1536,
  height: 1024,

  include: {
  points: [
  [775, 143],
  [1536, 143],
  [1536, 745],
  [792, 740],
]
},

  featherOuter: 2,
  outPath: path.join(
    OUT_MASKS,
    "bedroom-main-wall.png"
  ),
});

  console.log("Masks written for: living-room-main-wall, exterior-main-wall, bedroom-main-wall");
  console.log("NOT generated (see Phase 1 report): kitchen — pending replacement photography.");
}

await buildRoomImages();
await buildMasks();
console.log("Done.");