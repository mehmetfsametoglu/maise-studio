"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

// The Google Maps iframe is only loaded after the visitor clicks. Nothing is
// requested from Google (and no Google cookie is set) before that choice, and
// the map can't swallow the mouse wheel and block page scroll while idle.
export function MapEmbed({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(false);
  const { t } = useLang();

  return (
    <div className={`relative ${className}`}>
      {active && (
        <iframe
          title="Carte de Paris, exemple"
          src="https://maps.google.com/maps?q=Paris%2C%20France&t=&z=12&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
      {!active && (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-muted transition-colors hover:bg-muted/70"
        >
          <span className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background">
            {t("map.activate")}
          </span>
        </button>
      )}
    </div>
  );
}
