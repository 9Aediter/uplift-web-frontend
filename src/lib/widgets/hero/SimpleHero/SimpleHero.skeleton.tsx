import React from 'react'

export const SimpleHeroSkeleton: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 to-gray-700 relative z-10 px-6 py-24 md:py-32 w-full mx-auto h-screen flex items-center justify-center overflow-hidden animate-pulse">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content skeleton */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Title skeleton */}
        <div className="space-y-4">
          <div className="h-16 bg-gray-600/60 rounded-lg w-full max-w-2xl mx-auto" />
          <div className="h-12 bg-gray-600/60 rounded-lg w-3/4 mx-auto" />
        </div>
        
        {/* Subtitle skeleton */}
        <div className="h-8 bg-gray-600/50 rounded-lg w-3/4 mx-auto" />
        
        {/* Description skeleton */}
        <div className="space-y-3">
          <div className="h-6 bg-gray-600/40 rounded-lg w-5/6 mx-auto" />
          <div className="h-6 bg-gray-600/40 rounded-lg w-4/6 mx-auto" />
          <div className="h-6 bg-gray-600/40 rounded-lg w-3/6 mx-auto" />
        </div>
        
        {/* Button skeleton */}
        <div className="h-12 bg-gradient-to-r from-blue-600/60 to-purple-600/60 rounded-lg w-48 mx-auto mt-12" />
      </div>
    </section>
  )
}