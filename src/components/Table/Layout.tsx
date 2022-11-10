import React from 'react'
import { TableProps } from './Interface'

const Layout: React.FC<TableProps> = (props: TableProps) => {
  return (
    <div className="relative sm:rounded-lg">
      <table className="my-2 table-auto border-collapse border border-slate-400 text-left text-sm text-gray-500 dark:text-gray-400">
        <>{props.children}</>
      </table>
    </div>
  )
}

export default Layout
