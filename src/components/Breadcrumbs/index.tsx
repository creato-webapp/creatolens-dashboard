import React, { ReactNode, AnchorHTMLAttributes } from 'react'

// Define the interface for the breadcrumb
interface Breadcrumb {
  label: ReactNode
  href?: string
}

// Define the props for the Breadcrumbs component
interface BreadcrumbsProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  breadcrumbs: Breadcrumb[]
}

// Breadcrumbs component
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <nav className="flex flex-wrap items-center justify-center text-gray-500">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          {breadcrumb.href ? (
            <a href={breadcrumb.href} className="text-text-primary hover:text-text-secondary">
              {breadcrumb.label}
            </a>
          ) : (
            <span>{breadcrumb.label}</span>
          )}
          {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumbs
