import type { FC } from 'react'
import { InputProps } from './interface'
import BaseInput from './BaseInput'

const TextInput: FC<InputProps> = (props: InputProps) => {
  const { id, placeholder, defaultValue, customFormItemProps } = props
  return (
    <BaseInput
      type="text"
      name={id}
      className="
      mt-0
      block
      w-full
      border-0
      border-b-2 border-gray-200 px-0.5
      focus:border-black focus:ring-0
    "
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={props.disabled}
      {...customFormItemProps}
    />
  )
}
export default TextInput
