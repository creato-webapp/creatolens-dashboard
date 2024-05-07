import { DashboardData } from 'src/pages/dashboard'
import { Fetcher } from './fetcher'
import { AxiosRequestConfig } from 'axios'

interface PostData {
  count: number
  owner_username: string
  latest_created_at?: string
  second_latest_created_at?: string
  caption?: string
}

export async function getMeta(
  data: {
    accId: string
    days: number
    profile_id?: string
  },
  customConfig?: AxiosRequestConfig
): Promise<{ keyword: string; data: Array<DashboardData> }> {
  const response = await Fetcher.GET(
    `/api/dashboard`,
    {
      accId: data.accId,
      days: data.days,
    },
    { ...customConfig }
  )

  const keywordResponse = await Fetcher.GET(
    '/api/dashboard/keyword',
    {
      accId: data.accId,
      days: data.days,
    },
    { ...customConfig }
  )

  const postCountResponse = await Fetcher.GET(
    '/api/dashboard/postCount',
    {
      accId: data.accId,
      days: data.days,
    },
    { ...customConfig }
  )

  let maxCountImage
  if (response && response.data.length > 0) {
    maxCountImage = response.data.reduce(
      (maxImage: PostData, currentImage: PostData) => (currentImage.count > maxImage.count ? currentImage : maxImage),
      { count: -Infinity, owner_username: '' } as PostData
    )

    const maxCountImageResponse = await Fetcher.GET(
      '/api/dashboard/instaProfile',
      {
        profile_id: maxCountImage.owner_username,
      },
      { ...customConfig }
    )

    maxCountImage = {
      ...maxCountImage,
      ...maxCountImageResponse
    }
  }

  const combineResponse = {
    data: response.data,
    keyword: keywordResponse.data,
    postCount: postCountResponse.data.post_count,
    mostRepeatedPost: maxCountImage,
  }

  return combineResponse
}
