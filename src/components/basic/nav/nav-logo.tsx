"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const NavLogo = () => {
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] || 'en';

  return (
    <Link
      href={`/${currentLang}`}
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src="/svg/logo/logo.svg"
        alt="Uplift Logo"
        width={32}
        height={32}
        className="h-8 w-8"
        priority
      />
      <span className="font-black text-black dark:text-white">UPLIFT</span>
    </Link>
  );
};