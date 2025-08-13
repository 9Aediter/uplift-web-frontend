import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import Script from 'next/script';
import AnalyticsProvider from "@/lib/analytics-provider";
import { SonnerProvider } from "@/lib/sonner-provider";
import { ModalProvider } from "@/lib/modal-provider";
import { AuthProvider } from "@/lib/auth-provider";
import { ErrorHandler } from "@/components/error-handler";
import { getDictionary } from '@/lib/i18n'
import { headers } from 'next/headers'
import "@/style/globals.css";

// Font Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Font Kanit
const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
});

// SEO Metadata
// export const metadata: Metadata = {
//   title: "UPLIFT",
//   description: "Uplift your Business with IT Solutions",
//   keywords: ["UPLIFT", "CMS", "ระบบจัดการเว็บไซต์", "Next.js", "Prisma", "Tailwind"],
//   authors: [{ name: "Uplift Team" }],
//   creator: "UPLIFT",
//   metadataBase: new URL("https://uplifttech.dev"),
//   openGraph: {
//     title: "UPLIFT CMS",
//     description: "Uplift your Business with IT Solutions",
//     url: "https://uplifttech.store",
//     siteName: "UPLIFT",
//     type: "website",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//     },
//   },
// };

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const locale = headersList.get('x-next-locale') || 'en'
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
    <html lang={locale} className="dark overflow-x-hidden">
      <body
        className={`${inter.variable} ${kanit.variable} antialiased w-full overflow-hidden`}
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
        <AnalyticsProvider />
        <AuthProvider>
          <ModalProvider>
            <SonnerProvider />
            <ErrorHandler />
            {/* Main content */}      
            {children}
          </ModalProvider>
        </AuthProvider>       
      </body>
    </html>
  );
}
