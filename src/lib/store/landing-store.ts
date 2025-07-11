import { create } from 'zustand';
import { fetchAllServices } from '@/lib/api/service-api';
import { IconMap } from '@/data/services'; // Import IconMap from services data

// Define the Service type that the frontend components expect
export interface Service {
  title: string;
  description: string;
  icon: keyof typeof IconMap; // Expects a string key for IconMap
  color: string;
}

// Interface for the raw data structure from Strapi's /api/services
// Assuming it's similar to the software structure you provided earlier
interface StrapiService {
  id: number;
  documentId?: string;
  title: string;
  slug?: string; // Assuming slug might be present and can be used as id
  description: string;
  icon: string; // This will be a string like "LayoutIcon"
  color: string;
  // Add other fields if they exist in your Strapi response for services
}

/**
 * Maps raw Strapi service data to the Service type expected by the frontend.
 * @param strapiService The raw service object from Strapi.
 * @returns A Service object.
 */
const mapStrapiServiceToService = (strapiService: StrapiService): Service => {
  const iconName = strapiService.icon as keyof typeof IconMap;
  const icon = IconMap[iconName] ? iconName : 'LayoutIcon'; // Default to LayoutIcon if not found

  return {
    title: strapiService.title,
    description: strapiService.description,
    icon: icon,
    color: strapiService.color,
  };
};



// Define the state structure for the landing page
interface LandingState {
  Service: { Service: Service[] }[];
  isLoading: boolean;
  error: string | null;
}

// Define actions for the landing page store
interface LandingActions {
  fetchLandingData: () => Promise<void>;
}

const useLandingStore = create<LandingState & LandingActions>((set) => ({
  // Initial state
  Service: [],
  isLoading: false,
  error: null,

  // Actions
  fetchLandingData: async () => {
    set({ isLoading: true, error: null });
    try {
      // Fetch raw services data
      const rawServices = await fetchAllServices();
      // Map raw services to the Service type
      const mappedServices = rawServices.map(mapStrapiServiceToService);
      
      // Set the data in the desired structure
      set({
        Service: [{ Service: mappedServices }],
        isLoading: false
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      set({ isLoading: false, error: errorMessage });
    }
  },
}));

export default useLandingStore;

