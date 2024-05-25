import { Column } from './Interface'
import SortingIcon from '../Icon/SortingIcon'
export interface HeaderProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {
  columns: Column[]
  headerIcon?: React.ReactNode
  trClassName?: string
  thClassName?: string
  orderBy?: string
  isAsc: boolean
  updateSorting?: (orderBy: string, isAsc: boolean) => React.MouseEventHandler<HTMLDivElement>
}

const Header: React.FC<HeaderProps> = ({ className, children, columns, trClassName, thClassName, orderBy, isAsc, updateSorting, ...res }) => {
  return (
    <thead className={`bg-neutral-100 uppercase ${className}`} {...res}>
      <tr className={trClassName}>
        {columns.map((e, index) => (
          <th scope="col" className={`border border-slate-300 px-2 py-2  ${thClassName}`} key={index}>
            <div className="flex w-full flex-row items-center gap-2">
              {e.headerIcon && <div className="flex w-fit">{e.headerIcon}</div>}
              <div>{e.title}</div>
              {e.sortAvailable && updateSorting && (
                <div className="flex flex-col gap-1">
                  <div onClick={updateSorting(e.dataIndex, true)} className="cursor-pointer">
                    <SortingIcon
                      fillColor={`${
                        orderBy === e.dataIndex ? (isAsc === true ? 'fill-accent1-500' : 'fill-interface-hover') : 'fill-interface-hover'
                      }`}
                    />
                  </div>
                  <div onClick={updateSorting(e.dataIndex, false)} className="cursor-pointer">
                    <SortingIcon
                      fillColor={`${
                        orderBy === e.dataIndex ? (isAsc === false ? 'fill-accent1-500' : 'fill-interface-hover') : 'fill-interface-hover'
                      }`}
                      className="rotate-180"
                    />
                  </div>
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
