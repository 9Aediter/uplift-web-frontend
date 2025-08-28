import React from 'react'
import { WidgetConfig, WidgetData, RenderContext, WidgetCategory } from '../core/types'
import { BaseWidget } from '../core/BaseWidget'

export interface HeroData extends WidgetData {
  // Basic content
  titleEn: string
  titleTh: string
  subtitleEn?: string
  subtitleTh?: string
  descriptionEn?: string
  descriptionTh?: string
  
  // Visual elements
  backgroundImageUrl?: string
  overlayOpacity?: number
  textPosition?: 'left' | 'center' | 'right'
  
  // CTA Button
  ctaButtonTextEn?: string
  ctaButtonTextTh?: string
  ctaButtonUrl?: string
  ctaButtonType?: 'primary' | 'secondary'
  
  // Additional dynamic content (for specific hero types)
  badge?: string
  titlePart1?: string
  titlePart2?: string
  titleGradient1?: string
  titleGradient2?: string
  launchButton?: string
  exploreButton?: string
  
  // Status
  isActive?: boolean
}

/**
 * Abstract base class for all Hero widgets
 * Extends BaseWidget with Hero-specific functionality
 */
export abstract class BaseHeroWidget extends BaseWidget {
  readonly category: WidgetCategory = 'hero'

  // Abstract properties specific to Hero widgets
  abstract readonly heroType: string
  abstract readonly isAnimated: boolean
  abstract readonly supportedFeatures: string[]

  /**
   * Default Hero widget configuration
   * Can be overridden by specific hero types
   */
  getConfig(): WidgetConfig {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      description: this.description,
      defaultData: this.getDefaultData(),
      fields: [
        {
          key: 'titleEn',
          label: 'Title (English)',
          type: 'text',
          required: true,
          placeholder: 'Enter hero title in English'
        },
        {
          key: 'titleTh',
          label: 'Title (Thai)',
          type: 'text',
          required: true,
          placeholder: 'Enter hero title in Thai'
        },
        {
          key: 'subtitleEn',
          label: 'Subtitle (English)',
          type: 'text',
          required: false,
          placeholder: 'Enter subtitle in English'
        },
        {
          key: 'subtitleTh',
          label: 'Subtitle (Thai)',
          type: 'text',
          required: false,
          placeholder: 'Enter subtitle in Thai'
        },
        {
          key: 'descriptionEn',
          label: 'Description (English)',
          type: 'textarea',
          required: false,
          placeholder: 'Enter description in English'
        },
        {
          key: 'descriptionTh',
          label: 'Description (Thai)',
          type: 'textarea',
          required: false,
          placeholder: 'Enter description in Thai'
        },
        {
          key: 'backgroundImageUrl',
          label: 'Background Image URL',
          type: 'image',
          required: false,
          placeholder: 'https://example.com/hero-bg.jpg'
        },
        {
          key: 'overlayOpacity',
          label: 'Overlay Opacity',
          type: 'text',
          required: false,
          placeholder: '0.5',
          defaultValue: '0.5'
        },
        {
          key: 'textPosition',
          label: 'Text Position',
          type: 'select',
          required: false,
          options: [
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' }
          ],
          defaultValue: 'center'
        },
        {
          key: 'ctaButtonTextEn',
          label: 'CTA Button Text (English)',
          type: 'text',
          required: false,
          placeholder: 'Get Started Today'
        },
        {
          key: 'ctaButtonTextTh',
          label: 'CTA Button Text (Thai)',
          type: 'text',
          required: false,
          placeholder: 'เริ่มต้นวันนี้'
        },
        {
          key: 'ctaButtonUrl',
          label: 'CTA Button URL',
          type: 'url',
          required: false,
          placeholder: '/contact'
        },
        {
          key: 'ctaButtonType',
          label: 'Button Type',
          type: 'select',
          required: false,
          options: [
            { value: 'primary', label: 'Primary' },
            { value: 'secondary', label: 'Secondary' }
          ],
          defaultValue: 'primary'
        },
        {
          key: 'isActive',
          label: 'Active',
          type: 'select',
          required: false,
          options: [
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No' }
          ],
          defaultValue: 'true'
        }
      ]
    }
  }

  /**
   * Default Hero data
   */
  getDefaultData(): HeroData {
    return {
      titleEn: 'Welcome to the Future of Technology',
      titleTh: 'ยินดีต้อนรับสู่อนาคตแห่งเทคโนโลยี',
      subtitleEn: 'Leading Innovation in Digital Solutions',
      subtitleTh: 'ผู้นำนวัตกรรมในโซลูชันดิจิทัล',
      descriptionEn: 'We create cutting-edge software solutions that transform businesses and drive growth in the digital age.',
      descriptionTh: 'เราสร้างโซลูชันซอฟต์แวร์ล้ำสมัยที่เปลี่ยนแปลงธุรกิจและขับเคลื่อนการเติบโตในยุคดิจิทัล',
      backgroundImageUrl: '',
      overlayOpacity: 0.5,
      textPosition: 'center',
      ctaButtonTextEn: 'Get Started Today',
      ctaButtonTextTh: 'เริ่มต้นวันนี้',
      ctaButtonUrl: '/contact',
      ctaButtonType: 'primary',
      isActive: true
    }
  }

  /**
   * Get hero type for identification
   */
  getHeroType(): string {
    return this.heroType
  }

  /**
   * Check if hero supports animation
   */
  isAnimatedHero(): boolean {
    return this.isAnimated
  }

  /**
   * Get supported features list
   */
  getSupportedFeatures(): string[] {
    return this.supportedFeatures
  }

  /**
   * Check if hero supports specific feature
   */
  protected supportsFeature(feature: string): boolean {
    return this.supportedFeatures.includes(feature)
  }

  /**
   * Transform hero data based on locale context
   */
  protected transformData(data: HeroData, context?: RenderContext): HeroData {
    const locale = context?.locale || 'en'
    
    return {
      ...data,
      // Add computed fields for easier rendering
      title: locale === 'th' ? data.titleTh : data.titleEn,
      subtitle: locale === 'th' ? data.subtitleTh : data.subtitleEn,
      description: locale === 'th' ? data.descriptionTh : data.descriptionEn,
      ctaButtonText: locale === 'th' ? data.ctaButtonTextTh : data.ctaButtonTextEn,
    }
  }

  /**
   * Render skeleton/loading state specific to hero sections
   * Override this for custom skeleton implementations
   */
  renderSkeleton(): React.ComponentType {
    return () => React.createElement('div', {
      className: 'animate-pulse bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 h-screen flex items-center justify-center'
    }, React.createElement('div', {
      className: 'text-center space-y-6'
    }, [
      React.createElement('div', {
        key: 'title',
        className: 'h-8 bg-gray-600 rounded-lg w-96 mx-auto'
      }),
      React.createElement('div', {
        key: 'subtitle',
        className: 'h-6 bg-gray-600 rounded-lg w-64 mx-auto'
      }),
      React.createElement('div', {
        key: 'description',
        className: 'h-4 bg-gray-600 rounded-lg w-80 mx-auto'
      }),
      React.createElement('div', {
        key: 'button',
        className: 'h-12 bg-gray-600 rounded-lg w-32 mx-auto mt-8'
      })
    ]))
  }
}