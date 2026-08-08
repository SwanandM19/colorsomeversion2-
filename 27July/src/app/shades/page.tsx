'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Palette, ArrowRight, Sparkles, SlidersHorizontal, Search, Heart, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShadeCard } from '../../components/ShadeCard';
import { ShadeFilterDrawer } from '../../components/shades/ShadeFilterDrawer';
import { useFavoriteShades } from '../../lib/shades/useFavoriteShades';
import { getTone, type Tone } from '../../lib/shades/toneUtils';
import { collectionTypes, STATIC_SHADES, FAMILY_OPTIONS } from '../../lib/shades/shadeData';
import Image from 'next/image';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';

// Restrained luxury palette — see src/lib/palette.ts for the shared source.
const BRAND = {
  pink: '#8C6478', // plum
  orange: '#C4704B', // terracotta
};

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const browseBySpace = [
  {
    space: 'Living Room',
    desc: 'Warm neutrals and soft blues for inviting spaces',
    shades: ['#D4B896', '#D1C7BD', '#6B8FA3', '#FFFFF0'],
    image: '/LivingRoom.png',
  },
  {
    space: 'Bedroom',
    desc: 'Calming pastels and muted tones for peaceful retreat',
    shades: ['#E6E6FA', '#9DC183', '#EBF2F2', '#D1C7BD'],
    image: '/Bedrooom.png',
  },
  {
    space: 'Kitchen',
    desc: 'Fresh whites and subtle colours for any style',
    shades: ['#FFFFFF', '#EBF2F2', '#FFDB58', '#D4B896'],
    image: '/Kitchen.png',
  },
  {
    space: 'Exterior',
    desc: 'Weather-resistant shades for lasting curb appeal',
    shades: ['#FFFFF0', '#36454F', '#E2725B', '#228B22'],
    image: '/Exterior.png',
  },
];

const inspirationGallery = [
  { image: '/modernmini.png', label: 'Modern Minimalist' },
  { image: '/warmcontempoary.png', label: 'Warm Contemporary' },
  { image: '/serenebedroom.png', label: 'Serene Bedroom' },
  { image: '/classicinterior.png', label: 'Classic Exterior' },
];

function ShadesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Collection, family and tone are derived directly from the URL rather
  // than mirrored into local state — this keeps back/forward navigation
  // and direct/shared links correct for free, matching the pattern already
  // used for category filtering on /products.
  const selectedCollection = searchParams.get('collection');
  const family = searchParams.get('family');
  const toneParam = searchParams.get('tone');
  const tone: Tone | null = toneParam === 'Light' || toneParam === 'Medium' || toneParam === 'Dark' ? toneParam : null;

  // Search stays local so typing is instant; it's synced to the URL on a
  // short debounce rather than on every keystroke.
  const [searchText, setSearchText] = useState(() => searchParams.get('search') ?? '');
  const [savedOnly, setSavedOnly] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { favoriteIds, isFavorite, toggleFavorite, count: favoriteCount } = useFavoriteShades();

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const qs = params.toString();
    router.replace(qs ? `/shades?${qs}` : '/shades', { scroll: false });
  }

  useEffect(() => {
    const trimmed = searchText.trim();
    const t = setTimeout(() => {
      if ((searchParams.get('search') ?? '') !== trimmed) updateParam('search', trimmed || null);
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const setCollection = (slug: string | null) => updateParam('collection', slug);
  const setFamily = (v: string | null) => updateParam('family', family === v ? null : v);
  const setTone = (v: Tone | null) => updateParam('tone', tone === v ? null : v);

  const activeFilterCount = [family, selectedCollection, tone, searchText.trim() || null, savedOnly || null].filter(Boolean).length;
  const isFiltering = activeFilterCount > 0;

  function clearAll() {
    setSearchText('');
    setSavedOnly(false);
    router.replace('/shades', { scroll: false });
  }

  const filteredShades = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    const qHex = q.replace(/^#/, '');
    return STATIC_SHADES.filter((s) => {
      if (family && s.collection !== family) return false;
      if (selectedCollection && s.collection_type !== selectedCollection) return false;
      if (tone && getTone(s.hex_code) !== tone) return false;
      if (savedOnly && !favoriteIds.has(s.id)) return false;
      if (q) {
        const nameMatch = s.name.toLowerCase().includes(q);
        const hexMatch = s.hex_code.toLowerCase().replace('#', '').includes(qHex);
        if (!nameMatch && !hexMatch) return false;
      }
      return true;
    }).sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  }, [family, selectedCollection, tone, savedOnly, favoriteIds, searchText]);

  // When browsing "All Shades" with no active filter, break the 100-strong
  // list into its own collections instead of one undifferentiated grid —
  // gives the page rhythm and lets people jump straight to a collection.
  // The moment any filter is active, fall back to the flat filtered grid.
  const groupedShades = useMemo(() => {
    if (isFiltering) return null;
    return collectionTypes
      .filter((c) => c.slug !== null)
      .map((c) => ({
        ...c,
        items: STATIC_SHADES.filter((s) => s.collection_type === c.slug).sort(
          (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [isFiltering]);

  const displayedShades = isFiltering ? filteredShades : STATIC_SHADES;

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-[72px] text-[#2D2D2D] font-sans overflow-x-hidden relative selection:bg-[#F3E7C9]">

      {/* GLOBAL BACKGROUND AMBIENT GLOWS */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[5%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px]" style={{ background: `radial-gradient(circle, ${BRAND.pink} 0%, transparent 70%)` }} />
        <div className="absolute top-[40%] -right-[10%] w-[45vw] h-[45vw] rounded-full blur-[120px]" style={{ background: `radial-gradient(circle, ${BRAND.orange} 0%, transparent 70%)` }} />
        <div className="absolute bottom-[20%] left-[5%] w-[40vw] h-[40vw] rounded-full blur-[100px]" style={{ background: `radial-gradient(circle, ${BRAND.pink} 0%, transparent 70%)` }} />
      </div>

      <Header />

      {/* HERO TITLE BLOCK - Split Layout with Product Render */}
      <section className="py-14 sm:py-20 bg-white/40 backdrop-blur-sm border-b border-[#EDE6DA]/50 relative overflow-hidden">
        {/* Subtle CSS Micro-Grid Architectural Canvas Blueprint Layer */}
        <div
          className="absolute inset-0 opacity-[0.45] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #EDE6DA 1px, transparent 1px),
              linear-gradient(to bottom, #EDE6DA 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left Content Column */}
            <motion.div className="lg:col-span-7" initial="hidden" animate="visible" variants={fadeInUp}>
               <div className="inline-flex items-center gap-2 bg-gold/10 text-gold-dark font-semibold text-xs tracking-wider uppercase px-3 py-1 rounded-full mb-5">
                 <Sparkles className="w-3.5 h-3.5 text-gold" /> Master Swatches
               </div>
               <span className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Architectural Palettes</span>

               <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal mb-6 leading-[1.05] sm:leading-none tracking-tight">
                 Find Your Perfect <br />
                 <span className="bg-gradient-to-r from-[#8C6478] to-[#C4704B] bg-clip-text text-transparent">
                   Architectural Tone
                 </span>
               </h1>

               <p className="text-base md:text-lg text-[#6B6B6B] leading-relaxed max-w-xl font-light">
                 Explore our curated collections. From highly sophisticated neutrals to dramatic, modern statement accents, uncover tones precisely formulated to command lighting.
               </p>
             </motion.div>

            {/* Right Column: Premium Paint Cans Render */}
            <motion.div
              className="lg:col-span-5 relative flex justify-center"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F3E7C9]/40 via-transparent to-transparent rounded-3xl blur-2xl -z-10 transform scale-90" />

              <div className="relative rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#EDE6DA] overflow-hidden aspect-square w-full max-w-[440px] bg-white group">
                <Image
                  src="/shadesImg.png"
                  alt="Colorsome premium paint can lineup showcase"
                  fill
                  priority
                  sizes="(max-w-1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* STICKY COLLECTION FILTERS — unchanged navigation, now URL-backed */}
      <section className="bg-[#2D2D2D] py-4 sticky top-[72px] z-40 shadow-lg border-b border-black/10">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center gap-4">
          <div className="text-white/40 border-r border-white/10 pr-3 hidden md:flex items-center gap-1.5 shrink-0 font-inter">
            <SlidersHorizontal className="w-4 h-4 text-[#C4704B]" />
            <span className="text-[10px] uppercase font-black tracking-widest text-gray-300">Collections</span>
          </div>
          <div className="flex items-center overflow-x-auto gap-2 scrollbar-hide flex-1 py-0.5 pr-4 font-inter">
            {collectionTypes.map((c) => {
              const isSelected = selectedCollection === c.slug;
              return (
                <button
                  key={c.name}
                  onClick={() => setCollection(c.slug)}
                  className={`px-4 py-2.5 md:py-2 rounded-xl text-xs font-bold tracking-wide whitespace-nowrap shrink-0 transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#F3E7C9] text-[#2D2D2D] shadow-sm scale-[1.02]'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEARCH + FILTERS TOOLBAR — Family / Tone / Saved live in the drawer;
          search and quick access to Saved/Filters live in this compact row
          so the page never grows a second wall of chips. */}
      <section className="border-b border-[#EDE6DA]/60 bg-white/60 backdrop-blur-sm">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B8E7E] pointer-events-none" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by name or hex…"
              aria-label="Search shades by name or hex code"
              className="input-premium min-h-[44px] pl-10 pr-9"
            />
            {searchText && (
              <button
                type="button"
                onClick={() => setSearchText('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[#9B8E7E] hover:bg-[#F3E7C9] hover:text-charcoal transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative min-h-[44px] inline-flex items-center gap-2 px-4 rounded-xl text-xs font-bold border border-[#EDE6DA] text-charcoal hover:border-[#DCD2C2] hover:bg-[#FAF8F5] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {(family || tone) && (
                <span className="w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center" style={{ background: '#C4704B' }}>
                  {[family, tone].filter(Boolean).length}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setSavedOnly((v) => !v)}
              aria-pressed={savedOnly}
              aria-label={savedOnly ? 'Show all shades' : 'Show saved shades only'}
              className={`relative min-h-[44px] inline-flex items-center gap-2 px-4 rounded-xl text-xs font-bold border transition-colors ${
                savedOnly ? 'border-transparent text-white' : 'border-[#EDE6DA] text-charcoal hover:border-[#DCD2C2] hover:bg-[#FAF8F5]'
              }`}
              style={savedOnly ? { background: '#C4704B' } : undefined}
            >
              <Heart className="w-4 h-4" style={{ fill: savedOnly ? 'white' : 'transparent' }} />
              Saved
              {favoriteCount > 0 && (
                <span
                  className="w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center"
                  style={savedOnly ? { background: 'rgba(255,255,255,0.3)', color: 'white' } : { background: '#F3E7C9', color: '#2D2D2D' }}
                >
                  {favoriteCount}
                </span>
              )}
            </button>
            <Link
              href="/colour-visualizer"
              className="min-h-[44px] inline-flex items-center gap-2 px-4 rounded-xl text-xs font-bold text-white transition-transform active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #8C6478 0%, #C4704B 100%)' }}
            >
              <Eye className="w-4 h-4" />
              Visualize a Colour
            </Link>
          </div>
        </div>

        {savedOnly && favoriteCount > 0 && (
          <div className="max-w-[1280px] mx-auto px-6 pb-4 -mt-1">
            <Link
              href="/colour-visualizer"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#C4704B] hover:text-[#8C6478] transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Try your saved shades in a room
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </section>

      <ShadeFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        familyOptions={FAMILY_OPTIONS}
        family={family}
        onFamilyChange={setFamily}
        tone={tone}
        onToneChange={setTone}
        savedOnly={savedOnly}
        onSavedOnlyChange={setSavedOnly}
        activeCount={activeFilterCount}
        resultCount={filteredShades.length}
        onClearAll={clearAll}
      />

      {/* SHADES INTERACTIVE ENGINE GRID */}
      <section className="py-16 relative">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center items-start justify-between gap-3 sm:gap-0 mb-6 pb-4 border-b border-[#EDE6DA]/60 font-inter">
            <p className="text-sm font-medium text-charcoal-muted">
              Showing <span className="text-charcoal font-bold">{displayedShades.length}</span> signature shade{displayedShades.length !== 1 ? 's' : ''}
              {isFiltering && (
                <>
                  {' '}&middot;{' '}
                  <button onClick={clearAll} className="font-bold text-[#C4704B] hover:text-[#8C6478] transition-colors">
                    Clear All
                  </button>
                </>
              )}
            </p>
            <Link href="/assistance" className="text-xs font-black text-[#C4704B] uppercase tracking-widest hover:text-[#8C6478] flex items-center gap-1.5 group transition-colors">
              <Palette className="w-4 h-4" /> Need matching advice? <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Jump-to-collection chips — only shown in the unfiltered "All
              Shades" view, so a 100-shade wall never feels like the only
              option is endless scrolling */}
          {groupedShades && (
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-8 -mt-2 font-inter">
              {groupedShades.map((c) => (
                <a
                  key={c.slug}
                  href={`#collection-${c.slug}`}
                  className="px-3.5 py-2 sm:py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap bg-[#F7F3EC] text-charcoal-muted hover:bg-[#F3E7C9] hover:text-charcoal transition-colors shrink-0"
                >
                  {c.name} <span className="opacity-50">({c.items.length})</span>
                </a>
              ))}
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {isFiltering && filteredShades.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-32 text-center max-w-md mx-auto font-inter"
              >
                <Palette className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-1 text-charcoal">No Swatches Found</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed font-normal mb-5">
                  No shades match your current filters. Try adjusting your search or clearing filters.
                </p>
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] uppercase tracking-widest font-black text-white transition-transform active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #8C6478 0%, #C4704B 100%)' }}
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : groupedShades ? (
              <div className="space-y-16">
                {groupedShades.map((c, ci) => (
                  <motion.div
                    key={c.slug}
                    id={`collection-${c.slug}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5 }}
                    className="scroll-mt-32"
                  >
                    <div className="flex items-baseline justify-between mb-5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: ['#C9A858', '#C4704B', '#8B9E7E', '#2C3E50', '#8C6478'][ci % 5] }}
                        />
                        <h3 className="font-serif text-xl font-bold text-charcoal">{c.name}</h3>
                      </div>
                      <button
                        onClick={() => setCollection(c.slug)}
                        className="text-[10px] uppercase tracking-widest font-bold text-charcoal-muted hover:text-[#C4704B] transition-colors"
                      >
                        View all {c.items.length} &rarr;
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
                      {c.items.map((shade) => (
                        <ShadeCard
                          key={shade.id}
                          shade={shade}
                          size="md"
                          isFavorite={isFavorite(shade.id)}
                          onToggleFavorite={(s) => toggleFavorite(s.id)}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6"
              >
                {filteredShades.map((shade) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={shade.id}
                  >
                    <ShadeCard
                      shade={shade}
                      size="md"
                      isFavorite={isFavorite(shade.id)}
                      onToggleFavorite={(s) => toggleFavorite(s.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* SPACE INTERACTIVE SWATCH MAPPER */}
      <section className="py-16 md:py-24 bg-[#FDFBF7]/40 border-t border-b border-[#EDE6DA]/50 relative">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-3 h-[1.5px]" style={{ background: '#8C6478' }} />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6478] font-black font-inter">By Space Architecture</span>
              <span className="w-3 h-[1.5px]" style={{ background: '#8C6478' }} />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal tracking-tight">Formulated Tones for Every Room</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
          >
            {browseBySpace.map((s, i) => {
              const accent = ['#C4704B', '#2C3E50', '#C9A858', '#8B9E7E'][i % 4];
              return (
                <motion.div
                  key={s.space}
                  variants={fadeInUp}
                  whileHover={{ y: -6 }}
                  className="relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#EDE6DA]/60 flex flex-col justify-between group hover:shadow-xl hover:bg-white transition-all duration-300"
                >
                  <div className="relative h-48 w-full overflow-hidden shrink-0">
                    <Image
                      src={s.image}
                      alt={s.space}
                      fill
                      sizes="(max-w-768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent pointer-events-none" />
                    <span className="absolute top-4 right-4 w-2 h-2 rounded-full" style={{ background: accent, boxShadow: `0 0 0 4px ${accent}30` }} />
                    <div className="absolute bottom-4 left-5">
                      <p className="font-serif text-2xl font-bold text-white tracking-wide">{s.space}</p>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between font-inter">
                    <p className="text-xs sm:text-sm text-charcoal-muted mb-5 leading-relaxed font-normal tracking-wide">{s.desc}</p>
                    <div className="pt-4 border-t" style={{ borderColor: `${accent}20` }}>
                      <span className="text-[10px] font-black uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: accent }}>
                        <Palette className="w-3 h-3" /> Recommended Swatches
                      </span>
                      <div className="flex gap-2.5">
                        {s.shades.map((color, ci) => (
                          <motion.div
                            key={ci}
                            whileHover={{ y: -4, scale: 1.1 }}
                            title={`Hex: ${color}`}
                            className="w-10 h-10 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.08)] ring-2 ring-white cursor-help relative group/swatch shrink-0"
                            style={{ backgroundColor: color }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#2D2D2D] text-white text-[9px] rounded font-mono opacity-0 group-hover/swatch:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-10">
                              {color}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CURATED INSPIRATION IMAGERY GALLERY */}
      <section className="py-16 md:py-24 relative">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-3 h-[1.5px]" style={{ background: '#C4704B' }} />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C4704B] font-black font-inter">Atmosphere Inspiration</span>
              <span className="w-3 h-[1.5px]" style={{ background: '#C4704B' }} />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal tracking-tight">Real Space Transformation Maps</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
          >
            {inspirationGallery.map((item, i) => {
              const accent = ['#C4704B', '#2C3E50', '#C9A858', '#8B9E7E'][i % 4];
              return (
                <motion.div
                  key={item.label}
                  variants={fadeInUp}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl overflow-hidden border border-[#EDE6DA]/40 relative aspect-[4/5] group shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="(max-w-768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full" style={{ background: accent, boxShadow: `0 0 0 4px ${accent}30` }} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <p className="font-serif text-lg font-bold text-white tracking-wide mb-2">{item.label}</p>
                    <div className="h-[2px] w-6 group-hover:w-12 transition-all duration-500 rounded-full" style={{ background: accent }} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA INTERACTIVE BLUEPRINT PANEL */}
      <section className="py-12 max-w-[1280px] mx-auto px-6">
        <motion.div
          className="max-w-[1000px] mx-auto text-center rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden group"
          style={{ background: `linear-gradient(165deg, #241D16 0%, #1A1A1A 55%, #150F0B 100%)` }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Grain texture, consistent with the site's other dark sections */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '128px 128px',
            }}
          />
          {/* Embedded accent glows, gently breathing */}
          <motion.div
            className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[90px] pointer-events-none"
            style={{ background: BRAND.pink }}
            animate={{ opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[90px] pointer-events-none"
            style={{ background: BRAND.orange }}
            animate={{ opacity: [0.18, 0.3, 0.18] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          {/* Thin gold ring frame */}
          <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-[#C9A858]/15 pointer-events-none" />

          <div className="inline-flex items-center gap-2 mb-3 relative z-10">
            <span className="w-3 h-[1.5px]" style={{ background: '#C4704B' }} />
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C4704B] font-black font-inter">Color Architecture Assistance</p>
            <span className="w-3 h-[1.5px]" style={{ background: '#C4704B' }} />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-[1.05] sm:leading-none max-w-2xl mx-auto relative z-10">Can't Decide on Tone Swatches?</h2>
          <p className="text-base text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed font-inter font-normal tracking-wide relative z-10">
            Skip guessing layouts. Our design masters can overlay high-performance physical coat swatches directly onto your properties under exact lighting frameworks.
          </p>

          <div className="relative z-10 max-w-md mx-auto font-inter">
            <Link href="/assistance" className="group/btn relative overflow-hidden w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F3E7C9] text-[#2D2D2D] rounded-xl text-xs uppercase tracking-widest font-black transition-all shadow-md hover:shadow-xl hover:bg-[#ebdcb4]">
              <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out" style={{ background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)' }} />
              <span className="relative">Book Free Color Art Consultation</span>
              <ArrowRight className="w-4 h-4 relative group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

// useSearchParams() requires a Suspense boundary in the App Router.
export default function ShadesPage() {
  return (
    <Suspense fallback={null}>
      <ShadesPageContent />
    </Suspense>
  );
}
