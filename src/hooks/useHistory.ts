import { useContext } from 'react'

import { HistoryContext } from '@context/HistoryContext'

export const useHistory = () => {
  // move to useHook folder
  const context = useContext(HistoryContext)
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider') // Fixed error message
  }
  return context
}
