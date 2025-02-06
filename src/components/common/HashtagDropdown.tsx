import React, { useEffect } from 'react'
import Dropdown from '@components/Form/Dropdown/Dropdown'
import { CONFIDENCE_LEVELS } from '@constants/imageStyle'
import { IHashet } from 'pages/recommendation'

export interface Option {
  label: string
  value: string
  checked: boolean
}

export interface CategoryOption {
  name: string
  options: Option[]
}

interface HashtagDropdownProps {
  hashtags: IHashet[]
  onHashtagSelect: (value: string | number) => void
  categorizedOptions: CategoryOption[]
  setCategorizedOptions: (options: CategoryOption[]) => void
}

const HashtagDropdown: React.FC<HashtagDropdownProps> = ({ hashtags, onHashtagSelect, categorizedOptions, setCategorizedOptions }) => {
  useEffect(() => {
    if (!hashtags) return

    const categorizeHashtags = (hashtags: IHashet[], confidenceLevel: { filter: (h: IHashet) => boolean }) =>
      hashtags.filter(confidenceLevel.filter).map((hashtag) => ({
        label: hashtag.hashtag,
        value: hashtag.hashtag,
        checked: false,
      }))

    const categorized = Object.entries(CONFIDENCE_LEVELS)
      .map(([, level]) => ({
        name: level.name,
        options: categorizeHashtags(hashtags, {
          filter: (h) => {
            if (level.threshold) return h.acc > level.threshold
            if (level.thresholdLow && level.thresholdHigh) return h.acc > level.thresholdLow && h.acc <= level.thresholdHigh
            return false
          },
        }),
      }))
      .filter((category) => category.options.length > 0)

    setCategorizedOptions(categorized)
  }, [hashtags])

  return (
    <>
      {categorizedOptions.map((option) => (
        <div key={`${option.name}-dropdown`} className="my-4">
          <Dropdown dropDownSizes={['l', 'l', 'l']} name={option.name} options={option.options} onValueChange={onHashtagSelect} isCheckbox />
        </div>
      ))}
    </>
  )
}

export default HashtagDropdown
