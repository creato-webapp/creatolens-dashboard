import React, { useState, useCallback } from 'react'
import Card from '@components/Card'
import Dropdown from '@components/Form/Dropdown'
import { Button } from '@components/Button'
import { Title } from '@components/Typography'
interface Hashtag {
  acc: number
  hashtag: string
}

interface Props {
  hashtags: Hashtag[]
}

const TopRelatedHashtagCard: React.FC<Props> = ({ hashtags }) => {
  const [numberOfHashes, setNumberOfHashes] = useState<string | number>(30)

  const slicedHashtags = hashtags.length > 0 ? hashtags.slice(0, numberOfHashes as number) : []

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
      customTitle={
        <h1 className="flex items-center gap-2">
          <span>Top</span>
          <span className="text-accent1-500">{`${numberOfHashes}`}</span>
          <span>Related</span>
        </h1>
      }
      className="min-w-96 mb-2 w-full whitespace-normal rounded-none md:h-auto md:w-1/2"
      extra={
        <Dropdown
          name="numberOfHashes"
          options={DropdownOptions}
          defaultValue={numberOfHashes}
          onValueChange={(value) => setNumberOfHashes(value)}
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

export default TopRelatedHashtagCard
