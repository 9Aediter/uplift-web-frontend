import React from 'react'
import { BaseCardWidget } from '../base/BaseCardWidget'
import { WidgetConfig, WidgetData, RenderContext } from '../../core/types'

/**
 * Problems Cards Widget - Display business problems in card format
 * Perfect for showcasing challenges and their impact
 */
export class ProblemsCardsWidget extends BaseCardWidget {
  readonly id = 'problems-cards'
  readonly name = 'Problems Cards'
  readonly description = 'Display business problems and challenges in an attractive card grid layout'
  readonly version = '1.0.0'
  protected tags = ['problems', 'challenges', 'business', 'grid', 'cards']

  /**
   * Render the ProblemsCards component (CLIENT-SIDE for admin preview)
   */
  render(data: WidgetData, context?: RenderContext): React.ComponentType<any> {
    try {
      const { ProblemsCardsComponent } = require('./ProblemsCards.component')
      
      if (!ProblemsCardsComponent) {
        console.error('🚫 [PROBLEMS CARDS] ProblemsCardsComponent is undefined after require')
        return this.renderSkeleton()
      }
      
      return function ProblemsCardsRenderer() {
        return React.createElement(ProblemsCardsComponent, {
          ...data,
          context
        })
      }
    } catch (error) {
      console.error('🚫 [PROBLEMS CARDS] Failed to require ProblemsCards component:', error)
      return this.renderSkeleton()
    }
  }

  /**
   * Render the skeleton loading state (Client-side + Admin preview)
   */
  renderSkeleton(): React.ComponentType {
    try {
      const { ProblemsCardsSkeleton } = require('./ProblemsCards.skeleton')
      return ProblemsCardsSkeleton
    } catch (error) {
      console.error('🚫 [PROBLEMS CARDS] Failed to render skeleton:', error)
      // Fallback basic skeleton
      return () => React.createElement('div', {
        className: 'py-16 bg-gradient-to-b from-amber-50/50 to-yellow-50/50 animate-pulse'
      }, React.createElement('div', {
        className: 'max-w-7xl mx-auto px-4'
      }, React.createElement('div', {
        className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
      }, Array(4).fill(0).map((_, i) => 
        React.createElement('div', {
          key: i,
          className: 'h-64 bg-gray-200 rounded-lg'
        })
      ))))
    }
  }

  /**
   * MANDATORY: Render ProblemsCards for SSR (PRODUCTION - uses SSR component)
   */
  renderSSR(data: WidgetData, context?: RenderContext): React.ComponentType<any> {
    try {
      const { ProblemsCardsSSR } = require('./ProblemsCards.ssr')
      
      return function ProblemsCardsSSRRenderer() {
        return React.createElement(ProblemsCardsSSR, {
          ...data,
          context
        })
      }
    } catch (error) {
      console.error('🚫 [PROBLEMS CARDS] Failed to load SSR component:', error)
      return this.renderSkeletonSSR()
    }
  }

  /**
   * MANDATORY: Render skeleton for SSR (PRODUCTION - SSR safe)
   */
  renderSkeletonSSR(): React.ComponentType {
    return () => React.createElement('div', {
      className: 'py-16 bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-yellow-50/50 dark:from-black dark:via-black dark:to-black'
    }, React.createElement('div', {
      className: 'max-w-7xl mx-auto px-4'
    }, React.createElement('div', {
      className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
    }, Array(4).fill(0).map((_, i) => 
      React.createElement('div', {
        key: i,
        className: 'h-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse'
      })
    ))))
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
      fields: [
        {
          key: 'title',
          label: 'Section Title',
          type: 'text',
          placeholder: 'Business Challenges',
          defaultValue: 'Business Challenges'
        },
        {
          key: 'subtitle',
          label: 'Section Subtitle',
          type: 'textarea',
          placeholder: 'Common problems that slow down modern businesses',
          defaultValue: 'Common problems that slow down modern businesses and how technology can solve them'
        },
        ...this.getCommonCardFields(),
        {
          key: 'items',
          label: 'Problem Items',
          type: 'array',
          maxItems: 8,
          fields: [
            {
              key: 'title',
              label: 'Problem Title',
              type: 'text',
              required: true,
              placeholder: 'Slow Manual Processes'
            },
            {
              key: 'description',
              label: 'Problem Description',
              type: 'textarea',
              required: true,
              placeholder: 'Detailed description of the business problem'
            },
            {
              key: 'icon',
              label: 'Problem Icon',
              type: 'text',
              required: true,
              placeholder: '⚙️ (emoji or icon name)',
              defaultValue: '⚙️'
            },
            {
              key: 'gradient',
              label: 'Card Gradient',
              type: 'select',
              options: [
                { value: 'from-red-500 via-red-400 to-orange-500', label: 'Red Orange' },
                { value: 'from-blue-500 via-blue-400 to-cyan-500', label: 'Blue Cyan' },
                { value: 'from-purple-500 via-purple-400 to-pink-500', label: 'Purple Pink' },
                { value: 'from-green-500 via-green-400 to-emerald-500', label: 'Green Emerald' },
                { value: 'from-yellow-500 via-yellow-400 to-amber-500', label: 'Yellow Amber' },
                { value: 'from-indigo-500 via-indigo-400 to-blue-500', label: 'Indigo Blue' }
              ],
              defaultValue: 'from-red-500 via-red-400 to-orange-500'
            },
            {
              key: 'impact',
              label: 'Impact Statement',
              type: 'text',
              placeholder: '85% Time Loss',
              defaultValue: '85% Time Loss'
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
      backgroundColor: 'bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-yellow-50/50 dark:from-black dark:via-black dark:to-black',
      items: [
        {
          id: 1,
          title: 'Slow Manual Processes',
          description: 'Teams waste hours on repetitive tasks that could be automated, reducing productivity and increasing human error.',
          icon: '⚙️',
          gradient: 'from-red-500 via-red-400 to-orange-500',
          impact: '85% Time Loss'
        },
        {
          id: 2,
          title: 'Poor Data Insights',
          description: 'Critical business decisions are made with incomplete information due to scattered data and lack of analytics.',
          icon: '📊',
          gradient: 'from-blue-500 via-blue-400 to-cyan-500',
          impact: '60% Bad Decisions'
        },
        {
          id: 3,
          title: 'System Integration Issues',
          description: 'Different software tools don\'t communicate well, creating data silos and workflow bottlenecks.',
          icon: '🔗',
          gradient: 'from-purple-500 via-purple-400 to-pink-500',
          impact: '40% Efficiency Drop'
        },
        {
          id: 4,
          title: 'Scalability Limitations',
          description: 'Current systems can\'t handle business growth, leading to crashes, slowdowns, and lost opportunities.',
          icon: '🚀',
          gradient: 'from-green-500 via-green-400 to-emerald-500',
          impact: '30% Growth Blocked'
        }
      ]
    }
  }

  /**
   * Enhanced validation for ProblemsCards specific requirements
   */
  validateData(data: WidgetData) {
    const baseValidation = super.validateData(data)
    const errors = [...baseValidation.errors]

    // Validate items array
    if (!data.items || !Array.isArray(data.items)) {
      errors.push('Items array is required')
    } else {
      data.items.forEach((item: any, index: number) => {
        if (!item.title || typeof item.title !== 'string') {
          errors.push(`Item ${index + 1} must have a valid title`)
        }
        if (!item.description || typeof item.description !== 'string') {
          errors.push(`Item ${index + 1} must have a valid description`)
        }
        if (!item.icon || typeof item.icon !== 'string') {
          errors.push(`Item ${index + 1} must have a valid icon`)
        }
        if (!item.gradient || typeof item.gradient !== 'string') {
          errors.push(`Item ${index + 1} must have a valid gradient`)
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
   * Check if widget supports specific features
   */
  protected supportsFeature(feature: string): boolean {
    const supportedFeatures = ['animations', 'gradients', 'icons', 'responsive']
    return supportedFeatures.includes(feature) || super.supportsFeature(feature)
  }
}