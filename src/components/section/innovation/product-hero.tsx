import React from "react";
import { 
  SparklesIcon, 
  BarChart3Icon, 
  DatabaseIcon, 
  BrainCircuitIcon, 
  ShieldIcon,
  CloudIcon,
  TrendingUpIcon,
  ZapIcon,
  SettingsIcon
} from "lucide-react";
import { ProductHeroCTA } from './product-hero-cta';
import { ProductHeroMobileCTA } from './product-hero-mobile-cta';

interface ProductHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  category?: string;
  features?: (Feature | string)[];
  ctaButtons?: Array<{
    text: string;
    href: string;
    variant?: "default" | "outline" | "secondary";
    icon?: string;
  }>;
  backgroundImage?: string;
  children?: React.ReactNode;
}

// Auto line break utility - สำหรับแบ่งบรรทัดอัตโนมัติ
const AutoLineBreakTitle: React.FC<{ title: string }> = ({ title }) => {
  // แบ่งคำตาม space และสร้างบรรทัดใหม่ทุก 2-3 คำ
  const words = title.split(' ');
  const lines = [];
  
  for (let i = 0; i < words.length; i += 2) {
    const line = words.slice(i, i + 2).join(' ');
    lines.push(line);
  }

  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-foreground leading-tight">
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          <span className="inline-block my-0.5 md:my-1">
            {/* Highlight key words with gradient */}
            {line.includes('AI') || line.includes('Analytics') || line.includes('Platform') ? (
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {line}
              </span>
            ) : (
              line
            )}
          </span>
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </h1>
  );
};

const ProductBadge: React.FC<{ text: string; category?: string }> = ({ text, category }) => (
  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 md:mb-6">
    <div className="inline-flex items-center bg-muted/50 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-cyan-500/30">
      <SparklesIcon className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-500 mr-1.5 sm:mr-2" />
      <span className="text-xs sm:text-sm font-medium text-cyan-500">
        {text}
      </span>
    </div>
    {category && (
      <div className="inline-flex items-center bg-blue-500/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full border border-blue-500/30">
        <span className="text-xs font-medium text-blue-500">
          {category}
        </span>
      </div>
    )}
  </div>
);

const ProductSubtitle: React.FC<{ text: string }> = ({ text }) => (
  <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-2xl leading-relaxed">
    {text}
  </p>
);

// Feature interface
interface Feature {
  title: string;
  description: string;
  icon: string;
}

// Icon mapping for different feature types
const getFeatureIcon = (feature: Feature | string, index: number) => {
  // Handle both old string format and new object format
  const featureText = typeof feature === 'string' ? feature : feature.title;
  const lowercaseFeature = featureText.toLowerCase();
  
  if (lowercaseFeature.includes('analytic') || lowercaseFeature.includes('chart') || lowercaseFeature.includes('data')) return BarChart3Icon;
  if (lowercaseFeature.includes('database') || lowercaseFeature.includes('storage')) return DatabaseIcon;
  if (lowercaseFeature.includes('ai') || lowercaseFeature.includes('machine') || lowercaseFeature.includes('intelligent')) return BrainCircuitIcon;
  if (lowercaseFeature.includes('security') || lowercaseFeature.includes('secure') || lowercaseFeature.includes('protect')) return ShieldIcon;
  if (lowercaseFeature.includes('cloud') || lowercaseFeature.includes('scale')) return CloudIcon;
  if (lowercaseFeature.includes('trend') || lowercaseFeature.includes('growth')) return TrendingUpIcon;
  if (lowercaseFeature.includes('fast') || lowercaseFeature.includes('speed') || lowercaseFeature.includes('performance')) return ZapIcon;
  
  // Default icons based on index
  const defaultIcons = [BarChart3Icon, DatabaseIcon, BrainCircuitIcon, SettingsIcon];
  return defaultIcons[index % defaultIcons.length];
};

const FeaturesList: React.FC<{ features: (Feature | string)[] }> = ({ features }) => (
  <div className="mb-6 md:mb-8">
    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 md:mb-4">Key Features</h3>
    <div className="flex items-center gap-3 sm:gap-4 flex-wrap max-w-full sm:max-w-2xl">
      {features.slice(0, 4).map((feature, index) => {
        const IconComponent = getFeatureIcon(feature, index);
        const featureTitle = typeof feature === 'string' ? feature : feature.title;
        const featureDescription = typeof feature === 'string' ? '' : feature.description;
        
        return (
          <div 
            key={index} 
            className="group relative flex items-center justify-center"
          >
            {/* Icon Container */}
            <div className="flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-muted/50 backdrop-blur-sm border border-cyan-500/30 rounded-full hover:bg-cyan-500/20 transition-all duration-300 cursor-pointer">
              <IconComponent className="w-7 h-7 sm:w-6 sm:h-6 text-cyan-500 group-hover:text-cyan-400 transition-colors duration-300" />
            </div>
            
            {/* Animated Text Tooltip - Hidden on mobile, shown on hover for desktop */}
            <div className="absolute -bottom-14 sm:-bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out group-hover:translate-y-0 translate-y-2 pointer-events-none z-10 hidden sm:block">
              <div className="bg-popover backdrop-blur-sm text-popover-foreground text-xs px-3 py-2 rounded-lg border border-border whitespace-nowrap max-w-48">
                <div className="font-medium">{featureTitle}</div>
                {featureDescription && (
                  <div className="text-muted-foreground mt-1">{featureDescription}</div>
                )}
                {/* Arrow */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-popover border-l border-t border-border rotate-45"></div>
              </div>
            </div>

            {/* Mobile: Show feature text below icons */}
            <div className="sm:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-active:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              <span className="text-xs text-muted-foreground whitespace-nowrap text-center block">{featureTitle.split(' ')[0]}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);


export const ProductHero: React.FC<ProductHeroProps> = ({
  title,
  subtitle,
  badge = "Innovation",
  category,
  features,
  ctaButtons,
  backgroundImage,
  children
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-start">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          {children || (
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            >
            </div>
          )}
        </div>
      )}

      {/* Mobile Gradient Overlay - Above background image */}
      <div className="absolute inset-0 z-5 bg-gradient-to-r from-background/70 via-background/5 to-transparent sm:hidden"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl h-[100vh] mx-auto px-8 sm:px-10 py-0 sm:py-16 md:py-24 flex justify-start items-center">
        <div className="max-w-4xl w-full h-full sm:h-fit flex flex-col">
          <div className="flex flex-col justify-center flex-1 sm:flex-initial sm:h-auto">
          <ProductBadge text={badge} category={category} />
          
          <AutoLineBreakTitle title={title} />
          
          {subtitle && <ProductSubtitle text={subtitle} />}
          
          {features && features.length > 0 && <FeaturesList features={features} />}
          </div>
          {/* Desktop CTA */}
          <div className="hidden sm:block">
            <ProductHeroCTA buttons={ctaButtons} />
          </div>
          
          {/* Mobile CTA - Fixed at bottom with scroll animation */}
          <ProductHeroMobileCTA buttons={ctaButtons} />
        </div>
      </div>
    </section>
  );
};