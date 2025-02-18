import React from 'react'

import Button from './Base'
import { ButtonProps } from './interface'

const SubtleButton: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, type = 'button', className, sizes, ...res }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      sizes={sizes}
      {...res}
      className={`border border-white  hover:border-secondary-400 ${className}`}
    >
      {children}
    </Button>
  )
}

export default SubtleButton
