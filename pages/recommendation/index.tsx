import React, { useState } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import useSWR from 'swr'
import { getSession } from 'next-auth/react'
import axios from 'axios'
import { Fetcher } from 'services/fetcher'
import { Form } from '@components/Form'
import Pagination from '@components/Pagination'
import Title from '@components/Typography/Title'
import MagnifyingGlassIcon from '@components/Icon/MagnifyingGlassIcon'
import LoaderIcon from '@components/Icon/LoaderIcon'
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

const RecommendationPage = ({ hashetSessionData }: Props) => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [inputString, setInputString] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

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
  } = useSWR(shouldFetch ? ['api/hashet', { recommend: inputString }] : null, Fetcher.GET, { refreshInterval: 0, fallbackData: hashetSessionData })

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

  const newHashtagData = hashetData.map((e, k) => ({ index: k + 1, ...e }))

  const currentItems = newHashtagData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
    <Card className="px-48 ">
      <div>
        <Title level={1} bold>
          RECOMMENDATION
        </Title>
      </div>
      <div className="my-2 flex">
        <div className="grow">
          <div className="flex w-full items-center rounded-3xl bg-neutral-100 px-2 py-1.5 hover:rounded-3xl hover:outline-none focus:rounded-3xl focus:outline-none focus:ring-opacity-50 active:rounded-3xl">
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
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Table.Layout className="text-lg font-bold">
          <Table.Header columns={columns} className="text-center  text-text-primary" />

          <Table.Body>
            {currentItems.map((e, index) => (
              <Table.Row
                columns={columns}
                rowData={e}
                key={index}
                cellProps={{ className: 'color-red-400 w-72  items-center justify-center border border-slate-300 bg-neutral-50' }}
              />
            ))}
          </Table.Body>
        </Table.Layout>
        <Pagination
          isLoading={false}
          page={currentPage}
          size={itemsPerPage}
          totalItems={hashetData.length}
          hasNext={currentPage * itemsPerPage < hashetData.length}
          hasPrev={currentPage > 1}
          onPageChange={handlePageChange}
        />

        <div className="mt-40 inline-flex h-96 w-96 flex-col items-start justify-start">
          TEsting
          <div className="inline-flex items-center justify-start">
            <div className="inline-flex w-24 flex-col items-center justify-center border border-slate-300 bg-neutral-100">
              <div className="inline-flex w-28 items-start justify-start px-3 py-2.5">
                <div className="shrink grow basis-0 text-center text-lg font-semibold leading-loose text-black">Rank</div>
              </div>
            </div>
            <div className="inline-flex w-72 flex-col items-center justify-center border border-slate-300 bg-neutral-100">
              <div className="inline-flex w-28 items-start justify-start px-3 py-2.5">
                <div className="shrink grow basis-0 text-center text-lg font-semibold leading-loose text-black">#Hashtag </div>
              </div>
            </div>
            <div className="inline-flex w-72 flex-col items-center justify-center border border-slate-300 bg-neutral-100">
              <div className="inline-flex w-28 items-start justify-start px-3 py-2.5">
                <div className="shrink grow basis-0 text-center text-lg font-semibold leading-loose text-black">Accuracy</div>
              </div>
            </div>
          </div>
          <div className="inline-flex items-center justify-start">
            <div className="inline-flex w-24 flex-col items-center justify-center border border-slate-300 bg-neutral-50">
              <div className="inline-flex w-28 items-start justify-start px-3 py-2.5">
                <div className="shrink grow basis-0 text-center text-lg font-semibold leading-loose text-black">1</div>
              </div>
            </div>
            <div className="inline-flex w-72 flex-col items-center justify-center border border-slate-300 bg-neutral-50">
              <div className="inline-flex items-center justify-start self-stretch py-2.5 pl-6 pr-3">
                <div className="shrink grow basis-0 text-lg font-medium leading-loose text-blue-700 underline">#teslamodel</div>
              </div>
            </div>
            <div className="inline-flex w-72 flex-col items-center justify-center border border-slate-300 bg-neutral-50">
              <div className="inline-flex w-fit items-start justify-start px-3 py-2.5">
                <div className="shrink grow basis-0 text-center text-lg font-semibold leading-loose text-black">98.304%</div>
              </div>
            </div>
            <div className="flex items-center justify-start gap-2 px-4 py-1">
              <div className="rounded border border-slate-300 p-1" />
            </div>
          </div>
          <div className="inline-flex items-center justify-start">
            <div className="inline-flex w-24 flex-col items-center justify-center border border-slate-300 bg-neutral-50">
              <div className="inline-flex w-28 items-start justify-start px-3 py-2.5">
                <div className="shrink grow basis-0 text-center text-lg font-semibold leading-loose text-black">2</div>
              </div>
            </div>
            <div className="inline-flex w-72 flex-col items-center justify-center border border-slate-300 bg-neutral-50">
              <div className="inline-flex items-center justify-start self-stretch py-2.5 pl-6 pr-3">
                <div className="text-center text-lg font-medium leading-loose text-blue-700 underline">#teslamodely</div>
              </div>
            </div>
            <div className="inline-flex w-72 flex-col items-center justify-center border border-slate-300 bg-neutral-50">
              <div className="inline-flex w-28 items-start justify-start px-3 py-2.5">
                <div className="shrink grow basis-0 text-center text-lg font-semibold leading-loose text-black">98.265%</div>
              </div>
            </div>
            <div className="flex items-center justify-start gap-2 px-4 py-1">
              <div className="rounded border border-slate-300 p-1" />
            </div>
            <div className="inline-flex w-24 flex-col items-center justify-center border border-slate-300 bg-neutral-50">
              <div className="inline-flex w-28 items-start justify-start px-3 py-2.5">
                <div className="shrink grow basis-0 text-center text-lg font-semibold leading-loose text-black">10</div>
              </div>
            </div>
            <div className="inline-flex w-72 flex-col items-center justify-center border border-slate-300 bg-neutral-50">
              <div className="inline-flex items-center justify-start self-stretch py-2.5 pl-6 pr-3">
                <div className="text-center text-lg font-medium leading-loose text-blue-700 underline">#teslalife</div>
              </div>
            </div>
            <div className="inline-flex w-72 flex-col items-center justify-center border border-slate-300 bg-neutral-50">
              <div className="inline-flex w-28 items-start justify-start px-3 py-2.5">
                <div className="shrink grow basis-0 text-center text-lg font-semibold leading-loose text-black">98.225%</div>
              </div>
            </div>
            <div className="flex items-center justify-start gap-2 px-4 py-1">
              <div className="rounded border border-slate-300 p-1" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
export default RecommendationPage
