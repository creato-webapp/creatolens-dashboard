import React, { useState, useCallback, useEffect } from 'react'
import Card from '@components/Card'
import Dropdown from '@components/Form/Dropdown'
import { Button } from '@components/Button'
import { Paragraph, Title } from '@components/Typography'
import Checkbox from '@components/Form/Checkbox'

interface Hashtag {
  acc: number
  hashtag: string
}

interface Props {
  hashtags: Hashtag[]
}

const CustomizeHashtagCard: React.FC<Props> = ({ hashtags }) => {
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const toggleCheckbox = useCallback(
    (hashtag: string) => {
      setSelectedHashtags((prevSelected) =>
        prevSelected.includes(hashtag) ? prevSelected.filter((tag) => tag !== hashtag) : [...prevSelected, hashtag]
      )
    },
    [setSelectedHashtags]
  )
  const copyToClipboard = useCallback(async () => {
    const copiedHashtags = selectedHashtags.join(' ')
    await navigator.clipboard.writeText(copiedHashtags)
    window.alert('Copied to clipboard!')
  }, [selectedHashtags])

  const accuracyRanges = [
    { min: 90, max: 100, label: 'Larger than 90% related' },
    { min: 80, max: 89, label: '80-89% related' },
    { min: 70, max: 79, label: '70-79% related' },
    { min: 1, max: 70, label: 'Less than 70% related' },
    // Add more accuracy ranges if needed
  ]

  const clearAll = useCallback(() => {
    setSelectedHashtags([])
  }, [])

  const selectAll = useCallback(() => {
    setSelectedHashtags(hashtags.map((tag) => tag.hashtag))
  }, [hashtags])

  const getAccuracyRange = (accuracy: number) => {
    const range = accuracyRanges.find((range) => accuracy >= range.min && accuracy < range.max)
    return range ? range.label : 'Below 85%'
  }

  useEffect(() => {
    clearAll()
  }, [hashtags])

  return (
    <Card className=" w-full gap-6 px-6 py-9 shadow">
      <div className="flex gap-4">
        <div className="w-1/4">
          <Title bold level={3} className="ml-auto mr-0 mb-4 text-right">
            Customize
          </Title>
          <Paragraph className="ml-auto mr-0 text-right">Select all hashtag you wish to put under your post and click “Copy Selected”</Paragraph>
        </div>
        <div className=" w-3/4">
          <div className="leading-loos max-h-144 space-y-5 overflow-y-scroll font-bold">
            {accuracyRanges.map((range) => (
              <div key={range.label} className="flex-col items-start justify-start gap-4 border border-slate-300 bg-neutral-50 p-4">
                <Paragraph size="lg" bold>
                  {range.label}
                </Paragraph>
                <ul className="flex flex-wrap space-y-4">
                  {hashtags.map((item) => {
                    const accuracyPercentage = Math.floor(item.acc * 100)
                    const accuracyRange = getAccuracyRange(accuracyPercentage)
                    if (accuracyRange === range.label) {
                      return (
                        <li
                          className="flex w-1/4 cursor-pointer items-center hover:text-gray-400"
                          key={item.hashtag}
                          onClick={() => toggleCheckbox(item.hashtag)}
                        >
                          <Checkbox id={`checkbox-${item.hashtag}`} className="mr-1.5" checked={selectedHashtags.includes(item.hashtag)} />
                          {item.hashtag}
                        </li>
                      )
                    }
                    return null
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className=" flex justify-end gap-3">
            <Button.Primary onClick={copyToClipboard}>Copy Selected</Button.Primary>
            <Button.Primary onClick={clearAll}>Clear All</Button.Primary>
            <Button.Primary onClick={selectAll}>Select All</Button.Primary>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CustomizeHashtagCard
