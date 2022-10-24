export interface ButtonProps {
  children: string
  type: 'primary' | 'text'
  onClick: VoidFunction
  disabled?: boolean
  loading: boolean
}
