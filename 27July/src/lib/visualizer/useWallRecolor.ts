"use client";

import { useEffect, useRef, useState } from "react";
import { hexToRgb, rgbToHsl, hslToRgb, getChroma, saturationForChroma } from "./colorMath";
import type { VisualizerRoom } from "./roomConfig";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

interface DecodedRoomBase {
  width: number;
  height: number;
  /** Original RGBA pixels — the untouched source photo, never mutated. */
  baseRgba: Uint8ClampedArray;
  /** Per-pixel lightness (0–1) of the original photo, precomputed once so
   * every shade switch only has to redo the cheap hue/saturation swap, not
   * re-derive lightness from scratch. This is what preserves shadows,
   * highlights and texture under any chosen paint colour. Shared by every
   * wall in the room — lightness is a property of the photo, not of any
   * one wall's mask. */
  lightness: Float32Array;
}

const roomBaseCache = new Map<string, Promise<DecodedRoomBase>>();
const maskCache = new Map<string, Promise<Float32Array>>();

async function decodeRoomBase(room: VisualizerRoom): Promise<DecodedRoomBase> {
  const cached = roomBaseCache.get(room.image);
  if (cached) return cached;

  const promise = (async () => {
    const roomImg = await loadImage(room.image);
    const width = roomImg.naturalWidth;
    const height = roomImg.naturalHeight;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.drawImage(roomImg, 0, 0, width, height);
    const baseRgba = new Uint8ClampedArray(ctx.getImageData(0, 0, width, height).data);

    const pixelCount = width * height;
    const lightness = new Float32Array(pixelCount);
    for (let i = 0; i < pixelCount; i++) {
      const idx = i * 4;
      const [, , l] = rgbToHsl(baseRgba[idx], baseRgba[idx + 1], baseRgba[idx + 2]);
      lightness[i] = l;
    }

    return { width, height, baseRgba, lightness };
  })();

  roomBaseCache.set(room.image, promise);
  return promise;
}

async function decodeMask(maskSrc: string, width: number, height: number): Promise<Float32Array> {
  const cacheKey = `${maskSrc}::${width}x${height}`;
  const cached = maskCache.get(cacheKey);
  if (cached) return cached;

  const promise = (async () => {
    const maskImg = await loadImage(maskSrc);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    // Mask source may be a different native resolution than the room image
    // — drawImage scales it to match, which is exactly what we want.
    ctx.drawImage(maskImg, 0, 0, width, height);
    const maskRgba = ctx.getImageData(0, 0, width, height).data;

    const pixelCount = width * height;
    const maskAlpha = new Float32Array(pixelCount);
    for (let i = 0; i < pixelCount; i++) {
      // Mask is grayscale — R/G/B are equal, so R alone carries the value.
      maskAlpha[i] = maskRgba[i * 4] / 255;
    }
    return maskAlpha;
  })();

  maskCache.set(cacheKey, promise);
  return promise;
}

/**
 * Renders a room photo with every one of its walls recoloured to its own
 * assigned shade, compositing all of them onto a single canvas. Each wall
 * is blended independently through its own mask using the exact same
 * per-pixel HSL colour-transfer as the original single-wall engine — see
 * paintWall() below — this file only adds the ability to loop that
 * unchanged algorithm across more than one mask.
 *
 * `wallColors` maps wall id -> hex for every wall in `room` that should be
 * painted. A wall with no entry is left as the untouched original photo.
 */
export function useWallRecolor(room: VisualizerRoom | undefined, wallColors: Record<string, string>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const decodedRef = useRef<{ base: DecodedRoomBase; masks: Record<string, Float32Array> } | null>(null);

  // Reload/decode whenever the room changes — image + every wall mask for
  // that room, all cached so switching back to a previously-visited room
  // is instant.
  useEffect(() => {
    if (!room) return;
    let cancelled = false;
    setStatus("loading");
    decodedRef.current = null;

    (async () => {
      const base = await decodeRoomBase(room);
      const maskEntries = await Promise.all(
        room.walls.map(async (w) => [w.id, await decodeMask(w.maskSrc, base.width, base.height)] as const)
      );
      if (cancelled) return;
      decodedRef.current = { base, masks: Object.fromEntries(maskEntries) };
      paint(decodedRef.current, wallColors, canvasRef.current);
      setStatus("ready");
    })().catch(() => {
      if (!cancelled) setStatus("error");
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.id]);

  // Repaint (cheap — no re-decoding) whenever any wall's assigned colour
  // changes.
  useEffect(() => {
    if (decodedRef.current) paint(decodedRef.current, wallColors, canvasRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(wallColors)]);

  return { canvasRef, status };
}

function paintWall(
  out: ImageData,
  base: DecodedRoomBase,
  mask: Float32Array,
  hex: string
) {
  const { width, height, lightness } = base;
  const [tr, tg, tb] = hexToRgb(hex);
  const [targetH] = rgbToHsl(tr, tg, tb);
  // Chroma (lightness-independent "how much colour") rather than nominal
  // HSL saturation (which is defined relative to the target's OWN
  // lightness, and spikes toward 100% for very pale shades — e.g. a
  // near-white hex like #FFFFF0 is nominally "100% saturated yellow").
  // Re-deriving the saturation needed to reproduce that same chroma at
  // EACH pixel's own lightness keeps a shade's true intensity consistent
  // across the wall instead of dumping full saturation onto every pixel
  // that isn't already near-white — see colorMath.ts for the full writeup.
  const targetChroma = getChroma(tr, tg, tb);

  const pixelCount = width * height;
  for (let i = 0; i < pixelCount; i++) {
    const a = mask[i];
    if (a <= 0.004) continue;
    const idx = i * 4;

    // Keep this pixel's own lightness (its shadow/highlight/texture),
    // swap in the target shade's hue at a chroma-consistent saturation —
    // the "Color" blend-mode technique, applied only within this wall's
    // mask.
    const pixelLightness = lightness[i];
    const s = saturationForChroma(targetChroma, pixelLightness);
    const [nr, ng, nb] = hslToRgb(targetH, s, pixelLightness);

    out.data[idx] = out.data[idx] + (nr - out.data[idx]) * a;
    out.data[idx + 1] = out.data[idx + 1] + (ng - out.data[idx + 1]) * a;
    out.data[idx + 2] = out.data[idx + 2] + (nb - out.data[idx + 2]) * a;
  }
}

function paint(
  decoded: { base: DecodedRoomBase; masks: Record<string, Float32Array> },
  wallColors: Record<string, string>,
  canvas: HTMLCanvasElement | null
) {
  if (!canvas) return;
  const { base, masks } = decoded;
  const { width, height, baseRgba } = base;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const out = ctx.createImageData(width, height);

  // Start from the untouched original — every unmasked pixel (and any
  // wall with no assigned colour) simply stays as the source photo.
  out.data.set(baseRgba);

  for (const [wallId, mask] of Object.entries(masks)) {
    const hex = wallColors[wallId];
    if (!hex) continue;
    paintWall(out, base, mask, hex);
  }

  ctx.putImageData(out, 0, 0);
}
