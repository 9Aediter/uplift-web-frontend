import React from 'react';
import CarouselAnimate from './CarouselAnimate'; // Import the client component
import { Section } from "@/components/ui/section"

interface CarouselItem {
  image: string;
  caption: string;
}

interface CarouselSectionProps {
  carouselItems: CarouselItem[];
}

const CarouselSection: React.FC<CarouselSectionProps> = ({ carouselItems }) => {
  return (
    <Section className="w-full py-16 bg-[#111111]">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <CarouselAnimate carouselItems={carouselItems} />
        </div>
      </div>
    </Section>
  );
};

export default CarouselSection;
