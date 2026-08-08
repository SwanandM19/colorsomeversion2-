// Pure colour-space conversion helpers for the visualizer's blend engine.
// Standard, publicly-documented HSL math — nothing brand-proprietary.

export function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16),
  ];
}

export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  switch (max) {
    case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
    case gn: h = (bn - rn) / d + 2; break;
    default: h = (rn - gn) / d + 4;
  }
  return [h / 6, s, l];
}

function hueToRgb(p: number, q: number, t: number): number {
  let tt = t;
  if (tt < 0) tt += 1;
  if (tt > 1) tt -= 1;
  if (tt < 1 / 6) return p + (q - p) * 6 * tt;
  if (tt < 1 / 2) return q;
  if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
  return p;
}

export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hueToRgb(p, q, h + 1 / 3) * 255),
    Math.round(hueToRgb(p, q, h) * 255),
    Math.round(hueToRgb(p, q, h - 1 / 3) * 255),
  ];
}

/**
 * RGB chroma (0–1): max(r,g,b) − min(r,g,b), normalised. Unlike HSL's
 * nominal saturation — which is defined relative to a colour's OWN
 * lightness and spikes toward 100% for colours close to white or black
 * even when they're visually near-neutral (e.g. #FFFFF0 is nominally
 * "100% saturated yellow" in raw HSL terms) — chroma is lightness-
 * independent and reflects how much actual colour a swatch has.
 */
export function getChroma(r: number, g: number, b: number): number {
  return (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
}

/**
 * The saturation value that reproduces a given chroma at a given
 * lightness — the inverse of how HSL derives chroma from (S, L). This is
 * what lets the wall-recolour blend preserve a shade's TRUE intensity as
 * it's applied across a wall's varying lightness, instead of naively
 * reusing the shade's own (lightness-dependent) nominal saturation at a
 * foreign lightness — which is exactly what caused very pale shades
 * (near-white pastels) to render as vivid, blown-out colour on parts of
 * a wall that aren't themselves near-white.
 */
export function saturationForChroma(chroma: number, lightness: number): number {
  const denom = 1 - Math.abs(2 * lightness - 1);
  if (denom <= 0.0001) return 0; // pure black/white pixel — no chroma is representable there
  return Math.min(1, chroma / denom);
}
