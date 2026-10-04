"use client";

import { useReveal } from "@/hooks/use-reveal";
import { useLang } from "@/lib/i18n";

export function BrandIntro() {
  const { ref } = useReveal<HTMLDivElement>();
  const { t } = useLang();

  const VALUES = [
    { n: "01", title: t("brand.v1.title"), body: t("brand.v1.body") },
    { n: "02", title: t("brand.v2.title"), body: t("brand.v2.body") },
    { n: "03", title: t("brand.v3.title"), body: t("brand.v3.body") },
  ];

  return (
    <section id="le-studio" className="relative px-6 pb-24 md:px-10 md:pb-32">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 border-t border-border pt-14 md:grid-cols-3">
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
