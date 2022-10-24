import { HeaderProps } from './Interface'

const Header = (props: HeaderProps) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {props.columns.map((e, index) => (
          <th
            scope="col"
            className="border border-slate-300 py-2 px-4"
            key={index}
          >
            <div className="flex items-center">{e.title}</div>
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default Header
