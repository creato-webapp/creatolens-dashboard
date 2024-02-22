import React, { InputHTMLAttributes, FormHTMLAttributes, DetailedHTMLProps, LabelHTMLAttributes } from 'react'
import { ButtonProps } from '@components/Button/interface'
export type InputType = 'Input' | 'DatePicker' | 'TimePicker' | 'DateTimePicker' | 'Checkbox' | 'InputNumber' | 'InputPassword'

export type customFormItemProps = {
  [key: string]: string | number | boolean | any
}
export interface IField {
  type: InputType
  label: string
  name: string
  required?: boolean
  customFormItemProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export interface FormLayoutProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  Header?: string
  subHeader?: string
  fields: IField[]
  loading: boolean
  allowSubmit?: boolean
  onSubmit: (values: any) => void | Promise<void>
  formStyles?: string
  formInnerStyles?: string
  buttonStyles?: string
  buttonText?: string
  buttonSizes?: ButtonProps['sizes']
}

export interface ItemProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  label: string
  key: number
  customFormItemProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  placeholder?: string
  defaultValue?: string | undefined
  customFormItemProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  defaultChecked?: boolean
  disabled?: boolean
  customFormItemProps?: React.InputHTMLAttributes<HTMLInputElement>
  className?: string
}

export interface CustomItemProps {
  type: InputType // Assuming InputType is defined elsewhere
  id: string
  placeholder?: string
  defaultValue?: string | boolean | number | undefined
  className?: string
  disabled?: boolean
  customFormItemProps?: any // Ensure this is defined correctly, or replace 'any' with the actual type
  onChange?: React.ChangeEventHandler<HTMLInputElement> // Specified for HTMLInputElement
}
