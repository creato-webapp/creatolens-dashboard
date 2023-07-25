import React, { useEffect, useState } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

type IReactInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export interface IBaseInputProps extends IReactInputProps {
  label?: string
  error?: boolean
  message?: string
  iconClassName?: string
  customFormItemProps?: any
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
  customFormItemProps,
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
      <div className="relative space-y-2 rounded-md">
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`base-input inline-flex h-9 w-64 rounded-md border border-gray-500 bg-neutral-50 p-2 font-semibold`}
          {...customFormItemProps}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          {error && <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
          {children}
        </div>
      </div>
      {message && (
        <p className={error ? 'text-secondary-700' : 'text-shades-100'} id={`${name}-error`}>
          {message}
        </p>
      )}
      {props.type === 'text' && props?.maxLength && (
        <p className="text-right italic text-neutral-400">{`(${state?.toString().length ?? 0}/${props?.maxLength} words)`}</p>
      )}
    </>
  )
}

export default BaseInput
