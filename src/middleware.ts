import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_FILE_REGEX = /\.(.*)$/

const i18n = {
  defaultLocale: 'th',
  locales: ['en', 'th'],
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle Next.js Image optimization errors in production
  if (pathname.startsWith('/_next/image')) {
    try {
      const response = NextResponse.next()
      
      // Add CORS headers for external image sources
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
      
      // Add caching headers
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      
      return response
    } catch (error) {
      console.error('Image optimization error:', error)
      // Return empty response for failed images
      return new NextResponse(null, { status: 404 })
    }
  }

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
      // Get accessToken from httpOnly cookie (unified with API client)
      const accessToken = request.cookies.get('accessToken')?.value
      
      if (!accessToken) {
        // No token - redirect to signin
        const signInUrl = new URL(`/${locale}/auth/signin`, request.url)
        signInUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(signInUrl)
      }

      // Decode JWT to check roles (without verification for middleware)
      // In production, you might want to verify the JWT signature
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]))
        
        // 🔍 DEBUG: ดู JWT payload structure จริง
        console.log('🔍 [MIDDLEWARE DEBUG] Full JWT payload:', JSON.stringify(payload, null, 2))
        console.log('🔍 [MIDDLEWARE DEBUG] payload.user:', payload.user)
        console.log('🔍 [MIDDLEWARE DEBUG] payload.roles:', payload.roles)
        console.log('🔍 [MIDDLEWARE DEBUG] payload.user?.roles:', payload.user?.roles)
        
        const userRoles = payload.user?.roles || []
        console.log('🔍 [MIDDLEWARE DEBUG] Extracted userRoles:', JSON.stringify(userRoles, null, 2))
        
        // Check role.name for admin access
        const hasAdminRole = userRoles.some((role: any) => 
          role.name === 'Admin' || role.pathRoles === 'admin'
        )
        
        console.log('🔍 [MIDDLEWARE DEBUG] hasAdminRole result:', hasAdminRole)

        if (!hasAdminRole) {
          // Not authorized - redirect to 403 error or home
          console.log('🚫 [MIDDLEWARE DEBUG] Access DENIED - No admin role found')
          return NextResponse.redirect(new URL(`/${locale}/?error=forbidden`, request.url))
        }

        console.log('✅ [MIDDLEWARE DEBUG] Access GRANTED - Admin role found')
        // Admin access granted
      } catch (jwtError) {
        // Invalid JWT - redirect to signin
        const signInUrl = new URL(`/${locale}/auth/signin`, request.url)
        signInUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(signInUrl)
      }
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

