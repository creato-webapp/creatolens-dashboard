import ImageInstance from '@api/axiosInstance/Image'
import { Fetcher } from './fetcher'
import axios, { AxiosRequestConfig } from 'axios'
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
      imageDetails: any // here is not string
    }
  },
  customConfig?: AxiosRequestConfig
) {
  try {
    const { file, imageDetails, username } = data.args

    const blobBody = base64ToBlob(file, imageDetails.format)

    const formData = new FormData()

    formData.append('file', blobBody, imageDetails.path)
    formData.append('username', username)

    const response = await Fetcher.POST('/api/image', formData, {
      ...customConfig,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export async function getImageLabel(data: {
  args: {
    file: string
  }
}) {
  const image = data.args.file
  const labelsResponse = await Fetcher.POST('/api/image/label')
  console.log('label', labelsResponse)
  return labelsResponse
}
