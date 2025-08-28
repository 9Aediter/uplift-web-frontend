import React from 'react'
import { BaseCardWidget } from '../base/BaseCardWidget'
import { WidgetConfig, WidgetData, RenderContext } from '../../core/types'

/**
 * Three Column Cards Widget - Display content in 3 equal columns
 * Perfect for services, features, or benefits showcase
 */
export class ThreeColumnCardsWidget extends BaseCardWidget {
  readonly id = 'three-column-cards'
  readonly name = '3-Column Cards'
  readonly description = 'Display content in 3 equal columns with icons, perfect for services, features, or benefits'
  readonly version = '1.0.0'
  protected tags = ['cards', 'services', 'features', 'grid']

  /**
   * Render the ThreeColumnCards component
   */
  render(data: WidgetData, context?: RenderContext): React.ComponentType<any> {
    try {
      const { ThreeColumnCardsComponent } = require('./ThreeColumnCards.component')
      
      if (!ThreeColumnCardsComponent) {
        console.error('🚫 [THREE COLUMN CARDS] ThreeColumnCardsComponent is undefined after require')
        return this.renderSkeleton()
      }
      
      return function ThreeColumnCardsRenderer() {
        return React.createElement(ThreeColumnCardsComponent, {
          ...data,
          context
        })
      }
    } catch (error) {
      console.error('🚫 [THREE COLUMN CARDS] Failed to require ThreeColumnCards component:', error)
      return this.renderSkeleton()
    }
  }

  /**
   * Render the skeleton loading state
   */
  renderSkeleton(): React.ComponentType {
    const { ThreeColumnCardsSkeleton } = require('./ThreeColumnCards.skeleton')
    return ThreeColumnCardsSkeleton
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
      maxItems: 3,
      fields: [
        ...this.getCommonCardFields(),
        {
          key: 'items',
          label: 'Cards',
          type: 'array',
          maxItems: 3,
          fields: [
            {
              key: 'title',
              label: 'Card Title',
              type: 'text',
              required: true,
              placeholder: 'Service or feature name'
            },
            {
              key: 'description',
              label: 'Card Description',
              type: 'textarea',
              required: true,
              placeholder: 'Brief description of the service or feature'
            },
            {
              key: 'icon',
              label: 'Icon',
              type: 'select',
              required: true,
              options: [
                { value: 'monitor', label: '🖥️ Monitor' },
                { value: 'smartphone', label: '📱 Smartphone' },
                { value: 'globe', label: '🌐 Globe' },
                { value: 'shopping-cart', label: '🛒 Shopping Cart' },
                { value: 'database', label: '🗄️ Database' },
                { value: 'settings', label: '⚙️ Settings' },
                { value: 'users', label: '👥 Users' },
                { value: 'chart', label: '📊 Chart' },
                { value: 'code', label: '💻 Code' },
                { value: 'palette', label: '🎨 Palette' },
                { value: 'shield', label: '🛡️ Shield' },
                { value: 'zap', label: '⚡ Zap' }
              ]
            },
            {
              key: 'color',
              label: 'Color Theme',
              type: 'select',
              required: true,
              options: [
                { value: 'blue', label: '🔵 Blue' },
                { value: 'green', label: '🟢 Green' },
                { value: 'purple', label: '🟣 Purple' },
                { value: 'red', label: '🔴 Red' },
                { value: 'yellow', label: '🟡 Yellow' },
                { value: 'pink', label: '🩷 Pink' },
                { value: 'indigo', label: '🔵 Indigo' },
                { value: 'teal', label: '🩵 Teal' }
              ]
            },
            {
              key: 'link',
              label: 'Link URL (Optional)',
              type: 'url',
              placeholder: '/service-page or https://example.com'
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
      title: 'Our Services',
      subtitle: 'Complete business solutions tailored to your needs',
      backgroundColor: 'bg-gradient-to-b from-background to-black',
      items: [
        {
          title: 'ERP Systems',
          description: 'Comprehensive business management solutions',
          icon: 'monitor',
          color: 'blue',
          link: '/service/erp-system'
        },
        {
          title: 'POS Solutions',
          description: 'Modern point of sale systems',
          icon: 'shopping-cart',
          color: 'green',
          link: '/service/pos-solution'
        },
        {
          title: 'Web Applications',
          description: 'Custom web development services',
          icon: 'globe',
          color: 'purple',
          link: '/service/web-application'
        }
      ]
    }
  }

  /**
   * Enhanced validation for ThreeColumnCards
   */
  validateData(data: WidgetData) {
    const baseValidation = super.validateData(data)
    const errors = [...baseValidation.errors]

    // Validate items array
    if (!data.items || !Array.isArray(data.items)) {
      errors.push('Items array is required')
    } else if (data.items.length === 0) {
      errors.push('At least one card is required')
    } else if (data.items.length > 3) {
      errors.push('Maximum 3 cards allowed')
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
        color: item.color || 'blue',
        // Ensure icon defaults
        icon: item.icon || 'monitor'
      }))
    }

    return transformed
  }

  /**
   * Check if widget supports specific features
   */
  protected supportsFeature(feature: string): boolean {
    const supportedFeatures = ['icons', 'colorThemes', 'links', 'responsive']
    return supportedFeatures.includes(feature) || super.supportsFeature(feature)
  }
}