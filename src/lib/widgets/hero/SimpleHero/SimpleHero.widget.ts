import React from 'react'
import { RenderContext } from '../../core/types'
import { BaseHeroWidget, HeroData } from '../BaseHeroWidget'

export class SimpleHeroWidget extends BaseHeroWidget {
  readonly id = 'hero-simple'
  readonly name = 'Simple Hero'
  readonly description = 'Clean and simple hero section with background image and CTA button'
  readonly version = '1.0.0'
  readonly heroType = 'simple'
  readonly isAnimated = false
  readonly supportedFeatures = ['background-image', 'overlay', 'cta-button', 'text-alignment']

  protected tags = ['simple', 'clean', 'basic', 'lightweight']

  render(data: HeroData, context?: RenderContext): React.ComponentType<any> {
    try {
      const { SimpleHeroComponent } = require('./SimpleHero.component')
      const transformedData = this.transformData(data || this.getDefaultData(), context)
      
      return function SimpleHeroRenderer(props: any) {
        return React.createElement(SimpleHeroComponent, {
          title: transformedData.title,
          subtitle: transformedData.subtitle,
          description: transformedData.description,
          ctaButtonText: transformedData.ctaButtonText,
          ctaButtonLink: data?.ctaButtonUrl || '#',
          backgroundImageUrl: data?.backgroundImageUrl,
          overlayOpacity: data?.overlayOpacity || 0.5,
          textPosition: data?.textPosition || 'center',
          ctaButtonType: data?.ctaButtonType || 'primary',
          theme: context?.theme || 'dark',
          error: false,
          context,
          ...props
        })
      }
    } catch (error) {
      console.error('🚫 [SIMPLE HERO] Failed to load SimpleHero component:', error)
      // Use default data with error state instead of skeleton
      const defaultData = this.transformData(this.getDefaultData(), context)
      const { SimpleHeroComponent } = require('./SimpleHero.component')
      
      return function SimpleHeroErrorRenderer(props: any) {
        return React.createElement(SimpleHeroComponent, {
          title: defaultData.title,
          subtitle: defaultData.subtitle,
          description: defaultData.description,
          ctaButtonText: defaultData.ctaButtonText,
          ctaButtonLink: '#',
          backgroundImageUrl: undefined,
          overlayOpacity: 0.5,
          textPosition: 'center',
          ctaButtonType: 'primary',
          theme: context?.theme || 'dark',
          error: true,
          errorMessage: error instanceof Error ? error.message : String(error),
          context,
          ...props
        })
      }
    }
  }

  renderSkeleton(): React.ComponentType {
    let SimpleHeroSkeleton: any = null
    try {
      if (typeof window !== 'undefined' || typeof require !== 'undefined') {
        SimpleHeroSkeleton = require('./SimpleHero.skeleton').SimpleHeroSkeleton
      }
    } catch (error) {
      console.error('🚫 [SIMPLE HERO] Failed to load skeleton:', error)
    }

    if (SimpleHeroSkeleton) {
      return SimpleHeroSkeleton
    }

    // Fallback skeleton if import fails
    return () => React.createElement('div', {
      className: 'h-screen bg-gray-900 animate-pulse flex items-center justify-center'
    }, React.createElement('div', {
      className: 'text-gray-400'
    }, 'Loading Simple Hero...'))
  }
}