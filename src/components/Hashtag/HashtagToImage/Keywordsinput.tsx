import React, { useCallback } from 'react'

import { useHashtagToImage } from '@hooks/useHashtagToImage'
import { useTranslation } from 'next-i18next'

const MAX_TEXT_LENGTH = 200

const Step1 = () => {
  const { addKeywords, keywords } = useHashtagToImage()
  const { t } = useTranslation('common')

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    addKeywords(e.target.value)
  }, [])

  // useEffect(() => {
  //   if (typeof window === 'undefined') return
  //   const currentUrl = window.location.href
  //   const urlParams = new URLSearchParams(new URL(currentUrl).search)
  //   const hashtags = urlParams.get('hashtags')?.split(',')
  //   // Each hashtag remove leading space
  //   const trimmedHashtags = hashtags?.map((tag: string) => tag.trim().replace(/^_/, '#'))
  //   const hashtag = trimmedHashtags ? trimmedHashtags.join(', ') : null
  // }, [])

  return (
    <>
      <h2 className="">{t('hashtags-to-image.keywords_input')}</h2>
      <h3 className="text-neutral-500">{t('hashtags-to-image.keywords_describe')}</h3>
      <textarea
        className="max-h-20 w-full rounded-md border border-neutral-300 px-4 py-3 focus:border-accent1-500 focus:ring-accent1-500"
        placeholder={t('hashtags-to-image.keywords_textarea_placeholder')}
        value={keywords}
        onChange={handleTextChange}
        maxLength={MAX_TEXT_LENGTH}
      />
      <div>
        {keywords.length} / {MAX_TEXT_LENGTH}
      </div>
    </>
  )
}

export default React.memo(Step1)
