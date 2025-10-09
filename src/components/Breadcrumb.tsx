import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import CaretLeftIcon from './Icon/CaretLeftIcon'

interface BreadcrumbProps {
  lastItemName?: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ lastItemName }) => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const pathnames = router.asPath.split('/').filter((x) => x)

  const translatePath = (value: string) => {
    // Translation map for common paths
    const pathTranslations: Record<string, string> = {
      features: t('features'),
      blog: t('blog'),
      hashtag: t('hashtag'),
      hashtags: t('hashtags'),
      history: t('history'),
      'contact-us': t('contact_us'),
      faqs: t('faqs'),
      category: t('category'),
    }

    const decodedValue = decodeURIComponent(value)
    return pathTranslations[decodedValue.toLowerCase()] || decodedValue.charAt(0).toUpperCase() + decodedValue.slice(1)
  }

  return (
    <nav aria-label="breadcrumb" className="my-4">
      <ol className="flex flex-wrap items-center space-x-2 text-base text-neutral-700">
        <li>
          <button onClick={() => router.back()} className="mr-2 flex items-center gap-2 hover:underline">
            <CaretLeftIcon size={16} />
            {t('back')}
          </button>
        </li>

        <div className="flex flex-row px-4">
          <li className="breadcrumb-item">
            <Link href="/" className="hover:underline">
              {t('home')}
            </Link>
          </li>

          {pathnames.map((value, index) => {
            const href = `/${pathnames.slice(0, index + 1).join('/')}`
            const isLast = index === pathnames.length - 1

            return (
              <li key={index} className="flex items-center">
                <span className="mx-2">/</span>
                {isLast ? (
                  <span className="text-neutral-700 underline">{lastItemName ? lastItemName : translatePath(value)}</span>
                ) : (
                  <Link href={href} className="">
                    {translatePath(value)}
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
