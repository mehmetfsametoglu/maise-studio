import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import { ToastProvider } from "@/lib/toast-context";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  display: "swap",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maisé Studio — Sites web sur mesure, Paris",
  description:
    "Configurez votre futur site en direct : métier, niveau, langues — design et prix s'adaptent instantanément. Maisé Studio, Paris.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body
        className={`${manrope.variable} ${playfair.variable} ${manrope.className} antialiased`}
      >
        <LanguageProvider>
          <ToastProvider>
            <SmoothScrollProvider>
              <CustomCursor />
              <Navbar />
              <WhatsAppButton />
              <main className="relative z-10">{children}</main>
              <Footer />
            </SmoothScrollProvider>
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
