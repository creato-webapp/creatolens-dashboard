import { AxiosRequestConfig } from 'axios'

import XAPI from '@constants/endpoints/xapi'
import { CountryEnum } from 'enums/CountryCodeEnums'

import fetcher from '../helpers/fetcher'
import { DateRange } from 'react-day-picker'
import { HistoricSearchResult } from 'pages/dashboard'

export interface PostData {
  count: number
  owner_username: string
  latest_likes: number
  second_latest_likes: number
  latest_created_at?: string
  second_latest_created_at?: string
  caption?: string
  is_video: boolean
}

export interface KeywordData {
  term: string
  count: number
}

export interface UserProfile {
  profile_pic_url: string
  username: string
}

export interface MostRepeatedPost extends PostData {
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
      date_range: DateRange
      accId: string
    }
  },
  customConfig?: AxiosRequestConfig
): Promise<{ data: KeywordData[] }> {
  const { from, to } = formatDateRange(data.args.date_range)

  const keywordResponse = await fetcher.GET<{
    data: KeywordData[]
  }>(XAPI.DASHBOARD_KEYWORDS, {
    ...customConfig,
    params: {
      accId: data.args.accId,
      start_date: from,
      end_date: to,
    },
  })
  return keywordResponse
}

export async function getPostCount(
  data: {
    args: {
      accId: string
      date_range: DateRange
    }
  },
  customConfig?: AxiosRequestConfig
): Promise<{ data: { post_count: number } }> {
  const { from, to } = formatDateRange(data.args.date_range)

  const postCountResponse = await fetcher.GET<{
    data: { post_count: number }
  }>(XAPI.DASHBOARD_POST_COUNT, {
    ...customConfig,
    params: {
      accId: data.args.accId,
      start_date: from,
      end_date: to,
    },
  })

  return postCountResponse
}

export async function getMostRepeatedPost(
  data: {
    args: {
      accId: string
      date_range: DateRange
      session_id?: string
      location?: CountryEnum
    }
  },
  customConfig?: AxiosRequestConfig
): Promise<MostRepeatedPost | null> {
  const { from, to } = formatDateRange(data.args.date_range)

  const response = await fetcher.GET<{
    data: PostData[]
  }>(XAPI.DASHBOARD, {
    ...customConfig,
    params: {
      accId: data.args.accId,
      start_date: from,
      end_date: to,
    },
  })

  let mostRepeatedPost: MostRepeatedPost | null = null

  if (response && response.data.length > 0) {
    const maxCountImage = response.data.reduce(
      (maxImage: PostData, currentImage: PostData) => {
        if (currentImage.count > maxImage.count) {
          return currentImage
        } else if (currentImage.count === maxImage.count) {
          return currentImage.latest_likes > maxImage.latest_likes ? currentImage : maxImage
        }
        return maxImage
      },
      { count: -Infinity, owner_username: '', latest_likes: -Infinity } as PostData
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
    session_id?: string
    batch_id: string
    is_video: boolean
  }
}) {
  if (!data.args.shortcode) return

  const response = await fetcher.GET<string>(XAPI.DASHBOARD_POST_IMAGE, {
    params: {
      shortcode: data.args.shortcode,
      session_id: data.args.session_id,
      batch_id: data.args.batch_id,
      is_video: data.args.is_video,
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

type SearchHistoryPayload = {
  userId: string
  accId: string
  from: string
  to: string
}

export async function createSearchHistory(data: SearchHistoryPayload, customConfig?: AxiosRequestConfig) {
  const response = await fetcher.POST<{
    data: HistoricSearchResult[] | []
  }>(XAPI.DASHBOARD_HISTORY, {
    user_id: data.userId,
    account_id: data.accId,
    from_date: data.from,
    to_date: data.to,
    ...customConfig,
  })

  return response
}

export async function getSearchHistory(
  data: {
    args: {
      accId?: string
      userId: string
    }
  },
  customConfig?: AxiosRequestConfig
) {
  const response = await fetcher.GET<HistoricSearchResult[] | []>(XAPI.DASHBOARD_HISTORY, {
    ...customConfig,
    params: {
      user_id: data.args.userId,
      account_id: data.args.accId,
    },
  })

  return response
}

export function formatDateRange(dateRange: DateRange) {
  const from = dateRange?.from?.toISOString().split('T')[0] + ' 00:00:00'
  const to = dateRange?.to?.toISOString().split('T')[0] + ' 23:59:59'
  return { from, to }
}
