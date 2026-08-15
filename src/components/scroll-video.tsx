"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

const VIDEO_SRC = "/video/scroll-1.mp4";

const CARD_META = [
  { at: 0.14, kickerKey: "sv.c1.kicker", titleKey: "sv.c1.title", bodyKey: "sv.c1.body", position: "left-6 bottom-10 md:left-12 md:bottom-16 md:max-w-sm" },
  { at: 0.48, kickerKey: "sv.c2.kicker", titleKey: "sv.c2.title", bodyKey: "sv.c2.body", position: "right-6 top-24 md:right-12 md:top-28 md:max-w-sm" },
  { at: 0.8, kickerKey: "sv.c3.kicker", titleKey: "sv.c3.title", bodyKey: "sv.c3.body", position: "left-6 right-6 mx-auto bottom-10 md:bottom-16 md:max-w-md" },
] as const;

export function ScrollVideo() {
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
      className="world-noir relative h-[380vh] bg-background"
      aria-label="Maisé Studio immersive experience"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
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
