import PAPI from '@constants/endpoints/papi'
import METHOD from '@constants/method'
import handler from '@helpers/api/handlers'
import { HistoryInstance } from '@helpers/axios'
import { mapHistoryData } from '@services/HistoryHelper'
import type { NextApiRequest, NextApiResponse } from 'next'

interface PostData {
  id: string
}

// export default async function historyHandler(req: NextApiRequest, res: NextApiResponse) {
export default handler.api({
  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const {
        query: { user_id },
      } = req

      if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' })
      }

      // Fetch user posts
      const historysRefResponse = await HistoryInstance.get(`/api/users/${user_id}/posts`, {
        headers: {
          Cookie: req.headers.cookie || '',
        },
      })

      const posts = historysRefResponse.data

      if (!posts || !Array.isArray(posts)) {
        return res.status(200).json([])
      }

      const historysIds = posts.map((item: PostData) => item.id)
      const data = await Promise.all(
        historysIds.map(async (id: string) => {
          try {
            const historyData = await HistoryInstance.get(`/api/posts/${id}`, {
              headers: {
                Cookie: req.headers.cookie || '',
              },
            })
            return historyData.data
          } catch (error) {
            console.error(`Error fetching data for post ID: ${id}`, error)
            return null // Handle errors gracefully for individual posts
          }
        })
      )

      const filteredData = data.filter(Boolean)
      const result = mapHistoryData(filteredData)
      return res.status(200).json(result)
    } catch (error) {
      console.error('Error in historyHandler:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  },
  [METHOD.PATCH]: async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await HistoryInstance.patch(PAPI.UPDATE_HISTORY, req.body)
    return res.status(response.status).json(response.data)
  },
})
