import type { Metadata } from "next";
import { ExamplesIntro } from "@/components/examples-intro";
import { ResponsiveShowcase } from "@/components/responsive-showcase";
import { BookingDemo } from "@/components/booking-demo";
import { PaymentDemo } from "@/components/payment-demo";
import { MenuDemo } from "@/components/menu-demo";
import { SectionTransition } from "@/components/section-transition";
import { MapsDemo } from "@/components/maps-demo";
import { PhotoAlbum } from "@/components/photo-album";
import { ExamplesCta } from "@/components/examples-cta";

export const metadata: Metadata = {
  alternates: { canonical: "/examples" },
  title: "Exemples | Maisé Studio",
  description: "Des démonstrations de ce qu'on peut ajouter à votre site : réservation, paiement, menu, carte.",
};

export default function ExamplesPage() {
  return (
    <div>
      <ExamplesIntro />
      <ResponsiveShowcase />
      <BookingDemo />
      <PaymentDemo />
      <MenuDemo />
      <SectionTransition textKey="transition.menuToMap" />
      <MapsDemo />
      <PhotoAlbum />
      <ExamplesCta />
    </div>
  );
}
