export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: 'primary' | 'text'
  disabled?: boolean
  loading: boolean
}
