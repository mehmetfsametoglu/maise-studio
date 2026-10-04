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
        <div className="mt-12 max-w-xl border-t border-border pt-8">
          <h2 className="display text-2xl text-foreground">{t("studio.team.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("studio.team.body")}</p>
        </div>
      </div>
    </section>
  );
}
