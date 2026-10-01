'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Phone, ChevronDown,
  Home as HomeIcon, Package, Palette, HelpCircle, Info, Mail,
  Paintbrush, SunMedium, Layers, Droplets, ShieldCheck, MessageCircle,
  Calculator, Ruler, Wallet, Waves, ClipboardList,
} from 'lucide-react';
import { usePalette } from '../lib/palette';
import { CATEGORY_TAXONOMY } from '../app/products/categoryTaxonomy';

const navLinks = [
  { label: 'Home', href: '/', icon: HomeIcon },
  { label: 'Products', href: '/products', icon: Package },
  { label: 'Shades', href: '/shades', icon: Palette },
  { label: 'Calculators', href: '/calculators', icon: Calculator },
  { label: 'Assistance', href: '/assistance', icon: HelpCircle },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Contact', href: '/contact', icon: Mail },
];

const CALCULATOR_LINKS = [
  { label: 'Paint Quantity Calculator', href: '/calculators/paint-quantity', icon: Ruler, desc: 'How much paint you need' },
  { label: 'Painting Cost Calculator', href: '/calculators/painting-cost', icon: Wallet, desc: 'Material + labour estimate' },
  { label: 'Waterproofing Calculator', href: '/calculators/waterproofing', icon: Waves, desc: 'Terrace, bathroom & more' },
  { label: 'Product Requirement Calculator', href: '/calculators/product-requirement', icon: ClipboardList, desc: 'Your full painting system' },
];

// One icon per mega-menu column, keyed by the taxonomy slug — kept here
// rather than in categoryTaxonomy.ts so that shared file stays framework/UI-free.
const COLUMN_ICONS: Record<string, typeof Paintbrush> = {
  'interior-paints': Paintbrush,
  'exterior-paints-textures': SunMedium,
  'enamels-primers-sealers': Layers,
  'waterproofing-construction': Droplets,
  'industrial-protective': ShieldCheck,
};

const mobileMenuStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};
const mobileMenuItem = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileCalcOpen, setMobileCalcOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [calcMenuOpen, setCalcMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { accents } = usePalette();
  const accent = accents[0];
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaContainerRef = useRef<HTMLDivElement>(null);
  const calcCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const calcContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileProductsOpen(false);
    setMobileCalcOpen(false);
    setMegaOpen(false);
    setCalcMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Mega-menu: small close delay so moving the cursor from the trigger into
  // the panel doesn't flicker-close it; Escape and outside-click both close.
  const openMega = () => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 180);
  };

  useEffect(() => {
    if (!megaOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (megaContainerRef.current && !megaContainerRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [megaOpen]);

  const openCalcMenu = () => {
    if (calcCloseTimer.current) clearTimeout(calcCloseTimer.current);
    setCalcMenuOpen(true);
  };
  const scheduleCloseCalcMenu = () => {
    if (calcCloseTimer.current) clearTimeout(calcCloseTimer.current);
    calcCloseTimer.current = setTimeout(() => setCalcMenuOpen(false), 180);
  };

  useEffect(() => {
    if (!calcMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCalcMenuOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (calcContainerRef.current && !calcContainerRef.current.contains(e.target as Node)) {
        setCalcMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [calcMenuOpen]);

  const navText = 'text-[#2D2D2D]';
  // Changed from grey to darker color for better visibility
  const navMuted = 'text-[#1A1A1A]';
  const navBg = scrolled
    ? 'bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-black/[0.04]'
    : 'bg-transparent border-b border-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div
            className="relative w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-xl sm:rounded-2xl flex items-center justify-center bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-[#EDE6DA] p-1.5 sm:p-2 shrink-0 transition-transform duration-500 group-hover:scale-105"
            style={{ boxShadow: `0 10px 30px rgba(0,0,0,0.06), 0 0 0 1px ${accent}00` }}
          >
            <span
              className="pointer-events-none absolute -inset-[3px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: `0 0 0 3px ${accent}25` }}
            />
            <Image
              src="/Logo.png"
              alt="Colorsome logo"
              width={52}
              height={52}
              className="w-full h-full object-contain relative"
            />
          </div>
          <div className="flex flex-col justify-center leading-none">
            <div className="flex items-start">
              <span
                className={`transition-colors duration-300 ${navText}`}
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.35rem, 4vw, 2rem)',
                  lineHeight: '0.82',
                  fontWeight: 700,
                  letterSpacing: '-0.05em',
                  textTransform: 'uppercase',
                }}
              >
                COLORSOME
              </span>
              <span
                className={`transition-colors duration-300 ${navText}`}
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.48rem',
                  lineHeight: 1,
                  fontWeight: 700,
                  marginLeft: '0.15rem',
                  marginTop: '0.1rem',
                  letterSpacing: '0.04em',
                }}
              >
                R
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav — reveals at lg (1024px). At md (768px) the full
            6-link pill + CTA button don't comfortably fit next to the logo,
            so tablet widths get the mobile hamburger menu instead. */}
        <nav className="hidden lg:flex items-center relative" ref={megaContainerRef}>
          <div className="relative flex items-center gap-1 rounded-full border border-[#EDE6DA]/50 bg-white/20 backdrop-blur-md px-2 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.03)]">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              const isProducts = label === 'Products';
              const isCalculators = label === 'Calculators';
              return (
                <div
                  key={href}
                  className="relative"
                  ref={isCalculators ? calcContainerRef : undefined}
                  onMouseEnter={isProducts ? openMega : isCalculators ? openCalcMenu : undefined}
                  onMouseLeave={isProducts ? scheduleCloseMega : isCalculators ? scheduleCloseCalcMenu : undefined}
                >
                  <Link
                    href={href}
                    onFocus={isProducts ? openMega : isCalculators ? openCalcMenu : undefined}
                    aria-expanded={isProducts ? megaOpen : isCalculators ? calcMenuOpen : undefined}
                    aria-haspopup={isProducts || isCalculators ? 'true' : undefined}
                    className={`relative rounded-full px-2.5 xl:px-4 py-2.5 transition-colors duration-200 inline-flex items-center gap-1 ${
                      isActive
                        ? 'text-[#2D2D2D] font-semibold'
                        : `${navMuted} hover:text-[#2D2D2D] font-medium`
                    }`}
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.88rem',
                      letterSpacing: '-0.01em',
                      lineHeight: 1,
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="headerActivePill"
                        className="absolute inset-0 rounded-full -z-10"
                        style={{ background: '#F3E7C9' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                    {(isProducts || isCalculators) && (
                      <ChevronDown
                        className="relative w-3.5 h-3.5 transition-transform duration-200"
                        style={{ transform: (isProducts ? megaOpen : calcMenuOpen) ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    )}
                  </Link>

                  {/* ── Calculators dropdown — compact, single column, not a
                      wide mega-menu. Same static-wrapper/animated-inner split
                      as the Products mega-menu, for the same transform-safety
                      reason (see comment above). */}
                  {isCalculators && (
                    <AnimatePresence>
                      {calcMenuOpen && (
                        <div
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[300px] z-50"
                          onMouseEnter={openCalcMenu}
                          onMouseLeave={scheduleCloseCalcMenu}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white rounded-2xl border border-[#EDE6DA] shadow-[0_30px_70px_rgba(0,0,0,0.14)] overflow-hidden origin-top p-2"
                          >
                            {CALCULATOR_LINKS.map((c) => (
                              <Link
                                key={c.href}
                                href={c.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors group/item"
                              >
                                <span
                                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                  style={{ background: `${accent}14`, color: accent }}
                                >
                                  <c.icon className="w-4 h-4" />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-[13px] font-bold text-[#2D2D2D] leading-tight">{c.label}</span>
                                  <span className="block text-[11px] text-[#9B9B9B] truncate">{c.desc}</span>
                                </span>
                              </Link>
                            ))}
                            <div className="border-t border-[#EDE6DA] mt-1 pt-1">
                              <Link
                                href="/calculators"
                                className="block px-3 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-widest hover:bg-[#FAF8F5] transition-colors"
                                style={{ color: accent }}
                              >
                                View All Calculators →
                              </Link>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Products mega-menu ──
              Static positioning (centering under the nav) lives on this
              outer wrapper; the inner motion.div only animates
              opacity/y/scale. Framer Motion writes its own inline
              `transform` for animated props, which would otherwise silently
              overwrite a Tailwind `-translate-x-1/2` class on the same
              element and break the horizontal centering. */}
          <AnimatePresence>
            {megaOpen && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[min(860px,88vw)] z-50"
                onMouseEnter={openMega}
                onMouseLeave={scheduleCloseMega}
              >
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-3xl border border-[#EDE6DA] shadow-[0_30px_70px_rgba(0,0,0,0.14)] overflow-hidden origin-top"
              >
                <div className="grid grid-cols-5 gap-6 p-8">
                  {CATEGORY_TAXONOMY.map((column) => {
                    const Icon = COLUMN_ICONS[column.slug] ?? Package;
                    return (
                      <div key={column.slug}>
                        <div className="flex items-center gap-2 mb-4">
                          <span
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: `${accent}14`, color: accent }}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                        </div>
                        <p
                          className="text-[13px] font-bold text-[#2D2D2D] mb-3 leading-tight"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {column.title}
                        </p>
                        <ul className="space-y-2">
                          {column.subcategories.map((sub) => (
                            <li key={sub.slug}>
                              <Link
                                href={`/products?category=${sub.slug}`}
                                className="text-[13px] text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors duration-150 block py-0.5"
                                style={{ fontFamily: 'var(--font-inter)' }}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Featured strip */}
                <div className="border-t border-[#EDE6DA] bg-[#FAF8F5] px-8 py-4 flex items-center justify-between gap-4">
                  <Link
                    href="/products"
                    className="text-[12px] font-bold uppercase tracking-widest text-[#2D2D2D] hover:opacity-70 transition-opacity"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Explore All Products →
                  </Link>
                  <Link
                    href="/assistance"
                    className="group shrink-0 inline-flex items-center gap-2 text-[13px] font-semibold rounded-full px-4 py-2 transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-inter)', color: accent, background: `${accent}12` }}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Need help choosing?
                  </Link>
                </div>
              </motion.div>
              </div>
            )}
          </AnimatePresence>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
         <Link
  href="/assistance"
  className="group relative hidden lg:inline-flex items-center gap-2 px-4 py-2.5 rounded-[4px] text-[10px] uppercase tracking-widest font-medium transition-all duration-300 text-white shadow-md hover:shadow-lg bg-[#2D2D2D] overflow-hidden"
>
  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" style={{ background: `linear-gradient(115deg, transparent 30%, ${accent}55 50%, transparent 70%)` }} />
  <Phone className="w-3.5 h-3.5 relative" /> <span className="relative">Book Assistance</span>
</Link>
          <button
            className="lg:hidden p-2 rounded-lg text-[#2D2D2D]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop — dims the page behind so the menu reads as a focused
                overlay instead of a flush dropdown bleeding into page content */}
            <motion.div
              className="lg:hidden fixed inset-0 top-[72px] bg-black/30 backdrop-blur-[2px] z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-full left-0 right-0 z-50 mx-3 mt-2 bg-white rounded-3xl border border-[#EDE6DA] shadow-[0_24px_60px_rgba(0,0,0,0.18)] overflow-hidden"
            >
              <motion.nav
                initial="hidden"
                animate="show"
                variants={mobileMenuStagger}
                className="px-3 py-3"
              >
                {navLinks.map(({ label, href, icon: Icon }) => {
                  const isActive = pathname === href;
                  const isProducts = label === 'Products';

                  if (isProducts) {
                    return (
                      <motion.div key={href} variants={mobileMenuItem}>
                        <button
                          type="button"
                          onClick={() => setMobileProductsOpen((v) => !v)}
                          aria-expanded={mobileProductsOpen}
                          className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-[15px] font-semibold transition-colors duration-200 ${
                            isActive ? '' : 'text-[#2D2D2D] hover:bg-[#FAF8F5]'
                          }`}
                          style={{
                            fontFamily: 'var(--font-inter)',
                            background: isActive ? `${accent}12` : undefined,
                            color: isActive ? accent : undefined,
                          }}
                        >
                          <span
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: isActive ? `${accent}20` : '#F7F6F2', color: isActive ? accent : '#8C8C8C' }}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="flex-1 text-left">{label}</span>
                          <ChevronDown
                            className="w-4 h-4 transition-transform duration-200"
                            style={{ transform: mobileProductsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileProductsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pl-[3.25rem] pr-2 pb-1 pt-1 flex flex-col">
                                {CATEGORY_TAXONOMY.map((column) => (
                                  <Link
                                    key={column.slug}
                                    href={`/products?category=${column.slug}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="min-h-[44px] flex items-center text-[14px] text-[#5A5A5A] hover:text-[#2D2D2D] transition-colors"
                                    style={{ fontFamily: 'var(--font-inter)' }}
                                  >
                                    {column.title}
                                  </Link>
                                ))}
                                <Link
                                  href="/products"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="min-h-[44px] flex items-center text-[14px] font-bold transition-colors"
                                  style={{ fontFamily: 'var(--font-inter)', color: accent }}
                                >
                                  View All Products →
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }

                  const isCalculators = label === 'Calculators';
                  if (isCalculators) {
                    return (
                      <motion.div key={href} variants={mobileMenuItem}>
                        <button
                          type="button"
                          onClick={() => setMobileCalcOpen((v) => !v)}
                          aria-expanded={mobileCalcOpen}
                          className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-[15px] font-semibold transition-colors duration-200 ${
                            isActive ? '' : 'text-[#2D2D2D] hover:bg-[#FAF8F5]'
                          }`}
                          style={{
                            fontFamily: 'var(--font-inter)',
                            background: isActive ? `${accent}12` : undefined,
                            color: isActive ? accent : undefined,
                          }}
                        >
                          <span
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: isActive ? `${accent}20` : '#F7F6F2', color: isActive ? accent : '#8C8C8C' }}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="flex-1 text-left">{label}</span>
                          <ChevronDown
                            className="w-4 h-4 transition-transform duration-200"
                            style={{ transform: mobileCalcOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileCalcOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pl-[3.25rem] pr-2 pb-1 pt-1 flex flex-col">
                                {CALCULATOR_LINKS.map((c) => (
                                  <Link
                                    key={c.href}
                                    href={c.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="min-h-[44px] flex items-center text-[14px] text-[#5A5A5A] hover:text-[#2D2D2D] transition-colors"
                                    style={{ fontFamily: 'var(--font-inter)' }}
                                  >
                                    {c.label}
                                  </Link>
                                ))}
                                <Link
                                  href="/calculators"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="min-h-[44px] flex items-center text-[14px] font-bold transition-colors"
                                  style={{ fontFamily: 'var(--font-inter)', color: accent }}
                                >
                                  View All Calculators →
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div key={href} variants={mobileMenuItem}>
                      <Link
                        href={href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-[15px] font-semibold transition-colors duration-200 ${
                          isActive ? '' : 'text-[#2D2D2D] hover:bg-[#FAF8F5]'
                        }`}
                        style={{
                          fontFamily: 'var(--font-inter)',
                          background: isActive ? `${accent}12` : undefined,
                          color: isActive ? accent : undefined,
                        }}
                      >
                        <span
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: isActive ? `${accent}20` : '#F7F6F2', color: isActive ? accent : '#8C8C8C' }}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        {label}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>
              <div className="px-4 pb-4 pt-1">
                <Link
                  href="/assistance"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group relative overflow-hidden flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold text-white bg-[#2D2D2D] shadow-[0_10px_25px_rgba(0,0,0,0.2)] active:scale-[0.98] transition-transform"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" style={{ background: `linear-gradient(115deg, transparent 30%, ${accent}55 50%, transparent 70%)` }} />
                  <Phone className="w-3.5 h-3.5 relative" /> <span className="relative">Book Assistance</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}