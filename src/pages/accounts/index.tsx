import React, { useState, useCallback, useMemo } from 'react'
import Card from '@components/Card'
import { Table } from '@components/Table'
import { Button } from '@components/Button'
import { IAccount } from '@lib/Account/Account/interface'
import { ResponsiveAccountCard } from '@lib/Account/ResponsiveAccountCard'
import Link from 'next/link'
import Pagination from '@components/Pagination'
import { useGetAccountsPagination } from 'src/hooks/useAccount'
import { getAccountsPagination } from '@services/Account/Account'
import Image from 'next/image'
import Badges, { Status } from '@components/Badges'
import Hero from '@components/Hero'
import { PlusIcon } from '@heroicons/react/24/solid'
import Dropdown from '@components/Form/Dropdown'
import EditIcon from '@components/Icon/EditIcon'
import { PaginationMetadata } from '@services/Account/AccountInterface'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { usePagination } from '@hooks/usePagination'
import dayjs from '@services/Dayjs'

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
  const { data, isLoading } = useGetAccountsPagination(pageParams, false, paginationData)
  const accounts: IAccount[] = useMemo(() => data?.data || [], [data])

  const updateSorting = useCallback(
    (orderBy: string): React.MouseEventHandler<HTMLDivElement> =>
      () => {
        updateOrderBy(orderBy)
        updateSort(!pageParams.isAsc)
      },
    [pageParams.isAsc, updateOrderBy, updateSort]
  )

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
      render: (e: string) => (
        <Link href="/accounts/[id]" as={`/accounts/${e}`} legacyBehavior>
          <div className="flex w-full cursor-pointer flex-row items-center justify-center gap-2">
            <EditIcon size={16} className="fill-accent2-500" />
            <div className="font-semibold text-accent2-500">Edit</div>
          </div>
        </Link>
      ),
    },
    {
      headerIcon: <Image alt="instagram" src="/account/InstagramLogo.svg" className="w-full" width={24} height={24}></Image>,
      title: 'Username',
      dataIndex: 'username',
      render: (e: string) => {
        return <div className="flex items-center text-accent1-600">{e}</div>
      },
    },
    {
      title: 'Created On',
      dataIndex: 'created_at',
      sortAvailable: true,
      render: (e: string) => {
        const date = dayjs(e, 'YYYY-MM-DD THH:mm:ss')
        return date.local().format('DD MMM YYYY')
      },
    },
    {
      title: 'Created Time',
      dataIndex: 'created_at',
      render: (e: string) => {
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
          banned: 'error',
        }
        const status = statusToVariantMap[e]
        return (
          <div className="flex items-center justify-center">
            <Badges size="sm" status={status} className="capitalize" rounded>
              {e}
            </Badges>
          </div>
        )
      },
    },
    {
      title: 'Is Occupied',
      dataIndex: 'is_occupied',
      render: (e: boolean) => {
        return IconRender(e)
      },
    },
    {
      title: 'Is Enabled',
      dataIndex: 'enabled',
      render: (e: boolean) => {
        return IconRender(e)
      },
    },
    {
      title: 'Is Auth',
      dataIndex: 'is_authenticated',
      render: (e: boolean) => {
        return IconRender(e)
      },
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
          <Link href="/accounts/create-account">
            <Button.Primary sizes={['s', 'l', 'l']} styleClassName="px-2">
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
            <Table.Body className="w-full text-sm font-normal leading-5 text-black">
              {!isLoading &&
                accounts.map((e, index) => {
                  return <Table.Row key={`accounts-table-${index}`} columns={columns} className="text-sm" rowData={e} rowKey={index} />
                })}
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
