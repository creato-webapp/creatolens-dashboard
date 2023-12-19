export interface rowData {
  [key: string]: any
}

export interface Column {
  title: string
  dataIndex: string
  render?: Function
  headerIcon?: React.ReactNode
}

export interface HeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  columns: Column[]
}

export interface BodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
