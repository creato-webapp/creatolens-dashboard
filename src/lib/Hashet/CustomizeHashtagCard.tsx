import React, { useState, useCallback, useEffect } from 'react'
import { Button } from '@components/Button'
import { Paragraph, Title } from '@components/Typography'
import Checkbox from '@components/Form/Checkbox'
import Collapse from '@components/Collapse'

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

  type ranges = {
    min: number
    max: number
    label: string
  }

  const accuracyRanges = [
    { min: 90, max: 100, label: 'Larger than 90% related' },
    { min: 80, max: 89, label: '80-89% related' },
    { min: 70, max: 79, label: '70-79% related' },
    { min: 1, max: 70, label: 'Less than 70% related' },
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
    <div className="flex-col md:flex md:flex-row md:gap-16 md:px-4">
      <div className="md:flex md:w-1/4 md:flex-col md:text-end">
        <Title bold level={3} className="ml-auto mr-0 mb-4 hidden md:flex ">
          Customize
        </Title>
        <Paragraph className="ml-auto mr-0">Select all hashtag you wish to put under your post and click “Copy Selected”</Paragraph>
      </div>
      <div className="w-full pt-4 md:pt-0">
        <div className="leading-loos flex max-h-144 flex-col gap-6 space-y-2 overflow-y-scroll font-bold">
          {accuracyRanges.map((range) => (
            <div className="bg-bg-dark">
              <Collapse
                className="shadow-none md:hidden"
                parent={
                  <div>
                    <h4 className="font-medium text-text-secondary">{range.label}</h4>
                  </div>
                }
              >
                <div key={range.label} className="block flex-col items-center justify-start border p-4">
                  <ul className="flex flex-wrap gap-y-4">
                    {hashtags.map((item) => {
                      const accuracyPercentage = Math.floor(item.acc * 100)
                      const accuracyRange = getAccuracyRange(accuracyPercentage)
                      if (accuracyRange === range.label) {
                        return (
                          <li
                            className="mx-2 flex w-fit cursor-pointer items-center hover:text-gray-400 md:w-1/4 "
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
              </Collapse>
              <div className="hidden bg-white md:block">
                <div>
                  <h4 className="font-extrabold">{range.label}</h4>
                </div>
                <div key={range.label} className="mt-2 flex-col items-center justify-start border p-4">
                  <ul className="flex flex-wrap gap-y-4">
                    {hashtags.map((item) => {
                      const accuracyPercentage = Math.floor(item.acc * 100)
                      const accuracyRange = getAccuracyRange(accuracyPercentage)
                      if (accuracyRange === range.label) {
                        return (
                          <li
                            className="flex w-fit cursor-pointer items-center hover:text-gray-400 md:w-1/4"
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
              </div>
            </div>
          ))}
        </div>
        <div className="my-6 flex flex-row gap-2 md:hidden md:flex-row-reverse">
          <Button.Outline sizes={['s', 'l', 'l']} className="w-fit" onClick={clearAll}>
            Clear All
          </Button.Outline>
          <Button.Primary sizes={['s', 'l', 'l']} className="w-fit" onClick={copyToClipboard}>
            Copy Selected
          </Button.Primary>
          <Button.Primary sizes={['s', 'l', 'l']} className="w-fit" onClick={selectAll}>
            Select All
          </Button.Primary>
        </div>
        <div className="my-6 hidden flex-row gap-2 md:flex md:flex-row-reverse">
          <Button.Outline sizes={['s', 'l', 'l']} className="w-fit" onClick={clearAll}>
            Clear All
          </Button.Outline>
          <Button.Primary sizes={['s', 'l', 'l']} className="w-fit" onClick={selectAll}>
            Select All
          </Button.Primary>
          <Button.Primary sizes={['s', 'l', 'l']} className="w-fit" onClick={copyToClipboard}>
            Copy Selected
          </Button.Primary>
        </div>
      </div>
    </div>
  )
}

export default CustomizeHashtagCard
