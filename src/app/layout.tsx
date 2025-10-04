import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from 'next/script';
import AnalyticsProvider from "@/lib/providers/analytics";
import { SonnerProvider } from "@/lib/providers/sonner";
import { ModalProvider } from "@/lib/providers/modal";
import { ThemeProvider } from "@/lib/providers/theme";
import { ErrorHandler } from "@/components/common/error-handler";
import { AuthInitializer } from "@/components/auth/auth-initializer";
import { jsonLd, organizationSchema, websiteSchema, breadcrumbSchema, abs } from '@/lib/seo/schema'
import "@/style/globals.css";

// Font LINESeedSans - WOFF2 for better performance (~35% smaller than OTF)
const lineSeedSans = localFont({
  src: [
    {
      path: '../../public/fonts/LINESeedSans/LINESeedSansTH_W_Th.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LINESeedSans/LINESeedSansTH_W_He.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LINESeedSans/LINESeedSansTH_W_Rg.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LINESeedSans/LINESeedSansTH_W_Bd.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LINESeedSans/LINESeedSansTH_W_XBd.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-line-seed',
  display: 'swap',
  preload: true,
});

// Root metadata - simple and static
export const metadata: Metadata = {
  title: {
    default: 'UPLIFT TECHNOLOGY CO., LTD.',
    template: `%s | UPLIFTTECH`
  },
  description: 'Software House สาย Startup Culture ที่เปลี่ยนความคิดสร้างสรรค์ให้กลายเป็นโซลูชันเชิงนวัตกรรม',
  keywords: ['Software Development', 'ERP System', 'POS Solution', 'Web Application', 'Technology', 'Thailand'],
  authors: [{ name: 'Uplift Team', url: 'https://uplifttech.store/about' }],
  creator: 'UPLIFTTECH',
  publisher: 'UPLIFTTECH',
  metadataBase: new URL('https://uplifttech.store'),
  openGraph: {
    title: 'UPLIFT TECHNOLOGY CO., LTD.',
    description: 'Software House สาย Startup Culture',
    url: 'https://uplifttech.store',
    siteName: 'UPLIFTTECH',
    type: 'website',
    locale: 'th_TH',
    alternateLocale: ['en_US'],
    images: [
      {
        url: '/og/cover.jpg',
        width: 1200,
        height: 630,
        alt: 'UPLIFT TECHNOLOGY',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UPLIFT TECHNOLOGY CO., LTD.',
    description: 'Software House สาย Startup Culture',
    images: ['/og/cover.jpg'],
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
    canonical: 'https://uplifttech.store',
    languages: {
      'en': 'https://uplifttech.store/en',
      'th': 'https://uplifttech.store/th',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/svg/logo/logo.svg" />
      </head>
      <body
        className={`${lineSeedSans.variable} font-sans antialiased w-full overflow-x-hidden max-w-full`}
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
              organizationSchema('th'),
              websiteSchema('th'),
              breadcrumbSchema([{
                name: 'หน้าแรก',
                item: abs('/th')
              }])
            ])
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
