"use client";

import { useLang } from "@/lib/i18n";
import { ContactForm } from "@/components/contact-form";
import { MapEmbed } from "@/components/map-embed";

export function ContactContent() {
  const { t } = useLang();

  return (
    <div>
      <section className="px-6 pt-36 pb-16 md:px-10 md:pt-44">
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">
            {t("contact.kicker")}
          </p>
          <h1 className="display text-[clamp(2.2rem,5.6vw,4rem)] text-foreground">
            {t("contact.title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      <section className="px-6 pb-28 md:px-10 md:pb-40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                {t("contact.location.label")}
              </p>
              <p className="mt-1 text-lg font-medium text-foreground">
                {t("contact.location.value")}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                {t("contact.hours.label")}
              </p>
              <p className="mt-1 text-foreground/85">{t("contact.hours.value")}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-muted-foreground uppercase">Email</p>
              <a
                href="mailto:studiomaise@gmail.com"
                className="mt-1 block text-foreground/85 transition-colors hover:text-accent"
              >
                studiomaise@gmail.com
              </a>
            </div>
            <div>
              <a
                href="https://wa.me/33753406344"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02]"
              >
                {t("contact.whatsapp")}
              </a>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                {t("contact.team.label")} — Mehmet Sametoglu, Ismail Cakir
              </p>
            </div>

            <div className="glass-liquid overflow-hidden rounded-2xl p-1.5">
              <MapEmbed className="aspect-[4/3] overflow-hidden rounded-xl" />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
