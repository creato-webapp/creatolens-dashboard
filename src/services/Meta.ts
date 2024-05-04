import { DashboardData } from 'src/pages/dashboard'
import { Fetcher } from './fetcher'
import { AxiosRequestConfig } from 'axios'

export async function getMeta(
  data: {
    accId: string
    days: number
  },
  customConfig?: AxiosRequestConfig
): Promise<{ code: string; data: Array<DashboardData> }> {
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

  const combineResponse = {
    data: response,
    keyword: keywordResponse,
  }

  return combineResponse
}
