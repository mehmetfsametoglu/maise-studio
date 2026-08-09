"use client";

import { LogoMark } from "@/components/logo-mark";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative border-t border-cream/10 px-6 py-14 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <LogoMark />
          <p className="mt-2 text-xs text-cream/40">{t("footer.tag")}</p>
        </div>
        <p className="text-xs text-cream/30">
          © {new Date().getFullYear()} Maisé Studio — {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
