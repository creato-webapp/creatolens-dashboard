import React, { useEffect, useState } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

type IReactInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export interface IBaseInputProps extends IReactInputProps {
  label?: string
  error?: boolean
  message?: string
  iconClassName?: string
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
  children,
  ...props
}) => {
  const [state, setState] = useState<IBaseInputProps['value']>()
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement
    setState(target.value)
    onNewChange && onNewChange(e)
  }

  useEffect(() => {
    setState(value || '')
  }, [value])

  return (
    <>
      <div className="relative mt-1 rounded-md">
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={
            'hover:border-primary-500 hover:text-primary-500 hover:placeholder-primary-500 focus:placeholder-shades-100 focus:text-shades-100 block w-full p-2 outline-none  focus:outline-none' +
            (error
              ? 'border-secondary-700 hover:border-secondary-700 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-shades-100') +
            (disabled
              ? 'border-none bg-neutral-100 placeholder-neutral-800 hover:placeholder-neutral-800'
              : 'border-shades-100') +
            (className ? className : '')
          }
          disabled={disabled}
          {...props}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          {error && (
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          )}
          {children}
        </div>
      </div>
      {message && (
        <p
          className={error ? 'text-secondary-700' : 'text-shades-100'}
          id={`${name}-error`}
        >
          {message}
        </p>
      )}
      {props.type === 'text' && props?.maxLength && (
        <p className="text-right italic text-neutral-400">{`(${
          state?.toString().length ?? 0
        }/${props?.maxLength} words)`}</p>
      )}
    </>
  )
}

export default BaseInput
