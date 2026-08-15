"use client";

import { useLang, type DictKey } from "@/lib/i18n";

export function SectionTransition({ textKey }: { textKey: DictKey }) {
  const { t } = useLang();
  return (
    <div className="bg-background px-6 py-20 text-center md:py-28">
      <p className="display mx-auto max-w-lg text-xl text-foreground/70 italic md:text-2xl">
        {t(textKey)}
      </p>
    </div>
  );
}
