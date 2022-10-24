import { ReactNode } from 'react'
import internal from 'stream'

export interface rowData {
  [key: string]: any
}

export interface Column {
  title: string
  dataIndex: string
  render?: ReactNode
}

export interface HeaderProps {
  columns: Column[]
}

export interface RowProps {
  key: number
  columns: Column[]
  rowData: rowData
}

export interface BodyProps {
  dataSource: rowData[]
  columns: Column[]
}

export interface TableProps {
  columns: Column[]
  dataSource: any[]
}
