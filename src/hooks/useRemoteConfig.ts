import { useEffect, useState } from 'react'

import { initializeApp } from 'firebase/app'
import { fetchAndActivate, getRemoteConfig, getValue } from 'firebase/remote-config'

// TODO: Replace the following with your app's Firebase project configuration
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
}

export const useRemoteConfig = (key: string, refetchInterval: number = 180000) => {
  const [configValue, setConfigValue] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initConfig = async () => {
      if (typeof window !== 'undefined') {
        try {
          const app = initializeApp(config)

          const remoteConfig = getRemoteConfig(app)
          remoteConfig.settings.minimumFetchIntervalMillis = refetchInterval

          await fetchAndActivate(remoteConfig)

          const value = getValue(remoteConfig, key).asString()

          setConfigValue(JSON.parse(value))
        } catch (err) {
          setError('Error fetching remote config')
          console.error('Error fetching remote config:', err)
        }
      }
    }

    initConfig()
  }, [key, refetchInterval])

  return { configValue, error }
}
