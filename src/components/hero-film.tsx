"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { useLang, type DictKey } from "@/lib/i18n";

// The opening of the home page: a scroll-scrubbed film of the Maisé Studio
// showroom, in the manner of an Apple product page.
//
// Why it feels fluid:
// - The 12 s video has only two keyframes, so seeking it would stutter. It was
//   cut into 289 WebP frames (every frame, 24 fps) in two sizes: HD for large
//   screens, a lighter set for phones.
// - Scrolling is chaptered. The film moves while the camera travels between
//   messages and nearly stops while a message is on screen, so text stays
//   readable for as long as the visitor takes to read it, however fast they
//   scroll between chapters.
// - A mouse wheel moves in 100 px steps, so on mouse-type pointers the film
//   glides toward the scroll position over about 150 ms instead of jumping.
//   Touch scrolling is already continuous and follows almost 1:1.
// - Neighbouring frames are cross-blended, which turns 24 distinct images a
//   second into continuous motion on a 60 Hz or 144 Hz screen.
// - Frames are downloaded compressed, coarse-first, and only a window around
//   the current position is kept decoded (ImageBitmap, decoded off the main
//   thread), so memory stays bounded.
// - The frame loop reads cached geometry and skips style writes that would not
//   change anything, so it adds almost no layout or style work.
const FRAME_COUNT = 289;
const POSTER = "/film-sm/f000.webp";
const SEEN_KEY = "maise-film-seen";
const frameUrl = (set: "hd" | "sm", i: number) => `/film-${set}/f${String(i).padStart(3, "0")}.webp`;

const LOADER_MIN_MS = 1100;
const LOADER_MAX_MS = 5000;
const LOADER_FRAMES = 24;

// Timeline, measured in viewport heights (svh x 100) of scrolling. Each stop
// says how far the film has run (0 to 1) once that stretch of scrolling is
// done. Hold stretches advance the film only a little; move stretches carry
// the camera to the next message.
type Stop = { len: number; film: number; move?: boolean };
const STOPS: readonly Stop[] = [
  { len: 60, film: 0.04 }, // opening statement
  { len: 70, film: 0.25, move: true },
  { len: 140, film: 0.3 }, // scene 1
  { len: 70, film: 0.48, move: true },
  { len: 140, film: 0.53 }, // scene 2
  { len: 70, film: 0.72, move: true },
  { len: 140, film: 0.77 }, // scene 3
  { len: 90, film: 1, move: true },
  { len: 140, film: 1 }, // closing mark, then a hold
];
const TOTAL = STOPS.reduce((sum, s) => sum + s.len, 0); // 920
const SECTION_HEIGHT = `${TOTAL + 100}svh`;

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
// Slow start, slow landing.
const ease = (n: number) => {
  const t = clamp01(n);
  return t * t * (3 - 2 * t);
};

// Film position for a scroll offset u (in svh x 100).
const filmAt = (u: number) => {
  let start = 0;
  let from = 0;
  for (const s of STOPS) {
    if (u <= start + s.len) {
      const t = clamp01((u - start) / s.len);
      return from + (s.film - from) * (s.move ? ease(t) : t);
    }
    start += s.len;
    from = s.film;
  }
  return 1;
};

type Scene = {
  id: string;
  from: number; // window in svh x 100
  to: number;
  title: DictKey;
  body: DictKey;
  place: string;
  center?: "x" | "y";
  align: string;
  glass?: boolean;
};
const FADE = 32;
const SCENES: readonly Scene[] = [
  {
    id: "s1",
    from: 118,
    to: 290,
    title: "film.b1.title",
    body: "film.b1.body",
    place: "left-6 right-6 bottom-14 md:right-auto md:left-12 md:bottom-20 md:w-[34rem]",
    align: "text-left",
  },
  {
    id: "s2",
    from: 328,
    to: 500,
    title: "film.b2.title",
    body: "film.b2.body",
    place: "left-6 right-6 bottom-14 md:left-auto md:right-12 md:bottom-auto md:top-1/2 md:w-[32rem]",
    center: "y",
    align: "text-left md:text-right",
  },
  {
    id: "s3",
    from: 538,
    to: 710,
    title: "film.b3.title",
    body: "film.b3.body",
    place: "left-5 right-5 bottom-10 md:right-auto md:left-12 md:bottom-auto md:top-1/2 md:w-[29rem]",
    center: "y",
    align: "text-left",
    glass: true,
  },
];

const AI_CHIPS = ["ChatGPT", "Gemini", "Google"];

const HERO_OUT = [34, 92] as const;
// Closing sequence, in the same units: the film dims, the mark arrives from
// far away, then the line and the buttons, then it holds for several wheel
// notches so the finished frame can be taken in.
const END = {
  dim: [722, 772],
  logo: [748, 802],
  tag: [788, 816],
  cta: [802, 832],
} as const;

type Move = { depth: number; rise: number; blur: number };
const SCENE_MOVE: Move = { depth: 240, rise: 30, blur: 0 };
const LOGO_MOVE: Move = { depth: 520, rise: 0, blur: 10 };
const LINE_MOVE: Move = { depth: 0, rise: 20, blur: 0 };

export function HeroFilm() {
  const { t } = useLang();
  const [ready, setReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderBarRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);
  const dimRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !stage || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)");
    const set: "hd" | "sm" = window.matchMedia("(min-width: 900px)").matches ? "hd" : "sm";
    // Wheel notches need a longer glide than a finger or a trackpad does.
    const fine = window.matchMedia("(pointer: fine)").matches;
    const catchUp = fine ? 7 : 16;
    // A finger pauses to read where a wheel keeps going, so touch screens get a
    // shorter film (the same chapters, 40% less scrolling).
    const pace = fine ? 1 : 0.6;
    section.style.height = `${TOTAL * pace + 100}svh`;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* storage unavailable: show the loader */
    }

    let cancelled = false;
    const blobs: (Blob | null)[] = new Array(FRAME_COUNT).fill(null);
    const bitmaps: (ImageBitmap | null)[] = new Array(FRAME_COUNT).fill(null);
    const pending = new Set<number>();
    let loaded = 0;

    // Coarse frames first, so a fast jump always finds a nearby frame once it
    // has had a moment to decode.
    const order: number[] = [0];
    const seenIdx = new Set(order);
    for (const stride of [32, 16, 8, 4, 2, 1]) {
      for (let i = 0; i < FRAME_COUNT; i += stride) {
        if (!seenIdx.has(i)) {
          seenIdx.add(i);
          order.push(i);
        }
      }
    }
    let cursor = 0;
    let active = 0;
    const pump = () => {
      while (active < 6 && cursor < order.length && !cancelled) {
        const idx = order[cursor++];
        active++;
        fetch(frameUrl(set, idx))
          .then((r) => (r.ok ? r.blob() : null))
          .then((b) => {
            if (b) {
              blobs[idx] = b;
              loaded++;
            }
          })
          .catch(() => {})
          .finally(() => {
            active--;
            pump();
          });
      }
    };
    pump();

    let dirty = true;
    const request = (k: number) => {
      if (bitmaps[k] || pending.has(k) || !blobs[k]) return;
      pending.add(k);
      createImageBitmap(blobs[k] as Blob)
        .then((bm) => {
          pending.delete(k);
          if (cancelled) {
            bm.close();
            return;
          }
          bitmaps[k] = bm;
          dirty = true;
        })
        .catch(() => pending.delete(k));
    };

    // Keep decoded bitmaps only around the current frame.
    let lastCenter = -1;
    const keepWindow = (center: number, dir: number) => {
      const ahead = dir >= 0 ? 40 : 14;
      const behind = dir >= 0 ? 14 : 40;
      for (let k = center; k <= Math.min(FRAME_COUNT - 1, center + ahead); k++) request(k);
      for (let k = center - 1; k >= Math.max(0, center - behind); k--) request(k);
      if (center !== lastCenter) {
        for (let k = 0; k < FRAME_COUNT; k++) {
          const bm = bitmaps[k];
          if (bm && (k < center - 70 || k > center + 90)) {
            bm.close();
            bitmaps[k] = null;
          }
        }
        lastCenter = center;
      }
    };

    const nearestBitmap = (i: number) => {
      for (let d = 0; d <= 48; d++) {
        const a = bitmaps[i - d];
        if (a) return { bm: a, idx: i - d };
        const b = bitmaps[i + d];
        if (b) return { bm: b, idx: i + d };
      }
      return null;
    };

    let lastKey = "";
    let top = 0; // section top in page coordinates
    let stageH = 1;
    const measure = () => {
      top = section.getBoundingClientRect().top + window.scrollY;
      stageH = stage.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, set === "hd" ? 1.5 : 2);
      const w = Math.round(stage.clientWidth * dpr);
      const h = Math.round(stageH * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        // Frames are within a few percent of the canvas size, so the cheap
        // filter looks the same as the costly one.
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "low";
        lastKey = "";
      }
    };

    const paint = (bm: ImageBitmap, alpha: number) => {
      const scale = Math.max(canvas.width / bm.width, canvas.height / bm.height);
      const dw = bm.width * scale;
      const dh = bm.height * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(bm, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
    };

    // Draws the film at a fractional frame: the two nearest frames, blended.
    const draw = (frame: number) => {
      const i0 = Math.min(Math.floor(frame), FRAME_COUNT - 1);
      const frac = frame - i0;
      const a = nearestBitmap(i0);
      if (!a) return;
      const b = frac > 0.04 && i0 + 1 < FRAME_COUNT ? nearestBitmap(i0 + 1) : null;
      const key = `${a.idx}:${b && b.idx !== a.idx ? b.idx : -1}:${Math.round(frac * 12)}`;
      if (key === lastKey && !dirty) return;
      lastKey = key;
      paint(a.bm, 1);
      if (b && b.idx !== a.idx) paint(b.bm, frac);
      ctx.globalAlpha = 1;
    };

    // Moves an element along the camera axis: arriving from far away (small,
    // low) and on the way out drifting past the lens (larger, rising) while
    // fading. Skips the style write when nothing visible changed.
    const last = new WeakMap<HTMLElement, string>();
    const place = (el: HTMLElement | null, inT: number, outT: number, m: Move, centre?: "x" | "y") => {
      if (!el) return;
      const i = ease(inT);
      const o = ease(outT);
      const alpha = i * (1 - o);
      const still = reduceMotion;
      const depth = still ? 0 : (1 - i) * -m.depth + o * 120;
      const rise = still ? 0 : (1 - i) * m.rise - o * 16;
      const blur = still ? 0 : (1 - i) * m.blur + o * (m.blur ? 8 : 0);
      const key = `${alpha.toFixed(3)}|${depth.toFixed(1)}|${rise.toFixed(1)}|${blur.toFixed(1)}|${wide.matches ? 1 : 0}`;
      if (last.get(el) === key) return;
      last.set(el, key);
      const base =
        wide.matches && centre === "x" ? "translateX(-50%) " : wide.matches && centre === "y" ? "translateY(-50%) " : "";
      el.style.opacity = alpha.toFixed(3);
      el.style.transform = `${base}perspective(1100px) translate3d(0, ${rise.toFixed(1)}px, ${depth.toFixed(1)}px)`;
      el.style.pointerEvents = alpha > 0.6 ? "auto" : "none";
      el.style.visibility = alpha > 0.005 ? "visible" : "hidden";
      el.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "none";
    };
    const span = (u: number, [from, to]: readonly [number, number]) => (u - from) / (to - from);

    // Loader: a short branded wait while the first frames arrive.
    const t0 = performance.now();
    const minMs = seen ? 0 : LOADER_MIN_MS;
    let released = false;
    const release = () => {
      released = true;
      try {
        window.sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
      const loader = loaderRef.current;
      if (loader) {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
        window.setTimeout(() => {
          if (loaderRef.current) loaderRef.current.style.display = "none";
        }, 1000);
      }
      setReady(true);
    };

    const offset = () => ((window.scrollY - top) / stageH) * 100 / pace;
    let shown = offset();
    let prev = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      const elapsed = now - t0;

      const target = offset();
      shown = reduceMotion ? target : shown + (target - shown) * (1 - Math.exp(-dt * catchUp));
      if (Math.abs(target - shown) < 0.02) shown = target;
      const u = Math.min(Math.max(shown, 0), TOTAL);

      const film = filmAt(u);
      const frame = film * (FRAME_COUNT - 1);
      keepWindow(Math.round(frame), target >= shown ? 1 : -1);
      draw(frame);
      dirty = false;

      if (!released) {
        const gotFrames = loaded >= LOADER_FRAMES && !!bitmaps[0];
        const bar = loaderBarRef.current;
        if (bar) {
          const p = Math.min(loaded / LOADER_FRAMES, elapsed / Math.max(minMs, 1), 1);
          bar.style.transform = `scaleX(${p.toFixed(3)})`;
        }
        if ((gotFrames && elapsed >= minMs) || elapsed >= LOADER_MAX_MS) release();
      }

      place(heroRef.current, 1, (u - HERO_OUT[0]) / (HERO_OUT[1] - HERO_OUT[0]), SCENE_MOVE);
      SCENES.forEach((s, i) =>
        place(sceneRefs.current[i], (u - s.from) / FADE, (u - (s.to - FADE)) / FADE, SCENE_MOVE, s.center),
      );
      if (meterRef.current) meterRef.current.style.transform = `scaleY(${(u / TOTAL).toFixed(4)})`;

      if (dimRef.current) dimRef.current.style.opacity = ease(span(u, END.dim)).toFixed(3);
      place(logoRef.current, span(u, END.logo), 0, LOGO_MOVE);
      place(tagRef.current, span(u, END.tag), 0, LINE_MOVE);
      place(ctaRef.current, span(u, END.cta), 0, LINE_MOVE);

      raf = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener("resize", measure);
    // Fonts and images can shift the page a little after load.
    const settle = window.setTimeout(measure, 1200);
    raf = requestAnimationFrame((now) => {
      prev = now;
      tick(now);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.removeEventListener("resize", measure);
      bitmaps.forEach((bm) => bm?.close());
    };
  }, []);

  const rise = (delay: number) => ({
    transitionDelay: `${delay}ms`,
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0)" : "translateY(26px)",
  });
  const riseClass = "transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative bg-[#0c0a08]"
      style={{ height: SECTION_HEIGHT }}
      aria-label="Maisé Studio"
    >
      {/* Short branded wait; shown once per session. */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#0c0a08] transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        aria-hidden
      >
        <LogoMark size="text-[clamp(2.6rem,8vw,4.5rem)]" tone="#F1ECE2" />
        <div className="mt-9 h-px w-44 overflow-hidden bg-white/15">
          <div
            ref={loaderBarRef}
            className="h-full origin-left bg-[#d3af61]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      <div
        ref={stageRef}
        className="world-noir sticky top-0 h-[100svh] w-full overflow-hidden bg-[#0c0a08] bg-cover bg-center"
        style={{ backgroundImage: `url(${POSTER})` }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

        {/* Legibility: a floor for the type, plus a side fall-off where the
            opening statement sits on large screens. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/25" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-black/55 via-black/10 to-transparent lg:block" />

        {/* Opening statement: on the right, away from the logo on the wall. */}
        <div
          ref={heroRef}
          className="absolute inset-0 z-10 flex items-end px-6 pb-14 md:px-12 lg:items-center lg:justify-end lg:pb-0"
        >
          <div className="relative w-full max-w-xl lg:max-w-[36rem]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-14 -inset-y-14 -z-10 bg-[radial-gradient(closest-side,rgba(8,6,4,0.55),transparent)]"
            />
            <p
              className={`mb-5 text-[11px] tracking-[0.42em] text-accent uppercase [text-shadow:0_1px_14px_rgba(0,0,0,0.7)] ${riseClass}`}
              style={rise(0)}
            >
              {t("hero.kicker")}
            </p>
            <h1 className={riseClass} style={rise(140)}>
              <span className="display block text-balance text-[clamp(2.3rem,min(5.6vw,9.5vh),4.9rem)] text-foreground">
                {t("hero.title")}
              </span>{" "}
              <span className="display mt-1.5 block pb-1 text-[clamp(1.5rem,min(3.2vw,5.6vh),2.7rem)] leading-[1.1] text-accent italic">
                {t("hero.title2")}
              </span>
            </h1>
            <p
              className={`mt-6 max-w-md text-base leading-relaxed text-foreground/85 [text-shadow:0_1px_16px_rgba(0,0,0,0.65)] md:text-lg ${riseClass}`}
              style={rise(300)}
            >
              {t("hero.subtitle")}
            </p>
            <div className={`mt-9 flex flex-wrap items-center gap-3 ${riseClass}`} style={rise(460)}>
              <Link
                href="/realisations"
                className="rounded-full bg-accent px-8 py-4 text-sm font-semibold whitespace-nowrap text-accent-foreground transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                {t("hero.cta1")}
              </Link>
              <Link
                href="/#configurateur"
                className="rounded-full border border-foreground/25 bg-foreground/10 px-8 py-4 text-sm font-semibold whitespace-nowrap text-foreground backdrop-blur-md transition-colors duration-200 hover:bg-foreground/20 active:scale-[0.98]"
              >
                {t("hero.cta2")}
              </Link>
            </div>
          </div>
        </div>

        {/* Story scenes: large type straight on the picture, except the
            ChatGPT scene, which sits on a liquid-glass card. Each arrives
            from depth, holds while the film nearly stops, then drifts past. */}
        {SCENES.map((s, i) => (
          <article
            key={s.id}
            ref={(el) => {
              sceneRefs.current[i] = el;
            }}
            className={`absolute z-10 ${s.place} ${s.align} ${s.glass ? "glass-film" : ""}`}
            style={{ opacity: 0, visibility: "hidden", willChange: "transform, opacity" }}
          >
            {s.glass ? (
              <div className="p-7 md:p-8">
                <h2 className="display text-balance text-[clamp(1.5rem,2.4vw,2rem)] text-foreground">
                  {t(s.title)}
                </h2>
                <p className="mt-3.5 text-[15px] leading-[1.65] text-foreground/75">{t(s.body)}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {AI_CHIPS.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-foreground/20 bg-foreground/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-foreground"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-10 -inset-y-12 -z-10 bg-[radial-gradient(closest-side,rgba(8,6,4,0.55),transparent)]"
                />
                <h2 className="display text-balance text-[clamp(2rem,4.4vw,3.8rem)] text-foreground [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]">
                  {t(s.title)}
                </h2>
                <p
                  className={`mt-4 max-w-md text-[clamp(1rem,1.25vw,1.12rem)] leading-relaxed text-foreground/85 [text-shadow:0_1px_14px_rgba(0,0,0,0.6)] ${
                    s.id === "s2" ? "md:ml-auto" : ""
                  }`}
                >
                  {t(s.body)}
                </p>
              </>
            )}
          </article>
        ))}

        {/* A hairline that shows how far the film has run, without a label. */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-5 z-10 hidden h-28 w-px -translate-y-1/2 bg-foreground/20 md:block"
        >
          <div ref={meterRef} className="h-full origin-top bg-accent" style={{ transform: "scaleY(0)" }} />
        </div>

        {/* Closing frame: the film dims and the studio mark arrives, then
            holds while the visitor takes it in. */}
        <div
          ref={dimRef}
          className="pointer-events-none absolute inset-0 z-20 bg-black/55 backdrop-blur-[3px]"
          style={{ opacity: 0 }}
        />
        <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
          <div
            ref={logoRef}
            style={{ opacity: 0, visibility: "hidden", willChange: "transform, opacity, filter" }}
          >
            <LogoMark size="text-[clamp(3.6rem,13vw,9rem)]" tone="var(--foreground)" />
          </div>
          <p
            ref={tagRef}
            className="mt-7 max-w-sm text-sm tracking-wide text-foreground/75 md:text-base"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            {t("footer.tag")}
          </p>
          <div
            ref={ctaRef}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <Link
              href="/#configurateur"
              className="rounded-full bg-accent px-8 py-4 text-sm font-semibold whitespace-nowrap text-accent-foreground transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              {t("hero.cta2")}
            </Link>
            <Link
              href="/realisations"
              className="rounded-full border border-foreground/25 bg-foreground/10 px-8 py-4 text-sm font-semibold whitespace-nowrap text-foreground backdrop-blur-md transition-colors duration-200 hover:bg-foreground/20 active:scale-[0.98]"
            >
              {t("hero.cta1")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
