import type { FC } from 'react'
import { CustomItemProps } from './interface'
import { DatePicker, TimePicker, DateTimePicker } from './DatetimePicker'
import Checkbox from './Checkbox'
import Input from './Input'

const CustomItem: FC<CustomItemProps> = (props: CustomItemProps) => {
  const { customFormItemProps } = props
  switch (props.type) {
    case 'Input':
      return (
        <Input
          id={props.id}
          defaultValue={props.defaultValue as string}
          placeholder={props?.placeholder}
          disabled={props.disabled}
          customFormItemProps={customFormItemProps}
        />
      )
    case 'Checkbox':
      return (
        <Checkbox
          id={props.id}
          defaultChecked={props.defaultValue as boolean}
          disabled={props.disabled}
          {...customFormItemProps}
        />
      )
    case 'DateTimePicker':
      return (
        <DateTimePicker
          id={props.id}
          defaultValue={props.defaultValue as string}
          disabled={props.disabled}
          {...customFormItemProps}
        />
      )
    case 'DatePicker':
      return (
        <DatePicker
          id={props.id}
          defaultValue={props.defaultValue as string}
          disabled={props.disabled}
          {...customFormItemProps}
        />
      )
    case 'TimePicker':
      return (
        <TimePicker
          id={props.id}
          defaultValue={props.defaultValue as string}
          {...customFormItemProps}
        />
      )
    default:
      return (
        <Input
          id={props.id}
          defaultValue={props.defaultValue as string}
          placeholder={props.placeholder}
          disabled={props.disabled}
          {...customFormItemProps}
        />
      )
  }
}
export default CustomItem
