import type { Metadata } from "next";
import { SITE, absoluteUrl } from "@/lib/site";

// One metadata pattern for every page: unique title and description, a
// self-referencing canonical, Open Graph and Twitter tags with absolute URLs.
// Next replaces nested metadata objects instead of merging them, so each page
// builds the full set here rather than overriding pieces of the layout's.
// Pages without their own picture share the studio card (app/opengraph-image.tsx).
const DEFAULT_OG_IMAGE = "/opengraph-image";

export function pageMetadata({
  title,
  description,
  path,
  image,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "fr_FR",
      url,
      title,
      description,
      images: [{ url: absoluteUrl(ogImage), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(ogImage)],
    },
  };
}

export const ORG_ID = `${SITE.url}/#organization`;

// The one Organization entity. Other blocks refer to it by @id instead of
// repeating (and possibly contradicting) its fields.
export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/icon.svg`,
  description: SITE.short,
  email: SITE.email,
  address: { "@type": "PostalAddress", addressLocality: SITE.locality, addressCountry: SITE.country },
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Türkiye" },
  ],
  knowsAbout: ["Web design", "Web development", "UX/UI design", "Creative direction", "Technical SEO"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: SITE.email,
    availableLanguage: ["fr", "en", "tr"],
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "19:00",
    },
  },
  ...(SITE.sameAs.length ? { sameAs: [...SITE.sameAs] } : {}),
};

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  inLanguage: "fr",
  publisher: { "@id": ORG_ID },
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  // "<" is escaped so no string in the data can close the script tag.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
