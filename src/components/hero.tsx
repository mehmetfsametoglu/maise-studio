"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const mockRotate = useTransform(scrollYProgress, [0, 1], [-4, 2]);
  const mockY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 150);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#161109] lg:h-[100svh]"
    >
      {/* Deliberately not a photo of any real venue — Maisé's own hero should
          read as Maisé, not be mistaken for a client's site. The signature
          mockup card below demonstrates craft without borrowing anyone's
          storefront. */}
      <div
        className="pointer-events-none absolute -top-1/3 -right-1/4 h-[70vh] w-[70vh] rounded-full opacity-[0.16] blur-3xl"
        style={{ background: "radial-gradient(circle, #E9C97A, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-1/3 -left-1/4 h-[60vh] w-[60vh] rounded-full opacity-[0.1] blur-3xl"
        style={{ background: "radial-gradient(circle, #E9C97A, transparent 70%)" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 pt-32 pb-20 md:px-10 lg:h-full lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-28 lg:pb-16"
      >
        <div className="text-center lg:text-left">
          <p
            className="mb-6 text-[11px] tracking-[0.42em] text-[#E9C97A] uppercase transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)" }}
          >
            {t("hero.kicker")}
          </p>

          <h1 className="display flex flex-wrap justify-center gap-x-[0.28em] text-[clamp(2.3rem,5.6vw,4.6rem)] text-white lg:justify-start">
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
            className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-white/70 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:text-lg lg:mx-0"
            style={{
              transitionDelay: "700ms",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:justify-start"
            style={{
              transitionDelay: "850ms",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <Link
              href="/work"
              className="rounded-full bg-[#E9C97A] px-7 py-3.5 text-sm font-semibold text-[#1a1509] transition-transform duration-200 ease-out hover:scale-[1.03]"
            >
              {t("hero.cta1")}
            </Link>
            <Link
              href="/#configurateur"
              className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-200 ease-out hover:bg-white/15"
            >
              {t("hero.cta2")}
            </Link>
          </div>
        </div>

        <motion.div
          style={{ rotate: mockRotate, y: mockY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.94 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0a08] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7)]"
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-2 truncate rounded-full bg-white/[0.06] px-3 py-1 text-[10px] text-white/40">
                maisestudio.fr
              </span>
            </div>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/configurator/hotel-signature.png"
                alt="Maisé Studio — Signature tier preview"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
          <span className="glass-liquid absolute -top-3 -right-3 rounded-full px-3 py-1.5 text-[10px] font-medium tracking-widest text-[#E9C97A] uppercase">
            {t("tier.signature.name")}
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-x-0 bottom-8 z-10 hidden justify-center lg:flex"
      >
        <span className="text-[10px] tracking-[0.35em] text-white/50 uppercase">
          {t("hero.scroll")}
        </span>
      </motion.div>
    </section>
  );
}
