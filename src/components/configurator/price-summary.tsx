"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/magnetic-button";
import { WHATSAPP_LINK } from "@/components/whatsapp-button";
import { bizByKey, tierByKey, type BizKey, type TierKey } from "@/lib/config-data";
import { LANG_PRICE, useLang, type Lang } from "@/lib/i18n";

export function PriceSummary({
  biz,
  tier,
  langs,
}: {
  biz: BizKey;
  tier: TierKey;
  langs: Set<Lang>;
}) {
  const { t, lang } = useLang();
  const b = bizByKey(biz);
  const tr = tierByKey(tier);
  const langTotal = [...langs].reduce((sum, l) => sum + LANG_PRICE[l], 0);
  const total = tr.price + langTotal;

  const message = `Bonjour Maisé Studio — ${t(b.nameKey)} / ${t(tr.nameKey)} / ${[...langs]
    .map((l) => l.toUpperCase())
    .join("+")} → €${total.toLocaleString("fr-FR")}`;

  return (
    <div
      className="flex flex-col items-start justify-between gap-6 rounded-2xl border p-6 sm:flex-row sm:items-center"
      style={{ borderColor: `${b.accent}35`, background: `${b.accent}0d` }}
    >
      <div>
        <p className="text-xs tracking-widest text-cream/45 uppercase">
          {t("config.price.label")}
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={total}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="font-serif text-4xl italic"
            style={{ color: b.accent }}
          >
            €{total.toLocaleString("fr-FR")}
          </motion.p>
        </AnimatePresence>
        <p className="mt-1 text-xs text-cream/35">{t("config.price.note")}</p>
      </div>

      <MagneticButton
        href={WHATSAPP_LINK(message)}
        target="_blank"
        className="rounded-full px-7 py-3.5 text-xs font-medium tracking-widest text-[#170f0a] uppercase"
        style={{ background: b.accent }}
      >
        {t("config.price.cta")}
      </MagneticButton>
    </div>
  );
}
