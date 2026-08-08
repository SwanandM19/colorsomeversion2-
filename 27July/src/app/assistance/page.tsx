// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Phone,
//   Mail,
//   CheckCircle,
//   Clock,
//   Shield,
//   Users,
//   Send,
//   Loader,
//   AlertCircle,
//   ArrowRight,
//   MessageCircle,
//   Palette,
//   ClipboardCheck,
//   FileText,
//   Menu,
//   X,
// } from 'lucide-react';
// import { submitConsultation } from '../../lib/supabase';
// import { Footer } from '@/src/components/Footer';

// const serviceProcess = [
//   { icon: MessageCircle, title: 'Request Consultation', desc: 'Fill out the form or call us to begin your painting journey' },
//   { icon: ClipboardCheck, title: 'Site Review', desc: 'Our expert visits your property to assess requirements' },
//   { icon: Palette, title: 'Recommendation', desc: 'Personalized shade and product recommendations' },
//   { icon: FileText, title: 'Quote', desc: 'Transparent, detailed pricing for your project' },
//   { icon: CheckCircle, title: 'Execution', desc: 'Professional support from start to finish' },
// ];

// const trustPoints = [
//   { icon: Users, title: 'Expert Guidance', desc: 'Experienced consultants who understand paints and finishes' },
//   { icon: Shield, title: 'Authentic Products', desc: 'Genuine Colorsome products with full warranty' },
//   { icon: CheckCircle, title: 'Clean Process', desc: 'Professional execution with minimal disruption' },
//   { icon: Clock, title: 'Timely Delivery', desc: 'Committed timelines and reliable service' },
// ];

// const faqs = [
//   { q: 'What does the consultation include?', a: 'Our free consultation includes site assessment, understanding your requirements, shade recommendations, product suggestions, and a detailed cost estimate. No obligation.' },
//   { q: 'How long does the consultation take?', a: 'Typically 30-45 minutes for a standard home. We assess walls, discuss your preferences, show shade samples, and provide recommendations.' },
//   { q: 'Do I need to book in advance?', a: 'Yes, we recommend booking 2-3 days in advance. This ensures our expert can dedicate proper time to your project.' },
//   { q: 'Is the consultation really free?', a: 'Absolutely. There is no charge for consultation, shade sampling, or quote. You only pay when you purchase products or services.' },
//   { q: 'Can you help with colour selection?', a: 'Yes, our consultants carry shade catalogs and can show samples on your walls. We help you visualize colours in your actual space.' },
// ];

// const propertyTypes = ['Apartment', 'Independent House', 'Villa', 'Commercial Space', 'Office', 'Other'];
// const areaSizes = ['Below 500 sq ft', '500 - 1000 sq ft', '1000 - 2000 sq ft', '2000 - 3000 sq ft', 'Above 3000 sq ft'];
// const finishPreferences = ['Matte', 'Silk / Satin', 'Gloss', 'Textured', 'Not sure — need guidance'];
// const timelines = ['Within 1 week', '1-2 weeks', '2-4 weeks', 'Within a month', 'Just exploring'];

// export default function AssistancePage() {
//   const [formData, setFormData] = useState({
//     name: '', phone: '', email: '', city: '', property_type: '',
//     interior_exterior: '', area_size: '', preferred_finish: '', timeline: '', notes: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [openFaq, setOpenFaq] = useState<number | null>(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// const [scrolled, setScrolled] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setIsSubmitting(true);
//   //   setError(null);
//   //   try {
//   //     await submitConsultation({
//   //       ...formData,
//   //       email: formData.email || null,
//   //       area_size: formData.area_size || null,
//   //       preferred_finish: formData.preferred_finish || null,
//   //       timeline: formData.timeline || null,
//   //       notes: formData.notes || null,
//   //     });
//   //     setIsSuccess(true);
//   //   } catch {
//   //     setError('Failed to submit. Please try again.');
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsSubmitting(true);
//   setError(null);

//   try {
//     const inserted = await submitConsultation({
//       ...formData,
//       email: formData.email || null,
//       area_size: formData.area_size || null,
//       preferred_finish: formData.preferred_finish || null,
//       timeline: formData.timeline || null,
//       notes: formData.notes || null,
//     });

//     const emailRes = await fetch('/api/consultation-email', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(inserted),
//     });

//     if (!emailRes.ok) {
//       console.error('Consultation saved, but email alert failed');
//     }

//     setIsSuccess(true);
//   } catch (err) {
//     console.error(err);
//     setError('Failed to submit. Please try again.');
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   useEffect(() => {
//   const onScroll = () => setScrolled(window.scrollY > 40);
//   window.addEventListener('scroll', onScroll, { passive: true });
//   onScroll();

//   return () => window.removeEventListener('scroll', onScroll);
// }, []);

// const navText = 'text-[#2D2D2D]';
// const navMuted = 'text-[#6B6B6B]';
// const navBg = scrolled
//   ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
//   : 'bg-white/95 backdrop-blur-md border-b border-gray-100';

//   if (isSuccess) {
//     return (
//       // <div className="bg-warm-white min-h-screen pt-24">
//       <div className="bg-warm-white min-h-screen pt-[72px]">
//         <section className="section-padding">
//           <div className="container-wide max-w-2xl text-center">
//             <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-green-50 flex items-center justify-center">
//               <CheckCircle className="w-10 h-10 text-green-600" />
//             </div>
//             <h1 className="font-serif text-4xl md:text-5xl font-medium text-charcoal mb-4">Thank You!</h1>
//             <p className="text-lg text-charcoal-muted mb-8 leading-relaxed">
//               Your consultation request has been received. Our paint expert will contact you
//               within 24 hours to schedule a visit and discuss your project.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link href="/products" className="btn-primary">Browse Products</Link>
//               <Link href="/" className="btn-secondary">Back to Home</Link>
//             </div>
//           </div>
//         </section>
//       </div>
//     );
//   }

//   return (
//   <div className="bg-warm-white min-h-screen pt-[72px]">
//     <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
//       <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[72px]">
//     <Link href="/" className="flex items-center gap-4 flex-shrink-0 min-w-[260px]">
//       <div className="w-[62px] h-[62px] rounded-2xl flex items-center justify-center bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-[#E8E2D8] p-2 shrink-0">
//         <Image
//           src="/AraWeather.png"
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
//       const isActive = label === 'Assistance';

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

//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -8 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -8 }}
//             className="md:hidden bg-white border-t border-gray-100 shadow-xl px-6 py-4 space-y-3"
//           >
//             {[
//               ['Home', '/'],
//               ['Products', '/products'],
//               ['Shades', '/shades'],
//               ['Assistance', '/assistance'],
//               ['About', '/about'],
//               ['Contact', '/contact'],
//             ].map(([label, href]) => (
//               <Link
//                 key={label}
//                 href={href}
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="block text-sm font-medium text-charcoal hover:text-gold transition-colors py-2 border-b border-gray-50"
//               >
//                 {label}
//               </Link>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>

//     <section className="section-padding bg-white border-b border-warm-gray">
//         <div className="container-wide">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <p className="section-label">Expert Assistance</p>
//               <h1 className="font-serif text-5xl md:text-6xl font-medium text-charcoal mb-6">
//                 Let Us Help You<br />
//                 <span className="text-gold">Transform Your Space</span>
//               </h1>
//               <p className="text-lg text-charcoal-muted leading-relaxed mb-8">
//                 Our paint experts provide personalized guidance for product selection,
//                 shade recommendations, and professional execution. From consultation to
//                 completion, we're with you every step.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-6">
//                 <a href="tel:+911234567890" className="flex items-center gap-3 text-charcoal hover:text-gold transition-colors">
//                   <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
//                     <Phone className="w-5 h-5 text-gold" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-charcoal-muted">Call Us</p>
//                     <p className="font-medium text-sm">+91 12345 67890</p>
//                   </div>
//                 </a>
//                 <a href="mailto:expert@colorsome.com" className="flex items-center gap-3 text-charcoal hover:text-gold transition-colors">
//                   <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
//                     <Mail className="w-5 h-5 text-gold" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-charcoal-muted">Email</p>
//                     <p className="font-medium text-sm">expert@colorsome.com</p>
//                   </div>
//                 </a>
//               </div>
//             </div>

//             <div className="relative hidden lg:block">
//   <div className="relative rounded-2xl shadow-xl overflow-hidden w-full h-96">
//     <Image
//       src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
//       alt="Expert consultation"
//       fill
//       className="object-cover"
//       unoptimized
//     />
//   </div>
//               {/* Floating badge */}
//               <div className="absolute -bottom-6 left-8 bg-white rounded-xl shadow-xl p-5 max-w-[260px]">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
//                     <Users className="w-4 h-4 text-white" />
//                   </div>
//                   <p className="font-serif text-sm font-medium">Free Consultation</p>
//                 </div>
//                 <p className="text-xs text-charcoal-muted">No charge for expert visit, shade sampling, or quote</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Service Process */}
//       <section className="py-16 bg-warm-gray">
//         <div className="container-wide">
//           <div className="text-center mb-12">
//             <p className="section-label">Process</p>
//             <h2 className="font-serif text-3xl font-medium text-charcoal">Our Service Journey</h2>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
//             {serviceProcess.map((step, i) => (
//               <div key={step.title} className="relative">
//                 <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
//                   <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gold/10 flex items-center justify-center">
//                     <step.icon className="w-6 h-6 text-gold" />
//                   </div>
//                   <h3 className="font-serif text-sm md:text-base font-medium text-charcoal mb-1">{step.title}</h3>
//                   <p className="text-[11px] text-charcoal-muted line-clamp-2">{step.desc}</p>
//                 </div>
//                 {i < serviceProcess.length - 1 && (
//                   <div className="hidden md:flex absolute top-1/2 left-full w-5 -translate-y-1/2 items-center justify-center">
//                     <ArrowRight className="w-3 h-3 text-gold/40" />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Consultation Form */}
//       <section className="section-padding">
//         <div className="container-wide">
//           <div className="grid lg:grid-cols-5 gap-10">
//             {/* Form */}
//             <div className="lg:col-span-3">
//               <div className="card-premium p-8 lg:p-12">
//                 <h2 className="font-serif text-3xl font-medium text-charcoal mb-2">Request Consultation</h2>
//                 <p className="text-charcoal-muted text-sm mb-8">Fill in the details and we'll get back to you within 24 hours</p>

//                 {error && (
//                   <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
//                     <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
//                     <p className="text-sm text-red-700">{error}</p>
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid md:grid-cols-2 gap-5">
//                     <div>
//                       <label className="label-premium">Full Name *</label>
//                       <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-premium" placeholder="Your name" />
//                     </div>
//                     <div>
//                       <label className="label-premium">Phone Number *</label>
//                       <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="input-premium" placeholder="+91 98765 43210" />
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-5">
//                     <div>
//                       <label className="label-premium">Email</label>
//                       <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-premium" placeholder="your@email.com" />
//                     </div>
//                     <div>
//                       <label className="label-premium">City *</label>
//                       <input type="text" name="city" value={formData.city} onChange={handleChange} required className="input-premium" placeholder="Mumbai" />
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-5">
//                     <div>
//                       <label className="label-premium">Property Type *</label>
//                       <select name="property_type" value={formData.property_type} onChange={handleChange} required className="select-premium">
//                         <option value="">Select type</option>
//                         {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="label-premium">Requirement *</label>
//                       <select name="interior_exterior" value={formData.interior_exterior} onChange={handleChange} required className="select-premium">
//                         <option value="">Select</option>
//                         <option value="Interior">Interior Painting</option>
//                         <option value="Exterior">Exterior Painting</option>
//                         <option value="Both">Both Interior & Exterior</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-5">
//                     <div>
//                       <label className="label-premium">Area Size</label>
//                       <select name="area_size" value={formData.area_size} onChange={handleChange} className="select-premium">
//                         <option value="">Select size</option>
//                         {areaSizes.map((s) => <option key={s} value={s}>{s}</option>)}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="label-premium">Preferred Finish</label>
//                       <select name="preferred_finish" value={formData.preferred_finish} onChange={handleChange} className="select-premium">
//                         <option value="">Select finish</option>
//                         {finishPreferences.map((f) => <option key={f} value={f}>{f}</option>)}
//                       </select>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="label-premium">Timeline</label>
//                     <select name="timeline" value={formData.timeline} onChange={handleChange} className="select-premium">
//                       <option value="">Select timeline</option>
//                       {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="label-premium">Additional Notes</label>
//                     <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="input-premium resize-none" placeholder="Tell us about your project, specific requirements, or questions..." />
//                   </div>

//                   <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
//                     {isSubmitting ? (
//                       <><Loader className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
//                     ) : (
//                       <><Send className="w-4 h-4 mr-2" /> Submit Request</>
//                     )}
//                   </button>
//                 </form>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <div className="lg:col-span-2 space-y-6">
//               <div className="card-premium p-6">
//                 <h3 className="font-serif text-lg font-medium text-charcoal mb-5">Why Book with Us</h3>
//                 <div className="space-y-4">
//                   {trustPoints.map((p) => (
//                     <div key={p.title} className="flex gap-3">
//                       <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
//                         <p.icon className="w-4 h-4 text-gold" />
//                       </div>
//                       <div>
//                         <h4 className="font-medium text-charcoal text-sm">{p.title}</h4>
//                         <p className="text-xs text-charcoal-muted">{p.desc}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="card-premium p-6">
//                 <h3 className="font-serif text-lg font-medium text-charcoal mb-3">Need Immediate Help?</h3>
//                 <p className="text-sm text-charcoal-muted mb-4">Call us directly for urgent requirements</p>
//                 <a href="tel:+911234567890" className="btn-secondary w-full justify-center">
//                   <Phone className="w-4 h-4 mr-2" /> Call +91 12345 67890
//                 </a>
//               </div>

//               <div className="relative rounded-2xl shadow-md overflow-hidden w-full h-52">
//   <Image
//     src="https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg?auto=compress&cs=tinysrgb&w=600"
//     alt="Beautifully painted space"
//     fill
//     className="object-cover"
//     unoptimized
//   />
// </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ */}
//       <section className="section-padding bg-white border-t border-warm-gray">
//         <div className="container-wide max-w-3xl">
//           <div className="text-center mb-12">
//             <p className="section-label">FAQ</p>
//             <h2 className="font-serif text-3xl md:text-4xl font-medium text-charcoal">Common Questions</h2>
//           </div>
//           <div className="space-y-3">
//             {faqs.map((faq, i) => (
//               <div key={i} className="border border-warm-gray rounded-xl overflow-hidden">
//                 <button
//                   onClick={() => setOpenFaq(openFaq === i ? null : i)}
//                   className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-warm-gray-light transition-colors"
//                 >
//                   <span className="font-medium text-sm text-charcoal pr-4">{faq.q}</span>
//                   <ChevronDown className={`w-4 h-4 text-charcoal-muted shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
//                 </button>
//                 {openFaq === i && (
//                   <div className="px-6 py-4 bg-warm-gray-light text-charcoal-muted text-sm leading-relaxed animate-fade-in">
//                     {faq.a}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <Footer/>
//     </div>
//   );
// }

// function ChevronDown({ className }: { className?: string }) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//       <path d="m6 9 6 6 6-6"/>
//     </svg>
//   );
// }

'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  CheckCircle,
  Clock,
  Shield,
  Users,
  Send,
  Loader,
  AlertCircle,
  ArrowRight,
  MessageCircle,
  Palette,
  ClipboardCheck,
  FileText,
  User,
  MapPin,
} from 'lucide-react';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';

// Restrained luxury palette — see src/lib/palette.ts for the shared source.
const BRAND = {
  pink: '#8C6478', // plum
  orange: '#C4704B', // terracotta
};

const serviceProcess = [
  { icon: MessageCircle, title: 'Request Consultation', desc: 'Fill out the form or call us to begin your painting journey' },
  { icon: ClipboardCheck, title: 'Site Review', desc: 'Our expert visits your property to assess requirements' },
  { icon: Palette, title: 'Recommendation', desc: 'Personalized shade and product recommendations' },
  { icon: FileText, title: 'Quote', desc: 'Transparent, detailed pricing for your project' },
  { icon: CheckCircle, title: 'Execution', desc: 'Professional support from start to finish' },
];

const trustPoints = [
  { icon: Users, title: 'Expert Guidance', desc: 'Experienced consultants who understand paints and finishes' },
  { icon: Shield, title: 'Authentic Products', desc: 'Genuine Colorsome products with full warranty' },
  { icon: CheckCircle, title: 'Clean Process', desc: 'Professional execution with minimal disruption' },
  { icon: Clock, title: 'Timely Delivery', desc: 'Committed timelines and reliable service' },
];

const faqs = [
  { q: 'What does the consultation include?', a: 'Our free consultation includes site assessment, understanding your requirements, shade recommendations, product suggestions, and a detailed cost estimate. No obligation.' },
  { q: 'How long does the consultation take?', a: 'Typically 30-45 minutes for a standard home. We assess walls, discuss your preferences, show shade samples, and provide recommendations.' },
  { q: 'Do I need to book in advance?', a: 'Yes, we recommend booking 2-3 days in advance. This ensures our expert can dedicate proper time to your project.' },
  { q: 'Is the consultation really free?', a: 'Absolutely. There is no charge for consultation, shade sampling, or quote. You only pay when you purchase products or services.' },
  { q: 'Can you help with colour selection?', a: 'Yes, our consultants carry shade catalogs and can show samples on your walls. We help you visualize colours in your actual space.' },
];

const propertyTypes = ['Apartment', 'Independent House', 'Villa', 'Commercial Space', 'Office', 'Other'];
const areaSizes = ['Below 500 sq ft', '500 - 1000 sq ft', '1000 - 2000 sq ft', '2000 - 3000 sq ft', 'Above 3000 sq ft'];
const finishPreferences = ['Matte', 'Silk / Satin', 'Gloss', 'Textured', 'Not sure — need guidance'];
const timelines = ['Within 1 week', '1-2 weeks', '2-4 weeks', 'Within a month', 'Just exploring'];

function AssistancePageContent() {
  // Create a scroll anchor ref for the form container
  const formRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', city: '', property_type: '',
    interior_exterior: '', area_size: '', preferred_finish: '', timeline: '', notes: '',
  });

  // Prefill from a calculator handoff (e.g. /assistance?area=1200&product=Interior%20Emulsion&source=paint-quantity-calculator)
  // so the customer doesn't have to re-enter what they already told the calculator.
  useEffect(() => {
    const source = searchParams.get('source');
    if (!source) return;

    const areaNum = parseFloat(searchParams.get('area') ?? '');
    const bucketForArea = (a: number) => {
      if (a < 500) return 'Below 500 sq ft';
      if (a < 1000) return '500 - 1000 sq ft';
      if (a < 2000) return '1000 - 2000 sq ft';
      if (a < 3000) return '2000 - 3000 sq ft';
      return 'Above 3000 sq ft';
    };

    const surfaceParam = (searchParams.get('surface') ?? '').toLowerCase();
    const projectParam = searchParams.get('project');
    const interiorExterior =
      surfaceParam === 'interior' ? 'Interior' : surfaceParam === 'exterior' ? 'Exterior' : '';

    const summaryParts: string[] = [`Sent from ${source.replace(/-/g, ' ')}.`];
    if (searchParams.get('product')) summaryParts.push(`Product: ${searchParams.get('product')}.`);
    if (searchParams.get('qty')) summaryParts.push(`Estimated requirement: ${searchParams.get('qty')}.`);
    if (searchParams.get('condition')) summaryParts.push(`Condition: ${searchParams.get('condition')}.`);
    if (projectParam) summaryParts.push(`Project type: ${projectParam === 'fresh' ? 'Fresh painting' : 'Re-painting'}.`);

    setFormData((prev) => ({
      ...prev,
      area_size: Number.isFinite(areaNum) && areaNum > 0 ? bucketForArea(areaNum) : prev.area_size,
      interior_exterior: interiorExterior || prev.interior_exterior,
      notes: prev.notes ? prev.notes : summaryParts.join(' '),
    }));
    // Scroll straight to the form since the visitor already has intent.
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  type FormField = keyof typeof formData;
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FormField, boolean>>>({});

  // Smooth scroll controller
  const scrollToForm = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Strict client-side validation — required fields get real format checks
  // (Indian mobile number, proper email, name/city character rules) instead
  // of just the browser's bare `required` attribute.
  const validators: Partial<Record<FormField, (v: string) => string | undefined>> = {
    name: (v) => {
      const t = v.trim();
      if (!t) return 'Full name is required';
      if (t.length < 2) return 'Name looks too short';
      if (!/^[A-Za-z\s.'-]{2,60}$/.test(t)) return 'Use letters only, please';
      return undefined;
    },
    phone: (v) => {
      const t = v.replace(/[\s-]/g, '');
      if (!t) return 'Phone number is required';
      if (!/^(\+?91)?[6-9]\d{9}$/.test(t)) return 'Enter a valid 10-digit mobile number';
      return undefined;
    },
    email: (v) => {
      const t = v.trim();
      if (!t) return undefined; // optional field
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return 'Enter a valid email address';
      return undefined;
    },
    city: (v) => {
      const t = v.trim();
      if (!t) return 'City is required';
      if (t.length < 2) return 'Enter a valid city name';
      return undefined;
    },
    property_type: (v) => (!v ? 'Please select a property type' : undefined),
    interior_exterior: (v) => (!v ? 'Please select a requirement' : undefined),
  };

  const validateField = (field: FormField, value: string) => validators[field]?.(value);

  const validateAll = () => {
    const next: Partial<Record<FormField, string>> = {};
    (Object.keys(validators) as FormField[]).forEach((field) => {
      const msg = validateField(field, formData[field]);
      if (msg) next[field] = msg;
    });
    setErrors(next);
    return next;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name as FormField]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name as FormField, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name as FormField, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const fieldErrors = validateAll();
    setTouched({
      name: true, phone: true, email: true, city: true,
      property_type: true, interior_exterior: true,
    });
    if (Object.keys(fieldErrors).length > 0) {
      setError('Please fix the highlighted fields before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/submit-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          email: formData.email || null,
          area_size: formData.area_size || null,
          preferred_finish: formData.preferred_finish || null,
          timeline: formData.timeline || null,
          notes: formData.notes || null,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result?.error || 'Failed to submit.');
      }

      setReferenceId(result?.consultation?.id ?? null);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    const firstName = formData.name.trim().split(' ')[0] || 'there';
    const nextSteps = [
      { icon: Phone, title: "We'll call you", desc: 'Within 24 hours, at the number you shared, to understand your project.' },
      { icon: Palette, title: 'Site visit & shade consult', desc: 'Our expert visits, checks surfaces, and helps you finalize colours and finishes.' },
      { icon: FileText, title: 'Personalized quote', desc: 'A transparent, itemized estimate — no pressure, no hidden costs.' },
    ];

    return (
      <div className="bg-[#FDFBF7] min-h-screen pt-[120px] flex items-center relative overflow-hidden">
        <Header />
        {/* Ambient grain + breathing colour blooms, consistent with the rest of the site */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />
        <motion.div
          className="absolute top-[15%] left-[15%] w-[45%] h-[45%] rounded-full blur-[120px] pointer-events-none -z-10"
          style={{ background: `radial-gradient(circle, ${BRAND.pink} 0%, transparent 70%)` }}
          animate={{ opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none -z-10"
          style={{ background: `radial-gradient(circle, ${BRAND.orange} 0%, transparent 70%)` }}
          animate={{ opacity: [0.15, 0.26, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <section className="py-12 w-full">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 14 }}
              className="relative w-24 h-24 mx-auto mb-8"
            >
              <span className="absolute inset-0 rounded-3xl bg-emerald-400/30 animate-ping" />
              <div className="relative w-24 h-24 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-md shadow-emerald-500/5">
                <CheckCircle className="w-12 h-12 text-emerald-600" />
              </div>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4 tracking-tight">Thank You, {firstName}!</h1>
            <p className="text-base sm:text-lg text-charcoal/80 max-w-lg mx-auto mb-4 font-inter font-normal leading-relaxed tracking-wide">
              Your consultation request has been received. Our paint expert will contact you
              within 24 hours to schedule a visit and discuss your project.
            </p>
            {referenceId && (
              <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EDE6DA] text-[11px] uppercase tracking-wider font-black text-charcoal-muted mb-10">
                Reference ID <span style={{ color: BRAND.orange }}>#{referenceId.slice(0, 8)}</span>
              </p>
            )}

            {/* What happens next — concrete reassurance instead of a vague "we'll be in touch" */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10 text-left">
              {nextSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  className="relative bg-white border border-[#EDE6DA] rounded-2xl p-5 shadow-sm"
                >
                  <span className="absolute top-4 right-4 text-[10px] font-black text-gray-300">{String(i + 1).padStart(2, '0')}</span>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${BRAND.orange}14`, color: BRAND.orange }}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-sm text-charcoal mb-1.5">{step.title}</p>
                  <p className="text-xs text-charcoal-muted leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto font-inter mb-6">
              <Link href="/products" className="group relative overflow-hidden w-full sm:flex-1 inline-flex items-center justify-center px-6 py-4 text-white rounded-xl text-xs uppercase tracking-widest font-black whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300" style={{ background: `linear-gradient(135deg, ${BRAND.pink} 0%, ${BRAND.orange} 100%)` }}>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" style={{ background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)' }} />
                <span className="relative">Browse Products</span>
              </Link>
              <Link href="/" className="w-full sm:flex-1 inline-flex items-center justify-center px-6 py-4 bg-white border border-[#EDE6DA] text-charcoal rounded-xl text-xs uppercase tracking-widest font-black whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:bg-[#FDFBF7] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                Back to Home
              </Link>
            </div>

            <p className="text-xs text-charcoal-muted font-inter">
              Need it sooner? <a href="tel:+91-75020-00079" className="font-bold underline" style={{ color: BRAND.orange }}>Call us directly</a>
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-[72px] relative selection:bg-[#F3E7C9]">
      {/* GLOBAL BACKGROUND AMBIENT GLOWS */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-25">
        <div className="absolute top-[5%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px]" style={{ background: `radial-gradient(circle, ${BRAND.pink} 0%, transparent 70%)` }} />
        <div className="absolute top-[40%] -right-[10%] w-[45vw] h-[45vw] rounded-full blur-[120px]" style={{ background: `radial-gradient(circle, ${BRAND.orange} 0%, transparent 70%)` }} />
        <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full blur-[100px]" style={{ background: `radial-gradient(circle, ${BRAND.pink} 0%, transparent 70%)` }} />
      </div>

      <Header />

      {/* HERO SECTION */}
      <section className="py-12 sm:py-16 md:py-20 bg-white/40 backdrop-blur-sm border-b border-[#EDE6DA]/50 relative overflow-hidden">
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="inline-block px-3 py-1 mb-4 rounded-full bg-[#F3E7C9] text-charcoal text-[10px] uppercase tracking-[0.2em] font-black font-inter">
                Expert Assistance
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal mb-6 leading-[1.05] sm:leading-none tracking-tight">
                Let Us Help You<br />
                <span className="bg-gradient-to-r from-[#8C6478] to-[#C4704B] bg-clip-text text-transparent">Transform Your Space</span>
              </h1>
              <p className="text-base sm:text-[17px] text-charcoal/80 max-w-xl mb-8 font-inter font-normal leading-relaxed tracking-wide">
                Our paint experts provide personalized guidance for product selection,
                shade recommendations, and professional execution. From consultation to
                completion, we're with you every step.
              </p>

              {/* Added a prompt call to action right inside the intro content */}
              <button
                onClick={() => scrollToForm()}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 mb-8 px-6 py-4 text-white rounded-xl text-xs uppercase tracking-widest font-black font-inter shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                style={{ background: `linear-gradient(135deg, ${BRAND.pink} 0%, ${BRAND.orange} 100%)` }}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" style={{ background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)' }} />
                <span className="relative">Go Straight To Form</span> <ArrowRight className="w-3.5 h-3.5 relative animate-pulse" />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 font-inter border-t border-[#EDE6DA]/40 pt-6">
                <a href="tel:+91-75020-00079" className="group flex items-center gap-3 text-charcoal hover:text-[#C4704B] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-[#EDE6DA] flex items-center justify-center group-hover:shadow-md group-hover:border-[#C4704B]/30 transition-all duration-300">
                    <Phone className="w-5 h-5 text-[#C4704B]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-charcoal-muted font-bold">Call Us</p>
                    <p className="font-bold text-sm tracking-wide">+91-75020-00079</p>
                  </div>
                </a>
                <a href="mailto:expert@colorsome.com" className="group flex items-center gap-3 text-charcoal hover:text-[#8C6478] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-[#EDE6DA] flex items-center justify-center group-hover:shadow-md group-hover:border-[#8C6478]/30 transition-all duration-300">
                    <Mail className="w-5 h-5 text-[#8C6478]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-charcoal-muted font-bold">Email</p>
                    <p className="font-bold text-sm tracking-wide">expert@colorsome.com</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="relative mt-10 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl shadow-[0_20px_50px_rgba(45,45,45,0.1)] border border-white/60 overflow-hidden w-full h-[260px] sm:h-[320px] lg:h-[400px]"
              >
                <Image
                  // src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                  src="/Assistance.png"
                  alt="Expert consultation"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  unoptimized
                />
              </motion.div>
              {/* Sits below the image now instead of overlapping it, so it never clashes with whatever the photo itself contains */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 bg-white rounded-2xl border border-[#EDE6DA] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-5 flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#8C6478] to-[#C4704B] flex items-center justify-center shadow-md shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-serif text-base font-bold text-charcoal leading-tight">Free Consultation</p>
                  <p className="text-xs text-charcoal-muted font-inter leading-relaxed">No charge for expert visit, shade sampling, or quote</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE PROCESS */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#FDFBF7]/40 relative">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C4704B] font-black font-inter mb-2">Process</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">Our Service Journey</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {serviceProcess.map((step, i) => (
              <div key={step.title} className="relative group cursor-pointer" onClick={() => scrollToForm()}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm border border-[#EDE6DA]/60 rounded-2xl p-6 text-center h-full shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(45,45,45,0.1)] hover:bg-white hover:border-[#C4704B]/30 transition-all duration-300"
                >
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-[#FDFBF7] border border-[#EDE6DA] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-6 h-6 text-[#C4704B]" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-charcoal mb-2">{step.title}</h3>
                  <p className="text-xs text-charcoal-muted font-inter leading-relaxed line-clamp-3 px-1">{step.desc}</p>
                </motion.div>
                {i < serviceProcess.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 left-full w-6 -translate-y-1/2 items-center justify-center z-10">
                    <ArrowRight className="w-4 h-4 text-[#C4704B]/40 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTATION CORE CONTAINER (Added the scroll ref point) */}
      <section ref={formRef} className="py-12 max-w-[1280px] mx-auto px-6 scroll-mt-24">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Main Booking Form Card Frame */}
          <div className="lg:col-span-3">
            <div className="relative bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-3xl p-8 lg:p-12 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.orange})` }} />
              <h2 className="font-serif text-3xl font-bold text-charcoal mb-2">Request Consultation</h2>
              <p className="text-charcoal-muted text-sm mb-8 font-inter">Fill in the details and we'll get back to you within 24 hours</p>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-rose-700 font-inter font-medium">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-6 font-inter">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black flex items-center gap-2" style={{ color: BRAND.orange }}>
                  <span className="w-3 h-[1.5px]" style={{ background: BRAND.orange }} /> Your Details
                </p>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-bold mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur}
                        className={`w-full pl-11 pr-4 py-3.5 bg-[#FDFBF7]/60 border rounded-xl text-sm transition-all duration-200 outline-none placeholder:text-gray-400 focus:bg-white ${touched.name && errors.name ? 'border-rose-300 focus:border-rose-400' : 'border-[#EDE6DA] focus:border-[#C4704B]'}`}
                        placeholder="Your name"
                      />
                    </div>
                    {touched.name && errors.name && <p className="text-[11px] text-rose-500 font-semibold mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-bold mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        type="tel" name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur}
                        className={`w-full pl-11 pr-4 py-3.5 bg-[#FDFBF7]/60 border rounded-xl text-sm transition-all duration-200 outline-none placeholder:text-gray-400 focus:bg-white ${touched.phone && errors.phone ? 'border-rose-300 focus:border-rose-400' : 'border-[#EDE6DA] focus:border-[#C4704B]'}`}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    {touched.phone && errors.phone && <p className="text-[11px] text-rose-500 font-semibold mt-1.5">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-bold mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur}
                        className={`w-full pl-11 pr-4 py-3.5 bg-[#FDFBF7]/60 border rounded-xl text-sm transition-all duration-200 outline-none placeholder:text-gray-400 focus:bg-white ${touched.email && errors.email ? 'border-rose-300 focus:border-rose-400' : 'border-[#EDE6DA] focus:border-[#C4704B]'}`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {touched.email && errors.email && <p className="text-[11px] text-rose-500 font-semibold mt-1.5">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-bold mb-2">City *</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        type="text" name="city" value={formData.city} onChange={handleChange} onBlur={handleBlur}
                        className={`w-full pl-11 pr-4 py-3.5 bg-[#FDFBF7]/60 border rounded-xl text-sm transition-all duration-200 outline-none placeholder:text-gray-400 focus:bg-white ${touched.city && errors.city ? 'border-rose-300 focus:border-rose-400' : 'border-[#EDE6DA] focus:border-[#C4704B]'}`}
                        placeholder="Mumbai"
                      />
                    </div>
                    {touched.city && errors.city && <p className="text-[11px] text-rose-500 font-semibold mt-1.5">{errors.city}</p>}
                  </div>
                </div>

                <p className="text-[10px] uppercase tracking-[0.2em] font-black flex items-center gap-2 pt-2" style={{ color: BRAND.orange }}>
                  <span className="w-3 h-[1.5px]" style={{ background: BRAND.orange }} /> Project Details
                </p>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-bold mb-2">Property Type *</label>
                    <select
                      name="property_type" value={formData.property_type} onChange={handleChange} onBlur={handleBlur}
                      className={`w-full px-4 py-3.5 bg-[#FDFBF7]/60 border rounded-xl text-sm transition-all duration-200 outline-none cursor-pointer focus:bg-white ${touched.property_type && errors.property_type ? 'border-rose-300 focus:border-rose-400' : 'border-[#EDE6DA] focus:border-[#C4704B]'}`}
                    >
                      <option value="">Select type</option>
                      {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {touched.property_type && errors.property_type && <p className="text-[11px] text-rose-500 font-semibold mt-1.5">{errors.property_type}</p>}
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-bold mb-2">Requirement *</label>
                    <select
                      name="interior_exterior" value={formData.interior_exterior} onChange={handleChange} onBlur={handleBlur}
                      className={`w-full px-4 py-3.5 bg-[#FDFBF7]/60 border rounded-xl text-sm transition-all duration-200 outline-none cursor-pointer focus:bg-white ${touched.interior_exterior && errors.interior_exterior ? 'border-rose-300 focus:border-rose-400' : 'border-[#EDE6DA] focus:border-[#C4704B]'}`}
                    >
                      <option value="">Select</option>
                      <option value="Interior">Interior Painting</option>
                      <option value="Exterior">Exterior Painting</option>
                      <option value="Both">Both Interior & Exterior</option>
                    </select>
                    {touched.interior_exterior && errors.interior_exterior && <p className="text-[11px] text-rose-500 font-semibold mt-1.5">{errors.interior_exterior}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-bold mb-2">Area Size</label>
                    <select name="area_size" value={formData.area_size} onChange={handleChange} className="w-full px-4 py-3.5 bg-[#FDFBF7]/60 border border-[#EDE6DA] focus:border-[#C4704B] focus:bg-white rounded-xl text-sm transition-all duration-200 outline-none cursor-pointer">
                      <option value="">Select size</option>
                      {areaSizes.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-bold mb-2">Preferred Finish</label>
                    <select name="preferred_finish" value={formData.preferred_finish} onChange={handleChange} className="w-full px-4 py-3.5 bg-[#FDFBF7]/60 border border-[#EDE6DA] focus:border-[#C4704B] focus:bg-white rounded-xl text-sm transition-all duration-200 outline-none cursor-pointer">
                      <option value="">Select finish</option>
                      {finishPreferences.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-bold mb-2">Timeline</label>
                  <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full px-4 py-3.5 bg-[#FDFBF7]/60 border border-[#EDE6DA] focus:border-[#C4704B] focus:bg-white rounded-xl text-sm transition-all duration-200 outline-none cursor-pointer">
                    <option value="">Select timeline</option>
                    {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-bold mb-2">Additional Notes</label>
                  <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} maxLength={600} className="w-full px-4 py-3.5 bg-[#FDFBF7]/60 border border-[#EDE6DA] focus:border-[#C4704B] focus:bg-white rounded-xl text-sm transition-all duration-200 outline-none resize-none placeholder:text-gray-400" placeholder="Tell us about your project, specific requirements, or questions..." />
                  <p className="text-[10px] text-gray-400 mt-1.5 text-right">{formData.notes.length}/600</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative overflow-hidden w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-white rounded-xl text-xs uppercase tracking-widest font-black whitespace-nowrap shadow-[0_10px_30px_rgba(196,112,75,0.18)] hover:shadow-[0_16px_40px_rgba(196,112,75,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: `linear-gradient(135deg, ${BRAND.pink} 0%, ${BRAND.orange} 100%)` }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" style={{ background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)' }} />
                  {isSubmitting ? (
                    <><Loader className="w-4 h-4 animate-spin relative" /> <span className="relative">Submitting...</span></>
                  ) : (
                    <><Send className="w-3.5 h-3.5 relative" /> <span className="relative">Submit Request</span></>
                  )}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Sidebar Modules Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-md border border-[#EDE6DA]/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl p-6">
              <h3 className="font-serif text-xl font-bold text-charcoal mb-5">Why Book with Us</h3>
              <div className="space-y-5">
                {trustPoints.map((p) => (
                  <div key={p.title} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#EDE6DA] shadow-sm flex items-center justify-center shrink-0 group-hover:border-[#C4704B]/30 transition-colors duration-300">
                      <p.icon className="w-4 h-4 text-[#C4704B]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal text-sm font-inter tracking-wide">{p.title}</h4>
                      <p className="text-xs text-charcoal-muted font-inter leading-relaxed mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-[#EDE6DA]/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl p-6 text-center relative overflow-hidden group">
              <div className="absolute -bottom-[20%] -right-[20%] w-32 h-32 rounded-full blur-2xl opacity-40 pointer-events-none" style={{ background: BRAND.orange }} />
              
              <h3 className="font-serif text-xl font-bold text-charcoal mb-2">Need Immediate Help?</h3>
              <p className="text-xs text-charcoal-muted mb-5 font-inter">Call us directly for urgent requirements</p>
              <a href="tel:+91-75020-00079" className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border border-[#EDE6DA] text-charcoal rounded-xl text-xs uppercase tracking-widest font-black font-inter shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:border-charcoal/30 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                <Phone className="w-3.5 h-3.5 text-[#C4704B] animate-pulse" /> Call +91-75020-00079
              </a>
            </div>

            <div className="relative rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] overflow-hidden border border-[#EDE6DA]/50">
              <img
                src="/Assistance2.png"
                alt="Beautifully painted space"
                className="w-full h-auto block transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION FRAMEWORK */}
      <section className="relative py-14 sm:py-20 md:py-24 bg-white/40 backdrop-blur-sm border-t border-[#EDE6DA]/50 mt-10 sm:mt-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.07] pointer-events-none" style={{ background: BRAND.pink }} />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-3 h-[1.5px]" style={{ background: '#8C6478' }} />
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#8C6478] font-black font-inter">FAQ</p>
              <span className="w-3 h-[1.5px]" style={{ background: '#8C6478' }} />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal tracking-tight">Common Questions</h2>
          </motion.div>

          <div className="space-y-4 font-inter">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              const color = ['#C9A858', '#C4704B', '#8B9E7E', '#2C3E50', '#8C6478'][i % 5];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.05 }}
                  className="bg-white/90 border rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
                  style={{ borderColor: isOpen ? `${color}45` : 'rgba(237,230,218,0.7)' }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center gap-4 sm:gap-5 group"
                  >
                    <span
                      className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-serif text-sm font-bold transition-colors duration-300"
                      style={{ background: `${color}16`, color }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-bold text-base text-charcoal tracking-wide transition-colors" style={{ color: isOpen ? color : undefined }}>
                      {faq.q}
                    </span>
                    <span className="shrink-0" style={{ color: isOpen ? color : '#9B8E7E' }}>
                      <PlusMinus open={isOpen} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.21, ease: [0.22, 0.61, 0.36, 1] }}
                      >
                        <motion.div
                          initial={{ y: -8, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -8, opacity: 0 }}
                          transition={{ duration: 0.21, ease: 'easeOut' }}
                          className="pl-[4.5rem] pr-6 sm:pl-24 sm:pr-8 pb-6 pt-1 text-charcoal/80 text-sm sm:text-[15px] leading-relaxed border-t border-gray-100 bg-[#FDFBF7]/50"
                        >
                          {faq.a}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function AssistancePage() {
  return (
    <Suspense fallback={null}>
      <AssistancePageContent />
    </Suspense>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}

function PlusMinus({ open, className }: { open: boolean; className?: string }) {
  return (
    <span className={`relative w-4 h-4 ${className || ''}`}>
      <span className="absolute left-0 top-1/2 w-full h-[2px] -translate-y-1/2 bg-current rounded-full" />
      <span
        className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-current rounded-full transition-transform duration-300"
        style={{ transform: `translateX(-50%) scaleY(${open ? 0 : 1})` }}
      />
    </span>
  );
}