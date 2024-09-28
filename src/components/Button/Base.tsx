import { useCallback } from 'react'

import { ButtonProps } from './interface'

import Spinner from '../Spinner'
import Image from 'next/image'

const BaseButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading,
  type = 'button',
  className,
  sizes = ['s', 'm', 'l'],
  icon,
  ...res
}) => {
  const generatePadding = useCallback((sizes: string[]): { padding: string } => {
    let padding = ''

    if (!sizes) {
      return { padding: 'px-2 py-1 md:px-3 md:py-2 lg:py-3 lg:px-3' }
    }
    sizes.forEach((size: string, index: number) => {
      const breakpoint = index === 0 ? '' : index === 1 ? 'md:' : 'lg:'

      switch (size) {
        case 's':
          padding += ` ${breakpoint}px-2 ${breakpoint}py-2 w-fit`
          break
        case 'm':
          padding += ` ${breakpoint}px-3 ${breakpoint}py-3 w-fit`
          break
        case 'l':
          padding += ` ${breakpoint}px-3 ${breakpoint}py-3 w-full`
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
      disabled={disabled}
      className={`flex min-w-fit items-center justify-center gap-2.5 whitespace-nowrap rounded-lg dark:invert ${padding} ${className} disabled:border-disabled disabled:bg-bg-disabled disabled:text-disabled`}
      {...res}
    >
      {icon?.position === 'left' && <Image width={15} height={15} src={icon.src} alt={'icon'}></Image>}
      <Spinner loading={loading} />
      {children}
      {icon?.position === 'right' && <Image width={15} height={15} src={icon.src} alt={'icon'}></Image>}
    </button>
  )
}

export default BaseButton
