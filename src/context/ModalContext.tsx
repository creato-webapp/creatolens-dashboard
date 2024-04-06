//TODO Create Modal https://trello.com/c/Tj61Pg6m/437-errormodal-using-provider-to-write-error-modal-for-error-handling-in-lens
import React, { ReactNode, createContext, useCallback, useContext, useState } from 'react'
import { Modal, ModalOptions } from '@components/Modal'

type ModalContextType = {
  modals: JSX.Element[]
  addModal: (node: React.ReactNode, options?: ModalOptions) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

let idCounter = 0

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<JSX.Element[]>([])
  const addModal = useCallback((node: React.ReactNode, options: ModalOptions = {}) => {
    const id = ++idCounter

    const close = () => {
      setModals((modals: JSX.Element[]) => {
        return modals.filter((modal) => modal.key !== `${id}`)
      })
    }
    const modal = (
      <Modal key={id} close={close} options={options}>
        {node}
      </Modal>
    )

    setModals((modals) => [...modals, modal])
  }, [])

  return (
    <ModalContext.Provider value={{ modals, addModal }}>
      {modals}
      {children}
    </ModalContext.Provider>
  )
}

export const useModals = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModals must be used within a DialogueProvider')
  }
  return context
}
