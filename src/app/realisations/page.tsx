import type { Metadata } from "next";
import { WorkIndex } from "@/components/work-index";
import { ConceptSites } from "@/components/concept-sites";
import { PROJECTS } from "@/lib/projects";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Réalisations web | Maisé Studio Paris",
  description:
    "Les sites que Maisé Studio a conçus et mis en ligne : un bar à Paris, deux restaurants et cafés à Istanbul, un atelier à Los Angeles.",
  path: "/realisations",
});

export default function RealisationsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Réalisations", path: "/realisations" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Réalisations de Maisé Studio",
            itemListElement: PROJECTS.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: absoluteUrl(`/realisations/${p.slug}`),
            })),
          },
        ]}
      />
      <WorkIndex />
      <ConceptSites />
    </>
  );
}
