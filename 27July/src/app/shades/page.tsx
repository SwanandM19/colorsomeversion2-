

// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import Link from 'next/link';
// import { Palette, ArrowRight, Phone, Menu, X, Sparkles, SlidersHorizontal } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import type { Shade } from '../../lib/supabase';
// import { ShadeCard } from '../../components/ShadeCard';
// import Image from 'next/image';
// import { Footer } from '@/src/components/Footer';
// import { Header } from '@/src/components/Header';

// // Consistent brand color maps matching your global design tokens
// const BRAND = {
//   pink: '#E91E63',
//   orange: '#FF5722',
// };

// const fadeInUp = {
//   hidden: { opacity: 0, y: 25 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const } }
// };

// const collectionTypes = [
//   { name: 'All Shades', slug: null },
//   { name: 'Classic Neutrals', slug: 'Classic Neutrals' },
//   { name: 'Ocean Collection', slug: 'Ocean Collection' },
//   { name: 'Nature Palette', slug: 'Nature Palette' },
//   { name: 'Rich Accents', slug: 'Rich Accents' },
//   { name: 'Pastel Dreams', slug: 'Pastel Dreams' },
//   { name: 'Sunlight Series', slug: 'Sunlight Series' },
//   { name: 'Urban Modern', slug: 'Urban Modern' },
//   { name: 'Pure Collection', slug: 'Pure Collection' },
// ];

// const STATIC_SHADES: Shade[] = [
//   { id: '1', name: 'Ivory Silk', hex_code: '#FFFFF0', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: true, display_order: 1, created_at: '' },
//   { id: '2', name: 'Warm Sand', hex_code: '#D4B896', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: true, display_order: 2, created_at: '' },
//   { id: '3', name: 'Soft Cashmere', hex_code: '#D1C7BD', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: true, display_order: 3, created_at: '' },
//   { id: '4', name: 'Coastal Blue', hex_code: '#6B8FA3', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: true, display_order: 4, created_at: '' },
//   { id: '5', name: 'Lagoon Teal', hex_code: '#008080', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: true, display_order: 5, created_at: '' },
//   { id: '6', name: 'Evening Sky', hex_code: '#4A5568', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 6, created_at: '' },
//   { id: '7', name: 'Forest Green', hex_code: '#228B22', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: true, display_order: 7, created_at: '' },
//   { id: '8', name: 'Sage Mist', hex_code: '#9DC183', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 8, created_at: '' },
//   { id: '9', name: 'Olive Grove', hex_code: '#808000', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 9, created_at: '' },
//   { id: '10', name: 'Burgundy Wine', hex_code: '#722F37', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: true, display_order: 10, created_at: '' },
//   { id: '11', name: 'Terracotta', hex_code: '#E2725B', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 11, created_at: '' },
//   { id: '12', name: 'Coral Sunset', hex_code: '#FF6F61', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 12, created_at: '' },
//   { id: '13', name: 'Lavender Mist', hex_code: '#E6E6FA', collection: 'Purples', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 13, created_at: '' },
//   { id: '14', name: 'Muted Plum', hex_code: '#614051', collection: 'Purples', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 14, created_at: '' },
//   { id: '15', name: 'Mustard Gold', hex_code: '#FFDB58', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 15, created_at: '' },
//   { id: '16', name: 'Soft Peach', hex_code: '#FFDAB9', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 16, created_at: '' },
//   { id: '17', name: 'Charcoal Grey', hex_code: '#36454F', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: true, display_order: 17, created_at: '' },
//   { id: '18', name: 'Slate Blue', hex_code: '#6A5ACD', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 18, created_at: '' },
//   { id: '19', name: 'Pure White', hex_code: '#FFFFFF', collection: 'Whites', collection_type: 'Pure Collection', image_url: null, featured: true, display_order: 19, created_at: '' },
//   { id: '20', name: 'Soft Pearl', hex_code: '#EBF2F2', collection: 'Whites', collection_type: 'Pure Collection', image_url: null, featured: false, display_order: 20, created_at: '' },
// ];

// const browseBySpace = [
//   {
//     space: 'Living Room',
//     desc: 'Warm neutrals and soft blues for inviting spaces',
//     shades: ['#D4B896', '#D1C7BD', '#6B8FA3', '#FFFFF0'],
//     image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
//   },
//   {
//     space: 'Bedroom',
//     desc: 'Calming pastels and muted tones for peaceful retreat',
//     shades: ['#E6E6FA', '#9DC183', '#EBF2F2', '#D1C7BD'],
//     image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
//   },
//   {
//     space: 'Kitchen',
//     desc: 'Fresh whites and subtle colours for any style',
//     shades: ['#FFFFFF', '#EBF2F2', '#FFDB58', '#D4B896'],
//     image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
//   },
//   {
//     space: 'Exterior',
//     desc: 'Weather-resistant shades for lasting curb appeal',
//     shades: ['#FFFFF0', '#36454F', '#E2725B', '#228B22'],
//     image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
//   },
// ];

// const inspirationGallery = [
//   { image: '/modernmini.png', label: 'Modern Minimalist' },
//   { image: '/warmcontempoary.png', label: 'Warm Contemporary' },
//   { image: '/serenebedroom.png', label: 'Serene Bedroom' },
//   { image: '/classicinterior.png', label: 'Classic Exterior' },
// ];

// export default function ShadesPage() {
//   // const [shades, setShades] = useState<Shade[]>([]);
//   // const [isLoading, setIsLoading] = useState(true);
//   const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

//   const shades = useMemo(() => {
//   const filtered = selectedCollection
//     ? STATIC_SHADES.filter((shade) => shade.collection_type === selectedCollection)
//     : STATIC_SHADES;

//   return [...filtered].sort(
//     (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
//   );
// }, [selectedCollection]);

//   // useEffect(() => {
//   //   async function fetchShades() {
//   //     try {
//   //       setIsLoading(true);
//   //       const data = await getShades(selectedCollection || undefined);
//   //       setShades(data);
//   //     } catch (err) {
//   //       console.error('Error fetching shades:', err);
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   }

//   //   fetchShades();
//   // }, [selectedCollection]);

//   return (
//     <div className="bg-[#FDFBF7] min-h-screen pt-[72px] text-[#2D2D2D] font-sans overflow-x-hidden relative selection:bg-[#F3E7C9]">
      
//       {/* GLOBAL BACKGROUND AMBIENT GLOWS */}
//       <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
//         <div className="absolute top-[5%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px]" style={{ background: `radial-gradient(circle, ${BRAND.pink} 0%, transparent 70%)` }} />
//         <div className="absolute top-[40%] -right-[10%] w-[45vw] h-[45vw] rounded-full blur-[120px]" style={{ background: `radial-gradient(circle, ${BRAND.orange} 0%, transparent 70%)` }} />
//         <div className="absolute bottom-[20%] left-[5%] w-[40vw] h-[40vw] rounded-full blur-[100px]" style={{ background: `radial-gradient(circle, ${BRAND.pink} 0%, transparent 70%)` }} />
//       </div>

//       <Header />

//       {/* HERO TITLE BLOCK - Split Layout with Product Render */}
//       <section className="py-20 bg-white/40 backdrop-blur-sm border-b border-[#EDE6DA]/50 relative overflow-hidden">
//         {/* Subtle CSS Micro-Grid Architectural Canvas Blueprint Layer */}
//         <div
//           className="absolute inset-0 opacity-[0.45] pointer-events-none"
//           style={{
//             backgroundImage: `
//               linear-gradient(to right, #EDE6DA 1px, transparent 1px),
//               linear-gradient(to bottom, #EDE6DA 1px, transparent 1px)
//             `,
//             backgroundSize: "28px 28px",
//           }}
//         />
//         <div className="max-w-[1280px] mx-auto px-6 relative z-10">
//           <div className="grid lg:grid-cols-12 gap-12 items-center">
            
//             {/* Left Content Column */}
//             <motion.div className="lg:col-span-7" initial="hidden" animate="visible" variants={fadeInUp}>
//                <div className="inline-flex items-center gap-2 bg-gold/10 text-gold-dark font-semibold text-xs tracking-wider uppercase px-3 py-1 rounded-full mb-5">
//                  <Sparkles className="w-3.5 h-3.5 text-gold" /> Master Swatches
//                </div>
//                <span className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Architectural Palettes</span>
              
//                {/* FIXED TEXT BUG: Removed transparent bg-clip-text that washed out on white backgrounds */}
//                {/* <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#2D2D2D] mb-6 leading-[1.1] font-light"> */}
//                <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal mb-6 leading-none tracking-tight">
//                  Find Your Perfect <br />
//                  {/* <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-gold to-amber-900 drop-shadow-sm"> */}
//                  <span className="bg-gradient-to-r from-[#8C6478] to-[#C4704B] bg-clip-text text-transparent">
//                    Architectural Tone
//                  </span>
//                </h1>
              
//                <p className="text-base md:text-lg text-[#6B6B6B] leading-relaxed max-w-xl font-light">
//                  Explore our curated collections. From highly sophisticated neutrals to dramatic, modern statement accents, uncover tones precisely formulated to command lighting.
//                </p>
//              </motion.div>

//             {/* Right Column: Premium Paint Cans Render */}
//             <motion.div 
//               className="lg:col-span-5 relative flex justify-center"
//               initial={{ opacity: 0, scale: 0.95, y: 15 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-tr from-[#F3E7C9]/40 via-transparent to-transparent rounded-3xl blur-2xl -z-10 transform scale-90" />
              
//               <div className="relative rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#EDE6DA] overflow-hidden aspect-square w-full max-w-[440px] bg-white group">
//                 <Image
//                   src="/shadesImg.png"
//                   alt="Colorsome premium paint can lineup showcase"
//                   fill
//                   priority
//                   sizes="(max-w-1024px) 100vw, 40vw"
//                   className="object-cover transition-transform duration-700 group-hover:scale-103"
//                   unoptimized
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
//               </div>
//             </motion.div>

//           </div>
//         </div>
//       </section>

//       {/* STICKY COLLECTION FILTERS */}
//       <section className="bg-[#2D2D2D] py-4 sticky top-[72px] z-40 shadow-lg border-b border-black/10">
//         <div className="max-w-[1280px] mx-auto px-6 flex items-center gap-4">
//           <div className="text-white/40 border-r border-white/10 pr-3 hidden sm:flex items-center gap-1.5 shrink-0 font-inter">
//             <SlidersHorizontal className="w-4 h-4 text-[#C4704B]" />
//             <span className="text-[10px] uppercase font-black tracking-widest text-gray-300">Filters</span>
//           </div>
//           <div className="flex items-center overflow-x-auto gap-2 scrollbar-hide flex-1 py-0.5 font-inter">
//             {collectionTypes.map((c) => {
//               const isSelected = selectedCollection === c.slug;
//               return (
//                 <button
//                   key={c.name}
//                   onClick={() => setSelectedCollection(c.slug)}
//                   className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-300 ${
//                     isSelected
//                       ? 'bg-[#F3E7C9] text-[#2D2D2D] shadow-sm scale-[1.02]'
//                       : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
//                   }`}
//                 >
//                   {c.name}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* SHADES INTERACTIVE ENGINE GRID */}
//       <section className="py-16 relative">
//         <div className="max-w-[1280px] mx-auto px-6">
//           <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#EDE6DA]/60 font-inter">
//             <p className="text-sm font-medium text-charcoal-muted">
//               Showing <span className="text-charcoal font-bold">{shades.length}</span> signature shade{shades.length !== 1 ? 's' : ''}
//             </p>
//             <Link href="/assistance" className="text-xs font-black text-[#C4704B] uppercase tracking-widest hover:text-[#8C6478] flex items-center gap-1.5 group transition-colors">
//               <Palette className="w-4 h-4" /> Need matching advice? <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
//             </Link>
//           </div>

//           {/* <AnimatePresence mode="popLayout">
//             {isLoading ? (
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="py-32 flex flex-col items-center justify-center w-full gap-3 font-inter"
//               >
//                 <Loader className="w-6 h-6 text-[#C4704B] animate-spin" />
//                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading tonal spectrum...</p>
//               </motion.div>
//             ) : shades.length === 0 ? (
//               <motion.div 
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="py-32 text-center max-w-md mx-auto font-inter"
//               >
//                 <Palette className="w-10 h-10 text-gray-300 mx-auto mb-4" />
//                 <h3 className="font-serif text-2xl font-bold mb-1 text-charcoal">No Swatches Found</h3>
//                 <p className="text-xs text-charcoal-muted leading-relaxed font-normal">We couldn't locate active shades matching this database filter. Try switching back to All Shades.</p>
//               </motion.div>
//             ) : (
//               <motion.div 
//                 layout
//                 className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
//               >
//                 {shades.map((shade) => (
//                   <motion.div
//                     layout
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.95 }}
//                     transition={{ duration: 0.3 }}
//                     key={shade.id}
//                   >
//                     <ShadeCard shade={shade} size="md" />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence> */}
//           <AnimatePresence mode="popLayout">
//   {shades.length === 0 ? (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="py-32 text-center max-w-md mx-auto font-inter"
//     >
//       <Palette className="w-10 h-10 text-gray-300 mx-auto mb-4" />
//       <h3 className="font-serif text-2xl font-bold mb-1 text-charcoal">No Swatches Found</h3>
//       <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
//         No shades match this collection right now. Try switching back to All Shades.
//       </p>
//     </motion.div>
//   ) : (
//     <motion.div
//       layout
//       className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
//     >
//       {shades.map((shade) => (
//         <motion.div
//           layout
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           transition={{ duration: 0.3 }}
//           key={shade.id}
//         >
//           <ShadeCard shade={shade} size="md" />
//         </motion.div>
//       ))}
//     </motion.div>
//   )}
// </AnimatePresence>
//         </div>
//       </section>

//       {/* SPACE INTERACTIVE SWATCH MAPPER */}
//       <section className="py-24 bg-[#FDFBF7]/40 border-t border-b border-[#EDE6DA]/50 relative">
//         <div className="max-w-[1280px] mx-auto px-6">
//           <div className="text-center mb-16">
//             <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6478] font-black font-inter mb-2 block">By Space Architecture</span>
//             <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal tracking-tight">Formulated Tones for Every Room</h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {browseBySpace.map((s) => (
//               <div key={s.space} className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#EDE6DA]/60 flex flex-col justify-between group hover:shadow-xl hover:border-[#C4704B]/30 hover:bg-white transition-all duration-300">
//                 <div className="relative h-48 w-full overflow-hidden shrink-0">
//                   <Image 
//                     src={s.image} 
//                     alt={s.space} 
//                     fill 
//                     sizes="(max-w-768px) 100vw, 25vw"
//                     className="object-cover transition-transform duration-700 group-hover:scale-105"
//                     unoptimized
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
//                   <div className="absolute bottom-4 left-5">
//                     <p className="font-serif text-2xl font-bold text-white tracking-wide">{s.space}</p>
//                   </div>
//                 </div>
//                 <div className="p-6 flex-1 flex flex-col justify-between font-inter">
//                   <p className="text-xs sm:text-sm text-charcoal-muted mb-6 leading-relaxed font-normal tracking-wide">{s.desc}</p>
//                   <div>
//                     <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-2.5">Recommended Swatches</span>
//                     <div className="flex gap-2.5">
//                       {s.shades.map((color, i) => (
//                         <motion.div
//                           key={i}
//                           whileHover={{ y: -4, scale: 1.05 }}
//                           title={`Hex: ${color}`}
//                           className="w-8 h-8 rounded-xl border border-black/5 shadow-sm cursor-help relative group/swatch shrink-0"
//                           style={{ backgroundColor: color }}
//                         >
//                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#2D2D2D] text-white text-[9px] rounded font-mono opacity-0 group-hover/swatch:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-10">
//                             {color}
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CURATED INSPIRATION IMAGERY GALLERY */}
//       <section className="py-24 relative">
//         <div className="max-w-[1280px] mx-auto px-6">
//           <div className="text-center mb-16">
//             <span className="text-[10px] uppercase tracking-[0.25em] text-[#C4704B] font-black font-inter mb-2 block">Atmosphere Inspiration</span>
//             <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal tracking-tight">Real Space Transformation Maps</h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {inspirationGallery.map((item) => (
//               <div key={item.label} className="rounded-3xl overflow-hidden border border-[#EDE6DA]/40 relative aspect-[4/5] group shadow-sm hover:shadow-2xl transition-all duration-500">
//                 <Image
//                   src={item.image}
//                   alt={item.label}
//                   fill
//                   sizes="(max-w-768px) 100vw, 25vw"
//                   className="object-cover transition-transform duration-700 group-hover:scale-105"
//                   unoptimized
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
//                 <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
//                   <p className="font-serif text-lg font-bold text-white tracking-wide">{item.label}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA INTERACTIVE BLUEPRINT PANEL */}
//       <section className="py-12 max-w-[1280px] mx-auto px-6">
//         <motion.div 
//           className="max-w-[1000px] mx-auto text-center bg-[#2D2D2D] rounded-3xl p-12 sm:p-16 shadow-2xl relative overflow-hidden group"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* Embedded accent glows mapping the background elements */}
//           <div className="absolute inset-0 -z-0 opacity-10 pointer-events-none">
//             <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[80px]" style={{ background: BRAND.pink }} />
//             <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[80px]" style={{ background: BRAND.orange }} />
//           </div>

//           <p className="text-[10px] uppercase tracking-[0.25em] text-[#C4704B] font-black font-inter mb-3 relative z-10">Color Architecture Assistance</p>
//           <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-none max-w-2xl mx-auto relative z-10">Can't Decide on Tone Swatches?</h2>
//           <p className="text-base text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed font-inter font-normal tracking-wide relative z-10">
//             Skip guessing layouts. Our design masters can overlay high-performance physical coat swatches directly onto your properties under exact lighting frameworks.
//           </p>
          
//           <div className="relative z-10 max-w-md mx-auto font-inter">
//             <Link href="/assistance" className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F3E7C9] text-[#2D2D2D] rounded-xl text-xs uppercase tracking-widest font-black transition-all shadow-md hover:shadow-xl hover:bg-[#ebdcb4] group">
//               Book Free Color Art Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//             </Link>
//           </div>
//         </motion.div>
//       </section>

//       <Footer />
//     </div>
//   );
// }



'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Palette, ArrowRight, Phone, Menu, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Shade } from '../../lib/supabase';
import { ShadeCard } from '../../components/ShadeCard';
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

const collectionTypes = [
  { name: 'All Shades', slug: null },
  { name: 'Classic Neutrals', slug: 'Classic Neutrals' },
  { name: 'Ocean Collection', slug: 'Ocean Collection' },
  { name: 'Nature Palette', slug: 'Nature Palette' },
  { name: 'Rich Accents', slug: 'Rich Accents' },
  { name: 'Pastel Dreams', slug: 'Pastel Dreams' },
  { name: 'Sunlight Series', slug: 'Sunlight Series' },
  { name: 'Urban Modern', slug: 'Urban Modern' },
  { name: 'Pure Collection', slug: 'Pure Collection' },
  { name: 'Earthy Tones', slug: 'Earthy Tones' },
  { name: 'Jewel Tones', slug: 'Jewel Tones' },
  { name: 'Muted Pastels', slug: 'Muted Pastels' },
];

const STATIC_SHADES: Shade[] = [
  // ── Classic Neutrals ──────────────────────────────
  { id: '1', name: 'Ivory Silk', hex_code: '#FFFFF0', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: true, display_order: 1, created_at: '' },
  { id: '2', name: 'Warm Sand', hex_code: '#D4B896', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: true, display_order: 2, created_at: '' },
  { id: '3', name: 'Soft Cashmere', hex_code: '#D1C7BD', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: true, display_order: 3, created_at: '' },
  { id: '4', name: 'Creamy Beige', hex_code: '#F5E6D3', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: false, display_order: 4, created_at: '' },
  { id: '5', name: 'Warm Taupe', hex_code: '#C4A882', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: false, display_order: 5, created_at: '' },
  { id: '6', name: 'Pale Almond', hex_code: '#E8D5C4', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: false, display_order: 6, created_at: '' },
  { id: '7', name: 'Greige', hex_code: '#B8A99A', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: false, display_order: 7, created_at: '' },
  
  // ── Ocean Collection ──────────────────────────────
  { id: '8', name: 'Coastal Blue', hex_code: '#6B8FA3', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: true, display_order: 8, created_at: '' },
  { id: '9', name: 'Lagoon Teal', hex_code: '#008080', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: true, display_order: 9, created_at: '' },
  { id: '10', name: 'Evening Sky', hex_code: '#4A5568', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 10, created_at: '' },
  { id: '11', name: 'Deep Navy', hex_code: '#1B2A4A', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 11, created_at: '' },
  { id: '12', name: 'Seafoam', hex_code: '#7CB9A8', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 12, created_at: '' },
  { id: '13', name: 'Cobalt Dream', hex_code: '#1E3A5F', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 13, created_at: '' },
  { id: '14', name: 'Blue Horizon', hex_code: '#5B7B8A', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 14, created_at: '' },
  
  // ── Nature Palette ──────────────────────────────
  { id: '15', name: 'Forest Green', hex_code: '#228B22', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: true, display_order: 15, created_at: '' },
  { id: '16', name: 'Sage Mist', hex_code: '#9DC183', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 16, created_at: '' },
  { id: '17', name: 'Olive Grove', hex_code: '#808000', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 17, created_at: '' },
  { id: '18', name: 'Moss Green', hex_code: '#5A7D5A', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 18, created_at: '' },
  { id: '19', name: 'Pistachio', hex_code: '#93C572', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 19, created_at: '' },
  { id: '20', name: 'Eucalyptus', hex_code: '#6A8D73', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 20, created_at: '' },
  { id: '21', name: 'Basil Green', hex_code: '#3D5C3A', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 21, created_at: '' },
  
  // ── Rich Accents ──────────────────────────────
  { id: '22', name: 'Burgundy Wine', hex_code: '#722F37', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: true, display_order: 22, created_at: '' },
  { id: '23', name: 'Terracotta', hex_code: '#E2725B', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 23, created_at: '' },
  { id: '24', name: 'Coral Sunset', hex_code: '#FF6F61', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 24, created_at: '' },
  { id: '25', name: 'Crimson Rose', hex_code: '#B22222', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 25, created_at: '' },
  { id: '26', name: 'Rustic Red', hex_code: '#A0522D', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 26, created_at: '' },
  { id: '27', name: 'Mahogany', hex_code: '#8B4513', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 27, created_at: '' },
  
  // ── Pastel Dreams ──────────────────────────────
  { id: '28', name: 'Lavender Mist', hex_code: '#E6E6FA', collection: 'Purples', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 28, created_at: '' },
  { id: '29', name: 'Muted Plum', hex_code: '#614051', collection: 'Purples', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 29, created_at: '' },
  { id: '30', name: 'Blush Pink', hex_code: '#F8C8C8', collection: 'Pinks', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 30, created_at: '' },
  { id: '31', name: 'Powder Blue', hex_code: '#B0C4DE', collection: 'Blues', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 31, created_at: '' },
  { id: '32', name: 'Mint Cream', hex_code: '#C8E6D9', collection: 'Greens', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 32, created_at: '' },
  { id: '33', name: 'Lilac', hex_code: '#C8A2C8', collection: 'Purples', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 33, created_at: '' },
  { id: '34', name: 'Baby Pink', hex_code: '#F4C2C2', collection: 'Pinks', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 34, created_at: '' },
  
  // ── Sunlight Series ──────────────────────────────
  { id: '35', name: 'Mustard Gold', hex_code: '#FFDB58', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 35, created_at: '' },
  { id: '36', name: 'Soft Peach', hex_code: '#FFDAB9', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 36, created_at: '' },
  { id: '37', name: 'Sunflower', hex_code: '#FFC72C', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 37, created_at: '' },
  { id: '38', name: 'Honey Glow', hex_code: '#E8A317', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 38, created_at: '' },
  { id: '39', name: 'Lemon Zest', hex_code: '#FFF44F', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 39, created_at: '' },
  { id: '40', name: 'Apricot', hex_code: '#FBCEB1', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 40, created_at: '' },
  
  // ── Urban Modern ──────────────────────────────
  { id: '41', name: 'Charcoal Grey', hex_code: '#36454F', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: true, display_order: 41, created_at: '' },
  { id: '42', name: 'Slate Blue', hex_code: '#6A5ACD', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 42, created_at: '' },
  { id: '43', name: 'Graphite', hex_code: '#383838', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 43, created_at: '' },
  { id: '44', name: 'Steel Grey', hex_code: '#71797E', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 44, created_at: '' },
  { id: '45', name: 'Anthracite', hex_code: '#293133', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 45, created_at: '' },
  { id: '46', name: 'Smoke Grey', hex_code: '#B0B5B9', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 46, created_at: '' },
  
  // ── Pure Collection ──────────────────────────────
  { id: '47', name: 'Pure White', hex_code: '#FFFFFF', collection: 'Whites', collection_type: 'Pure Collection', image_url: null, featured: true, display_order: 47, created_at: '' },
  { id: '48', name: 'Soft Pearl', hex_code: '#EBF2F2', collection: 'Whites', collection_type: 'Pure Collection', image_url: null, featured: false, display_order: 48, created_at: '' },
  { id: '49', name: 'Crisp White', hex_code: '#F8F9FA', collection: 'Whites', collection_type: 'Pure Collection', image_url: null, featured: false, display_order: 49, created_at: '' },
  { id: '50', name: 'Off White', hex_code: '#FAF9F6', collection: 'Whites', collection_type: 'Pure Collection', image_url: null, featured: false, display_order: 50, created_at: '' },
  
  // ── Earthy Tones ──────────────────────────────
  { id: '51', name: 'Clay Brown', hex_code: '#B85D3F', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 51, created_at: '' },
  { id: '52', name: 'Saddle Brown', hex_code: '#8B4513', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 52, created_at: '' },
  { id: '53', name: 'Chestnut', hex_code: '#954535', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 53, created_at: '' },
  { id: '54', name: 'Warm Cocoa', hex_code: '#7B5B3A', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 54, created_at: '' },
  { id: '55', name: 'Sand Dune', hex_code: '#C4A484', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 55, created_at: '' },
  
  // ── Jewel Tones ──────────────────────────────
  { id: '56', name: 'Emerald Green', hex_code: '#50C878', collection: 'Greens', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 56, created_at: '' },
  { id: '57', name: 'Sapphire Blue', hex_code: '#0F52BA', collection: 'Blues', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 57, created_at: '' },
  { id: '58', name: 'Ruby Red', hex_code: '#9B111E', collection: 'Reds', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 58, created_at: '' },
  { id: '59', name: 'Amethyst', hex_code: '#9966CC', collection: 'Purples', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 59, created_at: '' },
  { id: '60', name: 'Topaz', hex_code: '#FFC87C', collection: 'Yellows', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 60, created_at: '' },
  { id: '61', name: 'Citrine', hex_code: '#E4D00A', collection: 'Yellows', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 61, created_at: '' },
  
  // ── Muted Pastels ──────────────────────────────
  { id: '62', name: 'Dusty Rose', hex_code: '#C9A9A9', collection: 'Pinks', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 62, created_at: '' },
  { id: '63', name: 'Faded Denim', hex_code: '#7A8B99', collection: 'Blues', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 63, created_at: '' },
  { id: '64', name: 'Mauve', hex_code: '#B784A7', collection: 'Purples', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 64, created_at: '' },
  { id: '65', name: 'Sage Green', hex_code: '#BCB88A', collection: 'Greens', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 65, created_at: '' },
  { id: '66', name: 'Blush', hex_code: '#DEB887', collection: 'Reds', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 66, created_at: '' },
  { id: '67', name: 'Storm Grey', hex_code: '#A0A0A0', collection: 'Greys', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 67, created_at: '' },
  { id: '68', name: 'Linen', hex_code: '#E8DCC8', collection: 'Neutrals', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 68, created_at: '' },

  // ── Classic Neutrals (more) ──────────────────────────────
  { id: '69', name: 'Bone White', hex_code: '#EFE6D8', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: false, display_order: 69, created_at: '' },
  { id: '70', name: 'Mushroom', hex_code: '#C2B8A3', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: false, display_order: 70, created_at: '' },
  { id: '71', name: 'Oatmeal', hex_code: '#D9CBB5', collection: 'Neutrals', collection_type: 'Classic Neutrals', image_url: null, featured: false, display_order: 71, created_at: '' },

  // ── Ocean Collection (more) ──────────────────────────────
  { id: '72', name: 'Aegean Blue', hex_code: '#3B6E8F', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 72, created_at: '' },
  { id: '73', name: 'Marine Teal', hex_code: '#167D7F', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 73, created_at: '' },
  { id: '74', name: 'Glacier Blue', hex_code: '#A9C6D6', collection: 'Blues', collection_type: 'Ocean Collection', image_url: null, featured: false, display_order: 74, created_at: '' },

  // ── Nature Palette (more) ──────────────────────────────
  { id: '75', name: 'Fern Green', hex_code: '#4F7942', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 75, created_at: '' },
  { id: '76', name: 'Juniper', hex_code: '#5B7065', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 76, created_at: '' },
  { id: '77', name: 'Willow Green', hex_code: '#98A869', collection: 'Greens', collection_type: 'Nature Palette', image_url: null, featured: false, display_order: 77, created_at: '' },

  // ── Rich Accents (more) ──────────────────────────────
  { id: '78', name: 'Brick Red', hex_code: '#A63A2E', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 78, created_at: '' },
  { id: '79', name: 'Garnet', hex_code: '#6E1423', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 79, created_at: '' },
  { id: '80', name: 'Wine Red', hex_code: '#5B0A18', collection: 'Reds', collection_type: 'Rich Accents', image_url: null, featured: false, display_order: 80, created_at: '' },

  // ── Pastel Dreams (more) ──────────────────────────────
  { id: '81', name: 'Cotton Candy', hex_code: '#F7C6D9', collection: 'Pinks', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 81, created_at: '' },
  { id: '82', name: 'Periwinkle', hex_code: '#C3CDE6', collection: 'Purples', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 82, created_at: '' },
  { id: '83', name: 'Vanilla Cream', hex_code: '#F5EACB', collection: 'Yellows', collection_type: 'Pastel Dreams', image_url: null, featured: false, display_order: 83, created_at: '' },

  // ── Sunlight Series (more) ──────────────────────────────
  { id: '84', name: 'Marigold', hex_code: '#EAA221', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 84, created_at: '' },
  { id: '85', name: 'Butterscotch', hex_code: '#D69C4F', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 85, created_at: '' },
  { id: '86', name: 'Golden Wheat', hex_code: '#E8C275', collection: 'Yellows', collection_type: 'Sunlight Series', image_url: null, featured: false, display_order: 86, created_at: '' },

  // ── Urban Modern (more) ──────────────────────────────
  { id: '87', name: 'Iron Grey', hex_code: '#4B4E52', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 87, created_at: '' },
  { id: '88', name: 'Pewter', hex_code: '#8E9192', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 88, created_at: '' },
  { id: '89', name: 'Concrete', hex_code: '#9C9C94', collection: 'Greys', collection_type: 'Urban Modern', image_url: null, featured: false, display_order: 89, created_at: '' },

  // ── Pure Collection (more) ──────────────────────────────
  { id: '90', name: 'Snow White', hex_code: '#FDFDFC', collection: 'Whites', collection_type: 'Pure Collection', image_url: null, featured: false, display_order: 90, created_at: '' },
  { id: '91', name: 'Alabaster', hex_code: '#EDEAE0', collection: 'Whites', collection_type: 'Pure Collection', image_url: null, featured: false, display_order: 91, created_at: '' },

  // ── Earthy Tones (more) ──────────────────────────────
  { id: '92', name: 'Terracotta Clay', hex_code: '#B5654A', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 92, created_at: '' },
  { id: '93', name: 'Umber', hex_code: '#6B4423', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 93, created_at: '' },
  { id: '94', name: 'Ochre', hex_code: '#C08A2E', collection: 'Browns', collection_type: 'Earthy Tones', image_url: null, featured: false, display_order: 94, created_at: '' },

  // ── Jewel Tones (more) ──────────────────────────────
  { id: '95', name: 'Peridot Green', hex_code: '#A8C63C', collection: 'Greens', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 95, created_at: '' },
  { id: '96', name: 'Rose Quartz', hex_code: '#E0A6A6', collection: 'Pinks', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 96, created_at: '' },
  { id: '97', name: 'Onyx', hex_code: '#2B2B2E', collection: 'Greys', collection_type: 'Jewel Tones', image_url: null, featured: false, display_order: 97, created_at: '' },

  // ── Muted Pastels (more) ──────────────────────────────
  { id: '98', name: 'Taupe Grey', hex_code: '#A79A8B', collection: 'Greys', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 98, created_at: '' },
  { id: '99', name: 'Sandstone', hex_code: '#C9AE86', collection: 'Browns', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 99, created_at: '' },
  { id: '100', name: 'Fog Blue', hex_code: '#A9B7C0', collection: 'Blues', collection_type: 'Muted Pastels', image_url: null, featured: false, display_order: 100, created_at: '' },
];

const browseBySpace = [
  {
    space: 'Living Room',
    desc: 'Warm neutrals and soft blues for inviting spaces',
    shades: ['#D4B896', '#D1C7BD', '#6B8FA3', '#FFFFF0'],
    // image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    image: '/LivingRoom.png',
  },
  {
    space: 'Bedroom',
    desc: 'Calming pastels and muted tones for peaceful retreat',
    shades: ['#E6E6FA', '#9DC183', '#EBF2F2', '#D1C7BD'],
    // image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    image: '/Bedrooom.png',
  },
  {
    space: 'Kitchen',
    desc: 'Fresh whites and subtle colours for any style',
    shades: ['#FFFFFF', '#EBF2F2', '#FFDB58', '#D4B896'],
    // image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    image: '/Kitchen.png',
  },
  {
    space: 'Exterior',
    desc: 'Weather-resistant shades for lasting curb appeal',
    shades: ['#FFFFF0', '#36454F', '#E2725B', '#228B22'],
    // image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    image: '/Exterior.png',
  },
];

const inspirationGallery = [
  { image: '/modernmini.png', label: 'Modern Minimalist' },
  { image: '/warmcontempoary.png', label: 'Warm Contemporary' },
  { image: '/serenebedroom.png', label: 'Serene Bedroom' },
  { image: '/classicinterior.png', label: 'Classic Exterior' },
];

export default function ShadesPage() {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  const shades = useMemo(() => {
  const filtered = selectedCollection
    ? STATIC_SHADES.filter((shade) => shade.collection_type === selectedCollection)
    : STATIC_SHADES;

  return [...filtered].sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
  );
}, [selectedCollection]);

  // When browsing "All Shades", break the 100-strong list into its own
  // collections instead of one undifferentiated grid — gives the page
  // rhythm and lets people jump straight to a collection instead of
  // scrolling past everything.
  const groupedShades = useMemo(() => {
    if (selectedCollection) return null;
    return collectionTypes
      .filter((c) => c.slug !== null)
      .map((c) => ({
        ...c,
        items: STATIC_SHADES.filter((s) => s.collection_type === c.slug).sort(
          (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [selectedCollection]);

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
      <section className="py-20 bg-white/40 backdrop-blur-sm border-b border-[#EDE6DA]/50 relative overflow-hidden">
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
              
               <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal mb-6 leading-none tracking-tight">
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
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* STICKY COLLECTION FILTERS */}
      <section className="bg-[#2D2D2D] py-4 sticky top-[72px] z-40 shadow-lg border-b border-black/10">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center gap-4">
          <div className="text-white/40 border-r border-white/10 pr-3 hidden sm:flex items-center gap-1.5 shrink-0 font-inter">
            <SlidersHorizontal className="w-4 h-4 text-[#C4704B]" />
            <span className="text-[10px] uppercase font-black tracking-widest text-gray-300">Filters</span>
          </div>
          <div className="flex items-center overflow-x-auto gap-2 scrollbar-hide flex-1 py-0.5 font-inter">
            {collectionTypes.map((c) => {
              const isSelected = selectedCollection === c.slug;
              return (
                <button
                  key={c.name}
                  onClick={() => setSelectedCollection(c.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-300 ${
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

      {/* SHADES INTERACTIVE ENGINE GRID */}
      <section className="py-16 relative">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EDE6DA]/60 font-inter">
            <p className="text-sm font-medium text-charcoal-muted">
              Showing <span className="text-charcoal font-bold">{shades.length}</span> signature shade{shades.length !== 1 ? 's' : ''}
            </p>
            <Link href="/assistance" className="text-xs font-black text-[#C4704B] uppercase tracking-widest hover:text-[#8C6478] flex items-center gap-1.5 group transition-colors">
              <Palette className="w-4 h-4" /> Need matching advice? <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Jump-to-collection chips — only shown in the "All Shades" view, so a
              100-shade wall never feels like the only option is endless scrolling */}
          {groupedShades && (
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-8 -mt-2 font-inter">
              {groupedShades.map((c) => (
                <a
                  key={c.slug}
                  href={`#collection-${c.slug}`}
                  className="px-3.5 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap bg-[#F7F3EC] text-charcoal-muted hover:bg-[#F3E7C9] hover:text-charcoal transition-colors"
                >
                  {c.name} <span className="opacity-50">({c.items.length})</span>
                </a>
              ))}
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {shades.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-32 text-center max-w-md mx-auto font-inter"
              >
                <Palette className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-1 text-charcoal">No Swatches Found</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                  No shades match this collection right now. Try switching back to All Shades.
                </p>
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
                        onClick={() => setSelectedCollection(c.slug)}
                        className="text-[10px] uppercase tracking-widest font-bold text-charcoal-muted hover:text-[#C4704B] transition-colors"
                      >
                        View all {c.items.length} &rarr;
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                      {c.items.map((shade) => (
                        <ShadeCard key={shade.id} shade={shade} size="md" />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
              >
                {shades.map((shade) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={shade.id}
                  >
                    <ShadeCard shade={shade} size="md" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* SPACE INTERACTIVE SWATCH MAPPER */}
      <section className="py-24 bg-[#FDFBF7]/40 border-t border-b border-[#EDE6DA]/50 relative">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-3 h-[1.5px]" style={{ background: '#8C6478' }} />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6478] font-black font-inter">By Space Architecture</span>
              <span className="w-3 h-[1.5px]" style={{ background: '#8C6478' }} />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal tracking-tight">Formulated Tones for Every Room</h2>
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
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.08)] ring-2 ring-white cursor-help relative group/swatch shrink-0"
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
      <section className="py-24 relative">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-3 h-[1.5px]" style={{ background: '#C4704B' }} />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C4704B] font-black font-inter">Atmosphere Inspiration</span>
              <span className="w-3 h-[1.5px]" style={{ background: '#C4704B' }} />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal tracking-tight">Real Space Transformation Maps</h2>
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
          className="max-w-[1000px] mx-auto text-center rounded-3xl p-12 sm:p-16 shadow-2xl relative overflow-hidden group"
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
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-none max-w-2xl mx-auto relative z-10">Can't Decide on Tone Swatches?</h2>
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