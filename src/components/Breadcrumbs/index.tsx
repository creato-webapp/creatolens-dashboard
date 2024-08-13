import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname()
  const segments = pathname?.split('/').filter((segment) => segment !== '') || []

  return (
    <nav className="flex flex-wrap items-center justify-center text-gray-500">
      {segments.map((segment, index) => (
        <>
          <Link href={`/${segment}`} className="capitalize text-text-primary hover:text-text-secondary">
            {segments}
          </Link>
          {index < segments.length - 1 && <span className="mx-2">/</span>}
        </>
      ))}
    </nav>
  )
}

export default Breadcrumbs
