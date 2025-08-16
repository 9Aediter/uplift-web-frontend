import React from "react";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export const ProblemSectionSkeleton = () => {
  return (
    <Section id="problem" className="bg-black flex flex-col justify-center py-30">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 md:h-16 w-3/4 max-w-md mx-auto mb-6" /> {/* Title */}
          <Skeleton className="h-6 w-2/3 max-w-2xl mx-auto" /> {/* Subtitle */}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="relative h-80 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 overflow-hidden">
              {/* Background Gradient Line */}
              <Skeleton className="absolute top-0 left-0 w-full h-1 rounded-none" />
              
              {/* Icon */}
              <div className="mb-6 relative">
                <Skeleton className="w-16 h-16 rounded-xl" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* Title */}
                <Skeleton className="h-6 w-3/4" />
                
                {/* Description */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>

              {/* Impact Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-full px-4 py-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
