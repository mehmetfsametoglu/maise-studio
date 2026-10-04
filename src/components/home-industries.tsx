"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useLang, type DictKey } from "@/lib/i18n";

const CARDS: { slug: string; title: DictKey; text: DictKey }[] = [
  { slug: "site-web-restaurant-cafe", title: "svcnav.restaurant", text: "ind.restaurant" },
  { slug: "site-web-hotel", title: "svcnav.hotel", text: "ind.hotel" },
  { slug: "site-web-commerce", title: "svcnav.commerce", text: "ind.commerce" },
  { slug: "seo-visibilite-ia", title: "svcnav.seo", text: "ind.seo" },
];

export function HomeIndustries() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);

  return (
    <section className="bg-background px-6 py-24 md:px-10 md:py-32">
      <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} mx-auto max-w-6xl`}>
        <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">{t("ind.kicker")}</p>
        <h2 className="display max-w-2xl text-[clamp(1.9rem,4.4vw,3.2rem)] text-foreground">{t("ind.title")}</h2>
        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/services/${c.slug}`}
                className="group flex h-full flex-col justify-between gap-10 rounded-2xl border border-border bg-card p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
              >
                <div>
                  <h3 className="display text-xl text-foreground">{t(c.title)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(c.text)}</p>
                </div>
                <ArrowUpRight
                  size={18}
                  aria-hidden
                  className="text-muted-foreground transition-colors group-hover:text-accent"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
