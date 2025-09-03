// Home Page - src/app/page.tsx
// Main landing page for Uplift Technology co., LTD website

import Nav from "@/components/nav/resnav";
import { Hero } from "@/components/section/uplift/hero/heroai";
import Problems from "@/components/section/uplift/problem/problem";
import Show from "@/components/section/uplift/show";
import Service from "@/components/section/uplift/service";
// import Testimonials from "@/components/section/uplift/testimonials";
import Footer from "@/components/footer/footer";
import { DemoApp } from "@/components/section/uplift/demoapp";
import { Product } from "@/components/section/uplift/product"
import { Solution } from "@/components/section/uplift/solution"
import { DemoAdmin } from "@/components/section/uplift/demoadmin";
import { CalltoAction } from "@/components/section/uplift/cta";
import { ProblemSectionSkeleton } from "@/components/skeleton/uplift/problem-section";
import { HeroSectionSkeleton } from "@/components/skeleton/uplift/hero-section";
import { ProductSectionSkeleton } from "@/components/skeleton/uplift/product-section";
import { AuthSuccessHandler } from "@/components/auth/auth-success-handler";
import { OAuthSuccessHandler } from "@/components/auth/oauth-success-handler";
import { Suspense } from "react";
import { headers } from 'next/headers';
import { PageRenderer } from "@/lib/widgets/rendering/WidgetRenderer";
import { SSRHeroRenderer } from "@/components/rendering/hero-renderer";

// 🆕 New SSR Widget System
import { SSRWidgetRenderer } from "@/lib/widgets/rendering/SSRWidgetRenderer";

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
    <>
      {/* AuthInitializer moved to layout.tsx to run on every page */}
      <AuthSuccessHandler />
      <OAuthSuccessHandler />
      <Nav />
      <main className="w-full inset-0 ">
        {/* 🆕 New SSR Hero System - TODO: Re-enable when components are ready */}
        <Suspense fallback={<HeroSectionSkeleton />}>
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
          <Problems />
        </Suspense>
        <Solution />
        <DemoApp />
        <DemoAdmin />
        
        <Suspense fallback={<ProductSectionSkeleton />}>
          <Product />
        </Suspense>

        <CalltoAction />

        {/* New Problems Cards Widget (OOP System) */}
        {/* <Suspense fallback={<div className="animate-pulse py-16"><div className="max-w-7xl mx-auto px-4"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{Array(4).fill(0).map((_, i) => <div key={i} className="h-64 bg-gray-200 rounded-lg" />)}</div></div></div>}>
          <SSRWidgetRenderer
            section={{
              id: 'problems-cards-home',
              type: 'widget',
              widgetType: 'problems-cards',
              title: 'Business Problems Section',
              order: 1,
              isActive: true,
              data: {
                backgroundColor: 'bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-yellow-50/50 dark:from-black dark:via-black dark:to-black',
                items: [
                  {
                    id: 1,
                    title: 'Slow Manual Processes',
                    description: 'Teams waste hours on repetitive tasks that could be automated, reducing productivity and increasing human error.',
                    icon: '⚙️',
                    gradient: 'from-red-500 via-red-400 to-orange-500',
                    impact: '85% Time Loss'
                  },
                  {
                    id: 2,
                    title: 'Poor Data Insights',
                    description: 'Critical business decisions are made with incomplete information due to scattered data and lack of analytics.',
                    icon: '📊',
                    gradient: 'from-blue-500 via-blue-400 to-cyan-500',
                    impact: '60% Bad Decisions'
                  },
                  {
                    id: 3,
                    title: 'System Integration Issues',
                    description: 'Different software tools don\'t communicate well, creating data silos and workflow bottlenecks.',
                    icon: '🔗',
                    gradient: 'from-purple-500 via-purple-400 to-pink-500',
                    impact: '40% Efficiency Drop'
                  },
                  {
                    id: 4,
                    title: 'Scalability Limitations',
                    description: 'Current systems can\'t handle business growth, leading to crashes, slowdowns, and lost opportunities.',
                    icon: '🚀',
                    gradient: 'from-green-500 via-green-400 to-emerald-500',
                    impact: '30% Growth Blocked'
                  }
                ]
              }
            }}
            context={{ 
              isPreview: false,
              locale: locale,
              theme: 'dark'
            }}
          />
        </Suspense> */}

        {/* Solution Grid Widget (OOP System) */}
        {/* <Suspense fallback={<div className="animate-pulse py-20"><div className="max-w-7xl mx-auto px-4"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-6">{Array(6).fill(0).map((_, i) => <div key={i} className="bg-gray-200 dark:bg-gray-800 rounded-lg" />)}</div></div></div>}>
          <SSRWidgetRenderer
            section={{
              id: 'solution-grid-home',
              type: 'widget',
              widgetType: 'solution-grid',
              title: 'Solutions & Expertise Section',
              order: 2,
              isActive: true,
              data: {
                title: 'Solutions & Expertise',
                subtitle: 'ออกแบบและพัฒนาระบบสารสนเทศขนาดใหญ่สำหรับธุรกิจในหลากหลายอุตสาหกรรม',
                backgroundColor: 'bg-gradient-to-b from-background to-muted/30',
                gridLayout: 'bento',
                columns: 4,
                gap: 6,
                items: [
                  {
                    id: 1,
                    title: 'Laundry Operation System',
                    description: 'ระบบติดตามการซักรีดครบวงจร รองรับเครือข่ายระดับประเทศ',
                    icon: '🧺',
                    image: 'https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755080060582-s7qvzu2t2rh-view-laundromat-room-with-washing-machines.jpg',
                    bgColor: 'bg-sky-100 dark:bg-sky-900/20',
                    className: 'md:col-span-1',
                    clickAction: 'modal'
                  },
                  {
                    id: 2,
                    title: 'Laundry Tracking Core',
                    description: 'เรียลไทม์ติดตาม ลดเวลาสูญเปล่า เพิ่มความแม่นยำ',
                    icon: '📱',
                    image: 'https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755081413583-r9a2lsfqpts-cashier-seller-operating-payment-process-with-pos-terminal-credit-card-cropped-shot-closeup-hands-shopping-purchase-concept.jpg',
                    bgColor: 'bg-sky-100 dark:bg-sky-900/20',
                    className: 'md:col-span-1',
                    clickAction: 'modal'
                  },
                  {
                    id: 3,
                    title: 'Smart Gym Management',
                    description: 'ระบบบริหารฟิตเนส สมาชิก อุปกรณ์ คลาส แบบครบวงจร',
                    icon: '💪',
                    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=600&fit=crop&auto=format',
                    bgColor: 'bg-green-100 dark:bg-green-900/20',
                    className: 'md:col-span-1',
                    clickAction: 'modal'
                  },
                  {
                    id: 4,
                    title: 'Warehouse Management',
                    description: 'ระบบคลังสินค้าอัตโนมัติ เชื่อมต่อ Automation ลดต้นทุนแรงงาน',
                    icon: '🏭',
                    image: 'https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755081511881-7r0uq54z3v5-interior-large-distribution-warehouse-with-shelves-stacked-with-palettes-goods-ready-market.jpg',
                    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
                    className: 'md:col-span-2',
                    clickAction: 'modal'
                  },
                  {
                    id: 5,
                    title: 'Retail POS System',
                    description: 'ขายหน้าร้าน+ออนไลน์ จัดการหลายสาขา ชำระเงินครบรูปแบบ',
                    icon: '🛒',
                    image: 'https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755081810814-csakbmjowd6-possystemcashier.jpg',
                    bgColor: 'bg-gray-100 dark:bg-gray-900/20',
                    className: 'md:col-span-1',
                    clickAction: 'modal'
                  },
                  {
                    id: 6,
                    title: 'Transport Management',
                    description: 'บริหารยานพาหนะ วางแผนเส้นทาง ติดตามเรียลไทม์',
                    icon: '🚛',
                    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=600&fit=crop&auto=format',
                    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
                    className: 'md:col-span-1',
                    clickAction: 'modal'
                  }
                ]
              }
            }}
            context={{ 
              isPreview: false,
              locale: locale,
              theme: 'dark'
            }}
          />
        </Suspense> */}


      </main>
      <Footer />
    </>
  );
}
