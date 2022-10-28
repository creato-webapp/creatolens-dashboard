import React from 'react'
import { TableProps } from './Interface'

const Layout: React.FC<TableProps> = (props: TableProps) => {
  return (
    <div className="relative  sm:rounded-lg">
      <table className="table-auto border-collapse border border-slate-400 m-8 text-sm text-left text-gray-500 dark:text-gray-400">
        <>{props.children}</>
      </table>
    </div>
  )
}

export default Layout
