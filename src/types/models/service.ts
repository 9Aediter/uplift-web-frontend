// Service models for service pages

export interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  color?: string;
  highlights?: string[];
  benefits?: string[];
  carouselItems?: unknown[];
  problems?: string[];
  features?: unknown[];
  caseStudies?: unknown[];
  pricing?: unknown[];
  faqs?: unknown[];
}

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  link?: string;
}

export interface ShowcaseSectionContent {
  showcase_items: ShowcaseItem[];
}
