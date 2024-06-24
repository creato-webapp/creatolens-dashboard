import { ButtonProps } from './interface'
import Spinner from '../Spinner'
import { useCallback } from 'react'

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, type = 'button', styleClassName, sizes, ...res }) => {
  const generatePadding = useCallback((sizes: string[]): { padding: string; width?: string } => {
    let padding = ''
    let width = ''

    if (!sizes) {
      return { padding: 'px-2 py-1 md:px-3 md:py-2 lg:py-3 lg:px-3' }
    }
    sizes.forEach((size: string, index: number) => {
      const breakpoint = index === 0 ? '' : index === 1 ? 'md:' : 'lg:'

      switch (size) {
        case 's':
          padding += ` ${breakpoint}px-4 ${breakpoint}py-2`
          break
        case 'm':
          padding += ` ${breakpoint}px-6 ${breakpoint}py-2`
          break
        case 'l':
          padding += ` ${breakpoint}px-6 ${breakpoint}py-3`
          break
        case 'full':
          padding += 'px-6 py-3'
          width = 'w-full'
          break
        default:
          padding = 'px-2 py-1 md:px-3 md:py-2 lg:py-3 lg:px-3'
          break
      }
    })
    return { padding, width }
  }, [])

  const { padding, width } = generatePadding(sizes!)

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      {...res}
      className={`w-full rounded-lg ${width ? width : 'md:w-auto'} ${res.className}`}
    >
      <div
        className={`inline-flex min-w-fit items-center justify-center gap-2.5 whitespace-nowrap rounded-md border-2 hover:shadow-sm ${width} ${styleClassName} ${padding}`}
      >
        <Spinner loading={loading} />
        {children}
      </div>
    </button>
  )
}

export default Button
