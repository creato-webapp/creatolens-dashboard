import { Column } from './Interface'
import Image from 'next/image'
import SortingIcon from '../Icon/SortingIcon'
export interface HeaderProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {
  columns: Column[]
  headerIcon?: React.ReactNode
  trClassName?: string
  thClassName?: string
  sort?: 'asc' | 'desc'
}

const Header: React.FC<HeaderProps> = ({ className, children, columns, headerIcon, trClassName, thClassName, sort = 'asc', ...res }) => {
  return (
    <thead className={`bg-neutral-100 uppercase ${className}`} {...res}>
      <tr className={trClassName}>
        {columns.map((e, index) => (
          <th scope="col" className={`border border-slate-300 py-2 px-2  ${thClassName}`} key={index}>
            <div className="flex w-full flex-row items-center gap-2">
              {e.headerIcon && <div className="flex w-fit">{e.headerIcon}</div>}
              <div>{e.title}</div>
              {e.sortAvailable && (
                <div className="flex flex-col gap-1">
                  <SortingIcon fillColor={`${sort === 'asc' ? 'fill-accent1-500' : 'fill-interface-hover'}`} />
                  <SortingIcon fillColor={`${sort === 'desc' ? 'fill-accent1-500' : 'fill-interface-hover'}`} className="rotate-180" />
                </div>
              )}
            </div>
            {children}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default Header
