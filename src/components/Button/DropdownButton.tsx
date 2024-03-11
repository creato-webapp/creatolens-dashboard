import React from 'react'
import { ButtonProps } from './interface'
import Button from './Button'

const DropdownButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading,
  type = 'button',
  styleClassName,
  sizes,
  isOpened = false,
  ...res
}) => {
  const isDisabled = disabled || loading

  const focusStyle = ' focus:border-stroke focus:border-3 focus:border '
  const hoverStyle = ' hover:bg-interface-hover '
  const activeStyle = isOpened && ' !bg-accent1-500 !text-white'
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      sizes={sizes}
      {...res}
      className={`w-[128px] rounded-lg border-none md:w-auto ${res.className}`}
      styleClassName={`bg-bg-dark text-text-secondary border-none ${focusStyle} ${hoverStyle} ${
        isDisabled ? 'pointer-events-none text-zinc-400' : ''
      } ${styleClassName} ${activeStyle}`}
    >
      {children}
    </Button>
  )
}

export default DropdownButton
