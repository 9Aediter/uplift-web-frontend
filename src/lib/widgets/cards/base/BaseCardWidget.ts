import React from 'react'
import { BaseWidget } from '../../core/BaseWidget'
import { WidgetData, RenderContext } from '../../core/types'

/**
 * Common card widget props interface
 */
export interface CardWidgetProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  className?: string
  [key: string]: any
}

/**
 * Base class for all card-type widgets
 * Provides common functionality for card widgets like containers, headers, etc.
 */
export abstract class BaseCardWidget extends BaseWidget {
  readonly category = 'cards' as const

  /**
   * Transform card data with common defaults
   */
  protected transformData(data: WidgetData, context?: RenderContext): WidgetData {
    const transformed = super.transformData(data, context)
    
    // Apply common card defaults
    return {
      backgroundColor: 'bg-background',
      className: '',
      ...transformed
    }
  }

  /**
   * Render card container wrapper
   */
  protected createCardContainer(
    children: React.ReactNode,
    props: {
      backgroundColor?: string
      className?: string
      id?: string
    } = {}
  ): React.ComponentType {
    const { backgroundColor = 'bg-background', className = '', id } = props

    return function CardContainer() {
      return React.createElement(
        'section',
        {
          className: `${backgroundColor} py-16 md:py-24 ${className}`.trim(),
          id
        },
        children
      )
    }
  }

  /**
   * Render card header section
   */
  protected createCardHeader(
    title?: string,
    subtitle?: string,
    className: string = 'text-center mb-12 md:mb-16'
  ): React.ComponentType | null {
    if (!title && !subtitle) return null

    return function CardHeader() {
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
              { className: 'bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent' },
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
   * Create responsive grid container
   */
  protected createGridContainer(
    children: React.ReactNode,
    gridClasses: string = 'grid gap-6'
  ): React.ComponentType {
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
   * Create individual card component
   */
  protected createCard(
    content: React.ReactNode,
    props: {
      className?: string
      onClick?: () => void
      hover?: boolean
    } = {}
  ): React.ComponentType {
    const { 
      className = 'bg-card border border-border rounded-lg p-6', 
      onClick,
      hover = true 
    } = props

    const hoverClass = hover ? 'hover:shadow-lg hover:scale-105 transition-all duration-300' : ''

    return function Card() {
      return React.createElement(
        'div',
        {
          className: `${className} ${hoverClass}`.trim(),
          onClick
        },
        content
      )
    }
  }

  /**
   * Common validation for card widgets
   */
  protected validateCardData(data: WidgetData): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Common card validations
    if (data.title && typeof data.title !== 'string') {
      errors.push('Title must be a string')
    }

    if (data.subtitle && typeof data.subtitle !== 'string') {
      errors.push('Subtitle must be a string')
    }

    if (data.backgroundColor && typeof data.backgroundColor !== 'string') {
      errors.push('Background color must be a string')
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
   * Get common card widget configuration fields
   */
  protected getCommonCardFields() {
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
          { value: 'bg-black', label: 'Black' },
          { value: 'bg-gray-900', label: 'Dark Gray' },
          { value: 'bg-gradient-to-b from-background to-gray-900', label: 'Dark Gradient' },
          { value: 'bg-gradient-to-r from-blue-900 to-purple-900', label: 'Blue Purple Gradient' }
        ],
        defaultValue: 'bg-background'
      }
    ]
  }

  /**
   * Enhanced validation that includes card-specific checks
   */
  validateData(data: WidgetData) {
    const baseValidation = super.validateData(data)
    const cardValidation = this.validateCardData(data)

    return {
      isValid: baseValidation.isValid && cardValidation.isValid,
      errors: [...baseValidation.errors, ...cardValidation.errors],
      warnings: baseValidation.warnings
    }
  }

  /**
   * Check if widget supports responsive design
   */
  protected supportsFeature(feature: string): boolean {
    const supportedFeatures = ['responsive', 'darkMode', 'customColors']
    return supportedFeatures.includes(feature) || super.supportsFeature(feature)
  }
}