// src/lib/actions/serviceActions.ts
'use server';

import { getLocalizedPageContent } from '@/lib/content';

// Define the Service interface based on the structure in service-pages.json
export interface Service {
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  color: string; // e.g., "from-blue-500 to-cyan-400"
  icon: string; // Name of Lucide icon as string
  carouselItems?: {
    image: string;
    caption: string;
  }[];
  highlights?: {
    headline: string;
    description: string;
    icon: string;
  }[];
  problems?: {
    text: string;
    icon: string;
    image: string;
  }[];
  features?: {
    name: string;
    description: string;
    icon: string;
    image: string;
  }[];
  benefits?: {
    metric: string;
    description: string;
  }[];
  caseStudies?: {
    name: string;
    logo?: string;
    result: string;
    testimonial?: string;
    company?: string;
  }[];
  pricing?: {
    name: string;
    description: string;
    price: string;
    features: string[];
    isPopular?: boolean;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export async function getServiceById(locale: string, id: string): Promise<Service | null> {
  console.log(`[getServiceById] Attempting to fetch service for locale: ${locale}, ID: ${id}`);
  const servicePagesContent = await getLocalizedPageContent(locale, 'service-pages');

  if (!servicePagesContent || !Array.isArray(servicePagesContent)) {
    console.error(`[getServiceById] Service pages content not found or invalid for locale: ${locale}`, servicePagesContent);
    return null;
  }

  // Find the service by ID (assuming ID is the same as slug for now)
  const foundService = servicePagesContent.find((service: Service) => service.slug === id); // Using slug as ID

  if (!foundService) {
    console.log(`[getServiceById] Service not found for ID: ${id} in locale: ${locale}. Available slugs:`, servicePagesContent.map((s: Service) => s.slug));
    return null;
  }

  console.log(`[getServiceById] Service found: ${foundService.title} for ID: ${id}`);
  return foundService as Service;
}

