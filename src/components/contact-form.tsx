"use client";

import { useState } from "react";
import { useLang, type DictKey } from "@/lib/i18n";

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

export function ContactForm() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const canSend = name.trim().length > 1 && email.trim().length > 3;

  const summary = [
    company && `${t("contactform.company")}: ${company}`,
    phone && `${t("contactform.phone")}: ${phone}`,
    project && `${t("contactform.project")}: ${t(PROJECT_OPTIONS.find((o) => o.key === project)!.labelKey)}`,
    budget && `${t("contactform.budget")}: ${t(BUDGET_OPTIONS.find((o) => o.key === budget)!.labelKey)}`,
    message && `${t("contactform.message")}: ${message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const waMessage = `${t("wa.greeting")} — ${name}\n${email}\n${summary}`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSend) return;
        window.open(`https://wa.me/33753406344?text=${encodeURIComponent(waMessage)}`, "_blank", "noopener,noreferrer");
      }}
      className="glass-liquid flex flex-col gap-4 rounded-[1.75rem] p-8 md:p-10"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t("contactform.name")} value={name} onChange={setName} required />
        <Field label={t("contactform.company")} value={company} onChange={setCompany} />
        <Field label={t("contactform.email")} value={email} onChange={setEmail} type="email" required />
        <Field label={t("contactform.phone")} value={phone} onChange={setPhone} />
      </div>

      <ChipSelect
        label={t("contactform.project")}
        options={PROJECT_OPTIONS}
        value={project}
        onChange={setProject}
      />
      <ChipSelect
        label={t("contactform.budget")}
        options={BUDGET_OPTIONS}
        value={budget}
        onChange={setBudget}
      />

      <label className="flex flex-col gap-1.5">
        <span className="text-xs tracking-widest text-muted-foreground uppercase">
          {t("contactform.message")}
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="resize-none rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
        />
      </label>

      <button
        type="submit"
        disabled={!canSend}
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t("contactform.submit")}
      </button>
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
  return (
    <div>
      <p className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.key;
          return (
            <button
              key={o.key}
              type="button"
              onClick={() => onChange(o.key)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ${
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs tracking-widest text-muted-foreground uppercase">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        className="rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
      />
    </label>
  );
}
