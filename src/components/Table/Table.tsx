import React from 'react'
import Header from './Header'
import Body from './Body'
import { TableProps } from './Interface'

const Table = (props: TableProps) => {
  const { columns, dataSource } = props
  return (
    <div className="overflow-x-auto relative  sm:rounded-lg">
      <table className="table-auto border-collapse border border-slate-400 m-8 text-sm text-left text-gray-500 dark:text-gray-400">
        <Header columns={columns} />
        <Body columns={columns} dataSource={dataSource} />
      </table>
    </div>
  )
}

export default Table
