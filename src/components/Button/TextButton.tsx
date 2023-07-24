import React from 'react'
import { ButtonProps } from './interface'

const Text: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, type, className }) => {
  return (
    <button onClick={onClick} disabled={loading || disabled} className={`button-text ${className}`} type={type}>
      {children}
    </button>
  )
}

export default Text
