import React from 'react'

import Button from './Base'
import { ButtonProps } from './interface'

const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, type = 'button', className, sizes, ...res }) => {
  const isDisabled = disabled || loading

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      sizes={sizes}
      {...res}
      className={`border-2 border-transparent bg-accent1-500  text-white hover:bg-accent1-400 hover:shadow-sm focus:border-accent1-200 focus:outline-2 active:border-accent1-500 active:bg-white active:text-accent1-500 active:outline active:outline-2 active:outline-slate-300 ${className} ${
        isDisabled ? 'pointer-events-none border-gray-100 bg-gray-100 text-zinc-400' : ''
      }`}
    >
      {children}
    </Button>
  )
}

export default PrimaryButton
