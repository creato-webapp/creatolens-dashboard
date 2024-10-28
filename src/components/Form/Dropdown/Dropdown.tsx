import React, { HTMLProps, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import DropdownContent from './DropdownContent'
import DropdownButton from './DropdownButton'

export interface DropdownOption {
  label: string
  value: string | number
  checked?: boolean
}

export type DropdownSize = 's' | 'm' | 'l' | 'full'

interface DropdownProps extends HTMLProps<HTMLSelectElement> {
  name?: string
  options: DropdownOption[]
  defaultValue?: string | number
  disabled?: boolean
  onValueChange?: (value: string | number) => void
  dropDownSizes?: [DropdownSize, DropdownSize, DropdownSize]
  selectedValue?: string
  setSelectedValue?: (arg: string | number) => void
  isCheckbox?: boolean
  extraElement?: React.ReactNode
  isFloating?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({ name, options, onValueChange, dropDownSizes, isCheckbox = false, extraElement, isFloating = false }) => {
  const [selectedValue, setSelectedValue] = useState<string | number>(name || '')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const mapSelectedValueToOptions = useMemo(() => {
    if (isCheckbox) return name
    const selectedOption = options.find((option) => option.value === selectedValue)
    return selectedOption ? selectedOption.label : selectedValue
  }, [isCheckbox, name, options, selectedValue])

  const handleOptionSelect = useCallback(
    (value: string | number) => () => {
      if (!setSelectedValue) {
        return
      }
      setSelectedValue(value)
      if (onValueChange) {
        onValueChange(value)
      }
    },
    [setSelectedValue, onValueChange] // Add missing dependencies
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

  return (
    <div ref={dropdownRef} className={`dropdown relative h-full w-full justify-end ${props.className}`}>
      <DropdownButton
        name={mapSelectedValueToOptions as string}
        isDropdownNotSelected={false}
        isOpen={isOpen}
        handleToggleMenu={handleToggleMenu}
        dropDownSizes={dropDownSizes}
      />
      <DropdownContent
        handleOptionSelect={handleOptionSelect}
        options={options}
        isOpen={isOpen}
        isCheckbox={isCheckbox}
        extraElement={extraElement}
        isFloating={isFloating}
      />
    </div>
  )
}

export default Dropdown
