import React from 'react'
import { WidgetConfig, RenderContext } from '../../core/types'
import { BaseHeroWidget, HeroData } from '../BaseHeroWidget'

interface HeroAIData extends HeroData {
  // AI-specific fields
  badge: string
  titlePart1: string
  titlePart2: string
  titleGradient1: string
  titleGradient2: string
  launchButton: string
  exploreButton: string
}

export class HeroAIWidget extends BaseHeroWidget {
  readonly id = 'hero-ai'
  readonly name = 'Hero AI Interactive'
  readonly description = 'Interactive AI-themed hero section with globe, particles, and animations'
  readonly version = '1.0.0'
  readonly heroType = 'ai-interactive'
  readonly isAnimated = true
  readonly supportedFeatures = ['particles', 'globe', 'scroll-indicator', 'animations', 'gradient-text']

  protected tags = ['ai', 'interactive', 'animated', 'globe', 'particles', 'modern']

  getConfig(): WidgetConfig {
    const baseConfig = super.getConfig()
    
    // Add AI-specific fields
    const aiFields = [
      {
        key: 'badge',
        label: 'Badge Text',
        type: 'text' as const,
        required: false,
        placeholder: 'AI-Powered Solutions'
      },
      {
        key: 'titlePart1',
        label: 'Title Part 1',
        type: 'text' as const,
        required: false,
        placeholder: 'The Future of'
      },
      {
        key: 'titlePart2',
        label: 'Title Part 2',
        type: 'text' as const,
        required: false,
        placeholder: 'Technology is'
      },
      {
        key: 'titleGradient1',
        label: 'Title Gradient 1',
        type: 'text' as const,
        required: false,
        placeholder: 'Here & Now'
      },
      {
        key: 'titleGradient2',
        label: 'Title Gradient 2',
        type: 'text' as const,
        required: false,
        placeholder: 'With AI'
      },
      {
        key: 'launchButton',
        label: 'Launch Button Text',
        type: 'text' as const,
        required: false,
        placeholder: 'Launch Project'
      },
      {
        key: 'exploreButton',
        label: 'Explore Button Text',
        type: 'text' as const,
        required: false,
        placeholder: 'Explore More'
      }
    ]

    return {
      ...baseConfig,
      fields: [...aiFields, ...baseConfig.fields]
    }
  }

  getDefaultData(): HeroAIData {
    const baseData = super.getDefaultData()
    
    return {
      ...baseData,
      badge: 'AI-Powered Solutions',
      titlePart1: 'The Future of',
      titlePart2: 'Technology is',
      titleGradient1: 'Here & Now',
      titleGradient2: 'With AI',
      launchButton: 'Launch Project',
      exploreButton: 'Explore Innovation'
    }
  }

  render(data: HeroAIData, context?: RenderContext): React.ComponentType<any> {
    try {
      const { HeroAIComponent } = require('./HeroAI.component')
      const transformedData = this.transformDataForHeroAI(data || this.getDefaultData(), context)
      
      return function HeroAIRenderer(props: any) {
        return React.createElement(HeroAIComponent, {
          badge: transformedData.badge,
          titlePart1: transformedData.title_part1,
          titlePart2: transformedData.title_part2,
          titleGradient1: transformedData.title_gradient1,
          titleGradient2: transformedData.title_gradient2,
          subtitle: transformedData.subtitle,
          launchButton: transformedData.launch_button,
          exploreButton: transformedData.explore_button,
          backgroundImageUrl: transformedData.backgroundImageUrl,
          overlayOpacity: transformedData.overlayOpacity,
          textPosition: transformedData.textPosition,
          theme: context?.theme || 'dark',
          error: false,
          context,
          ...props
        })
      }
    } catch (error) {
      console.error('🚫 [HERO AI] Failed to load HeroAI component:', error)
      // Use default data with error state instead of skeleton
      const defaultData = this.transformDataForHeroAI(this.getDefaultData(), context)
      const { HeroAIComponent } = require('./HeroAI.component')
      
      return function HeroAIErrorRenderer(props: any) {
        return React.createElement(HeroAIComponent, {
          badge: defaultData.badge,
          titlePart1: defaultData.title_part1,
          titlePart2: defaultData.title_part2,
          titleGradient1: defaultData.title_gradient1,
          titleGradient2: defaultData.title_gradient2,
          subtitle: defaultData.subtitle,
          launchButton: defaultData.launch_button,
          exploreButton: defaultData.explore_button,
          backgroundImageUrl: defaultData.backgroundImageUrl,
          overlayOpacity: defaultData.overlayOpacity,
          textPosition: defaultData.textPosition,
          theme: context?.theme || 'dark',
          error: true,
          errorMessage: error instanceof Error ? error.message : String(error),
          context,
          ...props
        })
      }
    }
  }

  renderSSR(data: HeroAIData, context?: RenderContext): React.ComponentType<any> {
    // SSR: Use skeleton instead of complex component to avoid hooks
    return this.renderSkeleton()
  }

  private transformDataForHeroAI(data: HeroAIData, context?: RenderContext) {
    const transformedData = this.transformData(data, context)
    
    return {
      badge: data.badge || transformedData.title,
      title_part1: data.titlePart1 || '',
      title_part2: data.titlePart2 || '',
      title_gradient1: data.titleGradient1 || transformedData.title,
      title_gradient2: data.titleGradient2 || '',
      subtitle: transformedData.subtitle || transformedData.description,
      launch_button: data.launchButton || transformedData.ctaButtonText || 'Launch Project',
      explore_button: data.exploreButton || 'Explore More',
      backgroundImageUrl: data.backgroundImageUrl,
      overlayOpacity: data.overlayOpacity || 0.5,
      textPosition: data.textPosition || 'center'
    }
  }

  renderSkeleton(): React.ComponentType {
    let HeroAISkeleton: any = null
    try {
      if (typeof window !== 'undefined' || typeof require !== 'undefined') {
        HeroAISkeleton = require('./HeroAI.skeleton').HeroAISkeleton
      }
    } catch (error) {
      console.error('🚫 [HERO AI] Failed to load skeleton:', error)
    }

    if (HeroAISkeleton) {
      return HeroAISkeleton
    }

    // Fallback skeleton if import fails
    return () => React.createElement('div', {
      className: 'h-screen bg-gray-900 animate-pulse flex items-center justify-center'
    }, React.createElement('div', {
      className: 'text-gray-400'
    }, 'Loading Hero...'))
  }
}