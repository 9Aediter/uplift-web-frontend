import React from "react";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export const ProblemSectionSkeleton = () => {
  return (
    <Section id="problem" className="bg-black flex flex-col justify-center h-full md:h-[100vh]">
      <div className="w-full max-w-7xl px-8 mx-auto">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-3/4 mx-auto mb-4" /> {/* Title */}
          <Skeleton className="h-6 w-1/2 mx-auto" /> {/* Description */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="p-8 rounded-xl border-3 border-gray-800 bg-gray-900/50 group transition-all duration-300">
              <div className="mb-4 relative">
                <Skeleton className="absolute -left-2 -top-2 w-14 h-14 rounded-lg" /> {/* Icon background */}
                <div className="ml-16 pl-2">
                  <Skeleton className="h-6 w-3/4 mb-2" /> {/* Title */}
                  <Skeleton className="h-4 w-full" /> {/* Description line 1 */}
                  <Skeleton className="h-4 w-5/6 mt-1" /> {/* Description line 2 */}
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <Skeleton className="h-4 w-24 mr-2" /> {/* Industry Impact label */}
                <Skeleton className="w-full h-1 rounded-full" /> {/* Progress bar */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
