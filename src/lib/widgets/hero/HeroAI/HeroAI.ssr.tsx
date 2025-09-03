import React from 'react'
import { RenderContext } from '../../core/types'
import { Particles } from '@/components/section/uplift/hero/particles'
import { AnimatedGlobe } from '@/components/hero/globe-animated'
import { StatsCards } from '@/components/hero/stats-cards'
import { AnimatedBadge, AnimatedHeading, AnimatedSubheading, AnimatedActionButtons } from '@/components/hero/hero-animated'

interface HeroAISSRProps {
  badge?: string
  title?: string
  titleGradient?: string
  subtitle?: string
  launchButton?: string
  exploreButton?: string
  backgroundImageUrl?: string
  overlayOpacity?: number
  textPosition?: 'left' | 'center' | 'right'
  theme?: 'light' | 'dark'
  backgroundEffect?: 'particles' | 'static' | 'none'
  showGlobe?: boolean
  context?: RenderContext
}

export const HeroAISSR: React.FC<HeroAISSRProps> = ({
  badge = 'AI-Powered Solutions',
  title = 'The Future of Technology is',
  titleGradient = 'Here & Now With AI',
  subtitle = 'Transform your business with cutting-edge artificial intelligence solutions that drive growth and innovation.',
  launchButton = 'Launch Project',
  exploreButton = 'Explore Innovation',
  backgroundImageUrl,
  overlayOpacity = 0.5,
  textPosition = 'center',
  backgroundEffect = 'particles',
  showGlobe = true
}) => {
  return (
    <section className="relative z-10 px-6 py-24 md:py-6 w-full mx-auto h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <Particles />

      <div className="h-full w-full z-20">
        <div className="h-[85vh] max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
          
          {/* Content */}
          <div className="w-full h-full lg:w-1/2 flex flex-col justify-center">
            <AnimatedBadge text={badge} />
            <AnimatedHeading title={title} titleGradient={titleGradient} />
            <AnimatedSubheading text={subtitle} />
            <AnimatedActionButtons launchText={launchButton} exploreText={exploreButton} />
          </div>

          {/* Globe */}
          <AnimatedGlobe showGlobe={showGlobe} />
        </div>
        
        {/* StatsCards */}
        <StatsCards />
      </div>

      {/* Scroll Indicator */}
      <div className="block md:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-muted-foreground">
          <span className="text-sm mb-2">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </div>
    </section>
  )
}