// Home Page - src/app/[lang]/page.tsx
// Main landing page for Uplift Technology co., LTD website with i18n support

import dynamic from "next/dynamic";
import Nav from "@/components/basic/nav/resnav";
import Footer from "@/components/layout/footer/footer";

// ============================================
// ABOVE-THE-FOLD (Load immediately + SSR)
// ============================================
import { Hero } from "@/components/page/home/hero/heroai";
import { AuthSuccessHandler } from "@/components/auth/auth-success-handler";
import { OAuthSuccessHandler } from "@/components/auth/oauth-success-handler";

// ============================================
// BELOW-THE-FOLD (Dynamic + SSR for SEO)
// ============================================
const Problems = dynamic(() => import("@/components/page/home/problems"), {
  loading: () => <div className="min-h-[400px]" /> // Skeleton placeholder
});

const Solution = dynamic(() => import("@/components/page/home/solution").then(mod => ({ default: mod.SolutionSSR })), {
  loading: () => <div className="min-h-[400px]" />
});

const Product = dynamic(() => import("@/components/page/home/product").then(mod => ({ default: mod.Product })), {
  loading: () => <div className="min-h-[400px]" />
});

const FAQ = dynamic(() => import("@/components/page/home/faq").then(mod => ({ default: mod.FAQ })), {
  loading: () => <div className="min-h-[400px]" />
});

const BestPractice = dynamic(() => import("@/components/page/home/best-practice").then(mod => ({ default: mod.BestPractice })), {
  loading: () => <div className="min-h-[600px]" />
});

const FounderVision = dynamic(() => import("@/components/page/home/founder-vision").then(mod => ({ default: mod.FounderVision })), {
  loading: () => <div className="min-h-[600px]" />
});

// ============================================
// INTERACTIVE ONLY (Lazy loaded - less critical)
// ============================================
const DemoApp = dynamic(() => import("@/components/page/home/demo-app").then(mod => ({ default: mod.DemoApp })), {
  loading: () => <div className="min-h-[500px]" />
});

const TechStack = dynamic(() => import("@/components/page/home/tech-stack").then(mod => ({ default: mod.TechStack })), {
  loading: () => <div className="min-h-[500px]" />
});

const SolutionArchitecture = dynamic(() => import("@/components/page/home/solution-architecture").then(mod => ({ default: mod.SolutionArchitecture })), {
  loading: () => <div className="min-h-[500px]" />
});

// Valid languages
const VALID_LANGS = ['en', 'th'] as const;
type Lang = typeof VALID_LANGS[number];

// Dynamic import of homepage data with validation
const getHomepageData = async (locale: string) => {
  try {
    const homepageData = await import(`@/data/homepage/${locale}.json`);
    const data = homepageData.default;

    // Validate required fields
    if (!data?.hero || !data?.home || !data?.services) {
      console.error(`Invalid data structure in ${locale}.json`);
      throw new Error('Invalid locale data structure');
    }

    return data;
  } catch (error) {
    // Fallback to English if locale file doesn't exist or is invalid
    console.warn(`Failed to load ${locale}.json, falling back to English`, error);
    const fallbackData = await import(`@/data/homepage/en.json`);
    return fallbackData.default;
  }
};

// Load Problems data by section
const getProblemsData = async (locale: string) => {
  try {
    const problemsData = await import(`@/data/homepage/problems/${locale}.json`);
    return problemsData.default;
  } catch (error) {
    console.warn(`Failed to load problems/${locale}.json, falling back to English`, error);
    const fallbackData = await import(`@/data/homepage/problems/en.json`);
    return fallbackData.default;
  }
};

// Load FAQ data by section
const getFAQData = async (locale: string) => {
  try {
    const faqData = await import(`@/data/homepage/faq/${locale}.json`);
    return faqData.default;
  } catch (error) {
    console.warn(`Failed to load faq/${locale}.json, falling back to English`, error);
    const fallbackData = await import(`@/data/homepage/faq/en.json`);
    return fallbackData.default;
  }
};

// Load Tech Stack data by section
const getTechStackData = async (locale: string) => {
  try {
    const techStackData = await import(`@/data/homepage/techstack/${locale}.json`);
    return techStackData.default;
  } catch (error) {
    console.warn(`Failed to load techstack/${locale}.json, falling back to English`, error);
    const fallbackData = await import(`@/data/homepage/techstack/en.json`);
    return fallbackData.default;
  }
};

// Load Portfolio data by section
const getPortfolioData = async (locale: string) => {
  try {
    const portfolioData = await import(`@/data/homepage/portfolio/${locale}.json`);
    return portfolioData.default;
  } catch (error) {
    console.warn(`Failed to load portfolio/${locale}.json, falling back to English`, error);
    const fallbackData = await import(`@/data/homepage/portfolio/en.json`);
    return fallbackData.default;
  }
};

// Load Stats data by section - TODO: Use this when StatsCards component is refactored
// const getStatsData = async (locale: string) => {
//   try {
//     const statsData = await import(`@/data/homepage/stats/${locale}.json`);
//     return statsData.default;
//   } catch (error) {
//     console.warn(`Failed to load stats/${locale}.json, falling back to English`, error);
//     const fallbackData = await import(`@/data/homepage/stats/en.json`);
//     return fallbackData.default;
//   }
// };

// Generate static params for en and th
export function generateStaticParams() {
  return VALID_LANGS.map((lang) => ({ lang }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;
  const lang = VALID_LANGS.includes(paramLang as Lang) ? paramLang : 'en';
  const homepageData = await getHomepageData(lang);

  return {
    title: homepageData.title,
    description: homepageData.description,
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  // Await and validate lang parameter
  const { lang: paramLang } = await params;
  const lang = VALID_LANGS.includes(paramLang as Lang) ? paramLang : 'en';

  // 🆕 Load homepage data using lang parameter
  const homepageData = await getHomepageData(lang);
  const problemsData = await getProblemsData(lang);
  const faqData = await getFAQData(lang);
  const techStackData = await getTechStackData(lang);
  const portfolioData = await getPortfolioData(lang);
  // TODO: statsData will be used when StatsCards component is refactored
  // const statsData = await getStatsData(lang);

  // Extract content sections - data is already validated in getHomepageData
  const { hero: heroContent, solution: solutionContent } = homepageData;

  return (
    <div className="w-full overflow-x-hidden max-w-full">
      <AuthSuccessHandler />
      <OAuthSuccessHandler />
      <Nav />

      <main className="w-full inset-0 overflow-x-hidden max-w-full">
        {/* Hero Section */}
        <Hero heroContent={heroContent} lang={lang} />

        {/* Problems Section */}
        <Problems data={problemsData} />

        {/* Solution Section */}
        <Solution data={solutionContent} />

        {/* Best Practice Section */}
        <BestPractice data={portfolioData} />

        {/* Demo App Section */}
        <DemoApp />

        {/* Tech Stack Section */}
        <TechStack data={techStackData} />

        {/* Solution Architecture Section */}
        <SolutionArchitecture />

        {/* Product Section */}
        <Product />

        {/* Founder Vision Section */}
        <FounderVision lang={lang} />

        {/* FAQ Section */}
        <FAQ data={faqData} />
      </main>

      <Footer />
    </div>
  );
}
