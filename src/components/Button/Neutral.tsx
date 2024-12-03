import React from 'react'

import Button from './Base'
import { ButtonProps } from './interface'

const NeutralButton: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, type = 'button', className, sizes, ...res }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      sizes={sizes}
      {...res}
      className={`bg-secondary-500 text-white ${className}`}
    >
      {children}
    </Button>
  )
}

export default NeutralButton
