"use client";

import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { faqById } from "@/lib/faq";

const HOME_FAQ = faqById(["prix", "delai", "propriete", "modifier", "langues", "chatgpt"]);

export function HomeFaq() {
  const { t, lang } = useLang();

  return (
    <section className="bg-background px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">{t("faq.kicker")}</p>
        <h2 className="display text-[clamp(1.9rem,4.4vw,3.2rem)] text-foreground">{t("faq.title")}</h2>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {HOME_FAQ.map((f) => (
            <details key={f.id} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {f.q[lang]}
                <Plus
                  size={18}
                  aria-hidden
                  className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted-foreground">{f.a[lang]}</p>
            </details>
          ))}
        </div>
        <Link
          href="/faq"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent transition-[gap] duration-300 hover:gap-3"
        >
          {t("faq.more")} <ArrowRight size={15} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
