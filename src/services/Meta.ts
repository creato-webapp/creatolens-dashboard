import { DashboardData } from 'src/pages/dashboard'
import { Fetcher } from './fetcher'
import { AxiosRequestConfig } from 'axios'

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

  // let idResponse
  // if (data.profile_id) {
  //   idResponse = await Fetcher.GET('/api/dashboard/instaProfile', {
  //     profile_id: data.profile_id,
  //   })
  // }

  const combineResponse = {
    data: response.data,
    keyword: keywordResponse.data,
    postCount: postCountResponse.data.post_count,
    // profile: idResponse,
  }

  return combineResponse
}
