import type { MetadataRoute } from "next";

const BASE = "https://maisestudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/work", "/examples", "/studio", "/contact"].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
