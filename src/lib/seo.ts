import type { Metadata } from "next";
import { generateAITags } from './ai-metadata';

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    type: string;
  };
  twitter: {
    title: string;
    description: string;
    image: string;
  };
}

export interface SEOConfig {
  en: SEOData;
  th: SEOData;
}

export async function getPageSEO(pageName: string): Promise<SEOConfig | null> {
  try {
    const seoData = await import(`@/data/${pageName}/seo.json`);
    return seoData.default as SEOConfig;
  } catch (error) {
    console.warn(`SEO data not found for page: ${pageName}`);
    return null;
  }
}

export function generatePageMetadata(
  seoData: SEOData,
  locale: string,
  baseURL: string = 'https://uplifttech.store',
  pagePath: string = ''
): Metadata {
  const fullURL = `${baseURL}${pagePath}`;
  const aiTags = generateAITags(locale);
  
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    authors: [{ name: 'Uplift Team', url: `${baseURL}/about` }],
    creator: 'UPLIFTTECH',
    publisher: 'UPLIFTTECH',
    metadataBase: new URL(baseURL),
    openGraph: {
      title: seoData.openGraph.title,
      description: seoData.openGraph.description,
      url: fullURL,
      siteName: 'UPLIFTTECH',
      type: 'website',
      locale: locale === 'th' ? 'th_TH' : 'en_US',
      images: [
        {
          url: seoData.openGraph.image,
          width: 1200,
          height: 630,
          alt: seoData.openGraph.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.twitter.title,
      description: seoData.twitter.description,
      images: [seoData.twitter.image],
      creator: '@uplifttech',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: fullURL,
      languages: {
        en: `${baseURL}${pagePath}`,
        th: `${baseURL}/th${pagePath}`,
      },
    },
    // AI-specific metadata for better comprehension
    other: aiTags,
  };
}