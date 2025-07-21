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
import { Suspense } from "react";
import { getLocalizedPageContent } from '@/lib/content';
import { headers } from 'next/headers';

export default async function Home() {
  const headersList = headers();
  const locale = (await headersList).get('x-next-locale') || 'en';
  const homePageContent = await getLocalizedPageContent(locale, 'home');
  const servicesContent = await getLocalizedPageContent(locale, 'services');

  if (!homePageContent || !homePageContent.hero) {
    // Handle case where content is not found or hero section is missing
    return <div>Error: Home page content not found for {locale}</div>;
  }

  if (!servicesContent || !servicesContent.service) {
    // Handle case where services content is not found or service section is missing
    return <div>Error: Services content not found for {locale}</div>;
  }

  return (
    <>
      <Nav />
      <main className="w-full inset-0 ">
        <Suspense fallback={<HeroSectionSkeleton />}>
          <Hero heroContent={homePageContent.hero} />
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
