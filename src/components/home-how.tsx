"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useLang, type DictKey } from "@/lib/i18n";

const INCLUDED: DictKey[] = ["how.get.1", "how.get.2", "how.get.3", "how.get.4", "how.get.5", "how.get.6"];
const STEPS: { title: DictKey; body: DictKey }[] = [
  { title: "how.s1.t", body: "how.s1.b" },
  { title: "how.s2.t", body: "how.s2.b" },
  { title: "how.s3.t", body: "how.s3.b" },
  { title: "how.s4.t", body: "how.s4.b" },
];

// Two questions every visitor has before writing: what exactly do I get, and
// what happens after I write. Answered in plain words, with no promise that is
// not already in the FAQ and the quote.
export function HomeHow() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);

  return (
    <section className="bg-background px-6 py-24 md:px-10 md:py-32">
      <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} mx-auto max-w-[1300px]`}>
        <p className="mb-5 text-xs tracking-[0.42em] text-accent uppercase">{t("how.kicker")}</p>
        <h2 className="display max-w-3xl text-balance text-[clamp(1.9rem,4.4vw,3.2rem)] text-foreground">
          {t("how.title")}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h3 className="text-xs tracking-widest text-muted-foreground uppercase">{t("how.get.title")}</h3>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {INCLUDED.map((k) => (
                <li key={k} className="flex gap-4 py-4 text-foreground/90">
                  <Check size={18} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-accent" />
                  <span className="leading-relaxed">{t(k)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">{t("how.note")}</p>
          </div>

          <div>
            <h3 className="text-xs tracking-widest text-muted-foreground uppercase">{t("how.steps.title")}</h3>
            <ol className="mt-6 space-y-0">
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < STEPS.length - 1 && (
                    <span aria-hidden className="absolute top-9 bottom-0 left-[1.0625rem] w-px bg-border" />
                  )}
                  <span className="flex h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center rounded-full border border-accent/50 font-display text-sm text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="display text-xl text-foreground">{t(s.title)}</h4>
                    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">{t(s.body)}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-[gap] duration-300 hover:gap-3"
            >
              {t("how.cta")} <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
