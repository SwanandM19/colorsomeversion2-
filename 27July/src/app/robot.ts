const BASE_URL = "https://www.colorsomepaints.in";

export function getRobotsTxt() {
  return [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${BASE_URL}/sitemap.xml`,
    `Host: ${BASE_URL}`,
  ].join("\n");
}
