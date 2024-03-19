import React from 'react'
import { ButtonProps } from './interface'

const Text: React.FC<ButtonProps> = ({ id, children, onClick, disabled = false, loading, type, className }) => {
  return (
    <button id={id} onClick={onClick} disabled={loading || disabled} className={`button-text ${className}`} type={type}>
      {children}
    </button>
  )
}

export default Text
