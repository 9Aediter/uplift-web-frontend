// Layout for [lang] routes
import { ReactNode } from 'react';

export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // Note: params is available but async in generateMetadata
  // For this layout, we just pass through children
  return <>{children}</>;
}

// Generate static params for supported languages
export function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'th' },
  ];
}
