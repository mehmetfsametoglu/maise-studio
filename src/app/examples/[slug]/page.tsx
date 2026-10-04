import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONCEPTS, getConcept } from "@/lib/concepts";
import { getService } from "@/lib/services";
import { UI } from "@/lib/l10n";
import { pageMetadata } from "@/lib/seo";
import {
  CaseShots,
  ClosingCta,
  ContentSection,
  LivePreview,
  PageHero,
  Summary,
  T,
} from "@/components/page-kit";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CONCEPTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getConcept(slug);
  if (!c) return {};
  // Example sites are not meant to rank as client work, so they stay out of the index.
  return pageMetadata({
    title: `${c.name}, site d'exemple | Maisé Studio`,
    description: c.summary.fr,
    path: `/examples/${c.slug}`,
    noindex: true,
  });
}

export default async function ConceptPage({ params }: Props) {
  const { slug } = await params;
  const c = getConcept(slug);
  if (!c) notFound();
  const service = getService(c.serviceSlug);

  return (
    <div>
      <PageHero
        crumbs={[{ name: UI.home, href: "/" }, { name: UI.examplesBack, href: "/examples" }, { name: c.name }]}
        kicker={UI.conceptLabel}
        title={c.h1}
        lead={c.summary}
      />

      <CaseShots project={c} />

      <Summary>{c.about}</Summary>

      <ContentSection title={UI.previewTitle}>
        <LivePreview concept={c} />
      </ContentSection>

      <ContentSection title={UI.conceptAbout}>
        <ul className="max-w-2xl space-y-3">
          {c.features.map((f) => (
            <li key={f.fr} className="flex gap-3 text-foreground/90">
              <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
              <span>
                <T l={f} />
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl leading-relaxed text-muted-foreground">
          <T l={c.design} />
        </p>
        {service && (
          <p className="mt-8 text-sm text-muted-foreground">
            <T l={UI.sameType} />{" "}
            <Link href={`/services/${service.slug}`} className="text-accent underline-offset-4 hover:underline">
              <T l={UI.seeOffer} /> <T l={service.name} />
            </Link>
            .
          </p>
        )}
      </ContentSection>

      <ClosingCta title={UI.conceptClosingTitle} text={UI.conceptClosingText} />
    </div>
  );
}
