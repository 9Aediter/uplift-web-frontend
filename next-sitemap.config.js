/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://uplifttech.dev',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/admin', '/private'],
};
