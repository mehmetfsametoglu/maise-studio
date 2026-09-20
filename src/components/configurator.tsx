"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLang, LANG_PRICE, type Lang, type DictKey } from "@/lib/i18n";

type BizKey = "cafe" | "clinic" | "hotel";
type TierKey = "essentiel" | "signature";

const BUSINESS: {
  key: BizKey;
  nameKey: DictKey;
  descKey: DictKey;
  bg: Record<TierKey, string>;
}[] = [
  {
    key: "cafe",
    nameKey: "biz.cafe.name",
    descKey: "biz.cafe.desc",
    bg: { essentiel: "/configurator/cafe-essentiel.png", signature: "/configurator/cafe-signature.png" },
  },
  {
    key: "clinic",
    nameKey: "biz.clinic.name",
    descKey: "biz.clinic.desc",
    bg: { essentiel: "/configurator/clinic-essentiel.png", signature: "/configurator/clinic-signature.png" },
  },
  {
    key: "hotel",
    nameKey: "biz.hotel.name",
    descKey: "biz.hotel.desc",
    bg: { essentiel: "/configurator/hotel-essentiel.png", signature: "/configurator/hotel-signature.png" },
  },
];

// TRY figures are a deliberate Turkey-market price, not a live FX
// conversion: "anchor" is roughly what the EUR price converts to (~56
// TRY/EUR, reviewed periodically), "discounted" is the actual launch price
// shown crossed-out-to-discounted, priced in local terms rather than a
// straight conversion. Review both alongside the EUR prices, not via a
// currency API — they're merchandising numbers, not an exchange rate.
const TIERS: {
  key: TierKey;
  nameKey: DictKey;
  tagKey: DictKey;
  price: number;
  tryAnchor: number;
  tryPrice: number;
}[] = [
  { key: "essentiel", nameKey: "tier.essentiel.name", tagKey: "tier.essentiel.tag", price: 400, tryAnchor: 19900, tryPrice: 15000 },
  { key: "signature", nameKey: "tier.signature.name", tagKey: "tier.signature.tag", price: 690, tryAnchor: 32900, tryPrice: 24900 },
];

// A single extra-language surcharge — whichever language is already the
// visitor's market default (see `includedLang` below) is never looked up
// here, so there is no need for a per-language price.
const LANG_PRICE_TRY = { fr: 1500, en: 1500, tr: 1500 } as const;

const LANGS: { key: Lang; nameKey: DictKey; noteKey?: DictKey }[] = [
  { key: "fr", nameKey: "lang.fr", noteKey: "lang.fr.note" },
  { key: "en", nameKey: "lang.en" },
  { key: "tr", nameKey: "lang.tr" },
];

export function Configurator() {
  const { t, lang } = useLang();
  const [biz, setBiz] = useState<BizKey>("cafe");
  const [tier, setTier] = useState<TierKey>("signature");
  const [multilingual, setMultilingual] = useState(false);
  const [langs, setLangs] = useState<Set<Lang>>(new Set());

  const b = BUSINESS.find((x) => x.key === biz)!;
  const tr = TIERS.find((x) => x.key === tier)!;
  // Turkish visitors see a Turkey-market TRY price (see the TIERS/LANG_PRICE_TRY
  // comment above) instead of a straight EUR conversion; FR/EN visitors pay EUR.
  const isTRY = lang === "tr";
  // The included base language follows the visitor's own market rather than
  // being hardcoded to French — a Turkish visitor quoting a Turkish-market
  // price should get Turkish included, not be offered "add Turkish" as a
  // paid extra for a language they're already browsing in.
  const includedLang: Lang = isTRY ? "tr" : "fr";
  const extraLangs = LANGS.filter((item) => item.key !== includedLang);

  // If the included language changes (visitor switches the site's own
  // language), drop it from the extras set so it isn't paid for twice.
  useEffect(() => {
    setLangs((prev) => {
      if (!prev.has(includedLang)) return prev;
      const next = new Set(prev);
      next.delete(includedLang);
      return next;
    });
  }, [includedLang]);

  const langTotal = [...langs].reduce(
    (sum, l) => sum + (isTRY ? LANG_PRICE_TRY[l] : LANG_PRICE[l]),
    0,
  );
  const total = (isTRY ? tr.tryPrice : tr.price) + langTotal;
  const anchorTotal = isTRY ? tr.tryAnchor + langTotal : null;
  // Essentiel previews are a 4:3 browser-style layout; Signature previews
  // are a square full-bleed composition.
  const isSquare = tier === "signature";

  function toggleLang(l: Lang) {
    if (l === includedLang) return;
    setLangs((prev) => {
      const next = new Set(prev);
      next.has(l) ? next.delete(l) : next.add(l);
      return next;
    });
  }

  function toggleMultilingual() {
    setMultilingual((prev) => {
      const next = !prev;
      if (!next) setLangs(new Set());
      return next;
    });
  }

  const priceLabel = isTRY
    ? `${total.toLocaleString("tr-TR")}TL`
    : `${total.toLocaleString("fr-FR")}EUR`;
  const message = `${t("wa.greeting")} — ${t(b.nameKey)} / ${t(tr.nameKey)} / ${[includedLang, ...langs]
    .map((l) => l.toUpperCase())
    .join("+")} -> ${priceLabel}`;

  return (
    <section id="configurateur" className="world-burgundy relative bg-background px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">
          {t("config.kicker")}
        </p>
        <h2 className="display max-w-2xl text-[clamp(2rem,5vw,3.6rem)] text-foreground">
          {t("config.title")}
        </h2>
        <p className="mt-6 max-w-lg text-muted-foreground">{t("config.subtitle")}</p>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex flex-col gap-8">
            <div>
              <p className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
                {t("config.step1")}
              </p>
              <div className="flex flex-col gap-3">
                {BUSINESS.map((item) => {
                  const active = item.key === biz;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setBiz(item.key)}
                      className={`glass-panel rounded-2xl p-4 text-left transition-all duration-300 ${
                        active ? "glass-panel-active" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <span className="block text-sm font-medium text-foreground">
                        {t(item.nameKey)}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {t(item.descKey)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
                {t("config.step2")}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {TIERS.map((item) => {
                  const active = item.key === tier;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setTier(item.key)}
                      className={`glass-panel rounded-2xl p-4 text-left transition-all duration-300 ${
                        active ? "glass-panel-active" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          {t(item.nameKey)}
                        </span>
                        {isTRY ? (
                          <span className="flex items-baseline gap-1.5">
                            <span className="text-[11px] text-muted-foreground line-through">
                              {item.tryAnchor.toLocaleString("tr-TR")}₺
                            </span>
                            <span className="font-display text-sm font-semibold text-accent">
                              {item.tryPrice.toLocaleString("tr-TR")}₺
                            </span>
                          </span>
                        ) : (
                          <span className="font-display text-sm font-semibold text-accent">
                            €{item.price}
                          </span>
                        )}
                      </div>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {t(item.tagKey)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs tracking-widest text-muted-foreground uppercase">
                    {t("config.multilingual")}
                  </p>
                  <p className="mt-1 max-w-[15rem] text-xs text-muted-foreground/80">
                    {t("config.multilingual.hint")}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground/60">
                    {t("config.includedLang")}: {t(LANGS.find((l) => l.key === includedLang)!.nameKey)}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={multilingual}
                  aria-label={t("config.multilingual")}
                  onClick={toggleMultilingual}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${
                    multilingual ? "bg-accent" : "bg-foreground/15"
                  }`}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-0.5 h-6 w-6 rounded-full bg-background shadow"
                    style={{ left: multilingual ? "calc(100% - 1.625rem)" : "0.125rem" }}
                  />
                </button>
              </div>

              <AnimatePresence initial={false}>
                {multilingual && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 flex flex-wrap gap-2">
                      {extraLangs.map((item) => {
                        const active = langs.has(item.key);
                        return (
                          <button
                            key={item.key}
                            onClick={() => toggleLang(item.key)}
                            className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ${
                              active
                                ? "border-accent/50 bg-accent/15 text-accent"
                                : "border-foreground/10 text-muted-foreground hover:border-foreground/25 hover:text-foreground"
                            }`}
                          >
                            {t(item.nameKey)}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="glass-liquid flex flex-col items-start justify-between gap-6 rounded-2xl p-6 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs tracking-widest text-muted-foreground uppercase">
                    {t("config.price")}
                  </p>
                  {isTRY && (
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-accent uppercase">
                      {t("config.try.badge")}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-3">
                  {anchorTotal != null && (
                    <span className="font-display text-xl text-muted-foreground line-through">
                      {anchorTotal.toLocaleString("tr-TR")}₺
                    </span>
                  )}
                  <motion.p
                    key={total}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="display text-4xl text-accent"
                  >
                    {isTRY ? `${total.toLocaleString("tr-TR")}₺` : `€${total.toLocaleString("fr-FR")}`}
                  </motion.p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isTRY ? t("config.try.note") : t("config.priceNote")}
                </p>
              </div>
              <a
                href={`https://wa.me/33753406344?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent px-7 py-3.5 text-xs font-medium tracking-widest text-accent-foreground uppercase transition-transform duration-200 hover:scale-[1.03]"
              >
                {t("config.cta")}
              </a>
            </div>
          </div>

          <div className="order-first sticky top-20 z-10 -mx-6 bg-background px-6 pb-5 shadow-[0_16px_32px_-16px_rgba(0,0,0,0.45)] md:-mx-10 md:px-10 lg:order-none lg:top-28 lg:m-0 lg:self-start lg:bg-transparent lg:p-0 lg:shadow-none">
            <div className="glass-liquid relative overflow-hidden rounded-[1.75rem] p-2">
              <div
                className="relative w-full overflow-hidden rounded-[1.4rem]"
                style={{ aspectRatio: isSquare ? "1 / 1" : "4 / 3" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${biz}-${tier}`}
                    initial={{ opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={b.bg[tier]}
                      alt={t(b.nameKey)}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence>
                  {tier === "signature" && (
                    <motion.span
                      key="signature-badge"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="glass-liquid absolute top-4 right-4 z-10 rounded-full px-3 py-1.5 text-[10px] font-medium tracking-widest text-accent uppercase"
                    >
                      Motion · 3D
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <p className="mt-4 px-2 text-xs text-muted-foreground">
              {tier === "signature" ? t("config.signature.caption") : t("config.essentiel.caption")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
