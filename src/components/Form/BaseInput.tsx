import React, { useEffect, useState } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export interface IBaseInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
  error?: boolean
  message?: string
  iconClassName?: string
  customFormItemProps?: any
  allowSpace?: boolean
  childrenPosition?: 'left' | 'right'
}

const BaseInput: React.FunctionComponent<IBaseInputProps> = ({
  label,
  error,
  message,
  iconClassName,
  id,
  name,
  value,
  required,
  disabled,
  className,
  onChange: onNewChange,
  allowSpace,
  children,
  customFormItemProps,
  childrenPosition = 'right',
  ...props
}) => {
  const [state, setState] = useState<IBaseInputProps['value']>()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (allowSpace || e.target.value.indexOf(' ') === -1) {
      // Check if space input is allowed or if space is not present
      const target = e.target as HTMLInputElement
      setState(target.value)
      onNewChange && onNewChange(e)
      setErrorMessage('')
    } else {
      setErrorMessage('Space input is not allowed!') // Alert the user that space input is not allowed
    }
  }

  useEffect(() => {
    setState(value || '')
  }, [value])
  return (
    <>
      <div className="relative flex w-full items-center rounded-md">
        {childrenPosition === 'left' && children}
        <input
          {...customFormItemProps}
          {...props}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={customFormItemProps?.required}
          disabled={disabled}
          className={`base-input min-w-64 inline-flex rounded-md border border-gray-500 bg-neutral-50 p-2 font-semibold ${
            errorMessage ? 'focus:border-0 focus:border-none focus:outline-error-600' : ''
          } ${className ? className : ''}`}
          style={customFormItemProps?.style}
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
        <p className="text-right italic text-neutral-400">{`(${state?.toString().length ?? 0}/${props?.maxLength} words)`}</p>
      )}
    </>
  )
}

export default BaseInput
