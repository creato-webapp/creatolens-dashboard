import React from 'react'
import { TableProps } from './Interface'

const Layout: React.FC<TableProps> = (props: TableProps) => {
  return (
    <table className="my-2 table grow table-auto border-collapse border border-slate-400 text-left text-gray-500">
      <>{props.children}</>
    </table>
  )
}

export default Layout
