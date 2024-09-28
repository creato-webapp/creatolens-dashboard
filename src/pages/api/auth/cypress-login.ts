// pages/api/auth/cypress-login.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { FireStoreAdapterWrapper, FirebaseConfig } from '@services/customAdapter'

const secret = process.env.JWT_SECRET
function getFirebaseConfig(): FirebaseConfig {
  const config: FirebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY!,
    appId: process.env.FIREBASE_APP_ID!,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID!,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
  }

  for (const [key, value] of Object.entries(config)) {
    if (key !== 'databaseURL' && value === undefined) {
      throw new Error(`Missing environment variable for ${key}`)
    }
  }

  return config
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
    return res.status(403).json({ error: 'This endpoint is only available in development or test mode' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, name, image } = req.body

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' })
  }

  const firebaseConfig = getFirebaseConfig() // You'll need to import this function
  const adapter = FireStoreAdapterWrapper(firebaseConfig)

  // Create or update user in Firestore
  const user = await adapter.createUser({
    email,
    name,
    image,
    emailVerified: new Date(),
  })

  // Create a JWT token
  const token = await getToken({ req, secret, raw: true })

  if (!token) {
    return res.status(500).json({ error: 'Failed to create token' })
  }

  res.status(200).json({ user, token })
}
