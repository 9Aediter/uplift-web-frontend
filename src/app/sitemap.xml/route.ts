import { NextResponse } from 'next/server'

// Dynamic sitemap generation (alternative to next-sitemap for real-time updates)
export async function GET() {
  try {
    const baseUrl = 'https://uplifttech.store'
    const currentDate = new Date().toISOString()

    // Static routes with priorities
    const staticRoutes = [
      { path: '/', priority: 1.0, changefreq: 'daily' },
      { path: '/innovation', priority: 0.9, changefreq: 'daily' },
      { path: '/service', priority: 0.9, changefreq: 'daily' },
      { path: '/solutions', priority: 0.9, changefreq: 'daily' },
      { path: '/story', priority: 0.8, changefreq: 'monthly' },
      { path: '/vision', priority: 0.8, changefreq: 'monthly' },
      { path: '/consult', priority: 0.7, changefreq: 'weekly' },
      { path: '/legal/privacy', priority: 0.3, changefreq: 'yearly' },
      { path: '/legal/terms', priority: 0.3, changefreq: 'yearly' },
      { path: '/legal/cookies', priority: 0.3, changefreq: 'yearly' },
      { path: '/legal/data-protection', priority: 0.3, changefreq: 'yearly' },
    ]

    // Dynamic routes (could fetch from API/database)
    const dynamicRoutes = [
      // Innovation routes
      { path: '/innovation/smart-erp-system', priority: 0.8, changefreq: 'weekly' },
      { path: '/innovation/modern-pos-solution', priority: 0.8, changefreq: 'weekly' },
      { path: '/innovation/web-app-platform', priority: 0.8, changefreq: 'weekly' },
    ]

    // i18n routes
    const i18nRoutes = staticRoutes
      .filter(route => !route.path.startsWith('/legal/'))
      .map(route => ({
        ...route,
        path: `/en${route.path === '/' ? '' : route.path}`,
        priority: route.priority * 0.9 // Slightly lower priority for English
      }))

    const allRoutes = [...staticRoutes, ...dynamicRoutes, ...i18nRoutes]

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${allRoutes
    .map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`)
    .join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200', // Cache for 24h
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return NextResponse.json({ error: 'Failed to generate sitemap' }, { status: 500 })
  }
}