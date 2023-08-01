import React from 'react'

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

const Layout: React.FC<TableProps> = ({ className, children, ...res }) => {
  return (
    <table className={`my-2 table grow table-auto border-collapse border border-slate-400 text-left text-gray-500 ${className}`} {...res}>
      {children}
    </table>
  )
}

export default Layout
