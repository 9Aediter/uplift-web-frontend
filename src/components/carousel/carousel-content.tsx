import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type Card = {
  src: string;
  title: string;
  category: string;
  content?: React.ReactNode;
  link?: string;
};

interface CarouselContentProps {
  cards: Card[];
  className?: string;
}

// Server-side component for SEO-friendly content
export const CarouselContent = ({ cards, className }: CarouselContentProps) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {cards.map((card, index) => (
        <div key={`card-content-${index}`} className="space-y-4">
          <Link href={card.link || '#'}>
            <div className="relative h-80 w-full overflow-hidden rounded-3xl bg-gray-100 dark:bg-neutral-900">
              {/* Placeholder for image - will be replaced by client component */}
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800" />
              
              {/* Gradient overlay */}
              <div className="absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-black/80" />
              
              {/* Content overlay */}
              <div className="relative z-40 p-8 text-left">
                {/* Category */}
                <div className="mb-4 inline-flex items-center px-4 py-1 rounded-full bg-gray-800/80 border border-gray-700">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2"></span>
                  <span className="text-sm font-medium text-white">
                    {card.category}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="mt-2 max-w-xs text-left font-sans text-xl font-semibold text-white md:text-3xl">
                  {card.title}
                </h3>
              </div>
              
              {/* Hidden image for SEO */}
              <img
                src={card.src}
                alt={card.title}
                className="sr-only"
                loading="eager"
              />
            </div>
          </Link>
          
          {/* Text content for SEO */}
          <div className="sr-only">
            <h4>{card.title}</h4>
            <p>{card.category}</p>
            {card.content && <div>{card.content}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};