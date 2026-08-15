"use client";

import { useLang } from "@/lib/i18n";

export function ExamplesIntro() {
  const { t } = useLang();
  return (
    <section className="px-6 pt-36 pb-20 md:px-10 md:pt-44 md:pb-28">
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">
          {t("examples.kicker")}
        </p>
        <h1 className="display text-[clamp(2.2rem,5.6vw,4rem)] text-foreground">
          {t("examples.title")}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {t("examples.body")}
        </p>
      </div>
    </section>
  );
}
