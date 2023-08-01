import React, { ChangeEvent, InputHTMLAttributes } from 'react'

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string
  checked?: boolean
  label?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export const Radio: React.FC<RadioProps> = ({ value, checked, label, onChange, className }) => {
  return (
    <label className="radio-label mx-2 flex flex-row items-center text-text-primary">
      <input
        className={`form-radio mx-2 text-orange-500 focus:ring-2 focus:ring-orange-500 ${className}`}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  )
}
