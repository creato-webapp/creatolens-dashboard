import { Fetcher } from './fetcher'
import { AxiosRequestConfig } from 'axios'

export async function getMetaImage(
  data: {
    profile_id?: string
  },
  customConfig?: AxiosRequestConfig
): Promise<{
  any
}> {
  const response = await Fetcher.GET(
    '/api/dashboard/userImage',
    {
      profile_id: data.profile_id,
    },
    { ...customConfig }
  )

  return response
}

export async function getMetaPostImage(
  data: {
    shortcode?: string
  },
  customConfig?: AxiosRequestConfig
): Promise<{
  any
}> {
  const response = await Fetcher.GET(
    '/api/dashboard/instapostImage',
    {
      shortcode: data.shortcode,
    },
    { ...customConfig }
  )

  return response
}
