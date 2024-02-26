import { InputHTMLAttributes } from 'react'
export interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  disabled?: boolean
  customFormItemProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export interface TimePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  disabled?: boolean
  customFormItemProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export interface DateTimePicker extends TimePickerProps, DatePickerProps {}
