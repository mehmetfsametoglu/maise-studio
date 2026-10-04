import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import { UI } from "@/lib/l10n";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { ClosingCta, ContentSection, PageHero, Summary, T } from "@/components/page-kit";

export const metadata: Metadata = pageMetadata({
  title: "Services web : restaurants, hôtels, commerces | Maisé Studio",
  description:
    "Création de site sur mesure, sites pour restaurants et cafés, hôtels, boutiques, SEO et visibilité IA. Maisé Studio, studio web à Paris.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHero
        crumbs={[{ name: UI.home, href: "/" }, { name: UI.services }]}
        kicker={UI.servicesKicker}
        title={UI.servicesTitle}
        lead={UI.servicesLead}
      />
      <Summary>{SITE.long}</Summary>

      <ContentSection title={UI.servicesByActivity}>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-border bg-card p-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
              >
                <div>
                  <h2 className="display text-2xl text-foreground"><T l={s.name} /></h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground"><T l={s.cardText} /></p>
                </div>
                <ArrowUpRight
                  size={18}
                  aria-hidden
                  className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-accent"
                />
              </Link>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ClosingCta title={UI.servicesClosingTitle} text={UI.servicesClosingText} />
    </div>
  );
}
