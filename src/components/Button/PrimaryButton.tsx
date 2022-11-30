import React from 'react'
import { ButtonProps } from './interface'
import { Spinner } from '../Spinner'

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
      <div className="flex">
        <Spinner loading={loading} />
        {children}
      </div>
    </button>
  )
}

export default Primary
