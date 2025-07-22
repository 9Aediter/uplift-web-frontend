'use server';

import { fetchSoftwareBySlug } from '@/lib/api/software-api';
import { IconMap } from '@/data/products';

// Define the Product type that the frontend components expect
export interface ProductDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image?: Array<{
    id: number;
    url: string;
    formats?: {
      large?: { url: string; };
      medium?: { url: string; };
      small?: { url: string; };
      thumbnail?: { url: string; };
    };
  }>;
  color: string;
  icon: keyof typeof IconMap;
  caseStudy?: string; // Assuming caseStudy exists in Strapi data
}

// Interface for the raw data structure from Strapi's /api/softwares
interface StrapiSoftwareRaw {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  subtitle: string;
  feature: {
    data: string[];
  };
  color: string;
  icon: string;
  description: string;
  image?: Array<{
    id: number;
    url: string;
    formats?: {
      large?: { url: string; };
      medium?: { url: string; };
      small?: { url: string; };
      thumbnail?: { url: string; };
    };
  }>;
  caseStudy?: string;
}

const mapStrapiSoftwareToProductDetail = (strapiSoftware: StrapiSoftwareRaw): ProductDetail => {
  const iconName = strapiSoftware.icon as keyof typeof IconMap;
  const icon = IconMap[iconName] ? iconName : 'MonitorIcon';

  return {
    id: strapiSoftware.slug,
    title: strapiSoftware.title,
    subtitle: strapiSoftware.subtitle,
    description: strapiSoftware.description,
    features: strapiSoftware.feature?.data || [],
    image: strapiSoftware.image,
    color: strapiSoftware.color,
    icon: icon,
    caseStudy: strapiSoftware.caseStudy,
  };
};

export const getInnovationDetail = async (slug: string): Promise<ProductDetail | null> => {
  try {
    const rawData = await fetchSoftwareBySlug(slug);
    if (!rawData) {
      return null;
    }
    const productDetail = mapStrapiSoftwareToProductDetail(rawData);
    return productDetail;
  } catch (error) {
    console.error(`Failed to fetch innovation detail for slug ${slug}:`, error);
    return null;
  }
  
};
