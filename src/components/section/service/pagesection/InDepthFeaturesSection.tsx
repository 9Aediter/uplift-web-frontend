import React from 'react';
import InDepthFeaturesTabs from './InDepthFeaturesTabs'; // Import the client component
import { Section } from "@/components/ui/section"

interface FeatureItem {
  name: string;
  description: string;
  icon: string;
  image: string;
}

interface InDepthFeaturesSectionProps {
  features: FeatureItem[];
  serviceColor: string; // e.g., "from-blue-500 to-cyan-400"
  sectionTitle: string;
}

const InDepthFeaturesSection: React.FC<InDepthFeaturesSectionProps> = ({ features, serviceColor, sectionTitle }) => {
  return (
    <Section className="w-full h-[80vh] py-16 bg-[#111111]">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{sectionTitle}</h2>
          <InDepthFeaturesTabs features={features} serviceColor={serviceColor} />
        </div>
      </div>
    </Section>
  );
};

export default InDepthFeaturesSection;
