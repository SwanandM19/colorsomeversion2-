import type { MetadataRoute } from "next";
import { products } from "./products/data";

const BASE_URL = "https://www.colorsomepaints.com";

function buildUrl(path: string) {
  return `${BASE_URL}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/assistance",
    "/contact",
    "/products",
    "/shades",
    "/colour-visualizer",
    "/calculators",
    "/calculators/paint-quantity",
    "/calculators/painting-cost",
    "/calculators/product-requirement",
    "/calculators/waterproofing",
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: buildUrl(`/products/${product.slug}`),
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: buildUrl(route),
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1.0 : 0.7,
  }));

  return [...staticEntries, ...productRoutes];
}
