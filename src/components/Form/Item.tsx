import type { FC } from 'react'
import { ItemProps } from './interface'

const Item: FC<ItemProps> = (props: ItemProps) => {
  return (
    <label className="block">
      <span className="text-gray-700">{props.label}</span>
      {props.children}
    </label>
  )
}
export default Item
