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
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  name,
  isDropdownNotSelected,
  isOpen,
  handleToggleMenu,
  dropDownSizes,
  disabled = false,
}) => {
  const generatePadding = useCallback((dropDownSizes: string[]): { padding: string; caretSize: string } => {
    let padding = ''
    let caretSize = ''
    if (!dropDownSizes) {
      return { padding: 'px-2 py-1 md:px-3 md:py-2 lg:py-3 lg:px-3', caretSize: 'w-6 h-6' }
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
          padding = 'px-2 py-1 md:px-3 md:py-2 lg:py-3 lg:px-3'
          caretSize = 'w-6 h-6'
          break
      }
    })
    return { padding, caretSize }
  }, [])

  const { padding, caretSize } = generatePadding(dropDownSizes!)

  const color = isDropdownNotSelected ? 'text-text-secondary' : '!text-neutral-800'

  return (
    <button
      className={`dropdown-button w-full rounded-lg border border-neutral-300 disabled:bg-bg-disabled ${color} ${padding} `}
      onClick={handleToggleMenu}
      disabled={disabled}
    >
      <div className="sm inline-flex w-full items-center justify-between gap-2.5 rounded-md text-md">
        {name}
        <CaretUpIcon
          className={`pointer-events-none w-fit transform stroke-black transition-all ${disabled ? 'stroke-disabled' : ''} ${caretSize} ${
            !isOpen ? 'rotate-180 ' : ''
          }`}
          color={isOpen ? 'white' : isDropdownNotSelected ? 'black' : 'white'}
        />
      </div>
    </button>
  )
}

export default DropdownButton