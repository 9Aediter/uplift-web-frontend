import React from "react";
import { Particles } from "./particles";
import Globe from "@/components/home/globe";
import { ScrollIndicator } from "./scroll-indicator";
import { HeroAnimate, AnimatedContent } from "./hero-animate";
import { Badge, Heading, Subheading, ActionButtons } from "./content";
import { MouseFollowEffect } from "./mouse-follow-effect";
import { FloatingElements } from "./floating-elements";
import { GlobeWithStats } from "./hover-stats";
import { StatsCards } from "@/components/home/stats-cards";

interface HeroProps {
  heroContent: any; // Define a more specific type if needed
}

export const Hero = React.forwardRef<HTMLDivElement, HeroProps>(({ heroContent }, ref) => {
  return (
    <section
      ref={ref}
      className="relative z-10 px-6 py-24 md:py-12 w-full mx-auto h-screen flex items-center overflow-hidden"
    >
      {/* Background Effects */}
      <Particles />
      {/* <FloatingElements /> */}
      {/* <MouseFollowEffect /> */}

      <HeroAnimate containerRef={ref as React.RefObject<HTMLDivElement>}>
        <div className="h-full w-full z-20">
          <div className="h-[85vh] max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
            <AnimatedContent
              className="w-full h-full lg:w-1/2"
              badge={<Badge text={heroContent.badge} />}
              heading={<Heading title={heroContent.title} titleGradient={heroContent.title_gradient} />}
              subheading={<Subheading text={heroContent.subtitle} />}
              buttons={<ActionButtons launchText={heroContent.launch_button} exploreText={heroContent.explore_button} />}
            />
            <div className="hidden w-full lg:block lg:w-1/2">
              <GlobeWithStats>
                <Globe />
              </GlobeWithStats>
            </div>
          </div>
          <StatsCards />
        </div>
        <ScrollIndicator className="block md:hidden" />
      </HeroAnimate>
    </section>
  );
});

Hero.displayName = 'Hero';
