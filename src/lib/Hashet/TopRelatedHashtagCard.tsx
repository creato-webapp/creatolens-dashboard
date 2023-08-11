import React, { useState, useCallback } from 'react'
import Card from '@components/Card'
import Dropdown from '@components/Form/Dropdown'
import { Button } from '@components/Button'
interface Hashtag {
  acc: number
  hashtag: string
}

interface Props {
  hashtags: Hashtag[]
}

const TopRelatedHashtagCard: React.FC<Props> = ({ hashtags }) => {
  const [numberOfHashes, setNumberOfHashes] = useState<string | number>(30)

  const slicedHashtags = hashtags.slice(0, numberOfHashes as number)

  const copyToClipboard = useCallback(async () => {
    console.log(slicedHashtags)
    const copiedHashtags = slicedHashtags.map((tag) => tag.hashtag).join(' ')
    await navigator.clipboard.writeText(copiedHashtags)
    window.alert('Copied to clipboard!')
  }, [slicedHashtags])

  const DropdownOptions = [
    {
      label: '30',
      value: 30,
    },
    {
      label: '20',
      value: 20,
    },
    {
      label: '10',
      value: 10,
    },
  ]

  return (
    <Card
      title={`Top ${numberOfHashes} Related Hashtag`}
      className="min-w-96 w-1/2 justify-start gap-6 bg-neutral-50 px-6 py-9 shadow"
      extra={
        <Dropdown
          name="numberOfHashes"
          options={DropdownOptions}
          defaultValue={numberOfHashes}
          onValueChange={(value) => setNumberOfHashes(value)}
        ></Dropdown>
      }
    >
      <div className="h-80 font-bold leading-loose text-slate-600">
        {slicedHashtags.map((tag) => (
          <span key={tag.hashtag}>{tag.hashtag} </span>
        ))}
      </div>
      <div className="flex justify-center">
        <Button.Primary onClick={() => copyToClipboard()}>Copy</Button.Primary>
      </div>
    </Card>
  )
}

export default TopRelatedHashtagCard
