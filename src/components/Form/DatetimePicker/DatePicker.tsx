import type { FC } from 'react'

import BaseInput from '../BaseInput'
import { DatePickerProps } from '../interface'

const DatePicker: FC<DatePickerProps> = (props: DatePickerProps) => {
  return (
    <div className="mb-4 flex items-center">
      <BaseInput
        name={props.id}
        defaultValue={props.defaultValue}
        id={props.id}
        min="2000-01-01"
        type="date"
        className="
        mt-1
        block
        w-full
        rounded-md
        border-gray-300
        shadow-sm
        focus:border-accent2-300 focus:ring focus:ring-accent2-200 focus:ring-opacity-50"
      />
    </div>
  )
}
export default DatePicker
