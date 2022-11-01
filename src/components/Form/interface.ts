import { PropsWithChildren } from 'react'
import { IAccount } from '../Account/interface'

export interface IField {
  type: 'Input' | 'Select' | 'InputNumber'
  label: string
  name: string
}

export interface FormLayoutProps extends PropsWithChildren {}

export interface InputProps {
  id: string
  placeholder?: string
  defaultValue?: string | keyof IAccount
  disabled?: boolean
}

export interface ItemProps extends PropsWithChildren {
  label: string
}
