"use client";
import React from "react";
import { Section } from "@/components/ui/section";
import { Particles } from "./particles";
import Globe from "@/components/section/uplift/globe";
import { Content } from "./content";
import { ScrollIndicator } from "./scroll-indicator";

const Hero = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Section
      ref={ref}
      fullWidth
      className="mx-auto h-screen flex items-center overflow-hidden"
    >
      <Particles />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10 z-10"></div>
      <div className="container max-w-7xl mx-auto px-4 relative z-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <Content className="w-full h-full lg:w-1/2" />
          <div className="hidden w-full lg:block lg:w-1/2" >
            <Globe />
          </div>
        </div>
      </div>
      <ScrollIndicator />
    </Section>
  );
});

Hero.displayName = 'Hero';

export default Hero;