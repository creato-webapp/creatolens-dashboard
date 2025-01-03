import { useContext } from 'react'

import { HistoryContext } from '@context/HistoryContext'

export const useHistory = () => {
  // move to useHook folder
  const context = useContext(HistoryContext)
  if (!context) {
    throw new Error('HistoryContext must be used within an ImageHashtagProvider')
  }
  return context
}
