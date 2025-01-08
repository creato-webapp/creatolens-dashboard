import { AxiosRequestConfig } from 'axios'

import fetcher from '../helpers/fetcher'
import XAPI from '@constants/endpoints/xapi'
import { IHashet } from 'pages/recommendation'

interface HashtagHistory {
  created_at: string
  id: string
  input_object: null
  is_deleted: boolean
  output_object: {
    created_at: string
    data: {
      url: string
    }
    updated_at: string
  }
  status: number
  updated_at: string
  user_id: string
}

export async function getHashtag(input: string, customConfig?: AxiosRequestConfig): Promise<{ data: IHashet[] }> {
  const response = await fetcher.GET<{ data: IHashet[] }>(XAPI.HASHTAG, {
    ...customConfig,
    params: {
      recommend: input,
    },
  })
  return response
}

export async function getImageHashtag(input: string, customConfig?: AxiosRequestConfig): Promise<{ data: IHashet[] }> {
  const response = await fetcher.GET<{ data: IHashet[] }>(`/api/blob`, {
    ...customConfig,
    params: {
      input,
    },
  })
  return response
}

export async function getHashtagHistory(): Promise<HashtagHistory[]> {
  // const response = await fetcher.GET<{ data: IHashet[] }>(XAPI.IMAGE_HASHTAG_HISTORY, {
  //   ...customConfig,
  //   params: {
  //     slug: key,
  //     recommend: input,
  //   },
  // })
  const data = [
    {
      created_at: '2024-12-29 T16:23:17',
      id: 'lH15Tyn2X1rfU4q7BNRw',
      input_object: null,
      is_deleted: false,
      output_object: {
        created_at: '2024-12-29 T16:23:17',
        data: {
          url: 'gs://essaa-creatolen-cdst-lens-image_gen_user_files-sit/8bZO7N8m1wDyZFJ2C3U6/25-12-2024/469135943_853824973495431_3472478068333243370_n.jpg',
        },
        updated_at: '2024-12-29 T16:23:17',
      },
      status: 1,
      updated_at: '2024-12-29 T16:23:17',
      user_id: '8bZO7N8m1wDyZFJ2C3U6',
    },
  ]

  return data
  // return response
}
