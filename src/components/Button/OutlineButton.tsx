import React from 'react'
import Spinner from '../Spinner'
import { ButtonProps } from './interface'

const Outline: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, type = 'button', styleClassName, ...res }) => {
  const isDisabled = disabled || loading
  return (
    <button type={type} onClick={onClick} disabled={loading || disabled} {...res} className={`w-full rounded-lg md:w-auto ${res.className}`}>
      <div
        className={`inline-flex min-w-fit items-center justify-center gap-2.5 whitespace-nowrap rounded-md border-2 border-text-secondary px-2 py-1 text-text-secondary hover:bg-text-secondary hover:text-white hover:shadow-sm focus:border-text-secondary focus:outline-2 active:border-text-secondary active:bg-white active:text-text-secondary active:outline active:outline-2 active:outline-slate-300 md:px-3 md:py-2 lg:py-3 lg:px-3 ${
          isDisabled ? 'pointer-events-none border-2 border-gray-100 bg-gray-100 text-zinc-400' : ''
        } ${styleClassName}`}
      >
        <Spinner loading={loading} />
        {children}
      </div>
    </button>
  )
}

export default Outline
