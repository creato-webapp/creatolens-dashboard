import React from 'react'

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
  style?: React.CSSProperties
  light?: boolean
  bold?: boolean
  extraBold?: boolean
  italic?: boolean
  children?: string
}

const Title: React.FC<TitleProps> = ({
  level,
  style,
  light,
  bold,
  extraBold,
  italic,
  children,
}) => {
  let size = ''
  if (level === 1) {
    size = 'text-4xl'
  } else if (level === 2) {
    size = 'text-3xl'
  } else if (level === 3) {
    size = 'text-xl'
  } else if (level === 4) {
    size = 'text-lg'
  } else if (level === 5) {
    size = 'text-sm'
  } else if (level === 6) {
    size = 'text-xs'
  }

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  const headingStyles = `${size} ${bold && 'font-bold'} ${light && 'font-light'}
  ${extraBold ? 'font-extrabold' : ''} ${italic ? 'italic' : ''}`
  return (
    <HeadingTag className={headingStyles} style={style}>
      {children}
    </HeadingTag>
  )
}

export default Title
