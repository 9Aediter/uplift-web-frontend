import React from 'react'
import { BaseCardWidget } from '../base/BaseCardWidget'
import { WidgetConfig, WidgetData, RenderContext } from '../../core/types'

/**
 * Card List Widget - Display content in vertical list layout
 * Perfect for blog posts, news articles, or timeline displays
 */
export class CardListWidget extends BaseCardWidget {
  readonly id = 'card-list'
  readonly name = 'Card List'
  readonly description = 'Vertical list layout for displaying cards with detailed content'
  readonly version = '1.0.0'
  protected tags = ['cards', 'list', 'blog', 'news', 'timeline']

  /**
   * Render the CardList component
   */
  render(data: WidgetData, context?: RenderContext): React.ComponentType<any> {
    try {
      const { CardListComponent } = require('./CardList.component')
      
      if (!CardListComponent) {
        console.error('🚫 [CARD LIST] CardListComponent is undefined after require')
        return this.renderSkeleton()
      }
      
      return function CardListRenderer() {
        return React.createElement(CardListComponent, {
          ...data,
          context
        })
      }
    } catch (error) {
      console.error('🚫 [CARD LIST] Failed to require CardList component:', error)
      return this.renderSkeleton()
    }
  }

  /**
   * Render the skeleton loading state
   */
  renderSkeleton(): React.ComponentType {
    const { CardListSkeleton } = require('./CardList.skeleton')
    return CardListSkeleton
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
      maxItems: 10,
      fields: [
        ...this.getCommonCardFields(),
        {
          key: 'layout',
          label: 'List Layout',
          type: 'select',
          required: true,
          options: [
            { value: 'horizontal', label: 'Horizontal (Image + Content)' },
            { value: 'vertical', label: 'Vertical (Stacked)' },
            { value: 'minimal', label: 'Minimal (Text Only)' }
          ],
          defaultValue: 'horizontal'
        },
        {
          key: 'showDate',
          label: 'Show Date',
          type: 'select',
          options: [
            { value: 'true', label: 'Show Date' },
            { value: 'false', label: 'Hide Date' }
          ],
          defaultValue: 'true'
        },
        {
          key: 'items',
          label: 'List Items',
          type: 'array',
          maxItems: 10,
          fields: [
            {
              key: 'title',
              label: 'Item Title',
              type: 'text',
              required: true,
              placeholder: 'Article or post title'
            },
            {
              key: 'description',
              label: 'Description',
              type: 'textarea',
              required: true,
              placeholder: 'Brief description or excerpt'
            },
            {
              key: 'content',
              label: 'Full Content (Optional)',
              type: 'textarea',
              placeholder: 'Additional content details'
            },
            {
              key: 'image',
              label: 'Featured Image',
              type: 'image',
              placeholder: 'Image URL'
            },
            {
              key: 'date',
              label: 'Date',
              type: 'text',
              placeholder: 'March 15, 2024'
            },
            {
              key: 'author',
              label: 'Author (Optional)',
              type: 'text',
              placeholder: 'John Doe'
            },
            {
              key: 'category',
              label: 'Category (Optional)',
              type: 'text',
              placeholder: 'Technology, Business, etc.'
            },
            {
              key: 'link',
              label: 'Read More Link (Optional)',
              type: 'url',
              placeholder: '/blog/article-slug or https://example.com'
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
      title: 'Latest News',
      subtitle: 'Stay updated with our recent articles and announcements',
      backgroundColor: 'bg-background',
      layout: 'horizontal',
      showDate: true,
      items: [
        {
          title: 'Building Modern ERP Systems in 2024',
          description: 'Comprehensive guide to developing scalable enterprise resource planning systems using modern technology stack.',
          content: 'Learn about the latest trends, best practices, and technologies for building robust ERP systems.',
          image: '/images/blog/erp-modern.jpg',
          date: 'March 15, 2024',
          author: 'Uplift Team',
          category: 'Technology',
          link: '/blog/building-modern-erp-systems'
        },
        {
          title: 'The Future of Point-of-Sale Technology',
          description: 'Exploring how AI and cloud computing are revolutionizing retail POS systems.',
          content: 'Discover upcoming trends in POS technology and how they will impact retail businesses.',
          image: '/images/blog/pos-future.jpg',
          date: 'March 10, 2024',
          author: 'Tech Team',
          category: 'Business',
          link: '/blog/future-of-pos-technology'
        },
        {
          title: 'Digital Transformation Success Stories',
          description: 'Real-world examples of businesses that successfully transformed their operations.',
          content: 'Case studies and lessons learned from successful digital transformation projects.',
          image: '/images/blog/digital-transformation.jpg',
          date: 'March 5, 2024',
          author: 'Strategy Team',
          category: 'Case Study',
          link: '/blog/digital-transformation-success'
        }
      ]
    }
  }

  /**
   * Enhanced validation for CardList
   */
  validateData(data: WidgetData) {
    const baseValidation = super.validateData(data)
    const errors = [...baseValidation.errors]

    // Validate layout
    if (!data.layout || !['horizontal', 'vertical', 'minimal'].includes(data.layout)) {
      errors.push('Layout must be horizontal, vertical, or minimal')
    }

    // Validate items array
    if (!data.items || !Array.isArray(data.items)) {
      errors.push('Items array is required')
    } else if (data.items.length === 0) {
      errors.push('At least one list item is required')
    } else if (data.items.length > 10) {
      errors.push('Maximum 10 list items allowed')
    } else {
      // Validate each item
      data.items.forEach((item: any, index: number) => {
        if (!item.title) {
          errors.push(`List item ${index + 1}: Title is required`)
        }
        if (!item.description) {
          errors.push(`List item ${index + 1}: Description is required`)
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

    // Ensure layout configuration
    transformed.layout = transformed.layout || 'horizontal'
    transformed.showDate = transformed.showDate !== false

    // Process items
    if (transformed.items && Array.isArray(transformed.items)) {
      transformed.items = transformed.items.map((item: any) => ({
        ...item,
        // Ensure image fallback
        image: item.image || '/images/placeholder-article.jpg',
        // Format date if not provided
        date: item.date || new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      }))
    }

    return transformed
  }

  /**
   * Check if widget supports specific features
   */
  protected supportsFeature(feature: string): boolean {
    const supportedFeatures = ['images', 'links', 'dates', 'authors', 'categories', 'responsive']
    return supportedFeatures.includes(feature) || super.supportsFeature(feature)
  }
}