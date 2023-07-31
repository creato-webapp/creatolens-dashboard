import { Column } from './Interface'
export interface HeaderProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {
  columns: Column[]
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { className, children, ...res } = props
  return (
    <thead className={`bg-neutral-100 uppercase ${className}`} {...res}>
      <tr>
        {props.columns.map((e, index) => (
          <th scope="col" className="border border-slate-300 py-2 px-4" key={index}>
            <div className="flex items-center">{e.title}</div>
            {children}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default Header
