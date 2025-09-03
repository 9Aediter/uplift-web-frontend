import React from 'react'
import '@/style/single-card-skeleton.css'

/**
 * SingleCard Pure SSR Skeleton Component
 * - NO "use client" directive
 * - NO React hooks
 * - NO browser APIs
 * - NO complex animations (only CSS animations)
 * - Safe for SSR Suspense fallback
 */
export function SingleCardSkeleton() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center py-16 md:py-24">
      {/* Static background - SSR safe */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Static tech lines - no JS animations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent rotate-45"></div>
          <div className="absolute top-3/4 right-1/4 w-40 sm:w-64 md:w-80 h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent -rotate-45"></div>
          <div className="absolute top-1/2 left-1/2 w-32 sm:w-48 md:w-64 h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent rotate-90"></div>
        </div>

        {/* Static geometric shapes */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border border-gray-600 rounded-full"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-12 sm:w-18 md:w-24 h-12 sm:h-18 md:h-24 border border-gray-600 rounded-lg rotate-45"></div>
          <div className="absolute top-1/2 right-10 sm:right-20 md:right-40 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-gradient-to-br from-gray-600/20 to-gray-600/20 rounded-full"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main skeleton card - same structure as real component */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl mx-auto max-w-7xl">
          <div className="text-center space-y-6 sm:space-y-8">
            
            {/* Title skeleton - matches real component structure */}
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                {/* Main title skeleton */}
                <div className="h-8 sm:h-12 md:h-16 lg:h-20 bg-gray-300 rounded-lg mx-auto max-w-4xl animate-pulse"></div>
                {/* Subtitle with gradient colors (similar to real component) */}
                <div className="h-6 sm:h-8 md:h-12 bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 rounded-lg mx-auto max-w-3xl animate-pulse"></div>
              </div>
              
              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-4 sm:h-5 md:h-6 bg-gray-200 rounded mx-auto max-w-4xl animate-pulse"></div>
                <div className="h-4 sm:h-5 md:h-6 bg-gray-200 rounded mx-auto max-w-3xl animate-pulse"></div>
                <div className="h-4 sm:h-5 md:h-6 bg-gray-200 rounded mx-auto max-w-2xl animate-pulse"></div>
              </div>
            </div>

            {/* Buttons skeleton - same layout as real component */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
              {/* Primary button skeleton */}
              <div className="w-full sm:w-auto h-12 sm:h-16 bg-gray-800 rounded-full min-w-[220px] flex items-center justify-center space-x-3 animate-pulse">
                <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
                <div className="w-32 h-4 bg-gray-600 rounded"></div>
                <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
              </div>
              
              {/* Secondary button skeleton */}
              <div className="w-full sm:w-auto h-12 sm:h-16 bg-gray-100 border-2 border-gray-300 rounded-full min-w-[220px] flex items-center justify-center animate-pulse">
                <div className="w-36 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>

            {/* Trust indicators skeleton */}
            <div className="pt-6 sm:pt-8 border-t border-gray-200">
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-3 sm:mb-4 animate-pulse"></div>
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 sm:h-8 bg-gray-300 rounded w-16 sm:w-20 animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-2 text-gray-500 text-sm">
          <div className="w-4 h-4 bg-gray-500 rounded-full animate-pulse"></div>
          <span>Loading SingleCard...</span>
        </div>
      </div>

    </section>
  )
}