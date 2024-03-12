import React, { InputHTMLAttributes, FormHTMLAttributes, DetailedHTMLProps, LabelHTMLAttributes, ReactNode } from 'react'
import { ButtonProps } from '@components/Button/interface'

export type InputType = 'text' | 'date' | 'time' | 'datetime-local' | 'checkbox' | 'number' | 'password' | 'CustomItem'

export interface IField extends React.InputHTMLAttributes<HTMLInputElement> {
  type: InputType
  label?: string
  name: string
  id: string
  required?: boolean
  component?: ReactNode
}

export interface FormLayoutProps<T> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  Header?: string
  subHeader?: string
  fields: IField[]
  loading: boolean
  allowSubmit?: boolean
  onSubmit: (values: T) => void | Promise<void>
  formStyles?: string
  formInnerStyles?: string
  buttonStyles?: string
  buttonText?: string
  buttonSizes?: ButtonProps['sizes']
}

export interface ItemProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  label: string
  key: number
}

export interface InputProps extends BaseInputProps {}
export interface NumberInputProps extends BaseInputProps {
  value?: number
}
export interface CheckBoxProps extends BaseInputProps {}

export interface DatePickerProps extends BaseInputProps {}

export interface TimePickerProps extends BaseInputProps {}

export interface DateTimePicker extends TimePickerProps, DatePickerProps {}

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export type CustomItemProps = InputProps | CheckBoxProps | NumberInputProps | DatePickerProps | DatePickerProps | TimePickerProps | DateTimePicker
