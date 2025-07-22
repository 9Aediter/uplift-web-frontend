import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Section } from "@/components/ui/section"

interface HighlightItem {
  headline: string;
  description: string;
  icon: string;
}

interface QuickPitchSectionProps {
  highlights: HighlightItem[];
  serviceColor: string; // e.g., "from-blue-500 to-cyan-400"
  sectionTitle: string;
}

// Unified IconMap for all icons used in this component
const IconMap: Record<string, React.ComponentType<any>> = {
  TrendingUpIcon: LucideIcons.TrendingUpIcon,
  ZapIcon: LucideIcons.ZapIcon,
  BarChartIcon: LucideIcons.BarChartIcon,
  RefreshCcwIcon: LucideIcons.RefreshCcwIcon,
  Smartphone: LucideIcons.Smartphone,
  Search: LucideIcons.Search,
  Edit: LucideIcons.Edit,
  Clock: LucideIcons.Clock,
  Monitor: LucideIcons.Monitor,
  Code: LucideIcons.Code,
  Shield: LucideIcons.Shield,
  Globe: LucideIcons.Globe,
  CheckCircle: LucideIcons.CheckCircle,
  Headphones: LucideIcons.Headphones,
  Layout: LucideIcons.Layout,
  Server: LucideIcons.Server,
  Database: LucideIcons.Database,
  Link: LucideIcons.Link,
  // Add other icons as needed from service-pages.json
};

const getIcon = (iconName: string, size = 22) => {
  const Icon = IconMap[iconName];
  return Icon ? <Icon size={size} /> : null;
};

const QuickPitchSection: React.FC<QuickPitchSectionProps> = ({ highlights, serviceColor, sectionTitle }) => {
  return (
    <Section className="w-full py-16 bg-[#111111]">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent text-4xl font-bold my-12 text-center">
            {sectionTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights?.map((highlight, index) => (
              <div
                key={index}
                className="bg-[#1A1A1A] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div
                  className={`bg-gradient-to-r ${serviceColor} text-white inline-flex p-3 rounded-lg mb-4`}
                >
                  {getIcon(highlight.icon)}
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {highlight.headline}
                </h3>
                <p className="text-gray-300">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default QuickPitchSection;
