import React from 'react'

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

const Layout: React.FC<TableProps> = (props: TableProps) => {
  const { className, children, ...res } = props
  return (
    <table className={`my-2 table grow table-auto border-collapse border border-slate-400 text-left text-gray-500 ${className}`} {...res}>
      {children}
    </table>
  )
}

export default Layout
