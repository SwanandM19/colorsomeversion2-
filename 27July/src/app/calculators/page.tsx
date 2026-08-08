"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MousePointerClick, Sigma, ClipboardCheck, MessageCircle } from "lucide-react";
import { Header } from "@/src/components/Header";
import { Footer } from "@/src/components/Footer";
import { DataDisclaimer, CalculatorFAQ, CALCULATOR_TOOLS } from "@/src/components/calculators/CalculatorShell";

const HOW_IT_WORKS = [
  {
    icon: MousePointerClick,
    title: "Tell us about the space",
    desc: "Pick your surface and project type, then enter dimensions or a known area — in feet or metres.",
  },
  {
    icon: Sigma,
    title: "We do the maths",
    desc: "Coats, wastage buffer and coverage are applied, then pack sizes are optimised to minimise leftover.",
  },
  {
    icon: ClipboardCheck,
    title: "See a clear breakdown",
    desc: "Every estimate shows exactly which figures went into it — no hidden assumptions.",
  },
];

const FAQ = [
  {
    q: "How accurate are these estimates?",
    a: "They're indicative planning figures, not a quotation. Real consumption varies with surface porosity, texture, application method, the number of coats actually needed and site conditions. Use these to budget and plan — then confirm exact quantities with our team before you buy.",
  },
  {
    q: "Where do the coverage and rate figures come from?",
    a: "They are generic, industry-standard reference values used as sensible defaults. They are not confirmed Colorsome technical or pricing data — anywhere an estimate rests on one of these figures, we label it 'indicative' in the 'How was this calculated?' breakdown.",
  },
  {
    q: "Why does the calculator suggest more paint than I need?",
    a: "Two reasons. A 10% wastage buffer is added, which is standard trade practice to cover roller absorption, spills and touch-ups. Then quantities are rounded up to real purchasable pack sizes — you can't buy 17.4 litres, so the tool finds the combination that gets you there with the least leftover.",
  },
  {
    q: "Do the cost estimates include labour?",
    a: "The Painting Cost calculator includes an optional labour line you can toggle on or off. The Paint Quantity, Waterproofing and Product Requirement calculators estimate material only.",
  },
  {
    q: "Can I use metric units?",
    a: "Yes. Every calculator has a unit toggle — dimensions in feet or metres, areas in square feet or square metres. Conversion happens automatically and the underlying maths is unaffected.",
  },
];

export default function CalculatorsHubPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-[72px]">
      <Header />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          className="absolute inset-0 opacity-[0.4] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #EDE6DA 1px, transparent 1px), linear-gradient(to bottom, #EDE6DA 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute -top-28 left-1/2 w-[820px] h-[440px] rounded-full pointer-events-none blur-[100px]"
          style={{ background: "#C4704B1F", transform: "translateX(-50%)" }}
        />
        <div
          className="absolute top-40 -left-32 w-[360px] h-[360px] rounded-full pointer-events-none blur-[90px]"
          style={{ background: "#C9A85822" }}
        />

        <div className="max-w-[1080px] mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
            <p
              className="text-[10px] uppercase tracking-[0.28em] font-black mb-4"
              style={{ color: "#C4704B", fontFamily: "var(--font-inter)" }}
            >
              Project Planning Tools
            </p>
            <h1
              className="font-serif text-[2.4rem] leading-[1.03] sm:text-6xl md:text-[4rem] font-bold text-charcoal mb-6 tracking-[-0.025em]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Plan Your Project
              <br />
              With Confidence.
            </h1>
            <p className="text-[15px] sm:text-[17px] text-charcoal-muted max-w-2xl mx-auto leading-relaxed">
              Four focused tools to estimate quantity, cost and materials before you buy — built
              around your actual project details, not guesswork.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TOOL GRID ────────────────────────────────────── */}
      <section className="max-w-[1080px] mx-auto px-6 pb-4 relative z-10">
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {CALCULATOR_TOOLS.map((tool, i) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={tool.href}
                className="group relative block h-full rounded-[1.75rem] bg-white border border-[#EDE6DA] p-7 sm:p-8 shadow-[0_2px_16px_rgba(45,45,45,0.03)] hover:shadow-[0_26px_60px_rgba(45,45,45,0.11)] hover:-translate-y-1.5 hover:border-[#DCD2C2] transition-all duration-400 overflow-hidden"
              >
                {/* oversized ghost glyph */}
                <tool.icon
                  aria-hidden
                  className="pointer-events-none select-none absolute -bottom-6 -right-6 w-36 h-36 opacity-[0.045] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ color: tool.accent }}
                  strokeWidth={1.1}
                />
                {/* accent wash on hover */}
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(150deg, ${tool.accent}0E, transparent 55%)` }}
                />

                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-400 group-hover:scale-110 group-hover:-rotate-3"
                    style={{
                      background: `linear-gradient(140deg, ${tool.accent}2E, ${tool.accent}0D)`,
                      color: tool.accent,
                      boxShadow: `0 10px 24px ${tool.accent}1F`,
                    }}
                  >
                    <tool.icon className="w-6 h-6" strokeWidth={1.7} />
                  </div>

                  <p
                    className="text-[9.5px] uppercase tracking-[0.2em] font-black mb-2"
                    style={{ color: tool.accent }}
                  >
                    {tool.tagline}
                  </p>
                  <h3
                    className="font-serif text-[1.55rem] sm:text-[1.75rem] font-bold text-charcoal mb-2.5 tracking-[-0.015em] leading-tight"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {tool.title} Calculator
                  </h3>
                  <p className="text-[13.5px] text-charcoal-muted leading-relaxed mb-6">{tool.desc}</p>

                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.16em]"
                    style={{ color: tool.accent }}
                  >
                    Start Calculating
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div
                    className="h-[2px] w-8 group-hover:w-full transition-all duration-500 rounded-full mt-3"
                    style={{ background: tool.accent }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="max-w-[1080px] mx-auto px-6 py-16 md:py-20 relative z-10">
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.28em] font-black mb-3" style={{ color: "#C4704B" }}>
            How It Works
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl font-bold text-charcoal tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Three Steps To A Real Estimate
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 relative">
          {HOW_IT_WORKS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-white border border-[#EDE6DA] rounded-2xl p-6 text-center"
            >
              <span
                className="absolute -top-3 left-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white"
                style={{ background: "#C4704B", transform: "translateX(-50%)" }}
              >
                {i + 1}
              </span>
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mt-3 mb-4"
                    style={{ background: "#C4704B12", color: "#C4704B" }}>
                <s.icon className="w-5 h-5" strokeWidth={1.7} />
              </span>
              <h3 className="text-[15px] font-bold text-charcoal mb-2 leading-snug">{s.title}</h3>
              <p className="text-[13px] text-charcoal-muted leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ + CTA ────────────────────────────────────── */}
      <section className="max-w-[1080px] mx-auto px-6 pb-8 relative z-10">
        <CalculatorFAQ items={FAQ} />
      </section>

      <section className="max-w-[1080px] mx-auto px-6 pb-20 relative z-10">
        <div
          className="relative rounded-[1.75rem] p-8 sm:p-12 text-center text-white overflow-hidden"
          style={{ background: "linear-gradient(165deg, #2A211A 0%, #1A1A1A 55%, #140F0B 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.14] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #FFF 1px, transparent 1px), linear-gradient(to bottom, #FFF 1px, transparent 1px)`,
              backgroundSize: "34px 34px",
            }}
          />
          <div
            className="absolute -top-24 left-1/2 w-[520px] h-[280px] rounded-full blur-[80px] pointer-events-none"
            style={{ background: "#C4704B38", transform: "translateX(-50%)" }}
          />
          <div className="relative">
            <MessageCircle className="w-8 h-8 mx-auto mb-4 text-white/40" strokeWidth={1.5} />
            <h2
              className="font-serif text-3xl sm:text-4xl font-bold mb-4 tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Want An Exact Quote?
            </h2>
            <p className="text-[14.5px] text-white/55 max-w-lg mx-auto mb-8 leading-relaxed">
              These tools get you a solid plan. For confirmed quantities and pricing on your specific
              site, our team will walk you through it.
            </p>
            <Link
              href="/assistance"
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-[11px] uppercase tracking-[0.18em] font-black text-white overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #8C6478 0%, #C4704B 100%)" }}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                style={{ background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)" }}
              />
              <span className="relative">Book A Consultation</span>
              <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <DataDisclaimer />
      </section>

      <Footer />
    </div>
  );
}
