import React from 'react';
import { notFound } from 'next/navigation';
import Nav from "@/components/basic/nav/resnav";
import Footer from "@/components/footer/footer";

// Import all refactored section components
import HeroSection from '@/components/page/service/pagesection/HeroSection';
// import CarouselSection from '@/components/page/service/pagesection/CarouselSection';
// import QuickPitchSection from '@/components/page/service/pagesection/QuickPitchSection';
// import ProblemStatementSection from '@/components/page/service/pagesection/ProblemStatementSection';
// import InDepthFeaturesSection from '@/components/page/service/pagesection/InDepthFeaturesSection';
// import BenefitsOutcomesSection from '@/components/page/service/pagesection/BenefitsOutcomesSection';
// import CaseStudySection from '@/components/page/service/pagesection/CaseStudySection';
// import PricingSection from '@/components/page/service/pagesection/PricingSection';
// import FaqSection from '@/components/page/service/pagesection/FaqSection';

// Assuming getServiceById is available from serviceActions
// Mock data for services
const mockServices = {
  'erp-system': {
    id: '1',
    slug: 'erp-system',
    title: 'ERP System',
    subtitle: 'Enterprise Resource Planning',
    description: 'Complete business management solution'
  },
  'pos-solution': {
    id: '2',
    slug: 'pos-solution',
    title: 'POS Solution',
    subtitle: 'Point of Sale System',
    description: 'Modern retail management system'
  },
  'web-application': {
    id: '3',
    slug: 'web-application',
    title: 'Web Application',
    subtitle: 'Custom Web Development',
    description: 'Tailored web solutions for your business'
  }
};


// This page is a Server Component

// This page is a Server Component
export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { id } = await params;

  // Get mock service data
  const service = mockServices[id as keyof typeof mockServices];

  if (!service) {
    notFound(); // Render 404 page if service is not found
  }

  // Placeholder for onConsultClick - this would typically be handled by a client component
  // or a global context/state management if it triggers a modal/form.
  // const onConsultClick = () => {
  //   console.log("Consult button clicked!");
  //   // Implement your consult logic here (e.g., open a modal, redirect to contact form)
  // };

  return (
    <div className="w-full min-h-screen bg-[#111111] text-white">
      <Nav /> {/* Assuming Nav is a client component or handled by root layout */}
      <main>
        <HeroSection service={service} />
        {/* {service.highlights && service.highlights.length > 0 && (
          <QuickPitchSection
            highlights={service.highlights}
            serviceColor={service.color}
            sectionTitle="ทำไมต้องเลือกเรา"
          />
        )}
        {service.benefits && service.benefits.length > 0 && (
          <BenefitsOutcomesSection
            benefits={service.benefits}
            serviceColor={service.color}
            sectionTitle="ประโยชน์ที่คุณจะได้รับ"
          />
        )}
        {service.carouselItems && service.carouselItems.length > 0 && (
          <CarouselSection carouselItems={service.carouselItems} />
        )}
        {service.problems && service.problems.length > 0 && (
          <ProblemStatementSection
            problems={service.problems}
            serviceColor={service.color}
            sectionTitle="คุณกำลังเจอปัญหาแบบนี้อยู่หรือไม่?"
          />
        )}
        {service.features && service.features.length > 0 && (
          <InDepthFeaturesSection
            features={service.features}
            serviceColor={service.color}
            sectionTitle="ฟีเจอร์หลัก"
          />
        )}
        
        {service.caseStudies && service.caseStudies.length > 0 && (
          <CaseStudySection
            caseStudies={service.caseStudies}
            serviceColor={service.color}
            sectionTitle="ความสำเร็จของลูกค้า"
          />
        )}
        {service.pricing && service.pricing.length > 0 && (
          <PricingSection
            pricing={service.pricing}
            serviceColor={service.color}
            sectionTitle="ราคา & แพ็กเกจ"
          // onConsultClick={onConsultClick}
          />
        )}
        {service.faqs && service.faqs.length > 0 && (
          <FaqSection
            faqs={service.faqs}
            serviceColor={service.color}
            sectionTitle="คำถามที่พบบ่อย"
          // onConsultClick={onConsultClick}
          />
        )} */}
      </main>
      <Footer /> {/* Assuming Footer is a client component or handled by root layout */}
    </div>
  );
}
