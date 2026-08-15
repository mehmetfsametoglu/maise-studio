"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

export function ContactForm() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const canSend = name.trim().length > 1 && email.trim().length > 3;

  const summary = [
    company && `Entreprise : ${company}`,
    phone && `Téléphone : ${phone}`,
    project && `Projet : ${project}`,
    budget && `Budget approx. : ${budget}`,
    message && `Message : ${message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const waMessage = `Bonjour Maisé Studio — ${name}\n${summary}`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const subject = `Nouveau projet — ${name}`;
        window.location.href = `mailto:studiomaise@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          `${name}\n${email}\n${summary}`
        )}`;
      }}
      className="glass-liquid flex flex-col gap-4 rounded-[1.75rem] p-8 md:p-10"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t("contactform.name")} value={name} onChange={setName} required />
        <Field label={t("contactform.company")} value={company} onChange={setCompany} />
        <Field label={t("contactform.email")} value={email} onChange={setEmail} type="email" required />
        <Field label={t("contactform.phone")} value={phone} onChange={setPhone} />
      </div>
      <Field label={t("contactform.project")} value={project} onChange={setProject} />
      <Field label={t("contactform.budget")} value={budget} onChange={setBudget} />
      <label className="flex flex-col gap-1.5">
        <span className="text-xs tracking-widest text-muted-foreground uppercase">
          {t("contactform.message")}
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="resize-none rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
        />
      </label>

      <button
        type="submit"
        disabled={!canSend}
        className="mt-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t("contactform.submit")}
      </button>

      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        {t("contactform.or")}
        <span className="h-px flex-1 bg-border" />
      </div>

      <a
        href={`https://wa.me/33753406344${canSend ? `?text=${encodeURIComponent(waMessage)}` : ""}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-border px-6 py-3.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-muted"
      >
        {t("contactform.whatsappAlt")}
      </a>
    </form>
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
