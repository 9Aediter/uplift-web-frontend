export const SolutionSkeleton = () => (
  <section className="w-full py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="h-4 w-24 bg-muted animate-pulse rounded-full mx-auto mb-4" />
        <div className="space-y-3">
          <div className="h-12 md:h-16 w-3/4 bg-muted animate-pulse rounded-lg mx-auto" />
          <div className="h-12 md:h-16 w-1/2 bg-muted animate-pulse rounded-lg mx-auto" />
        </div>
        <div className="mt-6 space-y-2">
          <div className="h-6 w-2/3 bg-muted animate-pulse rounded mx-auto" />
          <div className="h-6 w-1/2 bg-muted animate-pulse rounded mx-auto" />
        </div>
      </div>

      {/* Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-muted/50 backdrop-blur-sm border border-border rounded-xl p-6 animate-pulse">
            {/* Icon */}
            <div className="w-12 h-12 bg-muted animate-pulse rounded-lg mb-4" />
            
            {/* Title */}
            <div className="h-6 w-3/4 bg-muted animate-pulse rounded mb-3" />
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted animate-pulse rounded" />
              <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
              <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
            </div>
            
            {/* Features List */}
            <div className="mt-4 space-y-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-cyan-400/30 animate-pulse rounded-full" />
                  <div className="h-4 flex-1 bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* CTA Button */}
      <div className="text-center mt-16">
        <div className="h-14 w-48 bg-cyan-500/30 animate-pulse rounded-full mx-auto" />
      </div>
    </div>
  </section>
);