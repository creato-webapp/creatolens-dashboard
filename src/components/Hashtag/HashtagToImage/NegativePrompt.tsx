import React, { useState } from 'react'

import { useTranslation } from 'next-i18next'
import { useHashtagToImage } from '@hooks/useHashtagToImage'
import { Textarea } from '@components/ui/Textarea'
import { Badge } from '@components/ui/Badge'
import CrossIcon from '@components/Icon/CrossIcon'

const MAX_TEXT_LENGTH = 200

const NegativePrompt = () => {
  const { negativeKeywords, addNegativeKeywords, removeNegativeKeyword, isLoading } = useHashtagToImage()
  const [inputText, setInputText] = useState<string>('')

  const { t } = useTranslation('hashtag')

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value

    // Split the text when double spaces are detected
    if (value.includes('  ')) {
      const words = value.split('  ') // Split on double spaces
      const lastWord = words[0].trim() // Get the word before the double spaces

      if (lastWord) {
        addNegativeKeywords(value) // Update the input value normally
        setInputText('')
      }
    } else {
      setInputText(value)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="">{t('negative_prompt')}</div>
      <div className="flex w-full flex-row flex-wrap items-start gap-4">
        {negativeKeywords.length > 0 &&
          negativeKeywords.map((keyword) => (
            <Badge key={keyword} className="flex flex-row gap-2 text-base leading-4" variant={'destructive'}>
              {keyword}
              <div onClick={() => removeNegativeKeyword(keyword)} className="cursor-pointer">
                <CrossIcon size={16} />
              </div>
            </Badge>
          ))}
      </div>
      <Textarea
        disabled={isLoading}
        className="max-h-20 w-full rounded-md border border-neutral-300 px-4 py-3  focus:border-primary-500 focus:ring-0 focus-visible:border-primary-500 focus-visible:ring-0 focus-visible:ring-offset-0 "
        placeholder={t('negative_prompt_textarea_placeholder')}
        value={inputText}
        onChange={handleTextChange}
        maxLength={MAX_TEXT_LENGTH}
      />
    </div>
  )
}

export default React.memo(NegativePrompt)
