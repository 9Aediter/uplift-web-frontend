import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_FILE_REGEX = /\.(.*)$/

const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'th'],
}

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)
  const locale = match(languages, locales, i18n.defaultLocale)
  return locale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname is for a public file
  if (PUBLIC_FILE_REGEX.test(pathname)) {
    return NextResponse.next()
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }

  // If a locale is present in the pathname, rewrite the URL to remove it
  // and set the x-next-locale header.
  const locale = pathname.split('/')[1]
  if (i18n.locales.includes(locale)) {
    const newPathname = pathname.replace(`/${locale}`, '') || '/' // Remove locale prefix, if it's just /en, make it /
    const response = NextResponse.rewrite(new URL(newPathname, request.url))
    response.headers.set('x-next-locale', locale)
    return response
  }

  // If no locale is found and no redirect/rewrite happened, just proceed
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)?'
  ],
}

// Polyfill for Negotiator (if not already installed)
// You might need to install 'negotiator' package: npm install negotiator
// And '@types/negotiator' for TypeScript: npm install --save-dev @types/negotiator
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'
