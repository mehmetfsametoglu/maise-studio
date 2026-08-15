"use client";

import { useLang } from "@/lib/i18n";
import { ContactForm } from "@/components/contact-form";

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
              <p className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
                {t("contact.team.label")}
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/33753406344"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-[#25D366]/30 bg-[#25D366]/[0.08] px-4 py-3 transition-colors hover:border-[#25D366]/55"
                >
                  <span>
                    <span className="block text-sm text-foreground">Mehmet Sametoglu</span>
                    <span className="block text-xs text-muted-foreground">+33 7 53 40 63 44</span>
                  </span>
                  <span className="text-[11px] font-medium tracking-widest text-[#25D366] uppercase">
                    {t("contact.whatsapp")}
                  </span>
                </a>
                <a
                  href="tel:+33749829678"
                  className="flex items-center justify-between rounded-xl border border-border px-4 py-3 transition-colors hover:border-accent/40"
                >
                  <span>
                    <span className="block text-sm text-foreground">Ismail Cakir</span>
                    <span className="block text-xs text-muted-foreground">+33 7 49 82 96 78</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="glass-liquid overflow-hidden rounded-2xl p-1.5">
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <iframe
                  title="Maisé Studio — Paris"
                  src="https://maps.google.com/maps?q=Paris%2C%20France&t=&z=12&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
