import type { Metadata } from "next";
import { FAQ, faqJsonLd } from "@/lib/faq";
import { UI } from "@/lib/l10n";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { ClosingCta, ContentSection, FaqList, PageHero } from "@/components/page-kit";

export const metadata: Metadata = pageMetadata({
  title: "Questions fréquentes : prix, délais, SEO | Maisé Studio",
  description:
    "Prix, délais, langues, réservation, hébergement, SEO : les réponses de Maisé Studio aux questions qu'on nous pose avant de créer un site.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div>
      {/* Same questions and answers as the visible list below, nothing more. */}
      <JsonLd
        data={[
          faqJsonLd(FAQ),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Questions fréquentes", path: "/faq" },
          ]),
        ]}
      />
      <PageHero
        crumbs={[{ name: UI.home, href: "/" }, { name: UI.faq }]}
        kicker={UI.faqKicker}
        title={UI.faqTitle}
        lead={UI.faqLead}
      />
      <ContentSection title={UI.faqSection}>
        <FaqList items={FAQ} />
      </ContentSection>
      <ClosingCta title={UI.faqClosingTitle} />
    </div>
  );
}
