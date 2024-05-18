import React from 'react'

export interface Column {
  title: string
  dataIndex: string
  render?: () => void
  headerIcon?: React.ReactNode
  sortAvailable?: boolean
}

export interface HeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  columns: Column[]
}

export interface BodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
