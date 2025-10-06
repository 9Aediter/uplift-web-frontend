/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://uplifttech.store',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  
  // Exclude admin, API, and test routes
  exclude: [
    '/admin/*',
    '/api/*', 
    '/test/*',
    '/private/*',
    '/auth/*',
    '/coming-soon',
    '/repp' // deprecated route
  ],

  // Generate index sitemap
  generateIndexSitemap: true,
  
  // Custom transformation for better SEO
  transform: async (config, path) => {
    // Skip hidden/test routes
    if (path.includes('/test/') || path.includes('/private/')) {
      return null
    }

    // Set priorities based on page importance
    let priority = 0.7
    let changefreq = 'weekly'

    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (['/innovation', '/service', '/solutions'].includes(path)) {
      priority = 0.9
      changefreq = 'daily'
    } else if (['/story', '/vision'].includes(path)) {
      priority = 0.8
      changefreq = 'monthly'
    } else if (path.startsWith('/legal/')) {
      priority = 0.3
      changefreq = 'yearly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },

  // Additional paths for dynamic routes (will be populated by API)
  additionalPaths: async (config) => {
    const paths = []
    
    try {
      // Add innovation dynamic routes
      const innovations = ['smart-erp-system', 'modern-pos-solution', 'web-app-platform']
      innovations.forEach(slug => {
        paths.push({
          loc: `/innovation/${slug}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        })
      })

      // Add service dynamic routes (if you have them)
      const services = ['web-development', 'mobile-app', 'consulting']
      services.forEach(slug => {
        paths.push({
          loc: `/service/${slug}`,
          changefreq: 'weekly', 
          priority: 0.8,
          lastmod: new Date().toISOString(),
        })
      })

      // Add i18n routes
      const mainRoutes = ['/', '/innovation', '/service', '/solutions', '/story', '/vision']
      mainRoutes.forEach(route => {
        paths.push({
          loc: `/en${route === '/' ? '' : route}`,
          changefreq: route === '/' ? 'daily' : 'weekly',
          priority: route === '/' ? 1.0 : 0.8,
          lastmod: new Date().toISOString(),
        })
      })

    } catch (error) {
      console.warn('Error generating additional sitemap paths:', error)
    }

    return paths
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/test', '/private'],
      },
      // Allow AI crawlers
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot', 
        allow: '/',
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
      }
    ],
    additionalSitemaps: [
      'https://uplifttech.store/sitemap.xml',
    ],
  }
};