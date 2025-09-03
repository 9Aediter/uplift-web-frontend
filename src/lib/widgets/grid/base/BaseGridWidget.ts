import React from 'react'
import { BaseWidget } from '../../core/BaseWidget'
import { WidgetData, RenderContext } from '../../core/types'

/**
 * Common grid widget props interface
 */
export interface GridWidgetProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  className?: string
  gridLayout?: 'bento' | 'uniform' | 'masonry'
  columns?: number
  gap?: number
  [key: string]: any
}

/**
 * Base class for all grid-type widgets
 * Provides common functionality for grid widgets like layouts, spacing, etc.
 */
export abstract class BaseGridWidget extends BaseWidget {
  readonly category = 'grid' as const

  /**
   * Transform grid data with common defaults
   */
  protected transformData(data: WidgetData, context?: RenderContext): WidgetData {
    const transformed = super.transformData(data, context)
    
    // Apply common grid defaults
    return {
      backgroundColor: 'bg-background',
      className: '',
      gridLayout: 'bento',
      columns: 3,
      gap: 6,
      ...transformed
    }
  }

  /**
   * Create responsive grid container
   */
  protected createGridContainer(
    children: React.ReactNode,
    layout: string = 'bento',
    columns: number = 3,
    gap: number = 6
  ): React.ComponentType {
    const gridClasses = this.getGridClasses(layout, columns, gap)
    
    return function GridContainer() {
      return React.createElement(
        'div',
        { className: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` },
        React.createElement(
          'div',
          { className: gridClasses },
          children
        )
      )
    }
  }

  /**
   * Get grid layout classes based on configuration
   */
  private getGridClasses(layout: string, columns: number, gap: number): string {
    const baseClasses = `grid gap-${gap}`
    
    switch (layout) {
      case 'bento':
        return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px]`
      case 'uniform':
        return `${baseClasses} grid-cols-1 md:grid-cols-${Math.min(columns, 2)} lg:grid-cols-${columns}`
      case 'masonry':
        return `${baseClasses} grid-cols-1 md:grid-cols-${Math.min(columns, 2)} lg:grid-cols-${columns} auto-rows-min`
      default:
        return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
    }
  }

  /**
   * Create grid header section
   */
  protected createGridHeader(
    title?: string,
    subtitle?: string,
    className: string = 'text-center mb-12 md:mb-16'
  ): React.ComponentType | null {
    if (!title && !subtitle) return null

    return function GridHeader() {
      return React.createElement(
        'div',
        { className },
        [
          title && React.createElement(
            'h2',
            { 
              key: 'title',
              className: 'text-3xl md:text-4xl lg:text-5xl font-bold mb-4' 
            },
            React.createElement(
              'span',
              { className: 'bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent' },
              title
            )
          ),
          subtitle && React.createElement(
            'p',
            { 
              key: 'subtitle',
              className: 'text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed' 
            },
            subtitle
          )
        ].filter(Boolean)
      )
    }
  }

  /**
   * Create individual grid item component
   */
  protected createGridItem(
    content: React.ReactNode,
    props: {
      className?: string
      onClick?: () => void
      hover?: boolean
      span?: string
    } = {}
  ): React.ComponentType {
    const { 
      className = 'bg-card border border-border rounded-lg p-6', 
      onClick,
      hover = true,
      span = 'col-span-1 row-span-1'
    } = props

    const hoverClass = hover ? 'hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer' : ''
    const fullClassName = `${className} ${span} ${hoverClass}`.trim()

    return function GridItem() {
      return React.createElement(
        'div',
        {
          className: fullClassName,
          onClick
        },
        content
      )
    }
  }

  /**
   * Common validation for grid widgets
   */
  protected validateGridData(data: WidgetData): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Common grid validations
    if (data.title && typeof data.title !== 'string') {
      errors.push('Title must be a string')
    }

    if (data.subtitle && typeof data.subtitle !== 'string') {
      errors.push('Subtitle must be a string')
    }

    if (data.columns && (typeof data.columns !== 'number' || data.columns < 1 || data.columns > 6)) {
      errors.push('Columns must be a number between 1 and 6')
    }

    if (data.gap && (typeof data.gap !== 'number' || data.gap < 0 || data.gap > 12)) {
      errors.push('Gap must be a number between 0 and 12')
    }

    // Validate items array if present
    if (data.items) {
      if (!Array.isArray(data.items)) {
        errors.push('Items must be an array')
      } else {
        data.items.forEach((item: any, index: number) => {
          if (!item || typeof item !== 'object') {
            errors.push(`Item ${index + 1} must be an object`)
          }
        })
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * Get common grid widget configuration fields
   */
  protected getCommonGridFields() {
    return [
      {
        key: 'title',
        label: 'Section Title',
        type: 'text' as const,
        placeholder: 'Enter section title'
      },
      {
        key: 'subtitle',
        label: 'Section Subtitle',
        type: 'textarea' as const,
        placeholder: 'Enter section subtitle or description'
      },
      {
        key: 'backgroundColor',
        label: 'Background Style',
        type: 'select' as const,
        options: [
          { value: 'bg-background', label: 'Default Background' },
          { value: 'bg-gradient-to-b from-background to-muted/30', label: 'Gradient Background' },
          { value: 'bg-muted/20', label: 'Light Muted' },
          { value: 'bg-gray-50 dark:bg-gray-900', label: 'Gray Background' }
        ],
        defaultValue: 'bg-gradient-to-b from-background to-muted/30'
      },
      {
        key: 'gridLayout',
        label: 'Grid Layout',
        type: 'select' as const,
        options: [
          { value: 'bento', label: 'Bento Grid (Varied sizes)' },
          { value: 'uniform', label: 'Uniform Grid' },
          { value: 'masonry', label: 'Masonry Layout' }
        ],
        defaultValue: 'bento'
      },
      {
        key: 'columns',
        label: 'Columns (for uniform grid)',
        type: 'select' as const,
        options: [
          { value: '2', label: '2 Columns' },
          { value: '3', label: '3 Columns' },
          { value: '4', label: '4 Columns' }
        ],
        defaultValue: '3'
      },
      {
        key: 'gap',
        label: 'Grid Gap',
        type: 'select' as const,
        options: [
          { value: '4', label: 'Small (16px)' },
          { value: '6', label: 'Medium (24px)' },
          { value: '8', label: 'Large (32px)' }
        ],
        defaultValue: '6'
      }
    ]
  }

  /**
   * Enhanced validation that includes grid-specific checks
   */
  validateData(data: WidgetData) {
    const baseValidation = super.validateData(data)
    const gridValidation = this.validateGridData(data)

    return {
      isValid: baseValidation.isValid && gridValidation.isValid,
      errors: [...baseValidation.errors, ...gridValidation.errors],
      warnings: baseValidation.warnings
    }
  }

  /**
   * Check if widget supports responsive design
   */
  protected supportsFeature(feature: string): boolean {
    const supportedFeatures = ['responsive', 'darkMode', 'customColors', 'gridLayout', 'interactivity']
    return supportedFeatures.includes(feature) || super.supportsFeature(feature)
  }
}