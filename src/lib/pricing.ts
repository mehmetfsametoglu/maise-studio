// One source of truth for public prices. The configurator, FAQ, service pages
// and JSON-LD all read from here.
//
// EUR prices are what French and English visitors see. The TRY figures are a
// deliberate Turkey-market price (not a live exchange rate): `tryAnchor` is
// roughly what the euro price converts to, `tryPrice` is the actual launch
// price. Review them together with the EUR prices.

export type TierKey = "essentiel" | "signature";
export type LangKey = "fr" | "en" | "tr";

export const PACKAGES: Record<
  TierKey,
  { name: string; eur: number; tryAnchor: number; tryPrice: number; summary: string }
> = {
  essentiel: {
    name: "Essentiel",
    eur: 399,
    tryAnchor: 19900,
    tryPrice: 14900,
    summary: "Un site simple et rapide qui présente votre activité.",
  },
  signature: {
    name: "Signature",
    eur: 699,
    tryAnchor: 33300,
    tryPrice: 25200,
    summary: "Le même site, avec animations et effets 3D pour se démarquer.",
  },
};

// Extra language surcharge. The visitor's own market language is included.
export const EXTRA_LANGUAGE = { eur: 50, try: 1500 } as const;
export const LANG_PRICE: Record<LangKey, number> = { fr: 0, en: EXTRA_LANGUAGE.eur, tr: EXTRA_LANGUAGE.eur };

export const PRICE_DISCLAIMER = "Prix indicatif. Le devis final dépend du périmètre du projet.";

export const formatEur = (n: number) => `${n.toLocaleString("fr-FR")} €`;
