"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useLang, type DictKey } from "@/lib/i18n";

const SERVICES: { key: string; labelKey: DictKey }[] = [
  { key: "cut", labelKey: "booking.svc1" },
  { key: "facial", labelKey: "booking.svc2" },
  { key: "consult", labelKey: "booking.svc3" },
];

const DAYS = [12, 13, 14, 15, 16, 17];
const TIMES = ["10:00", "11:30", "14:00", "15:30", "16:30", "18:00"];

export function BookingDemo() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [service, setService] = useState("facial");
  const [day, setDay] = useState(14);
  const [time, setTime] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const canContinue = !!time;
  const canConfirm = name.trim().length > 1 && email.trim().length > 3;

  return (
    <section className="world-navy relative bg-background px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-5xl">
        <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} mb-14 max-w-xl`}>
          <p className="mb-4 text-[11px] tracking-[0.42em] text-accent uppercase">
            {t("booking.kicker")}
          </p>
          <h2 className="display text-[clamp(1.9rem,4.4vw,3.2rem)] text-foreground">
            {t("booking.title")}
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">{t("booking.body")}</p>
        </div>

        <div className="glass-liquid mx-auto max-w-lg overflow-hidden rounded-[1.75rem] p-8 md:p-10">
          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Check size={26} />
                </span>
                <h3 className="display mt-6 text-2xl text-foreground">
                  {t("booking.confirmedTitle")}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("booking.confirmedBody")}
                </p>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
                  {t("booking.step1")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setService(s.key)}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        service === s.key
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border text-foreground/80 hover:border-accent/50"
                      }`}
                    >
                      {t(s.labelKey)}
                    </button>
                  ))}
                </div>

                <p className="mt-8 mb-3 text-xs tracking-widest text-muted-foreground uppercase">
                  {t("booking.step2")}
                </p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {DAYS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDay(d)}
                      className={`flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-xl border text-sm transition-colors ${
                        day === d
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border text-foreground/80 hover:border-accent/50"
                      }`}
                    >
                      <span className="text-[10px] uppercase opacity-70">{t("booking.month")}</span>
                      <span className="font-display">{d}</span>
                    </button>
                  ))}
                </div>

                <p className="mt-8 mb-3 text-xs tracking-widest text-muted-foreground uppercase">
                  {t("booking.step3")}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {TIMES.map((tm) => (
                    <button
                      key={tm}
                      onClick={() => setTime(tm)}
                      className={`rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                        time === tm
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border text-foreground/80 hover:border-accent/50"
                      }`}
                    >
                      {tm}
                    </button>
                  ))}
                </div>

                <button
                  disabled={!canContinue}
                  onClick={() => setStep(2)}
                  className="mt-9 w-full rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("booking.continue")}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => setStep(1)}
                  className="mb-6 text-xs text-muted-foreground underline underline-offset-4"
                >
                  {t("booking.back")}
                </button>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs tracking-widest text-muted-foreground uppercase">
                      {t("booking.name")}
                    </span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
                      placeholder="Camille Dubois"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs tracking-widest text-muted-foreground uppercase">
                      {t("booking.email")}
                    </span>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
                      placeholder="camille@email.com"
                    />
                  </label>
                </div>

                <button
                  disabled={!canConfirm}
                  onClick={() => setConfirmed(true)}
                  className="mt-9 w-full rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("booking.confirm")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
