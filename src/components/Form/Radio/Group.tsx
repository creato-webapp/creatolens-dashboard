import React, { useState, HTMLAttributes } from 'react'
import { Radio } from './Radio'
interface Option {
  value: string
  label: string
}

interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string
  options: Option[]
  onValueChange: (value: string) => void
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ defaultValue, options, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
    onValueChange(event.target.value)
  }

  return (
    <div className="flex flex-row flex-wrap">
      {options.map((option) => (
        <Radio key={option.value} value={option.value} checked={option.value === selectedValue} label={option.label} onChange={handleChange} />
      ))}
    </div>
  )
}
