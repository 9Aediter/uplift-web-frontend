import React from 'react';
import Nav from "@/components/nav/resnav";
import Footer from "@/components/footer/footer";
import { ServiceShowcaseSection } from "@/components/section/service/service";
import { headers } from 'next/headers';
import { HeroSection } from "@/components/section/service/hero"

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

// Define the expected type for serviceShowcaseContent
interface ShowcaseSectionContent {
  showcase_items: any[]; // Use a more specific type if you have one for ShowcaseItem
}

export default async function ServicePage() {
  const headersList = headers();
  const locale = (await headersList).get('x-next-locale') || 'en';
  const serviceShowcaseContent = await getServicesData(locale);

  // Type Guard and Assertion
  if (!serviceShowcaseContent || !('showcase_items' in serviceShowcaseContent) || !Array.isArray(serviceShowcaseContent.showcase_items)) {
    return <div>Error: Service Showcase content not found or invalid for {locale}</div>;
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