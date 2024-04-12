//TODO Create Modal https://trello.com/c/Tj61Pg6m/437-errormodal-using-provider-to-write-error-modal-for-error-handling-in-lens
import React, { ReactNode, createContext, useContext, useState } from 'react'
import { ModalKeyEnum, GenericModalOptions, GenericModal } from '@components/Modal/GenericModal'
import { SessionModal } from '@lib/Account/Account'

type ModalContextType = {
  modal: IModalKey | null
  content: ReactNode | null
  options: GenericModalOptions | null
  openModal: (key: IModalKey, node: React.ReactNode, options?: GenericModalOptions) => void
  closeModal: () => void
  // onClose: () => void
  // onConfirm: () => void
}

type IModalKey = keyof typeof ModalKeyEnum

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<IModalKey | null>(null)
  const [content, setContent] = useState<ReactNode>(null)
  const [options, setOptions] = useState<GenericModalOptions | null>(null)
  const openModal = (key: IModalKey, node: ReactNode, options?: GenericModalOptions) => {
    setModal(key)
    setContent(node)
    if (options) setOptions(options)
  }
  const closeModal = () => {
    setModal(null)
  }

  return <ModalContext.Provider value={{ modal, content, options, openModal, closeModal }}>{children}</ModalContext.Provider>
}

export const HOCModal = () => {
  const { modal } = useModals()
  return (
    <>
      {modal === ModalKeyEnum.DEFAULT && <GenericModal />}
      {modal === ModalKeyEnum.SESSION && <SessionModal />}
    </>
  )
}

export const useModals = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModals must be used within a DialogueProvider')
  }
  return context
}
