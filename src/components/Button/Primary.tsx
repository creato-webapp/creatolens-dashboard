import React from 'react'

import Button from './Base'
import { ButtonProps } from './interface'

const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, type = 'button', className, sizes, ...res }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      sizes={sizes}
      {...res}
      className={`border border-primary-500 bg-primary-500 text-white hover:bg-primary-600 ${className}`}
    >
      {children}
    </Button>
  )
}

export default PrimaryButton
