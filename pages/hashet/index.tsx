import React, { useState } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import useSWR from 'swr'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import axios from 'axios'
import moment from 'moment'
import { Fetcher } from 'services/fetcher'
import { Form } from '@components/Form'
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
        destination: '/login',
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

const HashetPredictsPage = ({ hashetSessionData }: Props) => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [inputString, setInputString] = useState('')

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setShouldFetch(false)
    setInputString(e.target.value)
  }

  const onSubmit = async () => {
    if (!shouldFetch) setShouldFetch(true)
    mutateHashet(inputString)
  }

  const {
    data,
    error,
    mutate: mutateHashet,
    isValidating,
  } = useSWR(
    shouldFetch ? ['api/hashet', { recommend: inputString }] : null,
    Fetcher.GET,
    { refreshInterval: 0, fallbackData: hashetSessionData }
  )

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
      title: 'Hashtag',
      dataIndex: 'hashtag',
      render: (e: string) => {
        return (
          <a
            style={{ color: '#0070f3' }}
            target="_blank"
            href={`https://www.instagram.com/explore/tags/${e.replaceAll(
              '#',
              ''
            )}/`}
          >
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

  const hashetData: IHashet[] = data.data

  return (
    <Card title="Get Hashet">
      <div className="flex">
        <div className="grow">
          <Form.BaseInput
            placeholder="e.g. Thank you Elon Musk!"
            className="order-shades-100 block w-full grow rounded-lg border p-2  text-slate-600 placeholder-slate-400 outline-none focus:border-slate-700 focus:outline-none"
            onChange={(e) => onChange(e)}
          ></Form.BaseInput>
        </div>
        <Button.Primary loading={isValidating} onClick={() => onSubmit()}>
          generate
        </Button.Primary>
      </div>
      <Table.Layout>
        <Table.Header columns={columns} />

        <Table.Body>
          {hashetData.map((e, index) => (
            <Table.Row columns={columns} rowData={e} key={index} />
          ))}
        </Table.Body>
      </Table.Layout>
    </Card>
  )
}
export default HashetPredictsPage
