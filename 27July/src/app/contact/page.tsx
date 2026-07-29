// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { MapPin, Phone, Mail, Clock, ArrowRight, Menu, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Footer } from '@/src/components/Footer';

// const contactInfo = [
//   { icon: Phone, label: 'Phone', value: '+91-7502-0000-79', href: 'tel:+917502000079' },
//   { icon: Mail, label: 'Email', value: 'info@colorsomepaints.com', href: 'mailto:info@colorsomepaints.com' },
//   { icon: Clock, label: 'Hours', value: 'Mon — Sat: 9:00 AM — 7:00 PM', href: null },
// ];

// const offices = [
//   {
//     city: 'Pune Office',
//     address:
//       'C-403, Akshay Villa, Ram Nagari, Behind D-Mart, Mumbai-Pune Bypass Road, Ambegaon Budruk, Katraj, Pune 411046',
//     phone: '+91-7502-0000-79',
//   },
// ];

// export default function ContactPage() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     onScroll();

//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const navText = 'text-[#2D2D2D]';
//   const navMuted = 'text-[#6B6B6B]';
//   const navBg = scrolled
//     ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
//     : 'bg-white/95 backdrop-blur-md border-b border-gray-100';

//   return (
//     <div className="bg-warm-white min-h-screen pt-[72px]">
//       <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
//         <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[72px]">
//     <Link href="/" className="flex items-center gap-4 flex-shrink-0 min-w-[260px]">
//       <div className="w-[62px] h-[62px] rounded-2xl flex items-center justify-center bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-[#E8E2D8] p-2 shrink-0">
//         <Image
//           src="/Ara_Weather_Coat.png"
//           alt="Colorsome logo"
//           width={62}
//           height={62}
//           className="w-full h-full object-contain scale-[1.08]"
//         />
//       </div>

//       <div className="flex flex-col justify-center leading-none">
//         <div className="flex items-start">
//           <span
//             className={`transition-colors duration-300 ${navText}`}
//             style={{
//               fontFamily: 'var(--font-cormorant)',
//               fontSize: '2rem',
//               lineHeight: '0.82',
//               fontWeight: 700,
//               letterSpacing: '-0.055em',
//               textTransform: 'uppercase',
//             }}
//           >
//             COLORSOME
//           </span>

//           <span
//             className={`transition-colors duration-300 ${navText}`}
//             style={{
//               fontFamily: 'var(--font-inter)',
//               fontSize: '0.48rem',
//               lineHeight: 1,
//               fontWeight: 700,
//               marginLeft: '0.18rem',
//               marginTop: '0.12rem',
//               letterSpacing: '0.04em',
//             }}
//           >
//             TM
//           </span>
//         </div>

//         {/* <span
//           className={`mt-1.5 transition-colors duration-300 ${navMuted}`}
//           style={{
//             fontFamily: 'var(--font-inter)',
//             fontSize: '0.82rem',
//             lineHeight: 1,
//             fontWeight: 700,
//             letterSpacing: '0.34em',
//             textTransform: 'uppercase',
//           }}
//         >
//           Paints
//         </span> */}
//       </div>
//     </Link>

//     <nav className="hidden md:flex items-center">
//   <div className="flex items-center gap-1 rounded-full border border-black/6 bg-white/72 backdrop-blur-md px-2 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
//     {[['Home', '/'], ['Products', '/products'], ['Shades', '/shades'], ['Assistance', '/assistance'], ['About', '/about'], ['Contact', '/contact']].map(([label, href]) => {
//       const isActive = label === 'Contact';

//       return (
//         <Link
//           key={label}
//           href={href}
//           className={`relative rounded-full px-4 py-2.5 transition-all duration-200 ${
//             isActive
//               ? 'text-[#2D2D2D] bg-[#F3E7C9]'
//               : `${navMuted} hover:text-[#2D2D2D] hover:bg-black/[0.04]`
//           }`}
//           style={{
//             fontFamily: 'var(--font-inter)',
//             fontSize: '0.92rem',
//             fontWeight: isActive ? 600 : 500,
//             letterSpacing: '-0.01em',
//             lineHeight: 1,
//           }}
//         >
//           {label}
//         </Link>
//       );
//     })}
//   </div>
// </nav>

//     <div className="flex items-center gap-3">
//       <Link
//         href="/assistance"
//         className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-white flex-shrink-0"
//         style={{ background: '#2D2D2D' }}
//       >
//         <Phone className="w-4 h-4" /> Book Assistance
//       </Link>

//       <button
//         className={`md:hidden p-2 rounded-lg transition-colors ${navText}`}
//         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         aria-label="Menu"
//       >
//         {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//       </button>
//     </div>
//   </div>

//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -8 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -8 }}
//               className="md:hidden bg-white border-t border-gray-100 shadow-xl px-6 py-4 space-y-3"
//             >
//               {[
//                 ['Home', '/'],
//                 ['Products', '/products'],
//                 ['Shades', '/shades'],
//                 ['Assistance', '/assistance'],
//                 ['About', '/about'],
//                 ['Contact', '/contact'],
//               ].map(([label, href]) => (
//                 <Link
//                   key={label}
//                   href={href}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="block text-sm font-medium text-charcoal hover:text-gold transition-colors py-2 border-b border-gray-50"
//                 >
//                   {label}
//                 </Link>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>

//       <section className="pt-16 md:pt-20 pb-10 md:pb-12 bg-white border-b border-warm-gray">
//         <div className="container-wide">
//           <div className="max-w-3xl">
//             <p className="section-label">Get in Touch</p>
//             <h1 className="hero-title mb-5">Contact Us</h1>
//             <p className="section-subtitle max-w-2xl">
//               Have questions about our products or services? Need expert advice for your painting
//               project? We&apos;re here to help.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-12 md:py-16">
//         <div className="container-wide">
//           <div className="grid lg:grid-cols-3 gap-6 mb-10 md:mb-12">
//             {contactInfo.map((c) => (
//               <div key={c.label} className="card-premium p-8 text-center">
//                 <div className="w-14 h-14 mx-auto rounded-xl bg-gold/10 flex items-center justify-center mb-5">
//                   <c.icon className="w-7 h-7 text-gold" />
//                 </div>
//                 <h3 className="card-title mb-2">{c.label}</h3>
//                 {c.href ? (
//                   <a href={c.href} className="text-charcoal-muted hover:text-gold transition-colors text-sm">
//                     {c.value}
//                   </a>
//                 ) : (
//                   <p className="text-charcoal-muted text-sm">{c.value}</p>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="text-center mb-8 md:mb-10">
//             <p className="section-label">Our Office</p>
//             <h2 className="section-title">Visit Us</h2>
//           </div>

//           <div className="max-w-3xl mx-auto">
//             {offices.map((o) => (
//               <div key={o.city} className="card-premium p-6 md:p-8">
//                 <h3 className="card-title mb-4">{o.city}</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-start gap-3">
//                     <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
//                     <p className="text-sm text-charcoal-muted leading-relaxed">{o.address}</p>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Phone className="w-4 h-4 text-gold shrink-0" />
//                     <a
//                       href={`tel:${o.phone}`}
//                       className="text-sm text-charcoal-muted hover:text-gold transition-colors"
//                     >
//                       {o.phone}
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-12 md:py-16 bg-charcoal">
//         <div className="container-wide">
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: 'Product Questions?',
//                 desc: 'Browse our catalog or ask for recommendations',
//                 link: '/products',
//                 label: 'View Products',
//               },
//               {
//                 title: 'Need Expert Help?',
//                 desc: 'Book a free consultation with our paint experts',
//                 link: '/assistance',
//                 label: 'Book Consultation',
//               },
//               {
//                 title: 'Looking for Inspiration?',
//                 desc: 'Explore our curated shade collections',
//                 link: '/shades',
//                 label: 'Browse Shades',
//               },
//             ].map((item) => (
//               <div key={item.title} className="text-center">
//                 <h3 className="card-title-light mb-3">{item.title}</h3>
//                 <p className="text-white/50 text-sm mb-4">{item.desc}</p>
//                 <Link href={item.link} className="inline-flex items-center gap-2 text-gold text-sm hover:underline">
//                   {item.label} <ArrowRight className="w-3 h-3" />
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <Footer/>
//     </div>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { MapPin, Phone, Mail, Clock, ArrowRight, Menu, X, Sparkles, Building2, ExternalLink, Package, Palette, Eye } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Footer } from '@/src/components/Footer';

// const fadeInUp = {
//   hidden: { opacity: 0, y: 25 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } }
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1 }
//   }
// };

// const contactInfo = [
//   { icon: Phone, label: 'Phone Desk', value: '+91-7502-0000-79', sub: 'Mon — Sat, 9 AM — 7 PM', href: 'tel:+917502000079' },
//   { icon: Mail, label: 'Email Channels', value: 'info@colorsomepaints.com', sub: 'Response within 12 hours', href: 'mailto:info@colorsomepaints.com' },
//   { icon: Clock, label: 'Headquarters Hours', value: '09:00 AM — 07:00 PM', sub: 'Sunday: Closed desk', href: null },
// ];

// const offices = [
//   {
//     city: 'Pune Experience Center',
//     tagline: 'Flagship Studio & Corporate Office',
//     address: 'C-403, Akshay Villa, Ram Nagari, Behind D-Mart, Mumbai-Pune Bypass Road, Ambegaon Budruk, Katraj, Pune 411046',
//     phone: '+91-7502-0000-79',
//   },
// ];

// export default function ContactPage() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     onScroll();
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const navBg = scrolled
//     ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
//     : 'bg-white/95 backdrop-blur-md border-b border-gray-100';

//   return (
//     <div className="bg-warm-white min-h-screen pt-[72px] text-[#2D2D2D] overflow-x-hidden font-sans relative">
//       {/* Ambient glass blur spots */}
//       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-gold/10 via-transparent to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
//       <div className="absolute bottom-[200px] left-0 w-[450px] h-[450px] bg-gradient-to-tr from-[#F3E7C9]/30 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

//       {/* HEADER */}
//       <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
//         <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[72px]">
//           <Link href="/" className="flex items-center gap-4 flex-shrink-0 min-w-[260px]">
//             <div className="w-[62px] h-[62px] rounded-2xl flex items-center justify-center bg-white shadow-sm border border-[#E8E2D8] p-2 shrink-0">
//               <Image
//                 src="/Ara_Weather_Coat.png"
//                 alt="Colorsome logo"
//                 width={62}
//                 height={62}
//                 className="w-full h-full object-contain scale-[1.08]"
//               />
//             </div>
//             <div className="flex flex-col justify-center leading-none">
//               <div className="flex items-start tracking-tight">
//                 <span className="font-serif text-3xl font-bold uppercase tracking-tighter text-[#2D2D2D]">
//                   COLORSOME
//                 </span>
//                 <span className="text-[10px] font-bold ml-1 mt-1 text-[#2D2D2D]">
//                   TM
//                 </span>
//               </div>
//             </div>
//           </Link>

//           <nav className="hidden md:flex items-center">
//             <div className="flex items-center gap-1 rounded-full border border-black/5 bg-white/70 backdrop-blur-md px-2 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
//               {[['Home', '/'], ['Products', '/products'], ['Shades', '/shades'], ['Assistance', '/assistance'], ['About', '/about'], ['Contact', '/contact']].map(([label, href]) => {
//                 const isActive = label === 'Contact';
//                 return (
//                   <Link
//                     key={label}
//                     href={href}
//                     className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
//                       isActive ? 'text-[#2D2D2D] bg-[#F3E7C9]' : 'text-[#6B6B6B] hover:text-[#2D2D2D] hover:bg-black/[0.04]'
//                     }`}
//                   >
//                     {label}
//                   </Link>
//                 );
//               })}
//             </div>
//           </nav>

//           <div className="flex items-center gap-3">
//             <Link href="/assistance" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-white flex-shrink-0 bg-[#2D2D2D] hover:bg-[#404040]">
//               <Phone className="w-4 h-4" /> Book Assistance
//             </Link>
//             <button className="md:hidden p-2 rounded-lg text-[#2D2D2D]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
//               {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="md:hidden bg-white border-t border-gray-100 shadow-xl px-6 py-4 space-y-3">
//               {[ ['Home', '/'], ['Products', '/products'], ['Shades', '/shades'], ['Assistance', '/assistance'], ['About', '/about'], ['Contact', '/contact'] ].map(([label, href]) => (
//                 <Link key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#2D2D2D] hover:text-gold transition-colors py-2 border-b border-gray-50">
//                   {label}
//                 </Link>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>

//       {/* HERO TITLE SECTION */}
//       <section className="pt-20 pb-12 bg-gradient-to-b from-white to-transparent">
//         <div className="max-w-[1200px] mx-auto px-6">
//           <motion.div className="max-w-3xl" initial="hidden" animate="visible" variants={fadeInUp}>
//             <div className="inline-flex items-center gap-2 bg-gold/10 text-gold-dark font-semibold text-xs tracking-wider uppercase px-3 py-1 rounded-full mb-5">
//               <Sparkles className="w-3.5 h-3.5 text-gold" /> We're Responsive
//             </div>
//             <span className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Connect & Synchronize</span>
//             <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#2D2D2D] mb-6 leading-[1.1] font-light">
//               Let's Bring Your <br />
//               <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-700">Palettes to Life</span>
//             </h1>
//             <p className="text-lg md:text-xl text-[#6B6B6B] leading-relaxed max-w-2xl font-light">
//               Have nuanced architectural questions or need bespoke deployment coordination guidelines? Reach out directly to our central assistance desks below.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* INFO BLOCK CHANNELS */}
//       <section className="pb-20">
//         <div className="max-w-[1200px] mx-auto px-6">
//           <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
//             {contactInfo.map((c) => (
//               <motion.div key={c.label} variants={fadeInUp} className="bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:bg-white group">
//                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-6 shadow-inner border border-gold/10 text-gold group-hover:scale-105 transition-transform">
//                   <c.icon className="w-6 h-6" />
//                 </div>
//                 <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1.5">{c.label}</span>
//                 {c.href ? (
//                   <a href={c.href} className="font-serif text-xl font-medium text-[#2D2D2D] hover:text-gold transition-colors inline-flex items-center gap-1.5 break-all">
//                     {c.value} <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
//                   </a>
//                 ) : (
//                   <p className="font-serif text-xl font-medium text-[#2D2D2D]">{c.value}</p>
//                 )}
//                 <p className="text-xs text-[#6B6B6B] mt-2 font-light">{c.sub}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* VISIT / ASYMMETRIC MAP DIRECTORY */}
//       <section className="py-24 bg-[#F9F6F0] border-t border-b border-gray-100">
//         <div className="max-w-[1200px] mx-auto px-6">
//           <div className="grid lg:grid-cols-12 gap-12 items-stretch">
            
//             {/* Left Content Card */}
//             <motion.div className="lg:col-span-6 flex flex-col justify-center space-y-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
//               <div>
//                 <span className="text-xs uppercase tracking-widest text-gold font-bold mb-2 block">Our Presence</span>
//                 <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#2D2D2D] tracking-tight leading-tight">Visit Our Flagship Experience Center</h2>
//               </div>

//               <div className="space-y-6">
//                 {offices.map((o) => (
//                   <div key={o.city} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group">
//                     <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
//                       <Building2 className="w-24 h-24 text-[#2D2D2D]" />
//                     </div>
//                     <div className="inline-flex items-center gap-1.5 bg-[#F3E7C9] text-[#2D2D2D] font-semibold text-xs px-3 py-1 rounded-full mb-4">
//                       <MapPin className="w-3.5 h-3.5" /> {o.city}
//                     </div>
//                     <h3 className="font-serif text-2xl font-semibold mb-2 text-[#2D2D2D]">{o.tagline}</h3>
//                     <p className="text-sm md:text-base text-[#6B6B6B] leading-relaxed mb-6 font-light">{o.address}</p>
                    
//                     <div className="pt-5 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
//                       <a href={`tel:${o.phone}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D2D2D] hover:text-gold transition-colors">
//                         <Phone className="w-4 h-4 text-gold" /> {o.phone}
//                       </a>
//                       <a 
//                         href="https://maps.google.com" 
//                         target="_blank" 
//                         rel="noopener noreferrer" 
//                         className="inline-flex items-center gap-1 text-xs text-gold uppercase font-bold tracking-wider hover:underline"
//                       >
//                         Open Map Directions <ArrowRight className="w-3 h-3" />
//                       </a>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Right Architectural Showcase Image Container */}
//             <motion.div 
//               className="lg:col-span-6 flex flex-col"
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.7 }}
//             >
//               <div className="relative rounded-3xl shadow-xl overflow-hidden aspect-[4/3] md:aspect-auto h-full w-full group flex-1 min-h-[400px]">
//                 <Image
//                   src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
//                   alt="Minimalist design workspace interior building architecture view"
//                   fill
//                   sizes="(max-w-1024px) 100vw, 50vw"
//                   priority
//                   className="object-cover transition-transform duration-700 group-hover:scale-105"
//                   unoptimized
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
//                 {/* Overlay Badge Context element */}
//                 <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-black/70 text-white rounded-2xl p-5 border border-white/10 flex items-center justify-between z-10">
//                   <div>
//                     <p className="text-xs text-gray-300 font-light">Located in Ambegaon Budruk</p>
//                     <p className="font-serif text-sm font-medium tracking-wide">Right Behind D-Mart Exit</p>
//                   </div>
//                   <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center text-white shadow-md shrink-0">
//                     <MapPin className="w-5 h-5" />
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//           </div>
//         </div>
//       </section>

//       {/* MATRIX CONNECT NAVIGATION */}
//       <section className="py-24 bg-white">
//         <div className="max-w-[1200px] mx-auto px-6">
//           <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
//             {[
//               {
//                 title: 'Product Inquiries?',
//                 desc: 'Browse our complete catalog or ask our design lab for personalized suggestions.',
//                 link: '/products',
//                 label: 'View Master Catalog',
//               },
//               {
//                 title: 'Need Direct Art Direction?',
//                 desc: 'Secure a premium, fully customized timeline walkthrough consultation blueprint.',
//                 link: '/assistance',
//                 label: 'Book Free Consultation',
//               },
//               {
//                 title: 'Looking for Inspiration?',
//                 desc: 'Explore highly curated tone architectures inside our modern shade books.',
//                 link: '/shades',
//                 label: 'Browse Color Shades',
//               },
//             ].map((item) => (
//               <motion.div key={item.title} variants={fadeInUp} className="text-left bg-warm-white/30 rounded-2xl p-8 border border-gray-100/60 hover:bg-warm-white/60 transition-colors">
//                 <h3 className="font-serif text-xl font-medium text-[#2D2D2D] mb-3 tracking-tight">{item.title}</h3>
//                 <p className="text-[#6B6B6B] text-sm mb-6 leading-relaxed font-light">{item.desc}</p>
//                 <Link href={item.link} className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D2D2D] hover:text-gold transition-colors group">
//                   {item.label} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowRight, Menu, X, Sparkles, Building2, ExternalLink, Package, Palette, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const contactInfo = [
  { icon: Phone, label: 'Phone Desk', value: '+91-75020-00079', sub: 'Mon — Sat, 9 AM — 7 PM', href: 'tel:+917502000079', color: '#C4704B' },
  { icon: Mail, label: 'Email Channels', value: 'info@colorsomepaints.com', sub: 'Response within 12 hours', href: 'mailto:info@colorsomepaints.com', color: '#2C3E50' },
  { icon: Clock, label: 'Headquarters Hours', value: '09:00 AM — 07:00 PM', sub: 'Sunday: Closed desk', href: null, color: '#C9A858' },
];

const offices = [
  {
    city: 'Pune Experience Center',
    tagline: 'Flagship Studio & Corporate Office',
    address: 'C-403, Akshay Villa, Ram Nagari, Behind D-Mart, Mumbai-Pune Bypass Road, Ambegaon Budruk, Katraj, Pune 411046',
    phone: '+91-7502-0000-79',
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-[72px] text-[#2D2D2D] overflow-x-hidden font-sans relative selection:bg-[#F3E7C9]">

      {/* BACKGROUND GLOWS & SOPHISTICATED GRID PATTERN */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Subtle Geometric Mesh Pattern */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
             style={{ 
               backgroundImage: `radial-gradient(#2D2D2D 1px, transparent 1px), linear-gradient(to right, #2D2D2D 1px, transparent 1px), linear-gradient(to bottom, #2D2D2D 1px, transparent 1px)`,
               backgroundSize: '40px 40px, 200px 200px, 200px 200px'
             }} 
        />
        
        {/* Ambient Color Drops */}
        <div className="absolute top-[5%] -left-[10%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] rounded-full blur-[120px] opacity-25" style={{ background: `radial-gradient(circle, ${BRAND.pink} 0%, transparent 70%)` }} />
        <div className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] rounded-full blur-[120px] opacity-20" style={{ background: `radial-gradient(circle, ${BRAND.orange} 0%, transparent 70%)` }} />
        <div className="absolute bottom-[10%] left-[5%] w-[50vw] h-[50vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[100px] opacity-25" style={{ background: `radial-gradient(circle, ${BRAND.pink} 0%, transparent 70%)` }} />
      </div>

      <Header />

      {/* ── HERO ── */}
      <section className="pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 relative overflow-hidden">
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
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <motion.div className="lg:col-span-8" initial="hidden" animate="visible" variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 bg-[#F3E7C9] text-[#2D2D2D] font-black text-[10px] tracking-wider uppercase px-3 py-1 rounded-full mb-4 sm:mb-5" style={{ fontFamily: 'var(--font-inter)' }}>
                <Sparkles className="w-3.5 h-3.5 text-[#C4704B]" /> We're Responsive
              </div>
              <span className="block text-[10px] uppercase tracking-widest font-black text-gray-400 mb-2" style={{ fontFamily: 'var(--font-inter)' }}>Connect & Synchronize</span>
              <h1
                className="font-serif font-bold tracking-tight text-[#2D2D2D] mb-4 sm:mb-6 leading-none"
                style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)' }}
              >
                Let's Bring Your <br />
                <span className="bg-gradient-to-r from-[#8C6478] to-[#C4704B] bg-clip-text text-transparent">
                  Palettes to Life
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-[#2D2D2D]/70 leading-relaxed max-w-2xl mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
                Have architectural questions or need bespoke deployment coordination? Reach out directly to our central assistance desks below.
              </p>
              <div className="flex flex-wrap gap-6 sm:gap-10">
                {[
                  { value: '12hr', label: 'Avg. Response Time' },
                  { value: '6 Days', label: 'Desk Availability' },
                  { value: 'Pan-India', label: 'Service Coverage' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2D2D]">{s.value}</p>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mt-1" style={{ fontFamily: 'var(--font-inter)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Decorative visual, fills the empty right column on wide screens */}
            <motion.div
              className="hidden lg:flex lg:col-span-4 items-center justify-center relative h-[320px]"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.div
                className="absolute w-56 h-56 rounded-full blur-[70px]"
                style={{ background: `radial-gradient(circle, ${BRAND.orange}30 0%, transparent 70%)` }}
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative w-44 h-44 rounded-full bg-white border border-[#EDE6DA] shadow-xl flex items-center justify-center">
                <Phone className="w-14 h-14 text-[#C4704B]/25" />
              </div>
              {[
                { Icon: Mail, top: '4%', left: '58%', color: '#2C3E50' },
                { Icon: Clock, top: '68%', left: '62%', color: '#C9A858' },
                { Icon: MapPin, top: '60%', left: '4%', color: '#8B9E7E' },
              ].map(({ Icon, top, left, color }, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 rounded-2xl bg-white border shadow-lg flex items-center justify-center"
                  style={{ top, left, borderColor: `${color}30` }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ── */}
      <section className="py-6 sm:py-12 md:py-16 relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {contactInfo.map((c) => (
              <motion.div
                key={c.label}
                variants={fadeInUp}
                whileHover={{ y: -4, scale: 1.01 }}
                className="relative bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-xl hover:bg-white overflow-hidden group"
                style={{ borderColor: `${c.color}20` }}
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 group-hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${c.color}30, ${c.color}10)`, color: c.color, boxShadow: `0 8px 20px ${c.color}1A` }}
                >
                  <c.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-2" style={{ fontFamily: 'var(--font-inter)' }}>{c.label}</span>
                {c.href ? (
                  <a href={c.href} className="font-serif text-lg sm:text-xl font-bold text-[#2D2D2D] transition-colors inline-flex items-start gap-1.5 break-all" style={{ color: undefined }}>
                    <span className="break-all group-hover:opacity-80 transition-opacity">{c.value}</span>
                    <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                  </a>
                ) : (
                  <p className="font-serif text-lg sm:text-xl font-bold text-[#2D2D2D]">{c.value}</p>
                )}
                <p className="text-xs text-[#6B6B6B] mt-2 leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>{c.sub}</p>
                <div className="h-[2px] w-6 group-hover:w-full transition-all duration-500 rounded-full mt-4" style={{ background: c.color }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NEW CONSOLIDATED EXPERIENCE CENTER MAP SECTION ── */}
      <section className="py-12 sm:py-20 md:py-24 relative overflow-hidden">
        {/* Ambient glow, consistent with the rest of the site's section treatment */}
        <div className="absolute top-1/4 -right-24 w-[420px] h-[420px] rounded-full blur-[110px] pointer-events-none opacity-30" style={{ background: `radial-gradient(circle, ${BRAND.orange} 0%, transparent 70%)` }} />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">

          {/* Section Heading */}
          <motion.div className="mb-8 md:mb-12" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-3 h-[1.5px]" style={{ background: '#C4704B' }} />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C4704B] font-black" style={{ fontFamily: 'var(--font-inter)' }}>Our Presence</span>
            </div>
            <h2 className="font-serif font-bold text-[#2D2D2D] tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Visit Our Flagship Experience Center
            </h2>
          </motion.div>

          {/* Clean Unified Layout Matrix */}
          {offices.map((o) => (
            <motion.div key={o.city} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>

              {/* Left Column: Image Card Card (With Embeded Mobile Info) */}
              <motion.div variants={fadeInUp} whileHover={{ y: -4 }} className="lg:col-span-7 w-full transition-transform">
                <div className="bg-white rounded-3xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.09)] border border-[#EDE6DA]/70 transition-shadow duration-400 group">
                  
                  {/* The visual photo segment */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                    <Image
                      src="/aboutpage.png"
                      alt="Colorsome HQ Office Building"
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Corner Map Indicator */}
                    <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between z-10" style={{ fontFamily: 'var(--font-inter)' }}>
                      <div>
                        <p className="text-[11px] text-gray-300 font-medium tracking-wide">Ambegaon Budruk</p>
                        <p className="font-serif text-sm sm:text-base font-bold mt-0.5">Right Behind D-Mart Exit</p>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8C6478] to-[#C4704B] flex items-center justify-center shadow-md">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* MOBILE & TABLET ONLY DIRECT ADDRESS AREA (Cleans up stacking duplicate loops) */}
                  <div className="p-6 block lg:hidden bg-white" style={{ fontFamily: 'var(--font-inter)' }}>
                    <div className="inline-flex items-center gap-1.5 bg-[#F3E7C9] text-[#2D2D2D] font-bold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md mb-3">
                      {o.city}
                    </div>
                    <h3 className="font-serif font-black text-xl text-[#2D2D2D] mb-2">{o.tagline}</h3>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed mb-5">{o.address}</p>
                    
                    <div className="pt-4 border-t border-[#EDE6DA]/60 flex flex-col gap-3">
                      <a href={`tel:${o.phone}`} className="inline-flex items-center gap-2.5 text-sm font-bold text-[#2D2D2D]">
                        <Phone className="w-4 h-4 text-[#C4704B]" /> {o.phone}
                      </a>
                      <a href="https://maps.google.com/?q=C-403+Akshay+Villa+Ram+Nagari+Ambegaon+Budruk+Katraj+Pune" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs uppercase font-black tracking-wider text-white bg-gradient-to-r from-[#C4704B] to-[#8C6478] shadow-md">
                        Get Navigation Routes <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>

              {/* Right Column: Sleek Dedicated Desktop Card Display */}
              <motion.div variants={fadeInUp} whileHover={{ y: -4 }} className="hidden lg:flex lg:col-span-5 h-full flex-col justify-between transition-transform">
                <div className="relative bg-white/90 backdrop-blur-sm border border-[#EDE6DA]/80 rounded-3xl p-8 xl:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] transition-shadow duration-400 h-full flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: `linear-gradient(90deg, #C4704B, #8C6478)` }} />
                  <div>
                    <div className="inline-flex items-center gap-2 bg-[#F3E7C9] text-[#2D2D2D] font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                      <span className="relative flex w-1.5 h-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4704B] opacity-75" />
                        <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-[#C4704B]" />
                      </span>
                      <Building2 className="w-3.5 h-3.5 text-[#C4704B]" /> Flagship HQ Location
                    </div>
                    <h3 className="font-serif font-bold text-2xl xl:text-3xl text-[#2D2D2D] leading-tight mb-4">
                      {o.tagline}
                    </h3>
                    <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                      {o.address}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#EDE6DA]/60 flex flex-col gap-4" style={{ fontFamily: 'var(--font-inter)' }}>
                    <a href={`tel:${o.phone}`} className="inline-flex items-center gap-3 text-sm font-bold text-[#2D2D2D] hover:text-[#C4704B] transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-[#FDFBF7] border border-[#EDE6DA] flex items-center justify-center shadow-sm">
                        <Phone className="w-4 h-4 text-[#C4704B]" />
                      </div>
                      {o.phone}
                    </a>
                    <a href="https://maps.google.com/?q=C-403+Akshay+Villa+Ram+Nagari+Ambegaon+Budruk+Katraj+Pune" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between p-4 rounded-2xl border border-[#C4704B]/30 text-sm font-bold text-[#C4704B] bg-[#C4704B]/[0.04] hover:bg-[#C4704B]/[0.08] transition-colors group">
                      <span>Launch Google Map Directions</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          ))}

        </div>
      </section>

      {/* ── NAVIGATION CARDS ── */}
      <section className="py-12 sm:py-20 md:py-24 relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                title: 'Product Inquiries?',
                desc: 'Browse our complete catalog or ask our design lab for personalized suggestions.',
                link: '/products',
                label: 'View Master Catalog',
                icon: Package,
                color: '#C4704B',
              },
              {
                title: 'Need Direct Art Direction?',
                desc: 'Secure a premium, fully customized timeline walkthrough consultation blueprint.',
                link: '/assistance',
                label: 'Book Free Consultation',
                icon: Palette,
                color: '#8C6478',
              },
              {
                title: 'Looking for Inspiration?',
                desc: 'Explore highly curated tone architectures inside our modern shade books.',
                link: '/shades',
                label: 'Browse Color Shades',
                icon: Eye,
                color: '#C9A858',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="group relative text-left bg-white/90 backdrop-blur-sm border rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-xl hover:bg-white transition-all duration-300 overflow-hidden"
                style={{ borderColor: `${item.color}20` }}
              >
                <item.icon
                  aria-hidden
                  className="pointer-events-none select-none absolute -bottom-4 -right-4 w-24 h-24 opacity-[0.06]"
                  style={{ color: item.color }}
                  strokeWidth={1.2}
                />
                <div
                  className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`, color: item.color, boxShadow: `0 8px 20px ${item.color}1A` }}
                >
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="relative z-10 font-serif text-lg sm:text-xl font-bold text-[#2D2D2D] mb-2 sm:mb-3 tracking-tight">{item.title}</h3>
                <p className="relative z-10 text-[#6B6B6B] text-sm mb-5 sm:mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>{item.desc}</p>
                <Link
                  href={item.link}
                  className="relative z-10 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-black text-[#2D2D2D] transition-colors group/link"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {item.label} <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" style={{ color: item.color }} />
                </Link>
                <div className="relative z-10 h-[2px] w-6 group-hover:w-full transition-all duration-500 rounded-full mt-4" style={{ background: item.color }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}