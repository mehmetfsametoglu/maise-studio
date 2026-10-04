import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "@/lib/services";
import { PROJECTS } from "@/lib/projects";
import { faqById } from "@/lib/faq";
import { PACKAGES } from "@/lib/pricing";
import { UI } from "@/lib/l10n";
import { ORG_ID, JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { SITE, absoluteUrl } from "@/lib/site";
import {
  Callout,
  ClosingCta,
  ContentSection,
  FaqList,
  ItemGrid,
  PageHero,
  PriceBlock,
  ProjectLinkCard,
  Summary,
  T,
} from "@/components/page-kit";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({
    title: s.metaTitle,
    description: s.metaDescription,
    path: `/services/${s.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const projects = s.projects.map((id) => PROJECTS.find((p) => p.slug === id)!);
  const faq = faqById(s.faq);
  const url = absoluteUrl(`/services/${s.slug}`);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.name.fr,
    serviceType: s.serviceType,
    description: s.summary.fr,
    url,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: SITE.countryName },
    // Prices are only published for the core site-creation service.
    ...(s.priced
      ? {
          offers: [PACKAGES.essentiel, PACKAGES.signature].map((p) => ({
            "@type": "Offer",
            name: p.name,
            description: `${p.summary} Prix indicatif, devis final selon le périmètre.`,
            price: String(p.eur),
            priceCurrency: "EUR",
          })),
        }
      : {}),
  };

  return (
    <div>
      <JsonLd
        data={[
          serviceJsonLd,
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/services" },
            { name: s.name.fr, path: `/services/${s.slug}` },
          ]),
        ]}
      />

      <PageHero
        crumbs={[{ name: UI.home, href: "/" }, { name: UI.services, href: "/services" }, { name: s.name }]}
        title={s.h1}
        lead={s.lead}
      />
      <Summary>{s.summary}</Summary>
      {s.honesty && <Callout title={s.honesty.title} text={s.honesty.text} />}

      {s.sections.map((sec) => (
        <ContentSection key={sec.id} id={sec.id} title={sec.title} intro={sec.intro}>
          <ItemGrid items={sec.items} />
        </ContentSection>
      ))}

      {s.priced && (
        <ContentSection id="prix" title={UI.priceTitle}>
          <PriceBlock />
        </ContentSection>
      )}

      {projects.length > 0 && (
        <ContentSection id="realisations" title={s.projectsTitle ?? UI.work} world="world-navy">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectLinkCard key={p.slug} project={p} />
            ))}
          </div>
        </ContentSection>
      )}

      <ContentSection id="faq" title={UI.faq}>
        <FaqList items={faq} />
        <p className="mt-6 text-sm text-muted-foreground">
          <T l={UI.anotherQuestion} />{" "}
          <Link href="/faq" className="text-accent underline-offset-4 hover:underline">
            <T l={UI.allAnswers} />
          </Link>
          , <T l={UI.or} />{" "}
          <Link href="/contact" className="text-accent underline-offset-4 hover:underline">
            <T l={UI.writeUs} />
          </Link>
          .
        </p>
      </ContentSection>

      <ClosingCta />
    </div>
  );
}
