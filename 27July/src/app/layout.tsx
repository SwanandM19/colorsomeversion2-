
// in src/app/layout.tsx
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { ChatBot } from '@/src/components/ChatBot';
import { ScrollReveal } from '../components/ScrollReveal';
import { PaletteProvider } from '../lib/palette';

export const metadata: Metadata = {
  title: 'Colorsome Paints ',
  description:
    'Premium interior and exterior paints with superior finish, lasting durability, and rich colour depth. Expert guidance for perfect results.',
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable}`}>
        {/* Without JS the IntersectionObserver in ScrollReveal never runs,
            so .reveal/.reveal-hero would stay at opacity:0 forever — force
            them visible in that case. */}
        <noscript>
          <style>{`.reveal,.reveal-hero{opacity:1 !important;transform:none !important;filter:none !important}`}</style>
        </noscript>
        <PaletteProvider>
          {children}
          <ScrollReveal />
        </PaletteProvider>
        {/* <ChatBot /> */}
      </body>
    </html>
  );
}