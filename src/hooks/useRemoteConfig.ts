import { useEffect, useState } from 'react'

import { fetchAndActivate, getValue } from 'firebase/remote-config'
import firebase from '@helpers/firebase'

export const useRemoteConfig = <T>(key: string, refetchInterval: number = 10000) => {
  const [configValue, setConfigValue] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initConfig = async () => {
      if (typeof window !== 'undefined') {
        try {
          firebase.client.remoteConfig.settings.minimumFetchIntervalMillis = refetchInterval

          await fetchAndActivate(firebase.client.remoteConfig)

          const value = getValue(firebase.client.remoteConfig, key).asString()
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
