import React from 'react'
import Spinner from '../Spinner'
interface ButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  styleClassName?: string
}

const Primary: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, type = 'button', styleClassName, ...res }) => {
  const isDisabled = disabled || loading
  return (
    <button type={type} onClick={onClick} disabled={loading || disabled} {...res} className={`w-full rounded-lg md:w-auto ${res.className}`}>
      <div
        className={`inline-flex min-w-fit items-center justify-center gap-2.5 whitespace-nowrap rounded-md border-2 border-transparent bg-accent1-500 px-2 py-1 text-white hover:bg-accent1-400 hover:shadow-sm focus:border-accent1-200 focus:outline-2 active:border-accent1-500 active:bg-white active:text-accent1-500 active:outline active:outline-2 active:outline-slate-300 md:px-3 md:py-2 lg:py-3 lg:px-3 ${
          isDisabled ? 'pointer-events-none border-gray-100 bg-gray-100 text-zinc-400' : ''
        } ${styleClassName}`}
      >
        <Spinner loading={loading} />
        {children}
      </div>
    </button>
  )
}

export default Primary
