import { products } from "./products/data";

const BASE_URL = "www.colorsomepaints.com";

function buildUrl(path: string) {
  return `${BASE_URL}${path}`;
}

export default function sitemap() {
  const staticRoutes = [
    "/",
    "/about",
    "/assistance",
    "/contact",
    "/products",
    "/shades",
  ];

  const productRoutes = products.map((product) => ({
    url: buildUrl(`/products/${product.slug}`),
    lastModified: new Date().toISOString(),
    changefreq: "weekly",
    priority: 0.8,
  }));

  const staticEntries = staticRoutes.map((route) => ({
    url: buildUrl(route),
    lastModified: new Date().toISOString(),
    changefreq: "weekly",
    priority: route === "/" ? 1.0 : 0.7,
  }));

  return [...staticEntries, ...productRoutes];
}
