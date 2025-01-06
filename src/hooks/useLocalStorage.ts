import { useState, useCallback } from 'react'

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const isBrowser = typeof window !== 'undefined' // Check if window object is available

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowser) {
      // Return the initial value during SSR
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
      if (!isBrowser) {
        console.warn('localStorage is not available on the server.')
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
    [key, storedValue, isBrowser]
  )

  const removeValue = useCallback(() => {
    if (!isBrowser) {
      console.warn('localStorage is not available on the server.')
      return
    }

    try {
      setStoredValue(initialValue)
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage', error)
    }
  }, [key, initialValue, isBrowser])

  return [storedValue, setValue, removeValue] as const
}

export default useLocalStorage
