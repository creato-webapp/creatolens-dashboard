import React, { useState, useEffect } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import { Button } from '@components/Button'
import { IAccount } from '@lib/Account/Account/interface'
import { ResponsiveAccountCard } from '@lib/Account/ResponsiveAccountCard'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import Pagination from '@components/Pagination'
import { useGetAccountsPagination } from 'src/hooks/useAccount'
import { GetAccountsPagination, PaginationMetadata } from '@services/Account/Account'
import Image from 'next/image'
import Badges, { Status } from '@components/Badges'
import Hero from '@components/Hero'
import { PlusIcon } from '@heroicons/react/24/solid'

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

type Props = {
  paginationData: PaginationMetadata
}

//TODO getServerSideProps: GetServerSideProps; cannot set GetServerSideProps type.
export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
      },
    }
  }
  const paginationProps = {
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'created_at',
    isAsc: false,
  }
  const cookies = context.req.headers.cookie
  const response = await GetAccountsPagination(paginationProps, {
    headers: {
      Cookie: cookies, // Forward the cookies to the server-side request
    },
  })
  // Pass data to the page via props
  const accountData: IAccount[] = response ? response?.data : []
  console.log(response)
  const paginationData: PaginationMetadata = {
    data: accountData,
    has_next: response ? response.has_next : false,
    has_prev: response ? response.has_prev : false,
    page: response ? response.page : 1,
    size: response ? response.size : 0,
    total_items: response ? response.total_items : 0,
  }
  return { props: { paginationData } }
}

const AccountsPage = ({ paginationData }: Props) => {
  const [pageParams, setPageParams] = useState({
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'created_at',
    isAsc: false,
  })
  const { accounts: responseData, error, mutate } = useGetAccountsPagination(pageParams, true, paginationData)

  const accounts: IAccount[] = responseData?.data || []
  const isLoading = !responseData && !error
  const onPageChange = (newPage: number) => {
    setPageParams((prevParams) => ({
      ...prevParams,
      pageNumber: newPage,
    }))
  }

  useEffect(() => {
    if (pageParams.pageNumber !== 1) {
      mutate()
    }
  }, [pageParams])

  if (error) {
    console.log(responseData)
    console.log(error)
    return <div>Failed to load users</div>
  }
  if (!responseData) {
    console.log(responseData)
    return <div>Loading...</div>
  }

  const IconRender = (e: boolean) => {
    return (
      <div className="flex items-center justify-center">
        {e ? (
          <Image src="/account/check.svg" width={24} height={24} alt="check" className="pointer-events-none"></Image>
        ) : (
          <Image src="/account/cross.svg" width={24} height={24} alt="x" className="pointer-events-none"></Image>
        )}
      </div>
    )
  }

  const columns = [
    {
      title: 'Profile',
      dataIndex: 'id',
      render: (e: any) => (
        <Link href="/accounts/[id]" as={`/accounts/${e}`} legacyBehavior>
          <a className="flex w-full flex-row items-center justify-center gap-2">
            <Image src="/account/edit.svg" width={16} height={16} alt="edit" className="pointer-events-none"></Image>
            <div className="font-semibold text-accent2-500">Edit</div>
          </a>
        </Link>
      ),
    },
    {
      headerIcon: <Image src="/account/InstagramLogo.svg" className="w-full" width={24} height={24}></Image>,
      title: 'Username',
      dataIndex: 'username',
      render: (e: any) => {
        return <div className="flex items-center text-accent1-600">{e}</div>
      },
    },
    {
      title: 'Created On',
      dataIndex: 'created_at',
      sortAvailable: true,
      render: (e: any) => {
        const date = dayjs(e, 'YYYY-MM-DD THH:mm:ss')
        return date.local().format('DD MMM YYYY')
      },
    },
    {
      title: 'Created Time',
      dataIndex: 'created_at',
      render: (e: any) => {
        const date = dayjs(e, 'THH:mm:ss')
        return date.local().format('hh:mm:ss')
      },
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
    },
    { title: 'Post Scrapped', dataIndex: 'post_scrapped_count' },
    { title: 'Login Count', dataIndex: 'login_count' },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (e: string) => {
        const statusToVariantMap: Record<string, Status> = {
          active: 'success',
          retry: 'warning',
          blocked: 'error',
          disabled: 'disabled',
          test: 'secondary',
        }
        // const status: Status = statusToVariantMap[e]
        const status: Status = statusToVariantMap[e]
        return (
          <div className="flex items-center justify-center">
            <Badges size={'sm'} status={status} className="capitalize" rounded>
              {e}
            </Badges>
          </div>
        )
      },
    },
    {
      title: 'Is Occupied',
      dataIndex: 'is_occupied',
      render: (e: any) => {
        return IconRender(e)
      },
    },
    {
      title: 'Is Enabled',
      dataIndex: 'enabled',
      render: (e: any) => {
        return IconRender(e)
      },
    },
    {
      title: 'Is Auth',
      dataIndex: 'is_authenticated',
      render: (e: any) => {
        return IconRender(e)
      },
    },
  ]

  return (
    <div>
      <Hero
        backgroundImage="./GuideHero.svg"
        className="flex h-full flex-col justify-between md:h-52"
        childrenStyle="h-full md:gap-3 flex-col flex md:py-10 md:pl-24 "
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <h1 className="text-black md:text-white">ACCOUNTS</h1>
          </div>
          <Link href="/accounts/create-account">
            <a>
              <Button.Primary sizes={['s', 'l', 'l']}>
                <div className="flex flex-row gap-2">
                  <PlusIcon className="h-6 w-6" />
                  Create New Account
                </div>
              </Button.Primary>
            </a>
          </Link>
        </div>
      </Hero>
      <Card title="Accounts Table">
        <div className="hidden md:flex">
          <Table.Layout>
            <Table.Header
              columns={columns}
              thClassName={'text-sm font-normal text-text-primary items-center justify-center'}
              className="capitalize"
            />
            <Table.Body className="text-sm font-normal leading-5 text-black">
              {accounts?.map((e, index) => (
                <Table.Row columns={columns} className="text-sm" rowData={e} rowKey={index} />
              ))}
            </Table.Body>
          </Table.Layout>
        </div>
        <Pagination
          isLoading={isLoading}
          page={responseData.page}
          size={responseData.size}
          totalItems={responseData.total_items}
          hasNext={responseData.has_next}
          hasPrev={responseData.has_prev}
          onPageChange={onPageChange}
        />

        <div className=" flex w-full flex-col md:hidden">
          {accounts?.map((e, index) => (
            <ResponsiveAccountCard columns={columns} rowData={e} key={index} />
          ))}
        </div>
      </Card>
    </div>
  )
}

export default AccountsPage
