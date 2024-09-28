type ButtonSize = 's' | 'm' | 'l'
type ButtonVariant = 'Primary' | 'Netural' | 'Subtle'
export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean
  sizes?: [ButtonSize, ButtonSize, ButtonSize]
  isOpened?: boolean
  id?: string
  variant?: ButtonVariant
  isDanger?: boolean
  icon?: {
    position: 'left' | 'right'
    src: string
  }
}
