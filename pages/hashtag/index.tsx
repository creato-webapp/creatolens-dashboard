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

type IHashtag = string

type Props = {
  hashtagSessionData: IHashtag[]
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
  const res = await axios.get(`${process.env.LOCAL_SERVER_URL}/api/hashtag`, {
    params: { recommend: 'instagram' },
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })
  const hashtagSessionData: IHashtag[] = res.data

  return { props: { hashtagSessionData } }
}

const AccountsErrorPage = ({ hashtagSessionData }: Props) => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [inputString, setInputString] = useState('')

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setShouldFetch(false)
    setInputString(e.target.value)
  }

  const onSubmit = async () => {
    if (!shouldFetch) setShouldFetch(true)
    mutateHashtag(inputString)
  }

  const {
    data,
    error,
    mutate: mutateHashtag,
    isValidating,
  } = useSWR(
    shouldFetch ? ['api/hashtag', { recommend: inputString }] : null,
    Fetcher.GET,
    { refreshInterval: 0, fallbackData: hashtagSessionData }
  )

  if (error) {
    console.log(data)
    console.log(error)
    return <div>Failed to load hashtag error data</div>
  }
  if (!data) {
    console.log(data)
    return <div>Loading...</div>
  }
  const hashtagData: IHashtag[] = data.data

  return (
    <Card title="Get Hashtag">
      <div className="flex">
        <div className="grow">
          <Form.BaseInput
            placeholder="Generate Hashtag with 3 - 4 words"
            className="order-shades-100 block w-full grow rounded-lg border p-2  text-slate-600 placeholder-slate-400 outline-none focus:border-slate-700 focus:outline-none"
            onChange={(e) => onChange(e)}
          ></Form.BaseInput>
        </div>
        <Button.Primary loading={isValidating} onClick={() => onSubmit()}>
          generate
        </Button.Primary>
      </div>
      <p>{hashtagData}</p>
    </Card>
  )
}
export default AccountsErrorPage
