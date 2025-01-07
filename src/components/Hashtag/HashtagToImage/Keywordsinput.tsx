import React, { useState } from 'react'

import { useHashtagToImage } from '@hooks/useHashtagToImage'
import { useTranslation } from 'next-i18next'
import { Badge } from '@components/ui/Badge'
import CrossIcon from '@components/Icon/CrossIcon'
import { Input } from '@components/ui/Input'
import SubtleButton from '@components/Button/Subtle'

const MAX_TEXT_LENGTH = 200

const Keywordsinput = () => {
  const { addKeywords, keywords, removeKeywords, isLoading } = useHashtagToImage()
  const [inputText, setInputText] = useState<string>('')
  const { t } = useTranslation('hashtag')

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Split the text when double spaces are detected
    if (value.includes('  ')) {
      const words = value.split('  ') // Split on double spaces
      const lastWord = words[0].trim() // Get the word before the double spaces

      if (lastWord) {
        addKeywords(value) // Update the input value normally
        setInputText('')
      }
    } else {
      setInputText(value)
    }
  }

  const handleAddKeywords = () => {
    if (inputText.trim() !== '') {
      addKeywords(inputText)
      setInputText('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault() // Prevent form submission if inside a form
      handleAddKeywords()
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="">{t('keywords_input')}</h2>
      <h3 className="text-neutral-500">{t('keywords_describe')}</h3>

      <div className="flex w-full flex-row flex-wrap items-start gap-4">
        {keywords.length > 0 &&
          keywords.map((label) => (
            <Badge key={label} className="flex flex-row gap-2 text-base leading-4" variant={'destructive'}>
              {label}
              <div onClick={() => removeKeywords(label)} className="cursor-pointer">
                <CrossIcon size={16} />
              </div>
            </Badge>
          ))}
      </div>

      <div className="flex flex-row items-center justify-start gap-4">
        <div className="w-full md:w-1/2">
          <Input
            disabled={isLoading}
            className="w-full"
            placeholder={t('keywords_textarea_placeholder')}
            value={inputText}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown} // Add this line to handle the Enter key
            maxLength={MAX_TEXT_LENGTH}
          ></Input>
        </div>
        <SubtleButton sizes={['s', 's', 's']} onClick={handleAddKeywords}>
          Add
        </SubtleButton>
      </div>
    </div>
  )
}

export default React.memo(Keywordsinput)
