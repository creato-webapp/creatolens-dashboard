import type { NextApiRequest, NextApiResponse } from 'next'
import PAPI from '@constants/endpoints/papi'

import { AccountInstance } from '@helpers/axios'
import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'

import type { KeywordData } from '@services/Meta'

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
      data.most_repeated_post.length > 0
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
      keyword: data.keyword.map((k: KeywordData) => ({
        term: k.term,
        count: k.count,
      })),
      most_repeated_post: [singleMostRepatedPost],
      most_repeated_post_image: data.most_repeated_post_image,
      post_count: data.post_count,
      start_date: data.start_date,
      updated_at: data.updated_at,
      user: {
        created_at: data.user.created_at,
        email: data.user.email,
        image: data.user.image,
        name: data.user.name,
        roles: data.user.roles,
        updated_at: data.user.updated_at,
      },
      username: data.username,
    }

    return res.status(200).json(transformedResponse)
  },
})
