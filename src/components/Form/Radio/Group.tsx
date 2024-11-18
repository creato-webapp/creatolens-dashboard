import React, { HTMLAttributes } from 'react'

import { Radio } from './Radio'
interface Option {
  value: string
  label: string
}

interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string
  options: Option[]
  onValueChange?: (value: string) => void
  selectedValue: string
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ selectedValue, options, onValueChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange && onValueChange(event.target.value)
  }

  return (
    <div className="flex flex-row flex-wrap">
      {options.map((option) => (
        <Radio key={option.value} value={option.value} checked={option.value === selectedValue} label={option.label} onChange={handleChange} />
      ))}
    </div>
  )
}
