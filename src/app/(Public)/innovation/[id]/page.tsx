import React from 'react';
import { Section } from '@/components/ui/section';
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
      {/* Hero Section Background */}
      <div className="absolute inset-0 z-0">
        <InnovationImageAnimate imageUrl={product.image?.[0]?.url || ''} />
      </div>

      {/* Hero Section Content */}
      <Section className="relative z-10 max-w-7xl mx-auto h-[60vh] flex flex-col justify-end px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          {product.title}
        </h1>
        <p className="text-xl text-cyan-400 mb-6">{product.subtitle}</p>
      </Section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4">
        {/* <OverviewSection description={product.description} /> */}
        <WhatIsSection systemName={product.title} />
        <WhyNeedItSection />
        <CoreFeaturesSection features={product.features} />
        <HowUpliftBuildsItSection />
        <TechStackSection />
        <ExampleScreensSection caseStudy={product.caseStudy || ""} />
        <FAQSection />
      </div>

      {/* Call to Action Section (Full Width) */}
      {/* <CallToActionSection systemName={product.title} /> */}
    </main>
  );
}
