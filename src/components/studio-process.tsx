"use client";

import { useReveal } from "@/hooks/use-reveal";
import { useLang, type DictKey } from "@/lib/i18n";

const STEPS: { titleKey: DictKey; bodyKey: DictKey }[] = [
  { titleKey: "process.step1.title", bodyKey: "process.step1.body" },
  { titleKey: "process.step2.title", bodyKey: "process.step2.body" },
  { titleKey: "process.step3.title", bodyKey: "process.step3.body" },
  { titleKey: "process.step4.title", bodyKey: "process.step4.body" },
];

export function StudioProcess() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative border-t border-border bg-background px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} max-w-2xl`}>
          <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">
            {t("process.kicker")}
          </p>
          <h2 className="display text-[clamp(1.9rem,4.4vw,3.2rem)] text-foreground">
            {t("process.title")}
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground">{t("process.body")}</p>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 border-t border-border pt-12 md:grid-cols-2">
          {STEPS.map((step, i) => (
            <li key={step.titleKey} className="flex flex-col gap-3">
              <span className="font-display text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display text-xl text-foreground md:text-2xl">{t(step.titleKey)}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t(step.bodyKey)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
