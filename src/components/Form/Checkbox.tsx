import type { FC } from 'react'
import { CheckBoxProps } from './interface'

const Checkbox: FC<CheckBoxProps> = ({ ...res }: CheckBoxProps) => {
  return <input {...res} type="checkbox" className="checkbox" />
}
export default Checkbox
