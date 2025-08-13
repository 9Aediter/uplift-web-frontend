/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://uplifttech.store',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/admin', '/private','/api'],
};
