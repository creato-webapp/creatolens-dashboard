import React, { useState, useCallback } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import useSWR from 'swr'
import { getSession } from 'next-auth/react'
import axios from 'axios'
import { Form } from '@components/Form'
import Pagination from '@components/Pagination'
import Title from '@components/Typography/Title'
import MagnifyingGlassIcon from '@components/Icon/MagnifyingGlassIcon'
import LoaderIcon from '@components/Icon/LoaderIcon'
import { HashtagFetcher } from 'services/HashtagFetcher'
import TopRelatedHashtagCard from '@lib/Hashet/TopRelatedHashtagCard'
import TopAccHashtagCard from '@lib/Hashet/TopAccHashtagCard'
import { Button } from '@components/Button'
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
  // Fetch data from next API
  const res = await axios.get(`${process.env.LOCAL_SERVER_URL}/api/hashet`, {
    params: { recommend: 'Thank you Elon Musk!' },
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })
  const hashetSessionData: IHashet[] = res.data
  console.log(hashetSessionData)

  return { props: { hashetSessionData } }
}

const RecommendationPage = ({ hashetSessionData }: Props) => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [inputString, setInputString] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setShouldFetch(false)
    setInputString(e.target.value)
  }

  const onSubmit = useCallback(async () => {
    if (!shouldFetch) setShouldFetch(true)
    await mutateHashet(inputString)
  }, [inputString])

  const {
    data,
    error,
    mutate: mutateHashet,
    isValidating,
  } = useSWR(shouldFetch ? ['api/hashet', { recommend: inputString }] : null, HashtagFetcher.GET, {
    refreshInterval: 0,
    fallbackData: hashetSessionData,
  })

  if (error) {
    console.log(data)
    console.log(error)
    return <div>Failed to load hashet error data</div>
  }
  if (!data) {
    console.log(data)
    return <div>Loading...</div>
  }

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'index',
      render: (e: string) => {
        return <div className="flex justify-center">{e}</div>
      },
    },
    {
      title: 'Hashtag',
      dataIndex: 'hashtag',
      render: (e: string) => {
        return (
          <a style={{ color: '#0070f3' }} target="_blank" href={`https://www.instagram.com/explore/tags/${e.replaceAll('#', '')}/`}>
            {e}
          </a>
        )
      },
    },
    {
      title: 'Accuracy',
      dataIndex: 'acc',
    },
  ]

  const hashetData: IHashet[] = data?.data ? data.data : []

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onSubmit && onSubmit()
    }
  }
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

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
            hidden
            disabled={isValidating}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Thank you Elon Musk!"
            className={` rounded-3xl border-none bg-neutral-100 px-2 py-1.5 hover:rounded-3xl hover:outline-none focus:rounded-3xl focus:outline-none focus:ring-opacity-50 active:rounded-3xl  ${
              isValidating ? 'text-gray-400' : ''
            } w-full`}
            onChange={(e) => onChange(e)}
          ></Form.BaseInput>
        </div>
        <Button.Primary className="px-3" onClick={() => onSubmit()}>
          Search
        </Button.Primary>
      </div>
      <div className="flex gap-4">
        <TopRelatedHashtagCard hashtags={hashetData} />
        <TopAccHashtagCard hashtags={hashetData} />
      </div>
    </Card>
  )
}
export default RecommendationPage