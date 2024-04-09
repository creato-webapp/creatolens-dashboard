import React, { useRef, useEffect, useState } from 'react'
import { Button } from './Button'
import CrossIcon from './Icon/CrossIcon'

interface PopupProps extends React.HTMLProps<HTMLDivElement> {
  defaultShow?: boolean
  title?: string
  footer?: string
  isDisabledScroll?: boolean
  withConfirmButton?: boolean
  withCloseButton?: boolean
  withCancelButton?: boolean
  onConfirm?: () => void
  onClose?: () => void
}

const Popup: React.FC<PopupProps> = ({
  title,
  children,
  defaultShow = true,
  isDisabledScroll = true,
  withConfirmButton = true,
  withCloseButton = true,
  withCancelButton = true,
  footer,
  onClose,
}) => {
  const popupRef = useRef<HTMLDivElement>(null)
  const [isShow, setIsShow] = useState(defaultShow)

  const handleClose = () => {
    setIsShow(false)
    onClose && onClose()
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsShow(false)
      onClose && onClose()
    }
  }

  useEffect(() => {
    // Add when the component is mounted
    if (isDisabledScroll && isShow) {
      document.body.style.overflow = 'hidden'
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto'
    }
  }, [isShow, isDisabledScroll, handleClickOutside])

  useEffect(() => {
    setIsShow(defaultShow)
  }, [defaultShow])

  return isShow ? (
    <div className="fixed inset-0 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50">
      <div
        className="absolute left-1/2 top-1/2 mx-auto w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-md border bg-white p-5 shadow-lg"
        ref={popupRef}
      >
        <div className="flex flex-col justify-center space-y-3  ">
          <div className="flex items-center justify-between">
            {title ? <h3 className="font-h3-bold">{title}</h3> : <div className="w-auto"></div>}
            {withCloseButton && (
              <div>
                <Button.Text className="text-text-primary" onClick={handleClose}>
                  <CrossIcon />
                </Button.Text>
              </div>
            )}
          </div>
          {title && <hr></hr>}
          <div>{children}</div>
          <div className="flex justify-center gap-6 self-center px-2 py-2">
            {withCancelButton && (
              <Button.Outline className="max-w-fit self-center" onClick={handleClose}>
                Cancel
              </Button.Outline>
            )}
            {withConfirmButton && <Button.Primary className="max-w-fit self-center">Confirm</Button.Primary>}
          </div>
          {footer && <footer className="font-paragraph-light">{footer}</footer>}
        </div>
      </div>
    </div>
  ) : null
}

export default Popup
