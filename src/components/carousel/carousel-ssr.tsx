import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SSRImage } from "./ssr-image";
import { CarouselAnimateWrapper } from "./carousel-animate-wrapper";
import { FaCode, FaMobile, FaDesktop, FaCloud, FaDatabase, FaRocket, FaCog, FaChartBar } from "react-icons/fa";

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

// Helper function to get icon based on category
const getCategoryIcon = (category: string) => {
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes('web') || lowerCategory.includes('frontend')) return FaDesktop;
  if (lowerCategory.includes('mobile') || lowerCategory.includes('app')) return FaMobile;
  if (lowerCategory.includes('cloud') || lowerCategory.includes('server')) return FaCloud;
  if (lowerCategory.includes('database') || lowerCategory.includes('data')) return FaDatabase;
  if (lowerCategory.includes('analytics') || lowerCategory.includes('dashboard')) return FaChartBar;
  if (lowerCategory.includes('system') || lowerCategory.includes('config')) return FaCog;
  if (lowerCategory.includes('startup') || lowerCategory.includes('innovation')) return FaRocket;
  return FaCode; // Default icon
};

// Helper function to get short category text for mobile
const getShortCategory = (category: string) => {
  const parts = category.split(' ');
  return parts[0]; // Return only first word for mobile
};

const CarouselCard = ({ card, index, enableAnimations = true }: CarouselCardProps) => {
  const IconComponent = getCategoryIcon(card.category);
  const shortCategory = getShortCategory(card.category);
  
  const cardContent = (
    <div className="relative z-10 flex h-96 w-72 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900 last:mr-[5%] md:last:mr-[33%]">
      {/* Gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-40 p-8 text-left">
        {/* Category Badge */}
        <div className="mb-4 w-fit inline-flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
          <IconComponent className="h-3 w-3 text-cyan-400 mr-2" />
          <span className="text-xs font-medium text-cyan-300">
            <span className="md:hidden">{shortCategory}</span>
            <span className="hidden md:inline">{card.category}</span>
          </span>
        </div>

        {/* Title */}
        <p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
          {card.title}
        </p>
      </div>

      {/* Image */}
      <SSRImage
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