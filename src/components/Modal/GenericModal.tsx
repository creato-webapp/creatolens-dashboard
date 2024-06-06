import React, { PropsWithChildren } from 'react'

import { useModals } from 'src/hooks/useModal'

import { Button } from '../Button'
import CrossIcon from '../Icon/CrossIcon'

export type GenericModalOptions = {
  title?: string
  closeable?: boolean
  confirmable?: boolean
  cancelable?: boolean
  footer?: string
}

export interface GenericModalInterface extends PropsWithChildren {
  options?: GenericModalOptions
}

export const GenericModal = ({ children, options = {} }: GenericModalInterface) => {
  const { onCallbacks, closeModal } = useModals()
  const { closeable, cancelable, confirmable, footer, title } = options

  return (
    <div className="fixed inset-0 z-10 h-screen w-screen overflow-y-auto bg-gray-600 bg-opacity-50">
      <div className=" absolute left-1/2 top-1/2 mx-auto w-128 -translate-x-1/2 -translate-y-1/2 transform rounded-md border bg-white p-5 shadow-lg">
        <div className="flex flex-col justify-center space-y-3">
          <div className="flex items-center justify-between">
            {title ? <h3 className="font-h3-bold">{title}</h3> : <div className="w-auto"></div>}
            {closeable && (
              <div>
                <Button.Text className="text-text-primary" onClick={closeModal}>
                  <CrossIcon />
                </Button.Text>
              </div>
            )}
          </div>
          {title && <hr />}
          <div>{children}</div>
          <div className="flex justify-center gap-6 self-center px-2 py-2">
            {cancelable && (
              <Button.Outline className="max-w-fit self-center" onClick={onCallbacks.onCancel}>
                Cancel
              </Button.Outline>
            )}
            {confirmable && (
              <Button.Primary className="max-w-fit self-center" onClick={onCallbacks.onConfirm}>
                Confirm
              </Button.Primary>
            )}
          </div>
          {footer && <footer className="font-paragraph-light">{footer}</footer>}
        </div>
      </div>
    </div>
  )
}
