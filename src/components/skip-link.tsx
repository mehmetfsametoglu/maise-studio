"use client";

import { useLang } from "@/lib/i18n";

// First focusable element of every page: lets keyboard and screen reader
// visitors jump over the navigation to the content.
export function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#contenu"
      className="fixed top-3 left-3 z-[100] -translate-y-[200%] rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform focus:translate-y-0"
    >
      {t("skip.main")}
    </a>
  );
}
