export interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  rowProps?: React.HTMLAttributes<HTMLTableRowElement>
  cellProps?: React.HTMLAttributes<HTMLTableCellElement>
}

const Row = (props: RowProps) => {
  const { children, ...rest } = props

  return (
    <tr {...rest} className={`border-b ${props.className}`}>
      {children}
    </tr>
  )
}

export default Row
