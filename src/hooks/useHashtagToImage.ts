import { useContext } from 'react'

import { HashtagImageContext } from '@context/HashtagToImageContext'

export const useHashtagToImage = () => {
  const context = useContext(HashtagImageContext)
  if (!context) {
    throw new Error('useHashtagImageContext must be used within a HashtagImageProvider')
  }
  return context
}
