import React, { useState, useEffect, useCallback } from 'react'
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
import Dropdown from '@components/Form/Dropdown'
import EditIcon from '@components/Icon/EditIcon'
import { useInView } from 'react-intersection-observer'

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
    isAsc: true,
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
  const [createDateOrder, setCreateDateOrder] = useState<string | number>('desc')
  // const [fetching, setFetching] = useState(false)
  const { accounts: responseData, error, mutate } = useGetAccountsPagination(pageParams, true, paginationData)
  // const [accountData, setAccountData] = useState<
  //   {
  //     page: number
  //     data: IAccount[]
  //   }[]
  // >([{ page: 1, data: responseData?.data || [] }])

  // const { ref, inView, entry } = useInView({
  //   /* Optional options */
  //   threshold: 0,
  // })

  // useEffect(() => {
  //   const totalItems = accountData.reduce((acc, cur) => {
  //     return acc + cur.data.length
  //   }, 0)
  //   if (responseData?.total_items === totalItems) {
  //     return
  //   }
  //   if (!inView) return
  //   setFetching(true)
  //   setPageParams((prevParams) => ({
  //     ...prevParams,
  //     pageNumber: prevParams.pageNumber + 1,
  //   }))
  // }, [inView])

  // useEffect(() => {
  //   // check responseDeffectata page number and update accountData
  //   if (responseData) {
  //     console.log('responseData is not null', responseData)
  //     const page = responseData.page
  //     const index = accountData.findIndex((e) => e.page === page)
  //     if (index === -1) {
  //       setAccountData((prevData) => [...prevData, { page: responseData.page, data: responseData.data }])
  //     } else {
  //       if (responseData.page === 1) {
  //         setAccountData([{ page: responseData.page, data: responseData.data }])
  //         return
  //       }
  //       const temp = [...accountData]
  //       temp[index].data = responseData.data
  //       setAccountData(temp)
  //     }
  //   }
  //   setFetching(false)
  // }, [responseData])

  const accounts: IAccount[] = responseData?.data || []
  const isLoading = !responseData && !error
  // const endOfPage =
  //   responseData?.total_items ===
  //   accountData.reduce((acc, cur) => {
  //     return acc + cur.data.length
  //   }, 0)

  const onPageChange = (newPage: number) => {
    setPageParams((prevParams) => ({
      ...prevParams,
      pageNumber: newPage,
    }))
  }

  const updateSorting = useCallback(
    (orderBy: string, isAsc: boolean): React.MouseEventHandler<HTMLDivElement> =>
      (e) => {
        setPageParams((prevParams) => ({
          ...prevParams,
          orderBy: orderBy,
          isAsc: isAsc,
        }))
      },
    []
  )

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
          <div className="flex w-full flex-row items-center justify-center gap-2 cursor-pointer">
            <EditIcon size={16} className="fill-accent2-500" />
            <div className="font-semibold text-accent2-500">Edit</div>
          </div>
        </Link>
      ),
    },
    {
      headerIcon: <Image alt="instagram logo" src="/account/InstagramLogo.svg" className="w-full" width={24} height={24}></Image>,
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
          banned: 'error',
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
              pageParams={pageParams}
              updateSorting={updateSorting}
            />
            <Table.Body className="text-sm font-normal leading-5 text-black">
              {accounts?.map((e, index) => (
                <Table.Row columns={columns} className="text-sm" rowData={e} rowKey={index} />
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
                setCreateDateOrder(value)
                setPageParams((prevParams) => ({
                  ...prevParams,
                  orderBy: 'created_at',
                  isAsc: value === 'asc' ? true : false,
                }))
                onPageChange(1)
              }}
              dropDownSizes={['m', 'm', 'm']}
            />
          </div>
        </div>

        {/* <div className="flex flex-col gap-12 md:hidden">
          {accountData?.map((e, index) => (
            <div key={`account_page_${index}`} className="flex flex-col items-center gap-4">
              <h3>Page: {e.page}</h3>
              <div className="flex w-full flex-col gap-16 bg-none">
                {e.data.map((account, index) => (
                  <ResponsiveAccountCard columns={columns} rowData={account} key={`account_data_${index}`} />
                ))}
              </div>
            </div>
          ))}
        </div> */}

        <div className="flex w-full flex-col justify-center gap-16 bg-none md:hidden">
          {accounts?.map((e, index) => (
            <ResponsiveAccountCard columns={columns} rowData={e} key={`account_data_${index}`} />
          ))}
        </div>
        {/* <div ref={ref} className="flex justify-center md:hidden">
          {fetching && <div>Loading...</div>}
        </div>
        {endOfPage ? <div className="flex items-center justify-center md:hidden">End of page</div> : null} */}
        <Pagination
          isLoading={isLoading}
          page={responseData.page}
          size={responseData.size}
          totalItems={responseData.total_items}
          hasNext={responseData.has_next}
          hasPrev={responseData.has_prev}
          onPageChange={onPageChange}
        />
      </Card>
    </div>
  )
}

export default AccountsPage
