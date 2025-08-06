import { create } from 'zustand';
import { IconMap } from '@/data/products';

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
  slug: string;
  category?: string;
  tags: string[];
  status: string;
  isPublished: boolean;
  publishedAt?: string;
  price?: string;
  featureCount?: number;
  clientCount?: number;
  language: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductsResponse {
  products: Product[];
  totalCount: number;
  hasMore: boolean;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

interface ProductActions {
  fetchProducts: (params?: { 
    published?: boolean; 
    category?: string; 
    language?: string; 
    limit?: number;
    offset?: number;
  }) => Promise<void>;
  getProductBySlug: (slug: string) => Product | undefined;
  clearError: () => void;
}

const useProductStore = create<ProductState & ProductActions>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const searchParams = new URLSearchParams();
      
      // Add query parameters
      if (params.published !== undefined) {
        searchParams.append('published', String(params.published));
      }
      if (params.category) {
        searchParams.append('category', params.category);
      }
      if (params.language) {
        searchParams.append('language', params.language);
      } else {
        searchParams.append('language', 'en'); // Default to English
      }
      if (params.limit) {
        searchParams.append('limit', String(params.limit));
      }
      if (params.offset) {
        searchParams.append('offset', String(params.offset));
      }

      const url = `/api/products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }
      
      const data: ProductsResponse = await response.json();
      
      // Map the API response to match the expected Product interface
      const products = data.products.map(product => ({
        ...product,
        subtitle: product.subtitle || '',
        icon: (product.icon as keyof typeof IconMap) || 'MonitorIcon',
      }));
      
      set({ products, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      set({ isLoading: false, error: errorMessage });
    }
  },

  getProductBySlug: (slug: string) => {
    const { products } = get();
    return products.find(product => product.slug === slug);
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useProductStore;