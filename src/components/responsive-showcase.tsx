"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/use-reveal";
import { useLang } from "@/lib/i18n";

export function ResponsiveShowcase() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="world-navy relative overflow-hidden bg-background px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} max-w-xl`}>
          <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">
            {t("responsive.kicker")}
          </p>
          <h2 className="display text-[clamp(1.9rem,4.6vw,3.2rem)] text-foreground">
            {t("responsive.title")}
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">{t("responsive.body")}</p>
        </div>

        <div className="mt-16 flex flex-col items-end gap-6 md:flex-row md:items-end md:gap-8">
          <div className="glass-liquid relative aspect-[16/10] w-full overflow-hidden rounded-xl md:w-[58%]">
            <Image src="/img/cafe-tagline.png" alt="" fill sizes="60vw" className="object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-[10px] tracking-widest text-white/80 uppercase backdrop-blur-md">
              Desktop
            </span>
          </div>
          <div className="glass-liquid relative aspect-[4/3.4] w-full overflow-hidden rounded-xl md:w-[26%]">
            <Image src="/img/beaute-tagline.png" alt="" fill sizes="30vw" className="object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-[10px] tracking-widest text-white/80 uppercase backdrop-blur-md">
              Tablet
            </span>
          </div>
          <div className="glass-liquid relative aspect-[9/16] w-[44%] overflow-hidden rounded-xl md:w-[13%]">
            <Image src="/img/opticien.png" alt="" fill sizes="16vw" className="object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-2.5 py-1 text-[9px] tracking-widest text-white/80 uppercase backdrop-blur-md">
              Mobile
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
