// import { Fetcher } from './fetcher'
// import { AxiosRequestConfig } from 'axios'

// export async function getMetaImage(
//   data: {
//     profile_id?: string
//   },
//   customConfig?: AxiosRequestConfig
// ): Promise<{
//   // response data is image
//   image: string
// }> {
//   const response = await Fetcher.GET(
//     '/api/dashboard/userImage',
//     {
//       ...customConfig,
//       params: {
//         profile_id: data.profile_id,
//       },
//     },
//   )

//   return response
// }

// export async function getMetaPostImage(
//   data: {
//     shortcode?: string
//   },
//   customConfig?: AxiosRequestConfig
// ): Promise<{
//   image: string
// }> {
//   const response = await Fetcher.GET(
//     '/api/dashboard/instapostImage',
//     {
//       shortcode: data.shortcode,
//     },
//     { ...customConfig }
//   )

//   return response
// }