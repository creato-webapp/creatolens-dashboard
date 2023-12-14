import { ButtonProps } from './interface'
import Spinner from '../Spinner'

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, type = 'button', styleClassName, sizes, ...res }) => {
  const isDisabled = disabled || loading

  const getPaddingClasses = (index: number, classes: string) => {
    if (index === 0) {
      return classes
    } else if (index === 1) {
      return `md:${classes}`
    } else if (index === 2) {
      return `lg:${classes}`
    }
    return index === 0 ? classes : `md:${classes} lg:${classes}`
  }

  const generatePadding = (sizes: string[]) => {
    let padding = ''
    console.log('gen', sizes)
    if (!sizes) {
      return 'px-2 py-1 md:px-3 md:py-2 lg:py-3 lg:px-3 '
    }
    sizes.forEach((size: string, index: number) => {
      switch (size) {
        case 's':
          padding += `${getPaddingClasses(index, 'px-4 py-2')}`
          break
        case 'm':
          padding += `${getPaddingClasses(index, 'px-6 py-2')}`
          break
        case 'l':
          padding += `${getPaddingClasses(index, 'px-6 py-3')}`
          break
        default:
          padding = 'px-2 py-1 md:px-3 md:py-2 lg:py-3 lg:px-3 '
          break
      }
    })
    return padding
  }


  return (
    <button type={type} onClick={onClick} disabled={loading || disabled} {...res} className={`w-full rounded-lg md:w-auto ${res.className}`}>
      <div
        className={`inline-flex min-w-fit items-center justify-center gap-2.5 whitespace-nowrap rounded-md border-2 hover:shadow-sm ${styleClassName} ${generatePadding(sizes!)}`}
      >
        <Spinner loading={loading} />
        {children}
      </div>
    </button>
  )
}

export default Button
