import React from 'react'
import { ButtonProps } from './interface'

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'primary',
  onClick,
  disabled = false,
  loading,
  ...res
}) => {
  const ButtonConfig = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded',
    text: 'bg-transparent text-blue-700 hover:text-blue-900 py-2 px-4',
  }

  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`${ButtonConfig[type]}`}
      {...res}
    >
      {children}
    </button>
  )
}

export default Button
