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

export interface FeatureItem {
  text: string;
  icon: string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  icon: string; // Main icon for the section
  iconColor?: string; // Tailwind color class for the main icon (optional)
  gradientFrom: string; // Tailwind color class for gradient background
  gradientTo: string; // Tailwind color class for gradient background
  features: FeatureItem[];
  image: string;
  image_alt: string;
  layout: 'image-left' | 'image-right'; // To control image/text order
  read_more_text: string;
  read_more_link: string;
}

export interface ShowcaseSectionContent {
  showcase_items: ShowcaseItem[];
}
