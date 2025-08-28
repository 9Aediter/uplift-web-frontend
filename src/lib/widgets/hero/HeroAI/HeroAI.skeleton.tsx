import React from 'react'

export const HeroAISkeleton: React.FC = () => {
  return (
    <section className="bg-gradient-to-t from-black via-black/70 to-black/10 relative z-10 px-6 py-24 md:py-12 w-full mx-auto h-screen flex items-center overflow-hidden animate-pulse">
      {/* Background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/50 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400/50 rounded-full animate-pulse delay-2000" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-pink-400/50 rounded-full animate-pulse delay-3000" />
      </div>

      <div className="h-full w-full z-20 max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Content skeleton */}
        <div className="w-full h-full lg:w-1/2 flex flex-col justify-center space-y-6">
          {/* Badge skeleton */}
          <div className="h-8 bg-blue-600/20 rounded-full w-48" />
          
          {/* Title skeletons */}
          <div className="space-y-4">
            <div className="h-12 bg-gray-600/60 rounded-lg w-full" />
            <div className="h-12 bg-gray-600/60 rounded-lg w-4/5" />
            <div className="h-12 bg-gradient-to-r from-cyan-600/60 to-blue-600/60 rounded-lg w-3/5" />
            <div className="h-12 bg-gradient-to-r from-blue-600/60 to-fuchsia-600/60 rounded-lg w-2/5" />
          </div>
          
          {/* Subtitle skeleton */}
          <div className="space-y-2">
            <div className="h-6 bg-gray-600/50 rounded-lg w-4/5" />
            <div className="h-6 bg-gray-600/50 rounded-lg w-3/5" />
          </div>
          
          {/* Button skeletons */}
          <div className="flex gap-4">
            <div className="h-12 bg-gradient-to-r from-cyan-600/60 to-blue-600/60 rounded-lg w-32" />
            <div className="h-12 bg-gray-600/40 border-2 border-gray-600/60 rounded-lg w-32" />
          </div>
        </div>
        
        {/* Globe skeleton */}
        <div className="hidden w-full lg:block lg:w-1/2">
          <div className="relative w-80 h-80">
            {/* Main globe circle */}
            <div className="w-full h-full bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full border border-cyan-500/30 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full border border-blue-400/40 flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-cyan-600/40 to-blue-600/40 rounded-full border border-cyan-400/50 flex items-center justify-center">
                  <div className="w-16 h-8 bg-gradient-to-r from-cyan-400/60 to-blue-600/60 rounded-lg" />
                </div>
              </div>
            </div>
            
            {/* Orbiting elements */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400/60 rounded-full" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400/60 rounded-full" />
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-400/60 rounded-full" />
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-pink-400/60 rounded-full" />
          </div>
        </div>
      </div>

      {/* Scroll indicator skeleton */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center">
          <div className="h-4 w-12 bg-gray-400/50 rounded mb-2" />
          <div className="w-px h-8 bg-gray-400/50" />
        </div>
      </div>
    </section>
  )
}