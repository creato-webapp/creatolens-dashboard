import XAPI from '@constants/endpoints/xapi'
import fetcher from '@helpers/fetcher'
import { slugify } from '@utils/index'
import { AxiosRequestConfig } from 'axios'
import { Hashtag } from 'pages/hashtag/[tag]'

async function getSeoKeywords(customConfig?: AxiosRequestConfig): Promise<string[]> {
  const response = await fetcher.GET<string[]>(XAPI.SEO_KEYWORD, {
    ...customConfig,
  })
  return response
}

export const fetchSeoPagePath = async () => {
  const whitelist = await getSeoKeywords()
  return Object.keys(whitelist).map((key) => ({
    params: { tag: slugify(key) },
  }))
}

export async function fetchHashtagByKeyword(keyword?: string, customConfig?: AxiosRequestConfig): Promise<Hashtag[]> {
  const seoKeywords = await getSeoKeywords(customConfig)
  const matchedTag = Object.keys(seoKeywords).find((key) => slugify(key) === keyword) || null
  const response = await fetcher.GET<Hashtag[]>(XAPI.SEO_HASHTAG_BY_KEYWORD, {
    ...customConfig,
    params: {
      keyword: matchedTag,
    },
  })

  return response
}
