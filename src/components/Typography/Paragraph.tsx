import React, { createElement } from 'react'

import { fontWeights } from './index'
interface ParagraphProps extends React.HTMLAttributes<HTMLElement>, fontWeights {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  bold?: boolean
  italic?: boolean
  children?: React.ReactNode
  font?: string
}

const Paragraph: React.FC<ParagraphProps> = ({ italic, children, ...restProps }) => {
  const { extraLight, light, regular, medium, className, font } = restProps
  let fontWeights = ''
  if (extraLight) fontWeights = 'font-[275]'
  if (light) fontWeights = 'font-[300]'
  if (regular) fontWeights = 'font-[400]'
  if (medium) fontWeights = 'font-[600]'

  const paragraphStyles = `${italic ? 'italic' : ''} ${className} ${fontWeights}`

  return createElement(
    font || 'p',
    {
      className: `${paragraphStyles}`,
      restprops: restProps,
    },
    children
  )
}

export default Paragraph
