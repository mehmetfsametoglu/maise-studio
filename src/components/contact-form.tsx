"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { useLang, type DictKey } from "@/lib/i18n";
import { CONTACT_REDIRECT } from "@/lib/contact";
import { SITE } from "@/lib/site";
import type { Prefill } from "@/lib/prefill";

const PROJECT_OPTIONS: { key: string; labelKey: DictKey }[] = [
  { key: "restaurant", labelKey: "contactform.opt.restaurant" },
  { key: "cafe", labelKey: "contactform.opt.cafe" },
  { key: "hotel", labelKey: "contactform.opt.hotel" },
  { key: "clinic", labelKey: "contactform.opt.clinic" },
  { key: "retail", labelKey: "contactform.opt.retail" },
  { key: "other", labelKey: "contactform.opt.other" },
];

const BUDGET_OPTIONS: { key: string; labelKey: DictKey }[] = [
  { key: "essentiel", labelKey: "tier.essentiel.name" },
  { key: "signature", labelKey: "tier.signature.name" },
  { key: "custom", labelKey: "contactform.opt.custom" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// The form builds a WhatsApp message in the visitor's hands. Nothing is stored:
// the server route only redirects. Validation runs before anything opens, and
// after sending the page says what happened and offers e-mail as a fallback.
export function ContactForm({ prefill }: { prefill?: Prefill | null }) {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState<string | null>(prefill?.biz ?? null);
  const [budget, setBudget] = useState<string | null>(prefill?.tier ?? null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const [sent, setSent] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const selection = prefill
    ? [
        prefill.biz && t(`biz.${prefill.biz}.name` as DictKey),
        prefill.tier && t(`tier.${prefill.tier}.name` as DictKey),
        prefill.langs.length > 0 && prefill.langs.map((l) => l.toUpperCase()).join(" + "),
        prefill.price &&
          (prefill.price.currency === "TRY"
            ? `${prefill.price.amount.toLocaleString("tr-TR")} TL`
            : `${prefill.price.amount.toLocaleString("fr-FR")} EUR`),
      ]
        .filter(Boolean)
        .join(" / ")
    : "";

  const summary = [
    selection && `${t("contactform.selection")}: ${selection}`,
    company && `${t("contactform.company")}: ${company}`,
    phone && `${t("contactform.phone")}: ${phone}`,
    project && `${t("contactform.project")}: ${t(PROJECT_OPTIONS.find((o) => o.key === project)!.labelKey)}`,
    budget && `${t("contactform.budget")}: ${t(BUDGET_OPTIONS.find((o) => o.key === budget)!.labelKey)}`,
    message && `${t("contactform.message")}: ${message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const waMessage = `${t("wa.greeting")}, ${name.trim()}\n${email.trim()}\n${summary}`;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const next = { name: name.trim().length < 2, email: !EMAIL_RE.test(email.trim()) };
    setErrors(next);
    if (next.name || next.email) {
      e.preventDefault();
      (next.name ? nameRef : emailRef).current?.focus();
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div
        role="status"
        className="glass-liquid flex flex-col gap-4 rounded-[1.75rem] p-8 md:p-10"
      >
        <h2 className="display text-2xl text-foreground">{t("contactform.sent.title")}</h2>
        <p className="text-muted-foreground">{t("contactform.sent.body")}</p>
        <p className="text-sm text-muted-foreground">
          {t("contactform.sent.fallback")}{" "}
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent(t("wa.greeting"))}&body=${encodeURIComponent(summary)}`}
            className="text-accent underline-offset-4 hover:underline"
          >
            {SITE.email}
          </a>
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-2 self-start rounded-full border border-border px-5 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          {t("contactform.sent.again")}
        </button>
      </div>
    );
  }

  return (
    <form
      id="formulaire"
      method="post"
      action={CONTACT_REDIRECT}
      target="_blank"
      rel="noopener noreferrer"
      noValidate
      onSubmit={onSubmit}
      className="glass-liquid flex scroll-mt-28 flex-col gap-4 rounded-[1.75rem] p-8 md:p-10"
    >
      {selection && (
        <div className="rounded-xl border border-accent/40 bg-accent/5 px-4 py-3">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">{t("contactform.selection")}</p>
          <p className="mt-1 text-sm font-medium text-foreground">{selection}</p>
          <p className="mt-1 text-xs text-muted-foreground">{t("contactform.selection.note")}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label={t("contactform.name")}
          value={name}
          onChange={setName}
          required
          autoComplete="name"
          inputRef={nameRef}
          error={errors.name ? t("contactform.err.name") : undefined}
        />
        <Field
          label={t("contactform.company")}
          value={company}
          onChange={setCompany}
          autoComplete="organization"
        />
        <Field
          label={t("contactform.email")}
          value={email}
          onChange={setEmail}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          inputRef={emailRef}
          error={errors.email ? t("contactform.err.email") : undefined}
        />
        <Field
          label={`${t("contactform.phone")} (${t("contactform.optional")})`}
          value={phone}
          onChange={setPhone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
        />
      </div>

      <ChipSelect label={t("contactform.project")} options={PROJECT_OPTIONS} value={project} onChange={setProject} />
      <ChipSelect label={t("contactform.budget")} options={BUDGET_OPTIONS} value={budget} onChange={setBudget} />

      <label className="flex flex-col gap-1.5">
        <span className="text-xs tracking-widest text-muted-foreground uppercase">{t("contactform.message")}</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          maxLength={1000}
          className="resize-none rounded-xl border border-border bg-transparent px-4 py-3 text-base text-foreground outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
        />
      </label>

      <input type="hidden" name="text" value={waMessage} />

      <button
        type="submit"
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#0b7a4b] px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        {t("contactform.submit")}
      </button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {t("contactform.note")} {t("contactform.privacy")}{" "}
        <Link href="/confidentialite" className="underline-offset-4 hover:text-accent hover:underline">
          {t("footer.privacy")}
        </Link>
      </p>
    </form>
  );
}

function ChipSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { key: string; labelKey: DictKey }[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  const { t } = useLang();
  const id = useId();
  return (
    <div role="radiogroup" aria-labelledby={id}>
      <p id={id} className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.key;
          return (
            <button
              key={o.key}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.key)}
              className={`min-h-11 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none ${
                active
                  ? "border-accent/50 bg-accent/15 text-accent"
                  : "border-border text-foreground/80 hover:border-accent/40"
              }`}
            >
              {t(o.labelKey)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  inputMode,
  autoComplete,
  inputRef,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  inputMode?: "email" | "tel" | "text";
  autoComplete?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: string;
}) {
  const errId = useId();
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs tracking-widest text-muted-foreground uppercase">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className={`rounded-xl border bg-transparent px-4 py-3 text-base text-foreground outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/40 ${
          error ? "border-[#e5484d]" : "border-border"
        }`}
      />
      {error && (
        <span id={errId} role="alert" className="text-xs text-[#e5484d]">
          {error}
        </span>
      )}
    </label>
  );
}
