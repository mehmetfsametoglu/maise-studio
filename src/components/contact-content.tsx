"use client";

import { useLang } from "@/lib/i18n";
import { ContactForm } from "@/components/contact-form";
import { whatsappHref } from "@/lib/contact";

// On a phone the order is: write on WhatsApp right away, or leave details in
// the form, and only then the practical information. On a large screen the
// information sits in the left column beside them.
export function ContactContent() {
  const { t } = useLang();

  return (
    <div>
      <section className="px-6 pt-36 pb-12 md:px-10 md:pt-44 md:pb-16">
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
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-x-14">
          <div className="lg:col-start-2 lg:row-start-1">
            <a
              href={whatsappHref(t("wa.greeting"))}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-semibold whitespace-nowrap text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("contact.whatsapp")}
            </a>
            <div className="mt-8 flex items-center gap-4 text-xs tracking-widest text-muted-foreground uppercase">
              <span className="h-px flex-1 bg-border" />
              {t("contactform.or")}
              <span className="h-px flex-1 bg-border" />
            </div>
          </div>

          <div className="-mt-4 lg:col-start-2 lg:row-start-2 lg:mt-0">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-8 lg:col-start-1 lg:row-span-2 lg:row-start-1">
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
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                {t("contact.email.label")}
              </p>
              <a
                href="mailto:studiomaise@gmail.com"
                className="mt-1 block text-foreground/85 transition-colors hover:text-accent"
              >
                studiomaise@gmail.com
              </a>
            </div>
            <div>
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                {t("contact.team.label")}
              </p>
              <p className="mt-1 text-foreground/85">Mehmet Sametoglu, Ismail Cakir</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
