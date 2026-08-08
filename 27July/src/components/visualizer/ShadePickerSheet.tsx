"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Heart } from "lucide-react";
import { ShadeCard } from "../ShadeCard";
import { STATIC_SHADES, FAMILY_OPTIONS } from "../../lib/shades/shadeData";
import type { Shade } from "../../lib/supabase";

interface ShadePickerSheetProps {
  open: boolean;
  onClose: () => void;
  selectedShadeId?: string;
  onSelectShade: (shade: Shade) => void;
  favoriteIds: Set<string>;
  onToggleFavorite: (id: string) => void;
}

/**
 * A lightweight shade-selection sheet — search, colour family, and a
 * Saved-only toggle. Deliberately not a rebuild of the full /shades
 * filtering interface (no Collection/Tone here): this picks a shade, it
 * doesn't browse the catalogue.
 */
export function ShadePickerSheet({
  open,
  onClose,
  selectedShadeId,
  onSelectShade,
  favoriteIds,
  onToggleFavorite,
}: ShadePickerSheetProps) {
  const [search, setSearch] = useState("");
  const [family, setFamily] = useState<string | null>(null);
  const [savedOnly, setSavedOnly] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const qHex = q.replace(/^#/, "");
    return STATIC_SHADES.filter((s) => {
      if (family && s.collection !== family) return false;
      if (savedOnly && !favoriteIds.has(s.id)) return false;
      if (q) {
        const nameMatch = s.name.toLowerCase().includes(q);
        const hexMatch = s.hex_code.toLowerCase().replace("#", "").includes(qHex);
        if (!nameMatch && !hexMatch) return false;
      }
      return true;
    });
  }, [search, family, savedOnly, favoriteIds]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Choose a shade"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full sm:max-w-[560px] sm:mx-4 sm:mb-6 bg-white rounded-t-3xl sm:rounded-3xl border border-[#EDE6DA] shadow-[0_-10px_40px_rgba(0,0,0,0.12)] sm:shadow-[0_30px_70px_rgba(0,0,0,0.18)] max-h-[88vh] flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#EDE6DA] shrink-0">
              <h2 className="font-serif text-lg font-bold text-charcoal">Choose a Shade</h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close shade picker"
                className="w-11 h-11 -mr-2 rounded-full flex items-center justify-center text-charcoal-muted hover:bg-[#FAF8F5] hover:text-charcoal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 sm:px-6 py-4 border-b border-[#EDE6DA] shrink-0 space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B8E7E] pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or hex…"
                  aria-label="Search shades by name or hex code"
                  className="input-premium min-h-[44px] pl-10"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                  <button
                    type="button"
                    aria-pressed={family === null}
                    onClick={() => setFamily(null)}
                    className={`shrink-0 px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors min-h-[36px] ${
                      family === null ? "text-white" : "bg-[#FAF8F5] text-charcoal-muted border border-[#EDE6DA]"
                    }`}
                    style={family === null ? { background: "#8C6478" } : undefined}
                  >
                    All Families
                  </button>
                  {FAMILY_OPTIONS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      aria-pressed={family === f}
                      onClick={() => setFamily(family === f ? null : f)}
                      className={`shrink-0 px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors min-h-[36px] ${
                        family === f ? "text-white" : "bg-[#FAF8F5] text-charcoal-muted border border-[#EDE6DA]"
                      }`}
                      style={family === f ? { background: "#8C6478" } : undefined}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setSavedOnly((v) => !v)}
                  aria-pressed={savedOnly}
                  aria-label={savedOnly ? "Show all shades" : "Show saved shades only"}
                  className={`shrink-0 min-h-[36px] inline-flex items-center gap-1.5 px-3 rounded-lg text-[11px] font-bold border transition-colors ${
                    savedOnly ? "border-transparent text-white" : "border-[#EDE6DA] text-charcoal hover:bg-[#FAF8F5]"
                  }`}
                  style={savedOnly ? { background: "#C4704B" } : undefined}
                >
                  <Heart className="w-3.5 h-3.5" style={{ fill: savedOnly ? "white" : "transparent" }} />
                  Saved
                </button>
              </div>
            </div>

            <div className="px-5 sm:px-6 py-5 overflow-y-auto flex-1">
              {filtered.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-sm text-charcoal-muted">No shades match. Try a different search or family.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
                  {filtered.map((shade) => (
                    <div
                      key={shade.id}
                      role="button"
                      tabIndex={0}
                      aria-pressed={selectedShadeId === shade.id}
                      aria-label={`Select ${shade.name}`}
                      onClick={() => {
                        onSelectShade(shade);
                        onClose();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelectShade(shade);
                          onClose();
                        }
                      }}
                      className={`rounded-2xl cursor-pointer transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4704B] ${
                        selectedShadeId === shade.id ? "ring-2 ring-offset-2 ring-[#C4704B]" : ""
                      }`}
                    >
                      <ShadeCard
                        shade={shade}
                        size="sm"
                        isFavorite={favoriteIds.has(shade.id)}
                        onToggleFavorite={(s) => onToggleFavorite(s.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
