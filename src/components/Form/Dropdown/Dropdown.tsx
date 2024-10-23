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
}

const Dropdown: React.FC<DropdownProps> = ({ name, options, onValueChange, dropDownSizes }) => {
  const [selectedValue, setSelectedValue] = useState<string | number>(name || '')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const mapSelectedValueToOptions = useMemo(() => {
    const selectedOption = options.find((option) => option.value === selectedValue)
    return selectedOption ? selectedOption.label : selectedValue
  }, [selectedValue, options])

  const handleOptionSelect = useCallback(
    (value: string | number) => () => {
      if (!setSelectedValue) {
        return
      }
      setSelectedValue(value)

      setIsOpen(false)
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

  return (
    <div ref={dropdownRef} className={`dropdown relative h-full w-full justify-end `}>
      <DropdownButton
        name={mapSelectedValueToOptions as string}
        isDropdownNotSelected={false}
        isOpen={isOpen}
        handleToggleMenu={handleToggleMenu}
        dropDownSizes={dropDownSizes}
      />
      <DropdownContent handleOptionSelect={handleOptionSelect} options={options} isOpen={isOpen} />
    </div>
  )
}

export default Dropdown
