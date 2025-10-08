import type { FC } from 'react'

import BaseInput from '../BaseInput'
import type { DateTimePicker as DateTimePickerProps } from '../interface'

const DateTimePicker: FC<DateTimePickerProps> = (props) => {
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
      {...props}
    />
  )
}

export default DateTimePicker
