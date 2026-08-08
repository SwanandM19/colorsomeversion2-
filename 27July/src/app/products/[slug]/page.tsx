




// 'use client'
// import React, { useState, useEffect, useRef } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { motion, AnimatePresence, useInView } from 'framer-motion'
// import {
//   ArrowLeft, CheckCircle, Phone, ChevronRight, Menu, X,
//   Shield, Droplets, Layers, Zap, Leaf, Maximize2, Sun,
//   Paintbrush, Star, Clock, Award, FlaskConical, Ruler,
//   Sparkles, Package, ChevronDown, Eye, BadgeCheck,
//   ThumbsUp, Info, Beaker, Hammer
// } from 'lucide-react'
// import { products } from '../data'
// import { Footer } from '@/src/components/Footer';

// const ACCENTS = ['#E91E8C', '#2196F3', '#4CAF50', '#FF5722', '#FFC107']

// const BRAND = {
//   pink: '#E91E8C',
//   blue: '#2196F3',
//   green: '#4CAF50',
//   orange: '#FF5722',
//   yellow: '#FFC107',
//   dark: '#2D2D2D',
// }

// // ─── Motion Variants ──────────────────────────────────────────────
// const fadeUp = {
//   hidden: { opacity: 0, y: 24 },
//   show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 26, stiffness: 180 } },
// }
// const stagger = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
// }
// const scaleIn = {
//   hidden: { opacity: 0, scale: 0.93 },
//   show: { opacity: 1, scale: 1, transition: { type: 'spring' as const, damping: 22, stiffness: 200 } },
// }

// // ─── Feature → Icon map ───────────────────────────────────────────
// const FEATURE_ICON_MAP: Record<string, React.ReactNode> = {
//   'UV Resistant':           <Sun className="w-5 h-5" />,
//   'Weather Proof':          <Droplets className="w-5 h-5" />,
//   'Chemical Resistant':    <FlaskConical className="w-5 h-5" />,
//   'Long-lasting Durability': <Layers className="w-5 h-5" />,
//   'Anti-corrosion':        <Shield className="w-5 h-5" />,
//   'Self-healing Properties': <Zap className="w-5 h-5" />,
//   'Temperature Resistant': <Sun className="w-5 h-5" />,
//   'Flexible Application':  <Maximize2 className="w-5 h-5" />,
//   'Eco-friendly':          <Leaf className="w-5 h-5" />,
//   'Waterproof':            <Droplets className="w-5 h-5" />,
//   'Smooth Finish':         <Sparkles className="w-5 h-5" />,
//   'Excellent Adhesion':    <Shield className="w-5 h-5" />,
//   'Quick Drying':          <Zap className="w-5 h-5" />,
//   'Low VOC':               <Leaf className="w-5 h-5" />,
//   'Superior Adhesion':     <Shield className="w-5 h-5" />,
//   'High Gloss Finish':     <Sparkles className="w-5 h-5" />,
//   'Scratch Resistant':     <Shield className="w-5 h-5" />,
//   'Scrub Resistant':       <Award className="w-5 h-5" />,
//   'Stain Resistant':       <Droplets className="w-5 h-5" />,
//   'Color Retention':       <Sun className="w-5 h-5" />,
//   'Anti-fungal':           <Leaf className="w-5 h-5" />,
//   'Elastic Properties':    <Maximize2 className="w-5 h-5" />,
//   'Crack Bridging':        <Hammer className="w-5 h-5" />,
//   'Fade Resistance':       <Sun className="w-5 h-5" />,
//   'Breathable Coating':    <Leaf className="w-5 h-5" />,
//   'Mildew Resistance':     <Shield className="w-5 h-5" />,
// }
// const DEFAULT_ICON = <Layers className="w-5 h-5" />

// // ─── Feature Descriptions ─────────────────────────────────────────
// const FEATURE_DESCRIPTIONS: Record<string, string> = {
//   'UV Resistant': 'Blocks harsh sunlight exposure to preserve colour strength and surface life over years of outdoor exposure.',
//   'Weather Proof': 'Shields against rain, humidity, and seasonal shifts — keeping the coating intact through all conditions.',
//   'Chemical Resistant': 'Withstands contact with industrial chemicals and frequent cleaning agents without surface degradation.',
//   'Long-lasting Durability': 'Engineered for extended performance cycles so the finish remains dependable for years, not months.',
//   'Anti-corrosion': 'Forms a molecular barrier that actively resists rust initiation and metal surface deterioration.',
//   'Self-healing Properties': 'Micro-recovery technology that helps minor surface marks close over time for a consistently clean look.',
//   'Temperature Resistant': 'Retains its full coating integrity from sub-zero cold to peak summer heat without cracking or peeling.',
//   'Flexible Application': 'Compatible with brush, roller, and spray — adapting seamlessly to any job site requirement.',
//   'Eco-friendly': 'Formulated with a responsible approach — safer for applicators, occupants, and the surrounding environment.',
//   'Waterproof': 'Creates a hydrophobic surface layer that actively stops water penetration and protects the substrate below.',
//   'Smooth Finish': 'Levels uniformly across all surface types, resulting in a refined, even texture that elevates appearance.',
//   'Excellent Adhesion': 'Bonds with exceptional grip to the surface substrate for reliable, long-lasting topcoat performance.',
//   'Quick Drying': 'Touch-dry within 30 minutes. Re-coatable in 4–6 hours — significantly reducing project turnaround time.',
//   'Low VOC': 'Drastically reduced solvent emissions for improved indoor air quality during and after application.',
//   'Superior Adhesion': 'Multi-surface grip formula ensures the coating system holds firm across diverse surface conditions.',
//   'High Gloss Finish': 'Mirror-bright reflective surface that adds depth, premium visual richness, and easy-clean properties.',
//   'Scratch Resistant': 'Hard-set surface film resists minor abrasions during everyday use and routine cleaning.',
//   'Scrub Resistant': 'Engineered to endure repeated cleaning cycles without visible wear, fading, or surface breakdown.',
//   'Stain Resistant': 'Non-porous surface treatment makes spills and common stains easy to wipe away before they set.',
//   'Color Retention': 'Advanced pigment stabilisers keep the shade vibrant and true-to-swatch for extended periods.',
//   'Anti-fungal': 'Active biostatic agents that suppress fungal colonisation in high-moisture, poorly-ventilated spaces.',
//   'Elastic Properties': 'Flexible film structure absorbs surface micro-movement without cracking, ideal for masonry surfaces.',
//   'Crack Bridging': 'Film elasticity spans hairline fractures up to 0.3 mm — preventing water ingress through minor cracks.',
//   'Fade Resistance': 'UV-stable pigment matrix fights colour degradation so the surface retains its original tone longer.',
//   'Breathable Coating': 'Open micro-pore structure allows trapped moisture vapour to escape, preventing blistering and peel.',
//   'Mildew Resistance': 'Active mould-inhibitor system limits mildew growth in bathrooms, basements, and coastal environments.',
//   'Consistent Quality': 'Batch-to-batch stability ensures every tin delivers the same finish, colour, and application performance.',
//   'Time Saving': 'Fast surface coverage and reduced drying windows compress project timelines without compromising quality.',
//   'Reduced Waste': 'High coverage rate means less product per square metre — optimising material spend on every project.',
//   'Superior Bonding': 'Dual-component adhesion formula creates a near-permanent surface bond on challenging substrates.',
//   'High Coverage': 'Covers up to 130–180 sq ft per litre for consistent, gap-free surface coverage in fewer coats.',
//   'Enhanced Longevity': 'Coating lifespan significantly extended versus standard formulations — reducing maintenance frequency.',
//   'Moisture Resistance': 'Moisture-barrier chemistry locks out dampness while allowing the substrate to breathe naturally.',
//   'Dust Resistance': 'Anti-static surface treatment repels airborne dust particles — keeping walls cleaner between washes.',
//   'Easy Maintenance': 'Smooth, sealed surface requires only a damp cloth to restore its original clean, uniform appearance.',
//   'Premium Finish': 'Luxury-grade surface texture that imparts a refined, professionally applied look to every surface.',
//   'Fast Curing': 'Accelerated cross-linking chemistry reaches full hardness faster — minimising downtime on active sites.',
//   'Strong Coverage': 'Dense pigment load delivers opaque, uniform coverage even over darker existing shades.',
//   'Application Ease': 'Low-drag, flow-optimised viscosity for smoother spreading, fewer roller marks, and easier brush control.',
//   'Surface Protection': 'Multi-layer defensive chemistry guards against abrasion, UV, moisture, and chemical attack simultaneously.',
// }

// // ─── How-to step icon map ─────────────────────────────────────────
// const STEP_ICONS = [
//   <Hammer className="w-5 h-5" />,
//   <Paintbrush className="w-5 h-5" />,
//   <Layers className="w-5 h-5" />,
//   <CheckCircle className="w-5 h-5" />,
//   <Sparkles className="w-5 h-5" />,
//   <BadgeCheck className="w-5 h-5" />,
// ]

// // ─── Spec Row ─────────────────────────────────────────────────────
// function SpecRow({ label, value, accent }: { label: string; value?: string; accent: string }) {
//   if (!value) return null
//   return (
//     <div className="flex items-start gap-4 py-3 border-b border-[#EDE6DA] last:border-0">
//       <span
//         className="text-9px uppercase tracking-widest font-black w-28 shrink-0 pt-0.5"
//         style={{ color: '#9B8E7E', fontFamily: 'var(--font-inter)' }}
//       >
//         {label}
//       </span>
//       <span
//         className="text-sm font-semibold text-charcoal"
//         style={{ fontFamily: 'var(--font-inter)' }}
//       >
//         {value}
//       </span>
//     </div>
//   )
// }

// // ─── Animated number counter ──────────────────────────────────────
// function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
//   const [val, setVal] = useState(0)
//   const ref = useRef<HTMLSpanElement>(null)
//   const inView = useInView(ref, { once: true })
//   useEffect(() => {
//     if (!inView) return
//     let start = 0
//     const step = Math.ceil(end / 40)
//     const timer = setInterval(() => {
//       start += step
//       if (start >= end) { setVal(end); clearInterval(timer) }
//       else setVal(start)
//     }, 30)
//     return () => clearInterval(timer)
//   }, [inView, end])
//   return <span ref={ref}>{val}{suffix}</span>
// }

// // ─── Page interface ───────────────────────────────────────────────
// interface PageProps {
//   params: Promise<{ slug: string }>
// }

// export default function ProductDetailPage({ params }: PageProps) {
//   const resolvedParams = React.use(params)
//   const slug = resolvedParams?.slug
//   return <ProductDetailContainer slug={slug} />
// }

// // ─── Main container ───────────────────────────────────────────────
// function ProductDetailContainer({ slug }: { slug: string }) {
//   const router = useRouter()
//   const product = products.find(p => p.slug.toLowerCase() === slug.toLowerCase())
//   const productIndex = products.findIndex(p => p.slug.toLowerCase() === slug.toLowerCase())
//   const accent = ACCENTS[productIndex !== -1 ? productIndex % ACCENTS.length : 0]

//   type Tab = 'overview' | 'features' | 'howto' | 'specs'
//   const [activeTab, setActiveTab] = useState<Tab>('overview')
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [activePack, setActivePack] = useState(0)
//   const [expandedStep, setExpandedStep] = useState<number | null>(0)

//   useEffect(() => {
//     window.scrollTo(0, 0)
//     const onScroll = () => setScrolled(window.scrollY > 40)
//     window.addEventListener('scroll', onScroll, { passive: true })
//     onScroll()
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [slug])

//   if (!product) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] pt-[120px]">
//         <div className="text-center max-w-md bg-white border border-[#EDE7DC] p-10 rounded-2rem shadow-sm">
//           <Paintbrush className="w-10 h-10 text-gold mx-auto mb-4 animate-pulse" />
//           <h1 className="font-serif text-2xl font-bold text-charcoal mb-2" style={{ fontFamily: 'var(--font-cormorant)' }}>
//             Product Not Found
//           </h1>
//           <p className="text-xs text-charcoal-muted font-sans font-light mb-4 leading-relaxed">
//             The URL path <span className="text-red-500 font-mono bg-red-50 px-1.5 py-0.5 rounded border border-red-100">{slug}</span> could not be matched to any product.
//           </p>
//           <Link href="/products" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-charcoal hover:text-gold transition-colors">
//             <ArrowLeft className="w-4 h-4" /> Return to Catalog
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   const related = products.filter(p => p.category === product.category && p.slug !== slug).slice(0, 4)
//   const navBg = scrolled
//     ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#F0EAE1]'
//     : 'bg-white/95 backdrop-blur-md border-b border-[#F0EAE1]'

//   // ─── Category-Specific Application Steps Fallbacks ─────────────────
//   const CATEGORY_HOW_TO_MAP: Record<string, { step: string; title: string; desc: string }[]> = {
//     'Waterproofing': [
//       { step: '01', title: 'Surface Cleaning & Repair', desc: 'Wash surface to remove moss, algae, and loose debris. Heavy cracks must be opened up, cleaned, and sealed with structural polyurethane sealant before coating.' },
//       { step: '02', title: 'Self-Priming / Smart Primer', desc: 'Apply a priming coat. For many advanced compounds, dilute the product itself with 30% clean water to act as a deep-penetrating primer coat. Let dry for 2–3 hours.' },
//       { step: '03', title: 'First Undiluted Coat', desc: 'Apply the first coat of the waterproofing compound without dilution using a heavy block brush or roller. Ensure even structural coverage across all joints and parapet wall bases.' },
//       { step: '04', title: 'Cross-Directional Second Coat', desc: 'Apply the second coat perpendicular (at a 90-degree angle) to the first coat after 4–6 hours. This cross-hatching layout guarantees zero micro-pinholes are left exposed.' }
//     ],
//     'Primers': [
//       { step: '01', title: 'Substrate Levelling & Sanding', desc: 'Ensure walls are clean and fully cured. Sand the surface with emery paper 180 to remove loose plaster particles and wipe off the structural dust clean.' },
//       { step: '02', title: 'Dilution and Consistency', desc: 'Dilute the primer base with clean water or specified solvent as per the technical sheet (typically 80–100% by volume for water-based primers). Stir thoroughly.' },
//       { step: '03', title: 'Application Layout', desc: 'Apply a single uniform coat using a professional paint brush or roller. Work from top to bottom, avoiding patches or excessive paint runs.' },
//       { step: '04', title: 'Sanding Post-Dry', desc: 'Allow it to air-dry for 4–6 hours. Lightly sand the primed surface with emery paper 320 to level micro-ridges before applying the finishing topcoat layers.' }
//     ],
//     'Oil Paints': [
//       { step: '01', title: 'Degreasing & Rust Removal', desc: 'For metal substrates, remove rust completely using wire brushes or sanding. For wood, sand smooth. Wipe down thoroughly with Mineral Turpentine Oil (MTO) to clean oils.' },
//       { step: '02', title: 'Undercoat Application', desc: 'Apply an oil-based primer line (Red Oxide for ferrous metals, Wood Primer for wood). Allow it to dry completely for 12–18 hours before proceeding.' },
//       { step: '03', title: 'Thinning & First Coat', desc: 'Thin the gloss enamel paint with 10–15% MTO. Apply a thin, uniform first coat. Avoid heavy pooling to ensure it does not sag or blister during cross-linking.' },
//       { step: '04', title: 'Overnight Cure & Recoat', desc: 'Allow 12–16 hours of overnight drying. Lightly scuff the surface to create a mechanical key, clean the dust, and apply the final high-gloss finishing coat.' }
//     ],
//     'Industrial Textiles': [
//       { step: '01', title: 'Base Preparation', desc: 'Ensure the engineering substrate is structurally sound, level, free of sharp protrusions, and cleared of standing water or mud deposits.' },
//       { step: '02', title: 'Unrolling & Alignment', desc: 'Roll out the technical textile fabric smoothly along the layout lines. Pull taut to remove wrinkles, ensuring correct mechanical alignment.' },
//       { step: '03', title: 'Overlap & Anchoring', desc: 'Maintain a minimum overlap of 300mm to 500mm at all layout joints. Secure the panels structurally using thermal welding, specialized adhesive tapes, or mechanical fasteners.' },
//       { step: '04', title: 'Immediate Backfilling', desc: 'Cover the textile membrane with the designated aggregate or soil layer within 48 hours to minimize long-term construction UV exposure damage.' }
//     ],
//     'Protective Coatings': [
//       { step: '01', title: 'Profile Sandblasting / Cleaning', desc: 'Clean substrates to pristine standards. For industrial metals, commercial sandblasting to near-white metal is recommended to create an ideal anchor profile.' },
//       { step: '02', title: 'Mixing Multi-Component Bases', desc: 'If dealing with a dual-pack epoxy or polyurethane system, mix base and hardener in the precise stated ratio. Respect the pot-life clock limit completely.' },
//       { step: '03', title: 'Airless Spray Setup', desc: 'Apply using heavy-duty airless spray equipment for a dense, void-free protective film shield. Monitor Wet Film Thickness (WFT) continuously during application.' },
//       { step: '04', title: 'Curing Environment', desc: 'Allow complete cross-linking. Avoid moisture impact or structural mechanical loading during the initial 7-day chemical curing window.' }
//     ]
//   };

//   const DEFAULT_PAINT_STEPS = [
//     { step: '01', title: 'Surface Preparation', desc: 'Clean the surface thoroughly. Remove dust, loose particles, grease, and any traces of algae. Fill hairline cracks with appropriate wall putty and let dry.' },
//     { step: '02', title: 'Apply Primer Base', desc: 'Apply one uniform coat of a suitable undercoat primer. Allow adequate drying time (typically 4–6 hours) before stepping up to the topcoat.' },
//     { step: '03', title: 'First Topcoat Application', desc: 'Dilute the premium paint layer as recommended (usually 10–15% water for emulsions). Apply an even first coat using a high-quality roller or brush tool.' },
//     { step: '04', title: 'Drying & Final Coat', desc: 'Allow the first coat to dry completely for 4 hours. Apply a second finishing coat perpendicular to the first coat for full opacity and optimal color richness.' }
//   ];

//   // Resolve the dynamic steps based on product configuration or category fallback
//   const howToSteps: { step: string; title: string; desc: string }[] =
//     (product as any).howToApply ?? 
//     CATEGORY_HOW_TO_MAP[product.category] ?? 
//     DEFAULT_PAINT_STEPS;

//   // Build pack sizes: use product's own array if present
//   const packSizes: string[] = (product as any).packSizes ?? product.packSizes ?? ['1 L', '4 L', '10 L', '20 L']

//   // Build technical specs object
//   const techSpecs = (product as any).technicalSpecs ?? {}

//   // Summary stats for the hero strip
//   const summaryStats = [
//     { label: 'Coverage', value: techSpecs.coverage ?? '130–150 sq.ft/L', icon: <Ruler className="w-4 h-4" /> },
//     { label: 'Finish', value: techSpecs.finish ?? product.finish ?? 'Premium', icon: <Sparkles className="w-4 h-4" /> },
//     { label: 'Dry Time', value: techSpecs.dryingTime ?? '30 min touch', icon: <Clock className="w-4 h-4" /> },
//     { label: 'Application', value: techSpecs.application ?? 'Brush / Roller / Spray', icon: <Paintbrush className="w-4 h-4" /> },
//   ]

//   const TABS: { id: Tab; label: string }[] = [
//     { id: 'overview', label: 'Overview' },
//     { id: 'features', label: 'Key Features' },
//     { id: 'howto', label: 'How to Apply' },
//     { id: 'specs', label: 'Specifications' },
//   ]

//   return (
//     <div className="bg-[#FAF8F5] min-h-screen selection:bg-[#F3E7C9] pt-[72px]">
//       {/* ── Ambient Grain ── */}
//       <div
//         className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
//           backgroundRepeat: 'repeat',
//           backgroundSize: '128px 128px',
//         }}
//       />
//       {/* ── Accent glow ── */}
//       <div
//         className="pointer-events-none fixed top-0 right-0 w-[520px] h-[520px] z-0"
//         style={{ background: `radial-gradient(circle at top right, ${accent}0A 0%, transparent 65%)` }}
//       />

//       {/* ══════════════════ HEADER ══════════════════ */}
//       <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
//         <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[72px]">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-4 flex-shrink-0 min-w-[260px]">
//             <div className="w-[62px] h-[62px] rounded-2xl flex items-center justify-center bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-[#E8E2D8] p-2 shrink-0">
//               <Image src="/AraWeather.png" alt="Colorsome logo" width={62} height={62} className="w-full h-full object-contain scale-[1.08]" />
//             </div>
//             <div className="flex flex-col justify-center leading-none">
//               <div className="flex items-start">
//                 <span className="transition-colors duration-300 text-[#2D2D2D]" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', lineHeight: 0.82, fontWeight: 700, letterSpacing: '-0.055em', textTransform: 'uppercase' }}>COLORSOME</span>
//                 <span className="transition-colors duration-300 text-[#2D2D2D]" style={{ fontFamily: 'var(--font-inter)', fontSize: '0.55rem', lineHeight: 1, fontWeight: 700, marginLeft: '0.18rem', marginTop: '0.12rem', letterSpacing: '0.04em' }}>®</span>
//               </div>
//             </div>
//           </Link>
//           {/* Desktop nav */}
//           <nav className="hidden md:flex items-center">
//             <div className="flex items-center gap-1 rounded-full border border-black/[0.06] bg-white/80 backdrop-blur-md px-2 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
//               {[['Home', '/'], ['Products', '/products'], ['Shades', '/shades'], ['Assistance', '/assistance'], ['About', '/about'], ['Contact', '/contact']].map(([label, href]) => {
//                 const isActive = label === 'Products'
//                 return (
//                   <Link key={label} href={href} className={`relative rounded-full px-4 py-2.5 transition-all duration-200 ${isActive ? 'text-[#2D2D2D] bg-[#F3E7C9]' : 'text-[#6B6B6B] hover:text-[#2D2D2D] hover:bg-black/[0.04]'}`} style={{ fontFamily: 'var(--font-inter)', fontSize: '0.92rem', fontWeight: isActive ? 600 : 500, letterSpacing: '-0.01em', lineHeight: 1 }}>
//                     {label}
//                   </Link>
//                 )
//               })}
//             </div>
//           </nav>
//           <div className="flex items-center gap-3">
//             <Link href="/assistance" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-white flex-shrink-0" style={{ background: '#2D2D2D' }}>
//               <Phone className="w-4 h-4" /> Book Assistance
//             </Link>
//             <button className="md:hidden p-2 rounded-lg transition-colors text-[#2D2D2D]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
//               {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="md:hidden bg-white border-t border-gray-100 shadow-xl px-6 py-4 space-y-3">
//               {[['Home', '/'], ['Products', '/products'], ['Shades', '/shades'], ['Assistance', '/assistance'], ['About', '/about'], ['Contact', '/contact']].map(([label, href]) => (
//                 <Link key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-charcoal hover:text-gold transition-colors py-2 border-b border-gray-50">{label}</Link>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>

//       {/* ══════════════════ BREADCRUMB ══════════════════ */}
//       <div className="max-w-[1280px] mx-auto px-6 pt-6 pb-4 flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-[#8C8C8C]" style={{ fontFamily: 'var(--font-inter)' }}>
//         <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
//         <ChevronRight className="w-3 h-3 text-gray-300" />
//         <Link href="/products" className="hover:text-charcoal transition-colors">Products</Link>
//         <ChevronRight className="w-3 h-3 text-gray-300" />
//         <span className="text-charcoal font-black truncate">{product.name}</span>
//       </div>

//       {/* ══════════════════ HERO — PRODUCT STAGE ══════════════════ */}
//       <section className="max-w-[1280px] mx-auto px-6 pb-10">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

//           {/* ── LEFT: Image + Quick Specs ── */}
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//             className="lg:col-span-5 lg:sticky lg:top-[116px]"
//           >
//             {/* Image Card */}
//             <div className="rounded-[2.5rem] overflow-hidden bg-white border border-[#EDE6DA] shadow-[0_20px_50px_rgba(45,45,45,0.05)] p-8 relative group transition-shadow duration-500 hover:shadow-[0_32px_70px_rgba(45,45,45,0.10)]">
//               {/* Accent top bar */}
//               <div className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-500" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}CC)` }} />
//               {/* Category badge */}
//               <span className="absolute top-5 right-5 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-md text-white shadow-sm" style={{ background: accent, fontFamily: 'var(--font-inter)' }}>
//                 {product.category?.split(' ')[0] ?? 'Paint'}
//               </span>
//               {/* Hover rings */}
//               <div className="absolute w-64 h-64 rounded-full border opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ borderColor: `${accent}20`, borderWidth: '1px' }} />
//               <div className="absolute w-48 h-48 rounded-full border opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ borderColor: `${accent}12`, borderWidth: '1px' }} />
//               {/* Glow spot */}
//               <div className="absolute inset-0 rounded-[2.5rem] transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${accent}0A 0%, transparent 72%)` }} />
//               {/* Product image */}
//               <motion.div
//                 animate={{ y: [0, -8, 0] }}
//                 transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//                 whileHover={{ scale: 1.06, y: -12 }}
//                 className="relative flex items-center justify-center cursor-zoom-in"
//                 style={{ height: 380 }}
//               >
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   width={360}
//                   height={380}
//                   className="h-80 w-auto object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.13)] z-10 relative"
//                   priority
//                 />
//               </motion.div>
//             </div>

//             {/* ── Quick Stat Strip ── */}
//             <div className="mt-5 grid grid-cols-2 gap-3">
//               {summaryStats.map(({ label, value, icon }) => (
//                 <div
//                   key={label}
//                   className="bg-white border border-[#EDE6DA] rounded-2xl p-4 text-center group hover:shadow-md transition-all duration-200 hover:border-current cursor-default"
//                   style={{ '--tw-border-opacity': '1' } as React.CSSProperties}
//                 >
//                   <div className="flex items-center justify-center gap-1.5 mb-1.5" style={{ color: accent }}>
//                     {icon}
//                   </div>
//                   <p className="text-[9px] uppercase tracking-widest font-bold text-[#9B8E7E] mb-0.5" style={{ fontFamily: 'var(--font-inter)' }}>{label}</p>
//                   <p className="text-sm font-semibold text-charcoal leading-tight" style={{ fontFamily: 'var(--font-inter)' }}>{value}</p>
//                 </div>
//               ))}
//             </div>

//             {/* ── Pack Size Selector ── */}
//             {packSizes.length > 0 && (
//               <div className="mt-5 bg-white border border-[#EDE6DA] rounded-2xl p-5">
//                 <p className="text-[9px] uppercase tracking-widest font-black text-[#9B8E7E] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Available Pack Sizes</p>
//                 <div className="flex flex-wrap gap-2">
//                   {packSizes.map((size, i) => (
//                     <button
//                       key={size}
//                       onClick={() => setActivePack(i)}
//                       className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-200"
//                       style={{
//                         fontFamily: 'var(--font-inter)',
//                         background: activePack === i ? accent : 'transparent',
//                         color: activePack === i ? '#fff' : '#2D2D2D',
//                         border: activePack === i ? `1.5px solid ${accent}` : '1.5px solid #EDE6DA',
//                         boxShadow: activePack === i ? `0 4px 14px ${accent}30` : 'none',
//                       }}
//                     >
//                       <Package className="w-3 h-3 inline mr-1 opacity-70" />
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </motion.div>

//           {/* ── RIGHT: Text + Tabs ── */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
//             className="lg:col-span-7 space-y-8"
//           >
//             {/* Category + Status pill */}
//             <div>
//               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-4" style={{ background: `${accent}12` }}>
//                 <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
//                 <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>
//                   {product.status} &nbsp;·&nbsp; {product.id.toString().padStart(2, '0')}
//                 </span>
//               </div>
//               {/* Product name */}
//               <h1
//                 className="text-4xl md:text-5xl font-bold text-charcoal leading-[1.06] tracking-[-0.03em] mb-4"
//                 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)' }}
//               >
//                 {product.name}
//               </h1>
//               {/* Description */}
//               <p className="text-[15px] sm:text-[16px] text-charcoal-muted leading-relaxed font-light" style={{ fontFamily: 'var(--font-inter)' }}>
//                 {(product as any).fullDescription ?? product.description}
//               </p>
//             </div>

//             {/* ── TABS BAR ── */}
//             <div className="border-b border-[#EDE6DA]">
//               <div className="flex gap-0 overflow-x-auto scrollbar-none">
//                 {TABS.map(tab => {
//                   const sel = activeTab === tab.id
//                   return (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveTab(tab.id)}
//                       className="px-5 py-3 text-[11px] uppercase tracking-widest font-black transition-all border-b-2 -mb-px whitespace-nowrap"
//                       style={{
//                         fontFamily: 'var(--font-inter)',
//                         color: sel ? '#2D2D2D' : '#9B8E7E',
//                         borderColor: sel ? accent : 'transparent',
//                       }}
//                     >
//                       {tab.label}
//                     </button>
//                   )
//                 })}
//               </div>
//             </div>

//             {/* ── TAB CONTENT ── */}
//             <div className="min-h-[200px]">
//               <AnimatePresence mode="wait">

//                 {/* ── OVERVIEW ── */}
//                 {activeTab === 'overview' && (
//                   <motion.div key="overview" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }} className="space-y-5">
//                     {/* Category + Status info cards */}
//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                       <div className="bg-white rounded-2xl border border-[#EDE6DA] p-5">
//                         <p className="text-[9px] uppercase font-bold tracking-widest text-[#9B8E7E] mb-1" style={{ fontFamily: 'var(--font-inter)' }}>Category</p>
//                         <p className="font-bold text-charcoal" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>{product.category}</p>
//                       </div>
//                       <div className="bg-white rounded-2xl border border-[#EDE6DA] p-5">
//                         <p className="text-[9px] uppercase font-bold tracking-widest text-[#9B8E7E] mb-1" style={{ fontFamily: 'var(--font-inter)' }}>Availability</p>
//                         <p className="font-bold text-charcoal" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>{product.status ?? 'In Stock'}</p>
//                       </div>
//                       <div className="bg-white rounded-2xl border border-[#EDE6DA] p-5">
//                         <p className="text-[9px] uppercase font-bold tracking-widest text-[#9B8E7E] mb-1" style={{ fontFamily: 'var(--font-inter)' }}>Finish Type</p>
//                         <p className="font-bold text-charcoal" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>{techSpecs.finish ?? product.finish ?? 'Premium'}</p>
//                       </div>
//                     </div>

//                     {/* Applications list */}
//                     {product.applications && product.applications.length > 0 && (
//                       <div>
//                         <p className="text-[9px] uppercase font-bold tracking-widest text-[#9B8E7E] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Suitable For</p>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                           {product.applications.map((app: string, i: number) => (
//                             <div key={i} className="flex items-center gap-3 p-3.5 bg-white border border-[#EDE6DA] rounded-xl">
//                               <span className="w-2 h-2 rounded-full shrink-0" style={{ background: accent }} />
//                               <p className="text-[14px] text-charcoal font-medium" style={{ fontFamily: 'var(--font-inter)' }}>{app}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Feature chips preview */}
//                     {product.features && product.features.length > 0 && (
//                       <div>
//                         <p className="text-[9px] uppercase font-bold tracking-widest text-[#9B8E7E] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Highlights</p>
//                         <div className="flex flex-wrap gap-2">
//                           {product.features.slice(0, 6).map((f: string, i: number) => (
//                             <motion.span
//                               key={i}
//                               initial={{ opacity: 0, scale: 0.9 }}
//                               animate={{ opacity: 1, scale: 1 }}
//                               transition={{ delay: i * 0.05 }}
//                               className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full"
//                               style={{ background: `${accent}12`, color: accent, fontFamily: 'var(--font-inter)' }}
//                             >
//                               <CheckCircle className="w-3 h-3" /> {f}
//                             </motion.span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </motion.div>
//                 )}

//                 {/* ── KEY FEATURES ── */}
//                 {activeTab === 'features' && (
//                   <motion.div key="features" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                       {product.features?.map((f: string, i: number) => {
//                         const desc = FEATURE_DESCRIPTIONS[f] ?? `${f} helps improve coating performance, usability, and long-term surface reliability.`
//                         const icon = FEATURE_ICON_MAP[f] ?? DEFAULT_ICON
//                         return (
//                           <motion.div
//                             key={i}
//                             initial={{ opacity: 0, y: 8 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: i * 0.06, duration: 0.3 }}
//                             className="group flex flex-col gap-3 p-5 bg-white border border-[#EDE6DA] rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
//                           >
//                             {/* Icon circle */}
//                             <div className="flex items-center gap-3">
//                               <div
//                                 className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
//                                 style={{ background: `${accent}12`, color: accent }}
//                               >
//                                 {icon}
//                               </div>
//                               <p className="text-[15px] font-bold text-charcoal leading-tight" style={{ fontFamily: 'var(--font-inter)' }}>{f}</p>
//                             </div>
//                             <p className="text-[13.5px] text-charcoal-muted leading-[1.6]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}>{desc}</p>
//                             {/* Bottom accent line on hover */}
//                             <div className="h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full mt-auto" style={{ background: `${accent}40` }} />
//                           </motion.div>
//                         )
//                       })}
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* ── HOW TO APPLY ── */}
//                 {activeTab === 'howto' && (
//                   <motion.div key="howto" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }} className="space-y-3">
//                     {howToSteps.map(({ step, title, desc }, i) => {
//                       const isOpen = expandedStep === i
//                       return (
//                         <motion.div
//                           key={step}
//                           initial={{ opacity: 0, y: 8 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: i * 0.07 }}
//                           className="bg-white border border-[#EDE6DA] rounded-2xl overflow-hidden"
//                           style={{ borderLeft: `3px solid ${isOpen ? accent : '#EDE6DA'}` }}
//                         >
//                           <button
//                             onClick={() => setExpandedStep(isOpen ? null : i)}
//                             className="w-full flex items-center gap-4 px-5 py-4 text-left group"
//                           >
//                             {/* Step number bubble */}
//                             <div
//                               className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
//                               style={{ background: isOpen ? accent : `${accent}14`, color: isOpen ? '#fff' : accent }}
//                             >
//                               {STEP_ICONS[i] ?? <CheckCircle className="w-5 h-5" />}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>Step {step}</span>
//                               <p className="text-[14px] font-bold text-charcoal" style={{ fontFamily: 'var(--font-inter)' }}>{title}</p>
//                             </div>
//                             <ChevronDown
//                               className="w-4 h-4 text-charcoal-muted shrink-0 transition-transform duration-300"
//                               style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: isOpen ? accent : '#9B8E7E' }}
//                             />
//                           </button>
//                           <AnimatePresence>
//                             {isOpen && (
//                               <motion.div
//                                 initial={{ height: 0, opacity: 0 }}
//                                 animate={{ height: 'auto', opacity: 1 }}
//                                 exit={{ height: 0, opacity: 0 }}
//                                 transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
//                                 className="overflow-hidden"
//                               >
//                                 <div className="px-5 pb-5 pt-1">
//                                   <p className="text-[14px] text-charcoal-muted leading-relaxed" style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}>{desc}</p>
//                                 </div>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </motion.div>
//                       )
//                     })}
//                     {/* Pro tip */}
//                     <div className="flex items-start gap-3 p-4 rounded-2xl border" style={{ background: `${accent}06`, borderColor: `${accent}20` }}>
//                       <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
//                       <p className="text-[13px] text-charcoal-muted leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
//                         <span className="font-semibold text-charcoal">Pro Tip:</span> Always apply in ambient temperatures between 10°C–40°C and relative humidity below 85% for the best adhesion and finish quality.
//                       </p>
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* ── SPECIFICATIONS ── */}
//                 {activeTab === 'specs' && (
//                   <motion.div key="specs" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
//                     <div className="bg-white border border-[#EDE6DA] rounded-2xl overflow-hidden">
//                       {/* Section heading */}
//                       <div className="px-6 py-4 border-b border-[#EDE6DA]" style={{ background: `${accent}06` }}>
//                         <p className="text-[11px] uppercase font-black tracking-widest" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>Technical Data Sheet</p>
//                       </div>
//                       <div className="px-6 py-2">
//                         <SpecRow label="Product Name" value={product.name} accent={accent} />
//                         <SpecRow label="Category" value={product.category} accent={accent} />
//                         <SpecRow label="Finish" value={techSpecs.finish ?? product.finish} accent={accent} />
//                         <SpecRow label="Coverage" value={techSpecs.coverage} accent={accent} />
//                         <SpecRow label="Drying Time" value={techSpecs.dryingTime} accent={accent} />
//                         <SpecRow label="Re-coat Time" value={techSpecs.recoatTime} accent={accent} />
//                         <SpecRow label="Application" value={techSpecs.application} accent={accent} />
//                         <SpecRow label="Dilution" value={techSpecs.dilution} accent={accent} />
//                         <SpecRow label="Washability" value={techSpecs.washability} accent={accent} />
//                         <SpecRow label="VOC Level" value={techSpecs.voc} accent={accent} />
//                         <SpecRow label="Base" value={techSpecs.base} accent={accent} />
//                         <SpecRow label="Pack Sizes" value={packSizes.join(', ')} accent={accent} />
//                         <SpecRow label="Suitable For" value={product.applications?.join(', ')} accent={accent} />
//                         <SpecRow label="Status" value={product.status} accent={accent} />
//                       </div>
//                     </div>
//                     {/* Disclaimer */}
//                     <p className="text-[11px] text-[#B0A898] mt-4 leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
//                       * Coverage rates are approximate and may vary based on surface porosity, application method, and number of coats. For precise data, refer to the product Technical Data Sheet.
//                     </p>
//                   </motion.div>
//                 )}

//               </AnimatePresence>
//             </div>

//             {/* ── CTA Buttons ── */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#EDE6DA]">
//               <Link
//                 href="/assistance"
//                 className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-black text-white shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex-1"
//                 style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}CC 100%)`, fontFamily: 'var(--font-inter)', letterSpacing: '0.1em' }}
//               >
//                 <Phone className="w-3.5 h-3.5 animate-pulse" /> Get Expert Consultation
//               </Link>
//               <button
//                 onClick={() => router.push('/products')}
//                 className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border border-[#EDE6DA] text-charcoal rounded-xl text-xs uppercase tracking-widest font-black shadow-sm hover:bg-[#FDFBF7] hover:border-[#D5CBBC] active:scale-[0.98] transition-all"
//                 style={{ fontFamily: 'var(--font-inter)', letterSpacing: '0.1em' }}
//               >
//                 <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ──════════════════ FEATURE HIGHLIGHTS STRIP ══════════════════ */}
//       {product.features && product.features.length > 0 && (
//         <section className="border-t border-[#EDE6DA] py-16" style={{ background: BRAND.dark }}>
//           <div className="max-w-[1280px] mx-auto px-6">
//             <div className="text-center mb-10">
//               <p className="text-[10px] uppercase tracking-[0.25em] font-black mb-2" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>Performance Profile</p>
//               <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-cormorant)' }}>
//                 What Makes {product.name} Outstanding
//               </h2>
//             </div>
//             <motion.div
//               variants={stagger}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, margin: '-60px' }}
//               className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
//             >
//               {product.features.map((f: string, i: number) => {
//                 const icon = FEATURE_ICON_MAP[f] ?? DEFAULT_ICON
//                 return (
//                   <motion.div
//                     key={i}
//                     variants={scaleIn}
//                     whileHover={{ y: -4, scale: 1.02 }}
//                     className="p-5 rounded-2xl border cursor-default"
//                     style={{ background: `${accent}10`, borderColor: `${accent}20` }}
//                   >
//                     <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-300" style={{ background: `${accent}20`, color: accent }}>
//                       {icon}
//                     </div>
//                     <p className="text-[13px] font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-inter)' }}>{f}</p>
//                   </motion.div>
//                 )
//               })}
//             </motion.div>
//           </div>
//         </section>
//       )}

//       {/* ──════════════════ WHY CHOOSE SECTION ══════════════════ */}
//       <section className="py-16 bg-white">
//         <div className="max-w-[1280px] mx-auto px-6">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -24 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ type: 'spring', damping: 22 }}
//             >
//               <p className="text-[10px] uppercase tracking-[0.25em] font-black mb-3" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>Product Advantage</p>
//               <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-5 leading-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>
//                 Why Professionals Choose {product.name}
//               </h2>
//               <p className="text-[15px] text-charcoal-muted leading-relaxed mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
//                 {(product as any).fullDescription ?? product.description} Every batch is quality-checked and formulated to Colorsome's strict performance standards.
//               </p>
//               <div className="grid grid-cols-2 gap-4">
//                 {[
//                   { icon: <ThumbsUp className="w-5 h-5" />, label: 'Trusted Formula', val: '10+ Yrs' },
//                   { icon: <Star className="w-5 h-5" />, label: 'Premium Grade', val: 'A+ Class' },
//                   { icon: <BadgeCheck className="w-5 h-5" />, label: 'Quality Tested', val: '12-Stage QC' },
//                   { icon: <Eye className="w-5 h-5" />, label: 'Colour Verified', val: 'Lab Matched' },
//                 ].map(({ icon, label, val }) => (
//                   <div key={label} className="flex items-center gap-3 p-4 rounded-xl border border-[#EDE6DA] bg-[#FAF8F5]">
//                     <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accent}12`, color: accent }}>{icon}</div>
//                     <div>
//                       <p className="text-[9px] uppercase tracking-wider font-black text-[#9B8E7E]" style={{ fontFamily: 'var(--font-inter)' }}>{label}</p>
//                       <p className="text-[13px] font-bold text-charcoal" style={{ fontFamily: 'var(--font-inter)' }}>{val}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//             {/* Stats column */}
//             <motion.div
//               initial={{ opacity: 0, x: 24 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ type: 'spring', damping: 22, delay: 0.1 }}
//               className="grid grid-cols-2 gap-5"
//             >
//               {[
//                 { end: 98, suffix: '%', label: 'Customer Satisfaction' },
//                 { end: 130, suffix: '+', label: 'Sq.ft Coverage / Litre' },
//                 { end: 10, suffix: ' Yrs', label: 'Proven Performance Life' },
//                 { end: 100, suffix: '%', label: 'Eco-Friendly & Low VOC' },
//               ].map(({ end, suffix, label }) => (
//                 <div key={label} className="p-6 rounded-2xl border border-[#EDE6DA] bg-[#FAF8F5] text-center">
//                   <p className="font-bold text-4xl mb-1" style={{ fontFamily: 'var(--font-cormorant)', color: accent }}>
//                     <CountUp end={end} suffix={suffix} />
//                   </p>
//                   <p className="text-[11px] text-[#9B8E7E] uppercase tracking-wider font-semibold" style={{ fontFamily: 'var(--font-inter)' }}>{label}</p>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ──════════════════ RELATED PRODUCTS ══════════════════ */}
//       {related.length > 0 && (
//         <section className="border-t border-[#EDE6DA] py-20 bg-[#FAF8F5]">
//           <div className="max-w-[1280px] mx-auto px-6">
//             <div className="mb-10">
//               <p className="text-[10px] uppercase tracking-[0.25em] font-black mb-1" style={{ color: '#B8A48A', fontFamily: 'var(--font-inter)' }}>You May Also Like</p>
//               <h2 className="text-3xl font-bold text-charcoal tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>Related Formulations</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {related.map((p, i) => {
//                 const relAccent = ACCENTS[i % ACCENTS.length]
//                 return (
//                   <Link
//                     key={p.id}
//                     href={`/products/${p.slug}`}
//                     className="group block flex flex-col justify-between rounded-[1.8rem] bg-white border border-[#EDE6DA] overflow-hidden hover:shadow-[0_24px_50px_rgba(45,45,45,0.06)] hover:-translate-y-1 transition-all duration-500 h-full"
//                   >
//                     <div>
//                       <div className="h-1 w-full" style={{ background: relAccent }} />
//                       <div className="flex items-center justify-center p-6 relative overflow-hidden" style={{ height: 180 }}>
//                         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(circle, ${relAccent}0B 0%, transparent 70%)` }} />
//                         <Image src={p.image} alt={p.name} width={160} height={180} className="h-36 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500" />
//                       </div>
//                       <div className="p-6 pt-2">
//                         <h3 className="text-lg font-bold text-charcoal mb-1 leading-tight group-hover:transition-colors duration-200" style={{ fontFamily: 'var(--font-cormorant)', color: undefined }}>{p.name}</h3>
//                         <p className="text-xs leading-relaxed text-charcoal-muted line-clamp-2 font-light" style={{ fontFamily: 'var(--font-inter)' }}>{p.description}</p>
//                       </div>
//                     </div>
//                     <div className="p-6 pt-0">
//                       <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider" style={{ color: relAccent }}>
//                         View Details <ChevronRight className="w-3 h-3" />
//                       </span>
//                     </div>
//                   </Link>
//                 )
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       <Footer />
//     </div>
//   )
// }






// 'use client'
// import React, { useState, useEffect, useRef } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { motion, AnimatePresence, useInView } from 'framer-motion'
// import {
//   ArrowLeft, CheckCircle, Phone, ChevronRight, Menu, X,
//   Shield, Droplets, Layers, Zap, Leaf, Maximize2, Sun,
//   Paintbrush, Star, Clock, Award, FlaskConical, Ruler,
//   Sparkles, Package, ChevronDown, Eye, BadgeCheck,
//   ThumbsUp, Info, Beaker, Hammer
// } from 'lucide-react'
// import { products } from '../data'
// import { Footer } from '@/src/components/Footer';
// import { Header } from '@/src/components/Header';

// const ACCENTS = ['#E91E8C', '#2196F3', '#4CAF50', '#FF5722', '#FFC107']

// const BRAND = {
//   pink: '#E91E8C',
//   blue: '#2196F3',
//   green: '#4CAF50',
//   orange: '#FF5722',
//   yellow: '#FFC107',
//   dark: '#2D2D2D',
// }

// // ─── Motion Variants ──────────────────────────────────────────────
// const fadeUp = {
//   hidden: { opacity: 0, y: 24 },
//   show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 26, stiffness: 180 } },
// }
// const stagger = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
// }
// const scaleIn = {
//   hidden: { opacity: 0, scale: 0.93 },
//   show: { opacity: 1, scale: 1, transition: { type: 'spring' as const, damping: 22, stiffness: 200 } },
// }

// // ─── Feature → Icon map ───────────────────────────────────────────
// const FEATURE_ICON_MAP: Record<string, React.ReactNode> = {
//   'UV Resistant':           <Sun className="w-5 h-5" />,
//   'Weather Proof':          <Droplets className="w-5 h-5" />,
//   'Chemical Resistant':    <FlaskConical className="w-5 h-5" />,
//   'Long-lasting Durability': <Layers className="w-5 h-5" />,
//   'Anti-corrosion':        <Shield className="w-5 h-5" />,
//   'Self-healing Properties': <Zap className="w-5 h-5" />,
//   'Temperature Resistant': <Sun className="w-5 h-5" />,
//   'Flexible Application':  <Maximize2 className="w-5 h-5" />,
//   'Eco-friendly':          <Leaf className="w-5 h-5" />,
//   'Waterproof':            <Droplets className="w-5 h-5" />,
//   'Smooth Finish':         <Sparkles className="w-5 h-5" />,
//   'Excellent Adhesion':    <Shield className="w-5 h-5" />,
//   'Quick Drying':          <Zap className="w-5 h-5" />,
//   'Low VOC':               <Leaf className="w-5 h-5" />,
//   'Superior Adhesion':     <Shield className="w-5 h-5" />,
//   'High Gloss Finish':     <Sparkles className="w-5 h-5" />,
//   'Scratch Resistant':     <Shield className="w-5 h-5" />,
//   'Scrub Resistant':       <Award className="w-5 h-5" />,
//   'Stain Resistant':       <Droplets className="w-5 h-5" />,
//   'Color Retention':       <Sun className="w-5 h-5" />,
//   'Anti-fungal':           <Leaf className="w-5 h-5" />,
//   'Elastic Properties':    <Maximize2 className="w-5 h-5" />,
//   'Crack Bridging':        <Hammer className="w-5 h-5" />,
//   'Fade Resistance':       <Sun className="w-5 h-5" />,
//   'Breathable Coating':    <Leaf className="w-5 h-5" />,
//   'Mildew Resistance':     <Shield className="w-5 h-5" />,
// }
// const DEFAULT_ICON = <Layers className="w-5 h-5" />

// // ─── Feature Descriptions ─────────────────────────────────────────
// const FEATURE_DESCRIPTIONS: Record<string, string> = {
//   'UV Resistant': 'Blocks harsh sunlight exposure to preserve colour strength and surface life over years of outdoor exposure.',
//   'Weather Proof': 'Shields against rain, humidity, and seasonal shifts — keeping the coating intact through all conditions.',
//   'Chemical Resistant': 'Withstands contact with industrial chemicals and frequent cleaning agents without surface degradation.',
//   'Long-lasting Durability': 'Engineered for extended performance cycles so the finish remains dependable for years, not months.',
//   'Anti-corrosion': 'Forms a molecular barrier that actively resists rust initiation and metal surface deterioration.',
//   'Self-healing Properties': 'Micro-recovery technology that helps minor surface marks close over time for a consistently clean look.',
//   'Temperature Resistant': 'Retains its full coating integrity from sub-zero cold to peak summer heat without cracking or peeling.',
//   'Flexible Application': 'Compatible with brush, roller, and spray — adapting seamlessly to any job site requirement.',
//   'Eco-friendly': 'Formulated with a responsible approach — safer for applicators, occupants, and the surrounding environment.',
//   'Waterproof': 'Creates a hydrophobic surface layer that actively stops water penetration and protects the substrate below.',
//   'Smooth Finish': 'Levels uniformly across all surface types, resulting in a refined, even texture that elevates appearance.',
//   'Excellent Adhesion': 'Bonds with exceptional grip to the surface substrate for reliable, long-lasting topcoat performance.',
//   'Quick Drying': 'Touch-dry within 30 minutes. Re-coatable in 4–6 hours — significantly reducing project turnaround time.',
//   'Low VOC': 'Drastically reduced solvent emissions for improved indoor air quality during and after application.',
//   'Superior Adhesion': 'Multi-surface grip formula ensures the coating system holds firm across diverse surface conditions.',
//   'High Gloss Finish': 'Mirror-bright reflective surface that adds depth, premium visual richness, and easy-clean properties.',
//   'Scratch Resistant': 'Hard-set surface film resists minor abrasions during everyday use and routine cleaning.',
//   'Scrub Resistant': 'Engineered to endure repeated cleaning cycles without visible wear, fading, or surface breakdown.',
//   'Stain Resistant': 'Non-porous surface treatment makes spills and common stains easy to wipe away before they set.',
//   'Color Retention': 'Advanced pigment stabilisers keep the shade vibrant and true-to-swatch for extended periods.',
//   'Anti-fungal': 'Active biostatic agents that suppress fungal colonisation in high-moisture, poorly-ventilated spaces.',
//   'Elastic Properties': 'Flexible film structure absorbs surface micro-movement without cracking, ideal for masonry surfaces.',
//   'Crack Bridging': 'Film elasticity spans hairline fractures up to 0.3 mm — preventing water ingress through minor cracks.',
//   'Fade Resistance': 'UV-stable pigment matrix fights colour degradation so the surface retains its original tone longer.',
//   'Breathable Coating': 'Open micro-pore structure allows trapped moisture vapour to escape, preventing blistering and peel.',
//   'Mildew Resistance': 'Active mould-inhibitor system limits mildew growth in bathrooms, basements, and coastal environments.',
//   'Consistent Quality': 'Batch-to-batch stability ensures every tin delivers the same finish, colour, and application performance.',
//   'Time Saving': 'Fast surface coverage and reduced drying windows compress project timelines without compromising quality.',
//   'Reduced Waste': 'High coverage rate means less product per square metre — optimising material spend on every project.',
//   'Superior Bonding': 'Dual-component adhesion formula creates a near-permanent surface bond on challenging substrates.',
//   'High Coverage': 'Covers up to 130–180 sq ft per litre for consistent, gap-free surface coverage in fewer coats.',
//   'Enhanced Longevity': 'Coating lifespan significantly extended versus standard formulations — reducing maintenance frequency.',
//   'Moisture Resistance': 'Moisture-barrier chemistry locks out dampness while allowing the substrate to breathe naturally.',
//   'Dust Resistance': 'Anti-static surface treatment repels airborne dust particles — keeping walls cleaner between washes.',
//   'Easy Maintenance': 'Smooth, sealed surface requires only a damp cloth to restore its original clean, uniform appearance.',
//   'Premium Finish': 'Luxury-grade surface texture that imparts a refined, professionally applied look to every surface.',
//   'Fast Curing': 'Accelerated cross-linking chemistry reaches full hardness faster — minimising downtime on active sites.',
//   'Strong Coverage': 'Dense pigment load delivers opaque, uniform coverage even over darker existing shades.',
//   'Application Ease': 'Low-drag, flow-optimised viscosity for smoother spreading, fewer roller marks, and easier brush control.',
//   'Surface Protection': 'Multi-layer defensive chemistry guards against abrasion, UV, moisture, and chemical attack simultaneously.',
// }

// // ─── How-to step icon map ─────────────────────────────────────────
// const STEP_ICONS = [
//   <Hammer className="w-5 h-5" />,
//   <Paintbrush className="w-5 h-5" />,
//   <Layers className="w-5 h-5" />,
//   <CheckCircle className="w-5 h-5" />,
//   <Sparkles className="w-5 h-5" />,
//   <BadgeCheck className="w-5 h-5" />,
// ]

// // ─── Spec Row ─────────────────────────────────────────────────────
// function SpecRow({ label, value, accent }: { label: string; value?: string; accent: string }) {
//   if (!value) return null
//   return (
//     <div className="flex items-start gap-4 py-3 border-b border-[#EDE6DA] last:border-0">
//       <span
//         className="text-9px uppercase tracking-widest font-black w-28 shrink-0 pt-0.5"
//         style={{ color: '#9B8E7E', fontFamily: 'var(--font-inter)' }}
//       >
//         {label}
//       </span>
//       <span
//         className="text-sm font-semibold text-charcoal"
//         style={{ fontFamily: 'var(--font-inter)' }}
//       >
//         {value}
//       </span>
//     </div>
//   )
// }

// // ─── Animated number counter ──────────────────────────────────────
// function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
//   const [val, setVal] = useState(0)
//   const ref = useRef<HTMLSpanElement>(null)
//   const inView = useInView(ref, { once: true })
//   useEffect(() => {
//     if (!inView) return
//     let start = 0
//     const step = Math.ceil(end / 40)
//     const timer = setInterval(() => {
//       start += step
//       if (start >= end) { setVal(end); clearInterval(timer) }
//       else setVal(start)
//     }, 30)
//     return () => clearInterval(timer)
//   }, [inView, end])
//   return <span ref={ref}>{val}{suffix}</span>
// }

// // ─── Page interface ───────────────────────────────────────────────
// interface PageProps {
//   params: Promise<{ slug: string }>
// }

// export default function ProductDetailPage({ params }: PageProps) {
//   const resolvedParams = React.use(params)
//   const slug = resolvedParams?.slug
//   return <ProductDetailContainer slug={slug} />
// }

// // ─── Main container ───────────────────────────────────────────────
// function ProductDetailContainer({ slug }: { slug: string }) {
//   const router = useRouter()
//   // const product = products.find(p => p.slug.toLowerCase() === slug.toLowerCase())
//   // const productIndex = products.findIndex(p => p.slug.toLowerCase() === slug.toLowerCase())
//   const cleanStr = (str: string) => str?.toLowerCase().replace(/[^a-z0-9]/g, '-') || '';

// const product = products.find(p => cleanStr(p.slug) === cleanStr(slug));
// const productIndex = products.findIndex(p => cleanStr(p.slug) === cleanStr(slug));
//   const accent = ACCENTS[productIndex !== -1 ? productIndex % ACCENTS.length : 0]

//   type Tab = 'overview' | 'features' | 'howto' | 'specs'
//   const [activeTab, setActiveTab] = useState<Tab>('overview')
//   const [activePack, setActivePack] = useState(0)
//   const [expandedStep, setExpandedStep] = useState<number | null>(0)

//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [slug])

//   if (!product) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] pt-[120px]">
//         <Header />
//         <div className="text-center max-w-md bg-white border border-[#EDE7DC] p-10 rounded-2rem shadow-sm">
//           <Paintbrush className="w-10 h-10 text-gold mx-auto mb-4 animate-pulse" />
//           <h1 className="font-serif text-2xl font-bold text-charcoal mb-2" style={{ fontFamily: 'var(--font-cormorant)' }}>
//             Product Not Found
//           </h1>
//           <p className="text-xs text-charcoal-muted font-sans font-light mb-4 leading-relaxed">
//             The URL path <span className="text-red-500 font-mono bg-red-50 px-1.5 py-0.5 rounded border border-red-100">{slug}</span> could not be matched to any product.
//           </p>
//           <Link href="/products" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-charcoal hover:text-gold transition-colors">
//             <ArrowLeft className="w-4 h-4" /> Return to Catalog
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   const related = products.filter(p => p.category === product.category && p.slug !== slug).slice(0, 4)

//   // ─── Category-Specific Application Steps Fallbacks ─────────────────
//   const CATEGORY_HOW_TO_MAP: Record<string, { step: string; title: string; desc: string }[]> = {
//     'Waterproofing': [
//       { step: '01', title: 'Surface Cleaning & Repair', desc: 'Wash surface to remove moss, algae, and loose debris. Heavy cracks must be opened up, cleaned, and sealed with structural polyurethane sealant before coating.' },
//       { step: '02', title: 'Self-Priming / Smart Primer', desc: 'Apply a priming coat. For many advanced compounds, dilute the product itself with 30% clean water to act as a deep-penetrating primer coat. Let dry for 2–3 hours.' },
//       { step: '03', title: 'First Undiluted Coat', desc: 'Apply the first coat of the waterproofing compound without dilution using a heavy block brush or roller. Ensure even structural coverage across all joints and parapet wall bases.' },
//       { step: '04', title: 'Cross-Directional Second Coat', desc: 'Apply the second coat perpendicular (at a 90-degree angle) to the first coat after 4–6 hours. This cross-hatching layout guarantees zero micro-pinholes are left exposed.' }
//     ],
//     'Primers': [
//       { step: '01', title: 'Substrate Levelling & Sanding', desc: 'Ensure walls are clean and fully cured. Sand the surface with emery paper 180 to remove loose plaster particles and wipe off the structural dust clean.' },
//       { step: '02', title: 'Dilution and Consistency', desc: 'Dilute the primer base with clean water or specified solvent as per the technical sheet (typically 80–100% by volume for water-based primers). Stir thoroughly.' },
//       { step: '03', title: 'Application Layout', desc: 'Apply a single uniform coat using a professional paint brush or roller. Work from top to bottom, avoiding patches or excessive paint runs.' },
//       { step: '04', title: 'Sanding Post-Dry', desc: 'Allow it to air-dry for 4–6 hours. Lightly sand the primed surface with emery paper 320 to level micro-ridges before applying the finishing topcoat layers.' }
//     ],
//     'Oil Paints': [
//       { step: '01', title: 'Degreasing & Rust Removal', desc: 'For metal substrates, remove rust completely using wire brushes or sanding. For wood, sand smooth. Wipe down thoroughly with Mineral Turpentine Oil (MTO) to clean oils.' },
//       { step: '02', title: 'Undercoat Application', desc: 'Apply an oil-based primer line (Red Oxide for ferrous metals, Wood Primer for wood). Allow it to dry completely for 12–18 hours before proceeding.' },
//       { step: '03', title: 'Thinning & First Coat', desc: 'Thin the gloss enamel paint with 10–15% MTO. Apply a thin, uniform first coat. Avoid heavy pooling to ensure it does not sag or blister during cross-linking.' },
//       { step: '04', title: 'Overnight Cure & Recoat', desc: 'Allow 12–16 hours of overnight drying. Lightly scuff the surface to create a mechanical key, clean the dust, and apply the final high-gloss finishing coat.' }
//     ],
//     'Industrial Textiles': [
//       { step: '01', title: 'Base Preparation', desc: 'Ensure the engineering substrate is structurally sound, level, free of sharp protrusions, and cleared of standing water or mud deposits.' },
//       { step: '02', title: 'Unrolling & Alignment', desc: 'Roll out the technical textile fabric smoothly along the layout lines. Pull taut to remove wrinkles, ensuring correct mechanical alignment.' },
//       { step: '03', title: 'Overlap & Anchoring', desc: 'Maintain a minimum overlap of 300mm to 500mm at all layout joints. Secure the panels structurally using thermal welding, specialized adhesive tapes, or mechanical fasteners.' },
//       { step: '04', title: 'Immediate Backfilling', desc: 'Cover the textile membrane with the designated aggregate or soil layer within 48 hours to minimize long-term construction UV exposure damage.' }
//     ],
//     'Protective Coatings': [
//       { step: '01', title: 'Profile Sandblasting / Cleaning', desc: 'Clean substrates to pristine standards. For industrial metals, commercial sandblasting to near-white metal is recommended to create an ideal anchor profile.' },
//       { step: '02', title: 'Mixing Multi-Component Bases', desc: 'If dealing with a dual-pack epoxy or polyurethane system, mix base and hardener in the precise stated ratio. Respect the pot-life clock limit completely.' },
//       { step: '03', title: 'Airless Spray Setup', desc: 'Apply using heavy-duty airless spray equipment for a dense, void-free protective film shield. Monitor Wet Film Thickness (WFT) continuously during application.' },
//       { step: '04', title: 'Curing Environment', desc: 'Allow complete cross-linking. Avoid moisture impact or structural mechanical loading during the initial 7-day chemical curing window.' }
//     ]
//   };

//   const DEFAULT_PAINT_STEPS = [
//     { step: '01', title: 'Surface Preparation', desc: 'Clean the surface thoroughly. Remove dust, loose particles, grease, and any traces of algae. Fill hairline cracks with appropriate wall putty and let dry.' },
//     { step: '02', title: 'Apply Primer Base', desc: 'Apply one uniform coat of a suitable undercoat primer. Allow adequate drying time (typically 4–6 hours) before stepping up to the topcoat.' },
//     { step: '03', title: 'First Topcoat Application', desc: 'Dilute the premium paint layer as recommended (usually 10–15% water for emulsions). Apply an even first coat using a high-quality roller or brush tool.' },
//     { step: '04', title: 'Drying & Final Coat', desc: 'Allow the first coat to dry completely for 4 hours. Apply a second finishing coat perpendicular to the first coat for full opacity and optimal color richness.' }
//   ];

//   // Resolve the dynamic steps based on product configuration or category fallback
//   const howToSteps: { step: string; title: string; desc: string }[] =
//     (product as any).howToApply ?? 
//     CATEGORY_HOW_TO_MAP[product.category] ?? 
//     DEFAULT_PAINT_STEPS;

//   // Build pack sizes: use product's own array if present
//   const packSizes: string[] = (product as any).packSizes ?? product.packSizes ?? ['1 L', '4 L', '10 L', '20 L']

//   // Build technical specs object
//   const techSpecs = (product as any).technicalSpecs ?? {}

//   // Summary stats for the hero strip
//   const summaryStats = [
//     { label: 'Coverage', value: techSpecs.coverage ?? '130–150 sq.ft/L', icon: <Ruler className="w-4 h-4" /> },
//     { label: 'Finish', value: techSpecs.finish ?? product.finish ?? 'Premium', icon: <Sparkles className="w-4 h-4" /> },
//     { label: 'Dry Time', value: techSpecs.dryingTime ?? '30 min touch', icon: <Clock className="w-4 h-4" /> },
//     { label: 'Application', value: techSpecs.application ?? 'Brush / Roller / Spray', icon: <Paintbrush className="w-4 h-4" /> },
//   ]

//   const TABS: { id: Tab; label: string }[] = [
//     { id: 'overview', label: 'Overview' },
//     { id: 'features', label: 'Key Features' },
//     { id: 'howto', label: 'How to Apply' },
//     { id: 'specs', label: 'Specifications' },
//   ]

//   return (
//     <div className="bg-[#FAF8F5] min-h-screen selection:bg-[#F3E7C9] pt-[72px]">
//       {/* ── Ambient Grain ── */}
//       <div
//         className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
//           backgroundRepeat: 'repeat',
//           backgroundSize: '128px 128px',
//         }}
//       />
//       {/* ── Accent glow ── */}
//       <div
//         className="pointer-events-none fixed top-0 right-0 w-[520px] h-[520px] z-0"
//         style={{ background: `radial-gradient(circle at top right, ${accent}0A 0%, transparent 65%)` }}
//       />

//       <Header />

//       {/* ══════════════════ BREADCRUMB ══════════════════ */}
//       <div className="max-w-[1280px] mx-auto px-6 pt-6 pb-4 flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-[#8C8C8C]" style={{ fontFamily: 'var(--font-inter)' }}>
//         <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
//         <ChevronRight className="w-3 h-3 text-gray-300" />
//         <Link href="/products" className="hover:text-charcoal transition-colors">Products</Link>
//         <ChevronRight className="w-3 h-3 text-gray-300" />
//         <span className="text-charcoal font-black truncate">{product.name}</span>
//       </div>

//       {/* ══════════════════ HERO — PRODUCT STAGE ══════════════════ */}
//       <section className="max-w-[1280px] mx-auto px-6 pb-10">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

//           {/* ── LEFT: Image + Quick Specs ── */}
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//             className="lg:col-span-5 lg:sticky lg:top-[116px]"
//           >
//             {/* Image Card */}
//             <div className="rounded-[2.5rem] overflow-hidden bg-white border border-[#EDE6DA] shadow-[0_20px_50px_rgba(45,45,45,0.05)] p-8 relative group transition-shadow duration-500 hover:shadow-[0_32px_70px_rgba(45,45,45,0.10)]">
//               {/* Accent top bar */}
//               <div className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-500" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}CC)` }} />
//               {/* Category badge */}
//               <span className="absolute top-5 right-5 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-md text-white shadow-sm" style={{ background: accent, fontFamily: 'var(--font-inter)' }}>
//                 {product.category?.split(' ')[0] ?? 'Paint'}
//               </span>
//               {/* Hover rings */}
//               <div className="absolute w-64 h-64 rounded-full border opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ borderColor: `${accent}20`, borderWidth: '1px' }} />
//               <div className="absolute w-48 h-48 rounded-full border opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ borderColor: `${accent}12`, borderWidth: '1px' }} />
//               {/* Glow spot */}
//               <div className="absolute inset-0 rounded-[2.5rem] transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${accent}0A 0%, transparent 72%)` }} />
//               {/* Product image */}
//               <motion.div
//                 animate={{ y: [0, -8, 0] }}
//                 transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//                 whileHover={{ scale: 1.06, y: -12 }}
//                 className="relative flex items-center justify-center cursor-zoom-in"
//                 style={{ height: 380 }}
//               >
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   width={360}
//                   height={380}
//                   className="h-80 w-auto object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.13)] z-10 relative"
//                   priority
//                 />
//               </motion.div>
//             </div>

//             {/* ── Quick Stat Strip ── */}
//             <div className="mt-5 grid grid-cols-2 gap-3">
//               {summaryStats.map(({ label, value, icon }) => (
//                 <div
//                   key={label}
//                   className="bg-white border border-[#EDE6DA] rounded-2xl p-4 text-center group hover:shadow-md transition-all duration-200 hover:border-current cursor-default"
//                   style={{ '--tw-border-opacity': '1' } as React.CSSProperties}
//                 >
//                   <div className="flex items-center justify-center gap-1.5 mb-1.5" style={{ color: accent }}>
//                     {icon}
//                   </div>
//                   <p className="text-[9px] uppercase tracking-widest font-bold text-[#9B8E7E] mb-0.5" style={{ fontFamily: 'var(--font-inter)' }}>{label}</p>
//                   <p className="text-sm font-semibold text-charcoal leading-tight" style={{ fontFamily: 'var(--font-inter)' }}>{value}</p>
//                 </div>
//               ))}
//             </div>

//             {/* ── Pack Size Selector ── */}
//             {packSizes.length > 0 && (
//               <div className="mt-5 bg-white border border-[#EDE6DA] rounded-2xl p-5">
//                 <p className="text-[9px] uppercase tracking-widest font-black text-[#9B8E7E] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Available Pack Sizes</p>
//                 <div className="flex flex-wrap gap-2">
//                   {packSizes.map((size, i) => (
//                     <button
//                       key={size}
//                       onClick={() => setActivePack(i)}
//                       className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-200"
//                       style={{
//                         fontFamily: 'var(--font-inter)',
//                         background: activePack === i ? accent : 'transparent',
//                         color: activePack === i ? '#fff' : '#2D2D2D',
//                         border: activePack === i ? `1.5px solid ${accent}` : '1.5px solid #EDE6DA',
//                         boxShadow: activePack === i ? `0 4px 14px ${accent}30` : 'none',
//                       }}
//                     >
//                       <Package className="w-3 h-3 inline mr-1 opacity-70" />
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </motion.div>

//           {/* ── RIGHT: Text + Tabs ── */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
//             className="lg:col-span-7 space-y-8"
//           >
//             {/* Category + Status pill */}
//             <div>
//               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-4" style={{ background: `${accent}12` }}>
//                 <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
//                 <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>
//                   {product.status} &nbsp;·&nbsp; {product.id.toString().padStart(2, '0')}
//                 </span>
//               </div>
//               {/* Product name */}
//               <h1
//                 className="text-4xl md:text-5xl font-bold text-charcoal leading-[1.06] tracking-[-0.03em] mb-4"
//                 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)' }}
//               >
//                 {product.name}
//               </h1>
//               {/* Description */}
//               <p className="text-[15px] sm:text-[16px] text-charcoal-muted leading-relaxed font-light" style={{ fontFamily: 'var(--font-inter)' }}>
//                 {(product as any).fullDescription ?? product.description}
//               </p>
//             </div>

//             {/* ── TABS BAR ── */}
//             <div className="border-b border-[#EDE6DA]">
//               <div className="flex gap-0 overflow-x-auto scrollbar-none">
//                 {TABS.map(tab => {
//                   const sel = activeTab === tab.id
//                   return (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveTab(tab.id)}
//                       className="px-5 py-3 text-[11px] uppercase tracking-widest font-black transition-all border-b-2 -mb-px whitespace-nowrap"
//                       style={{
//                         fontFamily: 'var(--font-inter)',
//                         color: sel ? '#2D2D2D' : '#9B8E7E',
//                         borderColor: sel ? accent : 'transparent',
//                       }}
//                     >
//                       {tab.label}
//                     </button>
//                   )
//                 })}
//               </div>
//             </div>

//             {/* ── TAB CONTENT ── */}
//             <div className="min-h-[200px]">
//               <AnimatePresence mode="wait">

//                 {/* ── OVERVIEW ── */}
//                 {activeTab === 'overview' && (
//                   <motion.div key="overview" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }} className="space-y-5">
//                     {/* Category + Status info cards */}
//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                       <div className="bg-white rounded-2xl border border-[#EDE6DA] p-5">
//                         <p className="text-[9px] uppercase font-bold tracking-widest text-[#9B8E7E] mb-1" style={{ fontFamily: 'var(--font-inter)' }}>Category</p>
//                         <p className="font-bold text-charcoal" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>{product.category}</p>
//                       </div>
//                       <div className="bg-white rounded-2xl border border-[#EDE6DA] p-5">
//                         <p className="text-[9px] uppercase font-bold tracking-widest text-[#9B8E7E] mb-1" style={{ fontFamily: 'var(--font-inter)' }}>Availability</p>
//                         <p className="font-bold text-charcoal" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>{product.status ?? 'In Stock'}</p>
//                       </div>
//                       <div className="bg-white rounded-2xl border border-[#EDE6DA] p-5">
//                         <p className="text-[9px] uppercase font-bold tracking-widest text-[#9B8E7E] mb-1" style={{ fontFamily: 'var(--font-inter)' }}>Finish Type</p>
//                         <p className="font-bold text-charcoal" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>{techSpecs.finish ?? product.finish ?? 'Premium'}</p>
//                       </div>
//                     </div>

//                     {/* Applications list */}
//                     {product.applications && product.applications.length > 0 && (
//                       <div>
//                         <p className="text-[9px] uppercase font-bold tracking-widest text-[#9B8E7E] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Suitable For</p>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                           {product.applications.map((app: string, i: number) => (
//                             <div key={i} className="flex items-center gap-3 p-3.5 bg-white border border-[#EDE6DA] rounded-xl">
//                               <span className="w-2 h-2 rounded-full shrink-0" style={{ background: accent }} />
//                               <p className="text-[14px] text-charcoal font-medium" style={{ fontFamily: 'var(--font-inter)' }}>{app}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Feature chips preview */}
//                     {product.features && product.features.length > 0 && (
//                       <div>
//                         <p className="text-[9px] uppercase font-bold tracking-widest text-[#9B8E7E] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Highlights</p>
//                         <div className="flex flex-wrap gap-2">
//                           {product.features.slice(0, 6).map((f: string, i: number) => (
//                             <motion.span
//                               key={i}
//                               initial={{ opacity: 0, scale: 0.9 }}
//                               animate={{ opacity: 1, scale: 1 }}
//                               transition={{ delay: i * 0.05 }}
//                               className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full"
//                               style={{ background: `${accent}12`, color: accent, fontFamily: 'var(--font-inter)' }}
//                             >
//                               <CheckCircle className="w-3 h-3" /> {f}
//                             </motion.span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </motion.div>
//                 )}

//                 {/* ── KEY FEATURES ── */}
//                 {activeTab === 'features' && (
//                   <motion.div key="features" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                       {product.features?.map((f: string, i: number) => {
//                         const desc = FEATURE_DESCRIPTIONS[f] ?? `${f} helps improve coating performance, usability, and long-term surface reliability.`
//                         const icon = FEATURE_ICON_MAP[f] ?? DEFAULT_ICON
//                         return (
//                           <motion.div
//                             key={i}
//                             initial={{ opacity: 0, y: 8 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: i * 0.06, duration: 0.3 }}
//                             className="group flex flex-col gap-3 p-5 bg-white border border-[#EDE6DA] rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
//                           >
//                             {/* Icon circle */}
//                             <div className="flex items-center gap-3">
//                               <div
//                                 className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
//                                 style={{ background: `${accent}12`, color: accent }}
//                               >
//                                 {icon}
//                               </div>
//                               <p className="text-[15px] font-bold text-charcoal leading-tight" style={{ fontFamily: 'var(--font-inter)' }}>{f}</p>
//                             </div>
//                             <p className="text-[13.5px] text-charcoal-muted leading-[1.6]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}>{desc}</p>
//                             {/* Bottom accent line on hover */}
//                             <div className="h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full mt-auto" style={{ background: `${accent}40` }} />
//                           </motion.div>
//                         )
//                       })}
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* ── HOW TO APPLY ── */}
//                 {activeTab === 'howto' && (
//                   <motion.div key="howto" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }} className="space-y-3">
//                     {howToSteps.map(({ step, title, desc }, i) => {
//                       const isOpen = expandedStep === i
//                       return (
//                         <motion.div
//                           key={step}
//                           initial={{ opacity: 0, y: 8 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: i * 0.07 }}
//                           className="bg-white border border-[#EDE6DA] rounded-2xl overflow-hidden"
//                           style={{ borderLeft: `3px solid ${isOpen ? accent : '#EDE6DA'}` }}
//                         >
//                           <button
//                             onClick={() => setExpandedStep(isOpen ? null : i)}
//                             className="w-full flex items-center gap-4 px-5 py-4 text-left group"
//                           >
//                             {/* Step number bubble */}
//                             <div
//                               className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
//                               style={{ background: isOpen ? accent : `${accent}14`, color: isOpen ? '#fff' : accent }}
//                             >
//                               {STEP_ICONS[i] ?? <CheckCircle className="w-5 h-5" />}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>Step {step}</span>
//                               <p className="text-[14px] font-bold text-charcoal" style={{ fontFamily: 'var(--font-inter)' }}>{title}</p>
//                             </div>
//                             <ChevronDown
//                               className="w-4 h-4 text-charcoal-muted shrink-0 transition-transform duration-300"
//                               style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: isOpen ? accent : '#9B8E7E' }}
//                             />
//                           </button>
//                           <AnimatePresence>
//                             {isOpen && (
//                               <motion.div
//                                 initial={{ height: 0, opacity: 0 }}
//                                 animate={{ height: 'auto', opacity: 1 }}
//                                 exit={{ height: 0, opacity: 0 }}
//                                 transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
//                                 className="overflow-hidden"
//                               >
//                                 <div className="px-5 pb-5 pt-1">
//                                   <p className="text-[14px] text-charcoal-muted leading-relaxed" style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}>{desc}</p>
//                                 </div>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </motion.div>
//                       )
//                     })}
//                     {/* Pro tip */}
//                     <div className="flex items-start gap-3 p-4 rounded-2xl border" style={{ background: `${accent}06`, borderColor: `${accent}20` }}>
//                       <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
//                       <p className="text-[13px] text-charcoal-muted leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
//                         <span className="font-semibold text-charcoal">Pro Tip:</span> Always apply in ambient temperatures between 10°C–40°C and relative humidity below 85% for the best adhesion and finish quality.
//                       </p>
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* ── SPECIFICATIONS ── */}
//                 {activeTab === 'specs' && (
//                   <motion.div key="specs" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
//                     <div className="bg-white border border-[#EDE6DA] rounded-2xl overflow-hidden">
//                       {/* Section heading */}
//                       <div className="px-6 py-4 border-b border-[#EDE6DA]" style={{ background: `${accent}06` }}>
//                         <p className="text-[11px] uppercase font-black tracking-widest" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>Technical Data Sheet</p>
//                       </div>
//                       <div className="px-6 py-2">
//                         <SpecRow label="Product Name" value={product.name} accent={accent} />
//                         <SpecRow label="Category" value={product.category} accent={accent} />
//                         <SpecRow label="Finish" value={techSpecs.finish ?? product.finish} accent={accent} />
//                         <SpecRow label="Coverage" value={techSpecs.coverage} accent={accent} />
//                         <SpecRow label="Drying Time" value={techSpecs.dryingTime} accent={accent} />
//                         <SpecRow label="Re-coat Time" value={techSpecs.recoatTime} accent={accent} />
//                         <SpecRow label="Application" value={techSpecs.application} accent={accent} />
//                         <SpecRow label="Dilution" value={techSpecs.dilution} accent={accent} />
//                         <SpecRow label="Washability" value={techSpecs.washability} accent={accent} />
//                         <SpecRow label="VOC Level" value={techSpecs.voc} accent={accent} />
//                         <SpecRow label="Base" value={techSpecs.base} accent={accent} />
//                         <SpecRow label="Pack Sizes" value={packSizes.join(', ')} accent={accent} />
//                         <SpecRow label="Suitable For" value={product.applications?.join(', ')} accent={accent} />
//                         <SpecRow label="Status" value={product.status} accent={accent} />
//                       </div>
//                     </div>
//                     {/* Disclaimer */}
//                     <p className="text-[11px] text-[#B0A898] mt-4 leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
//                       * Coverage rates are approximate and may vary based on surface porosity, application method, and number of coats. For precise data, refer to the product Technical Data Sheet.
//                     </p>
//                   </motion.div>
//                 )}

//               </AnimatePresence>
//             </div>

//             {/* ── CTA Buttons ── */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#EDE6DA]">
//               <Link
//                 href="/assistance"
//                 className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-black text-white shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex-1"
//                 style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}CC 100%)`, fontFamily: 'var(--font-inter)', letterSpacing: '0.1em' }}
//               >
//                 <Phone className="w-3.5 h-3.5 animate-pulse" /> Get Expert Consultation
//               </Link>
//               <button
//                 onClick={() => router.push('/products')}
//                 className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border border-[#EDE6DA] text-charcoal rounded-xl text-xs uppercase tracking-widest font-black shadow-sm hover:bg-[#FDFBF7] hover:border-[#D5CBBC] active:scale-[0.98] transition-all"
//                 style={{ fontFamily: 'var(--font-inter)', letterSpacing: '0.1em' }}
//               >
//                 <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ──════════════════ FEATURE HIGHLIGHTS STRIP ══════════════════ */}
//       {product.features && product.features.length > 0 && (
//         <section className="border-t border-[#EDE6DA] py-16" style={{ background: BRAND.dark }}>
//           <div className="max-w-[1280px] mx-auto px-6">
//             <div className="text-center mb-10">
//               <p className="text-[10px] uppercase tracking-[0.25em] font-black mb-2" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>Performance Profile</p>
//               <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-cormorant)' }}>
//                 What Makes {product.name} Outstanding
//               </h2>
//             </div>
//             <motion.div
//               variants={stagger}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, margin: '-60px' }}
//               className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
//             >
//               {product.features.map((f: string, i: number) => {
//                 const icon = FEATURE_ICON_MAP[f] ?? DEFAULT_ICON
//                 return (
//                   <motion.div
//                     key={i}
//                     variants={scaleIn}
//                     whileHover={{ y: -4, scale: 1.02 }}
//                     className="p-5 rounded-2xl border cursor-default"
//                     style={{ background: `${accent}10`, borderColor: `${accent}20` }}
//                   >
//                     <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-300" style={{ background: `${accent}20`, color: accent }}>
//                       {icon}
//                     </div>
//                     <p className="text-[13px] font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-inter)' }}>{f}</p>
//                   </motion.div>
//                 )
//               })}
//             </motion.div>
//           </div>
//         </section>
//       )}

//       {/* ──════════════════ WHY CHOOSE SECTION ══════════════════ */}
//       <section className="py-16 bg-white">
//         <div className="max-w-[1280px] mx-auto px-6">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -24 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ type: 'spring', damping: 22 }}
//             >
//               <p className="text-[10px] uppercase tracking-[0.25em] font-black mb-3" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>Product Advantage</p>
//               <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-5 leading-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>
//                 Why Professionals Choose {product.name}
//               </h2>
//               <p className="text-[15px] text-charcoal-muted leading-relaxed mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
//                 {(product as any).fullDescription ?? product.description} Every batch is quality-checked and formulated to Colorsome's strict performance standards.
//               </p>
//               <div className="grid grid-cols-2 gap-4">
//                 {[
//                   { icon: <ThumbsUp className="w-5 h-5" />, label: 'Trusted Formula', val: '10+ Yrs' },
//                   { icon: <Star className="w-5 h-5" />, label: 'Premium Grade', val: 'A+ Class' },
//                   { icon: <BadgeCheck className="w-5 h-5" />, label: 'Quality Tested', val: '12-Stage QC' },
//                   { icon: <Eye className="w-5 h-5" />, label: 'Colour Verified', val: 'Lab Matched' },
//                 ].map(({ icon, label, val }) => (
//                   <div key={label} className="flex items-center gap-3 p-4 rounded-xl border border-[#EDE6DA] bg-[#FAF8F5]">
//                     <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accent}12`, color: accent }}>{icon}</div>
//                     <div>
//                       <p className="text-[9px] uppercase tracking-wider font-black text-[#9B8E7E]" style={{ fontFamily: 'var(--font-inter)' }}>{label}</p>
//                       <p className="text-[13px] font-bold text-charcoal" style={{ fontFamily: 'var(--font-inter)' }}>{val}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//             {/* Stats column */}
//             <motion.div
//               initial={{ opacity: 0, x: 24 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ type: 'spring', damping: 22, delay: 0.1 }}
//               className="grid grid-cols-2 gap-5"
//             >
//               {[
//                 { end: 98, suffix: '%', label: 'Customer Satisfaction' },
//                 { end: 130, suffix: '+', label: 'Sq.ft Coverage / Litre' },
//                 { end: 10, suffix: ' Yrs', label: 'Proven Performance Life' },
//                 { end: 100, suffix: '%', label: 'Eco-Friendly & Low VOC' },
//               ].map(({ end, suffix, label }) => (
//                 <div key={label} className="p-6 rounded-2xl border border-[#EDE6DA] bg-[#FAF8F5] text-center">
//                   <p className="font-bold text-4xl mb-1" style={{ fontFamily: 'var(--font-cormorant)', color: accent }}>
//                     <CountUp end={end} suffix={suffix} />
//                   </p>
//                   <p className="text-[11px] text-[#9B8E7E] uppercase tracking-wider font-semibold" style={{ fontFamily: 'var(--font-inter)' }}>{label}</p>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ──════════════════ RELATED PRODUCTS ══════════════════ */}
//       {related.length > 0 && (
//         <section className="border-t border-[#EDE6DA] py-20 bg-[#FAF8F5]">
//           <div className="max-w-[1280px] mx-auto px-6">
//             <div className="mb-10">
//               <p className="text-[10px] uppercase tracking-[0.25em] font-black mb-1" style={{ color: '#B8A48A', fontFamily: 'var(--font-inter)' }}>You May Also Like</p>
//               <h2 className="text-3xl font-bold text-charcoal tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>Related Formulations</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {related.map((p, i) => {
//                 const relAccent = ACCENTS[i % ACCENTS.length]
//                 return (
//                   <Link
//                     key={p.id}
//                     href={`/products/${p.slug}`}
//                     className="group block flex flex-col justify-between rounded-[1.8rem] bg-white border border-[#EDE6DA] overflow-hidden hover:shadow-[0_24px_50px_rgba(45,45,45,0.06)] hover:-translate-y-1 transition-all duration-500 h-full"
//                   >
//                     <div>
//                       <div className="h-1 w-full" style={{ background: relAccent }} />
//                       <div className="flex items-center justify-center p-6 relative overflow-hidden" style={{ height: 180 }}>
//                         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(circle, ${relAccent}0B 0%, transparent 70%)` }} />
//                         <Image src={p.image} alt={p.name} width={160} height={180} className="h-36 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500" />
//                       </div>
//                       <div className="p-6 pt-2">
//                         <h3 className="text-lg font-bold text-charcoal mb-1 leading-tight group-hover:transition-colors duration-200" style={{ fontFamily: 'var(--font-cormorant)', color: undefined }}>{p.name}</h3>
//                         <p className="text-xs leading-relaxed text-charcoal-muted line-clamp-2 font-light" style={{ fontFamily: 'var(--font-inter)' }}>{p.description}</p>
//                       </div>
//                     </div>
//                     <div className="p-6 pt-0">
//                       <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider" style={{ color: relAccent }}>
//                         View Details <ChevronRight className="w-3 h-3" />
//                       </span>
//                     </div>
//                   </Link>
//                 )
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       <Footer />
//     </div>
//   )
// }













'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  ArrowLeft, CheckCircle, Phone, ChevronRight, Menu, X,
  Shield, Droplets, Layers, Zap, Leaf, Maximize2, Sun,
  Paintbrush, Star, Clock, Award, FlaskConical, Ruler,
  Sparkles, Package, ChevronDown, Eye, BadgeCheck,
  ThumbsUp, Info, Beaker, Hammer, HelpCircle,
  Home as HomeIcon, Palette, Mail
} from 'lucide-react'
import { products } from '../data'
import { getCategoryFaq } from '../faqTemplates'
import { Footer } from '@/src/components/Footer';

// Restrained luxury palette — see src/lib/palette.ts for the shared source.
const ACCENTS = ['#C9A858', '#C4704B', '#8B9E7E', '#2C3E50', '#8C6478']

const BRAND = {
  pink: '#8C6478', // plum
  blue: '#2C3E50', // navy
  green: '#8B9E7E', // sage
  orange: '#C4704B', // terracotta
  yellow: '#C9A858', // gold
  dark: '#1C1712', // warm espresso near-black, not flat gray-black
}

// ─── Motion Variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 26, stiffness: 180 } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring' as const, damping: 22, stiffness: 200 } },
}

// ─── Feature → Icon map ───────────────────────────────────────────
const FEATURE_ICON_MAP: Record<string, React.ReactNode> = {
  'UV Resistant':           <Sun className="w-5 h-5" />,
  'Weather Proof':          <Droplets className="w-5 h-5" />,
  'Chemical Resistant':    <FlaskConical className="w-5 h-5" />,
  'Long-lasting Durability': <Layers className="w-5 h-5" />,
  'Anti-corrosion':        <Shield className="w-5 h-5" />,
  'Self-healing Properties': <Zap className="w-5 h-5" />,
  'Temperature Resistant': <Sun className="w-5 h-5" />,
  'Flexible Application':  <Maximize2 className="w-5 h-5" />,
  'Eco-friendly':          <Leaf className="w-5 h-5" />,
  'Waterproof':            <Droplets className="w-5 h-5" />,
  'Smooth Finish':         <Sparkles className="w-5 h-5" />,
  'Excellent Adhesion':    <Shield className="w-5 h-5" />,
  'Quick Drying':          <Zap className="w-5 h-5" />,
  'Low VOC':               <Leaf className="w-5 h-5" />,
  'Superior Adhesion':     <Shield className="w-5 h-5" />,
  'High Gloss Finish':     <Sparkles className="w-5 h-5" />,
  'Scratch Resistant':     <Shield className="w-5 h-5" />,
  'Scrub Resistant':       <Award className="w-5 h-5" />,
  'Stain Resistant':       <Droplets className="w-5 h-5" />,
  'Color Retention':       <Sun className="w-5 h-5" />,
  'Anti-fungal':           <Leaf className="w-5 h-5" />,
  'Elastic Properties':    <Maximize2 className="w-5 h-5" />,
  'Crack Bridging':        <Hammer className="w-5 h-5" />,
  'Fade Resistance':       <Sun className="w-5 h-5" />,
  'Breathable Coating':    <Leaf className="w-5 h-5" />,
  'Mildew Resistance':     <Shield className="w-5 h-5" />,
}
const DEFAULT_ICON = <Layers className="w-5 h-5" />

// ─── Feature Descriptions ─────────────────────────────────────────
const FEATURE_DESCRIPTIONS: Record<string, string> = {
  'UV Resistant': 'Blocks harsh sunlight exposure to preserve colour strength and surface life over years of outdoor exposure.',
  'Weather Proof': 'Shields against rain, humidity, and seasonal shifts — keeping the coating intact through all conditions.',
  'Chemical Resistant': 'Withstands contact with industrial chemicals and frequent cleaning agents without surface degradation.',
  'Long-lasting Durability': 'Engineered for extended performance cycles so the finish remains dependable for years, not months.',
  'Anti-corrosion': 'Forms a molecular barrier that actively resists rust initiation and metal surface deterioration.',
  'Self-healing Properties': 'Micro-recovery technology that helps minor surface marks close over time for a consistently clean look.',
  'Temperature Resistant': 'Retains its full coating integrity from sub-zero cold to peak summer heat without cracking or peeling.',
  'Flexible Application': 'Compatible with brush, roller, and spray — adapting seamlessly to any job site requirement.',
  'Eco-friendly': 'Formulated with a responsible approach — safer for applicators, occupants, and the surrounding environment.',
  'Waterproof': 'Creates a hydrophobic surface layer that actively stops water penetration and protects the substrate below.',
  'Smooth Finish': 'Levels uniformly across all surface types, resulting in a refined, even texture that elevates appearance.',
  'Excellent Adhesion': 'Bonds with exceptional grip to the surface substrate for reliable, long-lasting topcoat performance.',
  'Quick Drying': 'Touch-dry within 30 minutes. Re-coatable in 4–6 hours — significantly reducing project turnaround time.',
  'Low VOC': 'Drastically reduced solvent emissions for improved indoor air quality during and after application.',
  'Superior Adhesion': 'Multi-surface grip formula ensures the coating system holds firm across diverse surface conditions.',
  'High Gloss Finish': 'Mirror-bright reflective surface that adds depth, premium visual richness, and easy-clean properties.',
  'Scratch Resistant': 'Hard-set surface film resists minor abrasions during everyday use and routine cleaning.',
  'Scrub Resistant': 'Engineered to endure repeated cleaning cycles without visible wear, fading, or surface breakdown.',
  'Stain Resistant': 'Non-porous surface treatment makes spills and common stains easy to wipe away before they set.',
  'Color Retention': 'Advanced pigment stabilisers keep the shade vibrant and true-to-swatch for extended periods.',
  'Anti-fungal': 'Active biostatic agents that suppress fungal colonisation in high-moisture, poorly-ventilated spaces.',
  'Elastic Properties': 'Flexible film structure absorbs surface micro-movement without cracking, ideal for masonry surfaces.',
  'Crack Bridging': 'Film elasticity spans hairline fractures up to 0.3 mm — preventing water ingress through minor cracks.',
  'Fade Resistance': 'UV-stable pigment matrix fights colour degradation so the surface retains its original tone longer.',
  'Breathable Coating': 'Open micro-pore structure allows trapped moisture vapour to escape, preventing blistering and peel.',
  'Mildew Resistance': 'Active mould-inhibitor system limits mildew growth in bathrooms, basements, and coastal environments.',
  'Consistent Quality': 'Batch-to-batch stability ensures every tin delivers the same finish, colour, and application performance.',
  'Time Saving': 'Fast surface coverage and reduced drying windows compress project timelines without compromising quality.',
  'Reduced Waste': 'High coverage rate means less product per square metre — optimising material spend on every project.',
  'Superior Bonding': 'Dual-component adhesion formula creates a near-permanent surface bond on challenging substrates.',
  'High Coverage': 'Covers up to 130–180 sq ft per litre for consistent, gap-free surface coverage in fewer coats.',
  'Enhanced Longevity': 'Coating lifespan significantly extended versus standard formulations — reducing maintenance frequency.',
  'Moisture Resistance': 'Moisture-barrier chemistry locks out dampness while allowing the substrate to breathe naturally.',
  'Dust Resistance': 'Anti-static surface treatment repels airborne dust particles — keeping walls cleaner between washes.',
  'Easy Maintenance': 'Smooth, sealed surface requires only a damp cloth to restore its original clean, uniform appearance.',
  'Premium Finish': 'Luxury-grade surface texture that imparts a refined, professionally applied look to every surface.',
  'Fast Curing': 'Accelerated cross-linking chemistry reaches full hardness faster — minimising downtime on active sites.',
  'Strong Coverage': 'Dense pigment load delivers opaque, uniform coverage even over darker existing shades.',
  'Application Ease': 'Low-drag, flow-optimised viscosity for smoother spreading, fewer roller marks, and easier brush control.',
  'Surface Protection': 'Multi-layer defensive chemistry guards against abrasion, UV, moisture, and chemical attack simultaneously.',
}

// ─── How-to step icon map ─────────────────────────────────────────
const STEP_ICONS = [
  <Hammer className="w-5 h-5" />,
  <Paintbrush className="w-5 h-5" />,
  <Layers className="w-5 h-5" />,
  <CheckCircle className="w-5 h-5" />,
  <Sparkles className="w-5 h-5" />,
  <BadgeCheck className="w-5 h-5" />,
]

// ─── Spec Row ─────────────────────────────────────────────────────
function SpecRow({ label, value }: { label: string; value?: string; accent?: string }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-4 py-3 border-b border-[#EDE6DA] last:border-0">
      <span
        className="text-9px uppercase tracking-widest font-black w-36 shrink-0 pt-0.5 whitespace-nowrap"
        style={{ color: '#9B8E7E', fontFamily: 'var(--font-inter)' }}
      >
        {label}
      </span>
      <span
        className="text-sm font-semibold text-charcoal"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {value}
      </span>
    </div>
  )
}

// ─── Animated number counter ──────────────────────────────────────
function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(end / 40)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setVal(end); clearInterval(timer) }
      else setVal(start)
    }, 30)
    return () => clearInterval(timer)
  }, [inView, end])
  return <span ref={ref}>{val}{suffix}</span>
}

// ─── Page interface ───────────────────────────────────────────────
interface PageProps {
  params: Promise<{ slug: string }>
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = React.use(params)
  const slug = resolvedParams?.slug
  return <ProductDetailContainer slug={slug} />
}

// ─── Main container ───────────────────────────────────────────────
function ProductDetailContainer({ slug }: { slug: string }) {
  const router = useRouter()
  // const product = products.find(p => p.slug.toLowerCase() === slug.toLowerCase())
  // const productIndex = products.findIndex(p => p.slug.toLowerCase() === slug.toLowerCase())
  const cleanStr = (str: string) => str?.toLowerCase().replace(/[^a-z0-9]/g, '-') || '';

const product = products.find(p => cleanStr(p.slug) === cleanStr(slug));
const productIndex = products.findIndex(p => cleanStr(p.slug) === cleanStr(slug));
  const accent = ACCENTS[productIndex !== -1 ? productIndex % ACCENTS.length : 0]

  type Tab = 'overview' | 'features' | 'howto' | 'specs'
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activePack, setActivePack] = useState(0)
  const [expandedStep, setExpandedStep] = useState<number | null>(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    // The browser's native scroll restoration (default: 'auto') re-applies the
    // scroll position from a previous visit/reload of this same URL, and it can
    // fire after this effect — which made a refreshed or revisited product page
    // appear to "open mid-page" instead of at the top. Forcing 'manual' stops
    // the browser from fighting the explicit scrollTo below.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    // globals.css sets `scroll-behavior: smooth` on <html>, so the old two-arg
    // scrollTo(0, 0) call animated up from wherever the previous page was
    // scrolled to instead of jumping instantly — that visible animated scroll
    // is what read as "opening from the middle". `behavior: 'instant'`
    // explicitly overrides the CSS smooth-scroll default for this jump only.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [slug])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] pt-[120px]">
        <div className="text-center max-w-md bg-white border border-[#EDE7DC] p-10 rounded-2rem shadow-sm">
          <Paintbrush className="w-10 h-10 text-gold mx-auto mb-4 animate-pulse" />
          <h1 className="font-serif text-2xl font-bold text-charcoal mb-2" style={{ fontFamily: 'var(--font-cormorant)' }}>
            Product Not Found
          </h1>
          <p className="text-xs text-charcoal-muted font-sans font-light mb-4 leading-relaxed">
            The URL path <span className="text-red-500 font-mono bg-red-50 px-1.5 py-0.5 rounded border border-red-100">{slug}</span> could not be matched to any product.
          </p>
          <Link href="/products" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-charcoal hover:text-gold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Return to Catalog
          </Link>
        </div>
      </div>
    )
  }

  const related = products.filter(p => p.category === product.category && p.slug !== slug).slice(0, 4)
  const navBg = scrolled
    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#F0EAE1]'
    : 'bg-white/95 backdrop-blur-md border-b border-[#F0EAE1]'

  // ─── Category-Specific Application Steps Fallbacks ─────────────────
  const CATEGORY_HOW_TO_MAP: Record<string, { step: string; title: string; desc: string }[]> = {
    'Waterproofing': [
      { step: '01', title: 'Surface Cleaning & Repair', desc: 'Wash surface to remove moss, algae, and loose debris. Heavy cracks must be opened up, cleaned, and sealed with structural polyurethane sealant before coating.' },
      { step: '02', title: 'Self-Priming / Smart Primer', desc: 'Apply a priming coat. For many advanced compounds, dilute the product itself with 30% clean water to act as a deep-penetrating primer coat. Let dry for 2–3 hours.' },
      { step: '03', title: 'First Undiluted Coat', desc: 'Apply the first coat of the waterproofing compound without dilution using a heavy block brush or roller. Ensure even structural coverage across all joints and parapet wall bases.' },
      { step: '04', title: 'Cross-Directional Second Coat', desc: 'Apply the second coat perpendicular (at a 90-degree angle) to the first coat after 4–6 hours. This cross-hatching layout guarantees zero micro-pinholes are left exposed.' }
    ],
    'Primers': [
      { step: '01', title: 'Substrate Levelling & Sanding', desc: 'Ensure walls are clean and fully cured. Sand the surface with emery paper 180 to remove loose plaster particles and wipe off the structural dust clean.' },
      { step: '02', title: 'Dilution and Consistency', desc: 'Dilute the primer base with clean water or specified solvent as per the technical sheet (typically 80–100% by volume for water-based primers). Stir thoroughly.' },
      { step: '03', title: 'Application Layout', desc: 'Apply a single uniform coat using a professional paint brush or roller. Work from top to bottom, avoiding patches or excessive paint runs.' },
      { step: '04', title: 'Sanding Post-Dry', desc: 'Allow it to air-dry for 4–6 hours. Lightly sand the primed surface with emery paper 320 to level micro-ridges before applying the finishing topcoat layers.' }
    ],
    'Oil Paints': [
      { step: '01', title: 'Degreasing & Rust Removal', desc: 'For metal substrates, remove rust completely using wire brushes or sanding. For wood, sand smooth. Wipe down thoroughly with Mineral Turpentine Oil (MTO) to clean oils.' },
      { step: '02', title: 'Undercoat Application', desc: 'Apply an oil-based primer line (Red Oxide for ferrous metals, Wood Primer for wood). Allow it to dry completely for 12–18 hours before proceeding.' },
      { step: '03', title: 'Thinning & First Coat', desc: 'Thin the gloss enamel paint with 10–15% MTO. Apply a thin, uniform first coat. Avoid heavy pooling to ensure it does not sag or blister during cross-linking.' },
      { step: '04', title: 'Overnight Cure & Recoat', desc: 'Allow 12–16 hours of overnight drying. Lightly scuff the surface to create a mechanical key, clean the dust, and apply the final high-gloss finishing coat.' }
    ],
    'Industrial Textiles': [
      { step: '01', title: 'Base Preparation', desc: 'Ensure the engineering substrate is structurally sound, level, free of sharp protrusions, and cleared of standing water or mud deposits.' },
      { step: '02', title: 'Unrolling & Alignment', desc: 'Roll out the technical textile fabric smoothly along the layout lines. Pull taut to remove wrinkles, ensuring correct mechanical alignment.' },
      { step: '03', title: 'Overlap & Anchoring', desc: 'Maintain a minimum overlap of 300mm to 500mm at all layout joints. Secure the panels structurally using thermal welding, specialized adhesive tapes, or mechanical fasteners.' },
      { step: '04', title: 'Immediate Backfilling', desc: 'Cover the textile membrane with the designated aggregate or soil layer within 48 hours to minimize long-term construction UV exposure damage.' }
    ],
    'Protective Coatings': [
      { step: '01', title: 'Profile Sandblasting / Cleaning', desc: 'Clean substrates to pristine standards. For industrial metals, commercial sandblasting to near-white metal is recommended to create an ideal anchor profile.' },
      { step: '02', title: 'Mixing Multi-Component Bases', desc: 'If dealing with a dual-pack epoxy or polyurethane system, mix base and hardener in the precise stated ratio. Respect the pot-life clock limit completely.' },
      { step: '03', title: 'Airless Spray Setup', desc: 'Apply using heavy-duty airless spray equipment for a dense, void-free protective film shield. Monitor Wet Film Thickness (WFT) continuously during application.' },
      { step: '04', title: 'Curing Environment', desc: 'Allow complete cross-linking. Avoid moisture impact or structural mechanical loading during the initial 7-day chemical curing window.' }
    ]
  };

  const DEFAULT_PAINT_STEPS = [
    { step: '01', title: 'Surface Preparation', desc: 'Clean the surface thoroughly. Remove dust, loose particles, grease, and any traces of algae. Fill hairline cracks with appropriate wall putty and let dry.' },
    { step: '02', title: 'Apply Primer Base', desc: 'Apply one uniform coat of a suitable undercoat primer. Allow adequate drying time (typically 4–6 hours) before stepping up to the topcoat.' },
    { step: '03', title: 'First Topcoat Application', desc: 'Dilute the premium paint layer as recommended (usually 10–15% water for emulsions). Apply an even first coat using a high-quality roller or brush tool.' },
    { step: '04', title: 'Drying & Final Coat', desc: 'Allow the first coat to dry completely for 4 hours. Apply a second finishing coat perpendicular to the first coat for full opacity and optimal color richness.' }
  ];

  // Resolve the dynamic steps based on product configuration or category fallback
  const howToSteps: { step: string; title: string; desc: string }[] =
    (product as any).howToApply ?? 
    CATEGORY_HOW_TO_MAP[product.category] ?? 
    DEFAULT_PAINT_STEPS;

  // ─── Category-Specific Pack Size Fallbacks ──────────────────────────
  // Real paint-industry packaging varies a lot by product type — liquid
  // paints are sold by litre, putty/plaster/texture by weight, textiles by
  // roll. Individual products can still override via their own `packSizes`
  // field; this only fills in when that's absent.
  const CATEGORY_PACK_SIZES_MAP: Record<string, string[]> = {
    'Emulsion Paints': ['1 L', '4 L', '10 L', '20 L'],
    'Interior Paints': ['1 L', '4 L', '10 L', '20 L'],
    'Interior Wall Paint': ['1 L', '4 L', '10 L', '20 L'],
    'Exterior Paints': ['1 L', '4 L', '10 L', '20 L'],
    'Exterior Emulsion Paints': ['1 L', '4 L', '10 L', '20 L'],
    'Exterior Emulsion Paint': ['1 L', '4 L', '10 L', '20 L'],
    'Exterior Painting System': ['1 L', '4 L', '10 L', '20 L'],
    'Decorative Paints': ['1 L', '4 L', '10 L', '20 L'],
    'Distempers': ['1 Kg', '5 Kg', '10 Kg', '20 Kg'],
    'Enamel Paints': ['200 ml', '500 ml', '1 L', '4 L', '10 L'],
    'Metal Paints / Enamel Paints': ['200 ml', '500 ml', '1 L', '4 L', '10 L'],
    'Oil Paints': ['200 ml', '500 ml', '1 L', '4 L', '10 L'],
    'Primers': ['1 L', '4 L', '10 L', '20 L'],
    'Primers and Sealers': ['1 L', '4 L', '10 L', '20 L'],
    'Industrial Coatings': ['1 L', '4 L', '10 L', '20 L'],
    'Metal Primer / Industrial Coating': ['1 L', '4 L', '10 L', '20 L'],
    'Protective Coatings': ['1 L', '5 L', '10 L', '20 L'],
    'Epoxy Coatings': ['4 L Kit', '10 L Kit', '20 L Kit'],
    'Floor Coatings': ['4 L', '10 L', '20 L'],
    'Roof Coating': ['4 L', '10 L', '20 L'],
    'Waterproofing': ['1 Kg', '5 Kg', '20 Kg', '50 Kg'],
    'Wall Finishes': ['1 Kg', '5 Kg', '20 Kg', '40 Kg'],
    'Construction Materials': ['40 Kg Bag'],
    'Tile Adhesive': ['20 Kg Bag', '40 Kg Bag'],
    'Exterior Textures': ['20 Kg', '40 Kg'],
    'Exterior Texture': ['20 Kg', '40 Kg'],
    'Exterior Texture Protective Coat': ['20 Kg', '40 Kg'],
    'Industrial Textiles': ['1m × 50m Roll', '2m × 50m Roll', 'Custom Size'],
  };

  const DEFAULT_PACK_SIZES = ['1 L', '4 L', '10 L', '20 L'];

  const packSizes: string[] =
    (product as any).packSizes ??
    product.packSizes ??
    CATEGORY_PACK_SIZES_MAP[product.category] ??
    DEFAULT_PACK_SIZES

  // Build technical specs object
  const techSpecs = (product as any).technicalSpecs ?? {}

  // Summary stats for the hero strip — Coverage/Dry Time only shown when the
  // product actually has that data, so we never present a fabricated number
  // as if it were a real spec.
  const summaryStats = [
    techSpecs.coverage && { label: 'Coverage', value: techSpecs.coverage, icon: <Ruler className="w-4 h-4" /> },
    { label: 'Finish', value: techSpecs.finish ?? product.finish ?? 'Premium', icon: <Sparkles className="w-4 h-4" /> },
    techSpecs.dryingTime && { label: 'Dry Time', value: techSpecs.dryingTime, icon: <Clock className="w-4 h-4" /> },
    { label: 'Application', value: techSpecs.application ?? 'Brush / Roller / Spray', icon: <Paintbrush className="w-4 h-4" /> },
  ].filter(Boolean) as { label: string; value: string; icon: React.ReactNode }[]

  // Category-specific FAQ template (see ../faqTemplates.ts) — reused across
  // every product in the same category group rather than one generic list.
  // Answers pull in this product's real technicalSpecs where available and
  // fall back to general category guidance rather than inventing numbers.
  const faqItems = getCategoryFaq(product)

  const TABS: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Key Features' },
    { id: 'howto', label: 'How to Apply' },
    { id: 'specs', label: 'Specifications' },
  ]

  return (
    <div className="bg-[#FAF8F5] min-h-screen selection:bg-[#F3E7C9] pt-[72px]">
      {/* ── Ambient Grain ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
      {/* ── Accent glow ── */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[520px] h-[520px] z-0"
        style={{ background: `radial-gradient(circle at top right, ${accent}0A 0%, transparent 65%)` }}
      />
      {/* ── Drifting ambient blob (subtle life, tucked behind hero) ── */}
      <motion.div
        className="pointer-events-none absolute -left-40 top-[420px] w-[460px] h-[460px] rounded-full z-0 hidden lg:block"
        style={{ background: `radial-gradient(circle, ${accent}10 0%, transparent 70%)`, filter: 'blur(10px)' }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ══════════════════ HEADER ══════════════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-4 flex-shrink-0 min-w-0 lg:min-w-[260px]">
            <div className="w-[46px] h-[46px] sm:w-[62px] sm:h-[62px] rounded-2xl flex items-center justify-center bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-[#E8E2D8] p-1.5 sm:p-2 shrink-0">
              <Image src="/Logo.png" alt="Colorsome logo" width={62} height={62} className="w-full h-full object-contain scale-[1.08]" />
            </div>
            <div className="flex flex-col justify-center leading-none min-w-0">
              <div className="flex items-start">
                <span className="transition-colors duration-300 text-[#2D2D2D]" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.35rem, 5vw, 2rem)', lineHeight: 0.82, fontWeight: 700, letterSpacing: '-0.055em', textTransform: 'uppercase' }}>COLORSOME</span>
                <span className="transition-colors duration-300 text-[#2D2D2D]" style={{ fontFamily: 'var(--font-inter)', fontSize: '0.55rem', lineHeight: 1, fontWeight: 700, marginLeft: '0.18rem', marginTop: '0.12rem', letterSpacing: '0.04em' }}>®</span>
              </div>
            </div>
          </Link>
          {/* Desktop nav — reveals at lg (1024px); at md (768px) the full
              6-link pill + CTA button don't comfortably fit, so tablet
              widths fall back to the hamburger menu instead. */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center gap-1 rounded-full border border-black/[0.06] bg-white/80 backdrop-blur-md px-2 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
              {[['Home', '/'], ['Products', '/products'], ['Shades', '/shades'], ['Assistance', '/assistance'], ['About', '/about'], ['Contact', '/contact']].map(([label, href]) => {
                const isActive = label === 'Products'
                return (
                  <Link key={label} href={href} className={`relative rounded-full px-4 py-2.5 transition-all duration-200 ${isActive ? 'text-[#2D2D2D] bg-[#F3E7C9]' : 'text-[#6B6B6B] hover:text-[#2D2D2D] hover:bg-black/[0.04]'}`} style={{ fontFamily: 'var(--font-inter)', fontSize: '0.92rem', fontWeight: isActive ? 600 : 500, letterSpacing: '-0.01em', lineHeight: 1 }}>
                    {label}
                  </Link>
                )
              })}
            </div>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/assistance" className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-white flex-shrink-0" style={{ background: '#2D2D2D' }}>
              <Phone className="w-4 h-4" /> Book Assistance
            </Link>
            <button className="lg:hidden p-2.5 -mr-1 rounded-lg transition-colors text-[#2D2D2D]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
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
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
                  className="px-3 py-3"
                >
                  {[
                    ['Home', '/', HomeIcon],
                    ['Products', '/products', Package],
                    ['Shades', '/shades', Palette],
                    ['Assistance', '/assistance', HelpCircle],
                    ['About', '/about', Info],
                    ['Contact', '/contact', Mail],
                  ].map(([label, href, Icon]: any) => {
                    const isActive = label === 'Products'
                    return (
                      <motion.div
                        key={href}
                        variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } }}
                      >
                        <Link
                          href={href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-[15px] font-semibold transition-colors duration-200 ${isActive ? '' : 'text-[#2D2D2D] hover:bg-[#FAF8F5]'}`}
                          style={{ background: isActive ? '#F3E7C912' : undefined, color: isActive ? '#C9A858' : undefined }}
                        >
                          <span
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: isActive ? '#F3E7C9' : '#F7F6F2', color: isActive ? '#B8952E' : '#8C8C8C' }}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          {label}
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.nav>
                <div className="px-4 pb-4 pt-1">
                  <Link
                    href="/assistance"
                    onClick={() => setMobileMenuOpen(false)}
                    className="group relative overflow-hidden flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold text-white bg-[#2D2D2D] shadow-[0_10px_25px_rgba(0,0,0,0.2)] active:scale-[0.98] transition-transform"
                    style={{ background: '#2D2D2D' }}
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" style={{ background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)' }} />
                    <Phone className="w-3.5 h-3.5 relative" /> <span className="relative">Book Assistance</span>
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* ══════════════════ BREADCRUMB ══════════════════ */}
      <div className="max-w-[1280px] mx-auto px-6 pt-6 pb-4 flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-[#8C8C8C]" style={{ fontFamily: 'var(--font-inter)' }}>
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-300" />
        <Link href="/products" className="hover:text-charcoal transition-colors">Products</Link>
        <ChevronRight className="w-3 h-3 text-gray-300" />
        <span className="text-charcoal font-black truncate">{product.name}</span>
      </div>

      {/* ══════════════════ HERO — PRODUCT STAGE ══════════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Image + Quick Specs ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-[116px]"
          >
            {/* Image Card */}
            <div className="rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden bg-white border border-[#EDE6DA] shadow-[0_20px_50px_rgba(45,45,45,0.05)] p-5 sm:p-6 lg:p-8 relative group transition-shadow duration-500 hover:shadow-[0_32px_70px_rgba(45,45,45,0.10)]">
              {/* Accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-500" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}CC)` }} />
              {/* Category badge */}
              <span className="absolute top-5 right-5 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-md text-white shadow-sm" style={{ background: accent, fontFamily: 'var(--font-inter)' }}>
                {product.category?.split(' ')[0] ?? 'Paint'}
              </span>
              {/* Ambient pulsing rings — animate continuously, bloom softly on hover */}
              <motion.div
                className="absolute w-64 h-64 rounded-full border top-1/2 left-1/2"
                style={{ borderColor: `${accent}25`, borderWidth: '1px', marginLeft: -128, marginTop: -128 }}
                animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.55, 0.25] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.28, opacity: 0.85, transition: { duration: 0.6, ease: 'easeOut' } }}
              />
              <motion.div
                className="absolute w-48 h-48 rounded-full border top-1/2 left-1/2"
                style={{ borderColor: `${accent}18`, borderWidth: '1px', marginLeft: -96, marginTop: -96 }}
                animate={{ scale: [1.08, 1, 1.08], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                whileHover={{ scale: 1.18, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }}
              />
              {/* One-shot sparkle burst ring — fires each time you hover */}
              <span
                className="absolute w-40 h-40 rounded-full border-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none"
                style={{ borderColor: `${accent}70` }}
              />
              {/* Glow spot — breathes gently, blooms warm on hover */}
              <motion.div
                className="absolute inset-0 rounded-[2.5rem]"
                style={{ background: `radial-gradient(circle at center, ${accent}14 0%, transparent 70%)` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ background: `radial-gradient(circle at center, ${accent}26 0%, transparent 72%)`, transition: { duration: 0.5 } }}
              />
              {/* Product image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75, rotate: -8, y: 30 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: [0, 1.5, 0, -1.5, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  scale: { type: 'spring', damping: 12, stiffness: 140 },
                  rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
                }}
                whileHover={{ scale: 1.045, y: -14, rotate: 0, transition: { type: 'spring', damping: 16, stiffness: 200 } }}
                className="relative flex items-center justify-center cursor-zoom-in h-[220px] sm:h-[280px] lg:h-[380px]"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={360}
                  height={380}
                  className="h-[200px] sm:h-64 lg:h-80 w-auto object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.13)] z-10 relative transition-[filter] duration-500 group-hover:drop-shadow-[0_32px_50px_rgba(0,0,0,0.18)]"
                  priority
                />
                {/* Shine sweep */}
                <motion.div
                  className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
                  style={{ mixBlendMode: 'overlay' }}
                >
                  <motion.div
                    className="absolute top-0 bottom-0 w-1/3"
                    style={{ background: 'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)' }}
                    initial={{ x: '-150%' }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.2, ease: 'easeInOut' }}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* ── Image Disclaimer ── */}
            <p
              className="text-center text-[10px] text-[#B0A898] mt-3 px-2 leading-relaxed"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Image shown is for representation purposes only. Actual product colour, shade, and finish may vary depending on screen display, surface, and application.
            </p>

            {/* ── Quick Stat Strip ── */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              {summaryStats.map(({ label, value, icon }) => (
                <div
                  key={label}
                  className="bg-white border border-[#EDE6DA] rounded-2xl p-4 text-center group hover:shadow-md transition-all duration-200 hover:border-current cursor-default"
                  style={{ '--tw-border-opacity': '1' } as React.CSSProperties}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1.5" style={{ color: accent }}>
                    {icon}
                  </div>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-[#9B8E7E] mb-0.5" style={{ fontFamily: 'var(--font-inter)' }}>{label}</p>
                  <p className="text-sm font-semibold text-charcoal leading-tight" style={{ fontFamily: 'var(--font-inter)' }}>{value}</p>
                </div>
              ))}
            </div>

            {/* ── Pack Size Selector ── */}
            {packSizes.length > 0 && (
              <div className="mt-5 bg-white border border-[#EDE6DA] rounded-2xl p-5">
                <p className="text-[9px] uppercase tracking-widest font-black text-[#9B8E7E] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Available Pack Sizes</p>
                <div className="flex flex-wrap gap-2">
                  {packSizes.map((size, i) => (
                    <button
                      key={size}
                      onClick={() => setActivePack(i)}
                      className="px-4 py-2.5 lg:py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-200"
                      style={{
                        fontFamily: 'var(--font-inter)',
                        background: activePack === i ? accent : 'transparent',
                        color: activePack === i ? '#fff' : '#2D2D2D',
                        border: activePack === i ? `1.5px solid ${accent}` : '1.5px solid #EDE6DA',
                        boxShadow: activePack === i ? `0 4px 14px ${accent}30` : 'none',
                      }}
                    >
                      <Package className="w-3 h-3 inline mr-1 opacity-70" />
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Trust / Assurance Strip ── */}
            <div className="mt-5 flex flex-wrap gap-2">
              {['Lab-Tested Formula', 'Batch Quality Checked', 'Colour Match Guarantee'].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold"
                  style={{ background: `${accent}0F`, color: accent, fontFamily: 'var(--font-inter)' }}
                >
                  <BadgeCheck className="w-3 h-3" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Text + Tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Category + Status pill */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-4"
                style={{ background: `${accent}12` }}
              >
                <span className="relative flex w-1.5 h-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accent }} />
                  <span className="relative inline-flex rounded-full w-1.5 h-1.5" style={{ background: accent }} />
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>
                  {product.status} &nbsp;·&nbsp; {product.id.toString().padStart(2, '0')}
                </span>
              </motion.div>
              {/* Product name */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl font-bold leading-[1.06] tracking-[-0.03em] mb-4"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                  backgroundImage: `linear-gradient(100deg, #2D2D2D 40%, ${accent} 130%)`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {product.name}
              </motion.h1>
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-[15px] sm:text-[16px] text-charcoal-muted leading-relaxed font-light"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {(product as any).fullDescription ?? product.description}
              </motion.p>
            </div>

            {/* ── TABS BAR ── */}
            <div className="border-b border-[#EDE6DA]">
              <div className="relative flex gap-0 overflow-x-auto scrollbar-none pr-6 lg:pr-0">
                {TABS.map(tab => {
                  const sel = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="relative px-5 py-3.5 lg:py-3 text-[11px] uppercase tracking-widest font-black transition-colors whitespace-nowrap shrink-0"
                      style={{
                        fontFamily: 'var(--font-inter)',
                        color: sel ? '#2D2D2D' : '#9B8E7E',
                      }}
                    >
                      {tab.label}
                      {sel && (
                        <motion.span
                          layoutId="activeTabIndicator"
                          className="absolute left-0 right-0 -bottom-[1px] h-[2.5px] rounded-full"
                          style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80)` }}
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── TAB CONTENT ── */}
            <div className="min-h-[200px]">
              <AnimatePresence mode="wait">

                {/* ── OVERVIEW ── */}
                {activeTab === 'overview' && (
                  <motion.div key="overview" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }} className="space-y-5">
                    {/* Category + Status info cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white rounded-2xl border border-[#EDE6DA] p-5">
                        <p className="text-[9px] uppercase font-bold tracking-widest text-[#9B8E7E] mb-1" style={{ fontFamily: 'var(--font-inter)' }}>Category</p>
                        <p className="font-bold text-charcoal" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>{product.category}</p>
                      </div>
                      <div className="bg-white rounded-2xl border border-[#EDE6DA] p-5">
                        <p className="text-[9px] uppercase font-bold tracking-widest text-[#9B8E7E] mb-1" style={{ fontFamily: 'var(--font-inter)' }}>Availability</p>
                        <p className="font-bold text-charcoal" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>{product.status ?? 'In Stock'}</p>
                      </div>
                      <div className="bg-white rounded-2xl border border-[#EDE6DA] p-5">
                        <p className="text-[9px] uppercase font-bold tracking-widest text-[#9B8E7E] mb-1" style={{ fontFamily: 'var(--font-inter)' }}>Finish Type</p>
                        <p className="font-bold text-charcoal" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>{techSpecs.finish ?? product.finish ?? 'Premium'}</p>
                      </div>
                    </div>

                    {/* Applications list */}
                    {product.applications && product.applications.length > 0 && (
                      <div>
                        <p className="text-[9px] uppercase font-bold tracking-widest text-[#9B8E7E] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Suitable For</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {product.applications.map((app: string, i: number) => (
                            <div key={i} className="flex items-center gap-3 p-3.5 bg-white border border-[#EDE6DA] rounded-xl">
                              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: accent }} />
                              <p className="text-[14px] text-charcoal font-medium" style={{ fontFamily: 'var(--font-inter)' }}>{app}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Feature chips preview */}
                    {product.features && product.features.length > 0 && (
                      <div>
                        <p className="text-[9px] uppercase font-bold tracking-widest text-[#9B8E7E] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Highlights</p>
                        <div className="flex flex-wrap gap-2">
                          {product.features.slice(0, 6).map((f: string, i: number) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full"
                              style={{ background: `${accent}12`, color: accent, fontFamily: 'var(--font-inter)' }}
                            >
                              <CheckCircle className="w-3 h-3" /> {f}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ── KEY FEATURES ── */}
                {activeTab === 'features' && (
                  <motion.div key="features" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features?.map((f: string, i: number) => {
                        const desc = FEATURE_DESCRIPTIONS[f] ?? `${f} helps improve coating performance, usability, and long-term surface reliability.`
                        const icon = FEATURE_ICON_MAP[f] ?? DEFAULT_ICON
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06, duration: 0.3 }}
                            className="group flex flex-col gap-3 p-5 bg-white border border-[#EDE6DA] rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                          >
                            {/* Icon circle */}
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                                style={{ background: `${accent}12`, color: accent }}
                              >
                                {icon}
                              </div>
                              <p className="text-[15px] font-bold text-charcoal leading-tight" style={{ fontFamily: 'var(--font-inter)' }}>{f}</p>
                            </div>
                            <p className="text-[13.5px] text-charcoal-muted leading-[1.6]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}>{desc}</p>
                            {/* Bottom accent line on hover */}
                            <div className="h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full mt-auto" style={{ background: `${accent}40` }} />
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {/* ── HOW TO APPLY ── */}
                {activeTab === 'howto' && (
                  <motion.div key="howto" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }} className="space-y-3">
                    {howToSteps.map(({ step, title, desc }, i) => {
                      const isOpen = expandedStep === i
                      return (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="bg-white border border-[#EDE6DA] rounded-2xl overflow-hidden"
                          style={{ borderLeft: `3px solid ${isOpen ? accent : '#EDE6DA'}` }}
                        >
                          <button
                            onClick={() => setExpandedStep(isOpen ? null : i)}
                            className="w-full flex items-center gap-4 px-5 py-4 text-left group"
                          >
                            {/* Step number bubble */}
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                              style={{ background: isOpen ? accent : `${accent}14`, color: isOpen ? '#fff' : accent }}
                            >
                              {STEP_ICONS[i] ?? <CheckCircle className="w-5 h-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>Step {step}</span>
                              <p className="text-[14px] font-bold text-charcoal" style={{ fontFamily: 'var(--font-inter)' }}>{title}</p>
                            </div>
                            <ChevronDown
                              className="w-4 h-4 text-charcoal-muted shrink-0 transition-transform duration-300"
                              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: isOpen ? accent : '#9B8E7E' }}
                            />
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 pb-5 pt-1">
                                  <p className="text-[14px] text-charcoal-muted leading-relaxed" style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}>{desc}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                    {/* Pro tip */}
                    <div className="flex items-start gap-3 p-4 rounded-2xl border" style={{ background: `${accent}06`, borderColor: `${accent}20` }}>
                      <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                      <p className="text-[13px] text-charcoal-muted leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                        <span className="font-semibold text-charcoal">Pro Tip:</span> Always apply in ambient temperatures between 10°C–40°C and relative humidity below 85% for the best adhesion and finish quality.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ── SPECIFICATIONS ── */}
                {activeTab === 'specs' && (
                  <motion.div key="specs" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
                    <div className="bg-white border border-[#EDE6DA] rounded-2xl overflow-hidden">
                      {/* Section heading */}
                      <div className="px-6 py-4 border-b border-[#EDE6DA]" style={{ background: `${accent}06` }}>
                        <p className="text-[11px] uppercase font-black tracking-widest" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>Technical Data Sheet</p>
                      </div>
                      <div className="px-6 py-2">
                        <SpecRow label="Product Name" value={product.name} accent={accent} />
                        <SpecRow label="Category" value={product.category} accent={accent} />
                        <SpecRow label="Finish" value={techSpecs.finish ?? product.finish} accent={accent} />
                        <SpecRow label="Coverage" value={techSpecs.coverage} accent={accent} />
                        <SpecRow label="Drying Time" value={techSpecs.dryingTime} accent={accent} />
                        <SpecRow label="Re-coat Time" value={techSpecs.recoatTime} accent={accent} />
                        <SpecRow label="Application" value={techSpecs.application} accent={accent} />
                        <SpecRow label="Dilution" value={techSpecs.dilution} accent={accent} />
                        <SpecRow label="Washability" value={techSpecs.washability} accent={accent} />
                        <SpecRow label="VOC Level" value={techSpecs.voc} accent={accent} />
                        <SpecRow label="Base" value={techSpecs.base} accent={accent} />
                        <SpecRow label="Pack Sizes" value={packSizes.join(', ')} accent={accent} />
                        <SpecRow label="Suitable For" value={product.applications?.join(', ')} accent={accent} />
                        <SpecRow label="Status" value={product.status} accent={accent} />
                      </div>
                    </div>
                    {/* Disclaimer */}
                    <p className="text-[11px] text-[#B0A898] mt-4 leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                      * Coverage rates are approximate and may vary based on surface porosity, application method, and number of coats. For precise data, refer to the product Technical Data Sheet.
                    </p>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* ── CTA Buttons ── */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#EDE6DA]">
              <Link
                href="/assistance"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-black text-white shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex-1 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}CC 100%)`, fontFamily: 'var(--font-inter)', letterSpacing: '0.1em' }}
              >
                {/* Shimmer sweep on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-out" style={{ background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)' }} />
                <Phone className="w-3.5 h-3.5 animate-pulse relative" /> <span className="relative">Get Expert Consultation</span>
              </Link>
              <button
                onClick={() => router.push('/products')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border border-[#EDE6DA] text-charcoal rounded-xl text-xs uppercase tracking-widest font-black shadow-sm hover:bg-[#FDFBF7] hover:border-[#D5CBBC] active:scale-[0.98] transition-all"
                style={{ fontFamily: 'var(--font-inter)', letterSpacing: '0.1em' }}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──════════════════ FEATURE HIGHLIGHTS STRIP ══════════════════ */}
      {product.features && product.features.length > 0 && (
        <section className="relative overflow-hidden py-20" style={{ background: `linear-gradient(165deg, #241D16 0%, ${BRAND.dark} 55%, #150F0B 100%)` }}>
          {/* Subtle architectural grid, echoes the hero section */}
          <div
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, ${accent}90 1px, transparent 1px), linear-gradient(to bottom, ${accent}90 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />
          {/* Warm ambient glows */}
          <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)` }} />
          <div className="absolute -bottom-32 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${accent}14 0%, transparent 70%)` }} />

          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-3 h-[1.5px]" style={{ background: accent }} />
                  <p className="text-[10px] uppercase tracking-[0.25em] font-black" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>Performance Profile</p>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white max-w-xl" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  What Makes {product.name} Outstanding
                </h2>
              </div>
              <p className="text-sm text-white/45 max-w-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                Every characteristic below is engineered, tested, and verified in-house before it ever reaches a wall.
              </p>
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {product.features.map((f: string, i: number) => {
                const icon = FEATURE_ICON_MAP[f] ?? DEFAULT_ICON
                const desc = FEATURE_DESCRIPTIONS[f] ?? `${f} — engineered as part of ${product.name}'s core formulation for consistent, dependable results.`
                return (
                  <motion.div
                    key={i}
                    variants={scaleIn}
                    whileHover={{ y: -6, transition: { type: 'spring', damping: 18, stiffness: 260 } }}
                    className="group relative p-6 rounded-2xl border cursor-default overflow-hidden backdrop-blur-sm transition-colors duration-300 flex flex-col"
                    style={{ background: 'rgba(255,255,255,0.035)', borderColor: 'rgba(255,255,255,0.09)' }}
                  >
                    {/* Corner check badge */}
                    <CheckCircle className="absolute top-5 right-5 w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: accent }} />
                    {/* Icon badge */}
                    <div
                      className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `linear-gradient(135deg, ${accent}30, ${accent}10)`, color: accent, boxShadow: `0 8px 20px ${accent}1A` }}
                    >
                      {icon}
                    </div>
                    <p className="relative z-10 text-[14px] font-bold text-white leading-tight mb-2" style={{ fontFamily: 'var(--font-inter)' }}>{f}</p>
                    <p className="relative z-10 text-[12px] text-white/55 leading-relaxed line-clamp-3" style={{ fontFamily: 'var(--font-inter)' }}>
                      {desc}
                    </p>
                    {/* Bottom accent line, grows on hover */}
                    <div className="relative z-10 h-[2px] w-6 group-hover:w-full transition-all duration-500 rounded-full mt-auto pt-4" style={{ background: `${accent}80` }} />
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Quick-fact strip — ties the section to real product data instead of ending on the grid */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              {[
                { label: 'Category', value: product.category },
                { label: 'Coverage', value: techSpecs.coverage ?? '130–150 sq.ft/L' },
                { label: 'Suitable For', value: `${product.applications?.length ?? 0} Use Cases` },
                { label: 'Status', value: product.status ?? 'Active' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-[9px] uppercase tracking-[0.18em] font-black text-white/35 mb-1" style={{ fontFamily: 'var(--font-inter)' }}>{s.label}</p>
                  <p className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-inter)' }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──════════════════ WHY CHOOSE SECTION ══════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 22 }}
            >
              <p className="text-[10px] uppercase tracking-[0.25em] font-black mb-3" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>Product Advantage</p>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-5 leading-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Why Professionals Choose {product.name}
              </h2>
              <p className="text-[15px] text-charcoal-muted leading-relaxed mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
                {(product as any).fullDescription ?? product.description} Every batch is quality-checked and formulated to Colorsome's strict performance standards.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <ThumbsUp className="w-5 h-5" />, label: 'Trusted Formula', val: '10+ Yrs' },
                  { icon: <Star className="w-5 h-5" />, label: 'Premium Grade', val: 'A+ Class' },
                  { icon: <BadgeCheck className="w-5 h-5" />, label: 'Quality Tested', val: '12-Stage QC' },
                  { icon: <Eye className="w-5 h-5" />, label: 'Colour Verified', val: 'Lab Matched' },
                ].map(({ icon, label, val }) => (
                  <div key={label} className="flex items-center gap-3 p-4 rounded-xl border border-[#EDE6DA] bg-[#FAF8F5]">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accent}12`, color: accent }}>{icon}</div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider font-black text-[#9B8E7E]" style={{ fontFamily: 'var(--font-inter)' }}>{label}</p>
                      <p className="text-[13px] font-bold text-charcoal" style={{ fontFamily: 'var(--font-inter)' }}>{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* Stats column */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 22, delay: 0.1 }}
              className="grid grid-cols-2 gap-5"
            >
              {[
                { end: 98, suffix: '%', label: 'Customer Satisfaction' },
                { end: 130, suffix: '+', label: 'Sq.ft Coverage / Litre' },
                { end: 10, suffix: ' Yrs', label: 'Proven Performance Life' },
                { end: 100, suffix: '%', label: 'Eco-Friendly & Low VOC' },
              ].map(({ end, suffix, label }) => (
                <div key={label} className="p-6 rounded-2xl border border-[#EDE6DA] bg-[#FAF8F5] text-center">
                  <p className="font-bold text-4xl mb-1" style={{ fontFamily: 'var(--font-cormorant)', color: accent }}>
                    <CountUp end={end} suffix={suffix} />
                  </p>
                  <p className="text-[11px] text-[#9B8E7E] uppercase tracking-wider font-semibold" style={{ fontFamily: 'var(--font-inter)' }}>{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──════════════════ FAQ ══════════════════ */}
      <section className="py-16 bg-[#FAF8F5] border-t border-[#EDE6DA]">
        <div className="max-w-[880px] mx-auto px-6">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-3 h-[1.5px]" style={{ background: accent }} />
              <p className="text-[10px] uppercase tracking-[0.25em] font-black" style={{ color: accent, fontFamily: 'var(--font-inter)' }}>Frequently Asked</p>
              <span className="w-3 h-[1.5px]" style={{ background: accent }} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-cormorant)' }}>
              Common Questions About {product.name}
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = openFaq === i
              return (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white border border-[#EDE6DA] rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
                      style={{ background: isOpen ? accent : `${accent}14`, color: isOpen ? '#fff' : accent }}
                    >
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <p className="flex-1 text-[14px] font-bold text-charcoal" style={{ fontFamily: 'var(--font-inter)' }}>{item.q}</p>
                    <ChevronDown
                      className="w-4 h-4 shrink-0 transition-transform duration-300"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: isOpen ? accent : '#9B8E7E' }}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 pl-[60px] text-[13.5px] text-charcoal-muted leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ──════════════════ RELATED PRODUCTS ══════════════════ */}
      {related.length > 0 && (
        <section className="border-t border-[#EDE6DA] py-20 bg-[#FAF8F5]">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.25em] font-black mb-1" style={{ color: '#B8A48A', fontFamily: 'var(--font-inter)' }}>You May Also Like</p>
              <h2 className="text-3xl font-bold text-charcoal tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>Related Formulations</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => {
                const relAccent = ACCENTS[i % ACCENTS.length]
                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="group block flex flex-col justify-between rounded-[1.8rem] bg-white border border-[#EDE6DA] overflow-hidden hover:shadow-[0_24px_50px_rgba(45,45,45,0.06)] hover:-translate-y-1 transition-all duration-500 h-full"
                  >
                    <div>
                      <div className="h-1 w-full" style={{ background: relAccent }} />
                      <div className="flex items-center justify-center p-6 relative overflow-hidden" style={{ height: 180 }}>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(circle, ${relAccent}0B 0%, transparent 70%)` }} />
                        <Image src={p.image} alt={p.name} width={160} height={180} className="h-36 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-6 pt-2">
                        <h3 className="text-lg font-bold text-charcoal mb-1 leading-tight group-hover:transition-colors duration-200" style={{ fontFamily: 'var(--font-cormorant)', color: undefined }}>{p.name}</h3>
                        <p className="text-xs leading-relaxed text-charcoal-muted line-clamp-2 font-light" style={{ fontFamily: 'var(--font-inter)' }}>{p.description}</p>
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider" style={{ color: relAccent }}>
                        View Details <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}