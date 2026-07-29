


"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { usePalette } from "../lib/palette";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { accents } = usePalette();
  const accent = accents[0];

  // Condensed high-level ranges that link directly to product categories
  const macroRanges = [
    { name: "Architectural Finishes", slug: "Wall Finishes" },
    { name: "High-Performance Emulsions", slug: "Emulsion Paints" },
    { name: "Protective & Industrial", slug: "Protective Coatings" },
    { name: "Waterproofing & Primers", slug: "Waterproofing" },
  ];

  return (
    <footer className="bg-[#121212] text-white border-t border-white/[0.03] font-sans relative overflow-hidden pt-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none -z-10" style={{ background: `radial-gradient(circle, ${accent}12, transparent 70%)` }} />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[110px] pointer-events-none -z-10" style={{ background: `radial-gradient(circle, ${accents[3]}0E, transparent 70%)` }} />
      {/* Top accent hairline */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}50, transparent)` }} />

      {/* 2. MAIN DIRECTORY CANVAS */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="max-w-[1280px] mx-auto px-6 pb-20 pt-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-14 lg:gap-8 items-start">
          {/* Brand Intro Identity */}
          <motion.div variants={fadeUp} className="lg:col-span-4 space-y-7">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-12 rounded-xl flex items-center justify-center bg-white p-1.5 shadow-sm border border-white/10 shrink-0 transition-transform duration-500 group-hover:rotate-6">
                <Image
                  src="/Ara_Weather_Coat.png"
                  alt="Colorsome logo"
                  width={44}
                  height={48}
                  className="w-full h-full object-contain scale-[1.05]"
                />
              </div>
              <div className="flex flex-col justify-center leading-none tracking-tight">
                <span className="text-xl font-bold tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-display), serif' }}>
                  COLORSOME
                </span>
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">
                  Paints
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/55 leading-relaxed font-light max-w-sm">
              Architectural surface media formulated for structural luxury.
              Merging relentless chemical defense with an advanced understanding
              of color aesthetics.
            </p>

            <div className="space-y-4 pt-5 text-xs md:text-sm text-white/55 font-light max-w-sm border-t border-white/[0.06]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 opacity-90" style={{ color: accent }} />
                <span className="leading-relaxed font-light">
                  C-403, Akshay Villa, Ram Nagari, Behind D-Mart, Mumbai-Pune
                  Bypass Road, Ambegaon Budruk, Katraj, Pune 411046
                </span>
              </div>
              <a
                href="tel:+917502000079"
                className="flex items-center gap-3 hover:text-white transition-colors w-fit group"
              >
                <Phone className="w-4 h-4 shrink-0 opacity-90" style={{ color: accent }} />
                <span className="font-mono tracking-wide group-hover:translate-x-0.5 transition-transform">
                  +91-7502-0000-79
                </span>
              </a>
              <a
                href="mailto:info@colorsomepaints.com"
                className="flex items-center gap-3 hover:text-white transition-colors w-fit group"
              >
                <Mail className="w-4 h-4 shrink-0 opacity-90" style={{ color: accent }} />
                <span className="group-hover:translate-x-0.5 transition-transform font-light">
                  info@colorsomepaints.com
                </span>
              </a>
            </div>
          </motion.div>

          {/* Condensed System Catalog (Clean Single Column Footprint) */}
          <motion.div variants={fadeUp} className="col-span-2 lg:col-span-3 lg:ml-auto">
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/40 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} /> System
              Catalog
            </h4>
            <ul className="space-y-3.5 text-sm text-white/55 font-light">
              {macroRanges.map((range) => (
                <li key={range.name}>
                  {/* Optional query parsing can update your active filter state on the products page */}
                  <Link
                    href={`/products?category=${encodeURIComponent(range.slug)}`}
                    className="hover:text-[#F3E7C9] hover:translate-x-0.5 inline-block transition-all duration-200"
                  >
                    {range.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Navigation Matrix */}
          <motion.div variants={fadeUp} className="col-span-1 lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/40 mb-6">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-white/55 font-light">
              {[
                "Home Consultation",
                "Color Selection",
                "Project Planning",
                "About Us",
                "Contact Space",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item.includes("About")
                        ? "/about"
                        : item.includes("Contact")
                          ? "/contact"
                          : "/assistance"
                    }
                    className="hover:text-white block hover:translate-x-0.5 duration-200 transition-all"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Directives Section */}
          <motion.div variants={fadeUp} className="col-span-2 md:col-span-1 lg:col-span-2">
            <h4 className="text-base font-medium mb-5" style={{ fontFamily: 'var(--font-display), serif' }}>
              Get Started
            </h4>

            <div className="flex flex-col gap-4">
              <Link
                href="/assistance"
                className="inline-flex items-center justify-center w-full min-h-[56px] rounded-xl px-6 py-3.5 text-sm font-semibold border transition-all duration-300 hover:text-white"
                style={{ borderColor: accent, color: accent }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                Book Consultation
                <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center justify-center w-full min-h-[56px] rounded-xl px-6 py-3.5 text-sm font-semibold border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/25 transition-all duration-300"
              >
                Browse Products
                <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 3. BASELINE BOTTOM FLOOR */}
      <div className="bg-[#0D0D0D] py-6 border-t border-white/[0.01]">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 font-light">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-center sm:text-left">
            <p>&copy; {currentYear} Colorsome Paints Pvt. Ltd. All rights reserved.</p>
            <span className="hidden sm:inline text-white/[0.08]">|</span>
            <p className="text-white/55 font-light tracking-wide flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
              Designed & Developed by 
              <a 
                href="https://www.servexai.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold uppercase tracking-wider hover:opacity-80 transition-opacity inline-flex items-center gap-0.5"
              >
                SERVEXAI
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}