import fetcher from '@helpers/fetcher'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'
import { HashtagFilterResponse } from '@api/remote-config/hashtagFilter'
import { IHashet } from '../../recommendation/index'
export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler.api({
  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.headers.cookie) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const promptTemplate: HashtagFilterResponse = await fetcher.GET(`/api/remote-config/hashtagFilter`, { headers: req.headers })
    const response = await axios.get(`${process.env.IMAGE_HASHTAG_1}/model`, {
      headers: {
        Cookie: req.headers.cookie,
      },
      params: { input: req.query.input, k: 40 },
      timeout: 30000,
    })
    if (response.status !== 200) {
      return res.status(response.status).json({ message: 'Cannot Recommend the image' })
    }
    const hashtagsToFilter = promptTemplate.map((item) => item.hashtag)

    const hashtagResponse: { data: IHashet[] } = response?.data ?? { data: [] }

    const filteredData = hashtagResponse?.data.filter((item: IHashet) => !hashtagsToFilter.includes(item.hashtag.replace('#', '').toLowerCase()))

    return res.status(200).json({ data: filteredData })
  },
})
