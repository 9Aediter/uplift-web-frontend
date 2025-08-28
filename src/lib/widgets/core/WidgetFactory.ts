import React from 'react'
import { BaseWidget } from './BaseWidget'
import { WidgetRegistry } from './WidgetRegistry'
import { WidgetData, RenderContext, SectionData } from './types'

/**
 * Widget Factory - Factory pattern for creating and rendering widgets
 * Provides a clean interface for widget instantiation and rendering
 */
export class WidgetFactory {
  /**
   * Create a widget instance by type
   */
  static create(widgetType: string): BaseWidget | null {
    try {
      const registry = WidgetRegistry.getInstance()
      const widget = registry.get(widgetType)
      return widget || null
    } catch (error) {
      console.error(`Failed to create widget of type '${widgetType}':`, error)
      return null
    }
  }

  /**
   * Create a widget instance (throws if not found)
   */
  static createRequired(widgetType: string): BaseWidget {
    const widget = this.create(widgetType)
    if (!widget) {
      throw new Error(`Widget type '${widgetType}' not found or failed to create`)
    }
    return widget
  }

  /**
   * Render a widget component
   */
  static render(
    widgetType: string, 
    data: WidgetData, 
    context?: RenderContext
  ): React.ComponentType<any> | null {
    try {
      console.log(`🎨 [WIDGET FACTORY] Rendering widget: ${widgetType}`)
      console.log(`🎨 [WIDGET FACTORY] Data keys:`, Object.keys(data))
      
      const widget = this.create(widgetType)
      if (!widget) {
        console.error(`❌ Cannot render widget: type '${widgetType}' not found`)
        return null
      }

      console.log(`✅ [WIDGET FACTORY] Widget found: ${widget.name}`)

      // Validate data before rendering
      const validation = widget.validateData(data)
      if (!validation.isValid) {
        console.warn(`⚠️ Widget data validation failed for '${widgetType}':`, validation.errors)
        // Still attempt to render with invalid data in development
        if (process.env.NODE_ENV === 'production') {
          return null
        }
      }

      // Force preview mode for Storybook
      const renderContext = { ...context, isPreview: true }
      console.log(`🔄 [WIDGET FACTORY] Calling widget.render with context:`, renderContext)
      
      const result = widget.render(data, renderContext)
      
      if (!result) {
        console.error(`❌ [WIDGET FACTORY] Widget render returned null: ${widgetType}`)
        console.log(`🔧 [WIDGET FACTORY] Trying skeleton fallback...`)
        return widget.renderSkeleton()
      }

      console.log(`✅ [WIDGET FACTORY] Successfully rendered: ${widgetType}`)
      return result
    } catch (error) {
      console.error(`💥 [WIDGET FACTORY] Failed to render widget '${widgetType}':`, error)
      return null
    }
  }

  /**
   * Render a widget skeleton/loading state
   */
  static renderSkeleton(widgetType: string): React.ComponentType | null {
    try {
      const widget = this.create(widgetType)
      if (!widget) {
        return null
      }
      return widget.renderSkeleton()
    } catch (error) {
      console.error(`Failed to render skeleton for widget '${widgetType}':`, error)
      return null
    }
  }

  /**
   * Render a section (widget with metadata)
   */
  static renderSection(
    section: SectionData, 
    context?: RenderContext
  ): React.ComponentType<any> | null {
    if (!section.isActive) {
      return null
    }

    return this.render(section.widgetType, section.data, {
      ...context,
      sectionId: section.id
    })
  }

  /**
   * Render a section skeleton
   */
  static renderSectionSkeleton(section: SectionData): React.ComponentType | null {
    return this.renderSkeleton(section.widgetType)
  }

  /**
   * Check if a widget type is available
   */
  static isAvailable(widgetType: string): boolean {
    const registry = WidgetRegistry.getInstance()
    return registry.has(widgetType)
  }

  /**
   * Get all available widget types
   */
  static getAvailableTypes(): string[] {
    const registry = WidgetRegistry.getInstance()
    return registry.getAll().map(widget => widget.id)
  }

  /**
   * Get widget configuration for admin interface
   */
  static getConfig(widgetType: string) {
    const widget = this.create(widgetType)
    return widget?.getConfig() || null
  }

  /**
   * Get widget default data
   */
  static getDefaultData(widgetType: string): WidgetData | null {
    const widget = this.create(widgetType)
    return widget?.getDefaultData() || null
  }

  /**
   * Validate widget data
   */
  static validateData(widgetType: string, data: WidgetData) {
    const widget = this.create(widgetType)
    if (!widget) {
      return {
        isValid: false,
        errors: [`Widget type '${widgetType}' not found`]
      }
    }
    return widget.validateData(data)
  }

  /**
   * Get widget metadata
   */
  static getMetadata(widgetType: string) {
    const widget = this.create(widgetType)
    return widget?.getMetadata() || null
  }

  /**
   * Batch render multiple sections
   */
  static renderSections(
    sections: SectionData[], 
    context?: RenderContext
  ): Array<{ section: SectionData; component: React.ComponentType<any> | null }> {
    return sections
      .filter(section => section.isActive)
      .map(section => ({
        section,
        component: this.renderSection(section, context)
      }))
  }

  /**
   * Create widget instance with data validation
   */
  static createWithValidation(widgetType: string, data: WidgetData): {
    widget: BaseWidget | null;
    validation: { isValid: boolean; errors: string[] };
  } {
    const widget = this.create(widgetType)
    if (!widget) {
      return {
        widget: null,
        validation: { isValid: false, errors: [`Widget type '${widgetType}' not found`] }
      }
    }

    const validation = widget.validateData(data)
    return { widget, validation }
  }

  /**
   * Get registry statistics
   */
  static getStats() {
    const registry = WidgetRegistry.getInstance()
    return registry.getStats()
  }

  /**
   * Search widgets
   */
  static search(query: string) {
    const registry = WidgetRegistry.getInstance()
    return registry.search(query)
  }

  /**
   * Development helper: list all registered widgets
   */
  static listAll() {
    const registry = WidgetRegistry.getInstance()
    const widgets = registry.getAll()
    console.table(
      widgets.map(widget => ({
        id: widget.id,
        name: widget.name,
        category: widget.category,
        version: widget.version
      }))
    )
    return widgets
  }
}