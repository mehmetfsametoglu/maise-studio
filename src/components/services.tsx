"use client";

import Link from "next/link";
import { Code, LayoutTemplate, LifeBuoy, Palette, Search, Sparkles } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useLang, type DictKey } from "@/lib/i18n";

const SERVICES: {
  icon: typeof Palette;
  nameKey: DictKey;
  descKey: DictKey;
  featured?: boolean;
}[] = [
  { icon: Palette, nameKey: "services.s1", descKey: "services.s1desc", featured: true },
  { icon: Code, nameKey: "services.s2", descKey: "services.s2desc" },
  { icon: LayoutTemplate, nameKey: "services.s3", descKey: "services.s3desc" },
  { icon: Sparkles, nameKey: "services.s4", descKey: "services.s4desc" },
  { icon: Search, nameKey: "services.s5", descKey: "services.s5desc" },
  { icon: LifeBuoy, nameKey: "services.s6", descKey: "services.s6desc" },
];

export function Services() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative border-t border-border bg-background px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`reveal ${visible ? "reveal-in" : ""} grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]`}
        >
          <div>
            <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">
              {t("services.kicker")}
            </p>
            <h2 className="display text-[clamp(1.9rem,4.4vw,3.2rem)] text-foreground">
              {t("services.title")}
            </h2>
            <p className="mt-6 max-w-sm text-muted-foreground">{t("services.body")}</p>
            <Link
              href="/studio"
              className="mt-8 inline-flex items-center gap-2 text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
            >
              {t("services.seeAll")}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {SERVICES.map((s, i) => (
              <div
                key={s.nameKey}
                className={`group rounded-2xl p-6 transition-all duration-300 md:p-7 ${
                  s.featured
                    ? "col-span-2 bg-foreground"
                    : "glass-panel hover:border-accent/40"
                }`}
              >
                <s.icon
                  size={s.featured ? 24 : 20}
                  strokeWidth={1.4}
                  className={`mb-4 transition-transform duration-300 group-hover:-translate-y-0.5 ${
                    s.featured ? "text-background" : "text-accent"
                  }`}
                />
                <h3
                  className={`font-medium ${
                    s.featured ? "text-xl text-background md:text-2xl" : "text-base text-foreground"
                  }`}
                >
                  {t(s.nameKey)}
                </h3>
                <p
                  className={`mt-2 max-w-sm text-sm leading-relaxed ${
                    s.featured ? "text-background/70" : "text-muted-foreground"
                  }`}
                >
                  {t(s.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
