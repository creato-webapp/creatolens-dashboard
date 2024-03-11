import type { FC } from 'react'
import { TimePickerProps } from '../interface'
import BaseInput from '../BaseInput'

const TimePicker: FC<TimePickerProps> = (props: TimePickerProps) => {
  return (
    <div className="mb-4 flex items-center">
      <BaseInput
        id={props.id}
        name={props.id}
        type="time"
        defaultValue={props.defaultValue}
        className="mt-0 block w-full border-0 border-b-2 border-gray-200 px-0.5 focus:border-black focus:ring-0"
      />
    </div>
  )
}
export default TimePicker
