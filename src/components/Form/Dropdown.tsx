import React, { HTMLProps, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { CaretUpIcon } from '@components/Icon'

export interface DropdownOption {
  label: string
  value: string | number
}

type DropdownSize = 's' | 'm' | 'l' | 'full'
interface DropdownProps extends HTMLProps<HTMLSelectElement> {
  name?: string
  options: DropdownOption[]
  defaultValue?: string | number
  disabled?: boolean
  onValueChange?: (value: string | number) => void
  dropDownSizes?: [DropdownSize, DropdownSize, DropdownSize]
  icon?: React.ReactNode
}

const Dropdown: React.FC<DropdownProps> = ({ name = '', options, defaultValue, onValueChange, dropDownSizes, icon }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || name)
  const [isDropdownNotSelected, setIsDropdownNotSelected] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const mapSelectedValueToOptions = useMemo(() => {
    const selectedOption = options.find((option) => option.value === selectedValue)
    return selectedOption ? selectedOption.label : selectedValue
  }, [selectedValue, options])

  const handleOptionSelect = useCallback(
    (value: string | number) => () => {
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
    setIsOpen((prev) => !prev)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const hoverStyle = ' hover:bg-interface-hover '
  const activeStyle = isOpen && ' !bg-accent1-500 !text-white'
  const focusStyle = !isOpen && ' focus:ring-2 focus:ring-stroke focus:ring-opacity-50'

  const generatePadding = useCallback((dropDownSizes?: DropdownSize[]): { padding: string; caretSize: string; maxWidth: string } => {
    let padding = ''
    let maxWidth = ''
    let caretSize = ''
    if (!dropDownSizes) {
      return { padding: 'px-2 py-1 md:px-3 md:py-2 lg:py-3 lg:px-3', caretSize: 'w-6 h-6', maxWidth: '' }
    }
    dropDownSizes.forEach((size: string, index: number) => {
      const breakpoint = index === 0 ? '' : index === 1 ? 'md:' : 'lg:'

      switch (size) {
        case 's':
          padding += ` ${breakpoint}px-4 ${breakpoint}py-2`
          maxWidth += ` ${breakpoint}max-w-[6rem]`
          caretSize += ` ${breakpoint}w-3 ${breakpoint}h-3`
          break
        case 'm':
          padding += ` ${breakpoint}px-4 ${breakpoint}py-2`
          maxWidth += ` ${breakpoint}max-w-[11rem]`
          caretSize += ` ${breakpoint}w-6 ${breakpoint}h-6`
          break
        case 'l':
          padding += ` ${breakpoint}px-6 ${breakpoint}py-3`
          maxWidth += ` ${breakpoint}max-w-[20rem]`
          caretSize += ` ${breakpoint}w-6 ${breakpoint}h-6`
          break

        case 'full':
          padding += ` ${breakpoint}px-6 ${breakpoint}py-3`
          caretSize += ` ${breakpoint}w-6 ${breakpoint}h-6`
          break

        default:
          padding = 'px-2 py-1 md:px-3 md:py-2 lg:py-3 lg:px-3'
          caretSize = 'w-6 h-6'
          break
      }
    })
    return { padding, caretSize, maxWidth }
  }, [])

  const color = useMemo(() => {
    if (isDropdownNotSelected) {
      return 'bg-bg-dark text-text-secondary'
    } else {
      return 'bg-accent1-500 !text-white'
    }
  }, [isDropdownNotSelected])

  const { padding, caretSize, maxWidth } = generatePadding(dropDownSizes)
  return (
    <div ref={dropdownRef} className={`dropdown relative h-full w-full justify-end  ${maxWidth}`}>
      <button
        className={`drowpdown-button w-full rounded-lg border-none ${color} ${padding} ${focusStyle} ${hoverStyle} ${activeStyle}`}
        onClick={handleToggleMenu}
      >
        <div className={`inline-flex w-full items-center justify-between gap-2.5 rounded-md text-md`}>
          <div className="truncate ">{mapSelectedValueToOptions}</div>
          <CaretUpIcon
            className={`pointer-events-none w-fit transform transition-all ${caretSize} ${!isOpen ? 'rotate-180 ' : ''}`}
            color={isOpen ? 'white' : isDropdownNotSelected ? 'black' : 'white'}
          />
        </div>
      </button>
      <div className={`grid ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} transition-all duration-300`}>
        <ul className={`${isOpen ? '' : 'hidden'} z-10 mt-2 w-full overflow-y-scroll rounded-md border border-gray-200 bg-white shadow-lg`}>
          {options.map((option) => (
            <li
              key={option.value}
              className="flex w-full cursor-pointer list-none flex-wrap items-center gap-2  px-4 py-2 hover:bg-gray-100"
              onClick={handleOptionSelect(option.value)}
            >
              {icon && icon}
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Dropdown
