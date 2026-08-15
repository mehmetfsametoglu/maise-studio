"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/use-reveal";
import { useLang, type DictKey } from "@/lib/i18n";

const SERVICE_KEYS: DictKey[] = [
  "services.s1",
  "services.s2",
  "services.s3",
  "services.s4",
];

export function Services() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative border-t border-border bg-background px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]`}>
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

          <ul className="flex flex-col divide-y divide-border border-t border-border">
            {SERVICE_KEYS.map((key, i) => (
              <li
                key={key}
                className="group flex items-baseline justify-between gap-6 py-5 transition-colors duration-300"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-display text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg text-foreground transition-transform duration-300 group-hover:translate-x-1 md:text-xl">
                    {t(key)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
