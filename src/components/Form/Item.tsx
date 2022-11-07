import type { FC } from 'react'
import { ItemProps } from './interface'

const Item: FC<ItemProps> = (props: ItemProps) => {
  const { customFormItemProps } = props
  return (
    <div key={props.key}>
      <label className="block ">
        {customFormItemProps?.required ? (
          <span style={{ color: '#ff0000' }}> *</span>
        ) : null}
        <span className="pb-5 text-gray-700">{props.label}</span>
      </label>

      {props.children}
    </div>
  )
}
export default Item
