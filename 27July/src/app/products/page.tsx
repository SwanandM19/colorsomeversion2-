// "use client";

// import React, { useEffect } from 'react';
// import { ArrowRight } from "lucide-react";
// import Image from 'next/image';
// import Link from 'next/link';

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   fullDescription: string;
//   status: string;
//   image: string;
//   category: string;
//   features: string[];
//   applications: string[];
//   slug: string;
// }

// export default function Labs() {
//   useEffect(() => {
//     window.scrollTo(0, 0);

//     // Check if there's a product hash in the URL
//     const hash = window.location.hash;
//     if (hash && hash.includes('product-')) {
//       // Scroll to product after a small delay
//       setTimeout(() => {
//         const element = document.getElementById(hash.substring(1));
//         if (element) {
//           element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         }
//       }, 100);
//     }
//   }, []);

//   const products: Product[] = [
//     // Coatings & Paints
//     {
//       id: "01",
//       name: "Axis Weather Coat",
//       description: "Precision-engineered protective coating for extreme environmental conditions.",
//       fullDescription: "Axis Weather Coat is a premium protective coating engineered to withstand extreme weather conditions, UV radiation, and chemical exposure. Ideal for industrial and marine applications.",
//       status: "Active",
//       image: "/Axis_Weather_Coat.png",
//       category: "Protective Coatings",
//       features: ["UV Resistant", "Chemical Resistant", "Weather Proof", "Long-lasting Durability"],
//       applications: ["Industrial Equipment", "Marine Vessels", "Outdoor Structures", "Pipeline Protection"],
//       slug: "axis-weather-coat"
//     },
//     {
//       id: "02",
//       name: "Ara Weather Coat",
//       description: "Advanced reactive armor system designed for durability and performance.",
//       fullDescription: "Ara Weather Coat features advanced reactive technology that adapts to environmental conditions, providing superior protection against corrosion and wear.",
//       status: "Active",
//       image: "/AraWeather.png",
//       category: "Protective Coatings",
//       features: ["Self-healing Properties", "Anti-corrosion", "Temperature Resistant", "Flexible Application"],
//       applications: ["Automotive", "Aerospace", "Heavy Machinery", "Infrastructure"],
//       slug: "ara-weather-coat"
//     },
//     {
//       id: "03",
//       name: "Tough Tex",
//       description: "Industrial-grade textile technology for maximum resilience and flexibility.",
//       fullDescription: "Tough Tex is an industrial-grade textile coating that combines maximum resilience with flexibility, perfect for high-wear applications.",
//       status: "Active",
//       image: "/Tough_Tex.png",
//       category: "Industrial Textiles",
//       features: ["Tear Resistant", "Waterproof", "Breathable", "High Tensile Strength"],
//       applications: ["Protective Gear", "Industrial Covers", "Tarpaulins", "Tents"],
//       slug: "tough-tex"
//     },
//     {
//       id: "04",
//       name: "CRUX SUPRA Fine Finish Wall Putty",
//       description: "Premium fine finish wall putty for smooth, flawless surfaces.",
//       fullDescription: "CRUX SUPRA Fine Finish Wall Putty provides an ultra-smooth base for premium paints, ensuring perfect wall finishing with superior adhesion.",
//       status: "Active",
//       image: "/CRUX_SUPRA_Fine_Finish_Wall_Putty.png",
//       category: "Wall Finishes",
//       features: ["Smooth Finish", "Excellent Adhesion", "Crack Resistant", "Easy Application"],
//       applications: ["Interior Walls", "Exterior Walls", "Commercial Spaces", "Residential Projects"],
//       slug: "crux-supra-fine-finish"
//     },
//     {
//       id: "05",
//       name: "CRUX Coarse Finish Wall Putty",
//       description: "Rugged wall putty for textured finishes and surface leveling.",
//       fullDescription: "CRUX Coarse Finish Wall Putty is designed for surface leveling and creating textured finishes on both interior and exterior walls.",
//       status: "Active",
//       image: "/CRUX_Coarse_Finish_Wall_Putty.png",
//       category: "Wall Finishes",
//       features: ["Excellent Coverage", "Surface Leveling", "Textured Finish", "Durable"],
//       applications: ["Exterior Walls", "Textured Finishes", "Repair Work", "Surface Preparation"],
//       slug: "crux-coarse-finish"
//     },
//     {
//       id: "06",
//       name: "Buildwell Ready-Mix Plaster",
//       description: "Pre-mixed plaster solution for efficient construction.",
//       fullDescription: "Buildwell Ready-Mix Plaster is a factory-mixed plaster that ensures consistent quality and reduces on-site labor requirements.",
//       status: "Active",
//       image: "/Buildwell_Reay-Mix_Plaster.png",
//       category: "Construction Materials",
//       features: ["Consistent Quality", "Time Saving", "Reduced Waste", "Superior Bonding"],
//       applications: ["Interior Walls", "Exterior Walls", "Ceilings", "Renovation Projects"],
//       slug: "buildwell-ready-mix-plaster"
//     },
//     {
//       id: "07",
//       name: "Glossmate Enamel Paint",
//       description: "High-gloss enamel paint for brilliant, long-lasting finish.",
//       fullDescription: "Glossmate Enamel Paint delivers a brilliant, high-gloss finish that resists yellowing and maintains its shine for years.",
//       status: "Active",
//       image: "/Glossmate_Enamel_Paint.png",
//       category: "Decorative Paints",
//       features: ["High Gloss Finish", "Scratch Resistant", "Easy Cleaning", "Weather Resistant"],
//       applications: ["Metal Surfaces", "Wood Work", "Furniture", "Doors & Windows"],
//       slug: "glossmate-enamel"
//     },
//     {
//       id: "08",
//       name: "Uniprime Ext",
//       description: "Premium exterior primer for superior paint adhesion.",
//       fullDescription: "Uniprime Ext is a high-performance exterior primer that ensures superior paint adhesion and protects against weathering.",
//       status: "Active",
//       image: "/Uniprime_Ext.png",
//       category: "Primers",
//       features: ["Superior Adhesion", "Alkali Resistant", "Weather Protection", "Seals Surfaces"],
//       applications: ["Exterior Walls", "Concrete Surfaces", "Plastered Walls", "Masonry"],
//       slug: "uniprime-ext"
//     },
//     {
//       id: "09",
//       name: "Uniprime",
//       description: "Versatile primer for interior and exterior applications.",
//       fullDescription: "Uniprime is a versatile all-purpose primer that prepares surfaces for optimal paint adhesion and uniform finish.",
//       status: "Active",
//       image: "/Uniprime.png",
//       category: "Primers",
//       features: ["All-purpose", "Quick Drying", "Excellent Adhesion", "Seals Porous Surfaces"],
//       applications: ["Interior Walls", "Exterior Walls", "Wood", "Metal"],
//       slug: "uniprime"
//     },
//     {
//       id: "10",
//       name: "Jet Emulsion",
//       description: "Smooth emulsion paint for elegant interior finishes.",
//       fullDescription: "Jet Emulsion provides a smooth, elegant finish for interior walls with excellent washability and color retention.",
//       status: "Active",
//       image: "/Jet_Emulsion.png",
//       category: "Emulsion Paints",
//       features: ["Smooth Finish", "Washable", "Color Retention", "Low VOC"],
//       applications: ["Living Rooms", "Bedrooms", "Offices", "Hotels"],
//       slug: "jet-emulsion"
//     },
//     {
//       id: "11",
//       name: "Metalock Yellow Pro",
//       description: "Professional grade yellow metal coating for industrial use.",
//       fullDescription: "Metalock Yellow Pro is a professional-grade coating specifically formulated for metal surfaces requiring high visibility and protection.",
//       status: "Active",
//       image: "/Metalock_Yellow_Pro.png",
//       category: "Industrial Coatings",
//       features: ["High Visibility", "Corrosion Resistant", "UV Stable", "Industrial Grade"],
//       applications: ["Safety Equipment", "Industrial Machinery", "Markings", "Heavy Equipment"],
//       slug: "metalock-yellow-pro"
//     },
//     {
//       id: "12",
//       name: "Metalock Yellow",
//       description: "Standard yellow metal coating for general applications.",
//       fullDescription: "Metalock Yellow provides reliable protection and high-visibility finish for general metal coating applications.",
//       status: "Active",
//       image: "/Metalock_Yellow.png",
//       category: "Industrial Coatings",
//       features: ["Durable Finish", "Good Coverage", "Weather Resistant", "Easy Application"],
//       applications: ["Metal Structures", "Pipes", "Equipment", "General Metal Work"],
//       slug: "metalock-yellow"
//     },
//     {
//       id: "13",
//       name: "Metalock Red Pro",
//       description: "Premium red industrial coating for heavy-duty applications.",
//       fullDescription: "Metalock Red Pro delivers superior protection and high-visibility red finish for heavy-duty industrial applications.",
//       status: "Active",
//       image: "/Metalock_Red_Pro.png",
//       category: "Industrial Coatings",
//       features: ["Heavy-duty Protection", "Chemical Resistant", "High Visibility", "Long-lasting"],
//       applications: ["Fire Safety Equipment", "Heavy Machinery", "Industrial Piping", "Warning Markings"],
//       slug: "metalock-red-pro"
//     },
//     {
//       id: "14",
//       name: "Metalock Red",
//       description: "Standard red metal coating for general industrial use.",
//       fullDescription: "Metalock Red offers reliable protection and standard red finish for general industrial metal coating requirements.",
//       status: "Active",
//       image: "/Metalock_Red.png",
//       category: "Industrial Coatings",
//       features: ["Good Adhesion", "Weather Resistant", "Economical", "Easy to Apply"],
//       applications: ["General Metal Surfaces", "Maintenance Work", "Repairs", "Touch-ups"],
//       slug: "metalock-red"
//     },
//     {
//       id: "15",
//       name: "Oil Paint Premium",
//       description: "Premium oil-based paint for superior finish and durability.",
//       fullDescription: "Oil Paint Premium delivers a superior, durable finish with excellent flow and leveling properties for professional results.",
//       status: "Active",
//       image: "/Oil_Paint_premium.png",
//       category: "Oil Paints",
//       features: ["Superior Flow", "Excellent Durability", "High Gloss Option", "Smooth Finish"],
//       applications: ["Fine Woodwork", "Furniture", "Decorative Surfaces", "Artistic Projects"],
//       slug: "oil-paint-premium"
//     },
//     {
//       id: "16",
//       name: "Eco Acrylic Distemper",
//       description: "Eco-friendly acrylic distemper for interior walls.",
//       fullDescription: "Eco Acrylic Distemper is an environmentally friendly, water-based distemper perfect for interior walls with excellent coverage.",
//       status: "Active",
//       image: "/Eco_Acrylic_Distemper.png",
//       category: "Distempers",
//       features: ["Eco-friendly", "Water-based", "Excellent Coverage", "Breathable Finish"],
//       applications: ["Interior Walls", "Ceilings", "Low-traffic Areas", "Residential Spaces"],
//       slug: "eco-acrylic-distemper"
//     },
//     {
//       id: "17",
//       name: "Decorx Acrylic Distemper",
//       description: "Decorative acrylic distemper for enhanced interior aesthetics.",
//       fullDescription: "Decorx Acrylic Distemper combines decorative appeal with durable protection for enhanced interior wall aesthetics.",
//       status: "Active",
//       image: "/Decorx_Acrylic_Distemper.png",
//       category: "Distempers",
//       features: ["Decorative Finish", "Durable", "Easy Application", "Good Coverage"],
//       applications: ["Interior Decoration", "Feature Walls", "Commercial Spaces", "Hospitality"],
//       slug: "decorx-acrylic-distemper"
//     },
//     {
//       id: "18",
//       name: "Aquaris Supra",
//       description: "Premium waterproofing solution for superior protection.",
//       fullDescription: "Aquaris Supra provides premium waterproofing protection for roofs, terraces, and other exposed surfaces.",
//       status: "Active",
//       image: "/Aquaris_Supra.png",
//       category: "Waterproofing",
//       features: ["Superior Waterproofing", "Elastic Properties", "UV Resistant", "Long-lasting"],
//       applications: ["Roofs", "Terraces", "Balconies", "Water Tanks"],
//       slug: "aquaris-supra"
//     },
//     {
//       id: "19",
//       name: "Aquaproof",
//       description: "Reliable waterproofing compound for construction.",
//       fullDescription: "Aquaproof is a reliable waterproofing compound that provides effective protection against water ingress in construction projects.",
//       status: "Active",
//       image: "/Aquaproof.png",
//       category: "Waterproofing",
//       features: ["Effective Protection", "Easy Application", "Cost-effective", "Versatile Use"],
//       applications: ["Basements", "Bathrooms", "Wet Areas", "Foundation Walls"],
//       slug: "aquaproof"
//     },
//     {
//       id: "20",
//       name: "Decorprime",
//       description: "High-performance decorative primer for premium finishes.",
//       fullDescription: "Decorprime is a high-performance primer that ensures premium decorative finishes with enhanced durability and adhesion.",
//       status: "Active",
//       image: "/Decorprime.png",
//       category: "Primers",
//       features: ["Premium Finish", "Enhanced Adhesion", "Seals Surfaces", "Quick Drying"],
//       applications: ["Premium Interiors", "Decorative Projects", "High-end Finishes", "Architectural Work"],
//       slug: "decorprime"
//     },
//     {
//       id: "21",
//       name: "DuraGuard Exterior",
//       description: "Heavy-duty exterior paint for maximum protection.",
//       fullDescription: "DuraGuard Exterior provides maximum protection against harsh weather conditions with exceptional durability and color retention.",
//       status: "Active",
//       image: "/DuraGuard_Exterior.png",
//       category: "Exterior Paints",
//       features: ["Maximum Protection", "Weather Resistant", "Color Retention", "Anti-fungal"],
//       applications: ["Exterior Walls", "Facades", "Boundary Walls", "Commercial Buildings"],
//       slug: "duraguard-exterior"
//     },
//     {
//       id: "22",
//       name: "DuraGuard Interior",
//       description: "Durable interior paint for high-traffic areas.",
//       fullDescription: "DuraGuard Interior offers exceptional durability for high-traffic interior areas while maintaining an elegant finish.",
//       status: "Active",
//       image: "/DuraGuard_Interior.png",
//       category: "Interior Paints",
//       features: ["Scrub Resistant", "Stain Resistant", "Easy Cleaning", "Durable Finish"],
//       applications: ["Hallways", "Corridors", "Kitchens", "High-traffic Areas"],
//       slug: "duraguard-interior"
//     },
//     {
//       id: "23",
//       name: "Eva Emulsion",
//       description: "Smooth emulsion with excellent coverage properties.",
//       fullDescription: "Eva Emulsion delivers smooth, even coverage with excellent hiding power and a elegant matte finish.",
//       status: "Active",
//       image: "/Eva_Emulsion.png",
//       category: "Emulsion Paints",
//       features: ["Excellent Coverage", "Smooth Finish", "Matte Appearance", "Good Hiding Power"],
//       applications: ["Interior Walls", "Ceilings", "Bedrooms", "Living Areas"],
//       slug: "eva-emulsion"
//     },
//     {
//       id: "24",
//       name: "Zodiac Emulsion",
//       description: "Premium emulsion for luxurious interior finishes.",
//       fullDescription: "Zodiac Emulsion provides a luxurious, premium finish for discerning interior design projects requiring exceptional quality.",
//       status: "Active",
//       image: "/Zodiac_Emulsion.png",
//       category: "Emulsion Paints",
//       features: ["Luxurious Finish", "Premium Quality", "Excellent Durability", "Rich Colors"],
//       applications: ["Luxury Homes", "Premium Offices", "Hotels", "Showrooms"],
//       slug: "zodiac-emulsion"
//     }
//   ];

//   // Filter products by category for better organization
//   const categories = {
//     "Protective Coatings": products.filter(p => p.category === "Protective Coatings"),
//     "Wall Finishes": products.filter(p => p.category === "Wall Finishes"),
//     "Construction Materials": products.filter(p => p.category === "Construction Materials"),
//     "Decorative Paints": products.filter(p => p.category === "Decorative Paints"),
//     "Primers": products.filter(p => p.category === "Primers"),
//     "Emulsion Paints": products.filter(p => p.category === "Emulsion Paints"),
//     "Industrial Coatings": products.filter(p => p.category === "Industrial Coatings"),
//     "Oil Paints": products.filter(p => p.category === "Oil Paints"),
//     "Distempers": products.filter(p => p.category === "Distempers"),
//     "Waterproofing": products.filter(p => p.category === "Waterproofing"),
//     "Exterior Paints": products.filter(p => p.category === "Exterior Paints"),
//     "Interior Paints": products.filter(p => p.category === "Interior Paints"),
//     "Industrial Textiles": products.filter(p => p.category === "Industrial Textiles"),
//   };

//   return (
//     <main className="flex-1 w-full flex flex-col relative z-10">

//       {/*
//         HERO SECTION
//       */}
//       <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-32 md:pt-48 pb-24 md:pb-32 border-b border-gray-200">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12">
//           <div className="col-span-1 md:col-span-3 flex flex-col justify-between order-2 md:order-1">
//             <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6 md:mb-0">Product Labs</p>
//             <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed uppercase tracking-widest font-medium">
//               Complete range of premium coatings, paints, and construction solutions.
//             </p>
//           </div>

//           <div className="col-span-1 md:col-span-9 order-1 md:order-2">
//             <h1 className="text-5xl sm:text-7xl lg:text-[7rem] xl:text-[8rem] font-medium tracking-tighter leading-[0.85] text-gray-900 mb-8">
//               Premium Surface Solutions
//             </h1>
//             <p className="text-lg text-gray-500 max-w-2xl leading-relaxed font-medium">
//               Engineered for excellence. Our comprehensive range of products delivers superior protection,
//               beautiful finishes, and lasting durability for every application.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/*
//         PRODUCTS BY CATEGORY
//       */}
//       {Object.entries(categories).map(([category, categoryProducts]) => (
//         categoryProducts.length > 0 && (
//           <section key={category} className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-gray-200">
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12 mb-12">
//               <div className="col-span-1 md:col-span-3">
//                 <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-gray-900">
//                   {category}
//                 </h2>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
//               {categoryProducts.map((product) => (
//                 <div
//                   key={product.id}
//                   id={`product-${product.slug}`}
//                   className="flex flex-col group scroll-mt-32"
//                 >
//                   {/* Image Container */}
//                   <div className="w-full aspect-[4/3] relative overflow-hidden mb-6 border border-gray-200 bg-gray-100">
//                     <div className="absolute inset-0 bg-black/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
//                     <Image
//                       src={product.image}
//                       alt={product.name}
//                       fill
//                       className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                     <div className="absolute top-4 left-4 z-20">
//                       <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-widest font-bold text-gray-900">
//                         {product.status}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="flex flex-col">
//                     <h3 className="text-xl md:text-2xl font-medium tracking-tight text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
//                       {product.name}
//                     </h3>
//                     <p className="text-sm text-gray-500 leading-relaxed mb-4">
//                       {product.description}
//                     </p>

//                     {/* Features preview */}
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {product.features.slice(0, 2).map((feature, idx) => (
//                         <span key={idx} className="text-[10px] uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1">
//                           {feature}
//                         </span>
//                       ))}
//                     </div>

//                     <Link
//                       href={`/products/${product.slug}`}
//                       className="inline-flex items-center gap-2 text-xs text-gray-900 font-semibold uppercase tracking-widest group-hover:gap-3 transition-all w-max"
//                     >
//                       View Details
//                       {/* <iconify-icon icon="solar:arrow-right-up-linear" width="14" height="14" /> */}
//                       <ArrowRight size={14} />
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )
//       ))}

//     </main>
//   );
// }

// "use client";

// import React, { useEffect, useState } from "react";
// import { ArrowRight, Search, Phone, Menu, X,Sparkles } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { products } from "./data";
// import type { Product } from "./data";
// import { Footer } from "@/src/components/Footer";

// const ALL_CATEGORIES = [
//   "All",
//   "Protective Coatings",
//   "Wall Finishes",
//   "Construction Materials",
//   "Decorative Paints",
//   "Primers",
//   "Emulsion Paints",
//   "Industrial Coatings",
//   "Oil Paints",
//   "Distempers",
//   "Waterproofing",
//   "Exterior Paints",
//   "Interior Paints",
//   "Industrial Textiles",
// ];

// export default function ProductsPage() {
//   const [search, setSearch] = useState("");
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     onScroll();
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const filtered = products.filter((p) => {
//     const matchCat = activeCategory === "All" || p.category === activeCategory;
//     const matchSearch =
//       !search ||
//       p.name.toLowerCase().includes(search.toLowerCase()) ||
//       p.category.toLowerCase().includes(search.toLowerCase());
//     return matchCat && matchSearch;
//   });

//   const grouped = ALL_CATEGORIES.slice(1).reduce<Record<string, Product[]>>(
//     (acc, cat) => {
//       const items = filtered.filter((p) => p.category === cat);
//       if (items.length) acc[cat] = items;
//       return acc;
//     },
//     {},
//   );

//   const navText = "text-[#2D2D2D]";
//   const navMuted = "text-[#6B6B6B]";
//   const navBg = scrolled
//     ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#F0EAE1]"
//     : "bg-white/95 backdrop-blur-md border-b border-[#F0EAE1]";

//   return (
//     <div className="bg-[#FAF8F5] min-h-screen pt-[72px]">
//       {/* Page Header */}
//       <header
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
//       >
//         <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[72px]">
//           <Link
//             href="/"
//             className="flex items-center gap-4 flex-shrink-0 min-w-[260px]"
//           >
//             <div className="w-[62px] h-[62px] rounded-2xl flex items-center justify-center bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-[#E8E2D8] p-2 shrink-0">
//               <Image
//                 src="/AraWeather.png"
//                 alt="Colorsome logo"
//                 width={62}
//                 height={62}
//                 className="w-full h-full object-contain scale-[1.08]"
//               />
//             </div>
//             <div className="flex flex-col justify-center leading-none">
//               <div className="flex items-start">
//                 <span
//                   className={`transition-colors duration-300 ${navText}`}
//                   style={{
//                     fontFamily: "var(--font-cormorant)",
//                     fontSize: "2rem",
//                     lineHeight: "0.82",
//                     fontWeight: 700,
//                     letterSpacing: "-0.055em",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   COLORSOME
//                 </span>
//                 <span
//                   className={`transition-colors duration-300 ${navText}`}
//                   style={{
//                     fontFamily: "var(--font-inter)",
//                     fontSize: "0.55rem",
//                     lineHeight: 1,
//                     fontWeight: 700,
//                     marginLeft: "0.18rem",
//                     marginTop: "0.12rem",
//                     letterSpacing: "0.04em",
//                   }}
//                 >
//                   R
//                 </span>
//               </div>
//             </div>
//           </Link>

//           <nav className="hidden md:flex items-center">
//             <div className="flex items-center gap-1 rounded-full border border-black/[0.06] bg-white/80 backdrop-blur-md px-2 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
//               {[
//                 ["Home", "/"],
//                 ["Products", "/products"],
//                 ["Shades", "/shades"],
//                 ["Assistance", "/assistance"],
//                 ["About", "/about"],
//                 ["Contact", "/contact"],
//               ].map(([label, href]) => {
//                 const isActive = label === "Products";
//                 return (
//                   <Link
//                     key={label}
//                     href={href}
//                     className={`relative rounded-full px-4 py-2.5 transition-all duration-200 ${
//                       isActive
//                         ? "text-[#2D2D2D] bg-[#F3E7C9]"
//                         : `${navMuted} hover:text-[#2D2D2D] hover:bg-black/[0.04]`
//                     }`}
//                     style={{
//                       fontFamily: "var(--font-inter)",
//                       fontSize: "0.92rem",
//                       fontWeight: isActive ? 600 : 500,
//                       letterSpacing: "-0.01em",
//                       lineHeight: 1,
//                     }}
//                   >
//                     {label}
//                   </Link>
//                 );
//               })}
//             </div>
//           </nav>

//           <div className="flex items-center gap-3">
//             <Link
//               href="/assistance"
//               className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-white flex-shrink-0"
//               style={{ background: "#2D2D2D" }}
//             >
//               <Phone className="w-4 h-4" /> Book Assistance
//             </Link>

//             <button
//               className={`md:hidden p-2 rounded-lg transition-colors ${navText}`}
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               aria-label="Menu"
//             >
//               {mobileMenuOpen ? (
//                 <X className="w-6 h-6" />
//               ) : (
//                 <Menu className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         </div>

//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -8 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -8 }}
//               className="md:hidden bg-white border-t border-gray-100 shadow-xl px-6 py-4 space-y-3"
//             >
//               {[
//                 ["Home", "/"],
//                 ["Products", "/products"],
//                 ["Shades", "/shades"],
//                 ["Assistance", "/assistance"],
//                 ["About", "/about"],
//                 ["Contact", "/contact"],
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

//       {/* Structured Hero Section - Premium Textured Architectural Blueprint Coating */}
//       <section className="py-16 md:py-24 bg-[#FDFBF7] border-b border-[#EDE6DA] relative overflow-hidden">
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

//         {/* Dynamic Soft Sunlit Glow Overlay */}
//         <div className="absolute top-0 right-0 w-[55%] h-full bg-[radial-gradient(circle_at_top_right,rgba(243,231,201,0.5),transparent_70%)] pointer-events-none" />
//         <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.03),transparent_65%)] pointer-events-none filter blur-xl" />

//         <div className="max-w-[1280px] mx-auto px-6 relative z-10">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
//             {/* Left Column: Typography Content */}
//             <motion.div
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, ease: "easeOut" }}
//               className="max-w-2xl"
//             >
//               <div className="flex items-center gap-2.5 mb-4 font-inter">
//                 <Sparkles className="w-3.5 h-3.5 text-orange-500" />
//                 <p className="text-[10px] uppercase tracking-[0.25em] text-orange-500 font-black">
//                   Our Catalog
//                 </p>
//               </div>
//               <h1 className="font-serif text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-charcoal mb-6 leading-none tracking-tight">
//                 Premium Surface
//                 <br />
//                 <span className="bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
//                   Solutions
//                 </span>
//               </h1>
//               <p className="text-[15px] sm:text-[17px] text-charcoal-muted leading-relaxed font-sans font-light tracking-wide max-w-xl">
//                 A comprehensive architectural range of paints, protective
//                 coatings, high-performance primers, and smart construction
//                 products - engineered strictly for superior protection, elegant
//                 finishes, and enduring life.
//               </p>
//             </motion.div>

//             {/* Right Column: High Contrast Premium Studio Frame Container */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.97, y: 15 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               transition={{
//                 duration: 0.7,
//                 ease: [0.16, 1, 0.3, 1],
//                 delay: 0.1,
//               }}
//               className="relative w-full h-[340px] sm:h-[420px] md:h-[460px] rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(45,45,45,0.05)] border border-white bg-white p-3.5 group"
//             >
//               <div className="w-full h-full rounded-[1.9rem] overflow-hidden relative bg-[#FBF9F5] border border-[#EDE6DA]">
//                 {/* Micro Ambient Color Mesh overlay in the image frame */}
//                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#F3E7C9]/15 to-transparent z-10 pointer-events-none mix-blend-multiply" />
//                 <Image
//                   src="/productpageimg.png"
//                   alt="Colorsome complete architectural product line showroom installation display"
//                   fill
//                   priority
//                   className="object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Sticky filter bar */}
//       <section className="bg-charcoal sticky top-[72px] z-40 py-3.5 shadow-md">
//         <div className="max-w-[1280px] mx-auto px-6">
//           <div className="flex items-center gap-4">
//             {/* Search */}
//             <div className="relative flex-shrink-0">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-9 pr-4 py-2 bg-white/10 border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-gold/60 w-52 transition-colors focus:bg-white/15"
//               />
//             </div>

//             {/* Category pills */}
//             <div className="flex items-center overflow-x-auto gap-2 scrollbar-hide flex-1">
//               {ALL_CATEGORIES.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`px-4 py-2 rounded-md text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
//                     activeCategory === cat
//                       ? "bg-gold text-white shadow-sm"
//                       : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Product count indicator strip */}
//       {/* <div className="max-w-[1280px] mx-auto px-6 py-6"> */}
//       <div className="max-w-[1280px] mx-auto px-6 py-6">
//         {/* <div className="bg-white border border-[#EDE6DA] rounded-[1.5rem] px-5 sm:px-6 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.03)]"> */}
//         <div className="relative overflow-hidden bg-white border border-[#EDE6DA] rounded-[1.5rem] px-5 sm:px-6 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.03)]">
//           <div
//             className="absolute inset-0 pointer-events-none opacity-[0.05] rounded-[1.5rem]"
//             style={{
//               backgroundImage:
//                 "radial-gradient(circle at 1px 1px, rgba(45,45,45,0.18) 1px, transparent 0)",
//               backgroundSize: "18px 18px",
//             }}
//           />
//           {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"> */}
//           <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <p
//                 className="text-[10px] uppercase tracking-[0.18em] font-bold text-gold mb-1"
//                 style={{ fontFamily: "var(--font-inter)" }}
//               >
//                 Product Overview
//               </p>
//               <h2
//                 // className="text-[1.30rem] leading-tight text-charcoal font-bold"
//                 className="text-[1.50rem] sm:text-[1.5rem] leading-tight text-charcoal font-semibold"
//                 style={{ fontFamily: "var(--font-cormorant)" }}
//               >
//                 Displaying {filtered.length} product
//                 {filtered.length !== 1 ? "s" : ""}
//                 {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
//               </h2>
//             </div>

//             <div className="flex flex-wrap items-center gap-2">
//               <span
//                 className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.14em] font-bold"
//                 style={{
//                   background: "#F3E7C9",
//                   color: "#8A6A2F",
//                   fontFamily: "var(--font-inter)",
//                 }}
//               >
//                 {activeCategory}
//               </span>

//               {search && (
//                 <span
//                   className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.14em] font-bold"
//                   style={{
//                     background: "#F7F3EC",
//                     color: "#5E5A54",
//                     fontFamily: "var(--font-inter)",
//                   }}
//                 >
//                   Search: {search}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Products Matrix layout */}
//       {activeCategory === "All" && !search ? (
//         Object.entries(grouped).map(([category, items]) => (
//           // <section
//           //   key={category}
//           //   className="max-w-[1280px] mx-auto px-6 pb-16 pt-4"
//           // >
//           <section
//             key={category}
//             className="max-w-[1280px] mx-auto px-6 pb-16 pt-6"
//           >
//             <div className="flex items-end justify-between mb-6">
//               <div>
//                 <div className="flex items-center gap-2 mb-2">
//                   <span className="w-3 h-[1.5px] bg-gold" />
//                   <p className="text-[11px] uppercase tracking-widest text-gold font-bold">
//                     Collection Range ({items.length})
//                   </p>
//                 </div>
//                 <h2
//                   className="font-serif text-2xl md:text-3xl font-medium text-charcoal tracking-tight"
//                   style={{ fontFamily: "var(--font-cormorant)" }}
//                 >
//                   {category}
//                 </h2>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {items.map((product, index) => (
//                 <ProductCard key={product.id} product={product} index={index} />
//               ))}
//             </div>
//           </section>
//         ))
//       ) : (
//         <section className="max-w-[1280px] mx-auto px-6 pb-16">
//           {filtered.length === 0 ? (
//             <div className="text-center py-24 bg-white rounded-3xl border border-[#EDE6DA] my-4 shadow-sm">
//               <p className="font-serif text-xl text-charcoal-muted mb-2">
//                 No products match your framework
//               </p>
//               <p className="text-sm text-charcoal-muted/70">
//                 Try modifying your text search query or switch categories.
//               </p>
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
//               {filtered.map((product, index) => (
//                 <ProductCard key={product.id} product={product} index={index} />
//               ))}
//             </div>
//           )}
//         </section>
//       )}

//       {/* CTA INTERACTIVE BLUEPRINT PANEL */}
//       <motion.section
//         className="py-16 bg-[#FAF8F5] border-t border-[#EDE6DA]"
//         initial={{ opacity: 0, y: 15 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="max-w-[900px] mx-auto px-6 text-center bg-[#2D2D2D] rounded-3xl p-12 md:p-16 shadow-xl relative overflow-hidden">
//           <p className="text-xs uppercase tracking-widest text-gold font-bold mb-3">
//             Color Architecture Assistance
//           </p>
//           <h2 className="font-serif text-4xl font-medium text-white mb-4 leading-tight">
//             Can't Decide on Tone Swatches?
//           </h2>
//           <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
//             Skip guessing layouts. Our design masters can overlay
//             high-performance physical coat swatches directly onto your
//             properties under exact lighting frameworks.
//           </p>
//           <Link
//             href="/assistance"
//             className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F3E7C9] text-[#2D2D2D] rounded-xl font-semibold transition-all hover:scale-[1.02] shadow-md text-sm group"
//           >
//             Book Free Color Art Consultation{" "}
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//           </Link>
//         </div>
//       </motion.section>

//       <Footer />
//     </div>
//   );
// }

// function ProductCard({
//   product,
//   index = 0,
// }: {
//   product: Product;
//   index?: number;
// }) {
//   const accents = ["#E91E8C", "#2196F3", "#4CAF50", "#FF5722", "#FFC107"];
//   const accent = accents[index % accents.length];
//   const isTallPack =
//     product.name.toLowerCase().includes("plaster") ||
//     product.name.toLowerCase().includes("cement") ||
//     product.name.toLowerCase().includes("ready-mix");

//   return (
//     <Link
//       href={`/products/${product.slug}`}
//       className="group block rounded-[1.5rem] bg-white overflow-hidden border border-[#ece7df] shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300"
//     >
//       <div className="h-1.5 w-full" style={{ background: accent }} />
//       {/* <div className="relative bg-[#FDFBF9] flex items-center justify-center px-3 sm:px-4 overflow-hidden" style={{ height: 250 }}> */}
//       <div className="relative bg-[#FDFBF9] flex items-center justify-center px-3 sm:px-4 overflow-hidden min-h-[250px]">
//         <div
//           className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//           style={{
//             background: `radial-gradient(ellipse at center, ${accent}12 0%, transparent 72%)`,
//           }}
//         />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02),transparent_62%)]" />
//         <div className="relative z-10 flex items-center justify-center w-full h-full px-4 py-4">
//           <Image
//             src={product.image}
//             alt={product.name}
//             width={320}
//             height={320}
//             className={`w-auto max-w-full object-contain  transition-transform duration-500 group-hover:scale-[1.05] drop-shadow-[0_18px_28px_rgba(0,0,0,0.10)] ${
//               isTallPack
//                 ? "max-h-[185px] sm:max-h-[200px]"
//                 : "max-h-[205px] sm:max-h-[220px]"
//             }`}
//           />
//         </div>
//         {/* <span
//           className="absolute top-4 right-4 text-[9px] font-bold font-inter uppercase tracking-[0.18em] px-2.5 py-1 rounded-full text-white"
//           style={{ background: accent }}
//         >
//           {product.category?.split(" ")[0] ?? "Paint"}
//         </span> */}
//       </div>

//       <div className="p-5 sm:p-6">
//         <span
//           className="inline-flex items-center mb-3 text-[9px] font-bold font-inter uppercase tracking-[0.18em] px-2.5 py-1 rounded-full text-white"
//           style={{ background: accent }}
//         >
//           {product.category?.split(" ")[0] ?? "Paint"}
//         </span>
//         <h3 className="font-inter text-[1.50rem] leading-[1.12] font-medium text-charcoal mb-2 transition-colors duration-200">
//           {product.name}
//         </h3>
//         <p className="text-[15px] leading-6 text-charcoal-muted line-clamp-2 mb-4">
//           {product.description}
//         </p>
//         <div className="flex flex-wrap gap-1.5 mb-5">
//           {product.features.slice(0, 3).map((f) => (
//             <span
//               key={f}
//               className="text-[9px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
//               style={{ background: `${accent}12`, color: accent }}
//             >
//               {f}
//             </span>
//           ))}
//         </div>
//         <div
//           className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] transition-all"
//           style={{ color: accent }}
//         >
//           View Details <ArrowRight className="w-3.5 h-3.5" />
//         </div>
//       </div>
//     </Link>
//   );
// }

"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { ArrowRight, Search, Phone, Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { products } from "./data";
import type { Product } from "./data";
import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";
import { CATEGORY_TAXONOMY, SLUG_TO_CATEGORIES, checkTaxonomyCoverage } from "./categoryTaxonomy";

// ─── Curated Edits ──────────────────────────────────────────────────────────
// Editorial, story-led entry points into the catalogue — the way Colorsome
// wants customers to discover products (by need/occasion), not just a flat
// category filter. Each edit maps to one real category so "Explore Edit"
// genuinely filters the grid below to matching, in-stock products.
const CURATED_EDITS = [
  {
    title: "The Monsoon Shield Edit",
    story: "Terraces, parapets and basements — sealed and stress-tested before the first storm hits.",
    category: "Waterproofing",
    // image: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=900&q=80",
    image: "/Monsoon.png",
    focus: "center 30%",
  },
  {
    title: "The Architect's Palette",
    story: "Lime-based finishes and heritage textures for spaces designed to be looked at twice.",
    category: "Wall Finishes",
    // image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=900&q=80",
    image: "/ArchPalette.png",
    focus: "center 15%",
  },
  {
    title: "The First Home Edit",
    story: "Everything a fresh interior needs — smooth, washable, low-VOC finishes for rooms you'll live in.",
    category: "Interior Paints",
    // image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=80",
    image: "/FirstHome.png",
    focus: "center 10%",
  },
  {
    title: "The Industrial Grade Edit",
    story: "Chemical, UV and corrosion resistance for plants, pipelines and heavy machinery.",
    category: "Protective Coatings",
    // image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    image: "/Industrial.png",
    focus: "center 20%",
  },
];

// Pills shown in the sticky filter bar: "All" plus the 5 mega-menu columns
// (replaces the old 13-raw-category row now that discovery-by-category lives
// in the header mega-menu — this bar is just for refining, not full browsing).
const FILTER_PILLS = [
  { slug: "All", label: "All" },
  ...CATEGORY_TAXONOMY.map((c) => ({ slug: c.slug, label: c.title })),
];

const INITIAL_VISIBLE = 16;
const LOAD_MORE_STEP = 16;
const CURATED_SECTION_CAP = 8;

// Resolves a URL `?category=` value (which may be a taxonomy column slug, a
// taxonomy subcategory slug, or a legacy raw category string like the ones
// CURATED_EDITS and Footer links already use) into a readable label and the
// list of raw `product.category` values it should match.
function resolveCategory(value: string): { label: string; rawCategories: string[] | null } {
  if (value === "All") return { label: "All", rawCategories: null };
  const column = CATEGORY_TAXONOMY.find((c) => c.slug === value);
  if (column) return { label: column.title, rawCategories: SLUG_TO_CATEGORIES[value] };
  for (const c of CATEGORY_TAXONOMY) {
    const sub = c.subcategories.find((s) => s.slug === value);
    if (sub) return { label: sub.label, rawCategories: sub.categories };
  }
  // Legacy: a literal raw category string (CURATED_EDITS, old Footer links)
  return { label: value, rawCategories: [value] };
}

function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "All";
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const setCategory = (value: string) => {
    router.push(value === "All" ? "/products" : `/products?category=${value}`, { scroll: false });
  };

  useEffect(() => {
    // behavior: 'instant' overrides globals.css's `scroll-behavior: smooth`
    // on <html> so this jumps to the top instead of visibly animating up
    // from wherever the previous page was scrolled to.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Dev-time integrity check — if a new category is ever added to data.ts
  // without a taxonomy home, warn loudly instead of silently hiding products
  // the way the old hardcoded 13-category list used to.
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const allRawCategories = [...new Set(products.map((p) => p.category))];
      const { missing, duplicated } = checkTaxonomyCoverage(allRawCategories);
      if (missing.length) console.warn("[categoryTaxonomy] categories missing from taxonomy:", missing);
      if (duplicated.length) console.warn("[categoryTaxonomy] categories listed in more than one subcategory:", duplicated);
    }
  }, []);

  // Reset pagination whenever the active filter changes so "Load More" always
  // starts from a fresh, predictable window instead of carrying over state.
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [activeCategory, search]);

  const { label: activeCategoryLabel, rawCategories: activeRawCategories } = resolveCategory(activeCategory);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || (activeRawCategories?.includes(p.category) ?? false);
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const visibleFiltered = filtered.slice(0, visibleCount);

  // Default "All" browse view: grouped by the 5 real taxonomy columns, which
  // together cover every raw category in data.ts (unlike the old hardcoded
  // 13-item list, which silently dropped ~40 products in categories it
  // didn't know about).
  const grouped = useMemo(() => {
    const acc: Record<string, { title: string; slug: string; items: Product[] }> = {};
    for (const column of CATEGORY_TAXONOMY) {
      const items = products.filter((p) => SLUG_TO_CATEGORIES[column.slug].includes(p.category));
      if (items.length) acc[column.slug] = { title: column.title, slug: column.slug, items };
    }
    return acc;
  }, []);

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-[72px]">
      <Header />

      {/* Structured Hero Section - Premium Textured Architectural Blueprint Coating */}
      <section className="py-16 md:py-24 bg-[#FDFBF7] border-b border-[#EDE6DA] relative overflow-hidden">
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

        {/* Dynamic Soft Sunlit Glow Overlay */}
        <div className="absolute top-0 right-0 w-[55%] h-full bg-[radial-gradient(circle_at_top_right,rgba(243,231,201,0.5),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.03),transparent_65%)] pointer-events-none filter blur-xl" />

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Column: Typography Content */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-2.5 mb-4 font-inter">
                <Sparkles className="w-3.5 h-3.5 text-[#C4704B]" />
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C4704B] font-black">
                  Our Catalog
                </p>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-charcoal mb-6 leading-none tracking-tight">
                Premium Surface
                <br />
                <span className="bg-gradient-to-r from-[#8C6478] to-[#C4704B] bg-clip-text text-transparent">
                  Solutions
                </span>
              </h1>
              <p className="text-[15px] sm:text-[17px] text-charcoal-muted leading-relaxed font-sans font-light tracking-wide max-w-xl">
                A comprehensive architectural range of paints, protective
                coatings, high-performance primers, and smart construction
                products - engineered strictly for superior protection, elegant
                finishes, and enduring life.
              </p>
            </motion.div>

            {/* Right Column: High Contrast Premium Studio Frame Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="relative w-full h-[340px] sm:h-[420px] md:h-[460px] rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(45,45,45,0.05)] border border-white bg-white p-3.5 group"
            >
              <div className="w-full h-full rounded-[1.9rem] overflow-hidden relative bg-[#FBF9F5] border border-[#EDE6DA]">
                {/* Micro Ambient Color Mesh overlay in the image frame */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#F3E7C9]/15 to-transparent z-10 pointer-events-none mix-blend-multiply" />
                <Image
                  src="/productpageimg.png"
                  alt="Colorsome complete architectural product line showroom installation display"
                  fill
                  priority
                  className="object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CURATED EDITS ── */}
      <section className="py-16 md:py-20 bg-white border-b border-[#EDE6DA]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-end justify-between mb-8 gap-6 flex-wrap">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                Curated by Colorsome
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal tracking-tight" style={{ fontFamily: "var(--font-display), serif" }}>
                Shop the Edits
              </h2>
            </div>
            <p className="text-sm text-charcoal-muted max-w-sm leading-relaxed">
              Hand-picked entry points for the moments that matter — a monsoon coming, a first home, a job site. Not just a catalogue, a starting point.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CURATED_EDITS.map((edit) => {
              const count = products.filter((p) => p.category === edit.category).length;
              return (
                <button
                  key={edit.title}
                  onClick={() => {
                    setCategory(edit.category);
                    setSearch("");
                    document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="group relative text-left rounded-[1.5rem] overflow-hidden h-80 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-400"
                >
                  <img
                    src={edit.image}
                    alt={edit.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: edit.focus }}
                  />
                  {/* Solid dark base + gradient — legible over any photo, not just a light wash */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/10" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.55), transparent 60%)" }} />

                  <span
                    className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-white shadow-sm"
                    style={{ background: "var(--gold)" }}
                  >
                    {count} Products
                  </span>

                  {/* Frosted caption panel — stays readable regardless of the photo underneath */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 pt-8 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-[2px]">
                    <h3 className="text-xl font-bold text-white mb-1.5 leading-tight" style={{ fontFamily: "var(--font-display), serif" }}>
                      {edit.title}
                    </h3>
                    <p className="text-xs text-white/75 leading-relaxed mb-3">{edit.story}</p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider" style={{ color: "var(--gold-light)" }}>
                      Explore Edit
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="h-[2px] w-6 group-hover:w-full transition-all duration-500 rounded-full mt-3" style={{ background: "var(--gold)" }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <section className="bg-charcoal sticky top-[72px] z-40 py-3.5 shadow-md">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <div className="relative flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 sm:pr-4 py-2 bg-white/10 border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-gold/60 w-28 sm:w-40 md:w-52 transition-colors focus:bg-white/15"
              />
            </div>

            {/* Category pills — "All" + the 5 mega-menu columns. Full
                category/subcategory browsing now lives in the header
                mega-menu, so this bar stays a lightweight refinement tool
                rather than repeating the same 13+ raw categories twice. */}
            <div className="flex items-center overflow-x-auto gap-2 scrollbar-hide flex-1 pr-4">
              {FILTER_PILLS.map((pill) => (
                <button
                  key={pill.slug}
                  onClick={() => setCategory(pill.slug)}
                  className={`px-4 py-2.5 md:py-2 rounded-xl text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 shrink-0 ${
                    activeCategory === pill.slug
                      ? "bg-gold text-white shadow-sm scale-[1.02]"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product count indicator strip */}
      <div id="product-grid" className="max-w-[1280px] mx-auto px-6 py-6 scroll-mt-[140px]">
        <div className="relative overflow-hidden bg-white border border-[#EDE6DA] rounded-[1.5rem] px-5 sm:px-6 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.03)]">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05] rounded-[1.5rem]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(45,45,45,0.18) 1px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.18em] font-bold text-gold mb-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Product Overview
              </p>
              <h2
                className="text-[1.50rem] sm:text-[1.5rem] leading-tight text-charcoal font-semibold"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Displaying {filtered.length} product
                {filtered.length !== 1 ? "s" : ""}
                {activeCategory !== "All" ? ` in ${activeCategoryLabel}` : ""}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.14em] font-bold"
                style={{
                  background: "#F3E7C9",
                  color: "#8A6A2F",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {activeCategoryLabel}
              </span>

              {search && (
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.14em] font-bold"
                  style={{
                    background: "#F7F3EC",
                    color: "#5E5A54",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  Search: {search}
                </span>
              )}
            </div>
          </div>
        </div>
        <p
          className="text-[10px] text-[#B0A898] mt-3 px-1 leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Product images are for representation purposes only. Actual colour, shade, and finish may vary depending on screen display, surface, and application.
        </p>
      </div>

      {/* Products Matrix layout */}
      {activeCategory === "All" && !search ? (
        Object.values(grouped).map(({ title, slug, items }) => {
          const shown = items.slice(0, CURATED_SECTION_CAP);
          return (
            <section
              key={slug}
              className="max-w-[1280px] mx-auto px-6 pb-16 pt-6"
            >
              <div className="flex items-end justify-between mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-[1.5px] bg-gold" />
                    <p className="text-[11px] uppercase tracking-widest text-gold font-bold">
                      Collection Range ({items.length})
                    </p>
                  </div>
                  <h2
                    className="font-serif text-2xl md:text-3xl font-medium text-charcoal tracking-tight"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {title}
                  </h2>
                </div>
                {items.length > CURATED_SECTION_CAP && (
                  <button
                    onClick={() => {
                      setCategory(slug);
                      document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold hover:text-charcoal transition-colors whitespace-nowrap"
                  >
                    View All {items.length}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {shown.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </section>
          );
        })
      ) : (
        <section className="max-w-[1280px] mx-auto px-6 pb-16">
          {filtered.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-[#EDE6DA] my-4 shadow-sm">
              <p className="font-serif text-xl text-charcoal-muted mb-2">
                No products match your framework
              </p>
              <p className="text-sm text-charcoal-muted/70">
                Try modifying your text search query or switch categories.
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
                {visibleFiltered.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
              {visibleCount < filtered.length && (
                <div className="flex justify-center pt-10">
                  <button
                    onClick={() => setVisibleCount((v) => v + LOAD_MORE_STEP)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest border border-[#EDE6DA] text-charcoal bg-white hover:bg-[#FAF8F5] hover:border-gold/40 transition-all duration-200"
                  >
                    Load More ({filtered.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      )}

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
            style={{ background: '#C9A858' }}
            animate={{ opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[90px] pointer-events-none"
            style={{ background: '#C4704B' }}
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

// useSearchParams() requires a Suspense boundary in the App Router — the
// filter state (search term aside) now lives entirely in the URL so
// category deep-links from the mega-menu/mobile accordion/Footer/curated
// edits all work with refresh and browser back/forward.
export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageContent />
    </Suspense>
  );
}

function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  // Restrained luxury palette — see src/lib/palette.ts for the shared source.
  const accents = ["#C9A858", "#C4704B", "#8B9E7E", "#2C3E50", "#8C6478"];
  const accent = accents[index % accents.length];
  const isTallPack =
    product.name.toLowerCase().includes("plaster") ||
    product.name.toLowerCase().includes("cement") ||
    product.name.toLowerCase().includes("ready-mix");

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.08 }}
    >
    <Link
      href={`/products/${product.slug}`}
      className="group block rounded-[1.5rem] bg-white border border-[#ece7df] shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.09)] transition-all duration-500 relative h-auto lg:h-[480px] overflow-hidden"
    >
      {/* Top Accent Color Strip */}
      <div
        className="h-1.5 w-full absolute top-0 left-0 right-0 z-30"
        style={{ background: accent }}
      />

      {/* Radial Hover Background Ambient Ring */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${accent}0D 0%, transparent 65%)`,
        }}
      />

      {/* ── IMAGE SECTION (Floats gently, animates upwards and scales down on hover) ── */}
      <motion.div
        className="static lg:absolute lg:inset-x-0 lg:top-0 flex items-center justify-center px-4 z-10 origin-center"
        initial={{ y: 25, scale: 1 }}
        animate={{ y: [25, 17, 25] }}
        whileHover={{ y: -20, scale: 0.85 }}
        style={{ height: "250px" }}
        transition={{
          y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
          scale: { type: "spring", damping: 25, stiffness: 140 },
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.015),transparent_60%)] pointer-events-none" />
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 140, height: 140, background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <Image
          src={product.image}
          alt={product.name}
          width={320}
          height={320}
          className={`relative w-auto max-w-full object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.08)] transition-transform duration-500 group-hover:scale-[1.04] ${
            isTallPack
              ? "max-h-[185px] sm:max-h-[200px]"
              : "max-h-[205px] sm:max-h-[220px]"
          }`}
        />
      </motion.div>

      {/* ── CONTENT PANEL ── */}
      {/* Container wraps both structural state displays cleanly via CSS and translate transforms */}
      <div className="static lg:absolute lg:inset-x-0 lg:bottom-0 px-6 pb-6 pt-4 flex flex-col justify-end bg-white z-20 transition-transform duration-500 transform translate-y-0 lg:translate-y-[115px] lg:group-hover:translate-y-0">
        {/* Category Pill Tag + one always-visible feature badge */}
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <span
            className="inline-flex items-center text-[9px] font-bold font-inter uppercase tracking-[0.18em] px-2.5 py-1 rounded-full text-white"
            style={{ background: accent }}
          >
            {product.category?.split(" ")[0] ?? "Paint"}
          </span>
          {product.features[0] && (
            <span
              className="text-[9px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
              style={{ background: `${accent}12`, color: accent }}
            >
              {product.features[0]}
            </span>
          )}
        </div>

        {/* Product Title Headline */}
        <h3 className="font-inter text-[1.4rem] leading-[1.15] font-medium text-charcoal mb-2">
          {product.name}
        </h3>

        {/* Product Description Sheet */}
        <p className="text-[13.5px] leading-relaxed text-charcoal-muted line-clamp-3 mb-4 h-[60px]">
          {product.description}
        </p>

        {/* ── HIDDEN PANEL (always visible on mobile; slides smoothly into view on hover from lg upward) ── */}
        <div className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 lg:delay-100">
          {/* Remaining Performance Feature Badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.features.slice(1, 3).map((f) => (
              <span
                key={f}
                className="text-[9px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
                style={{ background: `${accent}12`, color: accent }}
              >
                {f}
              </span>
            ))}
          </div>

          {/* Interactive Call-To-Action Link Button */}
          <div
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em]"
            style={{ color: accent }}
          >
            View Product{" "}
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
    </motion.div>
  );
}
