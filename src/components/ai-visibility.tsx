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
    <section className="world-emerald relative bg-background px-6 py-24 md:px-10 md:py-36">
      <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} mx-auto max-w-6xl`}>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">
              {t("geo.kicker")}
            </p>
            <h2 className="display text-[clamp(2rem,4.8vw,3.4rem)] text-foreground">
              {t("geo.title")}
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-[1.7] text-muted-foreground">
              {t("geo.body")}
            </p>
            <p className="mt-6 max-w-md border-l-2 border-accent pl-4 text-sm leading-relaxed text-foreground/85">
              {t("geo.tag")}
            </p>
          </div>

          {/* An illustration of the answer an assistant gives, not a real
              conversation or a real client. */}
          <div className="glass-liquid relative rounded-[1.75rem] p-5 sm:p-7">
            <p className="mb-5 text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              {t("geo.mock")}
            </p>

            <div className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-md bg-foreground/10 px-4 py-3 text-sm text-foreground">
              {t("geo.q")}
            </div>

            <div className="mt-4 flex gap-3">
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Bot size={16} strokeWidth={1.6} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">{t("geo.a.intro")}</p>

                <div className="mt-3 rounded-xl border border-accent/40 bg-accent/10 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {t("geo.a.you")}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {t("geo.a.you.desc")}
                  </p>
                </div>

                <div className="mt-2.5 space-y-2 opacity-40" aria-hidden>
                  <div className="h-9 rounded-xl border border-border" />
                  <div className="h-9 rounded-xl border border-border" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p) => (
            <div
              key={p.titleKey}
              className="glass-panel rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
            >
              <p.icon size={18} className="mb-3 text-accent" strokeWidth={1.5} />
              <h3 className="mb-1.5 text-[15px] font-medium text-foreground">{t(p.titleKey)}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{t(p.bodyKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
