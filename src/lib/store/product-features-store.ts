import { create } from 'zustand';

export interface ProductFeature {
  title: string;
  description: string;
  icon: string;
}

interface ProductFeaturesStore {
  features: ProductFeature[];
  
  // Actions
  setFeatures: (features: ProductFeature[]) => void;
  addFeature: (feature: ProductFeature) => void;
  updateFeature: (index: number, feature: ProductFeature) => void;
  removeFeature: (index: number) => void;
  clearFeatures: () => void;
  reorderFeatures: (startIndex: number, endIndex: number) => void;
}

export const useProductFeaturesStore = create<ProductFeaturesStore>((set) => ({
  features: [],

  setFeatures: (features) => set({ features }),

  addFeature: (feature) => {
    set((state) => ({
      features: [...state.features, feature]
    }));
  },

  updateFeature: (index, updatedFeature) => {
    set((state) => ({
      features: state.features.map((feature, i) => 
        i === index ? updatedFeature : feature
      )
    }));
  },

  removeFeature: (index) => {
    set((state) => ({
      features: state.features.filter((_, i) => i !== index)
    }));
  },

  clearFeatures: () => set({ features: [] }),

  reorderFeatures: (startIndex, endIndex) => {
    set((state) => {
      const result = Array.from(state.features);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { features: result };
    });
  },
}));