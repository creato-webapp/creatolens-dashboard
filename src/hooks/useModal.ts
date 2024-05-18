import { useContext } from 'react'

import { ModalContext } from 'src/context/ModalContext'

export const useModals = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModals must be used within a ModalProvider')
  }
  return context
}
