// import fetcher from '@helpers/fetcher'
import { slugify } from '@utils/index'
// import { AxiosRequestConfig } from 'axios'
// import { Hashtag, IHashtagResponse } from 'pages/hashtag/[tag]'
import { IHashtagResponse } from 'pages/hashtag/[tag]'

export async function getSeoKeywords(): Promise<string[]> {
  // Mock data for development/build - replace with actual API call when ready
  // const apiPath = process.env.SEO_SERVICE + '/map'
  // if (!apiPath) return []
  // const response = await fetcher.GET<string[]>(apiPath)
  // return response

  return ['foo', 'boo', 'travel', 'fashion', 'food']
}

export const fetchSeoPagePath = async () => {
  const whitelist = await getSeoKeywords()
  // If whitelist is an array, use it directly; if it's an object, use Object.keys
  const keys = Array.isArray(whitelist) ? whitelist : Object.keys(whitelist)
  return keys.map((key) => ({
    params: { tag: slugify(key) },
  }))
}

export async function fetchHashtagByKeyword(keyword?: string, _customConfig?: unknown): Promise<IHashtagResponse | null> {
  const seoKeywords = await getSeoKeywords()

  // Mock: Return empty hashtag data for mock keywords
  // const apiPath = process.env.SEO_SERVICE
  // if (!apiPath) return null

  const keys = Array.isArray(seoKeywords) ? seoKeywords : Object.keys(seoKeywords)
  const matchedTag = keys.find((key) => slugify(key) === keyword) || null

  // Return mock data instead of calling API
  if (!matchedTag) return null

  return {
    is_related: {
      recent: [],
      older: [],
    },
    most_repeated: {
      recent: [],
      older: [],
    },
  }

  /* Original API call - commented out for mock
  const apiPath = process.env.SEO_SERVICE
  if (!apiPath) return null

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
  */
}
