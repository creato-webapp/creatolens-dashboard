import { Fetcher } from './fetcher'
import { AxiosRequestConfig } from 'axios'

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

// export async function uploadImage (
//     data: {

//     },
//     customConfig?:AxiosRequestConfig
// ) {
//     const response = await Fetcher.P
// }