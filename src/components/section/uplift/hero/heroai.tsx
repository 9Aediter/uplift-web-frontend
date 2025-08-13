import React from "react";
import { Particles } from "./particles";
import Globe from "@/components/section/uplift/globe";
import { ScrollIndicator } from "./scroll-indicator";
import { HeroAnimate, AnimatedContent } from "./hero-animate";
import { Badge, Heading, Subheading, ActionButtons } from "./content";
import { MouseFollowEffect } from "./mouse-follow-effect";
import { FloatingElements } from "./floating-elements";
import { GlobeWithStats } from "./hover-stats";

interface HeroProps {
  heroContent: any; // Define a more specific type if needed
}

export const Hero = React.forwardRef<HTMLDivElement, HeroProps>(({ heroContent }, ref) => {
  return (
    <section
      ref={ref}
      className="bg-gradient-to-t from-black via-black/70 to-black/10 relative z-10 px-6 py-24 md:py-12 w-full mx-auto h-screen flex items-center overflow-hidden"
    >
      {/* Background Effects */}
      <Particles />
      <FloatingElements />
      <MouseFollowEffect />
      
      <HeroAnimate containerRef={ref as React.RefObject<HTMLDivElement>}>
        <div className="h-full w-full z-20">
          <div className="h-[100vh] max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
            <AnimatedContent
              className="w-full h-full lg:w-1/2"
              badge={<Badge text={heroContent.badge} />}
              heading={<Heading part1={heroContent.title_part1} part2={heroContent.title_part2} gradient1={heroContent.title_gradient1} gradient2={heroContent.title_gradient2} />}
              subheading={<Subheading text={heroContent.subtitle} />}
              buttons={<ActionButtons launchText={heroContent.launch_button} exploreText={heroContent.explore_button} />}
            />
            <div className="hidden w-full lg:block lg:w-1/2">
              <GlobeWithStats>
                <Globe />
              </GlobeWithStats>
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </HeroAnimate>
    </section>
  );
});

Hero.displayName = 'Hero';
