import React from 'react'
import { RenderContext } from '../../core/types'

// Safely import motion only on client side
let motion: any = null
if (typeof window !== 'undefined') {
  try {
    motion = require('framer-motion').motion
  } catch (e) {
    console.warn('Framer Motion not available')
  }
}

interface HeroAIComponentProps {
  badge?: string
  titlePart1?: string
  titlePart2?: string
  titleGradient1?: string
  titleGradient2?: string
  subtitle?: string
  launchButton?: string
  exploreButton?: string
  backgroundImageUrl?: string
  overlayOpacity?: number
  textPosition?: 'left' | 'center' | 'right'
  theme?: 'light' | 'dark'
  error?: boolean
  errorMessage?: string
  context?: RenderContext
}

export const HeroAIComponent: React.FC<HeroAIComponentProps> = ({
  badge = 'AI-Powered Solutions',
  titlePart1 = 'The Future of',
  titlePart2 = 'Technology is',
  titleGradient1 = 'Here & Now',
  titleGradient2 = 'With AI',
  subtitle = 'Transform your business with cutting-edge artificial intelligence solutions that drive growth and innovation.',
  launchButton = 'Launch Project',
  exploreButton = 'Explore Innovation',
  backgroundImageUrl,
  overlayOpacity = 0.5,
  textPosition = 'center',
  context
}) => {
  // Simplified version without complex 3D components for OOP widget
  const containerProps = motion ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  } : {}

  return (
    <section
      className="bg-gradient-to-t from-black via-black/70 to-black/10 relative z-10 px-6 py-24 md:py-12 w-full mx-auto h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      {backgroundImageUrl && (
        <div 
          className="absolute inset-0 bg-black" 
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {/* Background Effects - Simplified particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-2000" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-3000" />
      </div>

      <div className="h-full w-full z-20">
        <div className="h-[100vh] max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className={`w-full h-full lg:w-1/2 flex flex-col justify-center ${
            textPosition === 'left' ? 'text-left' :
            textPosition === 'right' ? 'text-right' : 'text-center'
          }`}>
            {/* Badge */}
            {badge && (
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium">
                  {badge}
                </span>
              </div>
            )}

            {/* Title */}
            <div className="space-y-2 mb-8">
              {titlePart1 && (
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                  {titlePart1}
                </h1>
              )}
              {titlePart2 && (
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                  {titlePart2}
                </h1>
              )}
              {titleGradient1 && (
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  {titleGradient1}
                </h1>
              )}
              {titleGradient2 && (
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {titleGradient2}
                </h1>
              )}
            </div>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl">
                {subtitle}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {launchButton && (
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  {launchButton}
                </button>
              )}
              {exploreButton && (
                <button className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-400 hover:text-white transition-all duration-300">
                  {exploreButton}
                </button>
              )}
            </div>
          </div>

          {/* Right side - Simplified globe representation */}
          <div className="hidden w-full lg:block lg:w-1/2 flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Simplified globe */}
              <div className="w-full h-full bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full border border-cyan-500/30 flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full border border-blue-400/40 flex items-center justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-cyan-600/40 to-blue-600/40 rounded-full border border-cyan-400/50 flex items-center justify-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                      AI
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Orbiting elements */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full animate-pulse" />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-1000" />
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-2000" />
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-3000" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-sm mb-2">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent" />
        </div>
      </div>
    </section>
  )
}