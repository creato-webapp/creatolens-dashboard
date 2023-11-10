import React from 'react'
import { fontWeights } from './index'
interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement>, fontWeights {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  bold?: boolean
  italic?: boolean
  children?: React.ReactNode
}

const Paragraph: React.FC<ParagraphProps> = ({ size = 'md', italic, children, ...restProps }) => {
  const { extraLight, light, regular, medium, className } = restProps
  let fontWeights = ''
  if (extraLight) fontWeights = 'font-[275]'
  if (light) fontWeights = 'font-[300]'
  if (regular) fontWeights = 'font-[400]'
  if (medium) fontWeights = 'font-[600]'
  const paragraphStyles = `text-sm ${fontWeights} ${italic ? 'italic' : ''} ${className}`

  return (
    <p className={paragraphStyles} {...restProps}>
      {children}
    </p>
  )
}

export default Paragraph
