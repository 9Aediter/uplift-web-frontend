import React from 'react'
import { BaseCardWidget } from '../base/BaseCardWidget'
import { WidgetConfig, WidgetData, RenderContext } from '../../core/types'

/**
 * Four Column Cards Widget - Display content in 4 equal columns
 * Perfect for problem statements, features, or benefits showcase
 */
export class FourColumnCardsWidget extends BaseCardWidget {
  readonly id = 'four-column-cards'
  readonly name = '4-Column Cards'
  readonly description = 'Display content in 4 equal columns, perfect for problem statements or key features'
  readonly version = '1.0.0'
  protected tags = ['cards', 'problems', 'features', 'grid', 'showcase']

  /**
   * Render the FourColumnCards component
   */
  render(data: WidgetData, context?: RenderContext): React.ComponentType<any> {
    try {
      const { FourColumnCardsComponent } = require('./FourColumnCards.component')
      
      if (!FourColumnCardsComponent) {
        console.error('🚫 [FOUR COLUMN CARDS] FourColumnCardsComponent is undefined after require')
        return this.renderSkeleton()
      }
      
      return function FourColumnCardsRenderer() {
        return React.createElement(FourColumnCardsComponent, {
          ...data,
          context
        })
      }
    } catch (error) {
      console.error('🚫 [FOUR COLUMN CARDS] Failed to require FourColumnCards component:', error)
      return this.renderSkeleton()
    }
  }

  /**
   * Render the skeleton loading state
   */
  renderSkeleton(): React.ComponentType {
    const { FourColumnCardsSkeleton } = require('./FourColumnCards.skeleton')
    return FourColumnCardsSkeleton
  }

  /**
   * Get widget configuration for admin interface
   */
  getConfig(): WidgetConfig {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      description: this.description,
      maxItems: 4,
      fields: [
        ...this.getCommonCardFields(),
        {
          key: 'items',
          label: 'Cards',
          type: 'array',
          maxItems: 4,
          fields: [
            {
              key: 'title',
              label: 'Card Title',
              type: 'text',
              required: true,
              placeholder: 'Problem or feature title'
            },
            {
              key: 'description',
              label: 'Card Description',
              type: 'textarea',
              required: true,
              placeholder: 'Brief description of the problem or feature'
            },
            {
              key: 'icon',
              label: 'Icon',
              type: 'select',
              required: true,
              options: [
                { value: 'clock', label: '⏰ Clock' },
                { value: 'trending-up', label: '📈 Trending Up' },
                { value: 'users', label: '👥 Users' },
                { value: 'shield', label: '🛡️ Shield' },
                { value: 'zap', label: '⚡ Zap' },
                { value: 'target', label: '🎯 Target' },
                { value: 'heart', label: '❤️ Heart' },
                { value: 'star', label: '⭐ Star' },
                { value: 'check-circle', label: '✅ Check Circle' },
                { value: 'lightbulb', label: '💡 Lightbulb' },
                { value: 'rocket', label: '🚀 Rocket' },
                { value: 'award', label: '🏆 Award' }
              ]
            },
            {
              key: 'color',
              label: 'Color Theme',
              type: 'select',
              required: true,
              options: [
                { value: 'red', label: '🔴 Red (Problems)' },
                { value: 'blue', label: '🔵 Blue' },
                { value: 'green', label: '🟢 Green (Solutions)' },
                { value: 'purple', label: '🟣 Purple' },
                { value: 'yellow', label: '🟡 Yellow (Warning)' },
                { value: 'pink', label: '🩷 Pink' },
                { value: 'indigo', label: '🔵 Indigo' },
                { value: 'orange', label: '🟠 Orange' }
              ]
            }
          ]
        }
      ],
      defaultData: this.getDefaultData()
    }
  }

  /**
   * Get default data for new widget instances
   */
  getDefaultData(): WidgetData {
    return {
      title: 'Common Business Problems',
      subtitle: 'Problems we solve for modern businesses every day',
      backgroundColor: 'bg-background',
      items: [
        {
          title: 'Time Consuming',
          description: 'Manual processes eating up valuable time that could be spent growing your business',
          icon: 'clock',
          color: 'red'
        },
        {
          title: 'Limited Growth',
          description: 'Outdated systems preventing you from scaling and reaching your full potential',
          icon: 'trending-up',
          color: 'red'
        },
        {
          title: 'Poor Experience',
          description: 'Customers frustrated with slow, complicated, or unreliable business processes',
          icon: 'users',
          color: 'red'
        },
        {
          title: 'Security Risks',
          description: 'Vulnerable systems exposing your business and customer data to potential threats',
          icon: 'shield',
          color: 'red'
        }
      ]
    }
  }

  /**
   * Enhanced validation for FourColumnCards
   */
  validateData(data: WidgetData) {
    const baseValidation = super.validateData(data)
    const errors = [...baseValidation.errors]

    // Validate items array
    if (!data.items || !Array.isArray(data.items)) {
      errors.push('Items array is required')
    } else if (data.items.length === 0) {
      errors.push('At least one card is required')
    } else if (data.items.length > 4) {
      errors.push('Maximum 4 cards allowed')
    } else {
      // Validate each item
      data.items.forEach((item: any, index: number) => {
        if (!item.title) {
          errors.push(`Card ${index + 1}: Title is required`)
        }
        if (!item.description) {
          errors.push(`Card ${index + 1}: Description is required`)
        }
        if (!item.icon) {
          errors.push(`Card ${index + 1}: Icon is required`)
        }
        if (!item.color) {
          errors.push(`Card ${index + 1}: Color theme is required`)
        }
      })
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings: baseValidation.warnings
    }
  }

  /**
   * Transform data with icon and color mapping
   */
  protected transformData(data: WidgetData, context?: RenderContext): WidgetData {
    const transformed = super.transformData(data, context)

    // Ensure items have proper structure
    if (transformed.items && Array.isArray(transformed.items)) {
      transformed.items = transformed.items.map((item: any) => ({
        ...item,
        // Ensure color defaults
        color: item.color || 'red',
        // Ensure icon defaults
        icon: item.icon || 'clock'
      }))
    }

    return transformed
  }

  /**
   * Check if widget supports specific features
   */
  protected supportsFeature(feature: string): boolean {
    const supportedFeatures = ['icons', 'colorThemes', 'responsive', 'problems']
    return supportedFeatures.includes(feature) || super.supportsFeature(feature)
  }
}