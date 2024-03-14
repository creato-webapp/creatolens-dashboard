import { useState, type FC } from 'react'
import { CheckBoxProps } from './interface'

const Checkbox: FC<CheckBoxProps> = (props: CheckBoxProps) => {
  const { className, ...res } = props
  const [checked, setChecked] = useState(props.checked)
  const onChangeCheckbox: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    props.onChange && props.onChange(e)
    setChecked(e.target.checked)
  }
  return (
    <input
      {...res}
      id={props.id}
      name={props.id}
      checked={checked}
      onChange={onChangeCheckbox}
      type="checkbox"
      className={`checkbox block rounded-sm border-stroke ${className ? className : ''}`}
    />
  )
}
export default Checkbox
