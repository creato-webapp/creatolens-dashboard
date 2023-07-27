import { RowProps } from './Interface'

const Row: React.FC<RowProps> = (props: RowProps) => {
  return (
    <tr key={props.key} className="border-b">
      {props.columns.map(({ title, dataIndex, render }, index) => (
        <td key={index} className="min-w-32 h-12 items-center justify-start border border-slate-300 bg-neutral-50 p-2 ">
          {render ? render(props.rowData[dataIndex]) : props.rowData[dataIndex]}
        </td>
      ))}
    </tr>
  )
}

export default Row
