import React from 'react'

import { ButtonProps } from './interface'
import Outline from './Outline'
import Primary from './Primary'

const DEFAULT_CLASS_NAME = 'rounded-full shrink-0 grow-0 md:px-2 px-1'
interface IconButtonProps extends ButtonProps {
  outline?: boolean
}

const IconButton: React.FC<IconButtonProps> = ({ outline, className, ...props }) => {
  if (outline) {
    return <Outline {...props} className={`${DEFAULT_CLASS_NAME} ${className}`} />
  }

  return <Primary {...props} className={`${DEFAULT_CLASS_NAME} ${className}`} />
}

export default IconButton
