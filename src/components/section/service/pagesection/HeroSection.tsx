import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import * as LucideIcons from 'lucide-react';
import { Section } from "@/components/ui/section"

interface HeroSectionProps {
  service: any; // Replace with actual Service type
}

const HeroSection: React.FC<HeroSectionProps> = ({ service }) => {
  const IconComponent = (LucideIcons as any)[`${service.icon}Icon`];

  // Mock image URLs
  const backgroundImage = "https://images.unsplash.com/photo-1517694712202-14dd953bb05b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";
  const rightSideImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

  return (
    <Section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div> {/* Overlay for readability */}
      </div>

      {/* Content Wrapper */}
      <div className="max-w-7xl relative z-10 container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Left Column (Text Content) */}
          <div className="w-full md:w-1/2 text-white">

            <h1 className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent text-4xl md:text-6xl font-bold py-4">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-gray-300">
              {service.subtitle}
            </p>
            <p className="text-lg text-gray-300 mb-8">{service.overview}</p>
          </div>

          {/* Right Column (Image - Hidden on mobile) */}
          <div className="w-full md:w-1/2 hidden md:block">
            <Image
              src={rightSideImage}
              alt="Hero Image"
              width={800} // Adjust as needed
              height={600} // Adjust as needed
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
