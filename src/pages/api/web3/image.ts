import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '@helpers/api/handlers'
import METHOD from '@constants/method'
import { ImageInstance } from '@helpers/axios'

type PromptData = {
  input: string
  key: string
  aspectRatio: string
  negativeKeywords: string
}

export default handler.api({
  [METHOD.POST]: async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body as PromptData

    const response = await ImageInstance.post<string>(`/api/image-tagen/prompt/image`, {
      prompt: body.input,
      user_id: `web3/${body.key}`,
      aspect_ratio: body.aspectRatio,
      negative_prompt: body.negativeKeywords,
    })

    return res.status(200).json(response.data)
  },
})
