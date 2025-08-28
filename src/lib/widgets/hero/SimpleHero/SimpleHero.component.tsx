import React from 'react'
import { RenderContext } from '../../core/types'

interface SimpleHeroComponentProps {
  title?: string
  subtitle?: string
  description?: string
  ctaButtonText?: string
  ctaButtonLink?: string
  backgroundImageUrl?: string
  overlayOpacity?: number
  textPosition?: 'left' | 'center' | 'right'
  ctaButtonType?: 'primary' | 'secondary'
  context?: RenderContext
}

export const SimpleHeroComponent: React.FC<SimpleHeroComponentProps> = ({
  title = 'Professional Solutions',
  subtitle = 'Built for Success',
  description = 'We deliver high-quality software solutions that help businesses achieve their goals with reliability and efficiency.',
  ctaButtonText = 'Get Started',
  ctaButtonLink = '/contact',
  backgroundImageUrl,
  overlayOpacity = 0.5,
  textPosition = 'center',
  ctaButtonType = 'primary',
  context
}) => {
  return (
    <section
      className="relative z-10 px-6 py-24 md:py-32 w-full mx-auto h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: backgroundImageUrl 
          ? `url(${backgroundImageUrl})` 
          : 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      {backgroundImageUrl && (
        <div 
          className="absolute inset-0 bg-black" 
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {/* Content */}
      <div className={`relative z-10 max-w-4xl mx-auto text-white ${
        textPosition === 'left' ? 'text-left' :
        textPosition === 'right' ? 'text-right' : 'text-center'
      }`}>
        {/* Title */}
        {title && (
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            {title}
          </h1>
        )}
        
        {/* Subtitle */}
        {subtitle && (
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-8 text-gray-200">
            {subtitle}
          </h2>
        )}
        
        {/* Description */}
        {description && (
          <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        )}
        
        {/* CTA Button */}
        {ctaButtonText && (
          <div className="flex justify-center">
            <a
              href={ctaButtonLink || '#'}
              className={`inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                ctaButtonType === 'secondary'
                  ? 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
              }`}
            >
              {ctaButtonText}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}