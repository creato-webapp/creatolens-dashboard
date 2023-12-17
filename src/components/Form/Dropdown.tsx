import React, { useEffect, useState, useRef, HTMLProps, useCallback } from 'react'
import { Button } from '../Button'
import { CaretDownIcon, CaretUpIcon } from '@components/Icon'

export interface DropdownOption {
  label: string
  value: string | number
}

interface DropdownProps extends HTMLProps<HTMLSelectElement> {
  name?: string
  options: DropdownOption[]
  defaultValue?: string | number
  disabled?: boolean // Add the disabled prop
  onValueChange?: (value: string | number) => void // Add the onChange prop
}

const Dropdown: React.FC<DropdownProps> = ({ name = '', options, defaultValue, disabled, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || name)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleOptionSelect = useCallback(
    (value: string | number) => {
      setSelectedValue(value)
      setIsOpen(false)
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

  return (
    <div ref={dropdownRef} className="dropdown relative w-full">
      <Button.DropdownButton sizes={['l', 'l', 'l']} isOpened={isOpen} loading={false} onClick={() => handleToggleMenu()} disabled={disabled}>
        {selectedValue}
        {isOpen ? <CaretUpIcon className="pointer-events-none" /> : <CaretDownIcon className="pointer-events-none" color="black" />}
      </Button.DropdownButton>
      {isOpen && (
        <ul className="absolute top-full left-0 z-10 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              className="cursor-pointer list-none whitespace-nowrap px-4 py-2 hover:bg-gray-100"
              onClick={() => handleOptionSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
