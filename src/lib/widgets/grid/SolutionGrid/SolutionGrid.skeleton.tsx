import React from 'react'
import { Section } from '@/components/ui/section'

export const SolutionGridSkeleton: React.FC = () => {
  return (
    <Section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 max-w-md"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto max-w-2xl"></div>
        </div>

        {/* Bento Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-6 animate-pulse">
          {/* Different sized skeleton cards for bento layout */}
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg md:col-span-1"></div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg md:col-span-1"></div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg md:col-span-1"></div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg md:col-span-2"></div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg md:col-span-1"></div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg md:col-span-1"></div>
        </div>
      </div>
    </Section>
  )
}