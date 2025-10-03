// Layout for [lang] routes
import { ReactNode } from 'react';

export default function LangLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

// Generate static params for supported languages
export function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'th' },
  ];
}
