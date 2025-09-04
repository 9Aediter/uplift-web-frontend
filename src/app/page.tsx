// Home Page - src/app/page.tsx
// Main landing page for Uplift Technology co., LTD website

import Nav from "@/components/nav/resnav";

import Footer from "@/components/footer/footer";

// Progressive enhanced components
import { ProblemsAnimated, SolutionAnimated } from "@/components/progressive-loader";

import { DemoApp } from "@/components/section/uplift/demoapp";

import { Product } from "@/components/section/uplift/product";

import { DemoAdmin } from "@/components/section/uplift/demoadmin";

import { CalltoAction } from "@/components/section/uplift/cta";
import { 
  ProblemSectionSkeleton,
  ProductSectionSkeleton,
  DemoAppSkeleton,
  DemoAdminSkeleton,
  CtaSkeleton,
  FooterSkeleton,
  HeroAISkeleton,
  SolutionSkeleton
} from "@/components/skeleton";
import { AuthSuccessHandler } from "@/components/auth/auth-success-handler";
import { OAuthSuccessHandler } from "@/components/auth/oauth-success-handler";
import { Suspense } from "react";
import { headers } from 'next/headers';
import { SSRHeroRenderer } from "@/components/rendering/hero-renderer";

// Dynamic import of homepage data
const getHomepageData = async (locale: string) => {
  try {
    const homepageData = await import(`@/data/homepage/${locale}.json`);
    return homepageData.default;
  } catch {
    // Fallback to English if locale file doesn't exist
    const homepageData = await import(`@/data/homepage/en.json`);
    return homepageData.default;
  }
};

export async function generateMetadata() {
  const headersList = headers();
  const locale = (await headersList).get('x-next-locale') || 'en';
  const homepageData = await getHomepageData(locale);

  return {
    title: homepageData.title,
    description: homepageData.description,
  };
}

export default async function Home() {
  const headersList = headers();
  const locale = (await headersList).get('x-next-locale') || 'en';

  // 🆕 Load homepage data using new data structure
  const homepageData = await getHomepageData(locale);

  // Extract content sections from the data structure
  const heroContent = homepageData.hero;
  const homePageContent = homepageData.home;
  const servicesContent = homepageData.services;
  const problemsContent = homepageData.problems;
  const solutionContent = homepageData.solution;

  // Data should always be available, but add safety checks
  if (!heroContent) {
    throw new Error(`Hero content not found for locale: ${locale}`);
  }

  if (!homePageContent) {
    throw new Error(`Home page content not found for locale: ${locale}`);
  }

  if (!servicesContent) {
    throw new Error(`Services content not found for locale: ${locale}`);
  }

  return (
    <div className="w-full overflow-x-hidden max-w-full">
      {/* AuthInitializer moved to layout.tsx to run on every page */}
      <AuthSuccessHandler />
      <OAuthSuccessHandler />
      <Nav />
      <main className="w-full inset-0 overflow-x-hidden max-w-full">
        {/* 🆕 New SSR Hero System */}
        <Suspense fallback={<HeroAISkeleton />}>
          <SSRHeroRenderer 
            heroData={{
              heroWidgetType: 'hero-ai',
              badge: heroContent.badge,
              title: heroContent.title,
              titleGradient: heroContent.title_gradient,
              subtitle: heroContent.subtitle,
              launchButton: heroContent.launch_button,
              exploreButton: heroContent.explore_button,
              titleEn: heroContent.title,
              titleTh: heroContent.title,
              subtitleEn: heroContent.subtitle,
              subtitleTh: heroContent.subtitle,
              descriptionEn: heroContent.subtitle,
              descriptionTh: heroContent.subtitle,
              ctaButtonTextEn: heroContent.launch_button,
              ctaButtonTextTh: heroContent.launch_button,
              backgroundImageUrl: '',
              overlayOpacity: 0.5,
              textPosition: 'left',
              theme: 'dark',
              showGlobe: true
            }}
            locale={locale as 'en' | 'th'} 
          />
        </Suspense>
        
       
        <Suspense fallback={<ProblemSectionSkeleton />}>
          <ProblemsAnimated data={problemsContent} />
        </Suspense>
        
        <Suspense fallback={<SolutionSkeleton />}>
          <SolutionAnimated data={solutionContent} />
        </Suspense>

        <Suspense fallback={<DemoAppSkeleton />}>
          <DemoApp />
        </Suspense>
        <Suspense fallback={<DemoAdminSkeleton />}>
          <DemoAdmin />
        </Suspense>
        
        <Suspense fallback={<ProductSectionSkeleton />}>
          <Product />
        </Suspense>

        <Suspense fallback={<CtaSkeleton />}>
          <CalltoAction />
        </Suspense>
      </main>
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  );
}
