import React, { Suspense } from "react";
import { CarouselContent, type Card } from "./carousel-content";
import { Carousel, Card as ClientCard } from "./carousel-client";

interface AppleCardsCarouselProps {
  cards: Card[];
  enableAnimations?: boolean;
}

// Main export component that handles both SSR and client-side rendering
export const AppleCardsCarousel = ({ 
  cards, 
  enableAnimations = true 
}: AppleCardsCarouselProps) => {
  
  if (!enableAnimations) {
    // Return SSR-only version for better SEO and faster loading
    return <CarouselContent cards={cards} />;
  }

  // Return animated client version wrapped with SSR fallback
  const clientCards = cards.map((card, index) => (
    <ClientCard key={`client-card-${index}`} card={card} index={index} />
  ));

  return (
    <Suspense fallback={<CarouselContent cards={cards} />}>
      <div>
        {/* Hidden SSR content for SEO */}
        <div className="sr-only">
          <CarouselContent cards={cards} />
        </div>
        
        {/* Client-side animated carousel */}
        <div className="block">
          <Carousel items={clientCards} />
        </div>
      </div>
    </Suspense>
  );
};

// Re-export types and components for flexibility
export type { Card };
export { CarouselContent, Carousel, ClientCard };
export { BlurImage } from "./blur-image";