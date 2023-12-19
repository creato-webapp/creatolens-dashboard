import React, { useEffect, useState, useRef, useCallback, useMemo, HTMLProps } from 'react'
import { CaretUpIcon } from '@components/Icon'

export interface DropdownOption {
  label: string
  value: string | number
}

type DropdownSize = 's' | 'm' | 'l'
interface DropdownProps extends HTMLProps<HTMLSelectElement> {
  name?: string
  options: DropdownOption[]
  defaultValue?: string | number
  disabled?: boolean
  onValueChange?: (value: string | number) => void
  dropDownSizes?: [DropdownSize, DropdownSize, DropdownSize]
  icon?: React.ReactNode
}

const Dropdown: React.FC<DropdownProps> = ({ name = '', options, defaultValue, disabled, onValueChange, sizes, icon }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || name)
  const [isDropdownNotSelected, setIsDropdownNotSelected] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleOptionSelect = useCallback(
    (value: string | number) => (event: React.MouseEvent<HTMLLIElement>) => {
      setSelectedValue(value)
      setIsOpen(false)
      setIsDropdownNotSelected(false)
      if (onValueChange) {
        onValueChange(value)
      }
    },
    [onValueChange]
  )

  const handleToggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  // Attach click event listener to handle outside clicks
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const hoverStyle = ' hover:bg-interface-hover '
  const activeStyle = isOpen && ' !bg-accent1-500 !text-white'

  const generatePadding = useMemo(
    () =>
      (
        sizes: string[]
      ): {
        padding: string
        caretSize: string
        maxWidth: string
      } => {
        let padding = ''
        let maxWidth = ''
        let caretSize = ''
        if (!sizes) {
          return { padding: 'px-2 py-1 md:px-3 md:py-2 lg:py-3 lg:px-3', caretSize: 'w-6 h-6', maxWidth: '' }
        }
        sizes.forEach((size: string, index: number) => {
          switch (size) {
            case 's':
              padding += ` px-4 py-2`
              maxWidth += ` max-w-[6rem]`
              caretSize += ` w-3 h-3`
              break
            case 'm':
              padding += ` md:px-6 md:py-2`
              maxWidth += ` md:max-w-[11rem]`
              caretSize += ` md:w-6 md:h-6`
              break
            case 'l':
              padding += ` lg:px-6 lg:py-3`
              maxWidth += ` lg:max-w-[20rem]`
              caretSize += ` lg:w-6 lg:h-6`
              break
            default:
              padding = 'px-2 py-1 md:px-3 md:py-2 lg:py-3 lg:px-3 '
              caretSize = 'w-6 h-6'
              break
          }
        })
        return { padding: padding, caretSize: caretSize, maxWidth: maxWidth }
      },
    []
  )

  const color = useMemo(() => {
    if (isDropdownNotSelected) {
      return 'bg-bg-dark text-text-secondary'
    } else {
      return 'bg-accent1-500 !text-white'
    }
  }, [isDropdownNotSelected])

  const { padding, caretSize, maxWidth } = generatePadding(sizes!)

  return (
    <div ref={dropdownRef} className={`dropdown relative flex w-full justify-end ${maxWidth}`}>
      <button
        className={`drowpdown-button w-full rounded-lg border-none ${color} ${padding} ${hoverStyle} ${activeStyle}`}
        onClick={handleToggleMenu}
      >
        <div className={`inline-flex w-full min-w-fit items-center justify-between gap-2.5 whitespace-nowrap rounded-md hover:shadow-sm`}>
          {selectedValue}
          <CaretUpIcon
            className={`pointer-events-none transform transition-all ${caretSize} ${isOpen ? 'rotate-180 ' : ''}`}
            color={isOpen ? 'white' : isDropdownNotSelected ? 'black' : 'white'}
          />
        </div>
      </button>
      {isOpen && (
        <ul className="absolute top-full left-0 z-10 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              className="flex cursor-pointer list-none items-center gap-2 whitespace-nowrap px-4 py-2 hover:bg-gray-100"
              onClick={handleOptionSelect(option.value)}
            >
              {icon && icon}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
