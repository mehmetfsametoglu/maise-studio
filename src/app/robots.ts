import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Public pages are open to everyone, including the search crawler behind
// ChatGPT Search (OAI-SearchBot). /api/ stays closed to all of them: it holds
// the WhatsApp redirect, which must never be crawled. A crawler with its own
// group ignores the "*" group, so the Disallow is repeated there.
// Search visibility and model training are separate questions: this file does
// not mention training crawlers.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/go/"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/api/", "/go/"] },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
