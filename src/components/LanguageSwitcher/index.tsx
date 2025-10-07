import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const LanguageSwitcher: React.FC = () => {
  const router = useRouter()
  const { pathname, asPath, query, locale } = router
  const [isOpen, setIsOpen] = useState(false)

  const changeLanguage = (newLocale: string) => {
    router.push({ pathname, query }, asPath, { locale: newLocale })
    setIsOpen(false)
  }

  const languages = {
    en: 'English',
    'zh-HK': '繁體中文',
  }

  const currentLanguage = languages[locale as keyof typeof languages] || languages.en

  return (
    <div className="relative cursor-pointer" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <div className="flex items-center gap-1 rounded-lg p-2 hover:bg-neutral-200">
        <span className="text-sm font-medium text-neutral-800">{currentLanguage}</span>
        <ChevronDownIcon className="h-4 w-4 text-neutral-800" />
      </div>
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 flex w-40 flex-col rounded-md border bg-white shadow-lg">
          <button
            onClick={() => changeLanguage('en')}
            className={`px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 ${
              locale === 'en' ? 'font-bold text-primary-500' : 'text-neutral-800'
            }`}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('zh-HK')}
            className={`px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 ${
              locale === 'zh-HK' ? 'font-bold text-primary-500' : 'text-neutral-800'
            }`}
          >
            繁體中文
          </button>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
