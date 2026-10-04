import type { Metadata } from "next";
import { ButtonLink, T } from "@/components/page-kit";
import { UI } from "@/lib/l10n";

export const metadata: Metadata = {
  title: "Page introuvable | Maisé Studio",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center px-6 pt-32 pb-20 md:px-10">
      <div className="mx-auto w-full max-w-3xl">
        <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">
          <T l={UI.nf404} />
        </p>
        <h1 className="display text-[clamp(2.4rem,6vw,4.4rem)] text-foreground">
          <T l={UI.nfTitle} />
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
          <T l={UI.nfText} />
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">
            <T l={UI.home} />
          </ButtonLink>
          <ButtonLink href="/realisations" variant="ghost">
            <T l={UI.work} />
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            <T l={UI.contact} />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
