import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/lib/theme";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maisé Studio — Digital craftsmanship for ambitious brands",
  description:
    "Maisé Studio designs and builds premium, bespoke websites — from café menus to luxury hospitality. Paris.",
};

// Read by search engines and, increasingly, by AI assistants (ChatGPT,
// Gemini, Claude) that cite or recommend businesses from structured data
// rather than page copy alone — see also /llms.txt for the same context in
// the plain-text format those assistants' crawlers look for.
const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Maisé Studio",
  description:
    "Paris-based web design and development studio building bespoke websites for restaurants, hotels, clinics and boutiques.",
  url: "https://maisestudio.fr",
  email: "studiomaise@gmail.com",
  areaServed: ["FR", "TR"],
  address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
  openingHours: "Mo-Su 09:00-19:00",
  sameAs: [],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScrollProvider>
              <Nav />
              <main className="flex-1">{children}</main>
              <Footer />
            </SmoothScrollProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
