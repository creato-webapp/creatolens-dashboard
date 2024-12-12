import fetcher from '@helpers/fetcher'
import { slugify } from '@utils/index'
import { AxiosRequestConfig } from 'axios'
import { Hashtag } from 'pages/hashtag/[tag]'

export async function getSeoKeywords(): Promise<string[]> {
  const apiPath = process.env.SEO_SERVICE + '/map'

  if (!apiPath) return []

  const response = await fetcher.GET<string[]>(apiPath)

  return response
}

export const fetchSeoPagePath = async () => {
  const whitelist = await getSeoKeywords()
  return Object.keys(whitelist).map((key) => ({
    params: { tag: slugify(key) },
  }))
}

export async function fetchHashtagByKeyword(keyword?: string, customConfig?: AxiosRequestConfig): Promise<Hashtag[]> {
  const seoKeywords = await getSeoKeywords()

  const apiPath = process.env.SEO_SERVICE

  if (!apiPath) return []

  const matchedTag = Object.keys(seoKeywords).find((key) => slugify(key) === keyword) || null
  const response = await fetcher.GET<Hashtag[]>(apiPath, {
    ...customConfig,
    params: {
      keyword: matchedTag,
    },
  })

  return response
}
