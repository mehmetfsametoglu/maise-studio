import type { Metadata } from "next";
import { ContactContent } from "@/components/contact-content";

export const metadata: Metadata = {
  title: "Contact — Maisé Studio",
  description: "Parlons de votre projet. Paris, réponse sous 3h.",
};

export default function ContactPage() {
  return <ContactContent />;
}
