import React from "react";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductSectionSkeleton = () => {
  return (
    <Section className="w-full h-[70vh] sm:h-[100vh] bg-gradient-to-b from-black to-gray-900/30 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="pl-4 mb-8">
          <Skeleton className="h-10 w-1/2 mb-4" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        <div className="flex overflow-x-hidden gap-4 pl-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900">
              <Skeleton className="absolute inset-0 w-full h-full" />
              <div className="relative z-40 p-8 text-left w-full">
                <Skeleton className="h-6 w-2/3 mb-4" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
