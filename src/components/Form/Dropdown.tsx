import React, { useEffect, useState, useRef } from 'react'
import { Button } from '../Button'
import { CaretDownIcon, CaretUpIcon } from '@components/Icon'

interface DropdownOption {
  label: string
  value: string
}

interface DropdownProps {
  name?: string
  options: DropdownOption[]
  defaultValue?: string
  disabled?: boolean // Add the disabled prop
  onChange?: (value: string) => void // Add the onChange prop
}

const Dropdown: React.FC<DropdownProps> = ({ name = '', options, defaultValue, disabled, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || name)
  const [isOpen, setIsOpen] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleOptionSelect = (value: string) => {
    setSelectedValue(value)
    setIsOpen(false)
    if (onChange) {
      onChange(value)
    }
  }

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
    <div ref={dropdownRef} className="dropdown relative">
      <Button.Primary loading={false} onClick={handleToggleMenu} disabled={disabled}>
        {' '}
        {/* Add disabled prop to Button */}
        {selectedValue}
        {isOpen ? <CaretUpIcon /> : <CaretDownIcon />}
      </Button.Primary>
      {isOpen && (
        <ul className="absolute top-full left-0 z-10 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <li key={option.value} className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionSelect(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown