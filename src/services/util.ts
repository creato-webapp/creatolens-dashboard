import axios from 'axios'
import { User, NextAuthOptions } from 'next-auth'

interface CombinedUser extends User {
  emailVerified: boolean
  roles: string[]
}

export async function fetchWhitelist(fileName: string, bucket: string) {
  try {
    const response = await axios.get(`${process.env.LOCAL_SERVER_URL}/api/storage?fileName=${fileName}&bucket=${bucket}`)
    console.log('Fetched whitelist:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching whitelist:', error)
    return []
  }
}

export async function getRoles(userEmail: string) {
  const fileName = 'users.json'
  const bucket = 'firebase-creatolens-whitelist'
  if (bucket === undefined) {
    window.alert('CLOUD_BUCKET is undefined')
  }

  const whitelist: CombinedUser[] = await fetchWhitelist(fileName, bucket)
  console.log({ whitelist })
  const userEntry = whitelist.find((entry) => entry.email === userEmail)
  return userEntry ? userEntry.roles : []
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
