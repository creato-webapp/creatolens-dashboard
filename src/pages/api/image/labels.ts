import type { NextApiRequest, NextApiResponse } from 'next'

const generateRandomLabel = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const length = 6 // Length of each random label
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

const generateUniqueRandomLabels = (count: number): string[] => {
  const labels = new Set<string>()
  while (labels.size < count) {
    labels.add(generateRandomLabel())
  }
  return Array.from(labels)
}

export default async function getImageLabel(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST': {
      try {
        const response = {
          data: generateUniqueRandomLabels(10), // Generate 10 random labels
        }
        return res.status(200).json(response.data)
      } catch (error) {
        console.error('Error generating labels:', error)
        return res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message })
      }
    }
    default:
      res.setHeader('Allow', ['POST'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
