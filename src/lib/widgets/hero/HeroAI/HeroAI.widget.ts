import React from 'react'
import { WidgetConfig, RenderContext } from '../../core/types'
import { BaseHeroWidget, HeroData } from '../BaseHeroWidget'
import { HeroAISSR } from './HeroAI.ssr'
import { HeroAISkeleton } from './HeroAI.skeleton'

interface HeroAIData extends HeroData {
  // AI-specific fields
  badge: string
  title: string
  titleGradient: string
  launchButton: string
  exploreButton: string
  backgroundEffect?: 'particles' | 'static' | 'none'
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
        key: 'title',
        label: 'Main Title',
        type: 'text' as const,
        required: false,
        placeholder: 'The Future of Technology is'
      },
      {
        key: 'titleGradient',
        label: 'Gradient Title',
        type: 'text' as const,
        required: false,
        placeholder: 'Here & Now With AI'
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
      },
      {
        key: 'backgroundEffect',
        label: 'Background Effect',
        type: 'select' as const,
        required: false,
        options: [
          { label: 'Particles (Client Only)', value: 'particles' },
          { label: 'Static Effects', value: 'static' },
          { label: 'None', value: 'none' }
        ],
        defaultValue: 'static'
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
      title: 'The Future of Technology is',
      titleGradient: 'Here & Now With AI',
      launchButton: 'Launch Project',
      exploreButton: 'Explore Innovation',
      backgroundEffect: 'static'
    }
  }

  render(data: HeroAIData, context?: RenderContext): React.ComponentType<any> {
    try {
      const transformedData = this.transformDataForHeroAI(data || this.getDefaultData(), context)
      
      return function HeroAIRenderer(props: any) {
        return React.createElement(HeroAISSR, {
          badge: transformedData.badge,
          title: transformedData.title,
          titleGradient: transformedData.titleGradient,
          subtitle: transformedData.subtitle,
          launchButton: transformedData.launchButton,
          exploreButton: transformedData.exploreButton,
          backgroundImageUrl: transformedData.backgroundImageUrl,
          overlayOpacity: transformedData.overlayOpacity,
          textPosition: transformedData.textPosition,
          backgroundEffect: transformedData.backgroundEffect,
          theme: context?.theme || 'dark',
          context,
          ...props
        })
      }
    } catch (error) {
      console.error('🚫 [HERO AI] Failed to load HeroAI component:', error)
      return this.renderSkeleton()
    }
  }

  renderSSR(data: HeroAIData, context?: RenderContext): React.ComponentType<any> {
    // For SSR, use the SSR-safe component
    return this.render(data, context)
  }

  private transformDataForHeroAI(data: HeroAIData, context?: RenderContext) {
    const transformedData = this.transformData(data, context)
    
    return {
      badge: data.badge || 'AI-Powered Solutions',
      title: data.title || transformedData.title || 'The Future of Technology is',
      titleGradient: data.titleGradient || 'Here & Now With AI',
      subtitle: transformedData.subtitle || transformedData.description,
      launchButton: data.launchButton || transformedData.ctaButtonText || 'Launch Project',
      exploreButton: data.exploreButton || 'Explore More',
      backgroundImageUrl: data.backgroundImageUrl,
      overlayOpacity: data.overlayOpacity || 0.5,
      textPosition: data.textPosition || 'center',
      backgroundEffect: data.backgroundEffect || 'static'
    }
  }

  renderSkeleton(): React.ComponentType {
    try {
      return HeroAISkeleton
    } catch (error) {
      console.error('🚫 [HERO AI] Failed to load skeleton:', error)
      // Fallback skeleton if import fails
      return () => React.createElement('div', {
        className: 'h-screen bg-gray-900 animate-pulse flex items-center justify-center'
      }, React.createElement('div', {
        className: 'text-gray-400'
      }, 'Loading Hero...'))
    }
  }
}