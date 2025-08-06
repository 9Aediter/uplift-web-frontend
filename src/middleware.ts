import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { Role } from '@prisma/client'

const PUBLIC_FILE_REGEX = /\.(.*)$/

const i18n = {
  defaultLocale: 'th',
  locales: ['en', 'th'],
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip API routes, auth routes, and public files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    PUBLIC_FILE_REGEX.test(pathname)
  ) {
    return NextResponse.next()
  }

  // Extract locale from pathname for admin check
  let cleanPathname = pathname
  let locale = 'th' // default locale
  
  // Check if pathname has locale prefix
  const pathSegments = pathname.split('/')
  if (pathSegments[1] && i18n.locales.includes(pathSegments[1])) {
    locale = pathSegments[1]
    cleanPathname = pathname.replace(`/${locale}`, '') || '/'
  }

  // Check admin routes protection
  if (cleanPathname.startsWith('/admin')) {
    try {
      const token = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET 
      })

      // console.log('🔍 Admin route access attempt:', {
      //   cleanPathname,
      //   hasToken: !!token,
      //   tokenRoles: token?.roles,
      //   tokenSub: token?.sub
      // })

      // Not authenticated - redirect to signin
      if (!token) {
        // console.log('❌ No token - redirecting to signin')
        const signInUrl = new URL(`/${locale}/auth/signin`, request.url)
        signInUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(signInUrl)
      }

      // Check if user has admin role - try different ways to access roles
      const userRoles = (token.roles as Role[]) || (token as any).roles || []
      const hasAdminRole = userRoles.includes('ADMIN' as Role) || userRoles.includes('SUPER_ADMIN' as Role)

      // console.log('🔐 Role check:', {
      //   tokenKeys: Object.keys(token),
      //   tokenRoles: token.roles,
      //   tokenAsAny: (token as any).roles,
      //   userRoles,
      //   hasAdminRole,
      //   roleAdmin: 'ADMIN',
      //   roleSuperAdmin: 'SUPER_ADMIN'
      // })

      if (!hasAdminRole) {
        // console.log('❌ No admin role - access denied')
        // Not authorized - redirect to 403 error or home
        return NextResponse.redirect(new URL(`/${locale}/?error=forbidden`, request.url))
      }

      // console.log('✅ Admin access granted')
    } catch (error) {
      console.error('Middleware auth error:', error)
      return NextResponse.redirect(new URL(`/${locale}/auth/signin`, request.url))
    }
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // If no locale is in the pathname, redirect to the default locale
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${i18n.defaultLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }

  // If a locale is present in the pathname, rewrite the URL to remove it
  // and set the x-next-locale header.
  const localeFromPath = pathname.split('/')[1]
  if (i18n.locales.includes(localeFromPath)) {
    const newPathname = pathname.replace(`/${localeFromPath}`, '') || '/' // Remove locale prefix, if it's just /en, make it /
    const response = NextResponse.rewrite(new URL(newPathname, request.url))
    response.headers.set('x-next-locale', localeFromPath)
    return response
  }

  // If no locale is found and no redirect/rewrite happened, just proceed
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

// Polyfill for Negotiator (if not already installed)
// You might need to install 'negotiator' package: npm install negotiator
// And '@types/negotiator' for TypeScript: npm install --save-dev @types/negotiator
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'
