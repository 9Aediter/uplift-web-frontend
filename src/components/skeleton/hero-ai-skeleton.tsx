export const HeroAISkeleton = () => (
  <section className="relative z-10 px-6 py-24 md:py-12 w-full mx-auto h-screen flex items-center overflow-hidden">
    {/* Background placeholder */}
    <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background animate-pulse" />
    
    <div className="h-full w-full z-20">
      <div className="h-[85vh] max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Content Skeleton - Left Side */}
        <div className="w-full h-full lg:w-1/2 flex flex-col justify-center space-y-6">
          {/* Badge Skeleton */}
          <div className="inline-flex">
            <div className="h-8 w-48 bg-muted animate-pulse rounded-full" />
          </div>
          
          {/* Title Skeleton */}
          <div className="space-y-3">
            <div className="h-12 md:h-16 w-full bg-muted animate-pulse rounded-lg" />
            <div className="h-12 md:h-16 w-4/5 bg-muted animate-pulse rounded-lg" />
          </div>
          
          {/* Subtitle Skeleton */}
          <div className="space-y-2">
            <div className="h-6 w-full bg-muted animate-pulse rounded" />
            <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-6 w-5/6 bg-muted animate-pulse rounded" />
          </div>
          
          {/* Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="h-14 w-48 bg-cyan-500/30 animate-pulse rounded-full" />
            <div className="h-14 w-40 bg-muted animate-pulse rounded-full" />
          </div>
        </div>

        {/* Globe Skeleton - Right Side */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative">
            {/* Main globe circle */}
            <div className="w-80 h-80 md:w-96 md:h-96 bg-muted animate-pulse rounded-full relative">
              {/* Inner circles for depth */}
              <div className="absolute inset-8 bg-muted/70 animate-pulse rounded-full" />
              <div className="absolute inset-16 bg-muted/50 animate-pulse rounded-full" />
              
              {/* Orbit lines */}
              <div className="absolute inset-0 border-2 border-muted/40 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-4 border border-muted/30 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
            </div>
            
            {/* Floating points around globe */}
            <div className="absolute -top-4 left-1/4 w-3 h-3 bg-cyan-400/60 animate-pulse rounded-full" />
            <div className="absolute top-1/3 -right-4 w-2 h-2 bg-blue-400/60 animate-pulse rounded-full" />
            <div className="absolute -bottom-2 right-1/3 w-4 h-4 bg-purple-400/60 animate-pulse rounded-full" />
            <div className="absolute bottom-1/4 -left-6 w-2 h-2 bg-cyan-400/60 animate-pulse rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Stats Cards Skeleton - Hidden on mobile */}
      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-muted/50 backdrop-blur-sm border border-border rounded-xl p-4 animate-pulse">
              <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator Skeleton */}
      <div className="block md:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center">
          <div className="h-4 w-12 bg-muted animate-pulse rounded mb-2" />
          <div className="w-px h-8 bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  </section>
);