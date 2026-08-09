"use client";

import { useState } from "react";
import { ArrowDown, Boxes, Globe2, Sparkles } from "lucide-react";
import { TextReveal } from "@/components/text-reveal";
import { MagneticButton } from "@/components/magnetic-button";
import { BentoCard } from "@/components/bento-card";
import { Marquee } from "@/components/marquee";
import { WorkCard } from "@/components/work-card";
import { WHATSAPP_LINK } from "@/components/whatsapp-button";
import { BusinessSelector } from "@/components/configurator/business-selector";
import { TierSelector } from "@/components/configurator/tier-selector";
import { LanguageSelector } from "@/components/configurator/language-selector";
import { LivePreview } from "@/components/configurator/live-preview";
import { PriceSummary } from "@/components/configurator/price-summary";
import { bizByKey, type BizKey, type TierKey } from "@/lib/config-data";
import { useLang, type Lang } from "@/lib/i18n";

export default function Home() {
  const { t } = useLang();
  const [biz, setBiz] = useState<BizKey>("cafe");
  const [tier, setTier] = useState<TierKey>("premium");
  const [langs, setLangs] = useState<Set<Lang>>(new Set(["fr"]));
  const accent = bizByKey(biz).accent;

  function toggleLang(l: Lang) {
    setLangs((prev) => {
      const next = new Set(prev);
      next.has(l) ? next.delete(l) : next.add(l);
      return next;
    });
  }

  return (
    <div id="top" className="relative">
      {/* Hero */}
      <section className="relative flex min-h-screen w-full flex-col justify-center px-6 pt-28 md:px-10">
        <p className="mb-6 text-xs tracking-[0.35em] text-[#c8934e] uppercase">
          {t("hero.kicker")}
        </p>
        <h1 className="max-w-4xl font-serif text-[3rem] leading-[0.95] text-cream italic sm:text-[4.3rem] md:text-[6.2rem]">
          <TextReveal lines={[t("hero.title1"), t("hero.title2")]} immediate />
        </h1>
        <p className="mt-8 max-w-md text-base leading-relaxed font-light text-cream/60 md:mt-10 md:text-lg">
          {t("hero.subtitle")}
        </p>
        <div className="mt-10 md:mt-14">
          <MagneticButton
            href="#configurator"
            className="rounded-full bg-[#c8934e] px-7 py-3.5 text-xs font-medium tracking-widest text-[#170f0a] uppercase hover:bg-[#dba86a]"
          >
            {t("hero.cta")}
          </MagneticButton>
        </div>
        <div className="absolute bottom-10 left-6 flex items-center gap-2 text-[11px] tracking-[0.2em] text-cream/35 uppercase md:left-10">
          <ArrowDown size={14} className="animate-bounce" />
          {t("nav.configurator")}
        </div>
        <div className="absolute top-1/4 left-1/2 hidden h-px w-[28rem] rotate-45 bg-[#c8934e]/20 md:block" />
      </section>

      <Marquee text={t("marquee.items")} />

      {/* Configurator */}
      <section id="configurator" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs tracking-[0.3em] text-[#c8934e] uppercase">
            {t("config.kicker")}
          </p>
          <h2 className="mb-3 max-w-2xl font-serif text-3xl text-cream italic md:text-5xl">
            {t("config.title")}
          </h2>
          <p className="mb-14 max-w-lg text-cream/50">{t("config.subtitle")}</p>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="flex flex-col gap-10">
              <div>
                <p className="mb-3 text-xs tracking-widest text-cream/45 uppercase">
                  {t("config.step1")}
                </p>
                <BusinessSelector value={biz} onChange={setBiz} />
              </div>
              <div>
                <p className="mb-3 text-xs tracking-widest text-cream/45 uppercase">
                  {t("config.step2")}
                </p>
                <TierSelector value={tier} onChange={setTier} accent={accent} />
              </div>
              <div>
                <p className="mb-3 text-xs tracking-widest text-cream/45 uppercase">
                  {t("config.step3")}
                </p>
                <LanguageSelector value={langs} onToggle={toggleLang} accent={accent} />
              </div>
              <PriceSummary biz={biz} tier={tier} langs={langs} />
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <LivePreview biz={biz} tier={tier} />
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="border-t border-cream/10 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs tracking-[0.3em] text-[#c8934e] uppercase">
            {t("why.kicker")}
          </p>
          <h2 className="mb-16 max-w-2xl font-serif text-3xl text-cream italic md:text-5xl">
            {t("why.title")}
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <BentoCard icon={Sparkles} title={t("why.1.title")} body={t("why.1.body")} index={0} />
            <BentoCard icon={Boxes} title={t("why.2.title")} body={t("why.2.body")} index={1} />
            <BentoCard icon={Globe2} title={t("why.3.title")} body={t("why.3.body")} index={2} />
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs tracking-[0.3em] text-[#c8934e] uppercase">
            {t("work.kicker")}
          </p>
          <h2 className="mb-4 max-w-2xl font-serif text-3xl text-cream italic md:text-5xl">
            {t("work.title")}
          </h2>
          <p className="mb-16 max-w-lg text-cream/50">{t("work.subtitle")}</p>

          <div className="flex flex-col gap-6">
            <WorkCard
              tag={t("work.fruity.tag")}
              title={t("work.fruity.title")}
              body={t("work.fruity.body")}
              cta={t("work.viewcase")}
              href="http://localhost:3000"
              note={t("work.localnote")}
              image="/images/fruity-cover.png"
              gradient=""
              index={0}
            />
            <WorkCard
              tag={t("work.nexus.tag")}
              title={t("work.nexus.title")}
              body={t("work.nexus.body")}
              cta={t("work.viewcase")}
              href="http://localhost:3001"
              note={t("work.localnote")}
              gradient="bg-gradient-to-br from-[#c8934e]/25 via-black to-black"
              index={1}
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-cream/10 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-xs tracking-[0.3em] text-[#c8934e] uppercase">
            {t("contact.kicker")}
          </p>
          <h2 className="mb-4 font-serif text-3xl text-cream italic md:text-5xl">
            {t("contact.title")}
          </h2>
          <p className="mb-12 max-w-md text-cream/50">{t("contact.subtitle")}</p>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs tracking-widest text-cream/40 uppercase">
                  {t("contact.location.label")}
                </p>
                <p className="mt-1 font-serif text-xl text-cream italic">
                  {t("contact.location.value")}
                </p>
              </div>
              <div>
                <p className="text-xs tracking-widest text-cream/40 uppercase">
                  {t("contact.hours.label")}
                </p>
                <p className="mt-1 text-cream/80">{t("contact.hours.value")}</p>
                <p className="mt-0.5 text-xs text-cream/40">{t("contact.hours.note")}</p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs tracking-widest text-cream/40 uppercase">
                {t("contact.team.label")}
              </p>
              <div className="flex flex-col gap-4">
                <a
                  href={WHATSAPP_LINK()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="flex items-center justify-between rounded-xl border border-[#25D366]/25 bg-[#25D366]/[0.06] px-4 py-3 transition-colors hover:border-[#25D366]/50"
                >
                  <span>
                    <span className="block text-sm text-cream">Mehmet Sametoglu</span>
                    <span className="block text-xs text-cream/45">+33 7 53 40 63 44</span>
                  </span>
                  <span className="text-xs tracking-widest text-[#25D366] uppercase">
                    {t("contact.whatsapp")}
                  </span>
                </a>
                <a
                  href="tel:+33749829678"
                  data-cursor="hover"
                  className="flex items-center justify-between rounded-xl border border-cream/10 px-4 py-3 transition-colors hover:border-[#c8934e]/40"
                >
                  <span>
                    <span className="block text-sm text-cream">Ismail Cakir</span>
                    <span className="block text-xs text-cream/45">+33 7 49 82 96 78</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
