import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shades & Colour Palettes",
  description:
    "Explore our curated collections. From highly sophisticated neutrals to dramatic, modern statement accents, uncover tones precisely formulated to command lighting.",
};

export default function ShadesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
