"use client";

import { useReveal } from "@/hooks/use-reveal";
import { useLang, type DictKey } from "@/lib/i18n";

const CAPABILITY_KEYS: DictKey[] = [
  "cap.c1",
  "cap.c2",
  "cap.c3",
  "cap.c4",
  "cap.c5",
  "cap.c6",
  "cap.c7",
  "cap.c8",
  "cap.c9",
  "cap.c10",
];

export function Capabilities() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative border-t border-border bg-background px-6 py-28 md:px-10 md:py-40">
      <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} mx-auto max-w-6xl`}>
        <p className="mb-8 text-xs tracking-widest text-muted-foreground uppercase">
          {t("cap.kicker")}
        </p>
        <div className="flex flex-wrap gap-3">
          {CAPABILITY_KEYS.map((key) => (
            <span
              key={key}
              className="rounded-full border border-border bg-muted px-4 py-2 text-sm text-foreground/85"
            >
              {t(key)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
