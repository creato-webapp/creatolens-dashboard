import type { FC } from 'react'
import { CheckBoxProps } from './interface'

const Checkbox: FC<CheckBoxProps> = (props: CheckBoxProps) => {
  return (
    <input
      id={props.id}
      name={props.id}
      type="checkbox"
      defaultChecked={props.defaultChecked}
      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
    />
  )
}
export default Checkbox
