"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useLang } from "@/lib/i18n";
import { PROJECTS } from "@/lib/projects";
import { ProjectLinkCard } from "@/components/page-kit";

export function RealWork() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>(0.08);

  return (
    <section id="projets" className="world-sand bg-background px-6 py-[clamp(50px,2rem+4.5vw,100px)] md:px-10">
      <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} mx-auto max-w-[1300px]`}>
        <p className="mb-5 flex items-center gap-4 text-xs font-medium tracking-[0.18em] text-accent uppercase">
          {t("realwork.kicker")}
          <span aria-hidden className="h-px w-8 bg-brass" />
        </p>
        <h2 className="display max-w-3xl text-balance text-[clamp(1.9rem,4.4vw,3.2rem)] text-foreground">
          {t("realwork.title")}
        </h2>
        <p className="mt-5 max-w-xl text-muted-foreground">{t("realwork.body")}</p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectLinkCard key={p.slug} project={p} priority={i < 2} />
          ))}
        </div>

        <Link
          href="/realisations"
          className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-[gap] duration-[400ms] hover:gap-3"
        >
          {t("worktease.cta")} <ArrowRight size={15} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
