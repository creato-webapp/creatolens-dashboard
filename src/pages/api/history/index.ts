import type { NextApiRequest, NextApiResponse } from 'next'

export default async function historyHandler(req: NextApiRequest, res: NextApiResponse) {
  const response = {
    data: [
      {
        created_at: '2024-12-29 T16:23:17',
        id: '123',
        input_object: null,
        is_deleted: false,
        output_object: {
          created_at: '2024-12-29 T16:23:17',
          data: {
            url: '123',
          },
          updated_at: '2024-12-29 T16:23:17',
        },
        status: 1,
        updated_at: '2024-12-29 T16:23:17',
        user_id: '123',
      },
    ],
  }
  return res.status(200).json(response.data)
}
