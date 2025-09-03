// Widget Registry - Register all widgets here
import { WidgetRegistry } from './core/WidgetRegistry'

// Import widgets
import { SingleCardWidget } from './cards/SingleCard/SingleCard.widget'
import { ThreeColumnCardsWidget } from './cards/ThreeColumnCards/ThreeColumnCards.widget'
import { FourColumnCardsWidget } from './cards/FourColumnCards/FourColumnCards.widget'
import { CardListWidget } from './cards/CardList/CardList.widget'
import { CardGridWidget } from './cards/CardGrid/CardGrid.widget'
import { ProblemsCardsWidget } from './cards/ProblemsCards/ProblemsCards.widget'
import { SolutionGridWidget } from './grid/SolutionGrid/SolutionGrid.widget'

/**
 * Initialize and register all widgets
 * This must be called before using any widgets
 */
export function initializeWidgets(): void {
  const registry = WidgetRegistry.getInstance()
  
  // Register Card Widgets
  registry.register(new SingleCardWidget())
  registry.register(new ThreeColumnCardsWidget())
  registry.register(new FourColumnCardsWidget())
  registry.register(new CardListWidget())
  registry.register(new CardGridWidget())
  registry.register(new ProblemsCardsWidget())

  // Register Grid Widgets
  registry.register(new SolutionGridWidget())
}

/**
 * Get the widget registry instance
 * Ensures widgets are initialized
 */
export function getWidgetRegistry(): WidgetRegistry {
  const registry = WidgetRegistry.getInstance()
  
  // Auto-initialize if no widgets are registered
  if (registry.getAll().length === 0) {
    initializeWidgets()
  }
  
  return registry
}

// Export core types and classes for external use
export { WidgetRegistry } from './core/WidgetRegistry'
export { WidgetFactory } from './core/WidgetFactory'
export { BaseWidget } from './core/BaseWidget'
export { BaseCardWidget } from './cards/base/BaseCardWidget'
export { BaseGridWidget } from './grid/base/BaseGridWidget'

// Export types
export type {
  WidgetCategory,
  WidgetConfig,
  WidgetData,
  WidgetMetadata,
  RenderContext,
  ValidationResult,
  SectionData,
  FieldDefinition
} from './core/types'

// Initialize widgets on module load (always in browser)
if (typeof window !== 'undefined') {
  try {
    initializeWidgets()
    console.log('🎨 [WIDGET SYSTEM] Widgets initialized successfully')
  } catch (error) {
    console.error('🚫 [WIDGET SYSTEM] Failed to initialize widgets:', error)
  }
}

// Initialize Hero Widget System (only on client side to avoid SSR issues)
if (typeof window !== 'undefined') {
  import('@/lib/widgets/hero').then(() => {
    console.log('🦸 [WIDGET SYSTEM] Hero widgets loaded successfully')
  }).catch((error) => {
    console.error('🚫 [WIDGET SYSTEM] Failed to load hero widgets:', error)
  })
}