import React from 'react'
import Link, { LinkProps } from 'next/link'

interface CustomLinkProps extends LinkProps {
  className?: string
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, className, disabled = false, loading = false, children, ...rest }) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <a
        className={`${className} ${disabled || loading ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={(e) => {
          if (disabled || loading) {
            e.preventDefault() // Prevent navigation if disabled or loading
          }
        }}
        {...rest}
      >
        {children}
      </a>
    </Link>
  )
}

export default CustomLink
