import React from 'react';
import { notFound } from 'next/navigation';

// Mock data for innovation detail
const mockInnovationDetails = {
  'smart-erp-system': {
    id: '1',
    title: 'Smart ERP System',
    subtitle: 'Enterprise Management',
    slug: 'smart-erp-system',
    description: 'Complete business management solution with advanced features',
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
    color: 'blue',
    features: [
      { title: 'Real-time Analytics', description: 'Live business insights', icon: 'BarChart3' },
      { title: 'Multi-user Access', description: 'Role-based permissions', icon: 'Users' },
      { title: 'Cloud Integration', description: 'Seamless cloud sync', icon: 'Cloud' }
    ],
    overview: 'Our Smart ERP System revolutionizes business management...',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    category: 'ERP'
  },
  'modern-pos-solution': {
    id: '2',
    title: 'Modern POS Solution',
    subtitle: 'Retail Technology',
    slug: 'modern-pos-solution',
    description: 'Advanced point-of-sale system for modern retail businesses',
    icon: 'CreditCard',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    color: 'green',
    features: [
      { title: 'Inventory Management', description: 'Real-time stock tracking', icon: 'Package' },
      { title: 'Payment Processing', description: 'Multiple payment methods', icon: 'CreditCard' },
      { title: 'Sales Reports', description: 'Detailed analytics', icon: 'TrendingUp' }
    ],
    overview: 'Modern POS solution designed for retail excellence...',
    techStack: ['React', 'Express.js', 'MongoDB', 'Stripe'],
    category: 'POS'
  },
  'web-app-platform': {
    id: '3',
    title: 'Web Application Platform',
    subtitle: 'Custom Development',
    slug: 'web-app-platform',
    description: 'Scalable web application development platform',
    icon: 'Globe',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    color: 'purple',
    features: [
      { title: 'Custom Development', description: 'Tailored solutions', icon: 'Code' },
      { title: 'Responsive Design', description: 'Mobile-first approach', icon: 'Smartphone' },
      { title: 'API Integration', description: 'Connect everything', icon: 'Link' }
    ],
    overview: 'Comprehensive web application platform for modern businesses...',
    techStack: ['Vue.js', 'Laravel', 'MySQL', 'Docker'],
    category: 'Web App'
  }
};
import { InnovationImageAnimate } from '@/components/page/innovation/innovation-image-animate';

// Import section components
import { ProductHero } from '@/components/page/innovation/product-hero';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;
  
  // Get mock data for the innovation
  const softwareData = mockInnovationDetails[id as keyof typeof mockInnovationDetails];

  if (!softwareData) {
    notFound();
  }
  const product = softwareData;

  return (
    <main className="w-full relative">
      {/* Hero Section */}
      <ProductHero
        title={product.title}
        subtitle={product.subtitle || ''}
        badge="Innovation"
        category={product.category}
        features={product.features}
        backgroundImage={product.image || ''}
        ctaButtons={[
          {
            text: 'Get Started',
            href: '#contact',
            icon: 'RocketIcon'
          },
          {
            text: 'Learn More',
            href: '#features',
            variant: 'outline'
          }
        ]}
      >
        <InnovationImageAnimate imageUrl={product.image || ''} />
      </ProductHero>

      {/* Main Content Sections */}
      <div id="features" className="max-w-7xl mx-auto px-4">
        {/* <OverviewSection description={product.description} /> */}
        {/* <WhatIsSection 
          title={product.productSections?.find(s => s.sectionType === 'what_is')?.title}
          subtitle={product.productSections?.find(s => s.sectionType === 'what_is')?.subtitle}
          cards={product.productSections?.find(s => s.sectionType === 'what_is')?.cards}
          systemName={product.title}
        />
        <WhyNeedItSection 
          title={product.productSections?.find(s => s.sectionType === 'why_need_it')?.title}
          subtitle={product.productSections?.find(s => s.sectionType === 'why_need_it')?.subtitle}
          cards={product.productSections?.find(s => s.sectionType === 'why_need_it')?.cards}
        />
        <CoreFeaturesSection features={product.features} />
        <HowUpliftBuildsItSection />
        <TechStackSection techStackSection={product.techStackSection} />
        <ExampleScreensSection caseStudy={product.caseStudy || ""} />
        <FAQSection /> */}
      </div>

      {/* Call to Action Section (Full Width) */}
      {/* <CallToActionSection systemName={product.title} /> */}
    </main>
  );
}
