import type { Metadata } from "next";

export const metadata: Metadata = {
  // See paint-quantity/layout.tsx for why this is spelled out in full
  // rather than left to the root title.template.
  title: "Painting Cost Calculator | Colorsome Paints",
  description:
    "Tell us about your project and we'll break the estimate down by paint, primer, putty and labour — not one opaque number.",
};

export default function PaintingCostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
