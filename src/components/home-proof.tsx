"use client";

import { useEffect, useRef } from "react";
import { useLang, type DictKey } from "@/lib/i18n";
import { PACKAGES } from "@/lib/pricing";
import { PROJECTS } from "@/lib/projects";

// Four facts the site already states, counted up once when they scroll into
// view. The final value is always in the text, so with scripts or motion off
// (or before the count starts) the real numbers are what is on the page.
type Stat = { to: number; prefix?: string; suffix?: string; label: DictKey };
const STATS: Stat[] = [
  { to: PACKAGES.essentiel.eur, suffix: " €", label: "proof.l1" },
  { to: 3, prefix: "< ", suffix: " h", label: "proof.l2" },
  { to: PROJECTS.length, label: "proof.l3" },
  { to: 1, label: "proof.l4" },
];

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const outer = useRef<HTMLSpanElement>(null);
  const value = useRef<HTMLSpanElement>(null);
  const format = (n: number) => n.toLocaleString("fr-FR");

  useEffect(() => {
    const el = outer.current;
    const num = value.current;
    if (!el || !num) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();
        // The text holds the real value until this moment.
        num.textContent = format(0);
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / 1100, 1);
          num.textContent = format(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={outer}>
      {prefix}
      <span ref={value}>{format(to)}</span>
      {suffix}
    </span>
  );
}

export function HomeProof() {
  const { t } = useLang();
  return (
    <section aria-label="Maisé Studio" className="border-b border-border bg-background px-6 py-12 md:px-10 md:py-16">
      <dl className="mx-auto grid max-w-[1300px] grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="border-t border-brass/60 pt-5">
            <dd className="display text-[clamp(2.2rem,4.6vw,3.4rem)] leading-none text-foreground">
              <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
            </dd>
            <dt className="mt-3 max-w-[16rem] text-sm leading-snug text-muted-foreground">{t(s.label)}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
