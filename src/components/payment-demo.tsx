"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useLang } from "@/lib/i18n";

export function PaymentDemo() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [stage, setStage] = useState<"summary" | "pay" | "done">("summary");
  const [card, setCard] = useState("");

  return (
    <section className="world-burgundy relative bg-background px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""}`}>
          <p className="mb-4 text-[11px] tracking-[0.42em] text-accent uppercase">
            {t("payment.kicker")}
          </p>
          <h2 className="display text-[clamp(1.9rem,4.4vw,3.2rem)] text-foreground">
            {t("payment.title")}
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">{t("payment.body")}</p>
        </div>

        <div className="glass-liquid overflow-hidden rounded-[1.75rem] p-8 md:p-10">
          <AnimatePresence mode="wait">
            {stage === "summary" && (
              <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-xs tracking-widest text-muted-foreground uppercase">
                  {t("payment.summaryLabel")}
                </p>
                <h3 className="display mt-2 text-2xl text-foreground">{t("payment.service")}</h3>
                <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t("payment.total")}</span>
                    <span className="text-foreground">€120</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t("payment.depositToday")}</span>
                    <span className="font-display text-lg text-accent">€30</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t("payment.remaining")}</span>
                    <span className="text-foreground">€90</span>
                  </div>
                </div>
                <button
                  onClick={() => setStage("pay")}
                  className="mt-9 w-full rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground"
                >
                  {t("payment.continue")}
                </button>
                <p className="mt-4 text-center text-[11px] text-muted-foreground">
                  {t("payment.demoNote")}
                </p>
              </motion.div>
            )}

            {stage === "pay" && (
              <motion.div
                key="pay"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => setStage("summary")}
                  className="mb-6 text-xs text-muted-foreground underline underline-offset-4"
                >
                  {t("booking.back")}
                </button>

                <button className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90">
                  <span>{t("payment.applePay")}</span>
                </button>
                <div className="mb-4 flex items-center gap-3 text-[11px] text-muted-foreground uppercase">
                  <span className="h-px flex-1 bg-border" />
                  {t("payment.or")}
                  <span className="h-px flex-1 bg-border" />
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs tracking-widest text-muted-foreground uppercase">
                    {t("payment.cardNumber")}
                  </span>
                  <div className="flex items-center gap-2 rounded-xl border border-border px-4 py-3">
                    <CreditCard size={16} className="text-muted-foreground" />
                    <input
                      value={card}
                      onChange={(e) => setCard(e.target.value)}
                      className="w-full bg-transparent text-sm text-foreground outline-none"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                </label>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <input
                    className="rounded-xl border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
                    placeholder="MM / AA"
                  />
                  <input
                    className="rounded-xl border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
                    placeholder="CVC"
                  />
                </div>

                <button
                  onClick={() => setStage("done")}
                  className="mt-8 w-full rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground"
                >
                  {t("payment.pay")}
                </button>
              </motion.div>
            )}

            {stage === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Check size={26} />
                </span>
                <h3 className="display mt-6 text-2xl text-foreground">{t("payment.doneTitle")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t("payment.doneBody")}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
