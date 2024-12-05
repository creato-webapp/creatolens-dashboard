import React, { useCallback } from 'react'

import { useTranslation } from 'next-i18next'
import { useHashtagToImage } from '@hooks/useHashtagToImage'

const MAX_TEXT_LENGTH = 200

const NegativePrompt = () => {
  const { negativePrompt, setNegativePrompt } = useHashtagToImage()
  const { t } = useTranslation('common')

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNegativePrompt(e.target.value)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <div className="">{t('hashtags-to-image.negative_prompt')}</div>
      <textarea
        className="max-h-20 w-full rounded-md border border-neutral-300 px-4 py-3 focus:border-accent1-500 focus:ring-accent1-500"
        placeholder={t('hashtags-to-image.negative_prompt_textarea_placeholder')}
        value={negativePrompt}
        onChange={handleTextChange}
        maxLength={MAX_TEXT_LENGTH}
      />
      <div>
        {negativePrompt.length} / {MAX_TEXT_LENGTH}
      </div>
    </div>
  )
}

export default React.memo(NegativePrompt)
