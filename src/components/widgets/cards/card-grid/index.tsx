"use client"

import React from 'react'

interface CardGridProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  items?: Array<{
    name: string
    icon: string
    category?: string
  }>
  showMarquee?: boolean
  marqueeSpeed?: number
  columns?: string
}

export const CardGrid: React.FC<CardGridProps> = ({
  title = "Technology Stack",
  subtitle = "Tools & technologies we use to build amazing products",
  backgroundColor = "bg-background",
  items = [],
  showMarquee = false,
  marqueeSpeed = 80,
  columns = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
}) => {
  if (!items.length) {
    return (
      <div className={`${backgroundColor} py-16 md:py-24`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">No items available</p>
        </div>
      </div>
    )
  }

  const TechCard = ({ item, index }: { item: typeof items[0], index: number }) => (
    <div
      className="w-full h-fit flex flex-col items-center justify-center transition-all duration-500 m-3 rounded-lg group relative hover:scale-[1.15] cursor-pointer"
      key={index}
    >
      <div className="h-full w-full rounded-xl backdrop-blur-sm shadow-lg border border-cyan-500/20 group-hover:border-cyan-400/40 group-hover:scale-105 transition-all duration-500 bg-white/5">
        <div className="flex flex-col items-center justify-center gap-3 p-6">
          <div className="h-8 sm:h-10 flex items-center justify-center text-3xl">
            {/* Support both emoji and HTML icons */}
            {item.icon.startsWith('<') ? (
              <div 
                dangerouslySetInnerHTML={{ __html: item.icon }} 
                className="w-auto h-full [&>svg]:w-auto [&>svg]:h-full [&>svg]:max-w-10 [&>svg]:max-h-10 group-hover:drop-shadow-lg transition-all duration-500"
              />
            ) : (
              <span className="group-hover:drop-shadow-lg transition-all duration-500">
                {item.icon}
              </span>
            )}
          </div>
          <p className="text-sm text-foreground sm:text-base font-medium group-hover:text-cyan-300 transition-colors duration-300 text-center">
            {item.name}
          </p>
          {item.category && (
            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
              {item.category}
            </span>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <section className={`${backgroundColor} py-16 md:py-24 w-full`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Technology Grid/Marquee */}
        <div className="w-full">
          {showMarquee ? (
            // Marquee version (would need react-fast-marquee dependency)
            <div className="py-4">
              <div className="flex animate-marquee space-x-6">
                {[...items, ...items].map((item, index) => (
                  <div key={index} className="flex-shrink-0">
                    <TechCard item={item} index={index} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Grid version
            <div className={`grid ${columns} gap-4 justify-items-center`}>
              {items.map((item, index) => (
                <TechCard key={index} item={item} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Marquee animation styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee ${60 / (marqueeSpeed / 100)}s linear infinite;
        }
      `}</style>
    </section>
  )
}