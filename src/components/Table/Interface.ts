export interface rowData {
  [key: string]: any
}

export interface Column {
  title: string
  dataIndex: string
  render?: Function
}

export interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  columns: Column[]
}

export interface BodyProps extends React.HTMLAttributes<HTMLBodyElement> {}
