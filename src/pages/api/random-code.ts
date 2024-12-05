import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

const filePath = path.join('./public/data/codes.json')

interface CodesFile {
  codes: string[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  if (req.method === 'GET') {
    try {
      // Read the file and parse JSON data
      const data = fs.readFileSync(filePath, 'utf8')
      const parsedData: CodesFile = JSON.parse(data)

      if (!parsedData.codes || parsedData.codes.length === 0) {
        return res.status(404).json({ error: 'No codes available' })
      }

      // Select a random code
      const randomIndex = Math.floor(Math.random() * parsedData.codes.length)
      const randomCode = parsedData.codes[randomIndex]

      // Remove the selected code from the list
      parsedData.codes.splice(randomIndex, 1)

      // Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), 'utf8')

      // Return the selected code
      return res.status(200).json({ code: randomCode })
    } catch (error) {
      console.error('Error reading or updating the file:', error)
      return res.status(500).json({ error: 'Failed to process the request' })
    }
  }
  // } else if (req.method === 'POST') {
  //   const { newCode }: { newCode?: string } = req.body

  //   if (!newCode) {
  //     return res.status(400).json({ error: 'Code is required' })
  //   }

  //   try {
  //     // Read existing data
  //     const data = fs.readFileSync(filePath, 'utf8')
  //     const parsedData: CodesFile = JSON.parse(data)

  //     // Add the new code to the list
  //     parsedData.codes.push(newCode)

  //     // Write the updated data back to the file
  //     fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), 'utf8')

  //     return res.status(201).json({ message: 'Code added successfully', newCode })
  //   } catch (error) {
  //     console.error('Error updating the file:', error)
  //     return res.status(500).json({ error: 'Failed to update the codes file' })
  //   }
  else {
    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  }
}
