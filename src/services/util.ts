import axios from 'axios'
import { User } from 'next-auth'

interface CombinedUser extends User {
  emailVerified: boolean
  roles: string[]
}

async function fetchWhitelist(): Promise<CombinedUser[]> {
  try {
    const response = await axios.get<CombinedUser[]>(`${process.env.LOCAL_SERVER_URL}/api/whitelist`)
    return response.data
  } catch (error) {
    console.error('Error fetching whitelist:', error)
    return []
  }
}

export async function getRoles(userEmail: string) {
  const whitelist = await fetchWhitelist()
  const userEntry = whitelist.find((entry) => entry.email === userEmail)
  return userEntry ? userEntry.role : []
}

export function isExpired(expires: string): boolean {
  const expiresDate = new Date(expires)
  const currentTimestamp = Date.now()
  return expiresDate.getTime() <= currentTimestamp
}

export const imageToBase64 = (file: File): Promise<string | null> => {
  return new Promise<string | null>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const base64String = reader.result as string
      resolve(base64String) // Extract base64 data
    }

    reader.onerror = (error) => {
      reject(error)
    }

    if (file) {
      reader.readAsDataURL(file)
    } else {
      resolve(null)
    }
  })
}

export function hoursAgo(dateString: string): string {
  const pastDate = new Date(dateString)
  const currentDate = new Date()

  const diffInMilliseconds = currentDate.getTime() - pastDate.getTime()

  const diffInHours = Math.floor(diffInMilliseconds / 1000 / 60 / 60)

  return `${diffInHours}H ago`
}
