"use client";

import { TIERS, type TierKey } from "@/lib/config-data";
import { useLang } from "@/lib/i18n";

export function TierSelector({
  value,
  onChange,
  accent,
}: {
  value: TierKey;
  onChange: (v: TierKey) => void;
  accent: string;
}) {
  const { t } = useLang();
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {TIERS.map((tier) => {
        const active = tier.key === value;
        return (
          <button
            key={tier.key}
            onClick={() => onChange(tier.key)}
            data-cursor="hover"
            className="rounded-2xl border p-4 text-left transition-all duration-300"
            style={{
              borderColor: active ? accent : "rgba(241,230,212,0.1)",
              background: active ? `${accent}1a` : "rgba(255,255,255,0.02)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-cream">{t(tier.nameKey)}</span>
              <span className="font-serif text-sm italic" style={{ color: active ? accent : "#f1e6d3" }}>
                €{tier.price.toLocaleString("fr-FR")}
              </span>
            </div>
            <span className="mt-1 block text-xs text-cream/45">{t(tier.tagKey)}</span>
          </button>
        );
      })}
    </div>
  );
}
