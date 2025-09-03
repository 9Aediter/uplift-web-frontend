import { BaseWidget } from './BaseWidget'
import { WidgetCategory, WidgetMetadata } from './types'

/**
 * Widget Registry - Singleton pattern for managing widget instances
 * Provides centralized widget management and lookup functionality
 */
export class WidgetRegistry {
  private static instance: WidgetRegistry
  private widgets: Map<string, BaseWidget> = new Map()
  private widgetsByCategory: Map<WidgetCategory, BaseWidget[]> = new Map()

  private constructor() {
    // Initialize category maps
    const categories: WidgetCategory[] = ['cards', 'carousel', 'tabs', 'hero', 'content', 'interactive', 'grid']
    categories.forEach(category => {
      this.widgetsByCategory.set(category, [])
    })
  }

  /**
   * Get the singleton instance of WidgetRegistry
   */
  static getInstance(): WidgetRegistry {
    if (!WidgetRegistry.instance) {
      WidgetRegistry.instance = new WidgetRegistry()
    }
    return WidgetRegistry.instance
  }

  /**
   * Register a widget instance
   */
  register(widget: BaseWidget): void {
    if (this.widgets.has(widget.id)) {
      console.warn(`Widget with id '${widget.id}' is already registered. Overwriting...`)
    }

    this.widgets.set(widget.id, widget)
    
    // Add to category map
    const categoryWidgets = this.widgetsByCategory.get(widget.category) || []
    const existingIndex = categoryWidgets.findIndex(w => w.id === widget.id)
    
    if (existingIndex >= 0) {
      categoryWidgets[existingIndex] = widget
    } else {
      categoryWidgets.push(widget)
    }
    
    this.widgetsByCategory.set(widget.category, categoryWidgets)

    console.log(`Widget '${widget.name}' (${widget.id}) registered successfully`)
  }

  /**
   * Register multiple widgets at once
   */
  registerMany(widgets: BaseWidget[]): void {
    widgets.forEach(widget => this.register(widget))
  }

  /**
   * Get a widget by its ID
   */
  get(widgetId: string): BaseWidget | undefined {
    return this.widgets.get(widgetId)
  }

  /**
   * Get a widget by its ID (throws if not found)
   */
  getRequired(widgetId: string): BaseWidget {
    const widget = this.get(widgetId)
    if (!widget) {
      throw new Error(`Widget with id '${widgetId}' not found in registry`)
    }
    return widget
  }

  /**
   * Check if a widget exists
   */
  has(widgetId: string): boolean {
    return this.widgets.has(widgetId)
  }

  /**
   * Get all registered widgets
   */
  getAll(): BaseWidget[] {
    return Array.from(this.widgets.values())
  }

  /**
   * Get widgets by category
   */
  getByCategory(category: WidgetCategory): BaseWidget[] {
    return this.widgetsByCategory.get(category) || []
  }

  /**
   * Get all widget categories that have registered widgets
   */
  getAvailableCategories(): WidgetCategory[] {
    return Array.from(this.widgetsByCategory.entries())
      .filter(([_, widgets]) => widgets.length > 0)
      .map(([category, _]) => category)
  }

  /**
   * Get widget metadata for admin interface
   */
  getAllMetadata(): WidgetMetadata[] {
    return this.getAll().map(widget => widget.getMetadata())
  }

  /**
   * Get widget metadata by category
   */
  getMetadataByCategory(category: WidgetCategory): WidgetMetadata[] {
    return this.getByCategory(category).map(widget => widget.getMetadata())
  }

  /**
   * Search widgets by name or description
   */
  search(query: string): BaseWidget[] {
    const searchTerm = query.toLowerCase()
    return this.getAll().filter(widget => 
      widget.name.toLowerCase().includes(searchTerm) ||
      widget.description.toLowerCase().includes(searchTerm) ||
      widget.getTags().some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }

  /**
   * Get widgets by tag
   */
  getByTag(tag: string): BaseWidget[] {
    return this.getAll().filter(widget => 
      widget.getTags().includes(tag)
    )
  }

  /**
   * Unregister a widget
   */
  unregister(widgetId: string): boolean {
    const widget = this.get(widgetId)
    if (!widget) {
      return false
    }

    // Remove from main registry
    this.widgets.delete(widgetId)

    // Remove from category registry
    const categoryWidgets = this.widgetsByCategory.get(widget.category) || []
    const filteredWidgets = categoryWidgets.filter(w => w.id !== widgetId)
    this.widgetsByCategory.set(widget.category, filteredWidgets)

    console.log(`Widget '${widget.name}' (${widgetId}) unregistered successfully`)
    return true
  }

  /**
   * Clear all registered widgets
   */
  clear(): void {
    this.widgets.clear()
    this.widgetsByCategory.forEach((_, category) => {
      this.widgetsByCategory.set(category, [])
    })
    console.log('Widget registry cleared')
  }

  /**
   * Get registry statistics
   */
  getStats(): { total: number; byCategory: Record<string, number> } {
    const byCategory: Record<string, number> = {}
    
    this.widgetsByCategory.forEach((widgets, category) => {
      byCategory[category] = widgets.length
    })

    return {
      total: this.widgets.size,
      byCategory
    }
  }

  /**
   * Validate registry integrity
   */
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Check for duplicate IDs
    const ids = new Set<string>()
    this.getAll().forEach(widget => {
      if (ids.has(widget.id)) {
        errors.push(`Duplicate widget ID: ${widget.id}`)
      } else {
        ids.add(widget.id)
      }
    })

    // Check category consistency
    this.widgetsByCategory.forEach((widgets, category) => {
      widgets.forEach(widget => {
        if (widget.category !== category) {
          errors.push(`Widget ${widget.id} has category ${widget.category} but is registered under ${category}`)
        }
      })
    })

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}

// Use WidgetRegistry.getInstance() instead of direct export