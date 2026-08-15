"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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
  portrait: "h-[62vh] w-[38vw] md:h-[70vh] md:w-[28vw]",
  "landscape-lg": "h-[46vh] w-[62vw] md:h-[56vh] md:w-[46vw]",
  "landscape-sm": "h-[38vh] w-[50vw] md:h-[42vh] md:w-[34vw]",
  square: "h-[46vh] w-[46vh] md:h-[52vh] md:w-[52vh]",
};

export function PhotoAlbum() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["2vw", "-128vw"]);

  return (
    <section ref={ref} className="world-noir relative bg-background" style={{ height: "420vh" }}>
      <div className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden">
        <div className="px-6 pt-28 md:px-10 md:pt-32">
          <p className="mb-4 text-[11px] tracking-[0.42em] text-accent uppercase">
            {t("album.kicker")}
          </p>
          <h2 className="display max-w-xl text-[clamp(1.8rem,4.4vw,3rem)] text-foreground">
            {t("album.title")}
          </h2>
        </div>

        <div className="relative mt-10 flex-1">
          <motion.div
            style={{ x }}
            className="absolute inset-y-0 left-0 flex items-center gap-8 pl-6 md:gap-12 md:pl-10"
          >
            {FRAMES.map((f) => (
              <figure key={f.src} className={`relative shrink-0 overflow-hidden rounded-2xl ${SIZE_CLASS[f.size]}`}>
                <Image
                  src={f.src}
                  alt=""
                  fill
                  sizes="60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <figcaption className="glass-liquid absolute bottom-4 left-4 rounded-full px-4 py-2">
                  <span className="text-[10px] tracking-[0.2em] text-accent">{f.n}</span>
                  <span className="ml-2 text-xs text-foreground">{t(f.industryKey)}</span>
                </figcaption>
              </figure>
            ))}
            <div className="w-[8vw] shrink-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
