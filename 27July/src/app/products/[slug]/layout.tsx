import type { Metadata } from "next";
import { products } from "../data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return { title: "Product Not Found | Colorsome Paints" };
  }

  // Explicit full title rather than the root title.template — this route is
  // nested two levels down (root -> products -> here), and the template
  // doesn't chain through products/layout.tsx, which already resolved its
  // own plain-string title.
  const title = `${product.name} | Colorsome Paints`;

  return {
    title,
    description: product.description,
    openGraph: {
      title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
