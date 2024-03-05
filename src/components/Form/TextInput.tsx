import type { FC } from 'react'
import { InputProps } from './interface'
import BaseInput from './BaseInput'

const TextInput: FC<InputProps> = (props: InputProps) => {
  const { id, placeholder, defaultValue } = props
  return <BaseInput {...props} type="text" name={id} placeholder={placeholder} defaultValue={defaultValue} />
}
export default TextInput
