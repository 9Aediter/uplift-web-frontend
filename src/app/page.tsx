import Nav from "@/components/nav/resnav";
import { Hero } from "@/components/section/uplift/hero/heroai";
import Problems from "@/components/section/uplift/problem";
import Show from "@/components/section/uplift/show";
import Service from "@/components/section/uplift/service";
import Vision from "@/components/section/uplift/vision";
// import Testimonials from "@/components/section/uplift/testimonials";
import Footer from "@/components/footer/footer";
import { Product } from "@/components/section/uplift/product"
import { ProblemSectionSkeleton } from "@/components/skeleton/uplift/problem-section";
import { HeroSectionSkeleton } from "@/components/skeleton/uplift/hero-section";
import { ProductSectionSkeleton } from "@/components/skeleton/uplift/product-section";
import { AuthSuccessHandler } from "@/components/auth/auth-success-handler";
import { Suspense } from "react";
import { getLGPageDB } from '@/lib/content-db';
import { getLGPageJSON } from '@/lib/content';
import { headers } from 'next/headers';

export default async function Home() {
  const headersList = headers();
  const locale = (await headersList).get('x-next-locale') || 'en';
  
  // Load hero from database, other content from JSON
  const heroContent = await getLGPageDB(locale, 'home');
  const homePageContent = await getLGPageJSON(locale, 'home');
  const servicesContent = await getLGPageJSON(locale, 'services');

  if (!heroContent) {
    // Throw error to trigger error.tsx page
    throw new Error(`Hero section not found in database for ${locale}. Please check if the database is seeded properly.`);
  }

  if (!homePageContent) {
    // Throw error to trigger error.tsx page  
    throw new Error(`Home page content not found for ${locale}. Please check the content files.`);
  }

  if (!servicesContent || !servicesContent.service) {
    // Throw error to trigger error.tsx page
    throw new Error(`Services content not found for ${locale}. Please check the services content files.`);
  }

  return (
    <>
      <AuthSuccessHandler />
      <Nav />
      <main className="w-full inset-0 ">
        <Suspense fallback={<HeroSectionSkeleton />}>
          <Hero heroContent={heroContent} />
        </Suspense>
        <Suspense fallback={<ProblemSectionSkeleton />}>
          <Problems problemSectionContent={homePageContent.problem_section} />
        </Suspense>
        <Suspense fallback={<ProductSectionSkeleton />}>
          <Product />
        </Suspense>
        <Suspense fallback={<ProblemSectionSkeleton />}>
        <Service 
          serviceSectionContent={servicesContent.service} 
        />
        </Suspense>
        <Show />
        <Vision />

      </main>
      <Footer />
    </>
  );
}
