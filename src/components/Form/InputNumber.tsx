import React, { FC, useEffect, useState } from 'react'
import { InputProps } from './interface'
import BaseInput from './BaseInput'

const InputNumber: FC<InputProps> = (props: InputProps) => {
  const { id, placeholder, defaultValue, customFormItemProps, onChange: onNewChange, value } = props
  const [state, setState] = useState<InputProps['value']>()
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement
    setState(target.value)
    onNewChange && onNewChange(e)
  }

  useEffect(() => {
    setState(value || 0)
  }, [value])

  return (
    <BaseInput
      type="number"
      name={id}
      className="
      min-w-64
      mt-0
      block
      border-0
      border-b-2 border-gray-200 px-0.5
      focus:border-black focus:ring-0
    "
      value={value}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={props.disabled}
      onChange={onChange}
      {...customFormItemProps}
    />
  )
}
export default InputNumber
