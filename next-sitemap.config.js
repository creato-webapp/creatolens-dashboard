/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.LOCAL_SERVER_URL || 'https://2tag.ai',
  generateRobotsTxt: true, // (optional)
  // ...other options
}
