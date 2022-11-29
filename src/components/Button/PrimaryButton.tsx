import React from 'react'
import { ButtonProps } from './interface'

const Primary: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading,
  ...res
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="button-primary"
      {...res}
    >
      {children}
    </button>
  )
}

export default Primary
