import { Hero } from "@/components/hero";
import { BrandIntro } from "@/components/brand-intro";
import { AiVisibility } from "@/components/ai-visibility";
import { Services } from "@/components/services";
import { ScrollVideo } from "@/components/scroll-video";
import { WorkTeaser } from "@/components/work-teaser";
import { Configurator } from "@/components/configurator";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <BrandIntro />
      <AiVisibility />
      <Services />
      <ScrollVideo />
      <WorkTeaser />
      <Configurator />
    </div>
  );
}
