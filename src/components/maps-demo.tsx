"use client";

import { useReveal } from "@/hooks/use-reveal";
import { useLang } from "@/lib/i18n";
import { MapEmbed } from "@/components/map-embed";

export function MapsDemo() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative bg-background px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`reveal ${visible ? "reveal-in" : ""} grid grid-cols-1 items-center gap-12 lg:grid-cols-2`}
        >
          <div>
            <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">
              {t("maps.kicker")}
            </p>
            <h2 className="display text-[clamp(1.9rem,4.6vw,3.2rem)] text-foreground">
              {t("maps.title")}
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">{t("maps.body")}</p>
            <a
              href="https://www.google.com/maps/place/Paris,+France"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted"
            >
              {t("maps.cta")}
            </a>
          </div>

          <div className="glass-liquid overflow-hidden rounded-[1.75rem] p-2">
            <MapEmbed className="aspect-[4/3] overflow-hidden rounded-[1.4rem] grayscale-[15%]" />
          </div>
        </div>
      </div>
    </section>
  );
}
