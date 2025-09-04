// lib/schema.ts
const BASE_URL = 'https://uplifttech.store';
export const ORG_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

export const abs = (path = '') => {
  if (!path) return BASE_URL;
  return path.startsWith('http') ? path : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

export const jsonLd = (schema: unknown) => JSON.stringify(schema);

// ---------- Site-wide schemas ----------
export const organizationSchema = (locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'UPLIFT',
  alternateName: 'UPLIFTTECH',
  legalName: 'UPLIFT TECHNOLOGY CO., LTD.',
  url: BASE_URL,
  logo: { '@type': 'ImageObject', url: abs('/svg/logo/logo.svg'), width: 1000, height: 996 },
  image: { '@type': 'ImageObject', url: abs('/og/cover.jpg'), width: 1200, height: 630 },
  description:
    locale === 'th'
      ? 'พัฒนาระบบ ERP, POS, ระบบจอง แอปมือถือ และเว็บไซต์ทันสมัย สำหรับธุรกิจ SME ในประเทศไทย'
      : 'We build custom CMS, POS, ERP and backend systems for real businesses. Specializing in modern web applications and mobile solutions.',
  foundingDate: '2022-01-01',
  founders: [{ '@type': 'Person', name: 'Anon Suphatphon', jobTitle: 'Founder & CEO' }],
  address: { '@type': 'PostalAddress', addressCountry: 'TH', addressRegion: 'Bangkok', addressLocality: 'Bangkok' },
  contactPoint: [{ '@type': 'ContactPoint', telephone: '+66-XX-XXX-XXXX', contactType: 'customer service', availableLanguage: ['Thai', 'English'] }],
  sameAs: [
    // ใส่ลิงก์จริงเท่านั้น ถ้ายังไม่มี ตัดออกไปก่อน
    // 'https://facebook.com/uplifttech', 'https://twitter.com/uplifttech', ...
  ],
  areaServed: { '@type': 'Country', name: 'Thailand' },
  serviceType: [
    'Custom Software Development',
    'ERP System Development', 
    'POS System Development',
    'Mobile App Development',
    'Web Application Development',
    'Business Automation',
    'Digital Transformation',
    'Cloud Solutions'
  ],
  knowsAbout: [
    'Next.js', 'React', 'Node.js', 'TypeScript', 'Prisma',
    'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'AI/ML',
    'Business Process Automation', 'Enterprise Architecture'
  ],
  award: locale === 'th' 
    ? 'ผู้นำด้านการพัฒนาซอฟต์แวร์สำหรับ SME ในประเทศไทย'
    : 'Leading SME Software Development Provider in Thailand'
});

export const websiteSchema = (locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: BASE_URL,
  name: 'UPLIFT - Custom Software Solutions',
  description:
    locale === 'th'
      ? 'บริษัทพัฒนาซอฟต์แวร์ชั้นนำ เชี่ยวชาญ ERP, POS, มือถือ และ Digital Transformation'
      : "Thailand's premier custom software company for ERP, POS, mobile apps, and digital transformation.",
  publisher: { '@id': ORG_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/search?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: ['th-TH', 'en-US'],
  copyrightYear: 2022,
  copyrightHolder: { '@id': ORG_ID }
});

// ---------- Page-level helpers ----------
export const breadcrumbSchema = (items: Array<{ name: string; item: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: it.name,
    item: it.item,
  })),
});

// Article / BlogPosting schema
export const articleSchema = (opts: {
  locale: string;
  canonical: string;   // absolute url of the article page
  title: string;
  description?: string;
  imageUrls?: string[];
  authorName: string;
  datePublished: string; // ISO
  dateModified?: string; // ISO
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${opts.canonical}#article`,
  mainEntityOfPage: opts.canonical,
  headline: opts.title,
  description: opts.description,
  image: opts.imageUrls?.length ? opts.imageUrls : undefined,
  author: { '@type': 'Person', name: opts.authorName },
  publisher: { '@id': ORG_ID },
  datePublished: opts.datePublished,
  dateModified: opts.dateModified || opts.datePublished,
  inLanguage: opts.locale === 'th' ? 'th-TH' : 'en-US',
});

// Service schema for specific services
export const serviceSchema = (opts: {
  locale: string;
  serviceName: string;
  description: string;
  serviceType: string;
  areaServed?: string;
  offers?: Array<{
    name: string;
    description: string;
    price?: string;
    priceCurrency?: string;
  }>;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: opts.serviceName,
  description: opts.description,
  serviceType: opts.serviceType,
  provider: { '@id': ORG_ID },
  areaServed: opts.areaServed || { '@type': 'Country', name: 'Thailand' },
  hasOfferCatalog: opts.offers ? {
    '@type': 'OfferCatalog',
    name: `${opts.serviceName} Services`,
    itemListElement: opts.offers.map((offer, idx) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: offer.name,
        description: offer.description
      },
      price: offer.price,
      priceCurrency: offer.priceCurrency || 'THB'
    }))
  } : undefined
});

// Product schema for software products
export const productSchema = (opts: {
  locale: string;
  productName: string;
  description: string;
  imageUrls?: string[];
  features?: string[];
  applicationCategory: string;
  operatingSystem?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: opts.productName,
  description: opts.description,
  image: opts.imageUrls,
  applicationCategory: opts.applicationCategory,
  operatingSystem: opts.operatingSystem,
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'THB',
    seller: { '@id': ORG_ID }
  },
  manufacturer: { '@id': ORG_ID },
  featureList: opts.features,
  inLanguage: opts.locale === 'th' ? 'th-TH' : 'en-US'
});

// FAQ schema
export const faqSchema = (questions: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions.map(qa => ({
    '@type': 'Question',
    name: qa.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: qa.answer
    }
  }))
});

// Local Business schema (if needed for contact page)
export const localBusinessSchema = (locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#localbusiness`,
  name: 'UPLIFT Technology Solutions',
  image: abs('/og/cover.jpg'),
  telephone: '+66-XX-XXX-XXXX',
  email: 'contact@uplifttech.store',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'XXX Street', // ใส่ที่อยู่จริง
    addressLocality: 'Bangkok',
    addressRegion: 'Bangkok',
    postalCode: '10XXX',
    addressCountry: 'TH'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.7563, // พิกัดกรุงเทพฯ (ปรับตามที่อยู่จริง)
    longitude: 100.5018
  },
  url: BASE_URL,
  sameAs: organizationSchema(locale).sameAs,
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00'
  },
  priceRange: '$$',
  currenciesAccepted: 'THB',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer'
});