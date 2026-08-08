"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight, Check, ArrowRight, Ruler, Wallet, Waves, ClipboardList,
  ShieldCheck, Sparkles, Info,
} from "lucide-react";
import { Header } from "@/src/components/Header";
import { Footer } from "@/src/components/Footer";

/* ─────────────────────────────────────────────────────────────────────
   Shared tool registry — single source of truth for the hub grid, the
   "related tools" strip at the foot of each calculator, and any future
   cross-linking. Keeping it here means adding a calculator is a one-line
   change rather than an edit in three places.
   ───────────────────────────────────────────────────────────────────── */
export const CALCULATOR_TOOLS = [
  {
    href: "/calculators/paint-quantity",
    icon: Ruler,
    title: "Paint Quantity",
    tagline: "How much paint you need",
    desc: "Work out how much paint your room or project actually needs — by dimensions or by known area.",
    accent: "#C9A858",
  },
  {
    href: "/calculators/painting-cost",
    icon: Wallet,
    title: "Painting Cost",
    tagline: "Material + labour estimate",
    desc: "A full cost estimate split across paint, primer, putty and labour — not one opaque number.",
    accent: "#C4704B",
  },
  {
    href: "/calculators/waterproofing",
    icon: Waves,
    title: "Waterproofing",
    tagline: "Terrace, bathroom & more",
    desc: "Estimate material requirement for terraces, bathrooms, exterior walls, tanks and more.",
    accent: "#8B9E7E",
  },
  {
    href: "/calculators/product-requirement",
    icon: ClipboardList,
    title: "Product Requirement",
    tagline: "Your full painting system",
    desc: "A guided, layer-by-layer estimate — putty, primer and topcoat, sized to your actual area.",
    accent: "#8C6478",
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────
   Page shell — premium hero with accent-tinted atmosphere, breadcrumb,
   and a floating tool badge. `accent` themes the whole page.
   ───────────────────────────────────────────────────────────────────── */
export function CalculatorShell({
  eyebrow,
  title,
  subtitle,
  accent = "#C4704B",
  icon: Icon,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  accent?: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-[72px]">
      <Header />

      <section className="relative overflow-hidden">
        {/* fine grid texture */}
        <div
          className="absolute inset-0 opacity-[0.4] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #EDE6DA 1px, transparent 1px), linear-gradient(to bottom, #EDE6DA 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* accent atmosphere */}
        <div
          className="absolute -top-32 left-1/2 w-[720px] h-[420px] rounded-full pointer-events-none blur-[90px]"
          style={{ background: `${accent}20`, transform: "translateX(-50%)" }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-[380px] h-[380px] rounded-full pointer-events-none blur-[80px]"
          style={{ background: "#C9A85818" }}
        />

        <div className="max-w-[1040px] mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <div
            className="pt-6 pb-2 flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-[#9B8E7E]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#D6CCBC]" />
            <Link href="/calculators" className="hover:text-charcoal transition-colors">Calculators</Link>
            <ChevronRight className="w-3 h-3 text-[#D6CCBC]" />
            <span className="text-charcoal font-black truncate">{eyebrow}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="py-10 md:py-14"
          >
            {Icon && (
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/60"
                style={{
                  background: `linear-gradient(140deg, ${accent}28, ${accent}0D)`,
                  color: accent,
                  boxShadow: `0 14px 34px ${accent}22`,
                }}
              >
                <Icon className="w-7 h-7" strokeWidth={1.6} />
              </div>
            )}
            <p
              className="text-[10px] uppercase tracking-[0.28em] font-black mb-3"
              style={{ color: accent, fontFamily: "var(--font-inter)" }}
            >
              {eyebrow}
            </p>
            <h1
              className="font-serif text-[2.1rem] leading-[1.05] sm:text-5xl md:text-[3.4rem] font-bold text-charcoal mb-5 tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {title}
            </h1>
            <p className="text-[15px] sm:text-[17px] text-charcoal-muted max-w-2xl leading-relaxed">
              {subtitle}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-7">
              {[
                { icon: Sparkles, label: "Takes under a minute" },
                { icon: ShieldCheck, label: "No sign-up required" },
                { icon: Info, label: "Shows how it's calculated" },
              ].map(({ icon: I, label }) => (
                <span key={label} className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#8A7E6E]">
                  <I className="w-3.5 h-3.5" style={{ color: accent }} />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <main className="max-w-[1040px] mx-auto px-6 pb-24 relative z-10">{children}</main>

      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Numbered step section — gives each calculator a guided, progressive
   feel instead of one undifferentiated wall of inputs.
   ───────────────────────────────────────────────────────────────────── */
export function StepSection({
  step,
  title,
  hint,
  accent = "#C4704B",
  action,
  children,
}: {
  step: number | string;
  title: string;
  hint?: string;
  accent?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="relative bg-white border border-[#EDE6DA] rounded-[1.5rem] p-5 sm:p-7 shadow-[0_2px_16px_rgba(45,45,45,0.03)]">
      <div className="flex items-start gap-3.5 mb-5">
        <span
          className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-[12px] font-black mt-0.5"
          style={{ background: `${accent}14`, color: accent }}
        >
          {step}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h2
              className="font-serif text-xl sm:text-[1.6rem] font-bold text-charcoal leading-tight tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {title}
            </h2>
            {action}
          </div>
          {hint && <p className="text-[13px] text-charcoal-muted mt-1 leading-relaxed">{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Visual choice cards — replaces plain dropdowns/segmented buttons for
   the primary decisions, so the flow reads as a guided selection rather
   than a form. Big tap targets, good on mobile.
   ───────────────────────────────────────────────────────────────────── */
export function ChoiceGrid({ cols = 2, children }: { cols?: 2 | 3 | 4 | 5; children: React.ReactNode }) {
  const colClass =
    cols === 2 ? "grid-cols-2"
    : cols === 3 ? "grid-cols-2 sm:grid-cols-3"
    : cols === 4 ? "grid-cols-2 sm:grid-cols-4"
    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5";
  return <div className={`grid ${colClass} gap-2.5 sm:gap-3`}>{children}</div>;
}

export function ChoiceCard({
  selected,
  onClick,
  icon: Icon,
  label,
  sublabel,
  accent = "#C4704B",
}: {
  selected: boolean;
  onClick: () => void;
  icon?: React.ElementType;
  label: string;
  sublabel?: string;
  accent?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative text-left rounded-2xl border p-3.5 sm:p-4 min-h-[86px] transition-all duration-300 ${
        selected
          ? "border-transparent shadow-[0_10px_26px_rgba(45,45,45,0.08)]"
          : "border-[#EDE6DA] bg-[#FAF8F5] hover:bg-white hover:border-[#DCD2C2] hover:shadow-[0_6px_18px_rgba(45,45,45,0.05)]"
      }`}
      style={
        selected
          ? { background: `linear-gradient(150deg, ${accent}16, ${accent}07)`, boxShadow: `0 0 0 2px ${accent}, 0 10px 26px ${accent}1F` }
          : undefined
      }
    >
      {selected && (
        <span
          className="absolute top-2.5 right-2.5 w-[18px] h-[18px] rounded-full flex items-center justify-center"
          style={{ background: accent }}
        >
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </span>
      )}
      {Icon && (
        <span
          className="flex items-center justify-center w-9 h-9 rounded-xl mb-2.5 transition-transform duration-300 group-hover:scale-105"
          style={{
            background: selected ? `${accent}1F` : "#FFFFFF",
            color: selected ? accent : "#9B8E7E",
            border: selected ? "none" : "1px solid #EDE6DA",
          }}
        >
          <Icon className="w-4 h-4" />
        </span>
      )}
      <span className={`block text-[12.5px] sm:text-[13px] font-bold leading-tight ${selected ? "text-charcoal" : "text-charcoal"}`}>
        {label}
      </span>
      {sublabel && <span className="block text-[11px] text-charcoal-muted mt-0.5 leading-snug">{sublabel}</span>}
    </button>
  );
}

/* ─── Unit pill toggle (ft/m, sq.ft/sq.m) ─────────────────────────────
   Purely a display/input-unit switch — conversion happens at the
   boundary via src/lib/calculators/units.ts; the calculation itself
   always runs in the base unit. */
export function UnitToggle<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: [T, string][];
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-[#EDE6DA] bg-[#FAF8F5] p-0.5 gap-0.5">
      {options.map(([v, label]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`px-2.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all min-h-[28px] ${
            value === v ? "bg-white text-charcoal shadow-sm" : "text-charcoal-muted hover:text-charcoal"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/* ─── Primary submit button ──────────────────────────────────────────── */
export function CalculateButton({
  onClick,
  label,
  accent = "#C4704B",
}: {
  onClick: () => void;
  label: string;
  accent?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full min-h-[56px] rounded-2xl text-[11px] uppercase tracking-[0.18em] font-black text-white overflow-hidden transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99]"
      style={{ background: `linear-gradient(135deg, #8C6478 0%, ${accent} 100%)`, boxShadow: `0 14px 32px ${accent}33` }}
    >
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
        style={{ background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)" }}
      />
      <span className="relative inline-flex items-center gap-2">
        {label}
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </span>
    </button>
  );
}

/* ─── Results ────────────────────────────────────────────────────────── */
export function ResultsHeader({ label = "Your Estimate", accent = "#C4704B" }: { label?: string; accent?: string }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <span className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #E3D9C9)" }} />
      <span className="text-[10px] uppercase tracking-[0.28em] font-black" style={{ color: accent }}>
        {label}
      </span>
      <span className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #E3D9C9)" }} />
    </div>
  );
}

export function ResultStat({ value, label, accent }: { value: string; label: string; accent?: string }) {
  return (
    <div className="relative bg-white border border-[#EDE6DA] rounded-2xl p-5 text-center overflow-hidden">
      <span className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: accent ?? "#C4704B" }} />
      <p
        className="font-serif text-[1.75rem] sm:text-[2.1rem] font-bold mb-1 leading-none tracking-[-0.01em]"
        style={{ fontFamily: "var(--font-cormorant)", color: accent ?? "#2D2D2D" }}
      >
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-[0.12em] font-bold text-[#9B8E7E] leading-tight">{label}</p>
    </div>
  );
}

/** Hero total panel — the single headline number of a calculation. */
export function TotalPanel({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div
      className="relative rounded-[1.5rem] p-7 sm:p-9 text-center text-white overflow-hidden"
      style={{ background: "linear-gradient(165deg, #2A211A 0%, #1A1A1A 55%, #140F0B 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #FFF 1px, transparent 1px), linear-gradient(to bottom, #FFF 1px, transparent 1px)`,
          backgroundSize: "34px 34px",
        }}
      />
      <div className="absolute -top-20 left-1/2 w-[420px] h-[240px] rounded-full blur-[70px] pointer-events-none"
           style={{ background: "#C4704B33", transform: "translateX(-50%)" }} />
      <div className="relative">
        <p className="text-[10px] uppercase tracking-[0.24em] font-black text-white/45 mb-3">{label}</p>
        <p
          className="font-serif text-[2.4rem] sm:text-[3.2rem] font-bold leading-none tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {value}
        </p>
        {note && <p className="text-[12px] text-white/45 mt-3.5 max-w-md mx-auto leading-relaxed">{note}</p>}
      </div>
    </div>
  );
}

/** Pack-size recommendation chips. */
export function PackPanel({
  combo,
  unit,
  leftover,
  accent = "#C9A858",
}: {
  combo: { size: number; count: number }[];
  unit: string;
  leftover?: number;
  accent?: string;
}) {
  return (
    <div className="bg-white border border-[#EDE6DA] rounded-2xl p-5 sm:p-7">
      <p className="text-[10px] uppercase tracking-[0.16em] font-black text-[#9B8E7E] mb-4">
        Suggested Pack Combination
      </p>
      <div className="flex flex-wrap gap-2.5">
        {combo.map((c) => (
          <span
            key={c.size}
            className="inline-flex items-baseline gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold border"
            style={{ background: `${accent}12`, color: "#5A4A32", borderColor: `${accent}33` }}
          >
            <span className="font-black">{c.count}</span>
            <span className="text-[11px] opacity-60">×</span>
            <span>{c.size} {unit}</span>
          </span>
        ))}
      </div>
      {leftover !== undefined && (
        <p className="text-[13px] text-charcoal-muted mt-4 pt-4 border-t border-[#F0EAE0]">
          Approximate leftover: <span className="font-bold text-charcoal">{leftover} {unit}</span>
          <span className="block text-[11.5px] mt-1 text-[#A89C8C]">
            A small surplus is normal — it covers touch-ups and future repairs.
          </span>
        </p>
      )}
    </div>
  );
}

export function HowCalculated({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <details className="group bg-white border border-[#EDE6DA] rounded-2xl overflow-hidden">
      <summary className="cursor-pointer list-none px-5 sm:px-6 py-4 flex items-center justify-between text-sm font-bold text-charcoal hover:bg-[#FDFCFA] transition-colors">
        <span className="inline-flex items-center gap-2.5">
          <Info className="w-4 h-4 text-[#B0A392]" />
          How was this calculated?
        </span>
        <span className="text-[#C4704B] text-xs transition-transform duration-200 group-open:rotate-180">▾</span>
      </summary>
      <div className="px-5 sm:px-6 pb-5 pt-4 space-y-2.5 border-t border-[#F0EAE0] bg-[#FDFCFA]">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start justify-between gap-4 text-[13px]">
            <span className="text-charcoal-muted shrink-0">{r.label}</span>
            <span className="font-semibold text-charcoal text-right">{r.value}</span>
          </div>
        ))}
      </div>
    </details>
  );
}

export function CalculatorCTAs({ assistanceHref, productsHref }: { assistanceHref: string; productsHref: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-1">
      <Link
        href={productsHref}
        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-[11px] uppercase tracking-[0.16em] font-black border border-[#EDE6DA] bg-white text-charcoal hover:bg-[#FAF8F5] hover:border-[#D8CDB9] transition-all"
      >
        Explore Products
      </Link>
      <Link
        href={assistanceHref}
        className="group relative flex-1 overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-[11px] uppercase tracking-[0.16em] font-black text-white"
        style={{ background: "linear-gradient(135deg, #8C6478 0%, #C4704B 100%)" }}
      >
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
          style={{ background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)" }}
        />
        <span className="relative">Request Exact Quote</span>
        <ArrowRight className="w-3.5 h-3.5 relative group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

/* ─── FAQ accordion ──────────────────────────────────────────────────── */
export function CalculatorFAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="pt-4">
      <h2
        className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-5 tracking-[-0.01em]"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Common Questions
      </h2>
      <div className="space-y-2.5">
        {items.map((item) => (
          <details key={item.q} className="group bg-white border border-[#EDE6DA] rounded-2xl overflow-hidden">
            <summary className="cursor-pointer list-none px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-[14px] font-bold text-charcoal hover:bg-[#FDFCFA] transition-colors">
              {item.q}
              <span className="text-[#C4704B] text-xs shrink-0 transition-transform duration-200 group-open:rotate-180">▾</span>
            </summary>
            <p className="px-5 sm:px-6 pb-5 pt-1 text-[13.5px] text-charcoal-muted leading-relaxed border-t border-[#F0EAE0] bg-[#FDFCFA]">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ─── Cross-links to the other calculators ───────────────────────────── */
export function RelatedTools({ currentHref }: { currentHref: string }) {
  const others = CALCULATOR_TOOLS.filter((t) => t.href !== currentHref);
  return (
    <section className="pt-4">
      <h2
        className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-5 tracking-[-0.01em]"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Other Planning Tools
      </h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {others.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group bg-white border border-[#EDE6DA] rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(45,45,45,0.07)] hover:border-[#DCD2C2] transition-all duration-300"
          >
            <span
              className="flex items-center justify-center w-10 h-10 rounded-xl mb-3.5 transition-transform duration-300 group-hover:scale-105"
              style={{ background: `${t.accent}16`, color: t.accent }}
            >
              <t.icon className="w-4.5 h-4.5" />
            </span>
            <p className="text-[13.5px] font-bold text-charcoal leading-tight mb-1">{t.title}</p>
            <p className="text-[11.5px] text-charcoal-muted leading-snug">{t.tagline}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function DataDisclaimer() {
  return (
    <p className="text-[11.5px] text-[#A89C8C] leading-relaxed mt-2 text-center max-w-2xl mx-auto">
      Estimates are indicative and may vary based on surface condition, application method, site
      conditions, wastage, labour requirements and current product pricing. Figures used here are
      generic industry-standard estimates pending confirmed Colorsome rates.
    </p>
  );
}
