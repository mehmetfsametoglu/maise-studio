"use client";

import { useState } from "react";
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

const TIERS: { key: TierKey; nameKey: DictKey; tagKey: DictKey; price: number }[] = [
  { key: "essentiel", nameKey: "tier.essentiel.name", tagKey: "tier.essentiel.tag", price: 500 },
  { key: "signature", nameKey: "tier.signature.name", tagKey: "tier.signature.tag", price: 850 },
];

const LANGS: { key: Lang; nameKey: DictKey; noteKey?: DictKey }[] = [
  { key: "fr", nameKey: "lang.fr", noteKey: "lang.fr.note" },
  { key: "en", nameKey: "lang.en" },
  { key: "tr", nameKey: "lang.tr" },
];

export function Configurator() {
  const { t } = useLang();
  const [biz, setBiz] = useState<BizKey>("cafe");
  const [tier, setTier] = useState<TierKey>("signature");
  const [langs, setLangs] = useState<Set<Lang>>(new Set(["fr"]));

  const b = BUSINESS.find((x) => x.key === biz)!;
  const tr = TIERS.find((x) => x.key === tier)!;
  const langTotal = [...langs].reduce((sum, l) => sum + LANG_PRICE[l], 0);
  const total = tr.price + langTotal;
  // Essentiel previews are a 4:3 browser-style layout; Signature previews
  // are a square full-bleed composition.
  const isSquare = tier === "signature";

  function toggleLang(l: Lang) {
    if (l === "fr") return;
    setLangs((prev) => {
      const next = new Set(prev);
      next.has(l) ? next.delete(l) : next.add(l);
      return next;
    });
  }

  const message = `Bonjour Maisé Studio — ${t(b.nameKey)} / ${t(tr.nameKey)} / ${[...langs]
    .map((l) => l.toUpperCase())
    .join("+")} -> ${total}EUR`;

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

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex flex-col gap-10">
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
                        <span className="font-display text-sm font-semibold text-accent">
                          €{item.price}
                        </span>
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
              <p className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
                {t("config.step3")}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {LANGS.map((item) => {
                  const active = langs.has(item.key);
                  const locked = item.key === "fr";
                  return (
                    <button
                      key={item.key}
                      onClick={() => toggleLang(item.key)}
                      disabled={locked}
                      className={`glass-panel rounded-2xl p-4 text-left transition-all duration-300 ${
                        active ? "glass-panel-active" : "opacity-70 hover:opacity-100"
                      } ${locked ? "cursor-default" : ""}`}
                    >
                      <span className="block text-sm font-medium text-foreground">
                        {t(item.nameKey)}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {locked ? t("lang.fr.note") : `+€${LANG_PRICE[item.key]}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="glass-liquid flex flex-col items-start justify-between gap-6 rounded-2xl p-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs tracking-widest text-muted-foreground uppercase">
                  {t("config.price")}
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={total}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="display text-4xl text-accent"
                  >
                    €{total.toLocaleString("fr-FR")}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-1 text-xs text-muted-foreground">{t("config.priceNote")}</p>
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

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass-liquid overflow-hidden rounded-[1.75rem] p-2">
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
                      priority
                    />
                  </motion.div>
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
