type ButtonSize = 's' | 'm' | 'l' | 'full'
export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean
  sizes?: [ButtonSize, ButtonSize, ButtonSize]
  isOpened?: boolean
  id?: string
}
