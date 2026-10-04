import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-kit";

// TODO(owner): fill the three "À compléter" fields below, then remove `noindex`.
// Nothing here is guessed: the legal identity of the publisher is not
// documented anywhere in the project, so it is left visibly blank.
export const metadata: Metadata = pageMetadata({
  title: "Mentions légales | Maisé Studio",
  description: "Éditeur, hébergeur et conditions d'utilisation du site de Maisé Studio.",
  path: "/mentions-legales",
  noindex: true,
});

const TODO = "À compléter";

export default function LegalPage() {
  return (
    <div>
      <PageHero crumbs={[{ name: "Accueil", href: "/" }, { name: "Mentions légales" }]} title="Mentions légales." />
      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-3xl space-y-10 text-sm leading-relaxed text-foreground/85">
          <div>
            <h2 className="mb-3 text-base font-semibold text-foreground">Éditeur du site</h2>
            <p>
              {SITE.name}, studio de design et développement web basé à {SITE.locality}, {SITE.countryName}.
            </p>
            <ul className="mt-3 space-y-1 text-muted-foreground">
              <li>Forme juridique et numéro d&apos;immatriculation : {TODO}</li>
              <li>Adresse du siège : {TODO}</li>
              <li>Responsables de la publication : {SITE.team.join(" et ")}</li>
              <li>
                E-mail :{" "}
                <a href={`mailto:${SITE.email}`} className="text-accent underline-offset-4 hover:underline">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-base font-semibold text-foreground">Hébergeur</h2>
            <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-semibold text-foreground">Propriété du contenu</h2>
            <p>
              Les textes, le design et le code de ce site appartiennent à {SITE.name}. Les sites présentés dans les
              réalisations, leurs marques, leurs photos et leurs textes appartiennent à leurs propriétaires.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-semibold text-foreground">Liens vers d&apos;autres sites</h2>
            <p>
              Ce site renvoie vers des sites de clients et vers WhatsApp. {SITE.name} n&apos;est pas responsable de leur
              contenu ni de leurs pratiques.
            </p>
          </div>
          <p className="text-muted-foreground">
            Voir aussi la <Link href="/confidentialite" className="text-accent underline-offset-4 hover:underline">politique de confidentialité</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
