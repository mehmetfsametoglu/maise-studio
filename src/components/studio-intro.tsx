"use client";

import { useLang } from "@/lib/i18n";

export function StudioIntro() {
  const { t } = useLang();
  return (
    <section className="px-6 pt-36 pb-16 md:px-10 md:pt-44">
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">
          {t("studio.kicker")}
        </p>
        <h1 className="display text-[clamp(2.2rem,5.6vw,4rem)] text-foreground">
          {t("studio.title")}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {t("studio.body")}
        </p>
      </div>
    </section>
  );
}
