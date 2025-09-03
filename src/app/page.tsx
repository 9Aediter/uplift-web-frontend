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
// AuthInitializer moved to layout.tsx
import { Suspense } from "react";
import { headers } from 'next/headers';
import { PageRenderer } from "@/lib/widgets/rendering/WidgetRenderer";

// 🆕 New SSR Hero System
import { SSRHeroRenderer } from "@/components/rendering/hero-renderer";
import { getHeroData } from "@/data/homepage/hero";

// Mock data for Hero component - updated structure
const mockHeroContent = {
  en: {
    badge: "Innovating the Future",
    title: "Transform IDEAS into",
    title_gradient: "Revolutionary Innovation",
    subtitle: "Transform your business with cutting-edge artificial intelligence solutions that drive growth and innovation.",
    launch_button: "Launch Project",
    explore_button: "Explore Innovation"
  },
  th: {
    badge: "Innovating the Future",
    title: "เปลี่ยน IDEAS ให้กลายเป็น",
    title_gradient: "นวัตกรรมระดับ Revolutionary",
    subtitle: "เปลี่ยนธุรกิจของคุณด้วยโซลูชั่นปัญญาประดิษฐ์ที่ทันสมัยเพื่อการเติบโตและนวัตกรรม",
    launch_button: "เริ่มโปรเจค",
    explore_button: "สำรวจนวัตกรรม"
  }
};

const mockHomeContent = {
  en: { title: "Transform Your Business", subtitle: "With Custom Software" },
  th: { title: "เปลี่ยนธุรกิจคุณ", subtitle: "ด้วยซอฟต์แวร์ตามต้องการ" }
};

const mockServicesContent = {
  en: { 
    title: "Our Services", 
    description: "Comprehensive software solutions",
    service: {
      title: "Our Services",
      subtitle: "Complete business solutions",
      items: [
        { title: "ERP Systems", description: "Business management", link: "/service/erp-system", icon: "monitor", color: "blue" },
        { title: "POS Solutions", description: "Point of sale systems", link: "/service/pos-solution", icon: "shopping-cart", color: "green" },
        { title: "Web Apps", description: "Custom development", link: "/service/web-application", icon: "globe", color: "purple" }
      ]
    }
  },
  th: { 
    title: "บริการของเรา", 
    description: "โซลูชั่นซอฟต์แวร์ครบครัน",
    service: {
      title: "บริการของเรา",
      subtitle: "โซลูชั่นธุรกิจครบครัน",
      items: [
        { title: "ระบบ ERP", description: "การจัดการธุรกิจ", link: "/service/erp-system", icon: "monitor", color: "blue" },
        { title: "ระบบ POS", description: "ระบบขายหน้าร้าน", link: "/service/pos-solution", icon: "shopping-cart", color: "green" },
        { title: "เว็บแอพ", description: "พัฒนาตามต้องการ", link: "/service/web-application", icon: "globe", color: "purple" }
      ]
    }
  }
};

export default async function Home() {
  const headersList = headers();
  const locale = (await headersList).get('x-next-locale') || 'en';

  // 🆕 Load hero data using new SSR system (unused for now)
  // const heroData = await getHeroData('ai'); // Use AI hero variant

  // Use mock data for other sections (will migrate these later)
  const heroContent = mockHeroContent[locale as keyof typeof mockHeroContent];
  const homePageContent = mockHomeContent[locale as keyof typeof mockHomeContent];
  const servicesContent = mockServicesContent[locale as keyof typeof mockServicesContent];

  // Mock data should always be available, but add safety checks
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
        {/* 🆕 New SSR Hero System */}
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
        
        {/* Original Hero for comparison */}
        {/* <Suspense fallback={<HeroSectionSkeleton />}>
          <Hero heroContent={heroContent} />
        </Suspense> */}
       
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

        {/* Dynamic Widget Content - Test Implementation */}
        {/* <PageRenderer
          sections={[
            {
              id: 'test-single-card',
              type: 'widget',
              widgetType: 'single-card',
              title: 'Transform Your Business CTA',
              order: 1,
              isActive: true,
              data: {
                title: 'Ready to Transform Your Business?',
                subtitle: 'Start Your Journey Today',
                description: 'Join hundreds of businesses that have revolutionized their operations with our custom software solutions.',
                primaryButtonText: 'Get Free Consultation',
                primaryButtonLink: '/consultation',
                secondaryButtonText: 'View Case Studies',
                secondaryButtonLink: '/case-studies',
                backgroundColor: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
                trustIndicators: [
                  { indicator: 'FINTECH' },
                  { indicator: 'HEALTHCARE' },
                  { indicator: 'RETAIL' },
                  { indicator: 'MANUFACTURING' }
                ],
                showAnimations: true
              }
            },
            {
              id: 'test-four-column',
              type: 'widget',
              widgetType: 'four-column-cards',
              title: 'Why Choose Uplift',
              order: 2,
              isActive: true,
              data: {
                title: 'Why Choose Uplift Technology?',
                subtitle: 'We understand the challenges facing modern businesses',
                backgroundColor: 'bg-gray-50',
                items: [
                  {
                    title: 'Expert Team',
                    description: 'Seasoned developers with 10+ years of experience in enterprise solutions',
                    icon: 'award',
                    color: 'blue'
                  },
                  {
                    title: 'Proven Results',
                    description: 'Successfully delivered 100+ projects across various industries',
                    icon: 'rocket',
                    color: 'green'
                  },
                  {
                    title: 'Latest Technology',
                    description: 'Using cutting-edge tech stack for scalable and secure solutions',
                    icon: 'zap',
                    color: 'purple'
                  },
                  {
                    title: '24/7 Support',
                    description: 'Round-the-clock technical support and maintenance services',
                    icon: 'shield',
                    color: 'orange'
                  }
                ]
              }
            },
            {
              id: 'test-three-column',
              type: 'widget',
              widgetType: 'three-column-cards',
              title: 'Featured Solutions',
              order: 3,
              isActive: true,
              data: {
                title: 'Featured Solutions',
                subtitle: 'Explore our most popular business transformation packages',
                backgroundColor: 'bg-black',
                items: [
                  {
                    title: 'Complete ERP Suite',
                    description: 'End-to-end business management system with inventory, accounting, CRM, and reporting',
                    icon: 'database',
                    color: 'blue',
                    link: '/service/erp-suite'
                  },
                  {
                    title: 'Smart POS System',
                    description: 'Modern point-of-sale solution with inventory management and analytics',
                    icon: 'shopping-cart',
                    color: 'green',
                    link: '/service/pos-system'
                  },
                  {
                    title: 'Custom Web Platform',
                    description: 'Tailored web applications designed for your specific business needs',
                    icon: 'globe',
                    color: 'purple',
                    link: '/service/web-platform'
                  }
                ]
              }
            }
          ]}
          context={{ 
            isPreview: false,
            locale: locale,
            theme: 'light'
          }}
        /> */}

      </main>
      <Footer />
    </>
  );
}
