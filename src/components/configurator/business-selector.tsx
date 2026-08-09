"use client";

import { BUSINESS, type BizKey } from "@/lib/config-data";
import { useLang } from "@/lib/i18n";

export function BusinessSelector({
  value,
  onChange,
}: {
  value: BizKey;
  onChange: (v: BizKey) => void;
}) {
  const { t } = useLang();
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {BUSINESS.map((b) => {
        const active = b.key === value;
        return (
          <button
            key={b.key}
            onClick={() => onChange(b.key)}
            data-cursor="hover"
            className="rounded-2xl border p-4 text-left transition-all duration-300"
            style={{
              borderColor: active ? b.accent : "rgba(241,230,212,0.1)",
              background: active ? b.accentSoft : "rgba(255,255,255,0.02)",
            }}
          >
            <span
              className="mb-2 block h-2 w-2 rounded-full"
              style={{ background: active ? b.accent : "rgba(241,230,212,0.25)" }}
            />
            <span className="block text-sm font-medium text-cream">{t(b.nameKey)}</span>
            <span className="mt-1 block text-xs text-cream/45">{t(b.descKey)}</span>
          </button>
        );
      })}
    </div>
  );
}
