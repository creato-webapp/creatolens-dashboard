import { InputHTMLAttributes } from 'react'
import { customFormItemProps } from '../interface'
export interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  defaultValue?: string
  disabled?: boolean
  customFormItemProps?: customFormItemProps
}

export interface TimePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  defaultValue?: string
  disabled?: boolean
  customFormItemProps?: customFormItemProps
}

export interface DateTimePicker extends TimePickerProps, DatePickerProps {}
