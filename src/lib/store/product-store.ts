import { create } from 'zustand';
import { fetchAllProducts } from '@/lib/api/product-api';
import { IconMap } from '@/data/products'; // Keep IconMap for icon mapping

// Define the Product type that the frontend components expect
export interface Product {
  id: string; // Derived from Strapi's slug
  title: string;
  subtitle: string;
  description: string;
  features: string[]; // Flattened from Strapi's feature.data
  image?: string; // Optional, as it's missing from provided Strapi data
  color: string;
  icon: keyof typeof IconMap; // Still expects a string key for IconMap
  // Add other fields if needed, e.g., slug, createdAt, etc.
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
  icon: string; // This will be a string like "DumbbellIcon"
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
    // Add other image fields if necessary
  }>;
  // Add other fields if they exist in your Strapi response
}

/**
 * Maps raw Strapi software data to the Product type expected by the frontend.
 * @param strapiSoftware The raw software object from Strapi.
 * @returns A Product object.
 */
const mapStrapiSoftwareToProduct = (strapiSoftware: StrapiSoftware): Product => {
  // Basic validation for icon to ensure it exists in IconMap
  const iconName = strapiSoftware.icon as keyof typeof IconMap;
  const icon = IconMap[iconName] ? iconName : 'MonitorIcon'; // Default to MonitorIcon if not found

  // Extract image URL
  const imageUrl = strapiSoftware.image?.[0]?.formats?.large?.url || strapiSoftware.image?.[0]?.url || undefined;

  return {
    id: strapiSoftware.slug, // Use slug as id
    title: strapiSoftware.title,
    subtitle: strapiSoftware.subtitle,
    description: strapiSoftware.description,
    features: strapiSoftware.feature?.data || [], // Ensure features is an array
    image: imageUrl, // Use extracted image URL
    color: strapiSoftware.color,
    icon: icon,
  };
};

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

interface ProductActions {
  fetchProducts: () => Promise<void>;
}

const useProductStore = create<ProductState & ProductActions>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const rawData = await fetchAllProducts(); // Get raw data
      const products = rawData.map(mapStrapiSoftwareToProduct); // Map to Product type
      set({ products, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      set({ isLoading: false, error: errorMessage });
    }
  },
}));

export default useProductStore;