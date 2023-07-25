import type { FC } from 'react'
import { CustomItemProps } from './interface'
import { DatePicker, TimePicker, DateTimePicker } from './DatetimePicker'
import Checkbox from './Checkbox'
import TextInput from './TextInput'
import InputNumber from './InputNumber'
import BaseInput from './BaseInput'

const CustomItem: FC<CustomItemProps> = (props: CustomItemProps) => {
  const { customFormItemProps } = props
  switch (props.type) {
    case 'Input':
      return (
        <TextInput
          id={props.id}
          defaultValue={props.defaultValue as string}
          placeholder={props?.placeholder}
          disabled={props.disabled}
          onChange={props.onChange}
          customFormItemProps={props}
        />
      )
    case 'InputNumber':
      return (
        <InputNumber
          id={props.id}
          defaultValue={props.defaultValue as string}
          placeholder={props?.placeholder}
          disabled={props.disabled}
          onChange={props.onChange}
          type="number"
          {...customFormItemProps}
        />
      )
    case 'Checkbox':
      return (
        <Checkbox
          id={props.id}
          defaultChecked={props.defaultValue as boolean}
          disabled={props.disabled}
          onChange={props.onChange}
          {...customFormItemProps}
        />
      )
    case 'DateTimePicker':
      return (
        <DateTimePicker
          id={props.id}
          defaultValue={props.defaultValue as string}
          disabled={props.disabled}
          onChange={props.onChange}
          {...customFormItemProps}
        />
      )
    case 'DatePicker':
      return (
        <DatePicker
          id={props.id}
          defaultValue={props.defaultValue as string}
          disabled={props.disabled}
          onChange={props.onChange}
          {...customFormItemProps}
        />
      )
    case 'TimePicker':
      return <TimePicker id={props.id} defaultValue={props.defaultValue as string} onChange={props.onChange} {...customFormItemProps} />
    default:
      return (
        <BaseInput
          id={props.id}
          defaultValue={props.defaultValue as string}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={props.onChange}
          {...customFormItemProps}
        />
      )
  }
}
export default CustomItem
