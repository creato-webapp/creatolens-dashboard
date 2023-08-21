import { Column, rowData } from './Interface'
export interface RowProps extends React.TableHTMLAttributes<HTMLTableRowElement> {
  rowKey: number
  columns: Column[]
  rowData: rowData
  rowProps?: React.HTMLAttributes<HTMLTableRowElement>
  cellProps?: React.HTMLAttributes<HTMLTableCellElement>
}

const Row: React.FC<RowProps> = (props: RowProps) => {
  const { rowProps, cellProps } = props
  const { className: rowClassName, ...rowRest } = rowProps || {}
  const { className: cellClassName, ...cellRest } = cellProps || {}
  return (
    <tr key={props.rowKey} {...rowRest} className={`border-b ${rowClassName}`}>
      {props.columns.map(({ dataIndex, render }, index) => (
        <td
          key={index}
          {...cellRest}
          className={`min-w-32 h-12 items-center justify-start border border-slate-300 bg-neutral-50 p-2 ${cellClassName}`}
        >
          {render ? render(props.rowData[dataIndex]) : props.rowData[dataIndex]}
        </td>
      ))}
    </tr>
  )
}

export default Row
