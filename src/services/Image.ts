import { AxiosRequestConfig, AxiosResponse } from 'axios'

import fetcher from '@helpers/fetcher'

export async function getImageUploadUrl(
  data: {
    args: {
      filename: string
      format: string
    }
  },
  customConfig?: AxiosRequestConfig
) {
  const response = await fetcher.GET('/api/image', {
    ...customConfig,
    params: {
      filename: data.args.filename,
      format: data.args.format,
    },
  })
  return response
}

type ImageLabelResponseType = {
  data: {
    categories: string
    confidence: [
      {
        [key: string]: number
      }
    ]
    labels: string[]
  }
}

export async function getImageLabel(imagePath: string) {
  const response: ImageLabelResponseType = await fetcher.GET('/api/image/labels', {
    params: {
      image_url: imagePath,
    },
  })
  return response.data.labels
}

export async function getImageByPrompt(prompt: string) {
  const response = await fetcher.POST<AxiosResponse>('/api/image-gen', prompt, {
    headers: {
      'Content-Type': 'multipart/form-data',
      keepAlive: false,
    },
  })
  return response
}
