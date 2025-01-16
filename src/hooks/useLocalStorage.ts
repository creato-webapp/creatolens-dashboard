import { useState, useCallback } from 'react'

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const isLocalStorageAvailable = () => {
    try {
      return typeof window !== 'undefined' && window.localStorage !== undefined
    } catch {
      return false
    }
  }

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isLocalStorageAvailable()) {
      return initialValue
    }

    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage', error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      if (!isLocalStorageAvailable()) {
        return
      }

      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error('Error setting to localStorage', error)
      }
    },
    [key, storedValue]
  )

  const removeValue = useCallback(() => {
    if (!isLocalStorageAvailable()) {
      return
    }

    try {
      setStoredValue(initialValue)
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage', error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue] as const
}

export default useLocalStorage
