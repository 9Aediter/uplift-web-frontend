import { BaseHeroWidget } from './BaseHeroWidget'

export class HeroRegistry {
  private static instance: HeroRegistry
  private heroes: Map<string, BaseHeroWidget> = new Map()

  private constructor() {}

  static getInstance(): HeroRegistry {
    if (!HeroRegistry.instance) {
      HeroRegistry.instance = new HeroRegistry()
    }
    return HeroRegistry.instance
  }

  register(hero: BaseHeroWidget): void {
    console.log(`🦸 [HERO REGISTRY] Registering hero widget: ${hero.id} (${hero.name})`)
    this.heroes.set(hero.id, hero)
  }

  get(heroId: string): BaseHeroWidget | undefined {
    return this.heroes.get(heroId)
  }

  getAll(): BaseHeroWidget[] {
    return Array.from(this.heroes.values())
  }

  getByType(heroType: string): BaseHeroWidget[] {
    return this.getAll().filter(hero => hero.getHeroType() === heroType)
  }

  getAnimatedHeroes(): BaseHeroWidget[] {
    return this.getAll().filter(hero => hero.isAnimatedHero())
  }

  getStaticHeroes(): BaseHeroWidget[] {
    return this.getAll().filter(hero => !hero.isAnimatedHero())
  }

  search(query: string): BaseHeroWidget[] {
    const lowercaseQuery = query.toLowerCase()
    return this.getAll().filter(hero => 
      hero.name.toLowerCase().includes(lowercaseQuery) ||
      hero.description.toLowerCase().includes(lowercaseQuery) ||
      hero.getTags().some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  clear(): void {
    this.heroes.clear()
  }

  getMetadata() {
    return {
      totalHeroes: this.heroes.size,
      animatedHeroes: this.getAnimatedHeroes().length,
      staticHeroes: this.getStaticHeroes().length,
      heroTypes: [...new Set(this.getAll().map(hero => hero.getHeroType()))]
    }
  }
}

// Export singleton instance
export const heroRegistry = HeroRegistry.getInstance()

// Utility function to get hero registry
export function getHeroRegistry(): HeroRegistry {
  return heroRegistry
}