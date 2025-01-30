import { useContext } from 'react'
import { HistoryContext } from '@context/HistoryContext'

export const useHistory = () => {
  const context = useContext(HistoryContext)
  if (!context) {
    throw new Error('HistoryContext must be used within an HistoryProvider')
  }
  return context
}
