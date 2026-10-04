import type { Metadata } from "next";
import { ContactContent } from "@/components/contact-content";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact | Maisé Studio",
  description: "Écrivez-nous. On répond en moins de 3 heures, tous les jours.",
};

export default function ContactPage() {
  return <ContactContent />;
}
