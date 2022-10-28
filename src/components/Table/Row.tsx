import { RowProps } from './Interface'

const Row: React.FC<RowProps> = (props: RowProps) => {
  return (
    <tr
      key={props.key}
      className=" border-b dark:bg-gray-800 dark:border-gray-700"
    >
      {props.columns.map(({ title, dataIndex, render }, index) => (
        <td key={index} className="border border-slate-300 py-2 px-4">
          {render ? render(props.rowData[dataIndex]) : props.rowData[dataIndex]}
        </td>
      ))}
    </tr>
  )
}

export default Row
