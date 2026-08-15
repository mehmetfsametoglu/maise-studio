"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useLang } from "@/lib/i18n";
import { REAL_PROJECTS } from "@/lib/real-projects";

export function RealWork() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="world-navy relative bg-background px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} max-w-2xl`}>
          <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">
            {t("realwork.kicker")}
          </p>
          <h2 className="display text-[clamp(1.9rem,4.6vw,3.2rem)] text-foreground">
            {t("realwork.title")}
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground">{t("realwork.body")}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {REAL_PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/ornek/${p.slug}`}
              className="glass-liquid group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-[1.5rem] p-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.015]"
            >
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/5" />
              <div className="relative z-10 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] tracking-[0.3em] text-white/60 uppercase">
                    {t(p.sectorKey)}
                  </p>
                  <h3 className="display mt-1 text-2xl text-white">{p.name}</h3>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
