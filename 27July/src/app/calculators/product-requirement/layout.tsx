import type { Metadata } from "next";

export const metadata: Metadata = {
  // See paint-quantity/layout.tsx for why this is spelled out in full
  // rather than left to the root title.template.
  title: "Product Requirement Calculator | Colorsome Paints",
  description:
    "A guided, layer-by-layer estimate — from surface preparation through to topcoat — sized to your actual area.",
};

export default function ProductRequirementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
