import { ReactNode, PropsWithChildren, FC } from 'react'

export interface rowData {
  [key: string]: any
}

export interface Column {
  title: string
  dataIndex: string
  render?: Function
}

export interface HeaderProps extends PropsWithChildren {
  columns: Column[]
}

export interface RowProps extends PropsWithChildren {
  key: number
  columns: Column[]
  rowData: rowData
}

export interface BodyProps extends PropsWithChildren {}

export interface TableProps extends PropsWithChildren {}
