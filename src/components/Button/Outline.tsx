import React from 'react'

import Button from './Base'
import { ButtonProps } from './interface'

import Spinner from '../Spinner'

const OutlineButton: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, type = 'button', sizes, className, ...res }) => {
  const isDisabled = disabled || loading

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      sizes={sizes}
      {...res}
      className={`border-text-secondary text-text-secondary hover:bg-text-secondary hover:text-white hover:shadow-sm focus:border-text-secondary focus:outline-2 active:border-text-secondary active:bg-white active:text-text-secondary active:outline active:outline-2 active:outline-slate-300 ${className} ${
        isDisabled ? 'pointer-events-none border-2 border-gray-100 bg-gray-100 text-zinc-400' : ''
      }`}
    >
      <Spinner loading={loading} />
      {children}
    </Button>
  )
}

export default OutlineButton
