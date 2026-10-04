import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/lib/theme";
import { SITE } from "@/lib/site";
import { PACKAGES, formatEur } from "@/lib/pricing";
import { JsonLd, ORGANIZATION_JSON_LD, WEBSITE_JSON_LD, pageMetadata } from "@/lib/seo";

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

const TITLE = "Maisé Studio | Agence web et sites sur mesure à Paris";
const DESCRIPTION = `Studio web à Paris : sites sur mesure pour restaurants, cafés, hôtels et boutiques, du design à la mise en ligne. Formules à partir de ${formatEur(PACKAGES.essentiel.eur)}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  ...pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/" }),
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
        <JsonLd data={[ORGANIZATION_JSON_LD, WEBSITE_JSON_LD]} />
        {/* Without JavaScript the scroll-reveal never fires: show everything. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          <LanguageProvider>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
        {/* Cookie-free visit counts, active once Web Analytics is enabled for the project in Vercel. */}
        <Analytics />
      </body>
    </html>
  );
}
