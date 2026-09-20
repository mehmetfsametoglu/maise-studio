import { Hero } from "@/components/hero";
import { RealWork } from "@/components/real-work";
import { BrandIntro } from "@/components/brand-intro";
import { Services } from "@/components/services";
import { ScrollVideo } from "@/components/scroll-video";
import { AiVisibility } from "@/components/ai-visibility";
import { Configurator } from "@/components/configurator";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <RealWork />
      <BrandIntro />
      <Services />
      <ScrollVideo />
      <AiVisibility />
      <Configurator />
    </div>
  );
}
