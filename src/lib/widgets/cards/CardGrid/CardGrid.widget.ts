import React from 'react'
import { BaseCardWidget } from '../base/BaseCardWidget'
import { WidgetConfig, WidgetData, RenderContext } from '../../core/types'

/**
 * Card Grid Widget - Display content in flexible grid layout
 * Perfect for portfolios, galleries, or content showcases
 */
export class CardGridWidget extends BaseCardWidget {
  readonly id = 'card-grid'
  readonly name = 'Card Grid'
  readonly description = 'Flexible grid layout for displaying cards with images, titles, and descriptions'
  readonly version = '1.0.0'
  protected tags = ['cards', 'grid', 'portfolio', 'gallery', 'showcase']

  /**
   * Render the CardGrid component
   */
  render(data: WidgetData, context?: RenderContext): React.ComponentType<any> {
    try {
      const { CardGridComponent } = require('./CardGrid.component')
      
      if (!CardGridComponent) {
        console.error('🚫 [CARD GRID] CardGridComponent is undefined after require')
        return this.renderSkeleton()
      }
      
      return function CardGridRenderer() {
        return React.createElement(CardGridComponent, {
          ...data,
          context
        })
      }
    } catch (error) {
      console.error('🚫 [CARD GRID] Failed to require CardGrid component:', error)
      return this.renderSkeleton()
    }
  }

  /**
   * Render the skeleton loading state
   */
  renderSkeleton(): React.ComponentType {
    const { CardGridSkeleton } = require('./CardGrid.skeleton')
    return CardGridSkeleton
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
      maxItems: 12,
      fields: [
        ...this.getCommonCardFields(),
        {
          key: 'gridColumns',
          label: 'Grid Columns',
          type: 'select',
          required: true,
          options: [
            { value: '2', label: '2 Columns' },
            { value: '3', label: '3 Columns (Default)' },
            { value: '4', label: '4 Columns' },
            { value: '6', label: '6 Columns' }
          ],
          defaultValue: '3'
        },
        {
          key: 'cardStyle',
          label: 'Card Style',
          type: 'select',
          required: true,
          options: [
            { value: 'default', label: 'Default Card' },
            { value: 'minimal', label: 'Minimal Design' },
            { value: 'elevated', label: 'Elevated Shadow' },
            { value: 'bordered', label: 'Bordered Style' }
          ],
          defaultValue: 'default'
        },
        {
          key: 'items',
          label: 'Grid Items',
          type: 'array',
          maxItems: 12,
          fields: [
            {
              key: 'title',
              label: 'Card Title',
              type: 'text',
              required: true,
              placeholder: 'Item title'
            },
            {
              key: 'description',
              label: 'Card Description',
              type: 'textarea',
              required: true,
              placeholder: 'Brief description'
            },
            {
              key: 'image',
              label: 'Card Image',
              type: 'image',
              placeholder: 'Image URL'
            },
            {
              key: 'link',
              label: 'Link URL (Optional)',
              type: 'url',
              placeholder: '/page or https://example.com'
            },
            {
              key: 'category',
              label: 'Category Tag (Optional)',
              type: 'text',
              placeholder: 'Web Development, Design, etc.'
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
      title: 'Our Portfolio',
      subtitle: 'Recent projects and case studies',
      backgroundColor: 'bg-background',
      gridColumns: '3',
      cardStyle: 'default',
      items: [
        {
          title: 'E-Commerce Platform',
          description: 'Modern online shopping platform with advanced features',
          image: '/images/portfolio/ecommerce.jpg',
          link: '/portfolio/ecommerce-platform',
          category: 'Web Development'
        },
        {
          title: 'Mobile Banking App',
          description: 'Secure and user-friendly mobile banking solution',
          image: '/images/portfolio/banking.jpg',
          link: '/portfolio/mobile-banking',
          category: 'Mobile App'
        },
        {
          title: 'Restaurant POS System',
          description: 'Complete point-of-sale system for restaurants',
          image: '/images/portfolio/pos.jpg',
          link: '/portfolio/restaurant-pos',
          category: 'POS System'
        },
        {
          title: 'Healthcare Management',
          description: 'Hospital management system with patient records',
          image: '/images/portfolio/healthcare.jpg',
          link: '/portfolio/healthcare-system',
          category: 'Healthcare'
        },
        {
          title: 'Real Estate Portal',
          description: 'Property listing and management platform',
          image: '/images/portfolio/realestate.jpg',
          link: '/portfolio/real-estate-portal',
          category: 'Web Portal'
        },
        {
          title: 'Inventory Management',
          description: 'Advanced inventory tracking and management system',
          image: '/images/portfolio/inventory.jpg',
          link: '/portfolio/inventory-system',
          category: 'ERP System'
        }
      ]
    }
  }

  /**
   * Enhanced validation for CardGrid
   */
  validateData(data: WidgetData) {
    const baseValidation = super.validateData(data)
    const errors = [...baseValidation.errors]

    // Validate grid columns
    if (!data.gridColumns || !['2', '3', '4', '6'].includes(data.gridColumns)) {
      errors.push('Grid columns must be 2, 3, 4, or 6')
    }

    // Validate items array
    if (!data.items || !Array.isArray(data.items)) {
      errors.push('Items array is required')
    } else if (data.items.length === 0) {
      errors.push('At least one grid item is required')
    } else if (data.items.length > 12) {
      errors.push('Maximum 12 grid items allowed')
    } else {
      // Validate each item
      data.items.forEach((item: any, index: number) => {
        if (!item.title) {
          errors.push(`Grid item ${index + 1}: Title is required`)
        }
        if (!item.description) {
          errors.push(`Grid item ${index + 1}: Description is required`)
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
   * Transform data with proper structure
   */
  protected transformData(data: WidgetData, context?: RenderContext): WidgetData {
    const transformed = super.transformData(data, context)

    // Ensure grid configuration
    transformed.gridColumns = transformed.gridColumns || '3'
    transformed.cardStyle = transformed.cardStyle || 'default'

    // Process items
    if (transformed.items && Array.isArray(transformed.items)) {
      transformed.items = transformed.items.map((item: any) => ({
        ...item,
        // Ensure image fallback
        image: item.image || '/images/placeholder-card.jpg'
      }))
    }

    return transformed
  }

  /**
   * Check if widget supports specific features
   */
  protected supportsFeature(feature: string): boolean {
    const supportedFeatures = ['images', 'links', 'categories', 'responsive', 'grid']
    return supportedFeatures.includes(feature) || super.supportsFeature(feature)
  }
}