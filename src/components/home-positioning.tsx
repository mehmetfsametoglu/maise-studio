"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useLang } from "@/lib/i18n";

// Right after the opening film: one plain sentence saying what Maisé Studio is,
// where it is, and what it makes. This is the paragraph a visitor, a search
// engine or an assistant should be able to quote.
export function HomePositioning() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);

  return (
    <section className="bg-background px-6 py-24 md:px-10 md:py-32">
      <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} mx-auto max-w-4xl`}>
        <p className="display text-balance text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.2] font-medium text-foreground">
          {t("pos.text")}
        </p>
        <p className="mt-8 max-w-2xl text-muted-foreground">{t("pos.process")}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-accent transition-[gap] duration-300 hover:gap-3"
          >
            {t("pos.cta")} <ArrowRight size={15} aria-hidden />
          </Link>
          <Link href="/studio" className="text-foreground/80 transition-colors hover:text-accent">
            {t("pos.method")}
          </Link>
        </div>
      </div>
    </section>
  );
}
