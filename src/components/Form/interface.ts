import React, { InputHTMLAttributes, PropsWithChildren, FormHTMLAttributes, DetailedHTMLProps, LabelHTMLAttributes } from 'react'
export type InputType = 'Input' | 'DatePicker' | 'TimePicker' | 'DateTimePicker' | 'Checkbox' | 'InputNumber' | 'InputPassword'

export type customFormItemProps = {
  [key: string]: string | number | boolean | any
}
export interface IField {
  type: InputType
  label: string
  name: string
  required?: boolean
  customFormItemProps?: {
    style?: React.CSSProperties
    [key: string]: any // for any other properties
  }
}

export interface FormLayoutProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  Header?: string
  subHeader?: string
  fields: IField[]
  loading: boolean
  allowSubmit?: boolean
  onSubmit: (values: any) => void | Promise<void>
}

export interface ItemProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  label: string
  key: number
  customFormItemProps?: customFormItemProps
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  placeholder?: string
  defaultValue?: string | undefined
  customFormItemProps?: customFormItemProps
}

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  defaultChecked?: boolean
  disabled?: boolean
  customFormItemProps?: customFormItemProps
  className?: string
}

export interface CustomItemProps extends Record<string, string | boolean | number | undefined | customFormItemProps> {
  type: InputType
  id: string
  placeholder?: string
  defaultValue?: string | boolean | number | undefined
  disabled?: boolean
  customFormItemProps?: customFormItemProps
  onChange?: React.ChangeEventHandler
}
