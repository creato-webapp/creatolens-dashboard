import { Column } from './Interface'
export interface HeaderProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {
  columns: Column[]
  headerIcon?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ className, children, columns, ...res }) => {
  return (
    <thead className={`bg-neutral-100 uppercase ${className}`} {...res}>
      <tr>
        {columns.map((e, index) => (
          <th scope="col" className={`border border-slate-300 py-2 px-2  ${thClassName}`} key={index}>
            <div className="flex w-full flex-row items-center gap-2">
              {e.headerIcon && <div className="flex w-fit">{e.headerIcon}</div>}
            <div>{e.title}</div>
            </div>
            {children}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default Header
