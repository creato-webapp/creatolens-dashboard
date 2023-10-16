import React, { useState, useCallback } from 'react'
import Card from '@components/Card'
import { getSession } from 'next-auth/react'
import { Form } from '@components/Form'
import Title from '@components/Typography/Title'
import MagnifyingGlassIcon from '@components/Icon/MagnifyingGlassIcon'
import LoaderIcon from '@components/Icon/LoaderIcon'
import TopRelatedHashtagCard from '@lib/Hashet/TopRelatedHashtagCard'
import TopAccHashtagCard from '@lib/Hashet/TopAccHashtagCard'
import { Button } from '@components/Button'
import Tab from '@components/Tab'
import CustomizeHashtagCard from '@lib/Hashet/CustomizeHashtagCard'
import { useGetHashtag } from 'src/hooks/useHashtag'
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
      content: (
        <div className="flex gap-4">
          <TopRelatedHashtagCard hashtags={hashetData} />
          <TopAccHashtagCard hashtags={hashetData} />
        </div>
      ),
    },
    {
      key: '2',
      title: 'Customize',
      content: (
        <div className="flex gap-4">
          <CustomizeHashtagCard hashtags={hashetData} />
        </div>
      ),
    },
  ]

  return (
    <Card className="px-48">
      <div>
        <Title level={1} bold>
          RECOMMENDATION
        </Title>
      </div>
      <div className="my-2 flex w-full gap-2">
        <div className="flex w-full items-center rounded-3xl bg-neutral-100 px-2 py-2 hover:rounded-3xl hover:outline-none focus:rounded-3xl focus:outline-none focus:ring-opacity-50 active:rounded-3xl">
          {isValidating ? <LoaderIcon className="animate-spin" /> : <MagnifyingGlassIcon />}

          <Form.BaseInput
            allowSpace
            hidden
            disabled={isValidating}
            onKeyDown={handleKeyDown}
            placeholder="Type Your Input Here."
            className={` rounded-3xl border-none bg-neutral-100 px-2 py-1.5 hover:rounded-3xl hover:outline-none focus:rounded-3xl focus:outline-none focus:ring-opacity-50 active:rounded-3xl  ${
              isValidating ? 'text-gray-400' : ''
            } w-full`}
            onChange={(e) => onChange(e)}
          ></Form.BaseInput>
        </div>
        <Button.Primary className="px-3" onClick={() => onSubmit()} loading={isValidating}>
          Search
        </Button.Primary>
      </div>
      <Tab items={tabItems} defaultActiveKey="1" scrollable={false} />
    </Card>
  )
}
export default RecommendationPage
