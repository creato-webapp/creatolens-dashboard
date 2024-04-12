//TODO Create Modal https://trello.com/c/Tj61Pg6m/437-errormodal-using-provider-to-write-error-modal-for-error-handling-in-lens
import React, { ReactNode, createContext, useContext, useState } from 'react'
import { GenericModalOptions, GenericModal } from '@components/Modal/GenericModal'
import SessionModal from '@components/Modal/SessionModal'

export enum ModalKeyEnum {
  DEFAULT = 'DEFAULT',
  SESSION = 'SESSION',
}

type onCallbacks = {
  onClose: () => void
  onConfirm: () => void
  onCancel: () => void
}

type ModalContextType = {
  modal: IModalKey | null
  content: ReactNode | null
  openModal: (key: IModalKey, node?: React.ReactNode, options?: GenericModalOptions) => void
  closeModal: () => void
  options: GenericModalOptions | null
  onCallbacks: onCallbacks
  onClearCallbacks(): void
  onCloseRegistry: (callback: () => void) => void
  onConfirmRegistry: (callback: () => void) => void
  onCancelRegistry: (callback: () => void) => void
}

type IModalKey = keyof typeof ModalKeyEnum
//
const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<IModalKey | null>(null)
  const [content, setContent] = useState<ReactNode>(null)
  const [options, setOptions] = useState<GenericModalOptions | null>(null)
  const [onCallbacks, setOnCallbacks] = useState<onCallbacks>({
    onClose: () => {},
    onConfirm: () => {},
    onCancel: () => {},
  })

  const openModal = (key: IModalKey, node: ReactNode, options?: GenericModalOptions) => {
    setModal(key)
    setContent(node)
    if (options) setOptions(options)
  }
  const closeModal = () => {
    setModal(null)
    onCallbacks.onClose()
  }

  const onCloseRegistry = (callback: () => void) => {
    setOnCallbacks({ ...onCallbacks, onClose: callback })
  }
  const onConfirmRegistry = (callback: () => void) => {
    setOnCallbacks({ ...onCallbacks, onConfirm: callback })
  }
  const onCancelRegistry = (callback: () => void) => {
    setOnCallbacks({ ...onCallbacks, onCancel: callback })
  }

  const onClearCallbacks = () => {
    setOnCallbacks({
      onClose: () => {},
      onConfirm: () => {},
      onCancel: () => {},
    })
  }

  return (
    <ModalContext.Provider
      value={{
        modal,
        content,
        options,
        openModal,
        closeModal,
        onCallbacks,
        onCloseRegistry,
        onConfirmRegistry,
        onCancelRegistry,
        onClearCallbacks,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
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
    throw new Error('useModals must be used within a ModalProvider')
  }
  return context
}
