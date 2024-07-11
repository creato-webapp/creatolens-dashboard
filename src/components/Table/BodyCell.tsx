export interface BodyCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  key: string
}

const BodyCell: React.FC<BodyCellProps> = ({ children, ...props }) => {
  const { className, ...rest } = props

  return (
    <td className={`h-12 min-w-32 items-center justify-start border border-slate-300 bg-neutral-50 p-2 ${className}`} {...rest}>
      {children}
    </td>
  )
}

export default BodyCell
