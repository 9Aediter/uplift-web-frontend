// Hero Widget System
export { BaseHeroWidget, type HeroData } from './BaseHeroWidget'
export { HeroRegistry, heroRegistry, getHeroRegistry } from './HeroRegistry'

// Import registry first
import { heroRegistry } from './HeroRegistry'

// Import and register all hero widgets
import { HeroAIWidget } from './HeroAI/HeroAI.widget'
import { SimpleHeroWidget } from './SimpleHero/SimpleHero.widget'

console.log('🦸 [HERO SYSTEM] Initializing Hero Widget System...')

// Register all hero widgets
try {
  heroRegistry.register(new HeroAIWidget())
  heroRegistry.register(new SimpleHeroWidget())
  console.log('🦸 [HERO SYSTEM] Hero widgets registered:', heroRegistry.getMetadata())
} catch (error) {
  console.error('🚫 [HERO SYSTEM] Failed to register hero widgets:', error)
}

// Export registered widgets for direct use
export { HeroAIWidget } from './HeroAI/HeroAI.widget'
export { SimpleHeroWidget } from './SimpleHero/SimpleHero.widget'