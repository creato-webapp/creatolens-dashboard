import React from 'react'

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  bold?: boolean
  italic?: boolean
  children?: React.ReactNode
}

const Paragraph: React.FC<ParagraphProps> = ({
  size = 'md',
  bold,
  italic,
  children,
  ...restProps
}) => {
  const paragraphStyles = `text-${size} ${bold ? 'font-bold' : ''} ${
    italic ? 'italic' : ''
  }`

  return (
    <p className={paragraphStyles} {...restProps}>
      {children}
    </p>
  )
}

export default Paragraph
