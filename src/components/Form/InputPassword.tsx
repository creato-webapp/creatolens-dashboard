import React, { useState, useCallback } from 'react'
import BaseInput, { IBaseInputProps } from './BaseInput'
import EyeIcon from '@components/Icon/EyeIcon'
import EyeOffIcon from '@components/Icon/EyeOffIcon'
interface IInputPasswordProps extends IBaseInputProps {
  showToggle?: boolean
}

const InputPassword: React.FC<IInputPasswordProps> = ({ showToggle = true, ...props }) => {
  const { id, placeholder, defaultValue, customFormItemProps } = props
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }, [])

  return (
    <BaseInput
      {...props}
      type={showPassword ? 'text' : 'password'}
      name={id}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={props.disabled}
      customFormItemProps={customFormItemProps}
    >
      <button type="button" onClick={() => toggleShowPassword()} className="p-2 first-letter:text-gray-500 hover:text-gray-700">
        {showPassword ? <EyeIcon className="pointer-events-auto h-5 w-5" /> : <EyeOffIcon className="pointer-events-auto h-5 w-5" />}
      </button>
    </BaseInput>
  )
}

export default InputPassword
