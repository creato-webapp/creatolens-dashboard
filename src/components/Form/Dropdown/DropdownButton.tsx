import CaretUpIcon from '@components/Icon/CaretUpIcon'
import { DropdownSize } from './Dropdown'
import { useCallback } from 'react'

interface DropdownButtonProps {
  name: string
  isDropdownNotSelected: boolean
  isOpen: boolean
  handleToggleMenu: () => void
  dropDownSizes?: [DropdownSize, DropdownSize, DropdownSize]
  disabled?: boolean
  className?: string
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  name,
  isDropdownNotSelected,
  isOpen,
  handleToggleMenu,
  dropDownSizes,
  disabled = false,
  className,
}) => {
  const generatePadding = useCallback((dropDownSizes: string[]): { padding: string; caretSize: string } => {
    let padding = ''
    let caretSize = ''
    if (!dropDownSizes) {
      return { padding: 'px-2 py-2 md:px-3 md:py-2 lg:py-3 lg:px-3', caretSize: 'w-6 h-6' }
    }
    dropDownSizes.forEach((size: string, index: number) => {
      const breakpoint = index === 0 ? '' : index === 1 ? 'md:' : 'lg:'

      switch (size) {
        case 's':
          padding += ` ${breakpoint}px-4 ${breakpoint}py-2`
          caretSize += ` ${breakpoint}w-3 ${breakpoint}h-3`
          break
        case 'm':
          padding += ` ${breakpoint}px-4 ${breakpoint}py-2`
          caretSize += ` ${breakpoint}w-6 ${breakpoint}h-6`
          break
        case 'l':
          padding += ` ${breakpoint}px-6 ${breakpoint}py-3`
          caretSize += ` ${breakpoint}w-6 ${breakpoint}h-6`
          break

        default:
          padding = 'px-2 py-2 md:px-3 md:py-2 lg:py-3 lg:px-3'
          caretSize = 'w-6 h-6'
          break
      }
    })
    return { padding, caretSize }
  }, [])

  const { padding, caretSize } = generatePadding(dropDownSizes!)

  const color = isDropdownNotSelected ? 'text-text-secondary bg-white' : '!text-neutral-800'

  return (
    <button
      className={`dropdown-button w-full rounded-lg border border-neutral-300 disabled:bg-bg-disabled ${color} ${padding} ${className}`}
      onClick={handleToggleMenu}
      disabled={disabled}
    >
      <div className="flex items-center justify-between gap-2.5 truncate whitespace-nowrap rounded-md">
        <span className="truncate text-base">{name}</span>
        <div className="flex-shrink-0">
          <CaretUpIcon
            className={`w-fit transform stroke-black transition-all ${disabled ? 'stroke-disabled' : ''} ${caretSize} ${!isOpen ? 'rotate-180' : ''}`}
            color={isOpen ? 'white' : isDropdownNotSelected ? 'black' : 'white'}
          />
        </div>
      </div>
    </button>
  )
}

export default DropdownButton
