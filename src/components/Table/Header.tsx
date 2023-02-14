import { HeaderProps } from './Interface'

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
      <tr>
        {props.columns.map((e, index) => (
          <th
            scope="col"
            className="border border-slate-300 py-2 px-4"
            key={index}
          >
            <div className="flex items-center">{e.title}</div>
            {props.children}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default Header
