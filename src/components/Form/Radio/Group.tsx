import React, { useEffect, useState, useRef } from 'react'
import { Radio } from './Radio'
interface Option {
  value: string
  label: string
}

// Define the props for the RadioGroup component
interface RadioGroupProps {
  defaultValue: string
  options: Option[]
  onChange: (value: string) => void
}

// RadioGroup component
export const RadioGroup: React.FC<RadioGroupProps> = ({ defaultValue, options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
    onChange(event.target.value)
  }

  return (
    <div className="flex flex-row flex-wrap">
      {options.map((option) => (
        <Radio key={option.value} value={option.value} checked={option.value === selectedValue} label={option.label} onChange={handleChange} />
      ))}
    </div>
  )
}
