"use client";

import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { MagneticButton } from "@/components/magnetic-button";
import { PreviewObject } from "@/components/configurator/preview-object";
import { bizByKey, tierByKey, type BizKey, type TierKey } from "@/lib/config-data";
import { useLang, type DictKey } from "@/lib/i18n";

const BIZ_COPY: Record<
  BizKey,
  { h1: DictKey; h2: DictKey; sub: DictKey; cta: DictKey; nav1: DictKey; nav2: DictKey }
> = {
  cafe: {
    h1: "biz.cafe.headline1",
    h2: "biz.cafe.headline2",
    sub: "biz.cafe.sub",
    cta: "biz.cafe.cta",
    nav1: "biz.cafe.nav1",
    nav2: "biz.cafe.nav2",
  },
  clinic: {
    h1: "biz.clinic.headline1",
    h2: "biz.clinic.headline2",
    sub: "biz.clinic.sub",
    cta: "biz.clinic.cta",
    nav1: "biz.clinic.nav1",
    nav2: "biz.clinic.nav2",
  },
  hotel: {
    h1: "biz.hotel.headline1",
    h2: "biz.hotel.headline2",
    sub: "biz.hotel.sub",
    cta: "biz.hotel.cta",
    nav1: "biz.hotel.nav1",
    nav2: "biz.hotel.nav2",
  },
};

const badgeKey: Record<TierKey, DictKey> = {
  basic: "preview.badge.basic",
  mid: "preview.badge.mid",
  premium: "preview.badge.premium",
};
const captionKey: Record<TierKey, DictKey> = {
  basic: "preview.caption.basic",
  mid: "preview.caption.mid",
  premium: "preview.caption.premium",
};

export function LivePreview({ biz, tier }: { biz: BizKey; tier: TierKey }) {
  const { t } = useLang();
  const b = bizByKey(biz);
  const copy = BIZ_COPY[biz];
  const animated = tier !== "basic";
  const has3d = tier === "premium";

  return (
    <div className="flex flex-col gap-3">
      <div
        className="overflow-hidden rounded-[1.75rem] border shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] transition-colors duration-500"
        style={{ borderColor: `${b.accent}40` }}
      >
        {/* fake browser chrome */}
        <div className="flex items-center gap-2 border-b border-cream/10 bg-black/40 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
          <span className="ml-3 truncate rounded-full bg-white/5 px-3 py-1 text-[10px] text-cream/40">
            {biz}.maisestudio.fr
          </span>
        </div>

        {/* preview content */}
        <div
          className="relative flex min-h-[420px] items-center overflow-hidden px-8 py-10 transition-colors duration-500 md:min-h-[480px] md:px-14"
          style={{
            background: animated
              ? `radial-gradient(120% 100% at 85% 15%, ${b.accentSoft} 0%, transparent 55%), #150e08`
              : "#171009",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${biz}-${tier}`}
              initial={animated ? { opacity: 0, y: 16 } : { opacity: 1 }}
              animate={{ opacity: 1, y: 0 }}
              exit={animated ? { opacity: 0, y: -10 } : { opacity: 0 }}
              transition={{ duration: animated ? 0.5 : 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`relative z-10 w-full ${has3d ? "md:max-w-[54%]" : ""}`}
            >
              <div className="mb-6 flex items-center gap-6 text-[10px] tracking-[0.2em] text-cream/35 uppercase">
                <span>{copy.nav1 && t(copy.nav1)}</span>
                <span>{copy.nav2 && t(copy.nav2)}</span>
              </div>

              <h3
                className="max-w-md font-serif text-3xl leading-[1.02] italic md:text-4xl"
                style={{ color: tier === "basic" ? "#e7dcc9" : "#f1e6d3" }}
              >
                {t(copy.h1)}
                <br />
                <span style={{ color: animated ? b.accent : "#e7dcc9" }}>{t(copy.h2)}</span>
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/55">
                {t(copy.sub)}
              </p>

              <div className="mt-7">
                {animated ? (
                  <MagneticButton
                    className="rounded-full px-6 py-3 text-xs font-medium tracking-widest text-[#170f0a] uppercase"
                    style={{ background: b.accent }}
                  >
                    {t(copy.cta)}
                  </MagneticButton>
                ) : (
                  <button
                    className="rounded px-5 py-2.5 text-xs font-medium tracking-widest uppercase"
                    style={{ background: b.accent, color: "#170f0a" }}
                  >
                    {t(copy.cta)}
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {has3d && (
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] md:block">
              <Canvas
                dpr={[1, 1.6]}
                camera={{ position: [0, 0, 3.6], fov: 40 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: "transparent" }}
              >
                <PreviewObject biz={biz} accent={b.accent} />
              </Canvas>
            </div>
          )}

          <span
            className="absolute top-5 right-5 rounded-full border px-3 py-1 text-[9px] tracking-[0.2em] uppercase"
            style={{ borderColor: `${b.accent}50`, color: b.accent }}
          >
            {t(badgeKey[tier])}
          </span>
        </div>
      </div>

      <p className="px-2 text-xs text-cream/40">{t(captionKey[tier])}</p>
    </div>
  );
}
