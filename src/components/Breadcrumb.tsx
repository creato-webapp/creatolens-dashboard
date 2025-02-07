import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CaretLeftIcon from './Icon/CaretLeftIcon'

interface BreadcrumbProps {
  lastItemName?: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ lastItemName }) => {
  const router = useRouter()
  const pathnames = router.asPath.split('/').filter((x) => x)

  return (
    <nav aria-label="breadcrumb" className="my-4">
      <ol className="flex flex-wrap items-center space-x-2 text-base text-neutral-700">
        <li>
          <button onClick={() => router.back()} className="mr-2 flex items-center gap-2 hover:underline">
            <CaretLeftIcon size={16} />
            {`Back`}
          </button>
        </li>

        <div className="flex flex-row px-4">
          <li className="breadcrumb-item">
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>

          {pathnames.map((value, index) => {
            const href = `/${pathnames.slice(0, index + 1).join('/')}`
            const isLast = index === pathnames.length - 1

            return (
              <li key={index} className="flex items-center">
                <span className="mx-2">/</span>
                {isLast ? (
                  <span className="text-neutral-700 underline">
                    {lastItemName ? lastItemName : decodeURIComponent(value).charAt(0).toUpperCase() + decodeURIComponent(value).slice(1)}
                  </span>
                ) : (
                  <Link href={href} className="">
                    {decodeURIComponent(value).charAt(0).toUpperCase() + decodeURIComponent(value).slice(1)}
                  </Link>
                )}
              </li>
            )
          })}
        </div>
      </ol>
    </nav>
  )
}

export default Breadcrumb
