// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemapIndexLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { fetchSeoPagePath } from '@services/Seo/Keywords'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const paths = await fetchSeoPagePath()
  const urls = paths.map((path) => `${process.env.LOCAL_SERVER_URL}${path.params.tag}`)
  return getServerSideSitemapIndexLegacy(ctx, urls)
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}
