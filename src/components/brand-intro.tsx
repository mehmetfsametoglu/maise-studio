"use client";

import { useReveal } from "@/hooks/use-reveal";
import { useLang } from "@/lib/i18n";

export function BrandIntro() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { t } = useLang();

  const VALUES = [
    { n: "01", title: t("brand.v1.title"), body: t("brand.v1.body") },
    { n: "02", title: t("brand.v2.title"), body: t("brand.v2.body") },
    { n: "03", title: t("brand.v3.title"), body: t("brand.v3.body") },
  ];

  return (
    <section id="le-studio" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} max-w-3xl`}>
          <p className="mb-6 text-[11px] tracking-[0.42em] text-accent uppercase">
            {t("brand.kicker")}
          </p>
          <h2 className="display text-[clamp(2rem,5.4vw,4.2rem)] text-foreground">
            {t("brand.title")}
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t("brand.body")}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-14 border-t border-border pt-14 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <ValueCard key={v.n} {...v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  n,
  title,
  body,
  index,
}: {
  n: string;
  title: string;
  body: string;
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        opacity: visible ? 1 : undefined,
        transform: visible ? "translateY(0)" : undefined,
        transitionDelay: `${index * 120}ms`,
      }}
    >
      <span className="font-display text-sm text-accent">{n}</span>
      <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
