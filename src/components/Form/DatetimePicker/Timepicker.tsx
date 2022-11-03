import type { FC } from 'react'
import { TimePickerProps } from './interface'

const TimePicker: FC<TimePickerProps> = (props: TimePickerProps) => {
  return (
    <div className="mb-4 flex items-center">
      <input
        id={props.id}
        name={props.id}
        type="time"
        defaultValue={props.defaultValue}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
      />
    </div>
  )
}
export default TimePicker
