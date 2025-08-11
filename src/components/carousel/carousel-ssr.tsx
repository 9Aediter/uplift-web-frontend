import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BlurImage } from "./blur-image";
import { CarouselAnimateWrapper } from "./carousel-animate-wrapper";

export type Card = {
  src: string;
  title: string;
  category: string;
  content?: React.ReactNode;
  link?: string;
};

interface CarouselSSRProps {
  cards: Card[];
  enableAnimations?: boolean;
}

export const CarouselSSR = ({ cards, enableAnimations = true }: CarouselSSRProps) => {
  return (
    <div className="relative w-full">
      <div className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20">
        <div className={cn(
          "flex flex-row justify-start gap-4 pl-4",
          "mx-auto max-w-7xl",
        )}>
          {cards.map((card, index) => (
            <CarouselCard 
              key={`card-${index}`} 
              card={card} 
              index={index}
              enableAnimations={enableAnimations}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface CarouselCardProps {
  card: Card;
  index: number;
  enableAnimations?: boolean;
}

const CarouselCard = ({ card, index, enableAnimations = true }: CarouselCardProps) => {
  const cardContent = (
    <div className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900 last:mr-[5%] md:last:mr-[33%]">
      {/* Gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-40 p-8 text-left">
        {/* Category */}
        <div className="mb-4 inline-flex items-center px-4 py-1 rounded-full bg-gray-800/80 border border-gray-700">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2"></span>
          <span className="text-sm font-medium text-white">
            {card.category}
          </span>
        </div>

        {/* Title */}
        <p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
          {card.title}
        </p>
      </div>

      {/* Image */}
      <BlurImage
        src={card.src}
        alt={card.title}
        fill
        className="absolute inset-0 z-10 object-cover"
      />
    </div>
  );

  if (enableAnimations) {
    return (
      <CarouselAnimateWrapper index={index}>
        <Link href={card.link || '#'}>
          {cardContent}
        </Link>
      </CarouselAnimateWrapper>
    );
  }

  return (
    <Link href={card.link || '#'}>
      {cardContent}
    </Link>
  );
};