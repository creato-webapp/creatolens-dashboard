import React from 'react'
import { ButtonProps } from './interface'

const Text: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="button-text"
      type={type}
    >
      {children}
    </button>
  )
}

export default Text
