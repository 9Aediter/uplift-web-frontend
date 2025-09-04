import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import Script from 'next/script';
import AnalyticsProvider from "@/lib/analytics-provider";
import { SonnerProvider } from "@/lib/sonner-provider";
import { ModalProvider } from "@/lib/modal-provider";
import { ThemeProvider } from "@/lib/theme-provider";
import { ErrorHandler } from "@/components/error-handler";
import { AuthInitializer } from "@/components/auth/auth-initializer";
import { getDictionary } from '@/lib/i18n'
import { headers } from 'next/headers'
import { jsonLd, organizationSchema, websiteSchema, breadcrumbSchema, abs } from '@/lib/schema'
import "@/style/globals.css";

// Font Inter - Critical font loading
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  adjustFontFallback: true,
});

// Font Kanit - Optimized for LCP performance
const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["400", "600"],
  variable: "--font-kanit",
  display: "swap",
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  adjustFontFallback: true,
  preload: true,
});

// Metadata (Title and meta tags) generation for the root layout
export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers()
  const locale = (await headersList).get('x-next-locale') || 'en'
  const dict = await getDictionary(locale)
  const baseURL = 'https://uplifttech.store'

  return {
    title: {
      default: dict.title,
      template: `%s | UPLIFTTECH`
    },
    description: dict.description,
    keywords: dict.keywords,
    authors: [{ name: 'Uplift Team', url: `${baseURL}/about` }],
    creator: 'UPLIFTTECH',
    publisher: 'UPLIFTTECH',
    metadataBase: new URL(`${baseURL}`),
    openGraph: {
      title: dict.title,
      description: dict.description,
      url: `${baseURL}/${locale === 'en' ? '' : locale}`,
      siteName: 'UPLIFTTECH',
      type: 'website',
      locale: locale === 'th' ? 'th_TH' : 'en_US',
      images: [
        {
          url: `${baseURL}/og/cover.jpg`,
          width: 1200,
          height: 630,
          alt: dict.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.title,
      description: dict.description,
      images: [`${baseURL}/og/cover.jpg`],
      creator: '@uplifttech',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: `${baseURL}/${locale === 'en' ? '' : locale}`,
      languages: {
        en: `${baseURL}`,
        th: `${baseURL}/th`,
      },
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers()
  const locale = headersList.get('x-next-locale') || 'en'

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Preload critical fonts for better LCP */}
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/kanit/v15/nKKV-Go6G5tXcoaSEQGodLxA.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcoaSEQGodL6Wt1-vE_GIILZLaQ.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiJ-Ek.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <link rel="icon" type="image/svg+xml" href="/svg/logo/logo.svg" />
      </head>
      <body
        className={`${inter.variable} ${kanit.variable} antialiased w-full overflow-x-hidden max-w-full`}
      >
        {/* Google Analytics - Global Site Tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd([
              organizationSchema(locale),
              websiteSchema(locale),
              breadcrumbSchema([{
                name: locale === 'th' ? 'หน้าแรก' : 'Home',
                item: abs(locale === 'en' ? '/' : `/${locale}`)
              }])
            ])
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsProvider />
          <ModalProvider>
            <SonnerProvider />
            <ErrorHandler />
            {/* Auth initializer - runs on every page */}
            <AuthInitializer />
            {/* Main content */}
            {children}
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
