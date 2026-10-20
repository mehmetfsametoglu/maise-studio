"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { PROJECTS } from "@/lib/projects";

// The first screen: what Maisé is, who for, two ways forward, and proof right
// away (a real live project, on a phone and on a computer). Everything is real
// text in the HTML. The entrance animation only moves things; nothing starts
// hidden, so the page reads the same with scripts or animations off.
const SHOWN = PROJECTS[0]; // Le 40, a bar in Paris

export function HomeHero() {
  const { t, lang } = useLang();
  const title = t("hero.title");
  const em = t("hero.em");
  const at = title.indexOf(em);

  return (
    <section id="top" className="world-ink relative isolate overflow-hidden bg-background text-foreground">
      {/* Two very slow glows: bordeaux top left, green bottom right. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow glow-a" />
        <div className="glow glow-b" />
      </div>

      <div className="mx-auto grid max-w-[1380px] items-center gap-14 px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28 lg:min-h-[92svh] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p
            className="animate-rise inline-flex items-center gap-3 rounded-full border border-border px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] text-accent uppercase"
            style={{ ["--d" as string]: "0ms" }}
          >
            {t("hero.kicker")}
          </p>
          <h1
            className="display animate-rise mt-7 text-balance text-[clamp(2.5rem,4.9vw,4.4rem)] leading-[1.04] text-foreground"
            style={{ ["--d" as string]: "80ms" }}
          >
            {at >= 0 ? (
              <>
                {title.slice(0, at)}
                <em className="text-accent italic">{em}</em>
                {title.slice(at + em.length)}
              </>
            ) : (
              title
            )}
          </h1>
          <p
            className="animate-rise mt-6 max-w-xl text-[18px] leading-[1.65] text-foreground/85"
            style={{ ["--d" as string]: "160ms" }}
          >
            {t("hero.subtitle")}
          </p>
          <div className="animate-rise mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: "240ms" }}>
            <Link
              href="/realisations"
              className="inline-flex h-[52px] w-full items-center justify-center sm:w-auto gap-2 rounded-full bg-accent px-8 text-sm font-semibold whitespace-nowrap text-accent-foreground transition-[background-color,transform] duration-[400ms] ease-[var(--ease-maise)] hover:bg-accent-hover active:scale-[0.98]"
            >
              {t("hero.cta1")} <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              href="/#configurateur"
              className="inline-flex h-[52px] w-full items-center justify-center sm:w-auto rounded-full border border-foreground/25 bg-foreground/[0.06] px-8 text-sm font-semibold whitespace-nowrap text-foreground transition-[background-color,transform] duration-[400ms] ease-[var(--ease-maise)] hover:bg-foreground/[0.12] active:scale-[0.98]"
            >
              {t("hero.cta2")}
            </Link>
          </div>
        </div>

        {/* A real live project, on a computer and on a phone. */}
        <Link
          href={`/realisations/${SHOWN.slug}`}
          className="animate-rise group relative mx-auto block w-full max-w-[640px] pb-10 lg:mx-0 lg:ml-auto"
          style={{ ["--d" as string]: "200ms" }}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] border border-border shadow-[var(--shadow-pop)]">
            <Image
              src={SHOWN.shots.desktop.src}
              alt={SHOWN.shots.desktop.alt[lang]}
              fill
              priority
              sizes="(min-width: 1024px) 640px, 92vw"
              className="object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-maise)] group-hover:scale-[1.03]"
            />
          </div>
          <div className="absolute right-3 -bottom-0 aspect-[390/844] w-[26%] min-w-[92px] overflow-hidden rounded-[18px] border border-border shadow-[var(--shadow-pop)] sm:right-6">
            <Image
              src={SHOWN.shots.mobile.src}
              alt={SHOWN.shots.mobile.alt[lang]}
              fill
              sizes="170px"
              className="object-cover object-top"
            />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {SHOWN.name} · {SHOWN.sector[lang]} · {SHOWN.city}
          </p>
        </Link>
      </div>
    </section>
  );
}
