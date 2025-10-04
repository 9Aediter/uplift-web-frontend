'use client'
import React from 'react'
import Link from "next/link"
import Image from "next/image";
import { Section } from "@/components/ui/section"
import type { ShowcaseItem, ShowcaseSectionContent, FeatureItem } from '@/types/models/service'
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
  ZapIcon,
  BellIcon,
  WifiIcon,
  CloudIcon,
  Wrench,
  RefreshCwIcon,
  GraduationCapIcon,
  SparklesIcon,
  ChartBarIcon,
  PaletteIcon,
  Code2Icon,
  ShieldCheckIcon,
  BuildingIcon,
  ShoppingBagIcon,
  CalendarDaysIcon,
  MessageCircleIcon,
  CalendarIcon,
  KeyIcon,
  CogIcon,
  FileSearchIcon,
  BoxIcon,
  CheckCircleIcon,
  RocketIcon,
  LibraryIcon,
  ClipboardCheckIcon,
  PieChartIcon,
  ShieldAlertIcon,
  MessageSquareIcon,
  LightbulbIcon,
  BoltIcon,
  BarChart3Icon
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
  ZapIcon,
  BellIcon,
  WifiIcon,
  CloudIcon,
  Wrench,
  RefreshCwIcon,
  GraduationCapIcon,
  SparklesIcon,
  ChartBarIcon,
  PaletteIcon,
  Code2Icon,
  ShieldCheckIcon,
  BuildingIcon,
  ShoppingBagIcon,
  CalendarDaysIcon,
  MessageCircleIcon,
  CalendarIcon,
  KeyIcon,
  CogIcon,
  FileSearchIcon,
  BoxIcon,
  CheckCircleIcon,
  RocketIcon,
  LibraryIcon,
  ClipboardCheckIcon,
  PieChartIcon,
  ShieldAlertIcon,
  MessageSquareIcon,
  LightbulbIcon,
  BoltIcon,
  BarChart3Icon
};

interface ServiceShowcaseProps {
  showcaseContent: ShowcaseSectionContent;
}

const ShowcaseItemRenderer: React.FC<{ item: ShowcaseItem; index: number }> = ({ item, index }) => {
  const MainIconComponent = IconMap[item.icon];
  const isImageRight = item.layout === 'image-right'; // Use item.layout to determine image side
  const sectionId = item.id; // Use item.id for section ID

  return (
    <Section
      key={item.id} id={sectionId} className={`w-full py-20 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/50'}`}>
      <div className="max-w-7xl container mx-auto px-4">
        <div className={`flex flex-col items-center gap-8 md:gap-16 ${isImageRight ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
          <div className="w-full md:w-1/2">
            <div className={`bg-gradient-to-r from-${item.gradientFrom} to-${item.gradientTo} text-white inline-block p-3 rounded-xl mb-4 shadow-lg shadow-${item.gradientFrom}/20`}>
              {MainIconComponent && <MainIconComponent size={32} className={item.iconColor ? `text-${item.iconColor}` : ''} />}
            </div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              {item.title}
            </h2>
            <p className="text-muted-foreground mb-6">{item.description}</p>
            {item.features && item.features.length > 0 && (
              <ul className="space-y-5 text-lg">
                {item.features.map((feature, featureIndex) => {
                  const FeatureIconComponent = IconMap[feature.icon];
                  return (
                    <li key={featureIndex} className="flex items-start">
                      <div className={`text-${item.iconColor || 'purple-400'} mr-3 flex-shrink-0 mt-1`}> {/* Fallback color if not provided */}
                        {FeatureIconComponent && <FeatureIconComponent size={22} />}
                      </div>
                      <span className="text-muted-foreground">{feature.text}</span>
                    </li>
                  );
                })}
              </ul>
            )}
            {item.read_more_link && item.read_more_link.trim() !== '' ? (
              <Link
                href={item.read_more_link}
                className={`inline-flex items-center mt-8 text-${item.gradientFrom?.split('-')[0] || 'blue'}-400 hover:text-${item.gradientFrom?.split('-')[0] || 'blue'}-300 transition-colors font-medium`}
              >
                {item.read_more_text || 'Learn More'}
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
            ) : (
              <div className={`inline-flex items-center mt-8 text-${item.gradientFrom?.split('-')[0] || 'blue'}-400 font-medium cursor-not-allowed opacity-50`}>
                {item.read_more_text || 'Coming Soon'}
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
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2" style={{ perspective: '1000px' }}>
            <div className="group relative rounded-xl overflow-hidden shadow-2xl shadow-purple-500/10 transform transition-all duration-700 hover:scale-105 hover:shadow-3xl hover:shadow-purple-500/20" 
                 style={{ 
                   transform: `rotateX(5deg) rotateY(${isImageRight ? '5deg' : '-5deg'})`,
                   transformStyle: 'preserve-3d'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = `rotateX(10deg) rotateY(${isImageRight ? '15deg' : '-15deg'}) scale(1.05)`;
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = `rotateX(5deg) rotateY(${isImageRight ? '5deg' : '-5deg'})`;
                 }}>
              <div className={`overflow-hidden inset-0 bg-gradient-to-r from-${item.gradientFrom}/20 to-${item.gradientTo}/20 mix-blend-overlay group-hover:from-${item.gradientFrom}/30 group-hover:to-${item.gradientTo}/30 transition-all duration-500`}></div>
              {item.image && item.image.trim() !== '' ? (
                <Image
                  src={item.image}
                  alt={item.image_alt || item.title}
                  width={800}
                  height={450}
                  className="rounded-xl w-full h-[450px] object-cover transform transition-all duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="rounded-xl w-full h-[450px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    {MainIconComponent && <MainIconComponent size={64} className="text-gray-400 mx-auto mb-4" />}
                    <p className="text-gray-500 dark:text-gray-400">{item.title}</p>
                  </div>
                </div>
              )}
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
