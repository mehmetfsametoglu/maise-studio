import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactContent } from "@/components/contact-content";

export const metadata: Metadata = pageMetadata({
  title: "Contact | Maisé Studio Paris",
  description:
    "Parlez-nous de votre projet de site web. Réponse en moins de 3 heures, tous les jours, par WhatsApp, e-mail ou formulaire.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
