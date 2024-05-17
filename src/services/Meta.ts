import { Fetcher } from './fetcher'
import { AxiosRequestConfig } from 'axios'

export interface PostData {
  count: number
  owner_username: string
  latest_created_at?: string
  second_latest_created_at?: string
  caption?: string
}

export interface KeywordData {
  term: string
  count: number
}

export interface UserProfile {
  profile_pic_url: string
  username: string
}

export interface MostRepeatedPost {
  count?: number
  latest_created_at?: string
  second_latest_created_at?: string
  caption?: string
  shortcode?: string
  user: UserProfile
  batch_id?: string
}

// interface MetaResponse {
//   keyword?: KeywordData[]
//   postCount?: number
//   mostRepeatedPost?: MostRepeatedPost
// }

// export async function getMeta(
//   data: {
//     accId: string
//     days: number
//     profile_id?: string
//   },
//   customConfig?: AxiosRequestConfig
// ): Promise<MetaResponse> {

//   const response = await Fetcher.GET<{
//     data: PostData[]
//   }>('/api/dashboard', {
//     ...customConfig,
//     params: {
//       accId: data.accId,
//       days: data.days,
//     },
//   })

//   const keywordResponse = await Fetcher.GET<{
//     data: KeywordData[]
//   }>('/api/dashboard/keyword', {
//     ...customConfig,
//     params: {
//       accId: data.accId,
//       days: data.days,
//     },
//   })

//   const postCountResponse = await Fetcher.GET<{
//     data: { post_count: number }
//   }>('/api/dashboard/postCount', {
//     ...customConfig,
//     params: {
//       accId: data.accId,
//       days: data.days,
//     },
//   })

//   let mostRepeatedPost: MostRepeatedPost | undefined

//   if (response && response.data.length > 0) {
//     const maxCountImage = response.data.reduce(
//       (maxImage: PostData, currentImage: PostData) => (currentImage.count > maxImage.count ? currentImage : maxImage),
//       { count: -Infinity, owner_username: '' } as PostData
//     )

//     const maxCountImageResponse = await Fetcher.GET<{
//       user: UserProfile
//     }>('/api/dashboard/instaProfile', {
//       ...customConfig,
//       params: {
//         profile_id: maxCountImage.owner_username,
//       },
//     })

//     mostRepeatedPost = {
//       ...maxCountImage,
//       user: maxCountImageResponse.user,
//     }
//   }

//   return {
//     keyword: keywordResponse.data,
//     postCount: postCountResponse.data.post_count,
//     mostRepeatedPost,
//   }
// }

export async function getKeyword(
  data: {
    accId: string
    days: number
  },
  customConfig?: AxiosRequestConfig
): Promise<{ data: KeywordData[] }> {
  const keywordResponse = await Fetcher.GET<{
    data: KeywordData[]
  }>('/api/dashboard/keyword', {
    ...customConfig,
    params: {
      accId: data.accId,
      days: data.days,
    },
  })
  return keywordResponse
}

export async function getPostCount(
  data: {
    accId: string
    days: number
  },
  customConfig?: AxiosRequestConfig
): Promise<{ data: { post_count: number } }> {
  const postCountResponse = await Fetcher.GET<{
    data: { post_count: number }
  }>('/api/dashboard/postCount', {
    ...customConfig,
    params: {
      accId: data.accId,
      days: data.days,
    },
  })
  return postCountResponse
}

export async function getMostRepeatedPost(
  data: {
    accId: string
    days: number
  },
  customConfig?: AxiosRequestConfig
): Promise<MostRepeatedPost | undefined> {
  const response = await Fetcher.GET<{
    data: PostData[]
  }>('/api/dashboard/', {
    ...customConfig,
    params: {
      accId: data.accId,
      days: data.days,
    },
  })

  let mostRepeatedPost: MostRepeatedPost | undefined

  if (response && response.data.length > 0) {
    const maxCountImage = response.data.reduce(
      (maxImage: PostData, currentImage: PostData) => (currentImage.count > maxImage.count ? currentImage : maxImage),
      { count: -Infinity, owner_username: '' } as PostData
    )

    const maxCountImageResponse = await Fetcher.GET<{
      user: UserProfile
    }>('/api/dashboard/instaProfile', {
      ...customConfig,
      params: {
        profile_id: maxCountImage.owner_username,
      },
    })

    mostRepeatedPost = {
      ...maxCountImage,
      user: maxCountImageResponse.user,
    }
  }
  if (mostRepeatedPost) {
    return mostRepeatedPost
  }
}
