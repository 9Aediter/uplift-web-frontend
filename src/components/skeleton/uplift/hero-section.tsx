import React from "react";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export const HeroSectionSkeleton = () => {
  return (
    <Section className="bg-black relative z-10 px-6 py-24 md:py-12 w-full mx-auto h-screen flex items-center overflow-hidden">
      {/* Particles - represented by a full-screen skeleton */}
      <Skeleton className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 flex flex-col">
        <div className="h-full w-full z-20">
          <div className="h-[100vh] max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Content - left side */}
            <div className="w-full h-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              <Skeleton className="h-12 w-3/4 mb-4" /> {/* Title */}
              <Skeleton className="h-8 w-1/2 mb-6" /> {/* Subtitle */}
              <div className="flex space-x-4">
                <Skeleton className="h-10 w-32 rounded-md" /> {/* Button 1 */}
                <Skeleton className="h-10 w-32 rounded-md" /> {/* Button 2 */}
              </div>
            </div>
            {/* Globe - right side */}
            <div className="hidden w-full lg:block lg:w-1/2 items-center justify-center">
              <Skeleton className="w-64 h-64 rounded-full" /> {/* Globe */}
            </div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </Section>
  );
};
