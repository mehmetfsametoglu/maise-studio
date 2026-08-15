"use client";

import { useReveal } from "@/hooks/use-reveal";
import { useLang } from "@/lib/i18n";

export function MenuDemo() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const drinks = [
    { name: t("menu.item1"), price: "3,50" },
    { name: t("menu.item2"), price: "4,80" },
    { name: t("menu.item3"), price: "5,20" },
    { name: t("menu.item4"), price: "5,00" },
  ];
  const pastries = [
    { name: t("menu.item5"), price: "2,80" },
    { name: t("menu.item6"), price: "6,50" },
    { name: t("menu.item7"), price: "6,90" },
    { name: t("menu.item8"), price: "4,20" },
  ];

  return (
    <section className="world-emerald relative bg-background px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-5xl">
        <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} max-w-2xl`}>
          <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">
            {t("menu.kicker")}
          </p>
          <h2 className="display text-[clamp(1.9rem,4.6vw,3.2rem)] text-foreground">
            {t("menu.title")}
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground">{t("menu.body")}</p>
        </div>

        <div className="glass-liquid mt-14 grid grid-cols-1 gap-12 rounded-[2rem] p-8 sm:grid-cols-2 md:p-12">
          <MenuColumn title={t("menu.cat1")} items={drinks} />
          <MenuColumn title={t("menu.cat2")} items={pastries} />
        </div>
      </div>
    </section>
  );
}

function MenuColumn({
  title,
  items,
}: {
  title: string;
  items: { name: string; price: string }[];
}) {
  return (
    <div>
      <h3 className="display mb-6 text-xl text-accent">{title}</h3>
      <ul className="flex flex-col gap-5">
        {items.map((item) => (
          <li key={item.name} className="flex items-baseline gap-3">
            <span className="text-sm text-foreground">{item.name}</span>
            <span className="flex-1 border-b border-dotted border-border" />
            <span className="font-display text-sm text-muted-foreground">€{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
