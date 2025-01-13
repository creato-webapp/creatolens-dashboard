import type { NextApiRequest, NextApiResponse } from 'next'
import { remoteConfig } from '@helpers/firebase/admin'
import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'
import { NotFoundError } from '@services/error'

const HASHTAG_FILTER_KEY = 'HASHTAG_FILTER'

export type HashtagFilterResponse = { hashtag: string }[]

export default handler.api({
  [METHOD.GET]: async (req: NextApiRequest, res: NextApiResponse) => {
    const template = await remoteConfig.getServerTemplate()
    const serverConfig = template.evaluate()

    const hashtagFilterString = serverConfig.getString(HASHTAG_FILTER_KEY)

    if (!hashtagFilterString) {
      throw new NotFoundError('Hashtag filter configuration is not found')
    }

    let hashtagFilter
    try {
      hashtagFilter = JSON.parse(hashtagFilterString)
    } catch (error) {
      throw new NotFoundError('Invalid hashtag filter format')
    }

    return res.status(200).json(hashtagFilter || [])
  },
})
