import React from 'react'
import Primary from './PrimaryButton'
import Outline from './OutlineButton'

interface ButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  outline?: boolean
  styleClassName?: string
}

const IconButton: React.FC<ButtonProps> = (props) => {
  const { outline, styleClassName } = props
  const noFillStyle = styleClassName + ' rounded-[100%] shrink-0 grow-0 md:px-2 px-1'
  if (outline) {
    return <Outline {...props} styleClassName={noFillStyle} />
  }

  return <Primary {...props} styleClassName={noFillStyle} />
}

export default IconButton
