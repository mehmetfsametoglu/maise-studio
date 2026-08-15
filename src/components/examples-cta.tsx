"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

export function ExamplesCta() {
  const { t } = useLang();
  return (
    <section className="bg-background px-6 py-28 text-center md:px-10 md:py-36">
      <div className="mx-auto max-w-xl">
        <h2 className="display text-[clamp(1.8rem,4.2vw,2.8rem)] text-foreground">
          {t("examples.ctaTitle")}
        </h2>
        <Link
          href="/contact"
          className="mt-8 inline-flex rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
        >
          {t("examples.ctaButton")}
        </Link>
      </div>
    </section>
  );
}
