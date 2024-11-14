import type { NextApiRequest, NextApiResponse } from 'next'
import PAPI from '@constants/endpoints/papi'
import { AccountInstance } from '@helpers/axios'
import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'
export interface DashboardReportResponse {
  account_id: string
  created_at: string
  end_date: string
  keyword: KeywordData[]
  most_repeated_post: MostRepeatedPost[]
  most_repeated_post_image: string | null
  post_count: number
  start_date: string
  updated_at: string
  user: UserProfile
  username: string
}

export interface KeywordData {
  count: number
  fetched_by: string
  last_created_at: string
  last_updated_at: string
  last_uploaded_at: string
  term: string
}

export interface MostRepeatedPost {
  batch_id: string
  caption: string
  count: number
  is_video: boolean
  latest_comments: number
  latest_created_at: string
  latest_likes: number
  owner_username: string
  second_latest_comments: number
  second_latest_created_at: string
  second_latest_likes: number
  shortcode: string
  uploaded_at: string
}

export interface UserProfile {
  created_at: string
  email: string
  emailVerified: string | null
  id: string
  image: string
  name: string
  roles: string[]
  updated_at: string
}

export default handler.api({
  [METHOD.POST]: async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req

    const response = await AccountInstance.post(PAPI.DASHBOARD_HISTORY, body, {
      headers: {
        Cookie: req.headers.cookie,
      },
      timeout: 10000,
    })

    const data = response.data
    const singleMostRepatedPost =
      Array.isArray(data.most_repeated_post) && data.most_repeated_post.length > 0
        ? data.most_repeated_post[0]
        : {
            count: null,
            latest_created_at: null,
            second_latest_created_at: null,
            caption: null,
            shortcode: null,
            username: null,
            batch_id: null,
          }

    const transformedResponse = {
      account_id: data.account_id,
      created_at: data.created_at,
      end_date: data.end_date,
      keyword: (data.keyword ?? []).map((k: KeywordData) => ({
        term: k.term,
        count: k.count,
      })),
      most_repeated_post: [singleMostRepatedPost],
      most_repeated_post_image: data.most_repeated_post_image,
      post_count: data.post_count,
      start_date: data.start_date,
      updated_at: data.updated_at,
      user: {
        email: data.user.email,
        name: data.user.name,
      },
      username: data.username,
    }

    return res.status(200).json({
      code: 0,
      data: transformedResponse,
    })
  },

  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    const { orderby, isAsc, user_id, account_id } = req.query

    if (!user_id) {
      return res.status(400).json({ error: 'Missing required query parameters' })
    }

    try {
      const response = await AccountInstance.get(PAPI.DASHBOARD_HISTORY, {
        params: {
          orderby,
          isAsc,
          user_id,
          account_id,
        },
        headers: {
          Cookie: req.headers.cookie,
        },
      })

      const data = response.data

      if (!data || data.length === 0) {
        return res.status(200).json({
          code: 0,
          data: [],
        })
      }

      const transformedResponses = data.map((item: DashboardReportResponse) => ({
        date_range: {
          from: item.start_date,
          to: item.end_date,
        },
        keyword: (item.keyword ?? []).map((k: KeywordData) => ({
          term: k.term,
          count: k.count,
        })),
        account: item.account_id,
        post_count: item.post_count,
        mostRepeatedPostData: Array.isArray(item.most_repeated_post)
          ? item.most_repeated_post.sort((a, b) => {
              if (b.count !== a.count) {
                return b.count - a.count
              }
              return b.latest_likes - a.latest_likes
            })[0]
          : null,
      }))

      return res.status(200).json({
        code: 0,
        data: transformedResponses,
      })
    } catch (error) {
      console.error('Error fetching dashboard reports:', error)
      return res.status(500).json({ error: 'Failed to fetch dashboard reports' })
    }
  },
})
