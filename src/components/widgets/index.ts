import { Widget } from './types'
import { ThreeColumnCards } from './cards/three-column-cards'
import { ThreeColumnCardsSkeleton } from './cards/three-column-cards/skeleton'
import { threeColumnCardsConfig } from './cards/three-column-cards/config'
import { FeatureShowcase } from './cards/feature-showcase'
import { FeatureShowcaseSkeleton } from './cards/feature-showcase/skeleton'
import { featureShowcaseConfig } from './cards/feature-showcase/config'
import { Testimonials } from './cards/testimonials'
import { TestimonialsSkeleton } from './cards/testimonials/skeleton'
import { testimonialsConfig } from './cards/testimonials/config'
import { FaqAccordion } from './cards/faq-accordion'
import { FaqAccordionSkeleton } from './cards/faq-accordion/skeleton'
import { faqAccordionConfig } from './cards/faq-accordion/config'
import { SingleCard } from './cards/single-card'
import { SingleCardSkeleton } from './cards/single-card/skeleton'
import { singleCardConfig } from './cards/single-card/config'
import { FourColumnCards } from './cards/four-column-cards'
import { FourColumnCardsSkeleton } from './cards/four-column-cards/skeleton'
import { fourColumnCardsConfig } from './cards/four-column-cards/config'
import { CardGrid } from './cards/card-grid'
import { CardGridSkeleton } from './cards/card-grid/skeleton'
import { cardGridConfig } from './cards/card-grid/config'
import { CardList } from './cards/card-list'
import { CardListSkeleton } from './cards/card-list/skeleton'
import { cardListConfig } from './cards/card-list/config'

export const WIDGET_REGISTRY: Record<string, Widget> = {
  'three-column-cards': {
    config: threeColumnCardsConfig,
    component: ThreeColumnCards,
    skeleton: ThreeColumnCardsSkeleton,
    preview: '/widgets/three-column-cards-preview.png'
  },
  'feature-showcase': {
    config: featureShowcaseConfig,
    component: FeatureShowcase,
    skeleton: FeatureShowcaseSkeleton,
    preview: '/widgets/feature-showcase-preview.png'
  },
  'testimonials': {
    config: testimonialsConfig,
    component: Testimonials,
    skeleton: TestimonialsSkeleton,
    preview: '/widgets/testimonials-preview.png'
  },
  'faq-accordion': {
    config: faqAccordionConfig,
    component: FaqAccordion,
    skeleton: FaqAccordionSkeleton,
    preview: '/widgets/faq-accordion-preview.png'
  },
  'single-card': {
    config: singleCardConfig,
    component: SingleCard,
    skeleton: SingleCardSkeleton,
    preview: '/widgets/single-card-preview.png'
  },
  'four-column-cards': {
    config: fourColumnCardsConfig,
    component: FourColumnCards,
    skeleton: FourColumnCardsSkeleton,
    preview: '/widgets/four-column-cards-preview.png'
  },
  'card-grid': {
    config: cardGridConfig,
    component: CardGrid,
    skeleton: CardGridSkeleton,
    preview: '/widgets/card-grid-preview.png'
  },
  'card-list': {
    config: cardListConfig,
    component: CardList,
    skeleton: CardListSkeleton,
    preview: '/widgets/card-list-preview.png'
  }
}

export const WIDGET_CATEGORIES = {
  cards: [
    'single-card',
    'three-column-cards', 
    'four-column-cards',
    'feature-showcase',
    'testimonials',
    'faq-accordion',
    'card-grid',
    'card-list'
  ],
  carousel: [
    // 'image-carousel',
    // 'content-carousel',
    // 'testimonial-carousel',
    // 'product-carousel'
  ],
  tabs: [
    // 'horizontal-tabs',
    // 'vertical-tabs',
    // 'accordion'
  ],
  hero: [
    // 'center-hero',
    // 'split-hero',
    // 'video-hero',
    // 'form-hero'
  ],
  content: [
    // 'text-block',
    // 'text-image',
    // 'image-gallery',
    // 'stats-grid'
  ],
  interactive: [
    // 'pricing-table',
    // 'contact-form',
    // 'faq-accordion',
    // 'timeline'
  ]
} as const

export type WidgetCategory = keyof typeof WIDGET_CATEGORIES

// Helper functions
export const getWidgetsByCategory = (category: WidgetCategory) => {
  return WIDGET_CATEGORIES[category].map(id => WIDGET_REGISTRY[id]).filter(Boolean)
}

export const getAllWidgets = () => {
  return Object.values(WIDGET_REGISTRY)
}

export const getWidgetById = (id: string) => {
  return WIDGET_REGISTRY[id]
}

// Export widget components and configs
export { 
  SingleCard,
  SingleCardSkeleton,
  singleCardConfig,
  ThreeColumnCards, 
  ThreeColumnCardsSkeleton, 
  threeColumnCardsConfig,
  FourColumnCards,
  FourColumnCardsSkeleton,
  fourColumnCardsConfig,
  FeatureShowcase,
  FeatureShowcaseSkeleton,
  featureShowcaseConfig,
  Testimonials,
  TestimonialsSkeleton,
  testimonialsConfig,
  FaqAccordion,
  FaqAccordionSkeleton,
  faqAccordionConfig,
  CardGrid,
  CardGridSkeleton,
  cardGridConfig,
  CardList,
  CardListSkeleton,
  cardListConfig
}
export type { WidgetConfig, Widget, FieldDefinition } from './types'