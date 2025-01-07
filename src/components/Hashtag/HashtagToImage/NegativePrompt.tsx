import React, { useState } from 'react'

import { useTranslation } from 'next-i18next'
import { useHashtagToImage } from '@hooks/useHashtagToImage'
import { Badge } from '@components/ui/Badge'
import CrossIcon from '@components/Icon/CrossIcon'
import { Input } from '@components/ui/Input'
import SubtleButton from '@components/Button/Subtle'

const MAX_TEXT_LENGTH = 200

const NegativePrompt = () => {
  const { negativeKeywords, addNegativeKeywords, removeNegativeKeyword, isLoading } = useHashtagToImage()
  const [inputText, setInputText] = useState<string>('')

  const { t } = useTranslation('hashtag')

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleAddNegativeKeywords = () => {
    if (inputText.trim() !== '') {
      addNegativeKeywords(inputText)
      setInputText('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault() // Prevent form submission if inside a form
      handleAddNegativeKeywords()
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

      <div className="flex flex-row items-center justify-start gap-4">
        <div className="w-full xl:w-1/2">
          <Input
            disabled={isLoading}
            className="w-full"
            placeholder={t('negative_prompt_textarea_placeholder')}
            value={inputText}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown} // Add this line to handle the Enter key
            maxLength={MAX_TEXT_LENGTH}
          />
        </div>
        <SubtleButton sizes={['s', 's', 's']} onClick={handleAddNegativeKeywords}>
          Add
        </SubtleButton>
      </div>
    </div>
  )
}

export default React.memo(NegativePrompt)
