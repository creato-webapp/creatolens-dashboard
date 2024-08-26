import { PaginationParams } from '@hooks/usePagination'
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

export const imageToBase64 = (file: File): Promise<string | null> => {
  return new Promise<string>((resolve, reject) => {
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
    }
  })
}

export function base64ToBlob(base64: string, mimeType: string) {
  const byteCharacters = window.atob(base64.split(',')[1])
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: mimeType })
}

export const buildUrlWithParams = (url: string, params: PaginationParams) => {
  const queryString = Object.keys(params)
    .filter((key) => params[key as keyof PaginationParams] !== null && params[key as keyof PaginationParams] !== undefined) // Filter out null and undefined values
    .map((key) => {
      const value = params[key as keyof PaginationParams]
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    })
    .join('&')

  return queryString ? `${url}?${queryString}` : url
}
