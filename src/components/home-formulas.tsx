"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useLang, type DictKey } from "@/lib/i18n";
import { PACKAGES, formatEur } from "@/lib/pricing";

// Two cards, one price each (from lib/pricing.ts), then the calculator below
// handles languages and options. No delay is promised here: the quote gives it.
const ESSENTIEL: DictKey[] = ["formulas.ess.1", "formulas.ess.2", "formulas.ess.3", "formulas.ess.4"];
const SIGNATURE: DictKey[] = ["formulas.sig.0", "formulas.sig.1", "formulas.sig.2"];

export function HomeFormulas() {
  const { t, lang } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);
  const tr = lang === "tr";

  const cards = [
    { key: "essentiel" as const, name: t("tier.essentiel.name"), for: t("formulas.ess.for"), items: ESSENTIEL },
    { key: "signature" as const, name: t("tier.signature.name"), for: t("formulas.sig.for"), items: SIGNATURE, featured: true },
  ];

  return (
    <section className="bg-background px-6 py-[clamp(50px,2rem+4.5vw,100px)] md:px-10">
      <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} mx-auto max-w-[1300px]`}>
        <p className="mb-5 flex items-center gap-4 text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
          {t("formulas.kicker")}
          <span aria-hidden className="h-px w-8 bg-brass" />
        </p>
        <h2 className="display max-w-3xl text-balance text-[clamp(1.9rem,4.4vw,3.2rem)] text-foreground">
          {t("formulas.title")}
        </h2>
        <p className="mt-5 max-w-xl text-muted-foreground">{t("formulas.lead")}</p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((c) => {
            const p = PACKAGES[c.key];
            return (
              <article
                key={c.key}
                className={`flex flex-col rounded-[20px] border bg-card p-8 shadow-[var(--shadow-1)] ${
                  c.featured ? "border-accent/50" : "border-border"
                }`}
              >
                <h3 className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">{c.name}</h3>
                <p className="display mt-4 text-[clamp(2.2rem,4vw,3rem)] leading-none text-foreground">
                  <span className="mr-2 font-sans text-sm font-normal text-muted-foreground">{t("formulas.from")}</span>
                  {tr ? `${p.tryPrice.toLocaleString("tr-TR")} ₺` : formatEur(p.eur)}
                </p>
                <p className="mt-4 text-foreground/85">{c.for}</p>
                <ul className="mt-6 space-y-3 border-t border-border pt-6">
                  {c.items.map((k) => (
                    <li key={k} className="flex gap-3 text-[15px] leading-relaxed text-foreground/90">
                      <Check size={17} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-proof" />
                      <span>{t(k)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <Link
          href="/#configurateur"
          className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-[gap] duration-[400ms] hover:gap-3"
        >
          {t("formulas.compare")} <ArrowRight size={15} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
