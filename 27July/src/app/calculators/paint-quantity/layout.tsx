import type { Metadata } from "next";

export const metadata: Metadata = {
  // Explicit full title rather than relying on the root title.template —
  // that template only cascades to direct children of the root layout;
  // this route is nested two levels down (root -> calculators -> here),
  // and Next.js doesn't chain the template through an intermediate layout
  // that already resolved its own plain-string title (calculators/layout.tsx).
  title: "Paint Quantity Calculator | Colorsome Paints",
  description:
    "Enter your room dimensions or a known area, pick a paint type, and get a real quantity estimate with a practical pack-size recommendation.",
};

export default function PaintQuantityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
