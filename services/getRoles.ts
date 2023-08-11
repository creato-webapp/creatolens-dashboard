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

  const whitelist: CombinedUser[] = await fetchWhitelist(fileName, bucket)
  console.log({ whitelist })
  const userEntry = whitelist.find((entry) => entry.email === userEmail)
  return userEntry ? userEntry.roles : []
}
