import React from 'react'

export const ProblemsCardsSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-yellow-50/50 dark:from-black dark:via-black dark:to-black">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header Skeleton */}
        <div className="text-center mb-12 md:mb-16">
          <div className="h-10 md:h-12 lg:h-14 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-4 mx-auto max-w-md animate-pulse" />
          <div className="h-6 md:h-7 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg mx-auto max-w-2xl animate-pulse" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="relative">
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-2xl p-6 h-64 animate-pulse">
                {/* Icon and Impact Skeleton */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 rounded-xl animate-pulse" />
                  <div className="w-20 h-6 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 rounded-full animate-pulse" />
                </div>

                {/* Content Skeleton */}
                <div className="space-y-3">
                  <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse" />
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded w-4/5 animate-pulse" />
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded w-3/5 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}