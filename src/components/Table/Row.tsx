import { RowProps } from './Interface'

const Row = (props: RowProps) => {
  return (
    <tr
      key={props.key}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      {props.columns.map((e) => (
        <td className="border border-slate-300 py-2 px-4">
          {e.hasOwnProperty('render') ? e.render : props.rowData[e.dataIndex]}
        </td>
      ))}
    </tr>
  )
}

export default Row
