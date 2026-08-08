"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Palette, ArrowRight, ChevronRight, Pin, PinOff, X,
  Loader2, Info, Lock, PaintRoller,
} from "lucide-react";
import { Header } from "@/src/components/Header";
import { Footer } from "@/src/components/Footer";
import { ShadePickerSheet } from "@/src/components/visualizer/ShadePickerSheet";
import { useFavoriteShades } from "@/src/lib/shades/useFavoriteShades";
import { useWallRecolor } from "@/src/lib/visualizer/useWallRecolor";
import { VISUALIZER_ROOMS, getActiveRooms, getRoomById } from "@/src/lib/visualizer/roomConfig";
import { STATIC_SHADES } from "@/src/lib/shades/shadeData";
import type { Shade } from "@/src/lib/supabase";

const ACCENT = "#C4704B";
const MAX_PINS = 3;

const DEFAULT_SHADE = STATIC_SHADES.find((s) => s.id === "2") ?? STATIC_SHADES[0]; // Warm Sand

/** roomId -> (wallId -> hex). Every active room's walls are pre-seeded with
 * the default shade so there's never an "unassigned" state to special-case. */
function buildInitialWallColors(): Record<string, Record<string, string>> {
  const init: Record<string, Record<string, string>> = {};
  for (const room of VISUALIZER_ROOMS) {
    init[room.id] = {};
    for (const wall of room.walls) init[room.id][wall.id] = DEFAULT_SHADE.hex_code;
  }
  return init;
}

export default function ColourVisualizerPage() {
  const activeRooms = useMemo(() => getActiveRooms(), []);
  const [roomId, setRoomId] = useState(activeRooms[0]?.id ?? "");
  const room = getRoomById(roomId);
  const [wallId, setWallId] = useState(room?.walls[0]?.id ?? "");

  const [showOriginal, setShowOriginal] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pins, setPins] = useState<Shade[]>([]);

  // Room-scoped, per-wall colour state — switching rooms or walls never
  // discards what's already been applied elsewhere.
  const [wallColorsByRoom, setWallColorsByRoom] = useState(buildInitialWallColors);

  const { favoriteIds, toggleFavorite } = useFavoriteShades();
  const { canvasRef, status } = useWallRecolor(room, wallColorsByRoom[roomId] ?? {});

  useEffect(() => {
    setWallId(room?.walls[0]?.id ?? "");
  }, [room]);

  const currentHex = (room && wallColorsByRoom[roomId]?.[wallId]) || DEFAULT_SHADE.hex_code;
  const currentShade = STATIC_SHADES.find((s) => s.hex_code === currentHex) ?? DEFAULT_SHADE;
  const isPinned = pins.some((p) => p.id === currentShade.id);

  const productsHref = room ? `/products?category=${room.surfaceType === "interior" ? "interior-paints" : "exterior-paints-textures"}` : "/products";
  const assistanceHref = room
    ? `/assistance?source=colour-visualizer&product=${encodeURIComponent(`${currentShade.name} (${currentShade.hex_code}) — ${room.name} wall`)}&surface=${room.surfaceType}`
    : "/assistance";

  function setCurrentWallShade(shade: Shade) {
    if (!room) return;
    setWallColorsByRoom((prev) => ({
      ...prev,
      [roomId]: { ...prev[roomId], [wallId]: shade.hex_code },
    }));
  }

  function applyToAllWalls() {
    if (!room) return;
    setWallColorsByRoom((prev) => ({
      ...prev,
      [roomId]: Object.fromEntries(room.walls.map((w) => [w.id, currentHex])),
    }));
  }

  function togglePin() {
    setPins((prev) => {
      if (prev.some((p) => p.id === currentShade.id)) return prev.filter((p) => p.id !== currentShade.id);
      if (prev.length >= MAX_PINS) return prev; // silently capped — button disables at the limit
      return [...prev, currentShade];
    });
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-[72px]">
      <Header />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#EDE6DA]/60">
        <div
          className="absolute inset-0 opacity-[0.4] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #EDE6DA 1px, transparent 1px), linear-gradient(to bottom, #EDE6DA 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute -top-32 left-1/2 w-[720px] h-[380px] rounded-full pointer-events-none blur-[100px]"
          style={{ background: `${ACCENT}1F`, transform: "translateX(-50%)" }}
        />
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="pt-6 pb-2 flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-[#9B8E7E]">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#D6CCBC]" />
            <Link href="/shades" className="hover:text-charcoal transition-colors">Shades</Link>
            <ChevronRight className="w-3 h-3 text-[#D6CCBC]" />
            <span className="text-charcoal font-black">Colour Visualizer</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="py-8 sm:py-10">
            <p className="text-[10px] uppercase tracking-[0.28em] font-black mb-3" style={{ color: ACCENT }}>
              Master Swatches · Preview Tool
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-charcoal leading-[1.05] tracking-[-0.02em] mb-3">
              See A Shade On A Real Wall
            </h1>
            <p className="text-[14.5px] sm:text-[16px] text-charcoal-muted max-w-xl leading-relaxed">
              Pick a room, choose any Colorsome shade, and preview it applied to the wall — with the room&apos;s
              own light and shadow kept intact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── WORKSPACE ────────────────────────────────── */}
      <section className="max-w-[1240px] mx-auto px-6 py-8 sm:py-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8">
          {/* ── LEFT: preview ── */}
          <div className="space-y-5">
            <div className="relative bg-white rounded-[1.75rem] border border-[#EDE6DA] shadow-[0_2px_20px_rgba(45,45,45,0.04)] overflow-hidden">
              <div className="relative w-full bg-[#EFE9DF]" style={{ aspectRatio: "4 / 3" }}>
                {room && (
                  <>
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ opacity: showOriginal ? 0 : 1, transition: "opacity 0.35s ease" }}
                    />
                    <Image
                      src={room.image}
                      alt={`${room.name} — original`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      className="object-cover"
                      style={{ opacity: showOriginal ? 1 : 0, transition: "opacity 0.35s ease" }}
                      priority
                      unoptimized
                    />
                  </>
                )}

                {status === "loading" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                    <Loader2 className="w-6 h-6 animate-spin" style={{ color: ACCENT }} />
                  </div>
                )}

                {/* Before/After toggle — a single elegant tap target beats a
                    drag handle here, since we're swapping a live canvas
                    render for a static photo, not two side-by-side crops.
                    "With Shade" always reflects every wall's current colour
                    at once — this toggle doesn't touch per-wall state. */}
                {room && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="inline-flex rounded-full border border-white/25 bg-black/35 backdrop-blur-md p-1 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                      <button
                        type="button"
                        onClick={() => setShowOriginal(false)}
                        aria-pressed={!showOriginal}
                        className={`min-h-[38px] px-4 rounded-full text-[11px] font-bold uppercase tracking-wide transition-colors ${
                          !showOriginal ? "bg-white text-charcoal" : "text-white/75"
                        }`}
                      >
                        With Shade
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowOriginal(true)}
                        aria-pressed={showOriginal}
                        className={`min-h-[38px] px-4 rounded-full text-[11px] font-bold uppercase tracking-wide transition-colors ${
                          showOriginal ? "bg-white text-charcoal" : "text-white/75"
                        }`}
                      >
                        Original
                      </button>
                    </div>
                  </div>
                )}

                {/* Wall picker — only rendered when a room genuinely has more
                    than one selectable wall (Exterior today; Living Room has
                    exactly one, so this stays invisible there rather than
                    adding a redundant step). */}
                {room && room.walls.length > 1 && (
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                    {room.walls.map((w) => (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setWallId(w.id)}
                        aria-pressed={wallId === w.id}
                        className={`shrink-0 min-h-[38px] px-4 rounded-full text-[11px] font-bold backdrop-blur-md border transition-colors ${
                          wallId === w.id ? "bg-white text-charcoal border-white" : "bg-black/35 text-white border-white/25"
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Compare pins ── */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] uppercase tracking-[0.14em] font-black text-charcoal-muted shrink-0">
                Compare
              </span>
              {pins.length === 0 && (
                <span className="text-[12.5px] text-charcoal-muted">
                  Pin up to {MAX_PINS} shades to flip between them quickly on the selected wall.
                </span>
              )}
              {pins.map((p) => (
                <div key={p.id} className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setCurrentWallShade(p)}
                    aria-pressed={currentShade.id === p.id}
                    aria-label={`Preview ${p.name} on the selected wall`}
                    className={`w-11 h-11 rounded-full border-2 transition-all ${
                      currentShade.id === p.id ? "scale-110" : "border-white"
                    }`}
                    style={{
                      background: p.hex_code,
                      borderColor: currentShade.id === p.id ? ACCENT : "white",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
                    }}
                    title={p.name}
                  />
                  <button
                    type="button"
                    onClick={() => setPins((prev) => prev.filter((x) => x.id !== p.id))}
                    aria-label={`Remove ${p.name} from compare`}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-[#EDE6DA] shadow-sm flex items-center justify-center text-charcoal-muted hover:text-charcoal"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <p className="text-[11.5px] text-[#A89C8C] leading-relaxed max-w-2xl">
              On-screen colours are an approximate preview. Actual appearance may vary with lighting, surface
              texture, screen settings and application.
            </p>
          </div>

          {/* ── RIGHT: controls ── */}
          <div className="space-y-5">
            {/* Room picker */}
            <div className="bg-white rounded-2xl border border-[#EDE6DA] p-5">
              <p className="text-[11px] uppercase tracking-[0.14em] font-black text-charcoal-muted mb-3">Room</p>
              <div className="grid grid-cols-2 gap-2.5">
                {VISUALIZER_ROOMS.map((r) => {
                  const active = r.status === "active";
                  const selected = roomId === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      disabled={!active}
                      onClick={() => active && setRoomId(r.id)}
                      aria-pressed={selected}
                      className={`relative text-left rounded-xl overflow-hidden border transition-all ${
                        selected ? "shadow-[0_6px_20px_rgba(0,0,0,0.1)]" : ""
                      } ${active ? "cursor-pointer" : "cursor-not-allowed"}`}
                      style={selected ? { borderColor: ACCENT, boxShadow: `0 0 0 2px ${ACCENT}` } : { borderColor: "#EDE6DA" }}
                    >
                      <div className="relative h-16 w-full">
                        <Image src={r.thumbnail} alt={r.name} fill sizes="180px" className={`object-cover ${!active ? "grayscale opacity-50" : ""}`} unoptimized />
                        {!active && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Lock className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="px-2.5 py-2">
                        <p className="text-[12px] font-bold text-charcoal leading-tight">{r.name}</p>
                        <p className="text-[10px] text-charcoal-muted leading-tight mt-0.5">
                          {active ? "Ready" : "Coming soon"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wall selector (desktop) — only when the room has more than
                one wall. Mirrors the on-preview picker so it's reachable
                even when scrolled past the image. */}
            {room && room.walls.length > 1 && (
              <div className="bg-white rounded-2xl border border-[#EDE6DA] p-5">
                <p className="text-[11px] uppercase tracking-[0.14em] font-black text-charcoal-muted mb-3">Wall</p>
                <div className="flex flex-wrap gap-2">
                  {room.walls.map((w) => {
                    const wHex = wallColorsByRoom[roomId]?.[w.id] ?? DEFAULT_SHADE.hex_code;
                    return (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setWallId(w.id)}
                        aria-pressed={wallId === w.id}
                        className={`inline-flex items-center gap-2 min-h-[40px] pl-2 pr-3.5 rounded-full text-[12px] font-bold border transition-colors ${
                          wallId === w.id ? "border-transparent text-white" : "border-[#EDE6DA] text-charcoal hover:bg-[#FAF8F5]"
                        }`}
                        style={wallId === w.id ? { background: "#8C6478" } : undefined}
                      >
                        <span
                          className="w-5 h-5 rounded-full shrink-0 ring-1 ring-black/10"
                          style={{ background: wHex }}
                        />
                        {w.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Selected shade + picker trigger. On mobile the sticky bottom
                bar covers quick shade-switching, but Pin lives here too, so
                this card stays visible everywhere rather than hiding a
                control mobile users would otherwise have to hunt for. */}
            <div className="bg-white rounded-2xl border border-[#EDE6DA] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.14em] font-black text-charcoal-muted">
                  Shade {room && room.walls.length > 1 && <span className="normal-case font-semibold text-[#B0A392]">· {room.walls.find((w) => w.id === wallId)?.label}</span>}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                aria-label="Choose a shade"
                className="w-full flex items-center gap-3 rounded-xl border border-[#EDE6DA] hover:border-[#DCD2C2] p-3 transition-colors text-left min-h-[64px]"
              >
                <span
                  className="w-11 h-11 rounded-xl shrink-0 ring-1 ring-black/5 shadow-sm"
                  style={{ background: currentHex }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-bold text-charcoal truncate">{currentShade.name}</span>
                  <span className="block text-[11.5px] text-charcoal-muted font-mono">{currentShade.hex_code}</span>
                </span>
                <Palette className="w-4 h-4 text-[#9B8E7E] shrink-0" />
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={togglePin}
                  disabled={!isPinned && pins.length >= MAX_PINS}
                  className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl text-[11px] uppercase tracking-widest font-black border border-[#EDE6DA] text-charcoal hover:bg-[#FAF8F5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {isPinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
                  {isPinned ? "Unpin" : "Pin to Compare"}
                </button>
              </div>

              {room && room.walls.length > 1 && (
                <button
                  type="button"
                  onClick={applyToAllWalls}
                  className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl text-[11px] uppercase tracking-widest font-black text-white transition-transform active:scale-[0.98]"
                  style={{ background: `linear-gradient(135deg, #8C6478 0%, ${ACCENT} 100%)` }}
                >
                  <PaintRoller className="w-3.5 h-3.5" />
                  Apply {currentShade.name} to All Walls
                </button>
              )}
            </div>

            {/* Results / actions */}
            <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(165deg, #2A211A 0%, #1A1A1A 55%, #140F0B 100%)" }}>
              <p className="text-[10px] uppercase tracking-widest font-black text-white/45 mb-3">Selected Shade</p>
              <p className="font-serif text-2xl font-bold mb-1">{currentShade.name}</p>
              <p className="text-[12.5px] text-white/55 font-mono mb-1">{currentShade.hex_code}</p>
              {currentShade.collection && (
                <p className="text-[12px] text-white/45 mb-5">{currentShade.collection} family</p>
              )}
              <div className="space-y-2.5">
                <Link
                  href={productsHref}
                  className="flex items-center justify-center gap-2 w-full min-h-[44px] rounded-xl text-[11px] uppercase tracking-widest font-black bg-white/10 hover:bg-white/15 transition-colors border border-white/15"
                >
                  Explore Suitable Products
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={assistanceHref}
                  className="flex items-center justify-center gap-2 w-full min-h-[44px] rounded-xl text-[11px] uppercase tracking-widest font-black text-white transition-transform active:scale-[0.98]"
                  style={{ background: `linear-gradient(135deg, #8C6478 0%, ${ACCENT} 100%)` }}
                >
                  Get Expert Assistance
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-2.5 px-1">
              <Info className="w-3.5 h-3.5 text-[#B0A392] shrink-0 mt-0.5" />
              <p className="text-[11.5px] text-charcoal-muted leading-relaxed">
                Using your <Link href="/shades" className="font-bold text-[#C4704B] hover:underline">Saved Shades</Link>?
                Open the shade picker and switch to the Saved tab.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-only sticky action bar — keeps the shade picker one tap away
          without scrolling past the image, since flipping through shades
          quickly is the core interaction. Desktop already has this reachable
          in the sidebar, so this stays hidden at lg+. */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-[#EDE6DA] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            aria-label="Choose a shade"
            className="flex-1 min-w-0 flex items-center gap-3 min-h-[52px]"
          >
            <span
              className="w-11 h-11 rounded-xl shrink-0 ring-1 ring-black/5 shadow-sm"
              style={{ background: currentHex }}
            />
            <span className="min-w-0 flex-1 text-left">
              <span className="block text-[13.5px] font-bold text-charcoal truncate">{currentShade.name}</span>
              <span className="block text-[11px] text-charcoal-muted font-mono">
                {currentShade.hex_code}
                {room && room.walls.length > 1 && ` · ${room.walls.find((w) => w.id === wallId)?.label}`}
              </span>
            </span>
            <span
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-widest font-black text-white"
              style={{ background: `linear-gradient(135deg, #8C6478 0%, ${ACCENT} 100%)` }}
            >
              <Palette className="w-3.5 h-3.5" />
              Change
            </span>
          </button>
          <button
            type="button"
            onClick={togglePin}
            disabled={!isPinned && pins.length >= MAX_PINS}
            aria-pressed={isPinned}
            aria-label={isPinned ? `Unpin ${currentShade.name} from compare` : `Pin ${currentShade.name} to compare`}
            className="shrink-0 w-11 h-11 rounded-xl border border-[#EDE6DA] flex items-center justify-center text-charcoal disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
          </button>
        </div>
        {/* Compact wall switcher + Apply to All, mobile only, only when
            relevant — keeps the bar from growing when there's nothing to
            switch between. */}
        {room && room.walls.length > 1 && (
          <div className="flex items-center gap-2 mt-2.5 overflow-x-auto scrollbar-hide">
            {room.walls.map((w) => {
              const wHex = wallColorsByRoom[roomId]?.[w.id] ?? DEFAULT_SHADE.hex_code;
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setWallId(w.id)}
                  aria-pressed={wallId === w.id}
                  className={`shrink-0 inline-flex items-center gap-1.5 min-h-[36px] pl-1.5 pr-3 rounded-full text-[11px] font-bold border transition-colors ${
                    wallId === w.id ? "border-transparent text-white" : "border-[#EDE6DA] text-charcoal"
                  }`}
                  style={wallId === w.id ? { background: "#8C6478" } : undefined}
                >
                  <span className="w-4 h-4 rounded-full shrink-0 ring-1 ring-black/10" style={{ background: wHex }} />
                  {w.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={applyToAllWalls}
              className="shrink-0 inline-flex items-center gap-1.5 min-h-[36px] px-3 rounded-full text-[11px] font-bold text-white"
              style={{ background: ACCENT }}
            >
              <PaintRoller className="w-3.5 h-3.5" />
              Apply to All
            </button>
          </div>
        )}
      </div>
      {/* Spacer so the sticky bar never overlaps page content/footer on mobile */}
      <div className={`lg:hidden ${room && room.walls.length > 1 ? "h-[124px]" : "h-[76px]"}`} aria-hidden="true" />

      <ShadePickerSheet
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        selectedShadeId={currentShade.id}
        onSelectShade={setCurrentWallShade}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
      />

      <Footer />
    </div>
  );
}
