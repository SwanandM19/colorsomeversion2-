import type { Metadata } from "next";

export const metadata: Metadata = {
  // See paint-quantity/layout.tsx for why this is spelled out in full
  // rather than left to the root title.template.
  title: "Waterproofing Calculator | Colorsome Paints",
  description:
    "Select your surface type and area to get a material quantity and a practical pack-size recommendation.",
};

export default function WaterproofingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
