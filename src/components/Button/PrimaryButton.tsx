import React from 'react'
import { Spinner } from '../Spinner'
interface ButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  outline?: boolean
}

const Primary: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, outline, type = 'button', ...res }) => {
  let classStyle = 'button-primary'
  if (outline === true) {
    classStyle = 'button-outline'
  }
  return (
    <button type={type} onClick={onClick} disabled={loading || disabled} {...res} className={`${classStyle} ${res.className}`}>
      <div className="mx-4 my-2 flex items-center justify-center">
        <Spinner loading={loading} />
        {children}
      </div>
    </button>
  )
}

export default Primary
