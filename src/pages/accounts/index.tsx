import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { PlusIcon } from '@heroicons/react/24/solid'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { IAccount } from '@components/Account/Account/interface'
import { ResponsiveAccountCard } from '@components/Account/ResponsiveAccountCard'
import { AccountBadges } from '@components/Badges'
import { Button } from '@components/Button'
import Card from '@components/Card'
import Dropdown from '@components/Form/Dropdown'
import Hero from '@components/Hero'
import EditIcon from '@components/Icon/EditIcon'
import Pagination from '@components/Pagination'
import { Table } from '@components/Table'
import { usePagination } from '@hooks/usePagination'
import { getAccountsPagination } from '@services/Account/Account'
import { PaginationMetadata } from '@services/Account/AccountInterface'
import { formatDate } from '@services/util'
import ROUTE from 'src/constants/route'
import { useGetAccountsPagination } from 'src/hooks/useAccount'

type Props = {
  paginationData: PaginationMetadata<IAccount[]>
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const cookies = context.req.headers.cookie
  const response = await getAccountsPagination(
    {
      pageNumber: 1,
      pageSize: 10,
      orderBy: 'created_at',
      isAsc: false,
    },
    {
      headers: {
        Cookie: cookies,
      },
    }
  )
  if (!response) {
    return {
      notFound: true,
    }
  }
  return { props: { paginationData: response } }
}

const AccountsPage = ({ paginationData }: Props) => {
  const [createDateOrder, setCreateDateOrder] = useState<'asc' | 'desc'>('desc')
  const { pageParams, onPageClick, updateSort, updateOrderBy, onNextClick, onPrevClick } = usePagination()
  const { data, isLoading, setShouldFetch } = useGetAccountsPagination(pageParams, true, paginationData)
  const accounts: IAccount[] = useMemo(() => data?.data || [], [data])

  const updateSorting = useCallback(
    (orderBy: string): React.MouseEventHandler<HTMLDivElement> =>
      () => {
        updateOrderBy(orderBy)
        updateSort(!pageParams.isAsc)
      },
    [pageParams.isAsc, updateOrderBy, updateSort]
  )

  useEffect(() => {
    setShouldFetch(true)
  }, [pageParams, setShouldFetch])

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
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Created On',
      dataIndex: 'created_at',
      sortAvailable: true,
    },
    {
      title: 'Created Time',
      dataIndex: 'created_at',
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
    },
    {
      title: 'Is Occupied',
      dataIndex: 'is_occupied',
    },
    {
      title: 'Is Enabled',
      dataIndex: 'enabled',
    },
    {
      title: 'Is Auth',
      dataIndex: 'is_authenticated',
    },
  ]


  return (
    <div>
      <Hero
        backgroundImage="./GuideHero.svg"
        className="flex h-full flex-col justify-between md:h-52"
        childrenStyle="h-full md:gap-3 flex-col flex  md:pl-24 md:py-10"
        mobileBackgroundImage
      >
        <div className="flex h-full flex-row justify-between px-4 md:flex-col">
          <div>
            <h1 className="font-extrabold text-white">ACCOUNTS</h1>
          </div>
          <Link href={ROUTE.ACCOUNT_BOT_CREATE}>
            <Button.Primary sizes={['s', 'l', 'l']} className="px-2">
              <div className="flex flex-row items-center gap-2">
                <PlusIcon className="h-6 w-6" />
                <div className="hidden md:flex">Create New Account</div>
              </div>
            </Button.Primary>
          </Link>
        </div>
      </Hero>

      <Card title="Accounts Table" className="!shadow-none">
        <div className="hidden overflow-auto md:flex">
          <Table.Layout>
            <Table.Header
              columns={columns}
              thClassName={'text-sm font-normal text-text-primary items-center justify-center'}
              className="capitalize"
              orderBy={pageParams.orderBy}
              isAsc={pageParams.isAsc}
              updateSorting={updateSorting}
            />
            {/*for username Icon <Image alt="instagram" src="/account/InstagramLogo.svg" width={16} height={16} /> */}
            <Table.Body className="text-sm font-normal leading-5 text-black">
              {accounts.map((e, index) => (
                <Table.Row key={`accounts-table-${index}`} className="text-sm">
                  <Table.BodyCell key={e.id}>
                    <Link
                        href={{
                          pathname: ROUTE.ACCOUNT_BOT_GET,
                          query: { id: e.id },
                        }} 
                        as="/accounts/bot"
                        legacyBehavior
                      >
                      <div className="flex w-full cursor-pointer flex-row items-center justify-center gap-2">
                        <EditIcon size={16} className="fill-accent2-500" />
                        <div className="font-semibold text-accent2-500">Edit</div>
                      </div>
                    </Link>
                  </Table.BodyCell>
                  <Table.BodyCell key={`username-${e.id}`}>
                    <div className="flex items-center text-nowrap text-accent1-600">{e.username}</div>
                  </Table.BodyCell>
                  <Table.BodyCell key={`created_at-${e.id}`}>{formatDate(e.created_at)}</Table.BodyCell>
                  <Table.BodyCell key={`updated_at-${e.id}`}>{formatDate(e.updated_at)}</Table.BodyCell>

                  <Table.BodyCell key={`created_by-${e.id}`}>{e.created_by}</Table.BodyCell>

                  <Table.BodyCell key={`post_scrapped_count-${e.id}`}>{e.post_scrapped_count}</Table.BodyCell>
                  <Table.BodyCell key={`login_count-${e.id}`}>{e.login_count}</Table.BodyCell>
                  <Table.BodyCell key={`status-${e.id}`}>
                    {
                      <div className="flex items-center justify-center">
                        <AccountBadges status={e.status} />
                      </div>
                    }
                  </Table.BodyCell>
                  <Table.BodyCell key={`is_occupied-${e.id}`}>{IconRender(e.is_occupied)}</Table.BodyCell>
                  <Table.BodyCell key={`enabled-${e.id}`}>{IconRender(e.enabled)}</Table.BodyCell>
                  <Table.BodyCell key={`is-auth-${e.id}`}>{IconRender(e.is_authenticated)}</Table.BodyCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Layout>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <h4>Create Date: </h4>
          <div>
            <Dropdown
              name="CreateDateOrder"
              defaultValue={createDateOrder}
              options={[
                { label: 'Earliest', value: 'asc' },
                { label: 'Latest', value: 'desc' },
              ]}
              onValueChange={(value) => {
                setCreateDateOrder(value as 'asc' | 'desc')
                updateOrderBy('created_at')
                updateSort(value === 'asc' ? true : false)
                onPageClick(1)
              }}
              dropDownSizes={['m', 'm', 'm']}
            />
          </div>
        </div>

        <div className="flex w-full flex-col justify-center gap-16 bg-none md:hidden">
          {!isLoading && accounts?.map((e, index) => <ResponsiveAccountCard columns={columns} rowData={e} key={`account_data_${index}`} />)}
        </div>
        {data && data.total_items > 10 && (
          <Pagination<IAccount[]> isLoading={isLoading} data={data} onNextClick={onNextClick} onPrevClick={onPrevClick} onPageClick={onPageClick} />
        )}
      </Card>
    </div>
  )
}

export default AccountsPage
