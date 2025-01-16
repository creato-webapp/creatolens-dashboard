import { useContext } from 'react'

import { ImageHashtagContext } from '@context/ImageToHashtagContext'

export const useImageHashtag = () => {
  // move to useHook folder
  const context = useContext(ImageHashtagContext)
  if (!context) {
    throw new Error('useImageHashtagContext must be used within an ImageHashtagProvider')
  }
  return context
}
