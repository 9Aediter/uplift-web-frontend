import React from 'react';
import Nav from "@/components/basic/nav/resnav";
import Footer from "@/components/footer/footer";
import { ServiceShowcaseSection } from "@/components/section/service/service";
import { HeroSection } from "@/components/section/service/hero"
import type { ShowcaseSectionContent } from '@/types/models/service';

// Dynamic import of services data
const getServicesData = async (locale: string) => {
  try {
    const servicesData = await import(`@/data/services/${locale}.json`);
    return servicesData.default;
  } catch {
    // Fallback to English if locale file doesn't exist
    const servicesData = await import(`@/data/services/en.json`);
    return servicesData.default;
  }
};


export default async function ServicePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const serviceShowcaseContent = await getServicesData(lang);

  // Type Guard and Assertion
  if (!serviceShowcaseContent || !('showcase_items' in serviceShowcaseContent) || !Array.isArray(serviceShowcaseContent.showcase_items)) {
    return <div>Error: Service Showcase content not found or invalid for {lang}</div>;
  }

  const typedShowcaseContent: ShowcaseSectionContent = serviceShowcaseContent as ShowcaseSectionContent;

  return (
    <>
      <Nav />
      <main className="w-full inset-0 ">
        <HeroSection />
        <ServiceShowcaseSection showcaseContent={typedShowcaseContent} />
      </main>
      <Footer />
    </>
  );
}