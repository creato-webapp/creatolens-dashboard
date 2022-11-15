import type { FC } from 'react'
import { DateTimePicker } from './interface'
import BaseInput from '../BaseInput'

const DateTimePicker: FC<DateTimePicker> = (props: DateTimePicker) => {
  return (
    <BaseInput
      id={props.id}
      name={props.id}
      type="datetime-local"
      defaultValue={props.defaultValue}
      className="
        mt-0
        block
        w-full
        border-0
        border-b-2 border-gray-200 px-0.5
        focus:border-black focus:ring-0
      "
    />
  )
}
export default DateTimePicker
