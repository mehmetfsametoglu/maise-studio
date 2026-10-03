"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useReveal } from "@/hooks/use-reveal";
import { useScrubCapable } from "@/hooks/use-scrub-capable";
import { useLang } from "@/lib/i18n";

// Desktop scrubs the film frame-by-frame with the scrollbar; phones and
// tablets get a light autoplay loop instead. Scroll-scrubbing a video on iOS
// and Android stutters (seeking is expensive and the address bar resizes the
// viewport), so we don't attempt it there.
const SCRUB_SRC = "/video/scroll-1.mp4";
const LOOP_SRC = "/video/mobile-loop.mp4";
const LOOP_POSTER = "/studio/interior.png";

const CARD_META = [
  { at: 0.14, kickerKey: "sv.c1.kicker", titleKey: "sv.c1.title", bodyKey: "sv.c1.body", position: "left-6 bottom-10 md:left-12 md:bottom-16 md:max-w-sm" },
  { at: 0.48, kickerKey: "sv.c2.kicker", titleKey: "sv.c2.title", bodyKey: "sv.c2.body", position: "right-6 top-24 md:right-12 md:top-28 md:max-w-sm" },
  { at: 0.8, kickerKey: "sv.c3.kicker", titleKey: "sv.c3.title", bodyKey: "sv.c3.body", position: "left-6 right-6 mx-auto bottom-10 md:bottom-16 md:max-w-md" },
] as const;

const DETAILS = [
  { n: "01", kickerKey: "sv.c1.kicker", titleKey: "sv.c1.title", moreKey: "sv.c1.more" },
  { n: "02", kickerKey: "sv.c2.kicker", titleKey: "sv.c2.title", moreKey: "sv.c2.more" },
  { n: "03", kickerKey: "sv.c3.kicker", titleKey: "sv.c3.title", moreKey: "sv.c3.more" },
] as const;

export function ScrollVideo() {
  const capable = useScrubCapable();

  return (
    <>
      {capable === null ? (
        <section id="experience" className="world-noir h-[60svh] bg-background" aria-hidden />
      ) : capable ? (
        <ScrubVideo />
      ) : (
        <LoopVideo />
      )}
      <Details />
    </>
  );
}

function ScrubVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const { t } = useLang();

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let target = 0;
    let raf = 0;
    let ready = video.readyState >= 1;
    let dirty = false;

    // Lenis already smooths the scroll motion itself; adding a second lerp
    // here on top of that would double-damp the video and make it feel
    // laggy/disconnected from the user's scroll input. So this maps
    // scroll fraction -> video time directly (1:1), every frame the
    // fraction actually changed.
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const fraction = Math.min(Math.max(scrolled / Math.max(distance, 1), 0), 1);
      target = fraction;
      dirty = true;
    };

    const onMeta = () => {
      ready = true;
      onScroll();
      video
        .play()
        .then(() => video.pause())
        .catch(() => {});
    };

    // React state updates for the caption cards are coalesced here, once per
    // frame, instead of inside onScroll — native scroll events can fire many
    // times per frame and each setProgress call would otherwise trigger a
    // re-render.
    const loop = () => {
      if (dirty) {
        setProgress(target);
        if (ready && video.duration && !video.seeking) {
          const t = video.duration * target;
          if (Math.abs(video.currentTime - t) > 0.008) {
            video.currentTime = t;
          }
        }
        dirty = false;
      }
      raf = requestAnimationFrame(loop);
    };

    if (video.readyState >= 1) onMeta();
    video.addEventListener("loadedmetadata", onMeta);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="world-noir relative h-[220vh] bg-background"
      aria-label="Maisé Studio immersive experience"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <video
          ref={videoRef}
          src={SCRUB_SRC}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />

        {CARD_META.map((c) => {
          const active = Math.abs(progress - c.at) < 0.16;
          return (
            <article
              key={c.titleKey}
              className={`glass-liquid pointer-events-none absolute w-[calc(100%-3rem)] rounded-[1.75rem] p-7 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:w-full ${c.position}`}
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
              }}
            >
              <p className="mb-3 text-[11px] tracking-[0.42em] text-accent uppercase">
                {t(c.kickerKey)}
              </p>
              <h3 className="display text-[clamp(1.4rem,2.6vw,1.9rem)] text-foreground">
                {t(c.titleKey)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t(c.bodyKey)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// Normal-flow block (no sticky, no fixed heights tied to the viewport), so it
// can never trap the scroll. The video only plays while it is on screen.
function LoopVideo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const { t } = useLang();
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap || reduceMotion) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <section id="experience" className="world-noir relative bg-background px-6 py-16 md:px-10 md:py-24">
      <div
        ref={wrapRef}
        className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-border sm:aspect-[16/11]"
      >
        <motion.div style={{ y: reduceMotion ? 0 : y }} className="absolute inset-[-8%]">
          <video
            ref={videoRef}
            src={LOOP_SRC}
            poster={LOOP_POSTER}
            muted
            loop
            playsInline
            preload="none"
            disablePictureInPicture
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8">
          <p className="mb-2 text-[11px] tracking-[0.42em] text-[#E9C97A] uppercase">
            {t("sv.c1.kicker")}
          </p>
          <h3 className="display text-[clamp(1.5rem,6vw,2.1rem)] text-white">{t("sv.c1.title")}</h3>
        </div>
      </div>
      <p className="mx-auto mt-4 max-w-xl text-center text-xs text-muted-foreground">
        {t("sv.mobileHint")}
      </p>
    </section>
  );
}

function Details() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="relative border-t border-border bg-background px-6 py-24 md:px-10 md:py-36">
      <div
        ref={ref}
        className={`reveal ${visible ? "reveal-in" : ""} mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-3 md:gap-10`}
      >
        {DETAILS.map((d) => (
          <div key={d.n}>
            <span className="font-display text-sm text-accent">{d.n}</span>
            <p className="mt-4 mb-2 text-[11px] tracking-[0.42em] text-accent uppercase">
              {t(d.kickerKey)}
            </p>
            <h3 className="display text-[clamp(1.4rem,2.4vw,1.8rem)] text-foreground">
              {t(d.titleKey)}
            </h3>
            <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">{t(d.moreKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
