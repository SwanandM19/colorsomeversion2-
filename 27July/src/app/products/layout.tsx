import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "A comprehensive architectural range of paints, protective coatings, high-performance primers, and smart construction products - engineered strictly for superior protection, elegant finishes, and enduring life.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
