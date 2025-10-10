'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { TechStackModal } from '@/components/layout/popup/tech-stack-modal';
import { ImageGalleryModal } from '@/components/layout/popup/image-gallery-modal';

interface TechItem {
  name: string;
  icon: ReactNode;
  tagline: string;
  category: string;
  color: string;
  usedIn: string[];
}

interface ImageItem {
  url: string;
  title: string;
  description: string;
}

interface TechModalContextType {
  openTechModal: (tech: TechItem) => void;
  openImageModal: (image: ImageItem) => void;
  closeModal: () => void;
}

const TechModalContext = createContext<TechModalContextType | undefined>(undefined);

export function useTechModal() {
  const context = useContext(TechModalContext);
  if (!context) {
    throw new Error('useTechModal must be used within TechModalProvider');
  }
  return context;
}

export function TechModalProvider({ children }: { children: ReactNode }) {
  const [techData, setTechData] = useState<TechItem | null>(null);
  const [imageData, setImageData] = useState<ImageItem | null>(null);

  const openTechModal = (tech: TechItem) => {
    setImageData(null); // Close image modal if open
    setTechData(tech);
  };

  const openImageModal = (image: ImageItem) => {
    setTechData(null); // Close tech modal if open
    setImageData(image);
  };

  const closeModal = () => {
    setTechData(null);
    setImageData(null);
  };

  return (
    <TechModalContext.Provider value={{ openTechModal, openImageModal, closeModal }}>
      {children}

      {/* Global Modals - Always at top level */}
      <TechStackModal
        isOpen={!!techData}
        onClose={closeModal}
        tech={techData}
      />

      <ImageGalleryModal
        isOpen={!!imageData}
        onClose={closeModal}
        image={imageData}
      />
    </TechModalContext.Provider>
  );
}
