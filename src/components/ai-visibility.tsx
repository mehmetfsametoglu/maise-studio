"use client";

import { Bot, FileCode2, Search, Sparkles } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useLang, type DictKey } from "@/lib/i18n";

const POINTS: { icon: typeof Bot; titleKey: DictKey; bodyKey: DictKey }[] = [
  { icon: Search, titleKey: "geo.p1.title", bodyKey: "geo.p1.body" },
  { icon: Bot, titleKey: "geo.p2.title", bodyKey: "geo.p2.body" },
  { icon: FileCode2, titleKey: "geo.p3.title", bodyKey: "geo.p3.body" },
  { icon: Sparkles, titleKey: "geo.p4.title", bodyKey: "geo.p4.body" },
];

export function AiVisibility() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="world-emerald relative bg-background px-6 py-28 md:px-10 md:py-40">
      <div
        ref={ref}
        className={`reveal ${visible ? "reveal-in" : ""} mx-auto max-w-6xl`}
      >
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">
              {t("geo.kicker")}
            </p>
            <h2 className="display text-[clamp(1.9rem,4.4vw,3.2rem)] text-foreground">
              {t("geo.title")}
            </h2>
            <p className="mt-6 max-w-sm text-muted-foreground">{t("geo.body")}</p>
            <p className="mt-6 max-w-sm text-sm text-muted-foreground/80 italic">
              {t("geo.tag")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {POINTS.map((p) => (
              <div
                key={p.titleKey}
                className="glass-panel rounded-2xl p-6 transition-all duration-300 hover:border-accent/40"
              >
                <p.icon size={20} className="mb-4 text-accent" strokeWidth={1.5} />
                <h3 className="mb-2 text-base font-medium text-foreground">
                  {t(p.titleKey)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(p.bodyKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
