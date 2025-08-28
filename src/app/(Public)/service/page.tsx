import React from 'react';
import Nav from "@/components/nav/resnav";
import Footer from "@/components/footer/footer";
import { ServiceShowcaseSection } from "@/components/section/service/service";
import { headers } from 'next/headers';
import { HeroSection } from "@/components/section/service/hero"

// Mock data for service page
const mockServiceShowcaseContent = {
  en: {
    showcase_items: [
      {
        id: 1,
        title: "ERP Systems",
        description: "Complete business management solutions",
        icon: "🏢"
      },
      {
        id: 2,
        title: "POS Solutions",
        description: "Modern point-of-sale systems",
        icon: "💳"
      },
      {
        id: 3,
        title: "Web Applications",
        description: "Custom web development",
        icon: "🌐"
      }
    ]
  },
  th: {
    showcase_items: [
      {
        id: 1,
        title: "ระบบ ERP",
        description: "โซลูชั่นการจัดการธุรกิจครบครัน",
        icon: "🏢"
      },
      {
        id: 2,
        title: "ระบบ POS", 
        description: "ระบบขายหน้าร้านสมัยใหม่",
        icon: "💳"
      },
      {
        id: 3,
        title: "เว็บแอปพลิเคชัน",
        description: "พัฒนาเว็บตามต้องการ",
        icon: "🌐"
      }
    ]
  }
};

// Define the expected type for serviceShowcaseContent
interface ShowcaseSectionContent {
  showcase_items: any[]; // Use a more specific type if you have one for ShowcaseItem
}

export default async function ServicePage() {
  const headersList = headers();
  const locale = (await headersList).get('x-next-locale') || 'en';
  const serviceShowcaseContent = mockServiceShowcaseContent[locale as keyof typeof mockServiceShowcaseContent];

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