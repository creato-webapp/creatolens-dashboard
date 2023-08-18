import React, { useState, useCallback } from 'react'
import Card from '@components/Card'
import Dropdown from '@components/Form/Dropdown'
import { Button } from '@components/Button'
import Title from '@components/Typography/Title'

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
    console.log(slicedHashtags)
    const copiedHashtags = slicedHashtags.map((tag) => tag.hashtag).join(' ')
    await navigator.clipboard.writeText(copiedHashtags)
    window.alert('Copied to clipboard!')
  }, [slicedHashtags])

  const DropdownOptions = [
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
      title={
        <div className="flex flex-wrap gap-2">
          <Title level={1} className="text-orange-500">{`≥${selectedAccuracy}% `}</Title>Related Hashtag
        </div>
      }
      className="min-w-96 w-1/2 justify-start gap-6 bg-neutral-50 px-6 py-9 shadow"
      extra={
        <Dropdown
          name="numberOfHashes"
          options={DropdownOptions}
          defaultValue={selectedAccuracy}
          onValueChange={(value) => setSelectedAccuracy(value as number)}
        ></Dropdown>
      }
    >
      <div className="h-80 font-bold leading-loose text-slate-600">
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
