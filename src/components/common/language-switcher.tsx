'use client';

import { usePathname, useRouter } from 'next/navigation';

export function useLanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current locale from pathname
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'th';

  const switchLanguage = (newLocale: string) => {
    // Remove current locale from pathname
    let newPathname = pathname;

    if (pathname.startsWith('/en')) {
      newPathname = pathname.replace(/^\/en/, '');
    } else if (pathname.startsWith('/th')) {
      newPathname = pathname.replace(/^\/th/, '');
    }

    // Ensure pathname starts with /
    if (!newPathname.startsWith('/')) {
      newPathname = '/' + newPathname;
    }

    // Add new locale prefix
    const finalPath = `/${newLocale}${newPathname === '/' ? '' : newPathname}`;

    router.push(finalPath);
  };

  return {
    currentLocale,
    switchLanguage,
  };
}
