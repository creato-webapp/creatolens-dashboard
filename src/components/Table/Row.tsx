import { Cookies } from '@lib/Account/Account/interface'
import { Column } from './Interface'

type RowData = string | number | boolean | Date | null | Cookies | undefined
export interface IGenericRowData {
  [key: string]: RowData
}

export interface RowProps extends React.TableHTMLAttributes<HTMLTableRowElement> {
  rowKey: number
  columns: Column[]
  rowData: IGenericRowData
  rowProps?: React.HTMLAttributes<HTMLTableRowElement>
  cellProps?: React.HTMLAttributes<HTMLTableCellElement>
}

const Row = (props: RowProps) => {
  const { rowProps, cellProps } = props
  const { className: rowClassName, ...rowRest } = rowProps || {}
  const { className: cellClassName, ...cellRest } = cellProps || {}

  function accessProperty<T extends IGenericRowData>(rowData: T, dataIndex: string): RowData {
    return rowData[dataIndex]
  }

  return (
    <tr key={props.rowKey} {...rowRest} className={`border-b ${rowClassName}`}>
      {props.columns.map(({ dataIndex, render }, index) => (
        <td
          key={index}
          {...cellRest}
          className={`min-w-32 h-12 items-center justify-start border border-slate-300 bg-neutral-50 p-2 ${cellClassName}`}
        >
          {render ? render(accessProperty(props.rowData, dataIndex)) : accessProperty(props.rowData, dataIndex)}
        </td>
      ))}
    </tr>
  )
}

export default Row
