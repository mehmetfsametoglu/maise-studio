"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

// Google Maps' embed iframe swallows the mouse wheel for its own zoom, which
// silently blocks page scroll for anyone whose cursor happens to be over the
// map — a classic "why can't I scroll here" trap. Keep it inert until the
// visitor deliberately clicks in, matching the map's own cooperative-gesture
// pattern without needing the JS API.
export function MapEmbed({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(false);
  const { t } = useLang();

  return (
    <div className={`relative ${className}`}>
      <iframe
        title="Maisé Studio — Paris"
        src="https://maps.google.com/maps?q=Paris%2C%20France&t=&z=12&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={active ? "" : "pointer-events-none"}
      />
      {!active && (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-colors hover:bg-black/10"
        >
          <span className="rounded-full bg-black/65 px-4 py-2 text-xs font-medium text-white">
            {t("map.activate")}
          </span>
        </button>
      )}
    </div>
  );
}
