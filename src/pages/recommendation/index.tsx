import React, { useCallback, useState } from 'react'

import { Button } from '@components/Button'
import Card from '@components/Card'
import { Form } from '@components/Form'
import CustomizeHashtagCard from '@components/Hashet/CustomizeHashtagCard'
import TopAccHashtagCard from '@components/Hashet/TopAccHashtagCard'
import TopRelatedHashtagCard from '@components/Hashet/TopRelatedHashtagCard'
import Hero from '@components/Hero'
import LightBulbIcon from '@components/Icon/LightBulbIcon'
import LoaderIcon from '@components/Icon/LoaderIcon'
import MagnifyingGlassIcon from '@components/Icon/MagnifyingGlassIcon'
import Popover from '@components/Popover'
import Tab from '@components/Tab'
import { useGetHashtag } from 'src/hooks/useHashtag'

export interface IHashet extends Record<string, string | number | boolean> {
  hashtag: string
  acc: number
}

export type HashetProps = {
  hashetSessionData: IHashet[]
}

const RecommendationPage = () => {
  const [inputString, setInputString] = useState('')
  const [stringToSubmit, setStringToSubmit] = useState('')
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputString(e.target.value)
  }

  const { data, error, mutate: mutateHashet, isValidating } = useGetHashtag(stringToSubmit, !!stringToSubmit)

  const onSubmit = useCallback(async () => {
    setStringToSubmit(inputString)
    await mutateHashet()
  }, [inputString, mutateHashet])

  if (error) {
    console.error(data)
    console.error(error)
    return <div>Failed to load hashet error data</div>
  }

  const hashetData: IHashet[] = data?.data ? data.data : []
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onSubmit && onSubmit()
    }
  }

  const tabItems = [
    {
      key: '1',
      title: 'Categories',
      children: (
        <div className="flex flex-col justify-center gap-4 md:flex md:flex-row md:px-14 md:py-24 ">
          <TopRelatedHashtagCard hashtags={hashetData} />
          <TopAccHashtagCard hashtags={hashetData} />
        </div>
      ),
    },
    {
      key: '2',
      title: 'Customize',
      children: (
        <div className="w-full flex-wrap gap-2 md:flex md:flex-nowrap md:justify-center md:py-12 md:shadow-lg">
          <CustomizeHashtagCard hashtags={hashetData} />
        </div>
      ),
    },
  ]

  return (
    <div className="flex-col justify-center">
      <Hero backgroundImage="./RecommendationHero.svg" childrenStyle="pb-4 md:py-16">
        <div className="flex flex-col items-center gap-4">
          <div className="flex w-full flex-row items-center">
            <h1 className="text-black md:text-white">RECOMMENDATION</h1>
            <Popover
              className="ml-auto shrink-0 rounded-full bg-accent1-500 p-2 text-white"
              trigger={<LightBulbIcon size={32} />}
              content={
                <>
                  <div className="rounded-t-lg border-b border-gray-200  px-3 py-2">
                    <h3 className="font-semibold text-gray-900 ">💡Input prompt</h3>
                  </div>
                  <div className="px-3 py-2">
                    <ul>
                      <li>You can type everything related to your next IG post</li>
                      <li>No punctuation is needed</li>
                      <li>Short phrase/ vocabulary applicable</li>
                    </ul>
                    <p>e.g. Hong Kong Food Cute makeup tutorial</p>
                  </div>
                  <div data-popper-arrow></div>
                </>
              }
            />
          </div>
          <div className="flex w-full gap-2">
            <div className="flex w-full items-center rounded-3xl bg-bg-dark px-2 text-text-primary hover:rounded-3xl hover:outline-none focus:rounded-3xl focus:outline-none focus:ring-opacity-50 active:rounded-3xl">
              <Form.BaseInput
                // TODO fix input element (cannot enter and submit)
                allowSpace
                hidden
                disabled={isValidating}
                onKeyDown={handleKeyDown}
                placeholder="Searching for new idea"
                className={` w-full rounded-3xl border-none py-1.5 hover:rounded-3xl hover:outline-none focus:rounded-3xl focus:outline-none focus:ring-opacity-50 active:rounded-3xl ${
                  isValidating ? 'text-gray-400' : ''
                } w-full`}
                onChange={(e) => onChange(e)}
                childrenPosition="left"
              >
                {isValidating ? <LoaderIcon className="animate-spin" /> : <MagnifyingGlassIcon />}
              </Form.BaseInput>
            </div>
            <div className="w-1/5">
              <Button.Primary className="w-auto" sizes={['s', 'm', 'm']} onClick={onSubmit} loading={isValidating}>
                Search
              </Button.Primary>
            </div>
          </div>
        </div>
      </Hero>
      <Card className="min-h-full w-full rounded-none border-none bg-transparent px-4 py-0 shadow-none md:px-20 md:pb-28">
        <Tab items={tabItems} defaultActiveKey="1" scrollable={false} className="shadow-none md:px-0 md:shadow-xl" />
      </Card>
    </div>
  )
}
export default RecommendationPage
