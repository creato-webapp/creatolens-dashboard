import React from 'react'
import Spinner from '../Spinner'
import { ButtonProps } from './interface'
import Button from './Button'

const Outline: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, type = 'button', styleClassName, sizes, ...res }) => {
  const isDisabled = disabled || loading
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      sizes={sizes}
      {...res}
      className={`w-full rounded-lg md:w-auto ${res.className}`}
      styleClassName={`hover:shadow-sm focus:border-text-secondary focus:outline-2 active:border-text-secondary active:bg-white active:text-text-secondary active:outline active:outline-2 active:outline-slate-300 border-text-secondary border-text-secondary text-text-secondary hover:bg-text-secondary hover:text-white ${
        isDisabled ? 'pointer-events-none border-2 border-gray-100 bg-gray-100 text-zinc-400' : ''
      }`}
    >
      <Spinner loading={loading} />
      {children}
    </Button>
  )
}

export default Outline
