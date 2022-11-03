import { PropsWithChildren } from 'react'
import { IAccount } from '../Account/interface'

export interface IField {
  type: 'Input' | 'Select' | 'InputNumber' | 'Checkbox' | 'DateTimePicker'
  label: string
  name: string
}

export interface FormLayoutProps extends PropsWithChildren {
  Header?: string
  subHeader?: string
  loading: boolean
  onSubmit: Function
}

export interface ItemProps extends PropsWithChildren {
  label: string
}

export interface InputProps {
  id: string
  placeholder?: string
  defaultValue?: string
  disabled?: boolean
}

export interface CheckBoxProps {
  id: string
  placeholder?: string
  defaultValue?: boolean
  disabled?: boolean
}
