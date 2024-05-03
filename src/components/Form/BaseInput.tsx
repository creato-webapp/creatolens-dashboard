import React, { useEffect, useState } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export interface IBaseInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
  error?: boolean
  message?: string
  iconClassName?: string
  allowSpace?: boolean
  childrenPosition?: 'left' | 'right'
}

const BaseInput: React.FunctionComponent<IBaseInputProps> = ({
  id,
  name,
  value,
  disabled,
  className,
  allowSpace,
  children,
  childrenPosition = 'right',
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value) // Sync state with prop
  }, [value])

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (props.type === 'number') {
      const validNumber = /^-?\d*\.?\d*$/
      if (!validNumber.test(e.target.value) && value !== '') {
        return
      }
    }
    const { value: newValue } = e.target
    if (allowSpace || !newValue.includes(' ')) {
      setErrorMessage('')
      setInputValue(newValue)
    } else {
      setErrorMessage('Space input is not allowed!')
    }
    props.onChange?.(e)
  }
  return (
    <>
      <div className="relative flex w-full items-center rounded-md">
        {childrenPosition === 'left' && children}
        <input
          {...props}
          id={id}
          type={props.type}
          name={name}
          value={inputValue}
          onChange={onChange}
          disabled={disabled}
          className={`base-input inline-flex min-w-64 rounded-md border border-gray-500 bg-neutral-50 p-2 font-semibold ${
            errorMessage ? 'focus:border-0 focus:border-none focus:outline-error-600' : ''
          } ${className ? className : ''}`}
        />
        {childrenPosition === 'right' && children}

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          {errorMessage && <ExclamationCircleIcon className="h-5 w-5 text-error-500" aria-hidden="true" />}
        </div>
      </div>
      {errorMessage && (
        <p className={'text-secondary-700 absolute'} id={`${name}-error`}>
          {errorMessage}
        </p>
      )}
      {props.type === 'text' && props?.maxLength && (
        <p className="text-right italic text-neutral-400">{`(${inputValue?.toString().length ?? 0}/${props?.maxLength} words)`}</p>
      )}
    </>
  )
}

export default BaseInput
