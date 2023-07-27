import type { FC } from 'react'
import { InputProps } from './interface'
import BaseInput from './BaseInput'

const TextInput: FC<InputProps> = (props: InputProps) => {
  const { id, placeholder, defaultValue, customFormItemProps } = props
  return (
    <BaseInput
      {...props}
      type="text"
      name={id}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={props.disabled}
      customFormItemProps={customFormItemProps}
    />
  )
}
export default TextInput
