import { SEOKeywordInstance } from '@helpers/axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function seoHashtagsHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { keyword, limit = 20 },
  } = req

  const parsedLimit = parseInt(limit as string, 10)
  if (isNaN(parsedLimit) || parsedLimit <= 0) {
    return res.status(400).json({ error: 'Limit must be a positive number' })
  }

  try {
    const responses = await Promise.all([
      SEOKeywordInstance.get('', {
        params: { category: keyword, is_recent: true, limit: parsedLimit, is_related: true },
        headers: {
          Cookie: req.headers.cookie || '',
        },
      }),
      SEOKeywordInstance.get('', {
        params: { category: keyword, is_recent: false, limit: parsedLimit, is_related: true },
        headers: {
          Cookie: req.headers.cookie || '',
        },
      }),
      SEOKeywordInstance.get('', {
        params: { category: keyword, is_recent: true, limit: parsedLimit },
        headers: {
          Cookie: req.headers.cookie || '',
        },
      }),
      SEOKeywordInstance.get('', {
        params: { category: keyword, is_recent: false, limit: parsedLimit },
        headers: {
          Cookie: req.headers.cookie || '',
        },
      }),
    ])

    const mergedData = {
      is_related: {
        recent: responses[0].data,
        older: responses[1].data,
      },
      most_repeated: {
        recent: responses[2].data,
        older: responses[3].data,
      },
    }

    return res.status(200).json(mergedData)
  } catch (error) {
    console.error('Error fetching SEO keywords:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
