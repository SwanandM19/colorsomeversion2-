// Centralized tone (Light/Medium/Dark) derivation for shade hex codes.
// Kept separate from any UI component so it can be reused by filtering,
// a future colour visualizer, or anywhere else a shade's tone matters.

export type Tone = "Light" | "Medium" | "Dark";

export const TONE_OPTIONS: Tone[] = ["Light", "Medium", "Dark"];

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

/**
 * Perceptual luminance (ITU-R BT.601 coefficients), normalised to 0–1.
 * Same formula already used by getContrastColor() in src/lib/utils.ts for
 * swatch text-contrast — reused here rather than introducing a second one,
 * so "how light does this colour read" stays consistent site-wide.
 */
export function getLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

// Validated against the current 100-shade dataset: Light 41 / Medium 43 /
// Dark 16 — a reasonable, non-degenerate split, not a coin-flip midpoint.
const LIGHT_THRESHOLD = 0.68;
const DARK_THRESHOLD = 0.32;

export function getTone(hex: string): Tone {
  const l = getLuminance(hex);
  if (l > LIGHT_THRESHOLD) return "Light";
  if (l < DARK_THRESHOLD) return "Dark";
  return "Medium";
}
