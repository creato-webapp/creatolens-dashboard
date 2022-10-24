import React from 'react'
import { ButtonProps } from './interface'

const Button = (props: ButtonProps) => {
  const { children, type, onClick, disabled, loading } = props
  return loading ? (
    <button
      disabled
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24" />
      {children}
    </button>
  ) : (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  )
}

export default Button
