import { IAccount } from '@lib/Account/Account'
import React from 'react'

export interface RowData {
  [key: string]: string | number | boolean | React.ReactNode | IAccount
}

export interface Column {
  title: string
  dataIndex: string
  render?: Function
  headerIcon?: React.ReactNode
  sortAvailable?: boolean
}

export interface HeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  columns: Column[]
}

export interface BodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
