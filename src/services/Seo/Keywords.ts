import fetcher from '@helpers/fetcher'
import { slugify } from '@utils/index'
import { AxiosRequestConfig } from 'axios'
import { Hashtag, IHashtagResponse } from 'pages/hashtag/[tag]'

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

export async function fetchHashtagByKeyword(keyword?: string, customConfig?: AxiosRequestConfig): Promise<IHashtagResponse | null> {
  const seoKeywords = await getSeoKeywords()

  const apiPath = process.env.SEO_SERVICE

  if (!apiPath) return null

  const matchedTag = Object.keys(seoKeywords).find((key) => slugify(key) === keyword) || null

  const [relatedRecent, relatedOlder, repeatedRecent, repeatedOlder] = await Promise.all([
    fetcher.GET<Hashtag[]>(apiPath, {
      ...customConfig,
      params: {
        category: matchedTag,
        is_recent: true,
        limit: 20,
        is_related: true,
      },
    }),
    fetcher.GET<Hashtag[]>(apiPath, {
      ...customConfig,
      params: {
        category: matchedTag,
        is_recent: false,
        limit: 20,
        is_related: true,
      },
    }),
    fetcher.GET<Hashtag[]>(apiPath, {
      ...customConfig,
      params: {
        category: matchedTag,
        is_recent: true,
        limit: 20,
      },
    }),
    fetcher.GET<Hashtag[]>(apiPath, {
      ...customConfig,
      params: {
        category: matchedTag,
        is_recent: false,
        limit: 20,
      },
    }),
  ])

  // Combine the results into the desired format
  const mergedData = {
    is_related: {
      recent: relatedRecent,
      older: relatedOlder,
    },
    most_repeated: {
      recent: repeatedRecent,
      older: repeatedOlder,
    },
  }

  return mergedData
}
