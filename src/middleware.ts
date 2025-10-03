import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle Next.js Image optimization with CORS and caching headers
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

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Only match image optimization paths
    '/_next/image/:path*',
  ],
}

