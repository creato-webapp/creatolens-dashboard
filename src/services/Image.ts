import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { ImageDetailsType } from 'src/context/ImageToHashtagContext'

import { Fetcher } from './fetcher'
import { base64ToBlob } from './util'

export async function getImageUploadUrl(
  data: {
    args: {
      filename: string
      format: string
    }
  },
  customConfig?: AxiosRequestConfig
) {
  const response = await Fetcher.GET('/api/image', {
    ...customConfig,
    params: {
      filename: data.args.filename,
      format: data.args.format,
    },
  })
  return response
}

export async function uploadImage(
  data: {
    args: {
      username: string
      file: string
      imageDetails: ImageDetailsType // here is not string
    }
  },
  customConfig?: AxiosRequestConfig
) {
  try {
    const { file, imageDetails, username } = data.args

    if (!imageDetails.format) {
      throw new Error('Image format is required.')
    }

    const blobBody = base64ToBlob(file, imageDetails.format)

    const formData = new FormData()
    formData.append('file', blobBody, imageDetails.path)
    formData.append('username', username)

    const tempConfig = {
      maxBodyLength: 8 * 1024 * 1024,
      maxContentLength: 8 * 1024 * 1024,
      ...customConfig,
    }

    const response = await Fetcher.POST<AxiosResponse>('/api/image', formData, {
      ...tempConfig,
      headers: {
        'Content-Type': 'multipart/form-data',
        keepAlive: false,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
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
  const response: ImageLabelResponseType = await Fetcher.GET('/api/image/labels', {
    params: {
      image_url: imagePath,
    },
  })
  return response.data.labels
}

export async function getImageByPrompt(prompt: string) {
  const response = await Fetcher.POST<AxiosResponse>('/api/image-gen', prompt, {
    headers: {
      'Content-Type': 'multipart/form-data',
      keepAlive: false,
    },
  })
  return response
}
