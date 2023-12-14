import type { FC } from 'react'
import { ItemProps } from './interface'
import { Paragraph } from '../Typography'
const Item: FC<ItemProps> = (props: ItemProps) => {
  const { customFormItemProps } = props
  return (
    <div key={props.key}>
      <label className="inline-flex items-start">
        <Paragraph className="font-semibold" font="h4">
          {props.label}
        </Paragraph>
        {customFormItemProps?.required ? <span className="text-lg font-bold text-rose-500">{' *'}</span> : null}{' '}
        {/* <span className="pb-5 text-gray-700">{props.label}</span> */}
      </label>
      {props.children}
    </div>
  )
}
export default Item
