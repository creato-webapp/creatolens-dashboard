import React, { InputHTMLAttributes, PropsWithChildren } from 'react'
import { IAccount } from '../Account/interface'

export type InputType =
  | 'Input'
  | 'DatePicker'
  | 'TimePicker'
  | 'DateTimePicker'
  | 'Checkbox'

export type customFormItemProps = {
  [key: string]: string | number | boolean | any
}
export interface IField {
  type: InputType
  label: string
  name: string
  required?: boolean
  customFormItemProps?: customFormItemProps
}

export interface FormLayoutProps extends PropsWithChildren {
  Header?: string
  subHeader?: string
  fields: IField[]
  loading: boolean
  onSubmit: Function
}

export interface ItemProps extends PropsWithChildren {
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
}

export interface CustomItemProps
  extends Record<
    string,
    string | boolean | number | undefined | customFormItemProps
  > {
  type: InputType
  id: string
  placeholder?: string
  defaultValue?: string | boolean | number | undefined
  disabled?: boolean
  customFormItemProps?: customFormItemProps
  onChange?: React.ChangeEventHandler
}
