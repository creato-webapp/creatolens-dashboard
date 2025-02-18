import React, { useCallback, useState } from 'react'

import { Button } from '@components/Button'
import Card from '@components/Card'
import Dropdown from '@components/Form/Dropdown/Dropdown'

interface Hashtag {
  acc: number
  hashtag: string
}

interface Props {
  hashtags: Hashtag[]
}

const TopAccHashtagCard: React.FC<Props> = ({ hashtags }) => {
  const [selectedAccuracy, setSelectedAccuracy] = useState<number>(95)
  const filterHashtags = useCallback(() => {
    let filteredHashtags = hashtags

    if (selectedAccuracy) {
      filteredHashtags = hashtags.filter((tag) => tag.acc * 100 >= selectedAccuracy)
    }

    return filteredHashtags
  }, [hashtags, selectedAccuracy])

  const slicedHashtags = filterHashtags()

  const copyToClipboard = useCallback(async () => {
    const copiedHashtags = slicedHashtags.map((tag) => tag.hashtag).join(' ')
    await navigator.clipboard.writeText(copiedHashtags)
    window.alert('Copied to clipboard!')
  }, [slicedHashtags])

  const dropdownOptions = [
    {
      label: '≥ 95%',
      value: 95,
    },
    {
      label: '≥ 90%',
      value: 90,
    },
    {
      label: '≥ 85%',
      value: 85,
    },
    {
      label: '≥ 80%',
      value: 80,
    },
  ]

  return (
    <Card
      customTitle={
        <h1 className="flex items-center gap-2 font-extrabold tracking-tighter">
          <span className="text-accent1-500">{`≥${selectedAccuracy}% `}</span>
          <span className="text-text-primary">Related</span>
        </h1>
      }
      className="w-full whitespace-normal !rounded-none py-4 md:h-auto"
      isDropdown={true}
      extra={
        <Dropdown
          options={dropdownOptions}
          onValueChange={(value) => setSelectedAccuracy(value as number)}
          dropDownSizes={['m', 'm', 'm']}
          isFloating={true}
          buttonClassName="justify-end w-full items-end "
        ></Dropdown>
      }
    >
      <hr></hr>
      <div className="h-full font-bold leading-loose text-slate-600">
        {slicedHashtags.map((tag) => (
          <span key={tag.hashtag}>{tag.hashtag} </span>
        ))}
      </div>
      <div className="flex justify-center">
        <Button.Primary onClick={copyToClipboard}>Copy</Button.Primary>
      </div>
    </Card>
  )
}

export default TopAccHashtagCard
