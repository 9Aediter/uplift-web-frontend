import React from "react";
import { CarouselSSR, type Card } from "./carousel-ssr";

interface AppleCardsCarouselProps {
  cards: Card[];
  enableAnimations?: boolean;
}

// SSR Carousel with optional client-side animations
export const AppleCardsCarousel = ({ 
  cards, 
  enableAnimations = true 
}: AppleCardsCarouselProps) => {
  return <CarouselSSR cards={cards} enableAnimations={enableAnimations} />;
};

// Re-export types and components for flexibility
export type { Card };
export { CarouselSSR } from "./carousel-ssr";
export { CarouselAnimateWrapper } from "./carousel-animate-wrapper";
export { BlurImage } from "./blur-image";