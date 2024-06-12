import { Fetcher } from './fetcher'
import axios, { AxiosRequestConfig } from 'axios'

function base64ToBlob(base64, mimeType) {
  const byteCharacters = atob(base64.split(',')[1])
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: mimeType })
}

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

export async function uploadImage(data: {
  args: {
    url: string
    format: string
    file: string
  }
}) {
  const blob = base64ToBlob(data.args.file, data.args.format)

  const formData = new FormData()
  formData.append('image', blob, 'upload.' + data.args.format.split('/')[1]) // Add file name with appropriate extension

  const response = await Fetcher.PUT(data.args.url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Set the appropriate content type for form data
    },
  })

  return response
}
