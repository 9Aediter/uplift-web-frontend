import React from 'react';
import { getInnovationDetail } from '@/lib/actions/innovationActions';
import { notFound } from 'next/navigation';
import { InnovationImageAnimate } from '@/components/section/innovation/innovation-image-animate';

// Import all new section components
import { OverviewSection } from '@/components/section/innovation/overview-section';
import { CoreFeaturesSection } from '@/components/section/innovation/core-features-section';
import { WhatIsSection } from '@/components/section/innovation/what-is-section';
import { WhyNeedItSection } from '@/components/section/innovation/why-need-it-section';
import { HowUpliftBuildsItSection } from '@/components/section/innovation/how-uplift-builds-it-section';
import { TechStackSection } from '@/components/section/innovation/tech-stack-section';
import { ExampleScreensSection } from '@/components/section/innovation/example-screens-section';
import { FAQSection } from '@/components/section/innovation/faq-section';
import { CallToActionSection } from '@/components/section/innovation/call-to-action-section';
import { ProductHero } from '@/components/section/innovation/product-hero';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;
  const softwareData = await getInnovationDetail(id);

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
        backgroundImage={product.coverImage || product.image?.[0]?.url || ''}
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
        <InnovationImageAnimate imageUrl={product.coverImage || product.image?.[0]?.url || ''} />
      </ProductHero>

      {/* Main Content Sections */}
      <div id="features" className="max-w-7xl mx-auto px-4">
        {/* <OverviewSection description={product.description} /> */}
        <WhatIsSection 
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
        <FAQSection />
      </div>

      {/* Call to Action Section (Full Width) */}
      {/* <CallToActionSection systemName={product.title} /> */}
    </main>
  );
}
