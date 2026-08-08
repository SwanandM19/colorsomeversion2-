"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Palette, SunMedium } from "lucide-react";
import type { Tone } from "../../lib/shades/toneUtils";
import { TONE_OPTIONS } from "../../lib/shades/toneUtils";

const TONE_DOT: Record<Tone, string> = {
  Light: "#F0EAE0",
  Medium: "#B0A392",
  Dark: "#2D2D2D",
};

interface ShadeFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  familyOptions: string[];
  family: string | null;
  onFamilyChange: (v: string | null) => void;
  tone: Tone | null;
  onToneChange: (v: Tone | null) => void;
  savedOnly: boolean;
  onSavedOnlyChange: (v: boolean) => void;
  activeCount: number;
  resultCount: number;
  onClearAll: () => void;
}

/**
 * Single filter panel reused at every breakpoint — a bottom sheet on
 * mobile, a centred card on larger screens. One component rather than two
 * divergent mobile/desktop implementations keeps this simple and testable.
 */
export function ShadeFilterDrawer({
  open,
  onClose,
  familyOptions,
  family,
  onFamilyChange,
  tone,
  onToneChange,
  savedOnly,
  onSavedOnlyChange,
  activeCount,
  resultCount,
  onClearAll,
}: ShadeFilterDrawerProps) {
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
            aria-label="Filter shades"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full sm:max-w-[440px] sm:mx-4 sm:mb-6 bg-white rounded-t-3xl sm:rounded-3xl border border-[#EDE6DA] shadow-[0_-10px_40px_rgba(0,0,0,0.12)] sm:shadow-[0_30px_70px_rgba(0,0,0,0.18)] max-h-[85vh] flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#EDE6DA] shrink-0">
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-bold text-charcoal">Filters</h2>
                {activeCount > 0 && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full text-white" style={{ background: "#C4704B" }}>
                    {activeCount}
                  </span>
                )}
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close filters"
                className="w-11 h-11 -mr-2 rounded-full flex items-center justify-center text-charcoal-muted hover:bg-[#FAF8F5] hover:text-charcoal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 sm:px-6 py-5 overflow-y-auto space-y-6">
              {/* Colour family */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-charcoal-muted mb-3 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" /> Colour Family
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {familyOptions.map((f) => {
                    const selected = family === f;
                    return (
                      <button
                        key={f}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => onFamilyChange(selected ? null : f)}
                        className={`min-h-[44px] px-2 rounded-xl text-[12px] font-bold transition-all border ${
                          selected
                            ? "border-transparent text-white shadow-sm"
                            : "border-[#EDE6DA] text-charcoal-muted hover:border-[#DCD2C2] hover:text-charcoal"
                        }`}
                        style={selected ? { background: "#8C6478" } : undefined}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tone */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-charcoal-muted mb-3 flex items-center gap-1.5">
                  <SunMedium className="w-3.5 h-3.5" /> Tone
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {TONE_OPTIONS.map((t) => {
                    const selected = tone === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => onToneChange(selected ? null : t)}
                        className={`min-h-[44px] px-2 rounded-xl text-[12px] font-bold transition-all border flex items-center justify-center gap-2 ${
                          selected
                            ? "border-transparent text-white shadow-sm"
                            : "border-[#EDE6DA] text-charcoal-muted hover:border-[#DCD2C2] hover:text-charcoal"
                        }`}
                        style={selected ? { background: "#8C6478" } : undefined}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ background: TONE_DOT[t], boxShadow: selected ? "0 0 0 1px rgba(255,255,255,0.5)" : "0 0 0 1px rgba(0,0,0,0.08)" }}
                        />
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Saved only */}
              <label className="flex items-center justify-between gap-4 cursor-pointer min-h-[44px] rounded-2xl border border-[#EDE6DA] bg-[#FAF8F5] px-4">
                <span className="text-[13px] font-bold text-charcoal">Show Saved Shades Only</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={savedOnly}
                  onClick={() => onSavedOnlyChange(!savedOnly)}
                  className="relative w-12 h-[26px] rounded-full transition-colors shrink-0"
                  style={{ background: savedOnly ? "#C4704B" : "#E5DFD3" }}
                >
                  <span
                    className="absolute top-[3px] w-5 h-5 rounded-full bg-white shadow transition-transform"
                    style={{ transform: savedOnly ? "translateX(25px)" : "translateX(3px)" }}
                  />
                </button>
              </label>
            </div>

            <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-t border-[#EDE6DA] shrink-0">
              <button
                type="button"
                onClick={onClearAll}
                disabled={activeCount === 0}
                className="min-h-[44px] px-4 rounded-xl text-[11px] uppercase tracking-widest font-black text-charcoal-muted hover:text-charcoal disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 min-h-[44px] rounded-xl text-[11px] uppercase tracking-widest font-black text-white transition-transform active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #8C6478 0%, #C4704B 100%)" }}
              >
                Show {resultCount} Shade{resultCount !== 1 ? "s" : ""}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
