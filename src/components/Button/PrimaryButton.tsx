import React from 'react'
import { Spinner } from '../Spinner'
interface ButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  disabled?: boolean
  loading: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  outline?: boolean
}

const Primary: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, outline, ...res }) => {
  let classStyle = 'button-primary'
  if (outline === true) {
    classStyle = 'button-outline'
  }
  return (
    <button onClick={onClick} disabled={loading || disabled} className={classStyle} {...res}>
      <div className="flex items-center justify-center text-lg font-medium leading-loose">
        <Spinner loading={loading} />
        {children}
      </div>
    </button>
  )
}

export default Primary
