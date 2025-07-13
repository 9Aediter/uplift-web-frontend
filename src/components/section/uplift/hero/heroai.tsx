import React from "react";
import { Particles } from "./particles";
import Globe from "@/components/section/uplift/globe";
import { ScrollIndicator } from "./scroll-indicator";
import { HeroAnimate, AnimatedContent } from "./hero-animate";
import { Badge, Heading, Subheading, ActionButtons } from "./content";

export const Hero = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section
      ref={ref}
      className="bg-gradient-to-t from-black via-black/70 to-black/10 relative z-10 px-6 py-24 md:py-12 w-full mx-auto h-screen flex items-center overflow-hidden"
    >
      <Particles />
      <HeroAnimate containerRef={ref as React.RefObject<HTMLDivElement>}>
        <div className="h-full w-full z-20">
          <div className="h-[100vh] max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
            <AnimatedContent
              className="w-full h-full lg:w-1/2"
              badge={<Badge />}
              heading={<Heading />}
              subheading={<Subheading />}
              buttons={<ActionButtons />}
            />
            <div className="hidden w-full lg:block lg:w-1/2">
              <Globe />
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </HeroAnimate>
    </section>
  );
});

Hero.displayName = 'Hero';
