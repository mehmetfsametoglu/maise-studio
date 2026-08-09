"use client";

import { Check } from "lucide-react";
import { LANG_PRICE, useLang, type Lang } from "@/lib/i18n";

const ORDER: Lang[] = ["fr", "en", "tr"];
const NAME_KEY: Record<Lang, "lang.fr.name" | "lang.en.name" | "lang.tr.name"> = {
  fr: "lang.fr.name",
  en: "lang.en.name",
  tr: "lang.tr.name",
};

export function LanguageSelector({
  value,
  onToggle,
  accent,
}: {
  value: Set<Lang>;
  onToggle: (l: Lang) => void;
  accent: string;
}) {
  const { t } = useLang();
  return (
    <div className="flex flex-wrap gap-3">
      {ORDER.map((l) => {
        const locked = l === "fr";
        const active = value.has(l);
        const price = LANG_PRICE[l];
        return (
          <button
            key={l}
            onClick={() => !locked && onToggle(l)}
            disabled={locked}
            data-cursor="hover"
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-all duration-300"
            style={{
              borderColor: active ? accent : "rgba(241,230,212,0.12)",
              background: active ? `${accent}1a` : "transparent",
              opacity: locked ? 0.85 : 1,
              cursor: locked ? "default" : undefined,
            }}
          >
            <span
              className="flex h-4 w-4 items-center justify-center rounded-full border"
              style={{ borderColor: active ? accent : "rgba(241,230,212,0.3)" }}
            >
              {active && <Check size={10} color={accent} />}
            </span>
            <span className="text-cream">{t(NAME_KEY[l])}</span>
            <span className="text-cream/40">
              {locked ? `· ${t("lang.fr.note")}` : price > 0 ? `· +€${price}` : ""}
            </span>
          </button>
        );
      })}
    </div>
  );
}
