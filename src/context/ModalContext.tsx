//TODO Create Modal https://trello.com/c/Tj61Pg6m/437-errormodal-using-provider-to-write-error-modal-for-error-handling-in-lens
import React, { ReactNode, createContext, useState } from 'react'
import { GenericModalOptions } from '@components/Modal/GenericModal'
import { PropsWithChildren } from 'react'

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
export const ModalContext = createContext<ModalContextType | undefined>(undefined)

type ModalProviderProps = {} & PropsWithChildren

export const ModalProvider = ({ children }: ModalProviderProps) => {
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
