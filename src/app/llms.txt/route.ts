import { PROJECTS } from "@/lib/projects";
import { SERVICES } from "@/lib/services";
import { PACKAGES, EXTRA_LANGUAGE, formatEur } from "@/lib/pricing";
import { SITE, absoluteUrl } from "@/lib/site";

// Optional plain-text summary for tools that look for it. It repeats facts that
// are already written in the pages; it does not replace them and nothing
// guarantees a given assistant reads it. Generated from the same data as the
// site so prices and pages can't drift.
export const dynamic = "force-static";

export function GET() {
  const body = `# ${SITE.name}

> ${SITE.short}
> ${SITE.name} is a web design and development studio based in Paris, France. It builds custom websites for restaurants, cafés, hotels, shops and local businesses.

## Services
${SERVICES.map((s) => `- [${s.name.fr}](${absoluteUrl(`/services/${s.slug}`)}): ${s.cardText.fr}`).join("\n")}

## Selected work
${PROJECTS.map((p) => `- [${p.name}](${absoluteUrl(`/realisations/${p.slug}`)}): ${p.sector.fr}, ${p.city}. Langue du site : ${p.siteLanguage.fr.toLowerCase()}.`).join("\n")}

## Pricing (indicative, final quote depends on scope)
- ${PACKAGES.essentiel.name}: from ${formatEur(PACKAGES.essentiel.eur)}. ${PACKAGES.essentiel.summary}
- ${PACKAGES.signature.name}: from ${formatEur(PACKAGES.signature.eur)}. ${PACKAGES.signature.summary}
- One language included, each extra language ${formatEur(EXTRA_LANGUAGE.eur)}.

## Key pages
- [Home](${absoluteUrl("/")})
- [Portfolio](${absoluteUrl("/realisations")})
- [Services](${absoluteUrl("/services")})
- [Studio](${absoluteUrl("/studio")})
- [FAQ](${absoluteUrl("/faq")})
- [Contact](${absoluteUrl("/contact")})

## Contact
- E-mail: ${SITE.email}
- Location: Paris, France
- Availability: every day, 9:00 to 19:00 (Europe/Paris)
- Languages: French, English, Turkish
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
