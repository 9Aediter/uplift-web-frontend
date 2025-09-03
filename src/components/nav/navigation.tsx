"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { LuExternalLink, LuMenu, LuX, LuSearch } from 'react-icons/lu';
import { IoLanguage } from 'react-icons/io5';
import { Button } from '@/components/button/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
}

interface NavigationProps {
  user?: User | null;
  isAuthenticated?: boolean;
  className?: string;
}

interface NavItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  user,
  isAuthenticated = false,
  className
}) => {
  // Safe router hooks for Storybook compatibility
  let router: any = null;
  let pathname = '/';

  try {
    router = useRouter();
    pathname = usePathname();
  } catch (error) {
    // Fallback for Storybook environment
    console.warn('Router not available, using fallback');
  }
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: "Story", href: "/story" },
    { name: "Service", href: "/service" },
    { name: "Solution", href: "/solutions" },
    { name: "Innovation", href: "/innovation" },
  ];

  const handleLanguageSwitch = () => {
    if (!router) {
      console.log('Language switch clicked (Storybook mode)');
      return;
    }
    const currentLocale = pathname.split('/')[1];
    const newLocale = currentLocale === 'en' ? 'th' : 'en';
    const newPath = `/${newLocale}${pathname.substring(currentLocale.length + 1)}`;
    router.push(newPath);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/svg/logo/logo.svg"
              alt="Uplift Logo"
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
            <span className="hidden font-bold sm:inline-block">
              Uplift
            </span>
          </Link>
        </div>

        {/* Mobile Logo */}
        <div className="mr-2 flex md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/svg/logo/logo.svg"
              alt="Uplift Logo"
              width={28}
              height={28}
              className="h-7 w-7"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.name}
              {item.isExternal && <LuExternalLink className="ml-1 h-3 w-3" />}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search - could be implemented later */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 md:hidden"
              onClick={() => console.log("Search clicked")}
            >
              <LuSearch className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex items-center space-x-2">
            {/* Language Switcher */}
            {!isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={handleLanguageSwitch}
              >
                <IoLanguage className="h-4 w-4" />
              </Button>
            )}

            {/* User Avatar or Auth */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden h-9 w-9 md:flex"
                  onClick={handleLanguageSwitch}
                >
                  <IoLanguage className="h-4 w-4" />
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || ""} alt={user.name || "User"} />
                  <AvatarFallback className="text-xs">
                    {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : null}

            {/* Consult Button */}
            <Button
              asChild
              size="sm"
              className="hidden md:flex"
            >
              <Link href="/consult">
                Consult
                <LuExternalLink className="ml-2 h-3 w-3" />
              </Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <LuX className="h-4 w-4" />
              ) : (
                <LuMenu className="h-4 w-4" />
              )}
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-b border-border/40 md:hidden">
          <div className="container grid gap-6 p-4">
            {/* Mobile Navigation Links */}
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-2 py-2 text-sm font-medium transition-colors hover:text-foreground/80",
                    pathname === item.href ? "text-foreground" : "text-foreground/60"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                  {item.isExternal && <LuExternalLink className="h-3 w-3" />}
                </Link>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="flex flex-col gap-2">
              {isAuthenticated && user && (
                <Button
                  variant="ghost"
                  onClick={handleLanguageSwitch}
                  className="justify-start"
                >
                  <IoLanguage className="mr-2 h-4 w-4" />
                  Switch Language
                </Button>
              )}

              <Button
                asChild
                size="sm"
                className="justify-start"
              >
                <Link href="/consult" onClick={() => setIsMobileMenuOpen(false)}>
                  <LuExternalLink className="mr-2 h-3 w-3" />
                  Consult
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;