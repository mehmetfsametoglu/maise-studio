"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useLang, type DictKey } from "@/lib/i18n";

// The one dark band of the page. Five differences, each a short title and one
// specific sentence, all taken from what the site already promises.
const REASONS: { t: DictKey; b: DictKey }[] = [
  { t: "why.1.t", b: "why.1.b" },
  { t: "why.2.t", b: "why.2.b" },
  { t: "why.3.t", b: "why.3.b" },
  { t: "why.4.t", b: "why.4.b" },
  { t: "why.5.t", b: "why.5.b" },
];

export function HomeWhy() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);

  return (
    <section className="world-ink bg-background px-6 py-[clamp(50px,2rem+4.5vw,100px)] text-foreground md:px-10">
      <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} mx-auto max-w-[1300px]`}>
        <p className="mb-5 flex items-center gap-4 text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
          {t("why.kicker")}
          <span aria-hidden className="h-px w-8 bg-brass" />
        </p>
        <h2 className="display max-w-3xl text-balance text-[clamp(1.9rem,4.4vw,3.2rem)] text-foreground">
          {t("why.title")}
        </h2>
        <p className="mt-5 max-w-xl text-foreground/80">{t("why.lead")}</p>

        <ol className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <li key={r.t} className="border-t border-border pt-6">
              <span className="font-display text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-3 text-xl text-foreground">{t(r.t)}</h3>
              <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted-foreground">{t(r.b)}</p>
            </li>
          ))}
        </ol>

        <Link
          href="/services"
          className="mt-12 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-[gap] duration-[400ms] hover:gap-3"
        >
          {t("why.more")} <ArrowRight size={15} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
