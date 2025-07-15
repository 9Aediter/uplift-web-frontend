"use server";

import { fetchAllProducts } from "@/lib/api/product-api";
import { IconMap } from "@/data/products";

// Define the Product type that the frontend components expect
export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image?: string;
  color: string;
  icon: keyof typeof IconMap;
  link: string; // Added link for navigation
}

// Interface for the raw data structure from Strapi's /api/softwares
interface StrapiSoftware {
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
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  }>;
  Link?: string; // Make link optional in StrapiSoftware
}

const mapStrapiSoftwareToProduct = (
  strapiSoftware: StrapiSoftware
): Product => {
  const iconName = strapiSoftware.icon as keyof typeof IconMap;
  const icon = IconMap[iconName] ? iconName : "MonitorIcon";
  const imageUrl =
    strapiSoftware.image?.[0]?.formats?.large?.url ||
    strapiSoftware.image?.[0]?.url;

  return {
    id: strapiSoftware.slug,
    title: strapiSoftware.title,
    subtitle: strapiSoftware.subtitle,
    description: strapiSoftware.description,
    features: strapiSoftware.feature?.data || [],
    image: imageUrl,
    color: strapiSoftware.color,
    icon: icon,
    link: strapiSoftware.Link || `/innovation/${strapiSoftware.slug}`, // Use existing link or generate from slug
  };
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const rawData = await fetchAllProducts();
    const products = rawData.map(mapStrapiSoftwareToProduct);
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return []; // Return empty array on error
  }
};
