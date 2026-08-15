"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/lib/i18n";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const { t } = useLang();
  const words = t("hero.title").split(" ");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.24]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 150);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-[#14100b]"
    >
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <Image
          src="/img/facade.png"
          alt="Maisé Studio facade"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-[#14100b]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center"
      >
        <p
          className="mb-6 text-[11px] tracking-[0.42em] text-[#E9C97A] uppercase transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)" }}
        >
          {t("hero.kicker")}
        </p>

        <h1 className="display flex flex-wrap justify-center gap-x-[0.28em] text-[clamp(2.4rem,7vw,5.6rem)] text-white">
          {words.map((w, i) => (
            <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-2">
              <span
                className="inline-block transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transitionDelay: `${i * 90}ms`,
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(1.1em)",
                }}
              >
                {w}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="mt-8 max-w-lg text-base leading-relaxed text-white/70 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:text-lg"
          style={{
            transitionDelay: "700ms",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {t("hero.subtitle")}
        </p>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transitionDelay: "850ms",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <a
            href="#experience"
            className="rounded-full bg-[#E9C97A] px-7 py-3.5 text-sm font-semibold text-[#1a1509] transition-transform duration-200 ease-out hover:scale-[1.03]"
          >
            {t("hero.cta1")}
          </a>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <span className="text-[10px] tracking-[0.35em] text-white/50 uppercase">
          {t("hero.scroll")}
        </span>
      </motion.div>
    </section>
  );
}
