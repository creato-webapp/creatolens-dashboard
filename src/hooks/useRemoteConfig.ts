import { useEffect, useState } from 'react'

import { ensureInitialized, fetchAndActivate, getAll, getValue, isSupported, Value } from 'firebase/remote-config'
import { remoteConfig } from '@helpers/firebase/client'

const getAllRemoteConfig = async () => {
  try {
    if (await isSupported()) {
      ensureInitialized(remoteConfig)

      const isActivated = !(await fetchAndActivate(remoteConfig))
      const value = isActivated ? getAll(remoteConfig) : {}

      return value
    }
    return {}
  } catch (err) {
    console.error('Error fetching remote config:', err)
    return {}
  }
}

const DEFAULT_REFETCH_INTERVAL = 10000
const DEFAULT_REMOTE_CONFIG_VALUE = await getAllRemoteConfig()

const useRemoteConfig = (key: string, refetchInterval: number | undefined = DEFAULT_REFETCH_INTERVAL) => {
  const [configValue, setConfigValue] = useState<Value>(DEFAULT_REMOTE_CONFIG_VALUE[key])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    remoteConfig.settings.minimumFetchIntervalMillis = refetchInterval || DEFAULT_REFETCH_INTERVAL
  }, [refetchInterval])

  const getRemoteConfigByKey = async (key: string) => {
    try {
      const value = getValue(remoteConfig, key)

      setConfigValue(value)
    } catch (err) {
      setError(new Error('Error: fetching remote config').message)
    }
  }

  return { configValue, error, getRemoteConfigByKey }
}

type RemoteConfigStringKey = 'IMAGE_ASPECT_RATIOS' | 'IMAGE_CATEGORY' | 'IMAGE_STYLE' | 'SOCIAL_MEDIA_PLATFORMS'
export const useRemoteStringConfig = <T>(key: RemoteConfigStringKey) => {
  const { configValue, error } = useRemoteConfig(key)
  const [object, setObject] = useState<T>({} as T)

  useEffect(() => {
    if (configValue) {
      const config = JSON.parse(configValue.asString() as string)

      setObject(config)
    }
  }, [configValue])

  return {
    config: object,
    error,
  }
}

export default useRemoteConfig
