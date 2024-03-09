import React, { FC, useState } from 'react'
import { NumberInputProps } from './interface'
import BaseInput from './BaseInput'

const InputNumber: FC<NumberInputProps> = (props: NumberInputProps) => {
  const { id, placeholder, defaultValue, value } = props

  return (
    <BaseInput
      type="number"
      name={id}
      className={`
      mt-0
      block
      min-w-64
      border-0
      border-b-2 border-gray-200 px-0.5
      focus:border-black focus:ring-0
      ${props.className}
    `}
      value={value}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={props.disabled}
      {...props}
    />
  )
}
export default InputNumber
