import type { FC } from 'react'
import { CheckBoxProps } from './interface'

const Checkbox: FC<CheckBoxProps> = (props: CheckBoxProps) => {
  const { className, ...res } = props
  return (
    <input
      {...res}
      id={props.id}
      name={props.id}
      type="checkbox"
      className={`checkbox block rounded-sm border-stroke ${className ? className : ''}`}
    />
  )
}
export default Checkbox
