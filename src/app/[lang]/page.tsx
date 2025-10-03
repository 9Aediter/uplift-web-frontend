// Home Page - src/app/[lang]/page.tsx
// Main landing page for Uplift Technology co., LTD website with i18n support

import Nav from "@/components/basic/nav/resnav";
import Footer from "@/components/footer/footer";

// Home Components
import { Hero } from "@/components/home/hero/heroai";
import Problems from "@/components/home/problems";
import { SolutionSSR as Solution } from "@/components/home/solution";
import { DemoApp } from "@/components/home/demo-app";
import { Product } from "@/components/home/product";
import { CalltoAction as CTA } from "@/components/home/cta";

import { AuthSuccessHandler } from "@/components/auth/auth-success-handler";
import { OAuthSuccessHandler } from "@/components/auth/oauth-success-handler";
import FloatingActionButton from "@/components/floating-action-button";

// Valid languages
const VALID_LANGS = ['en', 'th'] as const;
type Lang = typeof VALID_LANGS[number];

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

  // Extract content sections from the data structure
  const heroContent = homepageData.hero;
  const homePageContent = homepageData.home;
  const servicesContent = homepageData.services;
  const problemsContent = homepageData.problems;
  const solutionContent = homepageData.solution;

  // Data should always be available, but add safety checks
  if (!heroContent) {
    throw new Error(`Hero content not found for locale: ${lang}`);
  }

  if (!homePageContent) {
    throw new Error(`Home page content not found for locale: ${lang}`);
  }

  if (!servicesContent) {
    throw new Error(`Services content not found for locale: ${lang}`);
  }

  return (
    <div className="w-full overflow-x-hidden max-w-full">
      <AuthSuccessHandler />
      <OAuthSuccessHandler />
      <Nav />

      <main className="w-full inset-0 overflow-x-hidden max-w-full">
        {/* Hero Section */}
        <Hero heroContent={heroContent} />

        {/* Problems Section */}
        <Problems />

        {/* Solution Section */}
        <Solution data={solutionContent} />

        {/* Demo App Section */}
        <DemoApp />

        {/* Product Section */}
        <Product />

        {/* CTA Section */}
        <CTA />
      </main>

      <Footer />

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}
