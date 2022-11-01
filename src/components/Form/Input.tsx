import type { FC } from 'react'
import { InputProps } from './interface'

const Input: FC<InputProps> = (props: InputProps) => {
  return (
    <input
      type="text"
      className="
            mt-1
            block
            w-full
            rounded-md
            border-gray-300
            shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            "
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
    />
  )
}
export default Input
