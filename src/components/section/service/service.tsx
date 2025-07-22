import React from 'react'
import Link from "next/link"
import Image from "next/image";
import { Section } from "@/components/ui/section"
import {
  MonitorIcon,
  GlobeIcon,
  SearchIcon,
  WrenchIcon,
  CodeIcon,
  DatabaseIcon,
  ServerIcon,
  LinkIcon,
  BarChartIcon,
  UsersIcon,
  FileTextIcon,
  SmartphoneIcon,
  ZapIcon, // Added ZapIcon
  BellIcon, // Added BellIcon
  WifiIcon, // Added WifiIcon
  // Add any other Lucide icons used in service-showcase.json here
} from 'lucide-react'

// Unified IconMap for all icons used in this component
const IconMap: Record<string, React.ComponentType<any>> = {
  MonitorIcon,
  GlobeIcon,
  SearchIcon,
  WrenchIcon,
  CodeIcon,
  DatabaseIcon,
  ServerIcon,
  LinkIcon,
  BarChartIcon,
  UsersIcon,
  FileTextIcon,
  SmartphoneIcon,
  ZapIcon, // Added ZapIcon
  BellIcon, // Added BellIcon
  WifiIcon, // Added WifiIcon
  // Add any other Lucide icons used in service-showcase.json here
};

interface FeatureItem {
  text: string;
  icon: string;
}

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  icon: string; // Main icon for the section
  iconColor?: string; // Tailwind color class for the main icon (optional)
  gradientFrom: string; // Tailwind color class for gradient background
  gradientTo: string; // Tailwind color class for gradient background
  features: FeatureItem[];
  image: string;
  image_alt: string;
  layout: 'image-left' | 'image-right'; // To control image/text order
  read_more_text: string;
  read_more_link: string;
}

interface ShowcaseSectionContent {
  showcase_items: ShowcaseItem[];
}

interface ServiceShowcaseProps {
  showcaseContent: ShowcaseSectionContent;
}

const ShowcaseItemRenderer: React.FC<{ item: ShowcaseItem; index: number }> = ({ item, index }) => {
  const MainIconComponent = IconMap[item.icon];
  const isImageRight = item.layout === 'image-right'; // Use item.layout to determine image side
  const sectionId = item.id; // Use item.id for section ID

  return (
    <Section
      key={item.id} id={sectionId} className={`w-full py-20 ${index % 2 === 0 ? 'bg-[#111111]' : 'bg-black'}`}>
      <div className="max-w-7xl container mx-auto px-4">
        <div className={`flex flex-col items-center gap-8 md:gap-16 ${isImageRight ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
          <div className="w-full md:w-1/2">
            <div className={`bg-gradient-to-r from-${item.gradientFrom} to-${item.gradientTo} text-white inline-block p-3 rounded-xl mb-4 shadow-lg shadow-${item.gradientFrom}/20`}>
              {MainIconComponent && <MainIconComponent size={32} className={item.iconColor ? `text-${item.iconColor}` : ''} />}
            </div>
            <h2 className="text-3xl font-bold mb-6 text-white">
              {item.title}
            </h2>
            <p className="text-gray-200 mb-6">{item.description}</p>
            <ul className="space-y-5 text-lg">
              {item.features.map((feature, featureIndex) => {
                const FeatureIconComponent = IconMap[feature.icon];
                return (
                  <li key={featureIndex} className="flex items-start">
                    <div className={`text-${item.iconColor || 'purple-400'} mr-3 flex-shrink-0 mt-1`}> {/* Fallback color if not provided */}
                      {FeatureIconComponent && <FeatureIconComponent size={22} />}
                    </div>
                    <span className="text-gray-200">{feature.text}</span>
                  </li>
                );
              })}
            </ul>
            <Link
              href={item.read_more_link}
              className={`inline-flex items-center mt-8 text-${item.gradientFrom.split('-')[0]}-400 hover:text-${item.gradientFrom.split('-')[0]}-300 transition-colors font-medium`}
            >
              {item.read_more_text}
              <svg
                className="ml-2 w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-purple-500/10">
              <div className={`overflow-hidden inset-0 bg-gradient-to-r from-${item.gradientFrom}/20 to-${item.gradientTo}/20 mix-blend-overlay`}></div>
              <Image
                src={item.image}
                alt={item.image_alt}
                width={800} // Base width for responsive
                height={450} // Base height for responsive
                className="rounded-xl w-full h-[450px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export const ServiceShowcaseSection: React.FC<ServiceShowcaseProps> = ({ showcaseContent }) => {
  return (
    <div className="w-full">
      {showcaseContent.showcase_items.map((item, index) => (
        <ShowcaseItemRenderer key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};
