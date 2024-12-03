import React from 'react'

import Button from './Base'
import { ButtonProps } from './interface'

import Spinner from '../Spinner'

const OutlinePrimaryButton: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, type = 'button', sizes, className, ...res }) => {
  const isDisabled = disabled || loading

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      sizes={sizes}
      {...res}
      className={`border-accent1-500 text-accent1-500 hover:bg-accent1-500 hover:text-white hover:shadow-sm focus:border-accent1-500 focus:outline-2  active:bg-white active:text-text-secondary active:outline active:outline-2 active:outline-slate-300 ${className} ${
        isDisabled ? 'pointer-events-none border-2 border-accent1-500 bg-gray-100 text-zinc-400' : ''
      }`}
    >
      <Spinner loading={loading} />
      {children}
    </Button>
  )
}

export default OutlinePrimaryButton
