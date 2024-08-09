import { useEffect, useState } from 'react'

import { fetchAndActivate, getValue } from 'firebase/remote-config'
import { remoteConfig } from '@helpers/firebase/client'

export const useRemoteConfig = <T>(key: string, refetchInterval: number = 10000) => {
  const [configValue, setConfigValue] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initConfig = async () => {
      if (typeof window !== 'undefined') {
        try {
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
