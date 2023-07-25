import type { FC } from 'react'
import { CheckBoxProps } from './interface'

const Checkbox: FC<CheckBoxProps> = ({ ...res }: CheckBoxProps) => {
  const { className } = res
  return <input type="checkbox" {...res} className={`checkbox ${className}`} />
}
export default Checkbox
