// app/analytics-provider.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    window.gtag?.("config", "G-QZPW51MJ4X", {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}