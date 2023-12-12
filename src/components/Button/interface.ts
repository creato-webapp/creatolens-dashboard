export interface ButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  styleClassName?: string
}
