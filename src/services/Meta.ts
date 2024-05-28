import { AxiosRequestConfig } from 'axios'

import { Fetcher } from './fetcher'

export interface PostData {
  count: number
  owner_username: string
  latest_created_at?: string
  second_latest_created_at?: string
  caption?: string
}

export interface KeywordData {
  term: string
  count: number
}

export interface UserProfile {
  profile_pic_url: string
  username: string
}

export interface MostRepeatedPost {
  count?: number
  latest_created_at?: string
  second_latest_created_at?: string
  caption?: string
  shortcode?: string
  username: string
  batch_id?: string
}

export async function getKeyword(
  data: {
    args: {
      accId: string
      days: number
    }
  },
  customConfig?: AxiosRequestConfig
): Promise<{ data: KeywordData[] }> {
  const keywordResponse = await Fetcher.GET<{
    data: KeywordData[]
  }>('/api/dashboard/keyword', {
    ...customConfig,
    params: {
      accId: data.args.accId,
      days: data.args.days,
    },
  })
  return keywordResponse
}

export async function getPostCount(
  data: {
    args: {
      accId: string
      days: number
    }
  },
  customConfig?: AxiosRequestConfig
): Promise<{ data: { post_count: number } }> {
  const postCountResponse = await Fetcher.GET<{
    data: { post_count: number }
  }>('/api/dashboard/postCount', {
    ...customConfig,
    params: {
      accId: data.args.accId,
      days: data.args.days,
    },
  })

  return postCountResponse
}

export async function getMostRepeatedPost(
  data: {
    args: {
      accId: string
      days: number
    }
  },
  customConfig?: AxiosRequestConfig
): Promise<MostRepeatedPost | undefined> {
  const response = await Fetcher.GET<{
    data: PostData[]
  }>('/api/dashboard', {
    ...customConfig,
    params: {
      accId: data.args.accId,
      days: data.args.days,
    },
  })

  let mostRepeatedPost: MostRepeatedPost | undefined

  if (response && response.data.length > 0) {
    const maxCountImage = response.data.reduce(
      (maxImage: PostData, currentImage: PostData) => (currentImage.count > maxImage.count ? currentImage : maxImage),
      { count: -Infinity, owner_username: '' } as PostData
    )

    const maxCountImageResponse = await Fetcher.GET<{
      data: {
        username: string
      }
    }>('/api/dashboard/instaProfile', {
      ...customConfig,
      params: {
        profile_id: maxCountImage.owner_username,
      },
    })

    mostRepeatedPost = {
      ...maxCountImage,
      username: maxCountImageResponse.data?.username,
    }
  }
  if (mostRepeatedPost) {
    return mostRepeatedPost
  }
}
