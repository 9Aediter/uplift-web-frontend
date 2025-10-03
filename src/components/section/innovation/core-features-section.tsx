import React from 'react';
import { Section } from '@/components/ui/section';
import { FeaturesHoverEffect } from '../../basic/gridcard/features-hover-effect';

// Feature interface
interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface CoreFeaturesSectionProps {
  features: (Feature | string)[];
}

// Parse feature data into structured format
const parseFeature = (feature: Feature | string) => {
  if (typeof feature === 'object') {
    // Already structured feature object
    return {
      title: feature.title,
      description: feature.description
    };
  }

  // Legacy string format - parse it
  let title = '';
  let description = '';

  if (feature.includes(' - ')) {
    const parts = feature.split(' - ');
    title = parts[0].trim();
    description = parts.slice(1).join(' - ').trim();
  } else if (feature.includes(' | ')) {
    const parts = feature.split(' | ');
    title = parts[0].trim();
    description = parts.slice(1).join(' | ').trim();
  } else {
    title = feature;
    description = "Core feature of the system";
  }

  return { title, description };
};

export const CoreFeaturesSection: React.FC<CoreFeaturesSectionProps> = ({ features }) => {
  // Parse features for SEO content
  const parsedFeatures = features?.map((feature) => parseFeature(feature)) || [];

  return (
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Core Features
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Powerful features designed to streamline your workflow and enhance productivity
        </p>
      </div>

      {/* SEO-friendly content structure */}
      <div className="hidden">
        {parsedFeatures.map((feature, idx) => (
          <div key={idx}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Interactive hover effect component */}
      <FeaturesHoverEffect features={features} />
    </Section>
  );
};
