"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Calculator, Images, MessageCircle, PhoneCall, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { whatsappHref } from "@/lib/contact";
import { PACKAGES, formatEur } from "@/lib/pricing";

// Three small ways to reach the studio, none of which covers the content:
//  - a thin bar above the nav on the home page, gone as soon as you scroll
//  - a bottom bar on phones (hidden while the menu or the price bar is open)
//  - a callback sheet, opened only by the visitor, shown only when the server
//    can actually send the request (callbackEnabled, see app/layout.tsx)
const OPEN_EVENT = "maise:callback";
const BAR_H = "64px";
const ANNOUNCE_H = 36;

function AnnounceBar() {
  const { t, lang } = useLang();

  // The nav is fixed; it sits below this bar and slides up as the bar scrolls away.
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const apply = () => {
      raf = 0;
      root.style.setProperty("--announce-offset", `${Math.max(0, ANNOUNCE_H - window.scrollY)}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      root.style.removeProperty("--announce-offset");
    };
  }, []);

  const price = lang === "tr" ? `${PACKAGES.essentiel.tryPrice.toLocaleString("tr-TR")} ₺` : formatEur(PACKAGES.essentiel.eur);

  return (
    <>
      <style>{`:root{--announce-offset:${ANNOUNCE_H}px}`}</style>
      <div
        className="world-ink absolute inset-x-0 top-0 z-[55] flex items-center justify-center gap-4 border-b border-brass/40 bg-background px-4 text-foreground"
        style={{ height: ANNOUNCE_H }}
      >
        <p className="truncate text-xs">
          {t("announce.lead")} <strong className="font-semibold">{price}</strong>
          <span aria-hidden className="mx-2 text-brass">
            ·
          </span>
          {t("announce.reply")}
        </p>
        <Link
          href="/#configurateur"
          className="hidden h-7 shrink-0 items-center rounded-full bg-accent px-3 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent-hover sm:inline-flex"
        >
          {t("announce.cta")}
        </Link>
      </div>
    </>
  );
}

function MobileBar({ callback }: { callback: boolean }) {
  const { t } = useLang();
  const item =
    "flex min-h-11 flex-1 flex-col items-center justify-center gap-1 text-xs font-medium text-foreground/85 transition-colors active:text-accent";
  return (
    <nav
      aria-label={t("bar.label")}
      className="mbar fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/80 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch px-2" style={{ height: BAR_H }}>
        <Link href="/realisations" className={item}>
          <Images size={20} strokeWidth={1.75} aria-hidden />
          {t("bar.work")}
        </Link>
        <Link href="/#configurateur" className={item}>
          <Calculator size={20} strokeWidth={1.75} aria-hidden />
          {t("bar.price")}
        </Link>
        {callback && (
          <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={item}>
            <PhoneCall size={20} strokeWidth={1.75} aria-hidden />
            {t("bar.callback")}
          </button>
        )}
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={`${item} !text-accent`}
        >
          <MessageCircle size={20} strokeWidth={1.75} aria-hidden />
          WhatsApp
        </a>
      </div>
    </nav>
  );
}

const WHEN = [
  ["now", "cb.now"],
  ["morning", "cb.morning"],
  ["afternoon", "cb.afternoon"],
  ["evening", "cb.evening"],
] as const;
const CODES = ["+33", "+90", "+44", "+1", "+49", "+32", "+41"];

function CallbackSheet() {
  const { t, lang } = useLang();
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error" | "invalid">("idle");

  useEffect(() => {
    const open = () => {
      const d = dialog.current;
      if (d && !d.open) d.showModal();
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const close = () => dialog.current?.close();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload = {
      name: String(f.get("name") ?? ""),
      phone: String(f.get("phone") ?? ""),
      code: String(f.get("code") ?? ""),
      activity: String(f.get("activity") ?? ""),
      when: String(f.get("when") ?? ""),
      consent: f.get("consent") === "on",
      website: String(f.get("website") ?? ""),
      lang,
    };
    if (payload.name.trim().length < 2 || payload.phone.replace(/\D/g, "").length < 6 || !payload.consent) {
      setState("invalid");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setState(res.ok ? "done" : res.status === 400 ? "invalid" : "error");
    } catch {
      setState("error");
    }
  }

  const field =
    "h-[52px] w-full rounded-[12px] border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const label = "mb-1.5 block text-xs font-medium tracking-wide text-muted-foreground";

  return (
    <dialog
      ref={dialog}
      aria-labelledby="cb-title"
      onClose={() => {
        setState("idle");
        form.current?.reset();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="sheet mx-auto mt-auto mb-0 max-h-[calc(100dvh-24px)] w-full max-w-none overflow-y-auto rounded-t-[24px] border border-border bg-card p-0 text-foreground shadow-[var(--shadow-pop)] backdrop:bg-black/50 md:my-auto md:max-w-md md:rounded-[24px]"
    >
      <div className="px-6 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-start justify-between gap-4">
          <h2 id="cb-title" className="display text-2xl text-foreground">
            {t("cb.title")}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label={t("cb.close")}
            className="-mt-2 -mr-3 grid size-11 shrink-0 place-items-center rounded-full text-foreground/80 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
          >
            <X size={20} aria-hidden />
          </button>
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{t("cb.lead")}</p>
        <p className="mt-1 text-sm font-medium text-foreground">{t("contact.hours.value")}</p>

        {state === "done" ? (
          <div role="status" className="mt-6">
            <p className="text-[15px] leading-relaxed text-foreground">{t("cb.ok")}</p>
            <button
              type="button"
              onClick={close}
              className="mt-6 h-[52px] w-full rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              {t("cb.close")}
            </button>
          </div>
        ) : (
          <form ref={form} onSubmit={submit} noValidate className="mt-6 space-y-4">
            <div>
              <label htmlFor="cb-name" className={label}>
                {t("cb.name")} *
              </label>
              <input id="cb-name" name="name" required autoComplete="name" maxLength={80} className={field} />
            </div>
            <div>
              <label htmlFor="cb-phone" className={label}>
                {t("cb.phone")} *
              </label>
              <div className="flex gap-2">
                <select
                  name="code"
                  aria-label={t("cb.code")}
                  defaultValue={lang === "tr" ? "+90" : "+33"}
                  className={`${field} w-[104px]! shrink-0 px-3`}
                >
                  {CODES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  id="cb-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  required
                  autoComplete="tel-national"
                  maxLength={20}
                  className={field}
                />
              </div>
            </div>
            <div>
              <label htmlFor="cb-activity" className={label}>
                {t("cb.activity")}
              </label>
              <input id="cb-activity" name="activity" maxLength={120} className={field} />
            </div>
            <div>
              <label htmlFor="cb-when" className={label}>
                {t("cb.when")}
              </label>
              <select id="cb-when" name="when" defaultValue="now" className={field}>
                {WHEN.map(([v, k]) => (
                  <option key={v} value={v}>
                    {t(k)}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex min-h-11 items-start gap-3 text-sm leading-snug text-foreground/90">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 size-5 shrink-0 accent-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              />
              <span>
                {t("cb.consent")}{" "}
                <Link href="/confidentialite" className="text-accent underline underline-offset-2">
                  {t("footer.privacy")}
                </Link>
              </span>
            </label>
            {/* Honeypot: hidden from people, tempting for scripts. */}
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -left-[9999px] size-px opacity-0"
            />
            {(state === "invalid" || state === "error") && (
              <p role="alert" className="text-sm text-danger">
                {t(state === "invalid" ? "cb.invalid" : "cb.error")}
              </p>
            )}
            <button
              type="submit"
              disabled={state === "sending"}
              className="h-[52px] w-full rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {state === "sending" ? t("cb.sending") : t("cb.send")}
            </button>
            <button
              type="button"
              onClick={close}
              className="flex min-h-11 w-full items-center justify-center text-sm text-muted-foreground underline underline-offset-2 transition-colors hover:text-accent"
            >
              {t("cb.continue")}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}

export function ContactLayers({ callbackEnabled }: { callbackEnabled: boolean }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const showBar = pathname !== "/contact";

  return (
    <>
      {isHome && <AnnounceBar />}
      {showBar ? <MobileBar callback={callbackEnabled} /> : <style>{`@media(max-width:767px){:root{--bar-h:0px}}`}</style>}
      {callbackEnabled && <CallbackSheet />}
    </>
  );
}
