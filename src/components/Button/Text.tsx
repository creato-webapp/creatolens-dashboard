import React from 'react'

import { ButtonProps } from './interface'

const TextButton: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, type, className }) => {
  return (
    <button type={type} onClick={onClick} disabled={loading || disabled} className={`button-text ${className}`}>
      {children}
    </button>
  )
}

export default TextButton
