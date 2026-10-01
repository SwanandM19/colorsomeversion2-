import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in Mumbai, Colorsome Paints began with a simple yet profound vision: to bring world-class paint quality and sophisticated finishes to Indian homes. Today, we have served over 100,000 homeowners with premium products and expert craftsmanship.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
