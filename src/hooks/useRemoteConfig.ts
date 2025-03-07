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

const useRemoteConfig = (key: string) => {
  const [configValue, setConfigValue] = useState<Value | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchConfigValue = async () => {
      const defaultConfig = await getAllRemoteConfig()
      setConfigValue(defaultConfig[key])
    }
    fetchConfigValue()
  }, [key])

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
