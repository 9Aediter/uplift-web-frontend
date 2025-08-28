import React from 'react'
import { WidgetConfig, WidgetMetadata, ValidationResult, WidgetData, RenderContext, WidgetCategory } from './types'

/**
 * Abstract base class for all widgets
 * Defines the contract that all widgets must implement
 */
export abstract class BaseWidget {
  // Abstract properties that must be implemented by subclasses
  abstract readonly id: string
  abstract readonly name: string
  abstract readonly category: WidgetCategory
  abstract readonly description: string
  abstract readonly version: string

  // Optional properties with defaults
  protected author?: string = 'Uplift Technology'
  protected tags: string[] = []
  protected preview?: string

  /**
   * Abstract methods that must be implemented by subclasses
   */
  
  // Render the main widget component (CLIENT-SIDE for admin preview only)
  abstract render(data: WidgetData, context?: RenderContext): React.ComponentType<any>
  
  // Render the skeleton/loading state (CLIENT-SIDE)
  abstract renderSkeleton(): React.ComponentType
  
  // Get the configuration schema for the admin interface
  abstract getConfig(): WidgetConfig
  
  // Get default data for new instances
  abstract getDefaultData(): WidgetData

  /**
   * SSR methods with fallback to client-side versions
   */
  
  // Render widget for SSR (PRODUCTION - fallback to client version)
  renderSSR(data: WidgetData, context?: RenderContext): React.ComponentType<any> {
    // Default fallback: use client render with preview mode to disable animations
    return this.render(data, { ...context, isPreview: true })
  }
  
  // Render skeleton for SSR (PRODUCTION - fallback to client version)
  renderSkeletonSSR(): React.ComponentType {
    // Default fallback: use client skeleton
    return this.renderSkeleton()
  }

  /**
   * Concrete methods with default implementations
   */
  
  // Get widget metadata
  getMetadata(): WidgetMetadata {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      description: this.description,
      version: this.version,
      author: this.author,
      tags: this.tags,
      preview: this.preview
    }
  }

  // Validate widget data
  validateData(data: WidgetData): ValidationResult {
    const config = this.getConfig()
    const errors: string[] = []
    const warnings: string[] = []

    // Validate required fields
    config.fields.forEach(field => {
      if (field.required && (!data[field.key] || data[field.key] === '')) {
        errors.push(`${field.label} is required`)
      }

      // Validate array fields
      if (field.type === 'array' && data[field.key]) {
        const arrayData = data[field.key]
        if (field.maxItems && Array.isArray(arrayData) && arrayData.length > field.maxItems) {
          errors.push(`${field.label} cannot have more than ${field.maxItems} items`)
        }

        // Validate array item fields
        if (field.fields && Array.isArray(arrayData)) {
          arrayData.forEach((item, index) => {
            field.fields!.forEach(subField => {
              if (subField.required && (!item[subField.key] || item[subField.key] === '')) {
                errors.push(`${field.label}[${index}].${subField.label} is required`)
              }
            })
          })
        }
      }

      // URL validation
      if (field.type === 'url' && data[field.key]) {
        const url = data[field.key]
        if (typeof url === 'string' && url.trim() !== '') {
          try {
            // Allow relative URLs or valid absolute URLs
            if (!url.startsWith('/') && !url.startsWith('http://') && !url.startsWith('https://')) {
              warnings.push(`${field.label} should be a valid URL or start with /`)
            }
          } catch {
            errors.push(`${field.label} must be a valid URL`)
          }
        }
      }
    })

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  }

  // Transform data before rendering (override if needed)
  protected transformData(data: WidgetData, context?: RenderContext): WidgetData {
    return data
  }

  // Check if widget supports a specific feature
  protected supportsFeature(feature: string): boolean {
    return false
  }

  // Get widget display name for admin interface
  getDisplayName(): string {
    return this.name
  }

  // Get widget description for admin interface
  getDescription(): string {
    return this.description
  }

  // Check if widget is available in current context
  isAvailable(context?: RenderContext): boolean {
    return true
  }

  // Get widget category for filtering
  getCategory(): WidgetCategory {
    return this.category
  }

  // Get widget version
  getVersion(): string {
    return this.version
  }

  // Get widget tags for searching/filtering
  getTags(): string[] {
    return this.tags
  }

  // Clone widget with new data
  clone(data: WidgetData): BaseWidget {
    const cloned = Object.create(Object.getPrototypeOf(this))
    Object.assign(cloned, this)
    return cloned
  }

  // Serialize widget data for storage
  serialize(data: WidgetData): string {
    return JSON.stringify({
      widgetType: this.id,
      version: this.version,
      data: this.transformData(data)
    })
  }

  // Deserialize widget data from storage
  static deserialize(serializedData: string): { widgetType: string; version: string; data: WidgetData } {
    try {
      return JSON.parse(serializedData)
    } catch (error) {
      throw new Error('Invalid serialized widget data')
    }
  }
}