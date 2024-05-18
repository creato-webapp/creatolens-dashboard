import { useCallback } from 'react'

import { ButtonProps } from './interface'

import Spinner from '../Spinner'

const BaseButton: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading, type = 'button', className, sizes, ...res }) => {
  const generatePadding = useCallback((sizes: string[]): { padding: string } => {
    let padding = ''

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
        default:
          padding = 'px-2 py-1 md:px-3 md:py-2 lg:py-3 lg:px-3'
          break
      }
    })
    return { padding }
  }, [])

  const { padding } = generatePadding(sizes!)

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`flex w-full min-w-fit items-center justify-center gap-2.5 whitespace-nowrap rounded-lg border-2 hover:shadow-sm md:w-auto ${padding} ${className}`}
      {...res}
    >
      <Spinner loading={loading} />
      {children}
    </button>
  )
}

export default BaseButton
