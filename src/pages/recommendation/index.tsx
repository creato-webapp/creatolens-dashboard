import React, { useState, useCallback } from 'react'
import Card from '@components/Card'
import { getSession } from 'next-auth/react'
import { Form } from '@components/Form'
import Title from '@components/Typography/Title'
import MagnifyingGlassIcon from '@components/Icon/MagnifyingGlassIcon'
import LoaderIcon from '@components/Icon/LoaderIcon'
import LightBulbIcon from '@components/Icon/LightBulbIcon'
import TopRelatedHashtagCard from '@lib/Hashet/TopRelatedHashtagCard'
import TopAccHashtagCard from '@lib/Hashet/TopAccHashtagCard'
import { Button } from '@components/Button'
import Popover from '@components/Popover'
import Tab from '@components/Tab'
import CustomizeHashtagCard from '@lib/Hashet/CustomizeHashtagCard'
import { useGetHashtag } from 'src/hooks/useHashtag'
import Hero from '@components/Hero'
interface IHashet extends Record<string, string | number | boolean> {
  hashtag: string
  acc: number
}

type Props = {
  hashetSessionData: IHashet[]
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
      },
    }
  }
  const hashetSessionData = { data: [] }
  return { props: { hashetSessionData } }
}

const RecommendationPage = ({ hashetSessionData }: Props) => {
  //find better way to write fetch logic
  const [inputString, setInputString] = useState('')
  const [stringToSubmit, setStringToSubmit] = useState('')
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputString(e.target.value)
  }

  const onSubmit = useCallback(async () => {
    setStringToSubmit(inputString)
    await mutateHashet()
  }, [inputString])

  const { data, error, mutate: mutateHashet, isValidating } = useGetHashtag(stringToSubmit, stringToSubmit ? true : false, hashetSessionData)
  if (error) {
    console.log(data)
    console.log(error)
    return <div>Failed to load hashet error data</div>
  }
  if (!data) {
    console.log(data)
    return <div>Loading...</div>
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
        <div className="flex flex-wrap gap-4 md:flex md:flex-nowrap md:py-24 md:px-14">
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
      <Hero backgroundImage="./RecommendationHero.svg" childrenStyle="pb-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex w-full flex-row items-center">
            <h1>RECOMMENDATION</h1>
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
            <Button.Primary className="w-auto" onClick={() => onSubmit()} loading={isValidating}>
              Search
            </Button.Primary>
          </div>
        </div>
      </Hero>
      <Card className="w-full rounded-none border-none bg-transparent px-4 py-0 shadow-none md:p-8">
        <Tab items={tabItems} defaultActiveKey="1" scrollable={false} />
      </Card>
    </div>
  )
}
export default RecommendationPage
