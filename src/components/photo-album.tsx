"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

const FRAMES = [
  { src: "/img/beaute-sillas.png", size: "portrait", n: "01", industryKey: "album.i1" },
  { src: "/img/facade.png", size: "landscape-lg", n: "02", industryKey: "album.i2" },
  { src: "/img/logo-wall-cafe.png", size: "square", n: "03", industryKey: "album.i3" },
  { src: "/img/opticien.png", size: "portrait", n: "04", industryKey: "album.i4" },
  { src: "/img/restaurant.png", size: "landscape-lg", n: "05", industryKey: "album.i5" },
  { src: "/img/panorama-terrace.png", size: "landscape-sm", n: "06", industryKey: "album.i6" },
  { src: "/img/coffee-pizza-wide.png", size: "square", n: "07", industryKey: "album.i7" },
] as const;

const SIZE_CLASS: Record<string, string> = {
  portrait: "h-[62vh] w-[62vw] max-w-[320px] md:h-[60vh] md:w-[26vw] md:max-w-none",
  "landscape-lg": "h-[46vh] w-[78vw] max-w-[520px] md:h-[52vh] md:w-[42vw] md:max-w-none",
  "landscape-sm": "h-[38vh] w-[70vw] max-w-[440px] md:h-[42vh] md:w-[34vw] md:max-w-none",
  square: "h-[46vh] w-[70vw] max-w-[380px] md:h-[50vh] md:w-[46vh] md:max-w-none",
};

// A plain horizontally scrollable strip: swipe on touch, arrows or
// shift-wheel on desktop. Nothing is pinned or driven by the page scroll, so
// it can never hold the page in place.
export function PhotoAlbum() {
  const { t } = useLang();
  const stripRef = useRef<HTMLDivElement>(null);

  const scrollByPage = (dir: 1 | -1) => {
    const el = stripRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="world-noir relative bg-background py-20 md:py-28">
      <div className="flex items-end justify-between gap-6 px-6 md:px-10">
        <div>
          <p className="mb-4 text-[11px] tracking-[0.42em] text-accent uppercase">
            {t("album.kicker")}
          </p>
          <h2 className="display max-w-xl text-[clamp(1.8rem,4.4vw,3rem)] text-foreground">
            {t("album.title")}
          </h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/10 active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/10 active:scale-95"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={stripRef}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory items-center gap-5 overflow-x-auto px-6 pb-2 md:gap-8 md:px-10"
      >
        {FRAMES.map((f) => (
          <figure
            key={f.src}
            className={`relative shrink-0 snap-center overflow-hidden rounded-2xl ${SIZE_CLASS[f.size]}`}
          >
            <Image src={f.src} alt="" fill sizes="60vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <figcaption className="glass-liquid absolute bottom-4 left-4 rounded-full px-4 py-2">
              <span className="text-[10px] tracking-[0.2em] text-accent">{f.n}</span>
              <span className="ml-2 text-xs text-foreground">{t(f.industryKey)}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
