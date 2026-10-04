import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SERVICES } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";

// Indexable marketing pages only. Left out on purpose: /examples (honest demos,
// not content meant to rank), the legal pages (noindex until completed) and /api.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/realisations",
    ...PROJECTS.map((p) => `/realisations/${p.slug}`),
    "/services",
    ...SERVICES.map((s) => `/services/${s.slug}`),
    "/studio",
    "/faq",
    "/contact",
  ];
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
