import { AxiosRequestConfig } from 'axios'

import XAPI from '@constants/endpoints/xapi'
import { CountryEnum } from 'enums/CountryCodeEnums'

import fetcher from '../helpers/fetcher'

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

export interface IProfile {
  description: string
  image: string
  title: string
  url: string
  username: string
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
  const keywordResponse = await fetcher.GET<{
    data: KeywordData[]
  }>(XAPI.DASHBOARD_KEYWORDS, {
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
  const postCountResponse = await fetcher.GET<{
    data: { post_count: number }
  }>(XAPI.DASHBOARD_POST_COUNT, {
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
      session_id?: string
      location?: CountryEnum
    }
  },
  customConfig?: AxiosRequestConfig
): Promise<MostRepeatedPost | null> {
  const response = await fetcher.GET<{
    data: PostData[]
  }>(XAPI.DASHBOARD, {
    ...customConfig,
    params: {
      accId: data.args.accId,
      days: data.args.days,
    },
  })

  let mostRepeatedPost: MostRepeatedPost | null = null

  if (response && response.data.length > 0) {
    const maxCountImage = response.data.reduce(
      (maxImage: PostData, currentImage: PostData) => (currentImage.count > maxImage.count ? currentImage : maxImage),
      { count: -Infinity, owner_username: '' } as PostData
    )

    try {
      const maxCountImageResponse = await fetcher.GET<{
        data: {
          username: string
        }
      }>(XAPI.DASHBOARD_PROFILE, {
        ...customConfig,
        params: {
          profile_id: maxCountImage.owner_username,
          session_id: data.args.session_id,
          location: data.args.location,
        },
      })

      mostRepeatedPost = {
        ...maxCountImage,
        username: maxCountImageResponse.data?.username,
      }
    } catch (error) {
      mostRepeatedPost = {
        ...maxCountImage,
        username: '',
      }
    }
  }
  return mostRepeatedPost
}

export async function getMostRepeatedPostImage(data: {
  args: {
    shortcode: string
    batch_id: string
  }
}) {
  if (!data.args.shortcode) return

  const response = await fetcher.GET<string>(XAPI.DASHBOARD_POST_IMAGE, {
    params: {
      shortcode: data.args.shortcode,
      batch_id: data.args.batch_id,
    },
  })
  return response
}

export async function getProfile(data: {
  args: {
    profile_id: string
    session_id: string
    location: CountryEnum
  }
}) {
  if (!data.args.profile_id || !data.args.session_id) return
  const response = await fetcher.GET<{
    data: IProfile
  }>(XAPI.DASHBOARD_PROFILE, {
    params: {
      profile_id: data.args.profile_id,
      session_id: data.args.session_id,
      location: data.args.location,
    },
  })

  return response
}
